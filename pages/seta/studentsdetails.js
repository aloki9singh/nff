// currently using dummy data for showing student details

// import BottomNav from "../components/Footer/BottomNav";
import Link from "next/link";
import Image from "next/image";
import Schoolsidebar from "@/components/common/sidebar/school";
import SchoolTopbar from "@/components/common/navbar/schooltopbar";

import { AiOutlineSearch } from "react-icons/ai";
import { useContext } from "react";
import { AuthContext } from "@/lib/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebaseconfig";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import Layout from "@/components/common/Layout/Layout";

export default function Studentdetails() {
  const router = useRouter();
  const { studentId } = router.query;
  const [student, setStudent] = useState(null);
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
  }, [isMediumScreen]);
  useEffect(() => {
    if (studentId) {
      fetchStudentDetails(studentId)
        .then((data) => setStudent(data))
        .catch((error) => console.error(error));
    }
  }, [studentId]);

  const fetchStudentDetails = async (studentId) => {
    try {
      const docRef = doc(db, "students", studentId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        throw new Error("Student not found");
      }
    } catch (error) {
      throw new Error("Failed to fetch student details");
    }
  };

  const tabClass = "w-10 h-10 rounded-xl";

  const activeTabClass = "w-10 h-10 bg-[#A145CD] rounded-xl";

  const { userProfile } = useContext(AuthContext);
  if (!student) return <div>Loading...</div>;

  //if (!userProfile) return (<div>Loading...</div>);
  return (
    <Layout pageTitle="Student Details">
      <div className="flex h-screen bg-[#2D2E35]  ">
        {/* First Sidebar - Visible on Mobile */}
        {isMobileScreen && (
          <div
            className={`fixed right-0 ${
              SideBarState ? "block" : "hidden"
            } w-[281px] h-screen bg-[#25262C]  rounded-l-[40px] z-10`}
          >
            <Schoolsidebar toggleSideBar={toggleSideBar} />
          </div>
        )}

        {/* Second Sidebar - Visible on Desktop */}
        {!isMobileScreen && (
          <div className={`md:block  hidden w-[221px] bg-[#141518] z-10`}>
            <Schoolsidebar toggleSideBar={toggleSideBar} />
          </div>
        )}
        <div className="w-full h-fit bg-[#2D2E35] space-y-4">
          <div className=" md:bg-[#2E3036] bg-[#141518] top-0 md:border-b-[1px] border-b-[2px] border-[#717378]">
            <SchoolTopbar heading="My Progress" toggleSideBar={toggleSideBar} />
          </div>
          {/* text */}
          <div className="text-white grow flex flex-col items-center justify-center h-fit md:pt-0 pt-12 ">
            {/* text */}

            <div
              className="h-[20vh] w-full  mt-[-20px] "
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1548263594-a71ea65a8598?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60')",
              }}
            ></div>

            {/* table */}
            <div className="w-full  md:h-screen h-full bg-[#2D2E35] md:text-base text-sm md:flex  ">
              <div className="w-full h-full   md:text-base text-sm  ">
                <div className="md:mx-20 mx-5">
                  <div className="flex">
                    {" "}
                    <Image
                      src={students.photoURL}
                      alt="proImg"
                      height={100}
                      width={100}
                      className="rounded-full w-[110px] object-contain mt-[-65px]"
                    />
                    <div className="ml-1">
                      {students.name.first}
                      <br />
                      <span className="mt-[-5px]">Roll no-{sr.rollNo}</span>
                    </div>
                  </div>
                  <div className="bg-[#141518] rounded-[30px] w-full h-full mt-5 pt-2 text-sm">
                    <div className="flex justify-between px-6 py-3 border-b border-gray-500 ">
                      {" "}
                      <span>Class: </span>
                      <span className="mr-12 text-[#E1348B] ">
                        {students.class}
                      </span>
                    </div>
                    <div className="flex justify-between px-6 py-3 border-b border-gray-500 ">
                      {" "}
                      <span>Number of courses enrolled: </span>
                      <span className="mr-12 text-[#E1348B] ">5</span>
                    </div>
                    <div className="flex justify-between px-6 py-3 border-b border-gray-500 ">
                      {" "}
                      <span>Courses completed: </span>
                      <span className="mr-12 text-[#E1348B] ">4</span>
                    </div>
                    <div className="flex justify-between px-6 py-3 border-b border-gray-500 ">
                      {" "}
                      <span>Ongoing Courses: </span>
                      <span className="mr-12 text-[#E1348B] ">10</span>
                    </div>
                    <div className="flex justify-between px-6 py-3 border-b border-gray-500 ">
                      {" "}
                      <span>Average Percentage: </span>
                      <span className="mr-12 text-[#E1348B] ">75%</span>
                    </div>
                    <div className="flex justify-between px-6 py-3 border-b border-gray-500 ">
                      {" "}
                      <span>Event Participation: </span>
                      <span className="mr-12 text-[#E1348B] ">3</span>
                    </div>

                    <div className="flex justify-between px-6 py-3 border-b border-gray-500 ">
                      {" "}
                      <span>Events Won: </span>
                      <span className="mr-12 text-[#E1348B] ">1</span>
                    </div>

                    <div className="flex justify-between px-6 py-3 border-b border-gray-500 ">
                      {" "}
                      <span>Highly Skilled: </span>
                      <span className="mr-12 text-[#E1348B] ">C++</span>
                    </div>

                    <div className="flex justify-between px-6 py-3 pb-5 ">
                      {" "}
                      <span>Least Skilled: </span>
                      <span className="mr-12 text-[#E1348B] ">Python</span>
                    </div>
                  </div>
                  <div className="flex justify-center mt-6">
                    <div className="text-right bg-[#E1348B]  p-2  rounded flex space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                        />
                      </svg>
                      <button
                        type="button"
                        className="bg-[#E1348B] text-right "
                      >
                        Download Progress report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-full md:bg-[#2D2E35]    md:text-base text-sm md:mt-0 mt-5 ">
                <div className="rounded-[30px] md:bg-[#373A41] md:mr-10 h-screen md:mt-[-60px] pt-10 space-y-4">
                  <div
                    className=" flex items-center gap-x-4 py-4  sm:mr-5 sm:py-2 rounded-lg  px-5 mx-5 "
                    style={{ border: "1px solid #728095" }}
                  >
                    <AiOutlineSearch className="text-white text-2xl ml-1" />
                    <input
                      type="text"
                      placeholder="Search"
                      className="focus:outline-none bg-inherit text-white"
                    />
                  </div>
                  <div className="flex justify-evenly md:space-x-4 ">
                    <select className="block    p-2   rounded-md focus:outline-none bg-[#A145CD] text-white cursor-pointer">
                      <option selected hidden>
                        Class
                      </option>
                      <option className="cursor-pointer">5</option>
                      <option className="cursor-pointer">6</option>
                      <option className="cursor-pointer">7</option>
                      <option className="cursor-pointer">8</option>
                      <option className="cursor-pointer">9</option>
                      <option className="cursor-pointer">10</option>
                      <option className="cursor-pointer">11</option>
                      <option className="cursor-pointer">12</option>
                    </select>
                    <select className="block    p-2    rounded-md focus:outline-none bg-[#A145CD] text-white cursor-pointer">
                      <option selected hidden>
                        Skills
                      </option>
                      <option className="cursor-pointer">Design</option>
                      <option className="cursor-pointer">Python</option>
                      <option className="cursor-pointer">C++</option>
                      <option className="cursor-pointer">Marketing</option>
                      <option className="cursor-pointer">Arts</option>
                      <option className="cursor-pointer">Literature</option>
                      <option className="cursor-pointer">Business</option>
                      <option className="cursor-pointer">Music</option>
                    </select>
                    <select className="block    p-2   md:text-[15px] text-sm rounded-md focus:outline-none bg-[#A145CD] text-white cursor-pointer">
                      <option selected hidden>
                        Performance
                      </option>
                      <option className="cursor-pointer">Best to Poor</option>
                      <option className="cursor-pointer">Poor to Best</option>
                    </select>
                  </div>
                  <div className=" h-[70vh] overflow-scroll scrollbar-hide mx-5 space-y-2 ">
                    <div className="border border-gray-500 rounded-[20px] p-5 text-sm">
                      <div className="flex">
                        <Image
                          src={"/Programmer coding on laptop.png"}
                          alt="proImg"
                          height={100}
                          width={100}
                          className="rounded-full w-[45px] object-contain mt-[-5px]"
                        />
                        <span className="ml-5">
                          {" "}
                          Intoduction to C++
                          <br />
                          <span className="text-[#E1348B] text-xs">
                            {" "}
                            Course
                          </span>
                        </span>
                      </div>

                      <div className="flex justify-between py-5">
                        <div className="space-y-7">
                          <span>
                            {" "}
                            Time taken:-{" "}
                            <span className="text-gray-400">90days</span>
                          </span>
                          <p>
                            Expertise level:-{" "}
                            <span className="text-gray-400">Beginner</span>
                          </p>
                        </div>
                        <div className="space-y-7">
                          <span>
                            {" "}
                            Scored (in total):-{" "}
                            <span className="text-gray-400">95%</span>
                          </span>
                          <p>
                            Remarks:-
                            <span className="text-gray-400">Good pace</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="text-right bg-[#E1348B]  p-2  rounded flex space-x-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 "
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                            />
                          </svg>
                          <button
                            type="button"
                            className="bg-[#E1348B] text-right "
                          >
                            Download Progress report
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="border border-gray-500 rounded-[20px] p-5 text-sm">
                      <div className="flex">
                        <Image
                          src={"/Programmer coding on laptop.png"}
                          alt="proImg"
                          height={100}
                          width={100}
                          className="rounded-full w-[45px] object-contain mt-[-5px]"
                        />
                        <span className="ml-5">
                          {" "}
                          Intoduction to C++
                          <br />
                          <span className="text-[#E1348B] text-xs">
                            {" "}
                            Course
                          </span>
                        </span>
                      </div>

                      <div className="flex justify-between py-5">
                        <div className="space-y-7">
                          <span>
                            {" "}
                            Time taken:-{" "}
                            <span className="text-gray-400">90days</span>
                          </span>
                          <p>
                            Expertise level:-{" "}
                            <span className="text-gray-400">Beginner</span>
                          </p>
                        </div>
                        <div className="space-y-7">
                          <span>
                            {" "}
                            Scored (in total):-{" "}
                            <span className="text-gray-400">95%</span>
                          </span>
                          <p>
                            Remarks:-
                            <span className="text-gray-400">Good pace</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="text-right bg-[#E1348B]  p-2  rounded flex space-x-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 "
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                            />
                          </svg>
                          <button
                            type="button"
                            className="bg-[#E1348B] text-right "
                          >
                            Download Progress report
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="border border-gray-500 rounded-[20px] p-5 text-sm">
                      <div className="flex">
                        <Image
                          src={"/Programmer coding on laptop.png"}
                          alt="proImg"
                          height={100}
                          width={100}
                          className="rounded-full w-[45px] object-contain mt-[-5px]"
                        />
                        <span className="ml-5">
                          {" "}
                          Intoduction to C++
                          <br />
                          <span className="text-[#E1348B] text-xs">
                            {" "}
                            Course
                          </span>
                        </span>
                      </div>

                      <div className="flex justify-between py-5">
                        <div className="space-y-7">
                          <span>
                            {" "}
                            Time taken:-{" "}
                            <span className="text-gray-400">90days</span>
                          </span>
                          <p>
                            Expertise level:-{" "}
                            <span className="text-gray-400">Beginner</span>
                          </p>
                        </div>
                        <div className="space-y-7">
                          <span>
                            {" "}
                            Scored (in total):-{" "}
                            <span className="text-gray-400">95%</span>
                          </span>
                          <p>
                            Remarks:-
                            <span className="text-gray-400">Good pace</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="text-right bg-[#E1348B]  p-2  rounded flex space-x-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 "
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                            />
                          </svg>
                          <button
                            type="button"
                            className="bg-[#E1348B] text-right "
                          >
                            Download Progress report
                          </button>
                        </div>
                      </div>
                    </div>
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
