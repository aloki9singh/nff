import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/sidebar";
import Navbar from "../components/chats/Navbar";
import ChatSidebar from "../components/chats/ChatSidebar";
import Chatpart from "../components/chats/Chatpart";
import User from "../components/chats/User";
import {
  collection,
  query,
  limit,
  orderBy,
  onSnapshot,
  getDoc,
  doc,
} from "firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebaseConfig";


async function getUser(uid) {
  const user = await getDoc(doc(db, "users", uid));
  return user.data();
}

const Chat = () => {
  const [currReciever, setCurrReciever] = useState(null);
  const [chats, setChats] = useState([]);
  const [showUser, setShowUser] = useState(false);
  const [messages, setMessages] = useState([]);

  const [user, setUser] = useState(null);
  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(user);
      } else {
        // User is signed out
        // ...
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "chatGroups"),
      orderBy("lastMessageTimestamp", "desc")
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      let arr = [];
      querySnapshot.forEach(async (doc) => {
        let chat = doc.data();
        if (!chat.isGroup && user) {
          const uid = chat.members[0] === user.uid ? chat.members[1] : chat.members[0];
          console.log("uid", uid)
          if (!uid) return;
          const user2 = await getUser(uid);
          console.log("user2", user2)
          chat.name = user2.displayName;
        }
        arr.push(chat);
      });
      console.log("arr", arr);
      setChats(arr);
      // if (!currReciever)
      //   setCurrReciever(arr[0]);
    });

    return unsub;

  }, [user]);

  useEffect(() => {
    if (!currReciever)
      setCurrReciever(chats[0]);
  }, [currReciever, chats])

  useEffect(() => {
    if (!currReciever) return;
    console.log("currReciever", currReciever)
    const q = query(
      collection(db, "chatGroups", currReciever.groupId, "messages"),
      limit(25),
      orderBy("timestamp", "asc")
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });
      setMessages(messages);
    });

    return unsub;
  }, [currReciever]);

  return (
    <>
      <div className="flex overflow-y-hidden">
        <Sidebar />
        <div className="w-full h-full">
          <div>
          <Navbar />
          <hr className="hidden lg:block opacity-50 mt-3 "/>
          </div>
          <div
            className="p-4 justify-between flex flex-row gap-4  bg-[#2f3036] "
            style={{ height: "calc(100vh - 76px)" }}
          >
            <ChatSidebar
              currReciever={currReciever}
              setCurrReciever={setCurrReciever}
              chats={chats}
            />
            <Chatpart
              setCurrReciever={setCurrReciever}
              currReciever={currReciever}
              setShowUser={setShowUser}
              status="online"
              messages={messages}
              user={user}
            />
            {showUser && <User {...currReciever} setShowUser={setShowUser} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
