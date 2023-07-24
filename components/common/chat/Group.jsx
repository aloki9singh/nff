import React, { useEffect, useState } from "react";
import { MdClose, MdNotificationsNone } from "react-icons/md";
import Avatar from "./avatar";
import { Switch } from "@headlessui/react";
import Image from "next/image";
import { auth, db } from "../../../config/firebaseconfig";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import profileImage from "@/public/componentsgraphics/common/chatting/user/profile.svg";
import Img2 from "@/public/componentsgraphics/common/chatting/chattingarea/Img2.svg";
import { getUserName } from "@/lib/context/AuthContext";

const DescIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={15}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M.5 1.56c0-.438.354-.792.792-.792h17.416a.792.792 0 0 1 0 1.584H1.292A.792.792 0 0 1 .5 1.56ZM.5 5.52c0-.438.354-.792.792-.792h12.666a.792.792 0 0 1 0 1.584H1.292A.792.792 0 0 1 .5 5.52ZM.5 9.48c0-.438.354-.792.792-.792h17.416a.792.792 0 0 1 0 1.584H1.292A.792.792 0 0 1 .5 9.48ZM.5 13.44c0-.438.354-.792.792-.792h12.666a.792.792 0 0 1 0 1.584H1.292A.792.792 0 0 1 .5 13.44Z"
      clipRule="evenodd"
    />
  </svg>
);

const GroupDetails = ({
  currReciever,
  setShowUser,
  setCurrReciever,
  setShowChat,
}) => {
  const [checked, setChecked] = useState(true);
  const [showAll, setShowAll] = useState(true);
  const user = auth.currentUser;
  useEffect(() => {
    if (Object.keys(currReciever.members).length <= 3) {
      setShowAll(true);
    }
  }, [currReciever]);

  const handleClick = () => {
    setShowUser(false);
    setShowChat(true);
  };

  const memberClickHandler = async (member) => {
    console.log(member);

    if (member.uid === user.uid) return;

    const id =
      user.uid < member.uid ? user.uid + member.uid : member.uid + user.uid;

    // check if group already exists
    // if exists, then open the group
    // else create a new group
    const docSnap = await getDoc(doc(db, "chatGroups", id));
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setCurrReciever(docSnap.data());
      setShowUser(false);
      return;
    }

    const newGroup = {
      groupId: id,
      members: [member.uid, user.uid],
      isGroup: false,
      lastMessage: "",
      lastMessageTimestamp: serverTimestamp(),
      createdAt: serverTimestamp(),
    };
    await setDoc(doc(db, "chatGroups", id), newGroup);

    setCurrReciever(newGroup);
    // setShowUser(false);
  };

  return (
    <div
      className="user-container overflow-auto w-screen md:w-auto no-scrollbar md:max-w-sm"
      style={{
        backgroundColor: "#373A41",
        color: "white",
        minWidth: "300px",
        borderRadius: "15px",
      }}
    >
      <div
        className="flex p-6 pt-8 justify-between"
        style={{ borderBottom: "1px solid grey" }}
      >
        <h1 className="text-[20px]">Group Info</h1>
        <MdClose className="cursor-pointer" onClick={() => handleClick()} />
      </div>

      <div
        className="flex items-center gap-8 p-4"
        style={{ borderBottom: "1px solid grey" }}
      >
        <Avatar
          alt="Profile-Picture"
          src={currReciever.photoURL || profileImage}
          // sx={{ height: 87, width: 86 }}
          height={87}
          width={86}
        />
        <div>
          <p className="font-semibold text-lg">{currReciever.name}</p>
          <p className="font-light text-xs">
            {Object.keys(currReciever.members).length} participants
          </p>
        </div>
      </div>

      <div
        className="flex items-center gap-x-4 py-4 px-8"
        style={{ borderBottom: "1px solid grey" }}
      >
        <DescIcon className="text-white" />
        <p className="text-sm opacity-90">Group Description</p>
      </div>

      <div
        className="flex flex-col items-center justify-center p-4 gap-2"
        style={{ borderBottom: "1px solid grey" }}
      >
        <p className="text-xs">Media Link and Docs</p>
        <div className="flex gap-6 p-2" style={{ backgroundColor: "#505357" }}>
          <Image src={Img2} alt="" height={60} width={60} />
          <Image src={Img2} alt="" height={60} width={60} />
          <Image src={Img2} alt="" height={60} width={60} />
        </div>
      </div>

      <div
        className="flex flex-col  p-4"
        style={{ borderBottom: "1px solid grey" }}
      >
        <p className="text-sm opacity-50">
          {Object.keys(currReciever.members).length} participants
        </p>
        <div className="flex flex-col items-stretch ">
          {/* participants */}
          {Object.values(currReciever.members).map((member) => (
            <div
              key={member.uid}
              className="flex flex-row justify-between  items-center py-2"
            >
              <button
                onClick={() => memberClickHandler(member)}
                className="flex flex-row items-center"
              >
                <Avatar
                  height={32}
                  width={32}
                  src={member.photoURL}
                  alt="profile-avatar"
                />
                <div className="flex flex-col items-start ml-[10px]">
                  <p className="">{getUserName(member)}</p>
                  <p className="text-xs opacity-50">
                    {member.uid === user?.uid ? "You" : "Online"}
                  </p>
                </div>
              </button>
              <p className="text-sm opacity-50">{member.role}</p>
            </div>
          ))}
        </div>
        {!showAll && (
          <button className="text-center text-xs py-1">
            View all (25 more)
          </button>
        )}
      </div>

      <div
        className="flex p-4 items-center justify-between"
        style={{ borderBottom: "1px solid grey" }}
      >
        <div className="flex items-center gap-1">
          <MdNotificationsNone />
          <p>Notification</p>
        </div>
        <Switch
          checked={checked}
          onChange={setChecked}
          className={`${
            checked ? "bg-pink" : "bg-gray-500"
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">Enable notifications</span>
          <span
            className={`${
              checked ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </div>

      <div
        className="flex px-6 py-4 justify-between"
        style={{ borderBottom: "1px solid grey" }}
      >
        <p>Exit Group</p>
        <p>Block</p>
        <p>Report</p>
      </div>
    </div>
  );
};

export default GroupDetails;
