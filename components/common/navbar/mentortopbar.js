import React, { useState } from "react";
import Link from "next/link";
import { BiBell } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { useAuthContext } from "@/lib/context/AuthContext";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebaseconfig";
import { Router, useRouter } from "next/router";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

const MentorTopbar = ({ heading, toggleSideBar }) => {
  let [searchstate, setsearchstate] = useState("");
  const [profileMenu, setProfileMenu] = useState(false);
  let searchfun = (e) => {
    setsearchstate(e.target.value);
  };
  const router = useRouter();
  const { user, userProfile } = useAuthContext();
  console.log(userProfile);
  return (
    <>
      <div className="flex justify-between lg:flex md:pl-5   pt-5 w-full p-2 md:py-4 py-6 md:p-0 md:bg-[#2E3036] bg-[#141518] md:rounded-tl-[40px]">
        <h1 className="text-white my-auto  ml-5 md:ml-0 font-600 md:text-2xl text-[19px]">
          {heading}
        </h1>
        <div className="mr-12 flex ">
          <div className=" xl:w-96">
            <form className=" items-center hidden md:block ">
              <label htmlFor="voice-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
                  className="bg-transparent  border border-gray-300 text-slate-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..."
                  required
                  value={searchstate}
                  onChange={searchfun}
                />
              </div>
            </form>
          </div>

          {user && (
            <div className="text-white max-[768px]:hidden flex items-center z-10">
              <BiBell className="text-white text-2xl my-auto mx-4"></BiBell>
              <div className="] h-12 w-12 flex justify-center items-center">
                <Popover className="">
                  <Popover.Button className="outline-none ">
                    {user && userProfile && userProfile.photoURL ? (
                      <Image
                        // src={user.photoURL}
                        src={user && userProfile && userProfile.photoURL}
                        alt="proImg"
                        height={48}
                        width={48}
                        className="inline-block  object-cover object-center !rounded-full border-[#E1348B] aspect-square"
                      />
                    ) : (
                      <BsPersonCircle
                        onClick={() => setProfileMenu(!profileMenu)}
                        className="text-white text-4xl"
                      />
                    )}
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
                    <Popover.Panel className="absolute translate-y-[43px] translate-x-[-163px] top-4">
                      <div className="h-48 w-[200px] text-center p-3">
                        <div className="bg-[#373A41] text-white rounded-tl-2xl rounded-b-2xl divide-y border border-[#505057] relative">
                          <Link href="/meta/profile">
                            <p className="p-2">
                              {user && userProfile && userProfile.photoURL ? (
                                <div className="flex gap-2 items-center">
                                  <Image
                                    src={user && userProfile.photoURL}
                                    height="35"
                                    width="35"
                                    className="rounded-full h-6 w-6"
                                    alt="img"
                                  />
                                  <div className="text-left">
                                    <p className="text-[13px] mb-1">
                                      {(user &&
                                        userProfile &&
                                        userProfile.displayName) ||
                                        user.displayName}
                                    </p>
                                    <p className="text-[10px] -mt-2">
                                      {`MENTOR`}
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex gap-1 items-center">
                                  <BsPersonCircle
                                    onClick={() => setProfileMenu(!profileMenu)}
                                    className="text-white text-4xl"
                                  />
                                  <div className="text-left">
                                    <p className="text-[13px] mb-1">
                                      {userProfile.displayName.includes("gmail")
                                        ? userProfile.displayName.slice(0, 5)
                                        : userProfile.displayName}
                                    </p>
                                    <p className="text-[10px] -mt-2"></p>
                                  </div>
                                </div>
                              )}
                            </p>
                          </Link>

                          <div className="text-[13px] p-2">
                            <Link href="/meta/profile">
                              <p className="mb-2">Profile</p>
                            </Link>
                            <Link href="/invite">
                              <p>Invite a Friend</p>
                            </Link>
                          </div>
                          <div className="text-[13px] p-2">
                            <Link href="/alpha/contactUs">
                              <p className="mb-2">Neat Skills Help Centre</p>
                            </Link>
                            <Link href="/alpha/termsandcondition">
                              <p>Terms & Conditions</p>
                            </Link>
                          </div>
                          <div className="text-[13px] p-2 cursor-pointer ">
                            <p onClick={() => signOut(auth)}>Logout</p>
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
              <Link href={"/meta/signup"}>
                <button
                  type="button"
                  className="inline-block justify-start items-start px-[20px] py-2.5 bg-[#404147] text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Signup
                </button>
              </Link>
              <Link href={"/beta/login"}>
                <button
                  type="button"
                  className="inline-block justify-start items-start px-[20px] ml-6 mr-3 py-2.5 bg-pin text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  LOGIN
                </button>
              </Link>
            </div>
          )}
          <div
            className=" md:hidden block mr-[-30px] "
            onClick={() => toggleSideBar()}
          >
            <RxHamburgerMenu className="text-white text-3xl block md:hidden" />
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorTopbar;
