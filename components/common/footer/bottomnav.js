//verified by Shreyas Sahoo
import {
    AiOutlineHome,
    AiOutlineSearch,
    AiOutlineCalendar,
 } from "react-icons/ai";
 import { BsChatLeftDots } from "react-icons/bs";
 
 export default function MobileNav({ className }) {
    return (
       <div
          className={`${className} bg-black flex p-3 sticky bottom-0 justify-evenly opacity-80 md:hidden  text-white text-4xl `}
       >
          <div className=" ">
             <div className="flex justify-center ">
                <AiOutlineHome></AiOutlineHome>
             </div>
             <div className="text-lg">Home</div>
          </div>
          <div className=" ">
             <div className="flex justify-center ">
                <AiOutlineCalendar></AiOutlineCalendar>
             </div>
             <div className="text-lg">Calender</div>
          </div>
          <div className=" ">
             <div className="flex justify-center ">
                <AiOutlineSearch></AiOutlineSearch>
             </div>
             <div className="text-lg">Search</div>
          </div>
          <div className=" ">
             <div className="flex justify-center ">
                <BsChatLeftDots></BsChatLeftDots>
             </div>
             <div className="text-lg">Chats</div>
          </div>
          {/* <div className=" ">
           <div className="flex justify-center ">
             <CgProfile></CgProfile>
           </div>
           <div className="text-lg">Profile</div>
         </div> */}
       </div>
    );
 }
 