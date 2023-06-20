import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { AiOutlineArrowRight, AiOutlineSetting } from "react-icons/ai";
const Sidebar = ({ pathname }) => {
  return (
    <>
      <aside className="  left-0 top-0  bg-[#15161B]  flex flex-col w-[200px] px-5 ">
        <div className="">
          <div className="">
            <Image
              src="/componentsgraphics/common/sidebar/schoolsidebar/Neatskills.svg"
              width={500}
              height={500}
              alt="logo"
              className="pt-5"
            />
          </div>
          <div className="flex flex-col h-full   justify-around ">
            <ul>
              <li className="space-y-[16px]">
                <Link
                  href="/seta/dashboard"
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
                <Link
                  href="/seta/students"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-pin"
                >
                  <label className="inline-flex items-center space-x-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span>students</span>
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
                    <span>Events</span>
                  </label>
                </Link>
                <hr className="h-px  my-8 bg-gray-500 border-0 w-[90%] m-auto "></hr>
                <Link
                  href="/seta/profile"
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
                      Profile
                    </span>
                  </label>
                </Link>

                <div className="  font-semibold text-white bg-[#373A41] flex flex-col mt-9 rounded-xl"></div>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-white flex-row  space-y-5 mt-40">
          <button className=" bg-[#373A41]  flex  justify-center  items-center w-full  rounded   pt-2.5 pb-2 text-xs font-medium uppercase leading-normal ">
            <AiOutlineSetting />
            <span>Settings </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
