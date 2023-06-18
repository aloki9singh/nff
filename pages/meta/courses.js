import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MentorSidebar from "../components/Sidebar/MentorSidebar";
import MentorTopbar from "../components/Navbar/MentorTopbar";
import { useRouter } from "next/router";
import { studentsArr } from "../lib/arraysToMap";
import { useSelector } from "react-redux";
import boxProfile from "../public/mentorCourses/profile.svg";

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

                        <MentorTopbar heading={"My Courses"} />

                        <hr className="hidden lg:block opacity-50 m-3"></hr>


                        {/* Dropdown bar */}
                        <div className="md:flex gap-5 m-5 md:mt-0 mt-20">
                            <div className="md:flex justify-end w-[100%] m-5 space-y-2">

                                <div className=" flex justify-end pr-4">
                                    <button
                                        className="bg-[#E1348B] px-4 py-2 rounded-md text-sm  flex items-center justify-center"
                                    >
                                        + Add New Course
                                    </button>
                                </div>
                            </div>


                        </div>



                        <div className="w-[90%] h-full  rounded-[30px]  md:text-base text-xs mx-auto flex mb-4">
                            <div className="w-[40%] h-full  md:text-base text-xs mx-auto  mb-4">

                                <div
                                    style={{
                                        "background-image":
                                            "linear-gradient(90deg, #E1348B 0%, #CD8BED 100%)",
                                    }}
                                    className="w-[95%] h-[20%] rounded-xl md:text-base text-xs mx-auto  mb-4">

                                    <div className="text-white py-4 px-3">
                                        Today 2 new students enrolled in your course.
                                    </div>

                                    <div className="flex justify-end w-[90%] mx-auto">
                                        <button
                                            className="bg-[#E1348B] px-4 py-2 rounded-md text-sm  flex items-center justify-center"
                                        >
                                            See Details
                                        </button>
                                    </div>

                                </div>

                                <div className="w-[95%] h-[20%]  md:text-base text-xs flex justify-between mx-auto  mb-4">
                                    <div className="w-[44%] h-[95%] text-xs bg-[#373A41] rounded-lg py-2 px-2 flex flex-col justify-around align-center text-center">
                                        <div className="rounded-full w-[60px] h-[60px]  mx-auto bg-[#E1348B] flex align-center justify-center">
                                            <Image
                                                src="/mentorCourses/profile.svg"
                                                width={30}
                                                height={30}
                                                alt="f"
                                            ></Image>
                                        </div>
                                        <p className="font-semibold text-sm">105</p>
                                        <p>Total Enrolments</p>
                                    </div>
                                    <div className="w-[44%] h-[95%] text-xs bg-[#373A41] rounded-lg py-2 px-2 flex flex-col justify-around align-center text-center">
                                        <div className="rounded-full w-[60px] h-[60px]  mx-auto bg-[#E1348B] flex align-center justify-center">
                                            <Image
                                                src="/mentorCourses/book.svg"
                                                width={30}
                                                height={30}
                                                alt="f"
                                            ></Image>
                                        </div>
                                        <p className="font-semibold text-sm">3</p>
                                        <p>Total Courses</p>
                                    </div>
                                </div>

                                <div className="w-[95%] h-[40%]  md:text-base text-xs flex mx-auto  mb-4">

                                    <div className="w-[100%] h-[100%]  bg-[#373A41] rounded-lg py-2 flex flex-col align-center ">
                                        <div className="w-[95%] mx-auto text-bold py-4 flex">
                                            <h1 className="my-2 p-2 w-[60%]">Enrollment Activity</h1>
                                            <div className="flex space-x-4 my-2 justify-end">
                                                <select className=" p-2 text-sm rounded-md focus:outline-none bg-[#373A41] text-white cursor-pointer">
                                                    <option selected hidden>
                                                        Time
                                                    </option>
                                                    <option className="cursor-pointer selected">Last Week</option>
                                                    <option className="cursor-pointer">Last Month</option>
                                                    <option className="cursor-pointer">Last Quater</option>
                                                    <option className="cursor-pointer">Last Semister</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="w-full py-4 flex justify-center ">
                                            <Image
                                                src="/mentorCourses/chart.svg"
                                                width={300}
                                                height={90}
                                                alt="f"
                                            ></Image>

                                        </div>

                                    </div>
                                </div>



                            </div>


                            {/* table */}
                            <div className="w-[55%] h-full bg-[#373A41] rounded-[30px] border md:text-base text-xs mx-auto  mb-4">
                                <div className="">
                                    <table className="w-full  ">
                                        <thead className="  items-center  border-b  ">
                                            <tr className=" flex font-semibold  justify-around p-5 space-x-2">
                                                <th className=" inline">Course Name</th>
                                                <th className="">Enrolled</th>
                                                <th className="">Lectures</th>
                                                <th className="md:block hidden">Created On</th>
                                                <th className="md:block hidden">Level</th>
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
                </div>
            </div>
        </>
    );
}
export default mentorStudent;
