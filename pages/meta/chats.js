//////main body CSS and nav bar needed to be fixed with responsiveness
// chat section working or not needed to be checked

import React, { useState, useEffect } from "react";

import MentorSidebar from "@/components/common/sidebar/mentor";
import MentorTopbar from "@/components/common/navbar/mentortopbar";
import ChatSidebar from "../../components/common/chat/chatsidebar";
import Chatpart from "../../components/common/chat/chatting";
import User from "../../components/common/chat/user";

import withAuth from "@/lib/context/mentorcontext";

import {
  collection,
  query,
  limit,
  orderBy,
  onSnapshot,
  getDoc,
  doc,
  where,
} from "firebase/firestore";

// import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebaseconfig";
import GroupDetails from "../../components/common/chat/Group";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { getUserProfile, useAuthContext } from "@/lib/context/AuthContext";
import { useMediaQuery } from "react-responsive";

// const userCache = {};
// async function getUser(uid) {
//   if (userCache[uid]) return userCache[uid];

//   const user = await getDoc(doc(db, "allusers", uid));
//   userCache[uid] = user.data();
//   return user.data();
// }

const Chat = () => {
  const [currReciever, setCurrReciever] = useState(null);
  const [chats, setChats] = useState([]);
  const [showUser, setShowUser] = useState(false);
  const [messages, setMessages] = useState([]);
  const router = useRouter();
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);

  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }

  // const user = auth.currentUser;
  const { user, loading } = useAuthContext();

  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }
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
      querySnapshot.forEach(async (doc) => {
        let chat = doc.data();

        arr.push(chat);
      });
      setChats(arr);
      // if (!currReciever)
      //   setCurrReciever(arr[0]);
    });

    return unsub;
  }, [user, router, loading, isMediumScreen]);

  // console.log("chats", chats);

  useEffect(() => {
    if (!currReciever) setCurrReciever(chats[0]);

    const getMembers = async () => {
      const newReceiver = JSON.parse(JSON.stringify(currReciever));

      if (newReceiver.members === undefined) return;
      if (!Array.isArray(newReceiver.members)) return;

      const members = {};
      for (const member of newReceiver.members) {
        const user2 = await getUserProfile(member);
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
        newReceiver.name = friend.name.first + " " + friend.name.last;
        newReceiver.photoURL = friend.photoURL;
        newReceiver.username = friend.username;
        newReceiver.studentPhoneNo = friend.studentPhoneNo;
      }
      setCurrReciever(newReceiver);
    };

    if (currReciever) getMembers();
  }, [currReciever, chats]);

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

  return (
    <>
      <div className="h-full text-base bg-[#2E3036] ">
        <div className="flex">
          {/* First Sidebar - Visible on Mobile */}
          {isMobileScreen && (
            <div
              className={`fixed right-0 ${
                SideBarState ? "block" : "hidden"
              } w-[281px] h-screen bg-[#25262C]  rounded-l-[40px] z-10`}
            >
              <MentorSidebar toggleSideBar={toggleSideBar} />
            </div>
          )}

          {/* Second Sidebar - Visible on Desktop */}
          {!isMobileScreen && (
            <div className={`md:block  hidden w-[221px] bg-[#141518] z-10`}>
              <MentorSidebar toggleSideBar={toggleSideBar} />
            </div>
          )}

          <div className="flex-grow">
            <div className="flex justify-between md:bg-[#2E3036] bg-[#141518] top-0 md:border-b-[1px] border-b-[2px] border-[#717378]">
              <MentorTopbar heading="Chats" toggleSideBar={toggleSideBar} />
            </div>

            <div
              className="p-4 justify-between flex flex-row gap-4  bg-[#2f3036] "
              style={{ height: "calc(100vh - 76px)" }}
            >
              <ChatSidebar
                currReciever={currReciever}
                setCurrReciever={setCurrReciever}
                chats={chats}
                setChats={setChats}
              />
              <Chatpart
                setCurrReciever={setCurrReciever}
                currReciever={currReciever}
                setShowUser={setShowUser}
                status="online"
                messages={messages}
              />
              {showUser &&
                (currReciever.isGroup ? (
                  <GroupDetails
                    currReciever={currReciever}
                    setShowUser={setShowUser}
                    setCurrReciever={setCurrReciever}
                  />
                ) : (
                  <User currReciever={currReciever} setShowUser={setShowUser} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(Chat, "/meta/signup");
