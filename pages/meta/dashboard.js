import TaskList from "@/components/mentor/dashboard/tasklist";
import Calender from "@/components/common/calendar/mentor/calendar";
import MentorChatWidget from "@/components/mentor/chat/widget";
import BasicDetails from "@/components/mentor/other/basicdetails";
import { useState } from "react";
import MentorSidebar from "@/components/common/sidebar/mentor";
import MentorTopbar from "@/components/common/navbar/mentortopbar";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { auth } from "@/config/firebaseconfig";
import LeaderBoardMentor from "@/components/mentor/dashboard/leaderboard";
import CirProgress from "@/components/mentor/other/circularprogressbar";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { callUserById } from "@/lib/exportablefunctions";
import { useMediaQuery } from "react-responsive";
import withAuth from "@/lib/context/mentorcontext";
import { useAuthContext } from "@/lib/context/AuthContext";

function MentorDashboard() {
  const [count, setCount] = useState(1);
  const [verified, setVerified] = useState();
  let [searchstate, setsearchstate] = useState("");
  const { user, userProfile } = useAuthContext();
  const router = useRouter();
  let searchfun = (e) => {
    setsearchstate(e.target.value);
  };
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);

  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }
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

  if (!verified) {
    return null;
  }

  return (
    <>
      <div className="h-full text-base bg-[#2E3036] ">
        <div className="flex">
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
            <div className={`md:block  hidden w-[221px] bg-[#141518] z-10`}>
              <MentorSidebar toggleSideBar={toggleSideBar} />
            </div>
          )}

          <div className="flex-grow md:rounded-tl-[40px]">
            <div className="flex justify-between md:bg-[#2E3036] bg-[#141518] md:pt-0 pt-2 top-0 md:border-b-[1px]  border-b-[2px] border-[#717378] md:rounded-tl-[40px]">
              <MentorTopbar
                heading="My Progress"
                toggleSideBar={toggleSideBar}
              />
            </div>

            <div className="md:flex gap-5 m-5 md:mb-0 md:mt-0 ">
              <div className="md:w-5/6 ">
                <BasicDetails />

                <div className="md:flex gap-5">
                  <div className="md:w-1/2">
                    <div>
                      <LeaderBoardMentor />
                      <div className="bg-[#373A41] rounded-[20px] p-5 px-8 my-5 space-y-2 text-white mt-[-12px]">
                        <div className="py-2 text-center">Homework Status</div>
                        <div className="flex justify-between px-5 py-3 bg-[#2E3036] rounded-[10px]">
                          <div>To be Marked</div>
                          <div className="border border-[#A145CD] rounded-[5px] px-1">
                            29
                          </div>
                        </div>
                        <div className="flex justify-between px-5 py-3 bg-[#2E3036] rounded-[10px]">
                          <div>Marked</div>
                          <div className="border border-[#A145CD] rounded-[5px] px-1">
                            2
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <div className="bg-[#373A41] rounded-[20px] pt-1">
                      <CirProgress />
                    </div>
                    <div className="bg-[#373A41] rounded-[20px] mb-10 mt-[-20px] md:mt-0">
                      <MentorChatWidget />
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:mt-0 ">
                <div className="md:w-[30vw] mt-5">
                  <Calender />
                </div>
                <div className="bg-[#373A41] rounded-[20px] md:pb-5 pb-7 mt-[-20px] md:[mt-0]">
                  <TaskList userId={userProfile && userProfile.uid} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuth(MentorDashboard, "/meta/signup");
