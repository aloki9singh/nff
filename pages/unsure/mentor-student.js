import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MentorSidebar from "../components/Sidebar/MentorSidebar";
import MentorTopbar from "../components/Navbar/MentorTopbar";
import { useRouter } from "next/router";
import { studentsArr } from "../lib/arraysToMap";
import { useSelector } from "react-redux";
import chartIcon from "../public/courses/ChartBar.svg";

function mentorStudent() {
    const [count, setCount] = useState(1);
    const { data } = useSelector((state) => state.authManagerMentor);
    let [searchstate, setsearchstate] = useState("");
    const router = useRouter();
    let searchfun = (e) => {
        setsearchstate(e.target.value);
    };

    const activeTabClass = "w-10 h-10 bg-[#A145CD] rounded-xl";
    const tabClass = "w-10 h-10 rounded-xl";


    return (
        <>
            <div className="h-screen text-base bg-[#2E3036] ">
                <div className="flex max-w-full">
                    <div className="lg:col-span-1 hidden lg:grid w-[261px]">
                        {" "}
                        <MentorSidebar pathname={router.pathname} />
                    </div>
                    <div
                        style={{ background: "#2E3036" }}
                        className="col-span-5 lg:col-span-4 md:rounded-l-3xl pt-2 w-screen overflow-y-scroll scrollbar-hide text-white"
                    >

                        <MentorTopbar heading={"My Progress"} />

                        <hr className="hidden lg:block opacity-50 m-3"></hr>


                        {/* Dropdown bar */}
                        <div className="md:flex gap-5 m-5 md:mt-0 mt-20">
                            <div className="md:flex justify-between w-[100%] m-5 space-y-2">
                                <div className="md:flex items-center rounded-lg gap-4 justify-around ">
                                    <div className="flex justify-evenly min-w-[200px] space-x-4">
                                        <select className="block w-full   p-2 text-sm rounded-md focus:outline-none bg-[#A145CD] text-white cursor-pointer">
                                            <option selected hidden>
                                                Select Course
                                            </option>
                                            <option className="cursor-pointer">Course-1</option>
                                            <option className="cursor-pointer">Course-2</option>
                                            <option className="cursor-pointer">Course-3</option>
                                            <option className="cursor-pointer">Course-4</option>
                                        </select>
                                    </div>

                                </div>
                                <div className=" xl:w-[35rem] flex justify-between">
                                    <form className=" items-center hidden md:block ">
                                        <label htmlFor="voice-search" className="sr-only">
                                            Search
                                        </label>
                                        <div className="relative w-[100%]">
                                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                                <svg
                                                    className="w-5 h-5 text-white dark:text-white"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <input
                                                type="text"
                                                id="voice-search"
                                                className="bg-[#414348]  border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-[#414348] dark:border-gray-600 dark:placeholder-white placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Search Student..."
                                                required
                                                value={searchstate}
                                                onChange={searchfun}
                                            />
                                        </div>
                                    </form>
                                    <button
                                        className="bg-[#414348] px-4 py-1 rounded-xl  flex items-center justify-center"
                                    >
                                        Filter
                                        <span>
                                            <Image src={chartIcon} alt="chart icon" className="ml-1" />
                                        </span>
                                    </button>
                                    <button
                                        className="bg-[#414348] px-4 py-1 rounded-xl  flex items-center justify-center"
                                    >
                                        Remove a Student
                                    </button>
                                </div>
                            </div>

                            {/* <div className="  md:w-5/6 ">
                <BasicDetails />
                   
                <div className="md:flex gap-5">
                  <div className="md:w-1/2">
                    <div>
                      {" "}
                      <LeaderBoardMentor />
                      <div className="bg-[#373A41] rounded-[20px] p-5 px-8 my-5 space-y-2 text-white mt-[-12px]">
                        <div className="py-2 text-center">Homework Status</div>
                        <div className="flex justify-between px-5 py-3 bg-[#2E3036] rounded-[10px]">
                          <div>To be Marked</div>
                          <div className=" border border-[#A145CD] rounded-[5px] px-1">
                            {" "}
                            29
                          </div>{" "}
                        </div>
                        <div className="flex justify-between px-5 py-3 bg-[#2E3036] rounded-[10px]">
                          <div>Marked</div>
                          <div className=" border border-[#A145CD] rounded-[5px] px-1">
                            {" "}
                            2
                          </div>{" "}
                        </div>
                      </div>
                    </div>
                    <div> </div>
                  </div>
                  <div className="md:w-1/2">
                    <div className="bg-[#373A41] rounded-[20px] pt-1">
                      {" "}
                      <CirProgress />
                    </div>
                    <div className="bg-[#373A41] rounded-[20px] mb-10 mt-[-20px] md:mt-0">
                      {" "}
                      <MentorChatWidget />
                    </div>
                  </div>
                </div>
              </div>
              <div className=" md:mt-0 mt-[-20px] ">
                <Calender />
                <div className="bg-[#373A41] rounded-[20px] md:pb-5 mt-[-20px] md:[mt-0] ">
                  <TaskList />
                </div>
              </div> */}
                        </div>




                        {/* table */}
                        <div className="w-[90%] h-full bg-[#373A41] rounded-[30px] border md:text-base text-xs mx-auto  mb-4">
                            <div className="">
                                <table className="w-full  ">
                                    <thead className="  items-center  border-b  ">
                                        <tr className=" flex font-semibold  justify-around p-5 space-x-2">
                                            <th className=" inline">Student Name</th>
                                            <th className="">Id</th>
                                            <th className="">Class</th>
                                            <th className="md:block hidden">Active</th>
                                            <th className="md:block hidden">Courses</th>
                                            <th className="">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="flex justify-center flex-col items-center mt-4 space-y-6 p-2">
                                        {studentsArr &&
                                            studentsArr.map((e, i) => (
                                                <tr
                                                    className="flex space-x-4 items-center w-full font-medium text-xs text-center justify-around "
                                                    key={i}
                                                >
                                                    <td className="flex items-center gap-2">
                                                        <Image
                                                            src={e.image}
                                                            alt="img"
                                                            height={25}
                                                            width={25}
                                                            className="rounded-full h-8  object-contain inline"
                                                        />
                                                        Rachit Rajput
                                                    </td>
                                                    <td className="">ID : {e.ID}</td>
                                                    <td className="">{e.Class}</td>
                                                    <td className="md:block hidden">{e.Active}</td>
                                                    <td className="md:block hidden">{e.Courses}</td>
                                                    <td className=" text-[#E1348B]">
                                                        <Link href="">View Profile</Link>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* pagination */}
                            <div className="w-60 h-10 lg:bottom-0 mx-10 my-5 flex justify-center items-center space-x-4">
                                <button className="w-6 h-5 border flex justify-center items-center">
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
                                <button className={activeTabClass}>1</button>
                                <button className={tabClass}>2</button>
                                <button className={tabClass}>3</button>
                                <button className="w-6 h-5 border flex justify-center items-center">
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
                <div className=" ">
                    {/* <MobileNav></MobileNav> */}
                </div>
            </div>
        </>
    );
}
export default mentorStudent;