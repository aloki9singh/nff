import React, { useState, useEffect, useMemo } from "react";
import ChatSidebar from "./chatsidebar";
import Chatpart from "./chatting";
import User from "./user";
import {
  collection,
  query,
  limit,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

import ToastMessage from "@/components/common/ToastMessage/ToastMessage";

import { auth, db } from "../../../config/firebaseconfig";
import GroupDetails from "./Group";
import { useRouter } from "next/router";
import { getUserProfile, useAuthContext } from "@/lib/context/AuthContext";
import CourseoverviewSidebar from "@/components/common/sidebar/courseoverview";
import Dashboardnav from "@/components/common/navbar/dashboardnav";
import { useMediaQuery } from "react-responsive";
import MentorSidebar from "../sidebar/mentor";
import MentorTopbar from "../navbar/mentortopbar";
import Layout from "../Layout/Layout";
import CourseAccess from "@/lib/context/AccessCourseContext";

const Chat = () => {
  const [currReciever, setCurrReciever] = useState(null);
  const [chats, setChats] = useState([]);
  const [showUser, setShowUser] = useState(false);
  const [messages, setMessages] = useState([]);
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);
  const router = useRouter();
  const [showChat, setShowChat] = useState(false);
  // const user = auth.currentUser;
  const { user, loading, userProfile } = useAuthContext();

  const { userSubsribed } = CourseAccess(user.uid);

  const isMentor = useMemo(() => {
    if (userProfile.role == "mentor") {
      return true;
    } else {
      return false;
    }
  }, [userProfile.role]);

  useEffect(() => {
    if (!user) {
      if (!loading) {
        router.push("/beta/login");
        return;
      }
      return;
    }

    const q = query(
      collection(db, "chatGroups"),
      where("members", "array-contains", user.uid),
      orderBy("lastMessageTimestamp", "desc")
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      let arr = [];
      querySnapshot.forEach(async (doc, i) => {
        let chat = doc.data();
        // console.log("chatGroup ", i, chat);
        arr.push(chat);
      });
      setChats(arr);
      // if (!currReciever)
      //   setCurrReciever(arr[0]);
    });

    return unsub;
  }, [user, router, loading]);

  useEffect(() => {
    if (!currReciever) {
      // setCurrReciever(chats[0]);
      return;
    }

    const getMembers = async () => {
      const newReceiver = JSON.parse(JSON.stringify(currReciever));

      if (newReceiver.members === undefined) return;
      if (!Array.isArray(newReceiver.members)) return;

      const members = {};
      for (const member of newReceiver.members) {
        const user2 = await getUserProfile(member);

        if (!user2) continue;

        user2.uid = member;
        members[member] = user2;
      }
      newReceiver.members = members;

      if (
        newReceiver.isGroup !== undefined &&
        !newReceiver.isGroup &&
        auth.currentUser
      ) {
        const friendUid = Object.keys(newReceiver.members).find(
          (uid) => uid !== auth.currentUser.uid
        );
        const friend = newReceiver.members[friendUid];
        newReceiver.name = friend.displayName;
        newReceiver.photoURL = friend.photoURL;
        newReceiver.username = friend.username;
        newReceiver.studentPhoneNo = friend.studentPhoneNo;
        newReceiver.role = friend.role;
      }
      setCurrReciever(newReceiver);
    };

    if (currReciever) getMembers();
  }, [currReciever, chats]);

  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }

  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }
  }, [isMediumScreen]);

  useEffect(() => {
    if (!currReciever) return;

    const q = query(
      collection(db, "chatGroups", currReciever.groupId, "messages"),
      limit(25),
      orderBy("timestamp", "asc")
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        const message = doc.data();
        message.sender = currReciever.members[message.senderId];
        messages.push(message);
      });
      setMessages(messages);
    });

    return unsub;
  }, [currReciever]);

  if (!user || !userProfile) {
    router.push("/");
  }

  if (!user || !userProfile) {
    return null;
  }

  return (
    <Layout pageTitle="Chats">
      <div
        className={`flex overflow-hidden items-stretch max-h-screen  ${
          userProfile.role != "mentor"
            ? chats.length == 0
              ? "blur-lg"
              : null
            : null
        }`}
      >
        {!userSubsribed && (
          <ToastMessage
            heading={"OOPS!"}
            message={
              "You have not joined any courses yet. Please join a course to access the study material."
            }
          />
        )}
        {/* {userProfile.role != "mentor"
          ? chats.length === 0 && userSubsribed && <NoJoinedCoursesModal />
          : null} */}
        {isMobileScreen && (
          <div
            className={`fixed right-0 ${
              SideBarState ? "block" : "hidden"
            } w-[281px] h-screen bg-[#25262C]  rounded-l-[40px] z-10`}
          >
            {isMentor ? (
              <MentorSidebar toggleSideBar={toggleSideBar} />
            ) : (
              <CourseoverviewSidebar toggleSideBar={toggleSideBar} />
            )}
          </div>
        )}

        {/* Second Sidebar - Visible on Desktop */}
        {!isMobileScreen && (
          <div className={`md:block  hidden w-[281px] bg-[#141518] z-10`}>
            {isMentor ? (
              <MentorSidebar toggleSideBar={toggleSideBar} />
            ) : (
              <CourseoverviewSidebar
                className={"max-h-screen"}
                toggleSideBar={toggleSideBar}
              />
            )}
          </div>
        )}
        <div className="w-full flex-col flex ">
          {!isMentor ? (
            <div>
              <Dashboardnav heading="Chats" toggleSideBar={toggleSideBar} />
            </div>
          ) : (
            <div className="flex justify-between md:pt-0 pt-2 md:bg-[#2E3036] bg-[#141518] top-0 md:border-b-[1px] border-b-[2px] border-[#717378]">
              <MentorTopbar heading="Chats" toggleSideBar={toggleSideBar} />
            </div>
          )}
          <div className="md:p-4 items-stretch justify-between  h-[calc(100vh-80px)] flex flex-row gap-4 bg-[#2f3036] ">
            <ChatSidebar
              currReciever={currReciever}
              setCurrReciever={setCurrReciever}
              chats={chats}
              setChats={setChats}
              setShowChat={setShowChat}
              setShowUser={setShowUser}
            />

            <Chatpart
              setCurrReciever={setCurrReciever}
              currReciever={currReciever}
              setShowUser={setShowUser}
              status="online"
              messages={messages}
              showChat={showChat}
              setShowChat={setShowChat}
            />
            {showUser &&
              (currReciever?.isGroup ? (
                <GroupDetails
                  currReciever={currReciever}
                  setShowUser={setShowUser}
                  setCurrReciever={setCurrReciever}
                  setShowChat={setShowChat}
                  images={messages.filter(
                    (message) => message.type === "image"
                  )}
                />
              ) : (
                <User
                  setShowChat={setShowChat}
                  currReciever={currReciever}
                  setShowUser={setShowUser}
                  images={messages.filter(
                    (message) => message.type === "image"
                  )}
                />
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
