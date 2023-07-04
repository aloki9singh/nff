import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { AiOutlineArrowRight, AiOutlineSetting } from "react-icons/ai";

const MentorSidebar = ({ pathname }) => {
  return (
    <>
      <aside className="h-screen left-0 top-0  bg-[#15161B]  flex flex-col  p-5  ">
        <div className="">
          <div className="flex">
            <div>
              <Image
                src="/componentsgraphics/common/navbar/navbar/neatskillslogosample.svg"
                width={150}
                height={150}
                alt="logo"
                className="mb-6"
              />
            </div>
          </div>
          <div className="flex h-full">
            <ul>
              <li>
                <Link
                  href="dashboard"
                  className="flex items-center p-2 text-base font-normal  text-white rounded-lg  hover:bg-pin"
                >
                  <label className="inline-flex items-center space-x-3 ">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span>Home</span>
                  </label>
                </Link>
                <Link
                  href="courses"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-pin mt-2"
                >
                  <label className="inline-flex items-center space-x-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span>Course</span>
                  </label>
                </Link>
                <Link
                  href="student"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-pin mt-2"
                >
                  <label className="inline-flex items-center space-x-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span>Students</span>
                  </label>
                </Link>
                <hr className="h-px  my-8 bg-gray-500 border-0 w-[90%] m-auto "></hr>
                <Link
                  href="schedule"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-pin mt-2"
                >
                  <label className="inline-flex items-center space-x-3">
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
                  href="/"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-pin mt-2"
                  replace
                >
                  {/* checkbox */}
                  <label className="inline-flex items-center space-x-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span>Live Class</span>
                  </label>
                </Link>
                <Link
                  href="studymaterial"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-pin mt-2"
                  replace
                >
                  <label className="inline-flex items-center space-x-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span>Study Material</span>
                  </label>
                </Link>
                <Link
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg    hover:bg-pin mt-2"
                  replace
                >
                  <label className="inline-flex items-center space-x-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span>Homework</span>
                  </label>
                </Link>
                <hr className="h-px  my-8 bg-gray-500 border-0 w-[90%] m-auto "></hr>
                <Link
                  href="chats"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg   hover:bg-pin mt-2"
                >
                  <label className="inline-flex items-center space-x-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span>Chats</span>
                  </label>
                </Link>

                <Link
                  href="profile"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg   hover:bg-pin mt-2"
                >
                  <label className="inline-flex items-center space-x-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span>Profile</span>
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
        <div className="text-white space-y-5 mt-20">
          <button className=" bg-[#373A41]  flex  justify-center  items-center px-5  m-auto  rounded pt-2.5 pb-2 text-xs font-medium uppercase leading-normal gap-x-2">
            <AiOutlineSetting />
            <span>Settings </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default MentorSidebar;
