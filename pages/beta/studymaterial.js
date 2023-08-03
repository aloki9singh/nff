import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CourseoverviewSidebar from "@/components/common/sidebar/courseoverview";
import Dashboardnav from "@/components/common/navbar/dashboardnav";
import { useRouter } from "next/router";
import { db } from "config/firebaseconfig";
import { collection, getDocs, query } from "firebase/firestore";
import { useMediaQuery } from "react-responsive";
import withStudentAuthorization from "@/lib/HOC/withStudentAuthorization";
import { useAuthContext } from "@/lib/context/AuthContext";
import ToastMessage from "@/components/common/ToastMessage/ToastMessage";
import CourseAccess from "@/lib/context/AccessCourseContext";
import StudyMaterialMain from "@/components/mentor/studymetrial/studyMaterial";


function StudyMaterial() {
  const router = useRouter();
  //material array
  const [material, setMaterial] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  //sccreen check
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);
  const { joinedCourses } = useAuthContext();
  const { user, userProfile } = useAuthContext();

  //fetching data of study materials 
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "studyMaterial"));
      const materialSnapshot = await getDocs(q);
      const materialData = materialSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMaterial(materialData);
    };
    fetchData();
  }, []);


  //Dropdown items
  const menuItems = [...new Set(material.map((Val) => Val.title))];
  menuItems[0] = "All courses";

  // for filtering 
  const filteredMaterial = selectedOption
    ? material.filter((item) => item.title === selectedOption)
    : material;

  const func = selectedOption == "All courses" ? material : filteredMaterial;

  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }
  }, [isMediumScreen]);
  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }
  const { userSubsribed } = CourseAccess(user.uid);

  return (
    <>
      {!userSubsribed && (
        <ToastMessage
          heading={"OOPS!"}
          message={
            "You have not joined any courses yet. Please join a course to access the study material."
          }
        />
      )}

      {/* {userSubsribed && (
        <ToastMessage
          heading={"No Material Availaible"}
          message={"Please Continue learning..."}
          showButton={false}
        />
      )} */}

{/* 

    please remove blur-sm when the content is there to show Case */}

      <div className={`flex h-screen bg-[#2D2E35]  ${!userSubsribed ? "blur-lg" : null}`}>
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
        <div className="w-full h-screen flex flex-col bg-[#2D2E35] space-y-4">
          <Dashboardnav
            heading="Study Material"
            toggleSideBar={toggleSideBar}
          />
          {/* <div className="lg:w-64 w-80 items-center lg:ml-16 ml-9 rounded-lg m-auto">
            <select
              onChange={(e) => setSelectedOption(e.target.value)}
              className="block w-full p-2 text-base rounded-md focus:outline-none bg-[#A145CD] text-white cursor-pointer"
            >
              <option selected hidden>
                Select Courses
              </option>
              {menuItems.map((item) => (
                <option key={item} value={item} className="cursor-pointer">
                  {item}
                </option>
              ))}
            </select>
          </div> */}

          <div className="bg-[#2D2E35] text-white grow flex  ">
            <StudyMaterialMain />
          </div>
        </div>
      </div>
    </>
  );
}
export default withStudentAuthorization(StudyMaterial);
