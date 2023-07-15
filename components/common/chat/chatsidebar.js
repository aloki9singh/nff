//need rechecking
import React, { useState, useEffect } from "react";
import { MdSearch } from "react-icons/md";
import Avatar from "./avatar";
import { auth, db } from "../../../config/firebaseconfig";
import { doc, getDoc } from "firebase/firestore";
import { getUserProfile } from "@/lib/context/AuthContext";

const messageDetails = {
  lastMessage: "Sir have you checked my assignment?",
  noOfMessages: 3,
  time: "10:00pm",
};


const SideBarCard = ({ currReciever, setCurrReciever, noOfMessages, chat, setChats }) => {
  const time = chat.lastMessageTimestamp
    ?.toDate()
    .toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  useEffect(() => {

    if (chat.isGroup || chat.isGroup === undefined) {
      return;
    }

    if (chat.isGroup === false) {
      const friendUid = chat.members.find(
        (uid) => uid !== auth.currentUser.uid
      );
      getUserProfile(friendUid).then((friend) => {
        setChats(prev => prev.map((chat) => {
          if (chat.isGroup) return chat;

          if(!friend) return chat;

          const fuid = chat.members.find(
            (uid) => uid !== auth.currentUser.uid
          );

          if (fuid === friendUid) {
            chat.name = friend.name.first + " " + friend.name.middle + " " + friend.name.last;
            chat.photoURL = friend.photoURL;
          }
          return chat;
        }))
      });
    }
  }, [chat, setChats]);

  return (
    <div
      className={
        currReciever?.groupId === chat?.groupId
          ? "flex active-user items-center gap-2 cursor-pointer p-2"
          : "flex items-center gap-2 cursor-pointer p-2"
      }
      onClick={(e) => setCurrReciever(chat)}
    >

      <Avatar alt="Profile-Picture" src={chat.photoURL || '/componentsgraphics/common/chatting/user/profile.svg'} />

      <div className="flex flex-col flex-1 items-start overflow-hidden">
        <h1 className=" truncate w-4/5 " >{chat.name}</h1>
        <p className="text-sm">{chat.lastMessage}</p>
      </div>
      <div className="flex flex-col justify-end items-center">
        <span className="text-[10px]">{time}</span>
        <span
          className="text-[10px] h-[15px] w-[15px] text-center"
          style={{ borderRadius: "50%", backgroundColor: "#E1348B" }}
        >
          {noOfMessages}
        </span>
      </div>
    </div>
  );
};

const Sidebar = ({ currReciever, setCurrReciever, chats, setChats }) => {
  const [activeLink, setActiveLink] = useState("all");
  const [searchUser, setSearchUser] = useState("");
  const [users, setUsers] = useState(chats);
  useEffect(() => {
    setUsers(chats);
  }, [chats]);


  const handleChange = (e) => {
    const val = e.target.value;
    setSearchUser(val);
    const filteredUsers = chats.filter((user) =>
      user.name?.toLowerCase().startsWith(val.toLowerCase())
    );
    if (val.length === 0) setUsers(chats);

    else setUsers(filteredUsers);

  };

  return (
    <div
      className="flex flex-col w-full md:w-auto md:max-w-sm rounded-[1rem] gap-6"

      style={{ backgroundColor: "#373A41", color: "white" }}
    >
      <div
        className="flex m-6 flex-row items-center justify-between px-8 rounded-[10px]"
        style={{ backgroundColor: " #505057" }}
      >
        <input
          className="p-2 w-full rounded-lg outline-none"
          name="search"
          id=""
          placeholder="Search"
          value={searchUser}
          onChange={(e) => handleChange(e)}
          style={{ backgroundColor: "#505057", color: "white" }}
        />
        <MdSearch style={{ color: "white", marginLeft: "0.8rem", fontSize:"25px" }} />
      </div>

      <div className="sideBarContainer flex  flex-col gap-4 relative">
        <div className=" ">
          <ul className="flex mb-6 justify-evenly">
            <li>
              <button
                className={
                  activeLink === "all"
                    ? "active cursor-pointer px-2 py-1"
                    : "cursor-pointer px-2 py-1"
                }
                onClick={(e) => {
                  e.preventDefault();
                  setActiveLink("all");
                  setUsers(chats);
                }}
              >
                All
              </button>
            </li>
            <li>
              <button
                className={
                  activeLink === "students"
                    ? "active cursor-pointer px-2 py-1"
                    : "cursor-pointer px-2 py-1"
                }
                onClick={(e) => {
                  e.preventDefault();
                  setActiveLink("students");
                  setUsers(chats.filter((chat) => !chat.isGroup));
                }}
              >
                Students
              </button>
            </li>
            <li>
              <button
                className={
                  activeLink === "groups"
                    ? "active cursor-pointer px-2 py-1"
                    : "cursor-pointer px-2 py-1"
                }
                onClick={(e) => {
                  e.preventDefault();
                  setActiveLink("groups");
                  setUsers(chats.filter((chat) => chat.isGroup));
                }}
              >
                {" "}
                Groups
              </button>
            </li>
          </ul>
        </div>

        <div className="flex flex-col">
          {/* using map dynamically populate this */}
          {users.map((user, i) => (
            <SideBarCard
              key={user.groupId}
              noOfMessages={messageDetails.noOfMessages}
              chat={user}
              currReciever={currReciever}
              setCurrReciever={setCurrReciever}
              setChats={setChats}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
