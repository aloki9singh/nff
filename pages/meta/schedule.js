////add id and name of mentor to schedule

import { BiBell } from "react-icons/bi";
import { BsPersonCircle, BsPlusLg } from "react-icons/bs";
import { useState } from "react";
import withAuth from "@/lib/context/mentorcontext";
import Mainbodymentor from "@/components/common/calendar/mentor/mainbody";
import SideBodyClassSchedule from "@/components/mentor/sidebody/classschedulesidebody";
import SideBodyDelete from "@/components/mentor/sidebody/sidebodydelete";
import SideBody from "@/components/mentor/sidebody/sidebody";
import { useRouter } from "next/router";
import { useEffect } from "react";
// import { auth } from "../../config/firebaseconfig";
import MentorSidebar from "@/components/common/sidebar/mentor";
import MentorTopbar from "@/components/common/navbar/mentortopbar";
import { useMediaQuery } from "react-responsive";
import withMentorAuthorization from "@/lib/HOC/withMentorAuthorization.js";

// import MobileNav from "../components/CalenderParts/MobileNav";
function Schedule() {
  const [count, setCount] = useState(1);
  const [SideBarState, sendSideBarState] = useState(false);
  let [searchstate, setsearchstate] = useState("");
  let searchfun = (e) => {
    setsearchstate(e.target.value);
  };

  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);

  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }
  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }

  }, [isMediumScreen,count]);
  console.log(isMediumScreen,showSideBar)

  return (
    <>
    <div className="h-full text-base bg-[#2E3036] ">
        <div className="flex md:w-[88%] ">
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
            <div className={`md:block hidden w-[221px] bg-[#141518] z-10`}>
              <MentorSidebar toggleSideBar={toggleSideBar} />
            </div>
          )}

          <div className="flex-grow w-[94%] mr-0 md:mr-[-9rem]">
            <div className="flex md:pt-0 pt-2 justify-between md:bg-[#2E3036] bg-[#141518] top-0 md:border-b-[1px] border-b-[2px] border-[#717378]">
              <MentorTopbar heading="Schedule" toggleSideBar={toggleSideBar} />
            </div>

            <div className="md:flex gap-5 md:m-5  md:mt-5 mt-5 md:space-y-0 space-y-7 md:mb-5 mb-0 ">
              <div className="md:w-4/6 md:mx-0 mx-1 " onClick={() => setCount(1)}>
                <Mainbodymentor />
              </div>
                <div className=" md:mt-0 mt-[-20px] w-full">
                  <div>
                    {count == 1 && <SideBody setCount={setCount} count={count} />}
                    {count == 2 && (
                      <SideBodyClassSchedule setCount={setCount} count={count} />
                    )}
                    {count == 3 && (
                      <SideBodyDelete setCount={setCount} count={count} />
                    )}
                  </div>
                </div>
            </div>
          </div>
        </div>
        {/* <div className=" "><MobileNav></MobileNav></div> */}
      </div>
    </>
  );
}
export default withMentorAuthorization(Schedule)
