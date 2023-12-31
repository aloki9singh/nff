// if course buyed setActive to true
// after buying courses needed to pass leaderboarddata, workpercentage

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Advertisement from "@/components/student/dashboard/adbanner";
import Progress from "@/components/student/assignments/status";
import ActiveComp from "@/components/student/assignments/activecomp";
import InActiveComp from "@/components/student/assignments/inactivecomp";
import Calendar from "@/components/common/calendar/student/calendar";
import LeaderBoardStudent from "@/components/student/dashboard/leaderboard";
import Dashboardnav from "@/components/common/navbar/dashboardnav";
import CourseoverviewSidebar from "@/components/common/sidebar/courseoverview";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/config/firebaseconfig";
import { useMediaQuery } from "react-responsive";
import { callUserById } from "@/lib/exportablefunctions";
import { useAuthContext } from "@/lib/context/AuthContext";

import withStudentAuthorization from "@/lib/HOC/withStudentAuthorization";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import Layout from "@/components/common/Layout/Layout";

const Studentdashboard = () => {
  const [active, setActive] = useState(false);

  const [verified, setVerified] = useState(false);
  const [leaderboarddata, setLeaderboardData] = useState([]);
  const { user, userProfile } = useAuthContext();
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);
  const [workpercentage, setworkpercentage] = useState(0);
  const [lastTip, setLastTip] = useState(null);

  const tip =
    "Learning that is spread out over time drastically increases knowledge retention.";
  const router = useRouter();
  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        user.emailVerified = true;
        const value = await callUserById(user.uid);
        setVerified(value.user?.verified);
      }
    });
    const fetchLastTip = async () => {
      const DailyTipsCollectionRef = collection(db, "dailytip");
      const tipsQuery = query(
        DailyTipsCollectionRef,
        orderBy("createdAt", "desc"),
        limit(1)
      );
      const querySnapshot = await getDocs(tipsQuery);

      querySnapshot.forEach((doc) => {
        setLastTip(doc.data().text);
      });
    };

    fetchLastTip();

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
    <Layout pageTitle="Dashboard">
      <div className="md:h-screen h-full text-base md:w-full ">
        <div className="flex">
          {isMobileScreen && (
            <div
              className={`fixed right-0 ${
                SideBarState ? "block" : "hidden"
              } w-[281px] h-screen bg-[#25262C]  rounded-l-[40px] z-10 `}
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
          <div className="flex-grow bg-[#2E3036]  md:rounded-l-[50px]">
            {/* <StudentTopbar heading={"My Progress"} /> */}
            <div className="flex justify-between  top-0 md:border-b-[1px] border-b-[2px] border-[#717378]  md:rounded-l-[50px] ">
              <Dashboardnav
                heading="My Progress"
                toggleSideBar={toggleSideBar}
              />
            </div>
            {/* <hr className="hidden lg:block opacity-50 mt-3 "></hr> */}

            {/* /// */}
            <div className="flex flex-col lg:flex-row gap-2 m-3 md:mt-0 min-h-screen text-white">
              <div className="md:space-y-5 w-full  ">
                <Advertisement />

                {/* //welcomebar */}
                <Progress
                  percentage={`${workpercentage} %`}
                  user={user.displayName}
                />

                <div className="overflow-y-auto">
                  {active ? <ActiveComp percent={0} /> : <InActiveComp />}
                </div>
              </div>
              <div className="md:px-2  mt-5 space-y-5 md:w-1/3 flex flex-col gap-4 pb-3 lg:pb-0">
                <div>
                  <Calendar />
                </div>
                {/* //Daily tip section open , this needs to be changed */}
                <div className=" md:block  p-6 rounded-2xl bg-[#FFB8DC]">
                  <div>
                    <div className="text-white  border border-black w-20 text-center  bg-[#A145CD] py-1 mb-1 text-xs">
                      Daily Tip
                    </div>
                    <p className=" text-sm font-semibold text-[#000000]">
                      {lastTip && lastTip}
                    </p>
                  </div>
                </div>
                {/* //Daily tip section close */}
                <div>
                  {" "}
                  <LeaderBoardStudent LeaderBoardData={leaderboarddata} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withStudentAuthorization(Studentdashboard);
