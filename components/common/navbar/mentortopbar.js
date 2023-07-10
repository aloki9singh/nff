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
const MentorTopbar = ({ heading, toggleSideBar }) => {
  let [searchstate, setsearchstate] = useState("");
  const [profileMenu, setProfileMenu] = useState(false);
  let searchfun = (e) => {
    setsearchstate(e.target.value);
  };
  const router = useRouter();
  const { user } = useAuthContext();

  return (
    <>
      <div className="flex justify-between lg:flex  md:static static  md:ml-5   mt-2 w-full p-2 md:py-4 py-6 md:p-0 md:bg-[#2E3036] bg-[#141518]">
        <h1 className="text-white my-auto  ml-5 md:ml-0 font-600 md:text-2xl text-[19px]">
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

          <div className="ml-12 md:flex space-x-4  hidden ">
            <BiBell className="text-white text-2xl my-auto"></BiBell>

            {user && user.photoURL ? (
              <Image
                onClick={() => setProfileMenu(!profileMenu)}
                src={user.photoURL}
                alt="proImg"
                height={60}
                width={60}
                className="inline-block relative object-cover object-center md:hidden !rounded-full border border-[#E1348B] aspect-square"
              />
            ) : (
              <BsPersonCircle
                onClick={() => setProfileMenu(!profileMenu)}
                className="text-white text-4xl"
              ></BsPersonCircle>
            )}
          </div>
          <div
            className={`absolute mt-10 top-4 right-12 z-10 transform ${
              profileMenu ? "block" : "hidden"
            }`}
          >
            <div className="h-48 w-36 text-center p-3">
              <div className="relative bg-[#373A41] text-white rounded-tl-lg rounded-b-lg divide-y border border-white">
                <Link href="/beta/profile">
                  <p className="p-2">
                    {user && user.photoURL ? (
                      <div className="flex gap-1 items-center">
                        <Image
                          src={user.photoURL}
                          height="35"
                          width="35"
                          className="rounded-full h-6 w-6"
                          alt="img"
                        />
                        <div className="text-left">
                          <p className="text-[10px] mb-1">{user.displayName}</p>
                          <p className="text-[7px] -mt-1">Class N/A</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-1 items-center">
                        <BsPersonCircle className="text-white text-xl"></BsPersonCircle>
                        <div className="text-left">
                          <p className="text-[10px] mb-1">Guest</p>
                          <p className="text-[7px] -mt-1">Class N/A</p>
                        </div>
                      </div>
                    )}
                  </p>
                </Link>

                <div className="text-[10px] p-2">
                  <Link href="/beta/profile">
                    <p className="mb-2">Profile</p>
                  </Link>
                  <Link href="/invite">
                    <p>Invite a Friend</p>
                  </Link>
                </div>
                <div className="text-[10px] p-2">
                  <Link href="/alpha/contactUs">
                    <p className="mb-2">Neat Skills Help Centre</p>
                  </Link>
                  <Link href="/alpha/termsAndCondition">
                    <p>Terms & Conditions</p>
                  </Link>
                </div>
                <div className="text-[10px] p-2 cursor-pointer">
                  <p
                    onClick={() => {
                      signOut(auth);

                      router.push("/");
                    }}
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          </div>

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
