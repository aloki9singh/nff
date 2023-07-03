// currently using dummy data for the school students
// using the array studentsArr to map the students
// need to get the students of the school from the firestore
// page structure could be /schools/[schoolId]/students

// import BottomNav from "../components/Footer/BottomNav";
import Link from "next/link";
import Image from "next/image";
import Schoolsidebar from "@/components/common/sidebar/school";
import SchoolTopbar from "@/components/common/navbar/schooltopbar";
import { studentsArr } from "@/lib/arraytomap";
export default function UnderProgress() {
  const tabClass = "w-10 h-10 rounded-xl";

  const activeTabClass = "w-10 h-10 bg-[#A145CD] rounded-xl";

  return (
    <div className="flex h-full bg-[#2D2E35]  ">
      <div className="lg:col-span-1 hidden lg:grid">
        <Schoolsidebar />
      </div>
      <div className="w-full h-fit   bg-[#2D2E35] space-y-4 mt-1 ">
        <SchoolTopbar heading={"Students"} />
        {/* text */}
        <div className="text-white grow flex flex-col items-center justify-center h-fit md:pt-0 pt-12 ">
          {/* text */}
          <div className="w-[88%]">
            <h1 className="font-medium md:text-2xl pt-5">
              Track Progress of students
            </h1>
          </div>

          {/* dropdown buttons */}
          <div className="md:flex justify-between w-[88%] m-5 space-y-2">
            <div className="md:flex items-center rounded-lg gap-4 justify-around ">
              <div className="flex justify-evenly space-x-4">
                <select className="block w-full   p-2 text-sm rounded-md focus:outline-none bg-[#A145CD] text-white cursor-pointer">
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
              </div>
              <div className="flex justify-betwen gap-4 mt-2 md:mt-0 ">
                <select className="block  w-full  p-2   text-sm rounded-md focus:outline-none bg-[#A145CD] text-white cursor-pointer">
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
            </div>
            <div className="  items-center rounded-lg justify-around hidden md:block">
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

          {/* table */}
          <div className="w-[90%]  h-full bg-[#373A41] rounded-[30px] border md:text-base text-xs  mb-4">
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
                          <Link href="/seta/studentsdetails">View Profile</Link>
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
    </div>
  );
}
