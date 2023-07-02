//////main body CSS and nav bar needed to be fixed with responsiveness
// chat section working or not needed to be checked

import React, { useState, useEffect } from "react";

import Sidebar from "../../components/common/sidebar/sidebar";
import Navbar from "../../components/common/chat/navbar";
import ChatSidebar from "../../components/common/chat/chatsidebar";
import Chatpart from "../../components/common/chat/chatting";
import User from "../../components/common/chat/user";

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
import { useAuthContext } from "@/lib/context/AuthContext";


const userCache = {};
async function getUser(uid) {
  if (userCache[uid]) return userCache[uid];

  const user = await getDoc(doc(db, "profileDetails", uid));
  userCache[uid] = user.data();
  return user.data();
}

const Chat = () => {
  const [currReciever, setCurrReciever] = useState(null);
  const [chats, setChats] = useState([]);
  const [showUser, setShowUser] = useState(false);
  const [messages, setMessages] = useState([]);
  const router = useRouter();

  // const user = auth.currentUser;
  const { user, loading } = useAuthContext();

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
      querySnapshot.forEach(async (doc) => {
        let chat = doc.data();

        arr.push(chat);
      });
      setChats(arr);
      // if (!currReciever)
      //   setCurrReciever(arr[0]);
    });

    return unsub;
  }, [user, router, loading]);


  useEffect(() => {
    if (!currReciever) setCurrReciever(chats[0]);

    const getMembers = async () => {
      const newReceiver = JSON.parse(JSON.stringify(currReciever));

      if (newReceiver.members === undefined) return;
      if (!Array.isArray(newReceiver.members)) return;

      const members = {};
      for (const member of newReceiver.members) {
        const user2 = await getUser(member);
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
      <div className="flex overflow-y-hidden">
        <div className="lg:col-span-1 hidden lg:grid">
          <Sidebar />
        </div>
        <div className="w-full h-full">
          <div>
            <Navbar />
            <hr className="hidden lg:block opacity-50 mt-3 " />
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
    </>
  );
};

export default Chat;
