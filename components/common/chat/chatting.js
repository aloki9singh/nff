import React, { useState } from "react";
import {
  MdOutlineCall,
  MdVideoCall,
  MdMoreVert,
  MdMic,
  MdSend,
  MdAttachFile,
  MdOutlineInsertDriveFile,
} from "react-icons/md";

import Avatar from "./avatar";
import Image from "next/image";


import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../../config/firebaseconfig";

function formatTimePassed(messageTimestamp) {
  if (!messageTimestamp) return "";

  const currentTime = new Date();
  const messageTime = messageTimestamp.toDate(); // Assuming messageTimestamp is a Firebase Timestamp object
  const timeDifference = currentTime - messageTime;

  const secondsDifference = Math.floor(timeDifference / 1000);
  const minutesDifference = Math.floor(secondsDifference / 60);
  const hoursDifference = Math.floor(minutesDifference / 60);
  const daysDifference = Math.floor(hoursDifference / 24);

  let timePassed;
  if (daysDifference > 0) {
    timePassed = `${daysDifference}d ago`;
  } else if (hoursDifference > 0) {
    timePassed = `${hoursDifference}h ago`;
  } else if (minutesDifference > 0) {
    timePassed = `${minutesDifference}m ago`;
  } else {
    timePassed = "Just now";
  }

  return timePassed;
}

const RecievedMessage = ({ message }) => {
  return (
    <div className="flex gap-2 ">
      <div>
        <Avatar alt="Profile-Picture" src={message.sender?.photoURL || '/componentsgraphics/common/chatting/user/profile.svg'} />
      </div>
      <div
        className="p-2 py-3 max-w-[80%] rounded-[10px] flex flex-col"
        style={{ backgroundColor: " #717378" }}
      >
        {message.content}
        <span className="text-[9px] bg-black p-1 rounded-[8px] mr-auto text-left">
          {formatTimePassed(message.timestamp)}
        </span>
      </div>
    </div>
  );
};

const SendMessage = ({ message }) => {
  return (
    <div className="flex  justify-end gap-2">
      <div
        className="p-2 py-3 max-w-[80%] rounded-[10px]  flex flex-col"
        style={{ backgroundColor: "#505057" }}
      >
        {message.content}
        <span className="text-[9px] bg-black p-1 rounded-[8px] ml-auto text-right">
          {formatTimePassed(message.timestamp)}
        </span>
      </div>
      <div>
        <Avatar alt="Profile-Picture" src={message.sender?.photoURL ||  '/componentsgraphics/common/chatting/user/profile.svg'} />

      </div>
    </div>
  );
};

const ImageMessage = ({ img, userIcon }) => {
  return (
    <div className="flex gap-2">
      <div
        className="flex items-center justify-center ml-auto"
        style={{ width: "150px" }}
      >
        <Image src={'Img2.png'} alt="" />
      </div>
      <Avatar alt="Profile-Picture" src={userIcon} />
    </div>
  );
};

const Chat = ({
  name,
  username,
  number,
  status,
  setCurrReciever,
  setShowUser,
  messages,
  currReciever,
}) => {
  const handleClick = () => {
    const elem = document.querySelector(".icons-toggle");
    if (elem.classList.contains("hide")) elem.classList.toggle("show");
    else elem.classList.toggle("hide");
  };
  const user = auth.currentUser;

  const [message, setMessage] = useState("");


  const submitHandler = async (e) => {
    e.preventDefault();
    if (!user || !currReciever) return;

    const chatGroupRef = doc(db, "chatGroups", currReciever.groupId);

    // Access the messages subcollection within the chat group document
    const messagesRef = collection(chatGroupRef, "messages");

    // Create a new message document
    const newMessageRef = doc(messagesRef);

    const newMessageData = {
      messageId: newMessageRef.id,
      senderId: user.uid,
      timestamp: serverTimestamp(),
      content: message,
    };

    try {
      await setDoc(newMessageRef, newMessageData);
      await updateDoc(chatGroupRef, {
        lastMessage: message,
        lastMessageTimestamp: serverTimestamp(),
      });
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  const dummyReciever = {
    name: name,
    username: username,
    number: number,
  };

  const displayReciever = () => {
    setShowUser(true);
    // setCurrReciever(
    //   currReciever
    // );
  };

  return (
    <div
      className="flex flex-1 flex-col justify-between w-full relative"
      style={{ color: "white" }}
    >
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto md:p-4 md:rounded-xl">
        <div className="flex  items-center gap-2 p-4 md:rounded-2xl"
          style={{ backgroundColor: "#505057", color: "white" }}
        >
          <div
            className="flex flex-1 items-center gap-4 "
            onClick={() => {
              displayReciever();
            }}
          >
            <Avatar
              className="cursor-pointer"
              alt="Profile-Picture"
              src={currReciever?.photoURL ||  '/componentsgraphics/common/chatting/user/profile.svg'}

            />
            <div className="flex flex-col items-start cursor-pointer">
              <h1>{currReciever?.name}</h1>
              <p
                className="text-[12px]"
                style={{ color: "rgba(255, 255, 255, 0.45)" }}
              >
                {status}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div
              className="p-1 rounded-[0.9rem]"
              style={{ backgroundColor: "rgba(217, 217, 217, 0.29)" }}
            >
              <MdOutlineCall />
            </div>
            <div
              className="p-1 rounded-[0.9rem]"
              style={{ backgroundColor: "rgba(217, 217, 217, 0.29)" }}
            >
              <MdVideoCall />
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-4 gap-4 w-full no-srollbar  overflow-y-auto flex-5">
          {messages.map((message, i) => {
            {
              return message.senderId === user?.uid ? (
                <SendMessage key={message.messageId} message={message} />
              ) : (
                <RecievedMessage
                  key={message.messageId}
                  message={message}
                />
              );
            }
          })}
          {/* <SendMessage time="16:10" />
          <ImageMessage img={img2} userIcon={img} /> */}
        </div>
      </div>

      <div className="flex gap-2  relative bottom-0 ">
        <div
          className="flex flex-col gap-2 p-2 rounded-[5px] absolute left-0 bottom-0"
          style={{ backgroundColor: "#373A41" }}
        >
          <div className="hide icons-toggle z-[-0]">
            <div
              className="p-1 rounded-[5px]"
              style={{ backgroundColor: "rgba(217, 217, 217, 0.29)" }}
            >
              <MdOutlineInsertDriveFile />
            </div>
            <div
              className="p-1 rounded-[5px]"
              style={{ backgroundColor: "rgba(217, 217, 217, 0.29)" }}
            >
              <MdAttachFile />
            </div>
            <div
              className="p-1 rounded-[5px]"
              style={{ backgroundColor: "rgba(217, 217, 217, 0.29)" }}
            >
              <MdMic />
            </div>
          </div>
          <div
            className="p-1 rounded-[5px] flex items-center justify-center"
            onClick={() => handleClick()}
            style={{ backgroundColor: "rgba(217, 217, 217, 0.29)" }}
          >
            <MdMoreVert />
          </div>
        </div>
        <form
          onSubmit={submitHandler}
          className="flex-1 flex items-center rounded-[10px] ml-14 self-end"
          style={{ border: "1px solid grey" }}
        >
          <div
            className="flex flex-1 h-full"
            style={{
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
            }}
          >
            <input
              placeholder="Type Message Here"
              className="outline-none  p-2 w-full"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              name="message"
              style={{
                backgroundColor: "#505057",
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
              }}
            />
            <div
              className="flex items-center p-2"
              style={{ backgroundColor: "rgba(217, 217, 217, 0.29)" }}
            >
              <MdMic />
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center p-2 pl-4 h-full"
            style={{
              backgroundColor: "#E1348B",
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
          >
            <MdSend style={{ transform: "rotate(-20deg)" }} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
