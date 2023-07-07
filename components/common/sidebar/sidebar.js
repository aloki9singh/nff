
// Use course overview side bar insted of this

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
                  href="/beta/dashboard"
                  className="flex items-center p-2 text-base font-normal  text-white rounded-lg  hover:bg-pin"
                >
                  <label className="inline-flex items-center space-x-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span>Home</span>
                  </label>
                </Link>
             
                <hr className="h-px  my-8 bg-gray-500 border-0 w-[90%] m-auto "></hr>
                <Link
                  href="/beta/courseoverview"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-pin"
                >
                  <label className="inline-flex items-center space-x-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span>Courses</span>
                  </label>
                </Link>
                <Link
                  href="/beta/checkclass"
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
                        pathname == "/beta/checkclass" ? "#E1348B" : ""
                      }]`}
                    >
                      Schedule
                    </span>
                  </label>
                </Link>
                <Link
                  href="/beta/studymaterial"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-pin"
                >
                  {/* checkbox */}
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
                  href="/beta/homework"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg    hover:bg-pin"
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
                  href="/beta/chats"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg   hover:bg-pin"
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
                  href="/beta/profile"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg   hover:bg-pin"
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
              </li>
            </ul>
          </div>
        </div>
        <div className="text-white flex-row  space-y-5 mt-20 mb-[90px]">
          <button className=" bg-[#373A41]  flex  justify-center  items-center w-full  rounded   pt-2.5 pb-2 text-xs font-medium uppercase leading-normal ">
            <AiOutlineSetting />
            <span>Settings </span>
          </button>
        </div>
      </aside>
  );
};

export default Sidebar;
