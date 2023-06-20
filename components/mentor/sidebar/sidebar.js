// Verified by Pradhumn
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { AiOutlineArrowRight, AiOutlineSetting } from "react-icons/ai";
const MentorSidebar = ({ pathname }) => {
  return (
    <>
      <aside className="h-screen w-50 top-0 -left-96  bg-black p-10 ">
        <div className="flex flex-col justify-start items-center">
          <div className="">
            <Image
              src="/pagesgraphics/mentor/signupsuccess/Neatskills.svg"
              width= {169}
height= {38}
              alt="logo"
              className="pb-2"
            />
          </div>
          <div className="items-center gap-4 pl-5  p-2 rounded-md group cursor-pointer hover:shadow-lg ">
            <ul className="flex flex-col justify-between gap-y-5 ">
              <li className="">
                <Link
                  href="/mentor-dashboard"
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
                  href="#"
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
                  href="#"
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
                <hr className="h-px my-8 bg-gray-200 border-0 "></hr>
                <Link
                  href="/Schedule"
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
                        pathname == "/Schedule" ? "#E1348B" : ""
                      }]`}
                    >
                      Schedule
                    </span>
                  </label>
                </Link>
                <Link
                  href="#"
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
                  href="#"
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
                  href="#"
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
                  href="#"
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
                  href="#"
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
        <div className="text-white flex-row  space-y-5 ">
          <button className=" bg-[#373A41]  flex  justify-center  items-center w-[85%] rounded  px-2 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal ">
            <AiOutlineSetting />
            <span className="pl-1">Settings </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default MentorSidebar;
