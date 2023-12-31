// Hard Coded top-Navbar
// In mobile screen dropdown is missing of modules.
// file icon missing
//yet to write logic to change course bougth or not ??
import { useState, useEffect, useMemo } from "react";
// import MobileNav from '../components/CalenderParts/MobileNav';
import AssignmentCard from "@/components/student/assignments/foldercard";
import { useRouter } from "next/router";
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
import Layout from "@/components/common/Layout/Layout";

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
  const [submitted, setSubmit] = useState();
  const [checked, setChecked] = useState();
  let [searchstate, setsearchstate] = useState("");
  const [dataFetched, setDataFetched] = useState(false);
  const [activeElement, setActiveElement] = useState("total");
  let searchfun = (e) => {
    setsearchstate(e.target.value);
  };
  const { user, userProfile, joinedCourses } = useAuthContext();

  useEffect(() => {
    setModuleName(moduleData && moduleData[0]?.module);
    setValue(moduleData && moduleData[0]?.course);
  }, [moduleData, dataFetched]);

  if (!user || !userProfile) {
    router.push("/");
  }

  const handleToggleElement = (element) => {
    setActiveElement(element);
  };

  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }

    const getCourseId = async () => {
      if (!dataFetched) {
        const userRef = doc(db, "allusers", user?.uid);
        const collectionRef = collection(userRef, "joinedCourses");
        const querySnapshot = await getDocs(collectionRef);
        const data = querySnapshot.docs.map((doc) => doc.data());
        const id = [];
        var arr = [];
        const moduleInfo = [];
        const uniq = [];
        const check = [];
        const submit = [];
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
              const isUnique =
                uniq.findIndex((item) => item == e.course) !== -1;
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
        arr.map((ele) => {
          if (ele.files) {
            ele.files.map((e) => {
              if (e.submittedby == user.uid && e.checked) {
                check.push(ele);
              } else if (e.submittedby == user.uid) {
                submit.push(ele);
              }
            });
          }
        });
        setSubmit(submit);
        setChecked(check);
        setUnique(uniq);
        setModuleData(moduleInfo);
        setCourse(arr);
        setDataFetched(true);
      }
    };

    getCourseId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMediumScreen, user?.uid]);
  //   const moduleDataMemo = useMemo(() => moduleData, [moduleData]);
  //   const courseMemo = useMemo(() => course, [course]);
  //   useEffect(() => {
  //     setModuleName(moduleDataMemo && moduleDataMemo[0]?.module);
  //     setValue(moduleDataMemo && moduleDataMemo[0]?.course);
  //   }, [moduleDataMemo]);

  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }

  let currentCourseId = 1;
  let Activestyle =
    "text-sm font-light py-2 pl-8 pr-12 bg-[#505057] border-r-2 border-[#E1348B]";
  let Inactivestyle = "text-sm font-light py-2 pl-8 pr-12";

  const { userSubsribed } = CourseAccess(user?.uid);
  return (
    <Layout pageTitle="Assignments">
      {!userSubsribed && (
        <ToastMessage
          heading={"OOPS!"}
          message={
            "Subscribe to access Assignment."
          }
        />
      )}
      {/* {!courseBuyed ? <NoJoinedCoursesModal /> : null} */}
      {/* {userSubsribed && (
      <ToastMessage
        heading={"No homework Availaible"}
        message={"Please Continue learning..."}
        showButton={false}
        />

        )} */}

      <div className={`${!userSubsribed ? "blur-lg" : null} h-screen`}>

        {/* Switching Between mobileSidebar / normal sidebar based on width */}
        <div className="flex">
          {/* Mobile Sidebar */}
          {isMobileScreen && (
          <div
            className={`fixed right-0 ${
              SideBarState ? "block" : "hidden"
            } w-[281px] h-[100%] bg-[#25262C]  rounded-l-[40px] z-10`}
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
                            {ele.length > 12 ? ele.slice(0, 13) + "..." : ele}
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
                        if (ele.course === value) {
                          return (
                            <ul
                              key={i}
                              className={
                                module === i ? Activestyle : Inactivestyle
                              }
                              onClick={() => {
                                setModuleName(ele.module);
                                setModule(i);
                              }}
                            >
                              <li>{ele.module}</li>
                            </ul>
                          );
                        }
                        return null;
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
                  <div className="w-full h-20 text-white flex flex-row  justify-between border-b-[1px]">
                    <div className="title font-medium text-xl pt-8 pb-2 pl-8 border-gray-500">
                      Files
                    </div>
                    <div className="flex pt-3 pl-8 mr-16 gap-4">
                      <div className=" flex items-center">
                        {" "}
                        <div>
                          <span
                            className={`border-b-2 ${activeElement === "total"
                                ? "border-[#E1348B]"
                                : "border-transparent"
                              }`}
                            onClick={() => handleToggleElement("total")}
                          >
                            Total
                          </span>
                        </div>
                        <div className="mr-2 cursor-pointer">
                          <div className="bg-[#494c53] rounded-sm ml-2 w-6 h-6 flex items-center justify-center">
                            {course && course.length}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div onClick={() => handleToggleElement("check")}>
                          <span
                            className={`border-b-2 ${activeElement === "check"
                                ? "border-[#E1348B]"
                                : "border-transparent"
                              }`}
                          >
                            Checked
                          </span>
                        </div>
                        <div className="mr-2 cursor-pointer">
                          <div className="bg-[#494c53] rounded-sm ml-2 w-6 h-6 flex items-center justify-center">
                            {checked && checked.length}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="filecontainer grid md:grid-cols-3 grid-cols-1 gap-2 m-2 max-h-screen overflow-scroll scrollbar-hide">
                    {course &&
                      moduleName &&
                      course.map((assignment, i) => {
                        if (
                          assignment.module === moduleName &&
                          assignment.course === value
                        ) {
                          const isActiveCheck =
                            activeElement === "check" &&
                            checked.includes(assignment);
                          const isActiveTotal = activeElement === "total";

                          return isActiveCheck || isActiveTotal ? (
                            <AssignmentCard
                              key={i}
                              id={assignment.id}
                              no={i + 1}
                              name={assignment.title}
                              date={assignment.date}
                              url={assignment.url}
                              courseid={assignment.courseid}
                              checked={checked.includes(assignment)}
                              active={activeElement}
                              submit={
                                submitted && submitted.includes(assignment)
                              }
                            />
                          ) : null;
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
                      <div className="">
                        <Nodata title="Assignment" value="No Assignment" />
                      </div>
                    )}
                  {uniqCourse.length == 0 && (
                    <div className="">
                      <Nodata title="Course" value="No Course available" onClick={() => router.push("/beta/courseoverview")} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// export default withStudentAuthorization(Assignments);
export default withStudentAuthorization(Assignments);
