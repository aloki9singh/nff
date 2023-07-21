import CourseList from "./list2";
import Dashboardnav from "@/components/common/navbar/dashboardnav";
import CourseHeader from "./header";
import CourseoverviewSidebar from "@/components/common/sidebar/courseoverview";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
// import BottomNav from "../Footer/BottomNav";


// creating changes for courseOverview


export default function CoursesMain({ coursesData }) {
  const router = useRouter();
  const [courses] = useState(coursesData);
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);
  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }
  },[isMediumScreen])
  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }
  
  return (
    <div className="flex">
          {isMobileScreen && (
            <div
              className={`fixed right-0 ${SideBarState ? "block" : "hidden" } w-[281px] h-screen bg-[#25262C]  rounded-l-[40px] z-10`}
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
      <div className="bg-[#2e3036] rounded-l-[50px] max-[768px]:rounded-none w-screen">
        <Dashboardnav heading="Courses" toggleSideBar={toggleSideBar}  />
        <CourseHeader />
        <CourseList courses={courses} />
        {/* <BottomNav /> */}
      </div>
    </div>
  );
}
