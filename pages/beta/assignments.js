// Hard Coded top-Navbar
// In mobile screen dropdown is missing of modules.
// file icon missing
//yet to write logic to change course bougth or not ??
import { useState, useEffect } from "react";
// import MobileNav from '../components/CalenderParts/MobileNav';
import AssignmentCard from "@/components/student/assignments/foldercard";
import { useRouter } from "next/router";
import assignmentupload from "./assignmentupload";
import { useMediaQuery } from "react-responsive";
import CourseoverviewSidebar from "@/components/common/sidebar/courseoverview";
import Dashboardnav from "@/components/common/navbar/dashboardnav";
import { useAuthContext } from "@/lib/context/AuthContext";
import withStudentAuthorization from "@/lib/HOC/withStudentAuthorization";

import ToastMessage from "@/components/common/ToastMessage/ToastMessage";
import CourseAccess from "@/lib/context/AccessCourseContext";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebaseconfig";
import Nodata from "@/components/common/nodata/nodata";

function Assignments() {
  const router = useRouter();
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);
  const [moduleData, setModuleData] = useState();
  const [course, setCourse] = useState();
  const [moduleName, setModuleName] = useState();
  const [uniqCourse, setUnique] = useState([]);
  const [value, setValue] = useState();
  const [module, setModule] = useState(0);
  let [searchstate, setsearchstate] = useState("");
  console.log(course,"course");
  let searchfun = (e) => {
    setsearchstate(e.target.value);
  };
  const { user, userProfile, joinedCourses } = useAuthContext();
  if (!user || !userProfile) {
    router.push("/");
  }

  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }

    const getCourseId = async () => {
      const userRef = doc(db, "allusers", user.uid);
      const collectionRef = collection(userRef, "joinedCourses");
      const querySnapshot = await getDocs(collectionRef);
      const data = querySnapshot.docs.map((doc) => doc.data());

      const id = [];
      var arr = [];
      const moduleInfo = [];
      const uniq = [];
      data.map((ele) => {
        id.push(ele.id);
        uniq.push(ele.title);
      });

      for (var i = 0; i < id.length; i++) {
        const q = query(collection(db, "courses"), where("id", "==", id[i]));
        const courseInfo = await getDocs(q);
        const promises = courseInfo.docs.map(async (doc) => {
          const docRef = doc.ref;
          const collectionRef = collection(docRef, "assignment");
          const querySnapshot = await getDocs(collectionRef);
          return querySnapshot.docs.map((doc) => doc.data());
        });
        const assignmentDataArrays = await Promise.all(promises);
        assignmentDataArrays.forEach((assignmentDataArray) =>
          arr.push(...assignmentDataArray)
        );
      }
      if (arr) {
        for (let i = 0; i < arr.length; i++) {
          arr.map((e) => {
            const data = {
              course: e.course,
              module: e.module,
            };
            const isUnique = uniq.findIndex((item) => item == e.course) !== -1;
            if (!isUnique) {
              uniq.push(e.course);
            }
            const isDuplicate =
              moduleInfo.findIndex(
                (item) =>
                  item.course === data.course && item.module === data.module
              ) !== -1;
            if (!isDuplicate) {
              moduleInfo.push(data);
            }
          });
        }
      }
      setUnique(uniq);
      setModuleData(moduleInfo);
      setCourse(arr);
    };

    getCourseId();
  }, [isMediumScreen, user.uid]);

  useEffect(() => {

    setModuleName(moduleData && moduleData[0]?.module)
    setValue(moduleData && moduleData[0]?.course)
  }, [moduleData])

  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }

  // We would get a courseID from the backend and then use that to fetch the assignments for a particular module

  //  need from backend
  let currentCourseId = 1;
  let Activestyle =
    "text-sm font-light py-2 pl-8 pr-12 bg-[#505057] border-r-2 border-[#E1348B]";
  let Inactivestyle = "text-sm font-light py-2 pl-8 pr-12";

  if (!user || !userProfile) {
    return null;
  }

  const { userSubsribed } = CourseAccess(user.uid);
  return (
    <>
      {/* {!userSubsribed && (
        <ToastMessage
        heading={"OOPS!"}
          message={
            "You have not joined any courses yet. Please join a course to access the study material."
          }
        />
      )} */}
      {/* {!courseBuyed ? <NoJoinedCoursesModal /> : null} */}
      {/* {userSubsribed && (
      <ToastMessage
        heading={"No homework Availaible"}
        message={"Please Continue learning..."}
        showButton={false}
        />

        )} */}

      <div className={``}>
        {/* Switching Between mobileSidebar / normal sidebar based on width */}
        <div className="flex">
          {/* Mobile Sidebar */}
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
          
          {/* Main page */}
          <div className="flex-grow bg-[#2E3036]  md:rounded-l-[40px]">
            {/* <StudentTopbar heading={"My Progress"} /> */}
            <div className="flex justify-between  top-0 md:border-b-[1px] border-b-[2px] border-[#717378]">
              <Dashboardnav
                heading="My Progress"
                toggleSideBar={toggleSideBar}
              />
            </div>

            {/* Div under Topbar with the main content */}

            <div className=" bg-[#37383F] mx-5 mt-5 rounded-[30px] text-white space-y-6">
              {/* Main content (Assignments ) */}
              <div className="lg:grid lg:grid-cols-11 min-h-screen">
                {/* Modules */}
                <div className="col-span-3 lg:border-r-[1px] lg:border-gray-500 ">

                  {/* Course Select */}
                  <div className="title font-medium text-xl pt-10 pb-5 pl-8">
                    Courses
                  </div>
                  <select
                    name="course"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    className="focus:outline-none text-white text-sm rounded-lg block w-full p-4 bg-[#37383F] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500"
                  >
                    {/* <option value="" className="text-sm">
                      Select from this List
                    </option> */}
                    {uniqCourse &&
                      uniqCourse.map((ele, i) => {
                        return (
                          <option
                            key={i}
                            className="text-sm cursor-pointer "
                            value={ele}
                          >
                            {ele}
                          </option>
                        );
                      })}
                  </select>

                  {/* Modules of the selected course */}
                  <div className="title font-medium text-xl pt-10 pb-5 pl-8">
                    Modules
                  </div>
                  <div className="max-h-screen  overflow-scroll scrollbar-hide">
                    {moduleData &&
                      moduleData.map((ele, i) => {
                        if (ele.course == value) {
                          return (
                            <div
                              key={i}
                              className={
                                module === i ? Activestyle : Inactivestyle
                              } // Note: Use === for comparison
                              onClick={() => {
                                setModuleName(ele.module);
                                setModule(i);
                              }}
                            >
                              {`${i + 1}. ${ele.course} - ${ele.module}`}
                            </div>
                          );
                        }
                      })}
                  </div>
                  {moduleData &&
                    moduleData.every((ele) => ele.course !== value) && (
                      <div className=" flex text-center justify-center items-center text-gray-500 h-[50%]">
                        {/* <Nodata title="Module" value="No Module" /> */}
                        No modules available
                      </div>
                    )}
                </div>

                {/* Assignments */}
                <div className="col-span-8">
                  <div className="title font-medium text-xl pt-8 pb-2 pl-8 border-b-[1px] border-gray-500">
                    Files
                  </div>
                  <div className="filecontainer py-4 md:px-6 grid md:grid-cols-3 grid-cols-1">
                    {course &&
                      moduleName &&
                      course.map((assignment, i) => {
                        if (
                          assignment.module === moduleName &&
                          assignment.course === value
                        ) {
                          return (
                            <AssignmentCard
                              key={i}
                              id={assignment.id}
                              no={i + 1}
                              name={assignment.title}
                              date={assignment.date}
                              url={assignment.url}
                              courseid={assignment.courseid}
                            />
                          );
                        }
                        return null;
                      })}
                  </div>
                  {course &&
                    moduleName &&
                    course.every(
                      (assignment) =>
                        assignment.module !== moduleName ||
                        assignment.course !== value
                    ) && (
                      <div className="-mt-8">
                        <Nodata title="Homework" value="No Homework" />
                      </div>
                    )}
                  {course?.length==0 && (
                    <div className="-mt-8">
                      <Nodata title="Course" value="No Course available" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// export default withStudentAuthorization(Assignments);
export default withStudentAuthorization(Assignments);
