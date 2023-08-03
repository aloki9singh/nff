// Verified by Pradhumn
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { AiOutlineArrowRight, AiOutlineSetting } from "react-icons/ai";
const MentorSidebar = ({ pathname }) => {
  return (
    <>
      <aside className="h-full left-0 top-0  bg-[#141518]  flex flex-col w-full px-2 pb-4 ">
        <div className="">
          <div className="">
            <Image
              src="/pagesgraphics/mentor/signupsuccess/Neatskills.svg"
              width={500}
              height={500}
              alt="logo"
              className="pt-5"
            />
          </div>
          <div className="flex flex-col h-full   justify-around ">
            <ul>
              <li className="space-y-[14px]">
                <Link
                  href="/meta/dashboard"
                  className="flex items-center p-2 font-normal text-white text-sm rounded-lg  hover:bg-pin"
                >
                  <label className="inline-flex items-center">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span className="ml-3 ">Home</span>
                  </label>
                </Link>
                <Link
                  href="/meta/courses"
                  className="flex items-center p-2  font-normal text-white rounded-lg  hover:bg-pin text-sm"
                >
                  <label className="inline-flex items-center ">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span className="ml-3">Course</span>
                  </label>
                </Link>
                <Link
                  href="/meta/students"
                  className="text-sm flex items-center p-2 font-normal text-white rounded-lg  hover:bg-pin"
                >
                  <label className="inline-flex items-center ">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span className="ml-3">Students</span>
                  </label>
                </Link>
                <hr className="h-px my-8  bg-gray-200 border-0 "></hr>
                <Link
                  href="/meta/schedule"
                  className="text-sm flex items-center p-2 font-normal text-white rounded-lg  hover:bg-pin"
                >
                  <label className="inline-flex items-center ">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span
                      className={`ml-3 text-[${
                        pathname == "/meta/schedule" ? "#E1348B" : ""
                      }]`}
                    >
                      Schedule
                    </span>
                  </label>
                </Link>
                <Link
                  href="liveclass"
                  className=" text-sm flex items-center p-2 font-normal text-white rounded-lg  hover:bg-pin"
                >
                  {/* checkbox */}
                  <label className="inline-flex items-center">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span className="ml-3">Live Class</span>
                  </label>
                </Link>
                <Link
                  href="/meta/studymaterial"
                  className="text-sm flex items-center p-2 font-normal text-white rounded-lg  hover:bg-pin"
                >
                  <label className="inline-flex items-center">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span className="ml-3">Study Material</span>
                  </label>
                </Link>
                <Link
                  href="/meta/assignments"
                  className="text-sm flex items-center p-2 font-normal text-white rounded-lg    hover:bg-pin"
                >
                  <label className="inline-flex items-center">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span className="ml-3">Homework</span>
                  </label>
                </Link>
                <hr className="h-px my-8 bg-gray-200 border-0 "></hr>
                <Link
                  href="/meta/chats"
                  className=" text-sm flex items-center p-2 font-normal text-white rounded-lg   hover:bg-pin"
                >
                  <label className="inline-flex items-center">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span className="ml-3">Chats</span>
                  </label>
                </Link>

                <Link
                  href="/meta/profile"
                  className="text-sm flex items-center p-2 font-normal text-white rounded-lg   hover:bg-pin"
                >
                  <label className="inline-flex items-center">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span className="ml-3">Profile</span>
                  </label>
                </Link>
                <div className="  font-semibold text-white bg-[#373A41] flex flex-col mt-9 rounded-xl">
                  {/* <div className=" px-8 py-2 ">
                        <h1 className="text-xl font-Inter">
                          Discord <br /> Community
                        </h1>
                        <p>150 members</p>
                        <button className="inline-flex items-center mt-10 h-10 px-5 text-indigo-100 transition-colors duration-150 bg-[#E1348B] rounded-lg focus:shadow-outline ">
                          <span>Join</span>
                          <AiOutlineArrowRight />
                        </button>
                      </div> */}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-white flex-row  space-y-5 mt-20">
          <button className=" bg-[#373A41]  flex  justify-center  items-center w-full  rounded   pt-2.5 pb-2 text-xs font-medium uppercase leading-normal ">
            <AiOutlineSetting />
            <span >Settings </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default MentorSidebar;
