import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { auth } from "@/config/firebaseconfig";
import { BiLogIn } from "react-icons/bi";
import { useRouter } from "next/router";
import { AiOutlineArrowRight, AiOutlineSetting } from "react-icons/ai";
import { logout } from "@/lib/exportablefunctions";
import { useAuthContext } from "@/lib/context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { BsPersonCircle } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
const CourseoverviewSidebar = ({ toggleSideBar }) => {
  const router = useRouter();
  const { user } = useAuthContext();
  return (
    <>
      <aside className="md:bg-[#141518] bg-[#25262C] p-5 rounded-l-[40px] md:rounded-l-[0px]  flex flex-col justify-between ">
        <div>
          <div>
            <div>
              <Image
                src="/pagesgraphics/common/createcategory/Neatskills.svg"
                width={150}
                height={100}
                alt="logo"
                className="mb-6 md:block hidden"
              />
              <div
                className=" flex justify-end w-full md:hidden  "
                onClick={() => toggleSideBar()}
              >
                <div className="bg-gray-500 rounded-full p-[5px]">
                  <RxCross2 className="text-white  text-sm" />
                </div>
              </div>
              <div className="md:hidden block p-2 text-white">
                <Link href={"/meta/profile"}>
                  {user && user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt="proImg"
                      height={60}
                      width={60}
                      className="inline-block relative object-cover object-center md:hidden !rounded-full border border-[#E1348B] aspect-square"
                    />
                  ) : (
                    <BsPersonCircle className="text-white text-4xl"></BsPersonCircle>
                  )}
                </Link>
                <p className="pt-2">{user ? user.displayName : "Anonymous"}</p>
                <p className="text-gray-500 text-[12px] mt-[-7px]">
                  Roll no-xxxxxxxxxxx
                </p>
              </div>
            </div>
            <div className="flex flex-col h-full justify-around ">
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
                        className={`rounded form-checkbox h-3 w-3 text-gray-600 ${router.pathname === "/beta/dashboard"
                          ? "shadow-white"
                          : ""
                          }`}
                        style={{
                          boxShadow:
                            router.pathname === "/beta/dashboard"
                              ? "0 0 5px #A145CD"
                              : "none",
                        }}
                      />{" "}
                      <span
                        className={`ml-3 text-[${router.pathname == "/beta/dashboard" ? "#E1348B" : ""
                          }]`}
                      >
                        Home
                      </span>
                    </label>
                  </Link>
                  <hr className="h-px  my-4 bg-gray-500 border-0 w-[90%] m-auto "></hr>
                  <Link
                    href="/beta/courseoverview"
                    className="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-pin"
                  >
                    <label className="inline-flex items-center space-x-3">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        className={`rounded form-checkbox h-3 w-3 text-gray-600 ${router.pathname === "/beta/courseview"
                          ? "shadow-white"
                          : ""
                          }`}
                        style={{
                          boxShadow:
                            router.pathname === "/meta/courseview"
                              ? "0 0 5px #A145CD"
                              : "none",
                        }}
                      />{" "}
                      <span
                        className={`ml-3 text-[${router.pathname == "/beta/courseoverview" ? "#E1348B" : ""}]`}
                      >
                        Courses
                      </span>
                    </label>
                  </Link>
                  {user ? (
                    " "
                  ) : (
                    <Link
                      href="/beta/community"
                      className="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-pin"
                    >
                      <label className="inline-flex items-center space-x-3">
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          className={`rounded form-checkbox h-3 w-3 text-gray-600 ${router.pathname === "/beta/community"
                            ? "shadow-white"
                            : ""
                            }`}
                          style={{
                            boxShadow:
                              router.pathname === "/beta/community"
                                ? "0 0 5px #A145CD"
                                : "none",
                          }}
                        />{" "}
                        <span
                          className={`ml-3 text-[${router.pathname == "/beta/community"
                            ? "#E1348B"
                            : ""
                            }]`}
                        >
                          Community
                        </span>
                      </label>
                    </Link>
                  )}

                  {user ? (
                    <div style={{marginTop: "0"}}>
                      <Link
                        href="/beta/checkclass"
                        className="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-pin"
                      >
                        <label className="inline-flex items-center space-x-3">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            className={`rounded form-checkbox h-3 w-3 text-gray-600 ${router.pathname === "/beta/checkclass"
                              ? "shadow-white"
                              : ""
                              }`}
                            style={{
                              boxShadow:
                                router.pathname === "/beta/checkclass"
                                  ? "0 0 5px #A145CD"
                                  : "none",
                            }}
                          />{" "}
                          <span
                            className={`ml-3 text-[${router.pathname == "/beta/checkclass"
                              ? "#E1348B"
                              : ""
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
                        <label className="inline-flex items-center space-x-3">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            className={`rounded form-checkbox h-3 w-3 text-gray-600 ${router.pathname === "/beta/studymaterial"
                              ? "shadow-white"
                              : ""
                              }`}
                            style={{
                              boxShadow:
                                router.pathname === "/beta/studymaterial"
                                  ? "0 0 5px #A145CD"
                                  : "none",
                            }}
                          />{" "}
                          <span
                            className={`ml-3 text-[${router.pathname == "/beta/studymaterial"
                              ? "#E1348B"
                              : ""
                              }]`}
                          >
                            Study Material
                          </span>
                        </label>
                      </Link>
                      <Link
                        href="/beta/assignments"
                        className="flex items-center p-2 text-base font-normal text-white rounded-lg    hover:bg-pin"
                      >
                        <label className="inline-flex items-center space-x-3">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            className={`rounded form-checkbox h-3 w-3 text-gray-600 ${router.pathname === "/beta/assignments"
                              ? "shadow-white"
                              : ""
                              }`}
                            style={{
                              boxShadow:
                                router.pathname === "/beta/assignments"
                                  ? "0 0 5px #A145CD"
                                  : "none",
                            }}
                          />{" "}
                          <span
                            className={`ml-3 text-[${router.pathname == "/beta/assignments"
                              ? "#E1348B"
                              : ""
                              }]`}
                          >
                            Homework
                          </span>
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
                            className={`rounded form-checkbox h-3 w-3 text-gray-600 ${router.pathname === "/beta/chats"
                              ? "shadow-white"
                              : ""
                              }`}
                            style={{
                              boxShadow:
                                router.pathname === "/beta/chats"
                                  ? "0 0 5px #A145CD"
                                  : "none",
                            }}
                          />{" "}
                          <span

                            className={`ml-3 text-[${router.pathname == "/beta/chats"
                              ? "#E1348B"
                              : ""
                              }]`}

                          >
                            Chats
                          </span>
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
                            className={`rounded form-checkbox h-3 w-3 text-gray-600 ${router.pathname === "/beta/profile"
                              ? "shadow-white"
                              : ""
                              }`}
                            style={{
                              boxShadow:
                                router.pathname === "/beta/profile"
                                  ? "0 0 5px #A145CD"
                                  : "none",
                            }}
                          />{" "}
                          <span

                            className={`ml-3 text-[${router.pathname == "/beta/profile"
                              ? "#E1348B"
                              : ""
                              }]`}
                          >
                            Profile
                          </span>

                        </label>
                      </Link>
                      <button onClick={() => {
                        logout(router);
                      }}
                        className="flex items-center p-2 text-base font-normal text-white rounded-lg cursor-pointer hover:bg-pin"
                      >
                        <label className="inline-flex items-center space-x-3">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            className="rounded form-checkbox h-3 w-3 text-gray-600"
                          />{" "}
                          <span
                            className={`ml-3 flex text-[${router.pathname == "/beta/chats"
                              ? "#E1348B"
                              : ""
                              }]`}

                          >
                            Logout 
                          </span>
                        </label>
                      </button>
                      {user ? (
                        <div className="  font-semibold text-white bg-[#373A41] flex flex-col mt-9 rounded-xl">
                          <div className=" px-8 py-2 ">
                            <h1 className="text-xl font-Inter">
                              Discord <br /> Community
                            </h1>
                            <p>150 members</p>
                            <button className="inline-flex items-center mt-10 h-10 px-5 text-indigo-100 transition-colors duration-150 bg-[#E1348B] rounded-lg focus:shadow-outline ">
                              <span>Join</span>
                              <AiOutlineArrowRight />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div>
            {user ? (
              <div className="text-white flex-row mt-2">
                <button
                  onClick={() => {
                    logout(router);
                  }}
                  className=" bg-[#373A41]  flex  justify-center  items-center w-full  rounded   pt-2.5 pb-2 text-xs font-medium uppercase leading-normal "
                >
                  <span>Log Out </span>
                  <BiLogIn className="text-2xl" />
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
          {user ? (
            <></>
          ) : (
            <div className=" w-full opacity-60 text-left pl-5 bottom-6 mt-40 flex flex-col gap-5">
              <div>
                <Link href="#">
                  <span className="text-white">Cookies</span>
                </Link>
              </div>
              <div>
                <Link href="#">
                  {" "}
                  <span className="text-white">Privacy</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default CourseoverviewSidebar;
