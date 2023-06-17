//need rechecking
import React, { useState, useEffect } from "react";
import { MdSearch } from 'react-icons/md'
import Image from "next/image"
import { dummyUsers } from "./data";
import Link from "next/link";
import Avatar from "./avatar";

const messageDetails = {
  lastMessage: "Sir have you checked my assignment?",
  noOfMessages: 3,
  time: "10:00pm",
};

const SideBarCard = ({
  currReciever,
  setCurrReciever,
  recieverName,
  noOfMessages,
  time,
  chat
}) => {
  // fetch details of user from backend using id or username;

  // const reciever = {
  //   name: recieverName,
  //   username: username,
  //   number: number,
  // };

  return (
    <div
      className={
        currReciever?.name === recieverName
          ? "flex active-user items-center gap-2 cursor-pointer p-2"
          : "flex items-center gap-2 cursor-pointer p-2"
      }
      onClick={(e) => setCurrReciever(chat)}
    >
      <Avatar alt="Profile-Picture" src="./componentsgraphics/common/chatting/sidebar/navbar/profile.webp" />
      <div className="flex flex-col flex-1 items-start">
        <h1>{recieverName}</h1>
        <p className='text-sm'>{chat.lastMessage}</p>
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

const Sidebar = ({ currReciever, setCurrReciever, chats }) => {
  const [activeLink, setActiveLink] = useState("students");
  const [searchUser, setSearchUser] = useState("");
  const [users, setUsers] = useState(chats);

  useEffect(() => {
    setUsers(chats);
  }, [chats]);

  const handleChange = (e) => {
    const val = e.target.value;
    setSearchUser(val);
    const filteredUsers = dummyUsers.filter((user) =>
      user.name.toLowerCase().startsWith(val.toLowerCase())
    );
    if (val.length === 0) setUsers(dummyUsers);
    else setUsers(filteredUsers);
  };

  return (
    <div
      className="flex flex-col  rounded-[1rem] gap-6"
      style={{ backgroundColor: "#373A41", color: "white" }}
    >
      <div
        className="flex m-6 flex-row items-center justify-between px-8 rounded-[10px]"
        style={{ backgroundColor: " #505057" }}
      >
        <input
          className="p-2 rounded-lg outline-none"
          name="search"
          id=""
          placeholder="Search"
          value={searchUser}
          onChange={(e) => handleChange(e)}
          style={{ backgroundColor: "#505057", color: "white" }}
        />
        <MdSearch style={{ color: "white", marginLeft: "0.8rem" }} />
      </div>

      <div className="sideBarContainer flex  flex-col gap-4 relative">
        <div className=" ">
          <ul className="flex mb-6 justify-evenly">
            <li>
              <Link
                href="/"
                className={
                  activeLink === "all"
                    ? "active cursor-pointer px-2 py-1"
                    : "cursor-pointer px-2 py-1"
                }
                onClick={(e) => {
                  e.preventDefault();
                  setActiveLink("all");
                }}
              >
                All
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className={
                  activeLink === "students"
                    ? "active cursor-pointer px-2 py-1"
                    : "cursor-pointer px-2 py-1"
                }
                onClick={(e) => {
                  e.preventDefault();
                  setActiveLink("students");
                }}
              >
                Students
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className={
                  activeLink === "groups"
                    ? "active cursor-pointer px-2 py-1"
                    : "cursor-pointer px-2 py-1"
                }
                onClick={(e) => {
                  e.preventDefault();
                  setActiveLink("groups");
                }}
              >
                {" "}
                Groups
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col">
          {/* using map dynamically populate this */}
          {users.map((user, i) => (
            <SideBarCard
              key={user.name + i}
              index={i}
              noOfMessages={messageDetails.noOfMessages}
              time={user.lastMessageTimestamp?.toDate().
                toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
              chat={user}
              recieverName={user.name}
              currReciever={currReciever}
              setCurrReciever={setCurrReciever}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default chatsidebar;
