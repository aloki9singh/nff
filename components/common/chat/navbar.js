import React from "react";
import { MdSearch, MdNotifications } from 'react-icons/md'

import Avatar from "./avatar";


const Navbar = () => {
  return (
    <div className="flex justify-between  items-center py-4 px-20 navbar-main ">
      <div className="brandName">
        <h1 className="text-[22px] text-white">Chats</h1>
      </div>
      <div className="flex gap-24">
        <div
          className="flex flex-row items-center justify-center mr-8"
          style={{ border: "1px solid #728095", borderRadius: "10px" }}
        >
          <MdSearch style={{ color: "#728095", marginLeft: "0.8rem" }} />
          <input
            className="p-2 rounded-lg outline-none bg-transparent"
            type="search"
            name="search"
            id=""
            placeholder="Search"
            style={{ color: "#728095" }}
          />
        </div>
        <div className="flex items-center gap-8">
          <div className="relative inline-flex" >
            <MdNotifications style={{ color: "white", fontSize: 28 }} />
            <span className="flex items-center justify-center rounded-full text-[10px] h-4 w-4 absolute top-0 right-0 bg-pink text-white " >1</span>
          </div>
          <Avatar alt="Profile-Picture" src={'/componentsgraphics/common/chatting/user/profile.webp'} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
