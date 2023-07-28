// needed to be work on top-courses, stats, edit profile

import { useState } from "react";
// import MentorSidebar from "../components/Schedule/MentorSidebar2";

import CourseCard from "@/components/student/courses/CourseCard2";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { callUserById, GetAllUsers } from "@/lib/exportablefunctions";
import { auth, db } from "@/config/firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";

import withAuth from "@/lib/context/mentorcontext";
// import MobileNav from "../components/CalenderParts/MobileNav";
import MentorSidebar from "@/components/common/sidebar/mentor";
import MentorTopbar from "@/components/common/navbar/mentortopbar";
import Image from "next/image";
import MentorChart from "@/components/mentor/other/chart";

import { FiEdit2 } from "react-icons/fi";
import { useMediaQuery } from "react-responsive";
import withMentorAuthorization from "@/lib/HOC/withMentorAuthorization.js";
import Link from "next/link";
import { collection, getDocs, query } from "firebase/firestore";

function MentorProfile() {
  const router = useRouter();
  // const { data } = useSelector((state) => state.authManagerMentor);
  const chartData = new Array(12).fill(0);
  const [uid, setUid] = useState("");
  const [userData, setUserData] = useState({});
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);
  const [rating, setRating] = useState(0);
  const [myCourse, setMyCourse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "courses"));
      const myCourseSnapshot = await getDocs(q);
      const myCourseData = myCourseSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMyCourse(myCourseData);
    };
    fetchData();
  }, []);
  const [answeredquestions, setAnsweredQuestions] = useState(0);
  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }

  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }
    const data = GetAllUsers();
    // console.log(data);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        callUserById(user.uid).then((data) => setUserData(data.user));
      }
    });
    return () => unsubscribe();
  }, [isMediumScreen]);

  userData.joinedStudents?.map((student) => {
    const joinDate = new Date(student.joinedAt?.seconds * 1000);
    chartData[joinDate.getMonth()]++;
  });

  return (
    <>
      <div className="h-full text-base bg-[#2E3036] md:rounded-tl-[40px]">
        <div className="flex md:rounded-tl-[40px]">
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
            <div className={`md:block hidden w-[221px] bg-[#141518] z-10`}>
              <MentorSidebar toggleSideBar={toggleSideBar} />
            </div>
          )}

          <div className="flex-grow w-[10rem] md:rounded-tl-[40px]">
            <div className="flex justify-between md:bg-[#2E3036] bg-[#141518] top-0 md:border-b-[1px] border-b-[2px] border-[#717378] md:rounded-tl-[40px]">
              <MentorTopbar heading="Profile" toggleSideBar={toggleSideBar} />
            </div>

            <div className="text-white grow flex flex-col items-center justify-center h-fit ">
              {/* text */}
              <div className="h-[120px] w-full bg-gradient-to-r from-[#A145CD] to-[#E1348B] " />
              <div className="w-[90%] h-full   md:text-base text-sm  ">
                <div className="  mx-5">
                  <div className="flex">
                    {" "}
                    <Image
                      src={
                        userData.photoURL
                          ? userData.photoURL
                          : "/componentsgraphics/common/Anonymousimage/anonymous.png"
                      }
                      alt="proImg"
                      height={100}
                      width={100}
                      className="rounded-full w-[100px] object-cover h-[100px]  mt-[-60px]"
                    />
                    <div className="w-[100%] flex justify-between">
                      <div className="text-xl md:text-2xl ml-4 mt-[-35px]">
                        {userData &&
                        userData.displayName &&
                        userData.displayName.includes("gmail")
                          ? userData.displayName.slice(0, 5)
                          : userData.displayName}
                      </div>
                      <div
                        onClick={() =>
                          router.push({
                            pathname: "/meta/mentorprofile",
                            query: { uid: userData.uid },
                          })
                        }
                      >
                        <div className="flex text-xs md:text-sm mt-[-25px]">
                          <div className="md:hidden">Edit profile</div>
                          <div className="md:block hidden">Edit profile</div>
                          <FiEdit2 className="ml-1 mt-[2px]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /// */}
            <div className="flex md:flex-row flex-col    justify-center   m-5  md:mt-0 text-white  gap-5">
              <div className=" md:w-10/12 ">
                <div className="lg:flex gap-2 justify-around mt-10 mb-5">
                  <div className=" lg:w-1/4 ">
                    <div>
                      <div className="text-left font-semibold text-base ml-1">
                        Stats.
                      </div>
                      <div className="text-center gap-5  text-white  my-1 flex md:flex-row flex-col lg:block">
                        <div className="bg-gradient-to-r from-[#A145CD] to-[#E1348B] rounded-2xl   p-3 md:my-4 ">
                          <p className="text-sm font-semibold">{rating}/5.0</p>
                          <p className="text-xs font-medium whitespace-nowrap">
                            Tutor rating
                          </p>
                        </div>
                        <div className="bg-gradient-to-r from-[#A145CD] to-[#E1348B] rounded-2xl   p-3 md:my-4">
                          <p className="text-sm font-semibold">
                            {answeredquestions}
                          </p>
                          <p className="text-xs font-medium whitespace-nowrap">
                            Question answered
                          </p>
                        </div>
                        <div className="bg-gradient-to-r from-[#A145CD] to-[#E1348B] rounded-2xl   p-3 md:my-4">
                          <p className="text-sm font-semibold">August 2023</p>
                          <p className="text-xs font-medium whitespace-nowrap">
                            Material Prepared
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" md:w-3/4 h-[50vh] ">
                    <div className="text-left">
                      <div className="md:ml-1 font-semibold text-base">
                        Number of students
                      </div>
                      <div className="mt-5 md:mt-2 md:px-5  ">
                        <MentorChart data={chartData} />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between m-5 md:mx-0 my-2">
                    <div>Top courses</div>
                    {/* <div>
                      <button className="border-2 p-1 text-sm">View All</button>
                    </div> */}
                  </div>

                  <div className="w-[100%] flex-wrap md:grid md:grid-cols-3 rounded-[30px] md:space-y-0 space-y-5  gap-3 pt-5">
                    {myCourse &&
                      myCourse.slice(0, 3).map((e) => (
                        <div
                          className="border bg-black rounded-[30px] p-5 md:py-5 "
                          key={e.id}
                        >
                          <div className="flex ">
                            <div className="my-auto">
                              <Image
                                width={110}
                                height={110}
                                alt={"img"}
                                src={e.banner}
                                className="w-12 h-12 md:w-10"
                              />
                            </div>
                            <div className="text-xs md:text-[10px] text-[#E1348B] m-auto">
                              {e.lectures} Lessons
                            </div>
                            <div className="text-xs md:text-[10px] md:ml-1 text-[#E1348B] m-auto">
                              {e.level}
                            </div>
                          </div>
                          <div className="text-[10px] text-gray-600">
                            COURSE
                          </div>
                          <h1 className="text-sm overflow-hidden overflow-ellipsis md:line-clamp-1">
                            {e.title}
                          </h1>
                          <p className="text-[13px] md:text-[10px] md:w-auto w-[300px] whitespace-break-spaces leading-4 text-gray-500 overflow-hidden overflow-ellipsis md:line-clamp-2 line-clamp-3">
                            {e.desc}
                          </p>

                          <div className="text-right">
                            <Link
                              href={{
                                pathname: "/beta/coursedetail",
                                query: { title: e.title },
                              }}
                            >
                              <button className="mt-2 text-xs  border-pink p-2 border">
                                Explore
                              </button>
                            </Link>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="md:mt-12 md:w-[600px]">
                <div className="">
                  <div className="bg-[#373A41] rounded-[20px] text-xl justify-center pb-9 pt-3 px-4 space-y-2 mt-5 flex flex-col">
                    <div className=" text-center text-xl font-bold text-gray-500">
                      Educator highlights
                    </div>
                    <div className="text-center text-lg pt-2 pb-4 font-extralight">
                      Worked at{" "}
                      {userData.details &&
                        userData.details?.experience[0]?.companyname}
                    </div>
                    <div className="flex gap-2 text-sm font-medium line-clamp-1 text-ellipsis ">
                      {" "}
                      <span>
                        <Image
                          src={"/pagesgraphics/mentor/profile/degree_icon.svg"}
                          width={100}
                          height={100}
                          alt="img"
                          className="w-5"
                        />{" "}
                      </span>{" "}
                      <div className="flex md:flex-col">
                        <div>Studied at </div>
                        <span className="text-[#E1348B] text-sm font-black line-clamp-1 text-ellipsis">
                          {userData.details &&
                            userData.details?.qualification[0]?.universityname}
                          (
                          {userData.details &&
                            userData.details?.qualification[0]?.fieldOfStudy}
                          )
                        </span>
                      </div>
                    </div>

                    <p className="ml-7  font-extralight text-[0.9rem] opacity-75">
                      {userData?.details?.qualification.map((e) => (
                        <div key={e}>
                          {e?.universityname} {e.fieldOfStudy}
                          {e.cgpa} {e.grade}
                        </div>
                      ))}
                    </p>

                    <div className="flex gap-2 text-[0.9rem] font-medium">
                      {" "}
                      <span>
                        <Image
                          src={
                            "/pagesgraphics/mentor/profile/location_icon.svg"
                          }
                          width={100}
                          height={100}
                          alt="img"
                          className="w-4"
                        />{" "}
                      </span>{" "}
                      <div className="flex md:flex-col">
                        <div> Lives in </div>
                        <span className="text-[#E1348B] font-black line-clamp-1 text-ellipsis md:flex-col">
                          {userData.details?.address}
                        </span>
                      </div>
                    </div>
                    <p className="ml-7  font-extralight text-[0.9rem] opacity-75 line-clamp-2 text-ellipsis">
                      {userData.details &&
                        userData.details?.experience[0]?.jobtitle}{" "}
                      since{" "}
                      {userData.details &&
                        userData.details?.experience[0]?.startdate}
                    </p>

                    <div className="flex gap-2 line-clamp-1 text-ellipsis">
                      {" "}
                      <Image
                        src={"/pagesgraphics/mentor/profile/globe_icon.svg"}
                        width={100}
                        height={100}
                        alt="img"
                        className="w-5 h-5"
                      />{" "}
                      <span className="text-[0.9rem] font-medium flex md:flex-col">
                        {" "}
                        <div>Knows </div>
                        <span className="text-[#E1348B] font-black  pl-2 line-clamp-2 text-ellipsis">
                          {userData.details &&
                            userData.details?.skills.map((item) => {
                              return <span key={item}>{item}</span>;
                            })}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default withMentorAuthorization(MentorProfile);
