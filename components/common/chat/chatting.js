import React, { useEffect, useState } from "react";
import {
  MdOutlineCall,
  MdVideoCall,
  MdMoreVert,
  MdMic,
  MdSend,
  MdAttachFile,
  MdOutlineInsertDriveFile,
} from "react-icons/md";

import { SlArrowLeft } from 'react-icons/sl'

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
import { uploadToFirebase } from "@/lib/exportablefunctions";
import AudioRecorder, { AudioPlayer } from "./AudioRecorder";

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
        <Avatar
          alt="Profile-Picture"
          src={
            message.sender?.photoURL ||
            "/componentsgraphics/common/chatting/user/profile.svg"
          }
        />
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
        <Avatar
          alt="Profile-Picture"
          src={
            message.sender?.photoURL ||
            "/componentsgraphics/common/chatting/user/profile.svg"
          }
        />
      </div>
    </div>
  );
};

const ImageMessage = ({ img, userIcon, isSender = false }) => {
  return (
    <div className={`flex gap-2 ${isSender ? "ml-auto" : "mr-auto"}`}>
      <div className="flex items-center justify-center ">
        <Image
          width={300}
          height={300}
          className="w-[300px] h-auto"
          src={img}
          alt=""
        />
      </div>
      <div>
        <Avatar alt="Profile-Picture" src={userIcon} />
      </div>
    </div>
  );
};

const AudioMessage = ({ audio, userIcon, timestamp, isSender = false }) => {
  return (
    <div className={`flex gap-2 ${isSender ? "ml-auto" : "mr-auto"}`}>
      <div>
        <Avatar
          alt="Profile-Picture"
          src={
            userIcon || "/componentsgraphics/common/chatting/user/profile.svg"
          }
        />
      </div>
      <div
        className="p-2 py-3 max-w-[80%] rounded-[10px] flex flex-col"
        style={{ backgroundColor: " #717378" }}
      >
        {/* <audio src={message.content} controls /> */}
        <AudioPlayer src={audio} />
        <span className="text-[9px] bg-black p-1 rounded-[8px] mr-auto text-left">
          {formatTimePassed(timestamp)}
        </span>
      </div>
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
  const [showRecorder, setShowRecorder] = useState(false);

  const lastDiv = React.useRef();

  useEffect(() => {
    lastDiv.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    uploadToFirebase(file, async (url) => {
      const chatGroupRef = doc(db, "chatGroups", currReciever.groupId);
      console.log("image url", url);
      const messagesRef = collection(chatGroupRef, "messages");
      const newMessageRef = doc(messagesRef);

      const newMessageData = {
        messageId: newMessageRef.id,
        senderId: user.uid,
        timestamp: serverTimestamp(),
        content: url,
        type: "image",
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
    });
  };

  if (!currReciever)
    return (
      <div className="hidden md:flex items-center justify-center flex-1 flex-col">
        <p className="text-2xl text-white">Select a chat to start messaging</p>
      </div>
    );

  return (
    <div
      className="flex flex-1 flex-col justify-between w-full relative "
      style={{ color: "white" }}
    >
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto md:p-4 md:rounded-xl">
        <div
          className="flex  items-center gap-2 p-4 md:rounded-2xl"
          style={{ backgroundColor: "#505057", color: "white" }}
        >
          <div
            className="flex flex-1 items-center gap-4 "
          >
            <button className="text-white block md:hidden p-2 rounded-lg bg-primary" onClick={() => setCurrReciever(null)} >
              <SlArrowLeft />
            </button>
            <Avatar
              className="cursor-pointer"
              alt="Profile-Picture"
              src={
                currReciever?.photoURL ||
                "/componentsgraphics/common/chatting/user/profile.svg"
              }
            />
            <div onClick={() => {
              displayReciever();
            }} className="flex flex-col items-start cursor-pointer">
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
              className="p-1 rounded-[10px] text-2xl"
              style={{ backgroundColor: "rgba(217, 217, 217, 0.29)" }}
            >
              <MdOutlineCall />
            </div>
            <div
              className="p-1 rounded-[10px] text-2xl"
              style={{ backgroundColor: "rgba(217, 217, 217, 0.29)" }}
            >
              <MdVideoCall />
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-4 gap-4 w-full no-srollbar  overflow-y-auto flex-5">
          {messages.map((message, i) => {
            {
              if (message.type === "audio")
                return (
                  <AudioMessage
                    userIcon={message.sender?.photoURL}
                    audio={message.content}
                    isSender={message.senderId === user?.uid}
                    timestamp={message.timestamp}
                  />
                );
              1;

              if (message.type === "image") {
                return (
                  <ImageMessage
                    userIcon={message.sender?.photoURL}
                    img={message.content}
                    isSender={message.senderId === user?.uid}
                  />
                );
              }

              return message.senderId === user?.uid ? (
                <SendMessage key={message.messageId} message={message} />
              ) : (
                <RecievedMessage key={message.messageId} message={message} />
              );
            }
          })}
          <div ref={lastDiv} />
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
              className="rounded-[5px]"
              style={{ backgroundColor: "rgba(217, 217, 217, 0.29)" }}
            // onClick={}
            >
              {/* */}
              <label
                for="formFileSm"
                className="inline-block text-2xl dark:text-neutral-200 mb-0 p-1"
              >
                <MdOutlineInsertDriveFile />
              </label>

              <input
                className="relative hidden"
                onChange={(e) => uploadImage(e)}
                id="formFileSm"
                type="file"
              />
            </div>
            <div
              className="p-1 text-2xl rounded-[5px]"
              style={{ backgroundColor: "rgba(217, 217, 217, 0.29)" }}
            >
              <MdAttachFile />
            </div>
            <div
              className="p-1 rounded-[5px] text-2xl"
              style={{ backgroundColor: "rgba(217, 217, 217, 0.29)" }}
            >
              <MdMic />
            </div>
          </div>
          <div
            className="p-1 rounded-[5px] text-2xl flex items-center justify-center"
            onClick={() => handleClick()}
            style={{ backgroundColor: "rgba(217, 217, 217, 0.29)" }}
          >
            <MdMoreVert />
          </div>
        </div>
        {!showRecorder ? (
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
                className="outline-none rounded-l-[10px] w-full border-r-0"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                name="message"
                style={{
                  background:
                    "linear-gradient(0deg, #505057, #505057),linear-gradient(0deg, rgba(255, 255, 255, 0.43), rgba(255, 255, 255, 0.43))",
                }}
              />
              <div
                className="flex relative"
                style={{
                  background:
                    "linear-gradient(0deg, #505057, #505057),linear-gradient(0deg, rgba(255, 255, 255, 0.43), rgba(255, 255, 255, 0.43))",
                }}
              >
                <div
                  onClick={() => {
                    setShowRecorder(true);
                  }}
                  className="flex items-center p-2 mr-2 h-[34px] rounded-[10px] text-2xl my-auto"
                  style={{ backgroundColor: "rgba(217, 217, 217, 0.29)" }}
                >
                  <MdMic />
                </div>
              </div>

              <button
                type="submit"
                className="flex items-center justify-center p-3 text-2xl disabled:opacity-70"
                style={{
                  backgroundColor: "#E1348B",
                  borderTopRightRadius: "10px",
                  borderBottomRightRadius: "10px",
                }}
                disabled={message === ""}
              >
                <MdSend style={{ transform: "rotate(-20deg)" }} />
              </button>
            </div>
          </form>
        ) : (
          <AudioRecorder
            setShowRecorder={setShowRecorder}
            groupId={currReciever?.groupId}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
