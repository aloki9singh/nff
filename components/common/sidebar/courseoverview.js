import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { auth } from "@/config/firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";
import { BiLogIn } from "react-icons/bi";
import { useRouter } from "next/router";
import { AiOutlineArrowRight, AiOutlineSetting } from "react-icons/ai";
import { logout } from "@/lib/exportablefunctions";
const CourseoverviewSidebar = ({ pathname }) => {
  const [user, setUser] = useState({});
  const [showSideBar, setShowSideBar] = useState(false);
  const router=useRouter()
  function toogleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  });
  return (
    <>
      <aside className="h-full left-0 top-0  bg-[#15161B]  flex flex-col w-[200px] px-3 ">
        <div className=" h-full  ">
          <div className="">
            <div className="relative">
              <Image
                src="/pagesgraphics/common/createcategory/Neatskills.svg"
                width={150}
                height={100}
                alt="logo"
                className="pt-5 mb-5"
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
                      <span
                        className={`ml-3 text-[${
                          pathname == "/beta/courseoverview" ? "#E1348B" : ""
                        }]`}
                      >
                        Courses
                      </span>
                    </label>
                  </Link>
                  {user ? (
                    <></>
                  ) : (
                    <Link
                      href="/beta/community"
                      className="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-pin"
                    >
                      <label className="inline-flex items-center space-x-3">
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          className="form-checkbox h-3 w-3 text-gray-600"
                        />{" "}
                        <span>Community</span>
                      </label>
                    </Link>
                  )}

                  {user ? (
                    <div>
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
                          <span>Schedule</span>
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
              <div className="text-white flex-row  space-y-5 mt-20">
                <button onClick={()=>{logout(router)}} className=" bg-[#373A41]  flex  justify-center  items-center w-full  rounded   pt-2.5 pb-2 text-xs font-medium uppercase leading-normal ">
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
