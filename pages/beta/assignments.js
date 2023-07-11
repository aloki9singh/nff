// Hard Coded top-Navbar
// In mobile screen dropdown is missing of modules.
// file icon missing

import { useState, useEffect } from 'react';
// import MobileNav from '../components/CalenderParts/MobileNav';
import AssignmentCard from '@/components/student/assignments/foldercard';
import { useRouter } from 'next/router';
import assignmentupload from './assignmentupload';
import { useMediaQuery } from "react-responsive";
import CourseoverviewSidebar from '@/components/common/sidebar/courseoverview';
import Dashboardnav from '@/components/common/navbar/dashboardnav';
import { useAuthContext } from '@/lib/context/AuthContext';

export default function Assignments() {
  const router = useRouter();
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);

  let [searchstate, setsearchstate] = useState('');
  let searchfun = (e) => {
    setsearchstate(e.target.value);
  };
  const { user, userProfile } = useAuthContext();
  if(!user||!userProfile){
    router.push("/")
  }
  
   if(!user||!userProfile){
    return null
   }
  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }
  }, [isMediumScreen]);
  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }

  // We would get a courseID from the backend and then use that to fetch the assignments for a particular module

  //  need from backend
  let currentCourseId = 1;

  const [module, setModule] = useState(0);
  let Activestyle =
    'text-sm font-light py-2 pl-8 pr-12 bg-[#505057] border-r-2 border-[#E1348B]';
  let Inactivestyle = 'text-sm font-light py-2 pl-8 pr-12';

  let Assignments = [
    {
      no: 1,
      module: 1,
      courseId: 1,
      name: 'Rohit Mehta',
      date: '12/12/2021',
    },
    {
      no: 2,
      module: 1,
      courseId: 1,
      name: 'Rohit Mehta',
      date: '12/12/2021',
    },
    {
      no: 3,
      module: 1,
      courseId: 1,
      name: 'Rohit Mehta',
      date: '12/12/2021',
    },
    {
      no: 4,
      module: 1,
      courseId: 1,
      name: 'Rohit Mehta',
      date: '12/12/2021',
    },
    {
      no: 5,
      module: 0,
      courseId: 1,
      name: 'Rohit Mehta',
      date: '12/12/2021',
    },
  ];

  return (
    <div className="flex">
      {isMobileScreen && (
        <div
          className={`fixed right-0 ${SideBarState ? "block" : "hidden"} w-[281px] h-screen bg-[#25262C]  rounded-l-[40px] z-10`}
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
      <div className="flex-grow bg-[#2E3036]  md:rounded-l-[40px]">
            {/* <StudentTopbar heading={"My Progress"} /> */}
            <div className="flex justify-between  top-0 md:border-b-[1px] border-b-[2px] border-[#717378]">
              <Dashboardnav heading="My Progress" toggleSideBar={toggleSideBar} />
            </div>

      
        <div className=" bg-[#37383F] mx-5 mt-5 rounded-[30px] text-white space-y-6">
          <div className="lg:grid lg:grid-cols-11 h-full">
            {/* Modules */}
            <div className="col-span-3 lg:border-r-[1px] lg:border-gray-500 ">
              <div className="title font-medium text-xl pt-10 pb-5 pl-8">
                Modules
              </div>
              <div
                className={module == 0 ? Activestyle : Inactivestyle}
                onClick={() => setModule(0)}
              >
                1. UX Case Study - studying the experience
              </div>
              <div
                className={module == 1 ? Activestyle : Inactivestyle}
                onClick={() => setModule(1)}
              >
                1. UX Case Study - studying the experience
              </div>
              <div
                className={module == 2 ? Activestyle : Inactivestyle}
                onClick={() => setModule(2)}
              >
                1. UX Case Study - studying the experience
              </div>
              <div
                className={module == 3 ? Activestyle : Inactivestyle}
                onClick={() => setModule(3)}
              >
                1. UX Case Study - studying the experience
              </div>
              <div
                className={module == 4 ? Activestyle : Inactivestyle}
                onClick={() => setModule(4)}
              >
                1. UX Case Study - studying the experience
              </div>
            </div>

            {/* Assignments */}
            <div className="col-span-8">
              <div className="title font-medium text-xl pt-8 pb-2 pl-8 border-b-[1px] border-gray-500">
                Files
              </div>
              <div className="filecontainer py-4 md:px-6 grid md:grid-cols-3 grid-cols-2">
                {Assignments.filter(
                  (assignment) => module == assignment.module
                ).map((assignment, index) => (
                  <AssignmentCard
                    key={index}
                    no={index + 1}
                    name={assignment.name}
                    date={assignment.date}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <MobileNav className="fixed bottom-0 left-0 w-full" /> */}
    </div>
  );
}
