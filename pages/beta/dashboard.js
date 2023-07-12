// coursecards should be made considering from the neatskills code

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Advertisement from "@/components/student/dashboard/adbanner";
import Progress from "@/components/student/assignments/status";
import ActiveComp from "@/components/student/assignments/activecomp";
import InActiveComp from "@/components/student/assignments/inactivecomp";

import Calendar from "@/components/common/calendar/student/calendar";
import LeaderBoardMentor from "@/components/student/dashboard/leaderboard";
import Dashboardnav from "@/components/common/navbar/dashboardnav";
import CourseoverviewSidebar from "@/components/common/sidebar/courseoverview";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebaseconfig";
import { useMediaQuery } from "react-responsive";
import { callUserById } from "@/lib/exportablefunctions";
import { useAuthContext } from "@/lib/context/AuthContext";

const Studentdashboard = () => {
  const [active, setActive] = useState(false);
  const [verified, setVerified] = useState(false);
  // var [user, setUser] = useState({});
  const { user, userProfile } = useAuthContext();
  // console.log(userProfile)
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);
  var percentage = "0%";
  active ? (percentage = "75%") : (percentage = "0%"); //Control the percentage of the user here
  const tip =
    "Learning that is spread out over time drastically increases knowledge retention.";
  // var user = "Guest";
  // active ? (user = 'Rahul') : 'Guest';

  const router = useRouter();
  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        user.emailVerified = true;
        const value = await callUserById(user.uid);
        setVerified(value.user.verified);
      }
    });

    return () => unsubscribe(); // Cleanup the listener
  }, [isMediumScreen]);

  if (!user || !userProfile) {
    router.push("/");
  }

  if (!user || !userProfile) {
    return null;
  }
  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }

  return (
    <>
      <div className="md:h-screen h-full text-base md:w-full">
        <div className="flex">
          {isMobileScreen && (
            <div
              className={`fixed right-0 ${
                SideBarState ? "block" : "hidden"
              } w-[281px] h-screen bg-[#25262C]  rounded-l-[40px] z-10`}
            >
              <CourseoverviewSidebar toggleSideBar={toggleSideBar} />
            </div>
          )}

          {/* Second Sidebar - Visible on Desktop */}
          {!isMobileScreen && (
            <div className={`md:block  hidden w-[221px] bg-[#141518] z-10`}>
              <CourseoverviewSidebar toggleSideBar={toggleSideBar} />
            </div>
          )}
          <div className="flex-grow md:bg-[#2E3036] bg-[#141518]">
            {/* <StudentTopbar heading={"My Progress"} /> */}
            <div className="flex justify-between  top-0 md:border-b-[1px] border-b-[2px] border-[#717378]">
              <Dashboardnav
                heading="My Progress"
                toggleSideBar={toggleSideBar}
              />
            </div>
            {/* <hr className="hidden lg:block opacity-50 mt-3 "></hr> */}

            {/* /// */}
            <div className="md:flex gap-2 m-3 md:mt-0 mt-14 text-white">
              <div className="md:space-y-5 w-full ">
                <Advertisement />
                {/* //welcomebar */}
                <Progress percentage={percentage} user={user.displayName} />

                <div className="overflow-y-auto">
                  {active ? <ActiveComp /> : <InActiveComp />}
                </div>
              </div>
              <div className="md:px-2  mt-5 space-y-5  flex flex-col gap-4 ">
                <div>
                  <Calendar />
                </div>
                {/* //Daily tip section open */}
                <div className=" md:block  p-6 rounded-2xl bg-[#FFB8DC]">
                  <div>
                    <div className="text-white  border border-black w-20 text-center  bg-[#A145CD] py-1 mb-1 text-xs">
                      Daily Tip
                    </div>
                    <p className=" text-sm font-semibold text-[#000000]">
                      Learning that is spread out over time drastically
                      increases knowledge retention.
                    </p>
                  </div>
                </div>
                {/* //Daily tip section close */}
                <div>
                  {" "}
                  <LeaderBoardMentor />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" ">{/* <MobileNav></MobileNav> */}</div>
      </div>
    </>
  );
};

export default Studentdashboard;
