// currently using dummy data for the school students
// using the array studentsArr to map the students
// need to get the students of the school from the firestore
// page structure could be /schools/[schoolId]/students

// import BottomNav from "../components/Footer/BottomNav";
import { useEffect, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebaseconfig";
import Schoolsidebar from "@/components/common/sidebar/school";
import SchoolTopbar from "@/components/common/navbar/schooltopbar";
import { studentsArr } from "@/lib/arraytomap";
import { useMediaQuery } from "react-responsive";

export default function Students() {
  const [count, setCount] = useState(1);
  const tabClass = "w-10 h-10 rounded-xl";
  const [initialcount, setinitialCount] = useState(0);
  const [gap, setGap] = useState(10);
  const activeTabClass = "w-10 h-10 bg-[#A145CD] rounded-xl";
  const [studentsData, setStudents] = useState([]);
  const [searchstate, setsearchstate] = useState("");
  const [filterData, setFilterData] = useState([]);
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);

  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }

  const fetchStudentData = useCallback(() => {
    fetch("/api/signup")
      .then((response) => response.json())
      .then((data) => {
        const students = data.users.filter((ele) => ele.role === "student");
        console.log(students);
        setFilterData(students);
        setStudents(students);
      });
  }, []);

  const filterStudentData = useCallback(() => {
    return filterData.filter((ele) => ele.displayName.includes(searchstate));
  }, [filterData, searchstate]);

  const filteredStudentData = useMemo(
    () => filterStudentData(),
    [ filterStudentData]
  );
  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }
    setStudents(filteredStudentData.slice(initialcount, gap));
  }, [isMediumScreen, filteredStudentData, initialcount, gap, setStudents]);
  useEffect(() => {
    fetchStudentData();
  }, [fetchStudentData]);

  const handleClick = (e) => {
    const totalPage = Math.ceil(filterData.length / 10);

    switch (e.currentTarget.getAttribute("name")) {
      case "fwd":
        if (count < totalPage) {
          setCount(count + 1);
          setinitialCount(initialcount + 10);
          setGap(gap + 10);
        }
        break;

      case "back":
        if (count > 1) {
          setCount(count - 1);
          setinitialCount(initialcount - 10);
          setGap(gap - 10);
        }
        break;

      default:
        const pageNumber = parseInt(e.currentTarget.getAttribute("name"));
        if (pageNumber >= 1 && pageNumber <= totalPage) {
          setCount(pageNumber);
          setinitialCount((pageNumber - 1) * 10);
          setGap(pageNumber * 10);
        }
        break;
    }
  };

  return (
    <div className="flex">
      {/* First Sidebar - Visible on Mobile */}
      {isMobileScreen && (
        <div
          className={`fixed right-0 ${
            SideBarState ? "block" : "hidden"
          } w-[281px] h-screen bg-[#25262C] rounded-l-[40px] z-10`}
        >
          <Schoolsidebar toggleSideBar={toggleSideBar} />
        </div>
      )}

      {/* Second Sidebar - Visible on Desktop */}
      {!isMobileScreen && (
        <div className={`md:block hidden w-[221px] bg-[#141518] z-10`}>
          <Schoolsidebar toggleSideBar={toggleSideBar} />
        </div>
      )}
      <div className="w-[90%] max-[776px]:w-full h-screen bg-[#2D2E35]">
        <div className=" md:pt-0 pt-2 justify-between md:bg-[#2E3036] bg-[#141518] top-0 md:border-b-[1px] border-b-[2px] border-[#717378]">
          <SchoolTopbar heading="My Progress" toggleSideBar={toggleSideBar} />
        </div>

        <div className="text-white items-center justify-between space-y-2 ">
          {/* text */}
          <div className="w-[95%] mx-auto">
            <h1 className="font-medium md:text-2xl pt-5">
              Track Progress of students
            </h1>
          </div>

          {/* dropdown buttons */}
          <div className="gap-5 mx-12  max-[776px]:w-full w-[95%] max-[1100px]:mx-4 md:mt-0 max-[776px]:mx-0  text-white">
            <div className="flex flex-wrap items-center justify-between] space-y-2">
              <div className="md:flex items-center rounded-lg gap-4 w-screen justify-between">
                <div className="flex  min-w-[200px] space-x-4">
                  <select className="block w-full p-2 text-sm rounded-md focus:outline-none bg-[#A145CD] text-white cursor-pointer">
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
                  <select className="block w-full  p-2  text-sm rounded-md focus:outline-none bg-[#A145CD] text-white cursor-pointer">
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
                  <select className="block  w-[200px]  p-2   text-sm rounded-md focus:outline-none bg-[#A145CD] text-white cursor-pointer">
                    <option selected hidden>
                      Performance
                    </option>
                    <option className="cursor-pointer">Best to Poor</option>
                    <option className="cursor-pointer">Poor to Best</option>
                  </select>
                  <div className=" items-center w-full rounded-lg justify-around  md:hidden block">
                    <button className=" w-full  text-sm p-2 rounded-md focus:outline-none bg-[#E1348B] text-white cursor-pointer flex justify-center items-center ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-4 "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                        />
                      </svg>
                      Download All
                    </button>
                  </div>
                </div>
                <div className=" items-center rounded-lg justify-around hidden md:block">
                  <button className="  text-sm p-2 rounded-md focus:outline-none bg-[#E1348B] text-white cursor-pointer flex justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                      />
                    </svg>
                    Download All
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* table */}
          <div
            className="mx-auto h-[712px] bg-[#373A41] w-[96%] max-[776px]:w-full rounded-[30px] border md:text-base text-xs  text-white"
            style={{ marginTop: "20px" }}
          >
            <div className="">
              <table className="w-full">
                <thead className="items-center border-b">
                  <tr className="flex font-semibold justify-around p-5 mx-4">
                    <th className="w-[16.6%]">Student Name</th>
                    <th className="w-[16.6%]">Id</th>
                    <th className="w-[16.6%]">Class</th>
                    <th className="md:block hidden w-[16.6%]">Active</th>
                    <th className="md:block hidden w-[16.6%]">Courses</th>
                    <th className="w-[16.6%]">Action</th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="flex w-[90%] h-[550px] flex-col mt-2 items-center mx-auto space-y-6">
                  {studentsData &&
                    studentsData.map((e, i) => (
                      <tr
                        className="flex space-x-4 items-center w-full font-medium text-xs text-center justify-around"
                        key={i}
                      >
                        <td className="flex items-center gap-2 w-[16.6%]">
                          <Image
                            src={
                              e.photoURL
                                ? e.photoURL
                                : "/componentsgraphics/common/navbar/schoolprofiletopbar/Male.svg"
                            }
                            alt="img"
                            height={25}
                            width={25}
                            className="rounded-full h-8 object-contain inline"
                          />
                          {e.displayName}
                        </td>
                        <td className="w-[16.6%] text-left">ID : {e.uid}</td>
                        <td className="w-[16.6%] text-center">{e.class}</td>
                        <td className="md:block text-center hidden w-[16.6%]">
                          {e.active}
                        </td>
                        <td className="md:block text-center hidden w-[16.6%]">
                          {e.courses}
                        </td>
                        <td className="text-[#E1348B] pl-16 max-[1340px]:pl-8 max-[850px]:pl-0 w-[16.6%]">
                          <Link href={`/students/${e.id}`}>View Profile</Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {/* pagination */}
            <div className="w-60 h-10 lg:bottom-0 mx-10 my-5 flex justify-center items-center space-x-4">
              <button
                className="w-6 h-5 border flex justify-center items-center"
                name="back"
                onClick={handleClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
                  />
                </svg>
              </button>
              <button
                className={count == 1 ? activeTabClass : tabClass}
                name="1"
                onClick={handleClick}
              >
                1
              </button>
              <button
                className={count == 2 ? activeTabClass : tabClass}
                name="2"
                onClick={handleClick}
              >
                2
              </button>
              <button
                className={count == 3 ? activeTabClass : tabClass}
                name="3"
                onClick={handleClick}
              >
                3
              </button>
              <button
                className="w-6 h-5 border flex justify-center items-center"
                name="fwd"
                onClick={handleClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
