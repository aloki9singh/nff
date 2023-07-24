import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";

import { FiEdit2 } from "react-icons/fi";
import CourseoverviewSidebar from "@/components/common/sidebar/courseoverview";

import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  arrayUnion,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { db } from "@/config/firebaseconfig";
import Dashboardnav from "@/components/common/navbar/dashboardnav";
import StudentProfileChart from "@/components/student/profile/chart";
import StudentProfileCirProgress from "@/components/student/profile/StudentProfileCirProgress";
import { useMediaQuery } from "react-responsive";
import { useAuthContext } from "@/lib/context/AuthContext";
import Link from "next/link";
import withStudentAuthorization from "@/lib/HOC/withStudentAuthorization";

//returning some backed error

function StudentProfile() {
  const router = useRouter();
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);
  const [enrolledcourses, setenrolledcourses] = useState([]);
  const [completedcourses, setcompletedcourses] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [subscribed, setSubscribed] = useState([]);
  const [switchcomp, setswitchcomp] = useState("enrolled");
  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }

  const { user, userProfile } = useAuthContext();
  console.log(userProfile);
  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }
  }, [isMediumScreen]);
  const chartData = [0, 0, 0, 0, 0, 0, 0]; //Change this student data to show on chart, passed as prop
  ``;


  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      const userRef = doc(db, "allusers", user.uid);
      const collectionRef = collection(userRef, "joinedCourses");
      const querySnapshot = await getDocs(collectionRef)

      const data = querySnapshot.docs.map((doc) => doc.data());
      console.log(data);
      setenrolledcourses(data);
    }
    fetchEnrolledCourses();
  }, [user.uid])


  if (!user || !userProfile) {
    router.push("/");
  }
  if (!user || !userProfile) {
    return null;
  }

  return (
    <>
      <div className="md:h-screen h-full  text-base bg-[#15161B]">
        <div className="flex">
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
            className="col-span-5 lg:col-span-4 md:rounded-l-[50px]  w-full "
          >
            <div className="flex justify-between  top-0 md:border-b-[1px] border-b-[2px] border-[#717378]">
              <Dashboardnav heading={"Profile"} toggleSideBar={toggleSideBar} />
            </div>
            {/* <hr className="hidden md:block opacity-50 mt-3 "></hr> */}
            <div className="text-white grow flex flex-col items-center justify-center h-fit md:pt-0 ">
              {/* text */}

              <div className="   h-[120px] w-full bg-gradient-to-r from-[#A145CD] to-[#E1348B] "></div>

              <div className="w-full h-full   md:text-base text-sm  ">
                <div className=" md:mx-10 mx-5">
                  <div className="flex">
                    {" "}
                    <Image
                      src={
                        userProfile.photoURL ||
                        "/componentsgraphics/common/Anonymousimage/anonymous.png"
                      }
                      alt="proImg"
                      height={150}
                      width={150}
                      className="rounded-full w-[120px] h-[120px] object-cover mt-[-85px]"
                    />
                    <div className="w-[100%] flex justify-between">
                      <div className="text-xl md:text-2xl ml-4 mt-[-55px]">
                        {user.displayName}
                        <p className="text-xs ml-2">
                          Roll no-{userProfile.rollNo || " N/A"}
                        </p>
                      </div>
                      <Link href={"/beta/profiledetails"}>
                        <div className="flex text-xs md:text-sm mt-[-25px] ">
                          <div className="md:block hidden">Edit profile</div>
                          <div className="md:hidden">Edit </div>
                          <FiEdit2 className="ml-1 mt-[2px]" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* /// */}
            <div className="lg:grid lg:grid-cols-11   m-5  md:mt-0 text-white justify-between">
              <div className="lg:col-span-5 lg:pr-4">
                <div className="flex justify-center align-center">
                  <div className="bg-[#373A41]   w-full mx-5   rounded-[20px] pb-5 pt-3 px-4 space-y-2 md:px-6 mt-5 flex flex-col">
                    <div className="text-center pt-2 pb-2 px-4 font-semibold flex justify-between w-full cursor-pointer">
                      <p onClick={() => setswitchcomp("enrolled")}>
                        Enrolled courses
                      </p>
                      <p onClick={() => setswitchcomp("completed")}>
                        Completed Courses
                      </p>
                    </div>
                    {/* Need to done using Array */}
                    {switchcomp == "enrolled" ? (
                      <div className="mt-2 h-[200px] overflow-y-scroll scrollbar-hide py-2">
                        {enrolledcourses.length ? (
                          enrolledcourses.map((e, i) => (
                            <div key={i} className="border-l-[4px] border-pink flex mb-2 pl-4">
                              <div>
                                <h1>{e.title}</h1>
                                <p className="text-xs text-[#FFFFFF80] font-semibold">
                                  {e.time}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-gray-500 flex justify-center items-center h-[180px]">
                            No enrolled courses available
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="mt-2 h-[200px] overflow-y-scroll scrollbar-hide py-2">
                        {completedcourses.length ? (
                          completedcourses.map((e, i) => (
                            <div key={i} className="border-l-[4px] border-pink flex mb-2 pl-4">
                              <div>
                                <h1>{e.title}</h1>
                                <p className="text-xs text-[#FFFFFF80] font-semibold">
                                  {e.time}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-gray-500 flex justify-center items-center h-[180px]">
                            Currently no completed courses
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-center w-[93%] mx-auto align-center">
                  <div className="bg-[#373A41] rounded-[20px] w-full pb-9 pt-3 px-4 space-y-2 md:px-3  mt-5 flex flex-col">
                    <div className="text-center pt-2 pb-4 px-4 flex justify-center w-full">
                      Certificates
                    </div>
                    {/* Need to done using Array */}
                    <div className="mt-2 h-[175px] overflow-y-scroll scrollbar-hide py-2">
                      {certificates.length ? (
                        certificates.map((e, i) => (
                          <div key={i} className="flex mb-6 px-2 justify-between">
                            <div className="flex">
                              <div className="h-[20px] w-[20px] rounded-full mr-2 bg-[#484D58]"></div>
                              <h1 className="text-sm ">{e.coursename}</h1>
                            </div>
                            <div className="px-2 py-1 tx-white text-xs bg-[#E1348B] rounded-[10px]">
                              View certificate
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-gray-500 flex justify-center items-center h-[130px]">
                          You haven&apos;t earned a certificate
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="flex justify-center align-center">
                  <div className="bg-[#373A41] md:h-[296px]  rounded-[20px] py-3 px-4 md:w-[100%] md:flex  w-[94%] md:mx-0  mt-5 flex flex-col md:flex-row">
                    <div className=" md:w-2/3  flex flex-col justify-between text-center py-4 ">
                      <h1 className="font-semibold text-sm">Activity Hours</h1>
                      <div className="mt-2">
                        <StudentProfileChart data={chartData} />
                      </div>
                    </div>
                    <div className="  h-[100%] flex flex-col justify-between text-center py-4 px-2">
                      <div className="flex space-x-4 justify-end h-[13%]">
                        <select className="py-1 px-2 mr-2 text-sm rounded-xl focus:outline-none bg-[#728095] text-white cursor-pointer">
                          <option selected hidden>
                            Time
                          </option>
                          <option className="cursor-pointer selected">
                            Weekly
                          </option>
                          <option className="cursor-pointer">Monthly</option>
                          <option className="cursor-pointer">Quaterly</option>
                        </select>
                      </div>
                      <div className="w-full md:h-[23%] sd:my-2 flex justify-end ">
                        <div className="w-full md:w-[75%]  min-w-[146px] mx-2 h-[100%] text-center text-white flex flex-col justify-between py-2 px-4 rounded-xl bg-gradient-to-r from-[#A145CD] to-[#E1348B]">
                          <p className="text-sm">Time Spent</p>
                          <div className="flex justify-between px-3">
                            <span className="font-semibold">{0}</span>
                            <span className="bg-[#000] text-[12px] px-1 rounded-md py-[0.8]">
                              {0} %
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:h-[23%] sd:my-2 flex justify-end ">
                        <div className="w-full md:w-[75%]  min-w-[146px] mx-2 h-[100%] text-center text-white flex flex-col justify-between py-2 px-4 rounded-xl bg-gradient-to-r from-[#A145CD] to-[#E1348B]">
                          <p className="text-sm">Lesson Taken</p>
                          <div className="flex justify-between px-3">
                            <span className="font-semibold">{0}</span>
                            <span className="bg-[#000] text-[12px] px-1 rounded-md py-[0.8]">
                              {0} %
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:h-[23%] sd:my-2 flex justify-end ">
                        <div className="w-full md:w-[75%]  min-w-[146px] mx-2 h-[100%] text-center text-white flex flex-col justify-between py-2 px-4 rounded-xl bg-gradient-to-r from-[#A145CD] to-[#E1348B]">
                          <p className="text-sm">Exam Passed</p>
                          <div className="flex justify-between px-3">
                            <span className="font-semibold">{0}</span>
                            <span className="bg-[#000] text-[12px] px-1 rounded-md py-[0.8]">
                              {0} %
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between flex-col md:flex-row w-[93%] md:w-[100%] mx-auto">
                  <div className="bg-[#373A41] h-[264px]  rounded-[20px] pb-9 pt-3 px-4 space-y-2 md:w-[55%] mt-5 flex flex-col">
                    <div className="text-center pt-2 pb-4 px-4 flex justify-center w-full">
                      Subscription
                    </div>
                    <div className="mt-2 h-[160px] overflow-y-scroll scrollbar-hide py-2 px-2">
                      {subscribed.length ? (
                        subscribed.map((e, i) => (
                          <div key={i} className="flex mb-6 px-2 justify-between border-l-[4px] border-pink">
                            <div className="flex">
                              <h1 className="text-base">UI/UX Designer</h1>
                            </div>
                            <div className="px-2 py-1 tx-white text-xs bg-[#E1348B] rounded-[10px]">
                              Active
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-gray-500 flex justify-center items-center h-[140px]">
                          Not subscribed yet
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="bg-[#373A41] h-[264px]  rounded-[20px] py-3 px-4  md:w-[40%] mt-5 flex flex-col">
                    <div className="text-center h-[10%] pt-2 pb-4 px-4 flex justify-center w-full">
                      Rank
                    </div>
                    <div className="w-full h-[90%] sd:mt-4 ">
                      {" "}
                      <StudentProfileCirProgress percentage={0} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className=" ">
          <MobileNav></MobileNav>
        </div> */}
      </div>
    </>
  );
}
export default withStudentAuthorization(StudentProfile);
