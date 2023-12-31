// in mobile screen whole ui is according to figma design
// to make it understandable comments needed for later
import { BiBell } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import { useEffect, useState } from "react";
import StudentScheduleMainBody from "@/components/common/calendar/student/mainbody";
import { useRouter } from "next/router";
import { auth } from "@/config/firebaseconfig";
import Dashboardnav from "@/components/common/navbar/dashboardnav";
import CourseoverviewSidebar from "@/components/common/sidebar/courseoverview";
import { onAuthStateChanged } from "firebase/auth";
import { useMediaQuery } from "react-responsive";
import withStudentAuthorization from "@/lib/HOC/withStudentAuthorization";
import { useAuthContext } from "@/lib/context/AuthContext";


import ToastMessage from "@/components/common/ToastMessage/ToastMessage";
import CourseAccess from "@/lib/context/AccessCourseContext";
import Layout from "@/components/common/Layout/Layout";

function CheckClassSchedule() {
  const [count, setCount] = useState(1);
  const [us, setUser] = useState({});
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);
  let [searchstate, setsearchstate] = useState("");
  const { joinedCourses } = useAuthContext();
  const { user, userProfile } = useAuthContext();
  //yet to write logic to change course bougth or not ??
  const [courseBuyed, setCourseBuyed] = useState(false);

  let searchfun = (e) => {
    setsearchstate(e.target.value);
  };
  // console.log(auth.currentUser);
  const router = useRouter();
  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, [isMediumScreen]);


//  useEffect(() => {
//     if (!us) {
//       return null;
//     }
//   }, [us, selectedDate]);

  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }
  const { userSubsribed } = CourseAccess(user.uid);

  return (
    <Layout pageTitle="Schedule">
      {!userSubsribed && (
        <ToastMessage
          heading={"Nothing is Scheduled!!"}
          message={
            "You have not joined any courses yet. Please join a course to access the Schedule."
          }
        />
      )}
      <div className={`h-screen w-full text-base 
      
    
    
    }`
    
    }
      
      >
        <div className="flex bg-[#141518] ">
          {isMobileScreen && (
            <div
              className={`fixed right-0 ${SideBarState ? "block" : "hidden"
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
          <div
            style={{ background: "#2E3036" }}
            className=" col-span-7 w-full md:rounded-l-[40px] "
          >
            <Dashboardnav heading="My Profile" toggleSideBar={toggleSideBar} />

            <div className="grid grid-cols-5 justify-center  ">
              <div className=" col-span-5 lg:col-span-5 mb-7">
                <div className="md:flex mt-2 md:mt-0">
                  <div
                    className="w-full overflow-hidden"
                    onClick={() => setCount(1)}
                  >
                    <StudentScheduleMainBody />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default withStudentAuthorization(CheckClassSchedule);

