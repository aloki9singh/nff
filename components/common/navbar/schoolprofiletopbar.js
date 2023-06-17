import React, { useState,Fragment } from "react";
import Link from "next/link";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Popover, Transition } from "@headlessui/react";
import Image from "next/image";

const SchoolProfileTopbar = ({ heading }) => {
  let [searchstate, setsearchstate] = useState("");
  const [user, setUser] = useState({});
  let searchfun = (e) => {
    setsearchstate(e.target.value);
  };
  return (
    <>
      <div className="flex justify-between lg:flex  md:static fixed md:w-[95%] md:bg-[#2E3036]  md:ml-5  top-0 md:rounded-l-[25px] md:mt-2  bg-[#373A41] w-full p-2 md:p-0">
        <h1 className="text-white my-auto ml-5 md:ml-10 md:text-2xl text-[19px]">
          {heading}
        </h1>
        <div className="mr-12 flex">
          <div className=" xl:w-96">
            <form className=" items-center hidden md:block ">
              <label htmlFor="voice-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
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
                  className="bg-transparent  border border-gray-500 text-slate-200 focus:outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-transparent dark:border-gray-500 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..."
                  required
                  value={searchstate}
                  onChange={searchfun}
                />
              </div>
            </form>
          </div>

          <div className="ml-12 flex space-x-4 mr-[-25px]">
           
            {user && (
            <div className="text-white flex items-center ">
              <IoMdNotificationsOutline className="text-3xl mr-2" />
              <div className="border border-white rounded-full h-12 w-12 flex justify-center items-center mr-5">
                <Popover className="">
                  <Popover.Button className="outline-none p-2">
                    <Image
                      src={user.photoURL ? user.photoURL : "/Male.png"}
                      alt="img"
                      height={100}
                      width={100}
                      className="rounded-full h-12 w-12 object-contain"
                    />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute mt-10 top-4 right-12 z-10 transform">
                      <div className="h-48 w-36 text-center p-3">
                        <div className="relative bg-[#373A41] text-white rounded-tl-lg rounded-b-lg divide-y border border-white">
                          <Link href="/profile">
                            <p className="p-2">
                              {user.photoURL ? (
                                <div className="flex gap-1 items-center">
                                  <Image
                                    src={user.photoURL}
                                    height="35"
                                    width="35"
                                    className="rounded-full h-6 w-6"
                                    alt="img"
                                  />
                                  <div className="text-left">
                                    <p className="text-[10px] mb-1">
                                      {user.displayName}
                                    </p>
                                    <p className="text-[7px] -mt-1">
                                      Class N/A
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex gap-1 items-center">
                                  <Image
                                    src="/download.png"
                                    height="35"
                                    width="35"
                                    className="rounded-full h-6 w-6"
                                    alt="img"
                                  />
                                  <div className="text-left">
                                    <p className="text-[10px] mb-1">Guest</p>
                                    <p className="text-[7px] -mt-1">
                                      Class N/A
                                    </p>
                                  </div>
                                </div>
                              )}
                            </p>
                          </Link>

                          <div className="text-[10px] p-2">
                            <Link href="/profile">
                              <p className="mb-2">Profile</p>
                            </Link>
                            <Link href="/invite">
                              <p>Invite a Friend</p>
                            </Link>
                          </div>
                          <div className="text-[10px] p-2">
                            <Link href="/contactUs">
                              <p className="mb-2">Neat Skills Help Centre</p>
                            </Link>
                            <Link href="/termsAndCondition">
                              <p>Terms & Conditions</p>
                            </Link>
                          </div>
                          <div className="text-[10px] p-2">
                            <Link href="/logout">
                              <p>Logout</p>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </Popover>
              </div>
            </div>
          )}
          {!user && (
            <div className="hidden md:block ml-6">
              <Link href={"/signup"}>
                <button
                  type="button"
                  className="inline-block justify-start items-start px-[20px] py-2.5 bg-[#404147] text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Signup
                </button>
              </Link>
              <Link href={"/login"}>
                <button
                  type="button"
                  className="inline-block justify-start items-start px-[20px] ml-6 mr-3 py-2.5 bg-pin text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  LOGIN
                </button>
              </Link>
            </div>
          )}
            {/* <BsPersonCircle className="text-white text-4xl"></BsPersonCircle> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SchoolProfileTopbar;
