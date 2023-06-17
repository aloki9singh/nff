

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineArrowRight, AiOutlineSetting } from "react-icons/ai";
import { Disclosure } from "@headlessui/react";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Schoolsidebar({ getSideBarState }) {
  const [showSideBar, setShowSideBar] = useState(false);

  function toogleSideBar() {
    setShowSideBar(!showSideBar);
    getSideBarState(showSideBar);
  }
  return (
    <>

      <Disclosure className="lg:w-56 lg:left-0 lg:top-0 lg:p-10 " as="nav">
        <Disclosure.Button className=" top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-900 hover:text-white   group z-10 ">
          {/* <GiHamburgerMenu

            className="block md:hidden h-6 w-6 text-white md:static fixed right-5 top-5"
            aria-hidden={true}
          /> */}
        </Disclosure.Button>
        <div className="h-screen p-6 w-1/2 z-20 fixed top-0 -left-96 lg:w-52 lg:left-0 peer-focus:left-0 peer:transition ease-out delay-150 duration-200 bg-black space-y-[20vh]">
          <div className="flex flex-col justify-start items-center">
            <Link href="/">
              <Image
                src="/Neatskills.svg"
                width={600}
                height={600}
                alt="logo"
                className="pb-2 mb-10"
              />
            </Link>
            <div className="items-center gap-4    rounded-md group cursor-pointer hover:shadow-lg">
              <ul className="flex flex-col justify-between gap-y-5 ml-[-15px] ">
                <li className="">
                  <Link
                    href="/"
                    className="flex items-center p-1 text-sm font-normal text-white rounded-lg  hover:bg-pin"
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
                </li>

                <li>
                  <Link
                    href="/course-overview"
                    className="flex items-center p-1 text-sm font-normal text-white rounded-lg  hover:bg-pin"
                  >
                    {" "}
                    <label className="inline-flex items-center space-x-3">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        className="form-checkbox h-3 w-3 text-gray-600"
                      />{" "}
                      <span className="ml-3">Students</span>
                    </label>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center p-1 text-sm font-normal text-white rounded-lg  hover:bg-pin"
                  >
                    {" "}
                    <label className="inline-flex items-center space-x-3">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        className="form-checkbox h-3 w-3 text-gray-600"
                      />
                      <span className="ml-3">Events</span>
                    </label>
                  </Link>
                </li>

                <hr />
                <li>
                  <Link
                    href="#"
                    className="flex items-center p-1 text-sm font-normal text-white rounded-lg   hover:bg-pin"
                  >
                    {" "}
                    <label className="inline-flex items-center space-x-3">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        className="form-checkbox h-3 w-3 text-gray-600"
                      />{" "}
                      <span className="ml-3">Profile</span>
                    </label>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col justify-center mt-24 text-end">
            <div className="text-white flex items-center justify-center bg-[#373A41] px-2 rounded-lg w-[155px]">
              <AiOutlineSetting />
              <button className="flex justify-center items-center px-2 py-2 text-xs font-medium uppercase">
                Settings
              </button>
            </div>
          </div>
        </div>
      </Disclosure>
      <Disclosure className="lg:w-56 lg:left-0 lg:top-0 lg:p-10 " as="nav">
        <Disclosure.Button className=" top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-900 hover:text-white   group z-10 ">
          {/* <GiHamburgerMenu
            className="block md:hidden h-6 w-6 text-white md:static fixed right-5 top-5"
            aria-hidden={true}
          /> */}
        </Disclosure.Button>
        <div className="h-screen p-6 w-1/2 z-20 fixed top-0 -left-96 lg:w-52 lg:left-0 peer-focus:left-0 peer:transition ease-out delay-150 duration-200 bg-black space-y-[20vh]">
          <div className="flex flex-col justify-start items-center">
            <Link href="/">
              <Image
                src="/Neatskills.svg"
                width={600}
                height={600}
                alt="logo"
                className="pb-2 mb-10"
              />
            </Link>
            <div className="items-center gap-4    rounded-md group cursor-pointer hover:shadow-lg">
              <ul className="flex flex-col justify-between gap-y-5 ml-[-15px] ">
                <li className="">
                  <Link
                    href="/"
                    className="flex items-center p-1 text-sm font-normal text-white rounded-lg  hover:bg-pin"
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
                </li>

                <li>
                  <Link
                    href="/course-overview"
                    className="flex items-center p-1 text-sm font-normal text-white rounded-lg  hover:bg-pin"
                  >
                    {" "}
                    <label className="inline-flex items-center space-x-3">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        className="form-checkbox h-3 w-3 text-gray-600"
                      />{" "}
                      <span className="ml-3">Students</span>
                    </label>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center p-1 text-sm font-normal text-white rounded-lg  hover:bg-pin"
                  >
                    {" "}
                    <label className="inline-flex items-center space-x-3">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        className="form-checkbox h-3 w-3 text-gray-600"
                      />
                      <span className="ml-3">Events</span>
                    </label>
                  </Link>
                </li>

                <hr />
                <li>
                  <Link
                    href="#"
                    className="flex items-center p-1 text-sm font-normal text-white rounded-lg   hover:bg-pin"
                  >
                    {" "}
                    <label className="inline-flex items-center space-x-3">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        className="form-checkbox h-3 w-3 text-gray-600"
                      />{" "}
                      <span className="ml-3">Profile</span>
                    </label>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col justify-center mt-24 text-end">
            <div className="text-white flex items-center justify-center bg-[#373A41] px-2 rounded-lg w-[155px]">
              <AiOutlineSetting />
              <button className="flex justify-center items-center px-2 py-2 text-xs font-medium uppercase">
                Settings
              </button>
            </div>
          </div>
        </div>
      </Disclosure>
    </>
  );
}
