import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { AiOutlineArrowRight, AiOutlineSetting } from "react-icons/ai";
const Sidebar = ({ pathname }) => {
  return (

      <aside className="hidden sticky min-h-screen h-full left-0 top-0  bg-[#15161B] justify-between md:flex flex-col w-[200px] px-5 ">
        <div className="h-full">
          <div className=" mb-10">
            <Image
              src="\componentsgraphics\common\sidebar\sidebar\Neatskills.svg"
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
                  href="/mentor-dashboard"
                  className="flex items-center p-2 text-base font-normal  text-white rounded-lg  hover:bg-pin"
                >
                  <label className="inline-flex items-center space-x-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span >Home</span>
                  </label>
                </Link>
                <Link
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-pin"
                >
                  <label className="inline-flex items-center space-x-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span >Course</span>
                  </label>
                </Link>
                <Link
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-pin"
                >
                  <label className="inline-flex items-center space-x-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span >Students</span>
                  </label>
                </Link>
                <hr className="h-px  my-8 bg-gray-500 border-0 w-[90%] m-auto "></hr>
                <Link
                  href="/Schedule"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-pin"
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
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-pin"
                >
                  {/* checkbox */}
                  <label className="inline-flex items-center space-x-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span >Live Class</span>
                  </label>
                </Link>
                <Link
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-pin"
                >
                  <label className="inline-flex items-center space-x-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span >Study Material</span>
                  </label>
                </Link>
                <Link
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg    hover:bg-pin"
                >
                  <label className="inline-flex items-center space-x-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span >Homework</span>
                  </label>
                </Link>
                <hr className="h-px  my-8 bg-gray-500 border-0 w-[90%] m-auto "></hr>
                <Link
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg   hover:bg-pin"
                >
                  <label className="inline-flex items-center space-x-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span >Chats</span>
                  </label>
                </Link>

                <Link
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg   hover:bg-pin"
                >
                  <label className="inline-flex items-center space-x-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span >Profile</span>
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
        <div className="text-white flex-row  space-y-5 mt-20 mb-[90px]">
          <button className=" bg-[#373A41]  flex  justify-center  items-center w-full  rounded   pt-2.5 pb-2 text-xs font-medium uppercase leading-normal ">
            <AiOutlineSetting />
            <span >Settings </span>
          </button>
        </div>
      </aside>
  );
};

export default Sidebar;
