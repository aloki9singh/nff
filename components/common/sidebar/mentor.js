import { auth } from "@/config/firebaseconfig";
import { useAuthContext } from "@/lib/context/AuthContext";
import { removeDomainFromEmail } from "@/lib/exportablefunctions";
import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { AiOutlineSetting } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

const MentorSidebar = ({ toggleSideBar }) => {
  const router = useRouter();
  const { user, userProfile } = useAuthContext();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked((prevState) => !prevState);
  };
  return (
    <>
      <aside className="h-screen md:bg-[#141518] bg-[#25262C] p-5 rounded-l-[40px] md:rounded-l-[0px]  flex flex-col justify-between ">
        <div>
          <div>
            <Image
              src="/componentsgraphics/common/navbar/navbar/neatskillslogosample.svg"
              width={150}
              height={150}
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
                {user && userProfile && userProfile.photoURL ? (
                  <Image
                    src={userProfile.photoURL}
                    alt="proImg"
                    height={60}
                    width={60}
                    className="inline-block relative object-cover object-center md:hidden !rounded-full border border-[#E1348B] aspect-square"
                  />
                ) : (
                  <BsPersonCircle className="text-white text-4xl"></BsPersonCircle>
                )}
              </Link>
              <p className="pt-2">{user ? user.displayName : "Guest"}</p>
              <p className="text-gray-500 text-[12px] ">
                {`MENTOR- ${
                  userProfile
                    ? (userProfile.displayName || user.displayName).includes(
                        "gmail"
                      )
                      ? removeDomainFromEmail(
                          userProfile.displayName || user.displayName
                        )
                      : userProfile.displayName || user.displayName
                    : "None"
                }`}
              </p>
            </div>
          </div>

          <div className="flex h-full ">
            <ul className="flex flex-col md:gap-1 w-full">
              <li className="">
                <Link
                  href="/meta/dashboard"
                  className="flex items-center p-2 text-base font-light text-white rounded-lg  hover:bg-pin"
                >
                  <label className="inline-flex cursor-pointer items-center space-x-3 ">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
                        router.pathname === "/meta/dashboard"
                          ? "shadow-white"
                          : ""
                      }`}
                      style={{
                        boxShadow:
                          router.pathname === "/meta/dashboard"
                            ? "0 0 5px #A145CD"
                            : "none",
                      }}
                    />
                    <span
                      className={`${
                        router.pathname == "/meta/dashboard"
                          ? "text-[#E1348B]"
                          : ""
                      }`}
                    >
                      Home
                    </span>
                  </label>
                </Link>
              </li>
              <li>
                <Link
                  href="/meta/courses"
                  className="flex items-center p-2 text-base font-light text-white rounded-lg  hover:bg-pin "
                >
                  <label className="inline-flex cursor-pointer items-center space-x-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
                        router.pathname === "/meta/courses"
                          ? "shadow-white"
                          : ""
                      }`}
                      style={{
                        boxShadow:
                          router.pathname === "/meta/courses"
                            ? "0 0 5px #A145CD"
                            : "none",
                      }}
                    />{" "}
                    <span
                      className={`${
                        router.pathname == "/meta/courses"
                          ? "text-[#E1348B]"
                          : ""
                      }`}
                    >
                      Course
                    </span>
                  </label>
                </Link>
              </li>
              <li>
                <Link
                  href="student"
                  className="flex items-center p-2 text-base font-light text-white rounded-lg  hover:bg-pin "
                >
                  <label className="inline-flex cursor-pointer items-center space-x-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
                        router.pathname === "/meta/student"
                          ? "shadow-white"
                          : ""
                      }`}
                      style={{
                        boxShadow:
                          router.pathname === "/meta/student"
                            ? "0 0 5px #A145CD"
                            : "none",
                      }}
                    />

                    <span
                      className={`${
                        router.pathname == "/meta/student"
                          ? "text-[#E1348B]"
                          : ""
                      }`}
                    >
                      Students
                    </span>
                  </label>
                </Link>
              </li>
              <hr className="h-px  bg-gray-500 border-0 w-[90%] mx-auto my-1"></hr>
              <li>
                <Link
                  href="schedule"
                  className="flex items-center p-2 text-base font-light text-white rounded-lg  hover:bg-pin "
                >
                  <label className="inline-flex cursor-pointer items-center space-x-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
                        router.pathname === "/meta/schedule"
                          ? "shadow-white"
                          : ""
                      }`}
                      style={{
                        boxShadow:
                          router.pathname === "/meta/schedule"
                            ? "0 0 5px #A145CD"
                            : "none",
                      }}
                    />

                    <span
                      className={`ml-3 text-[${
                        router.pathname == "/meta/schedule" ? "#E1348B" : ""
                      }]`}
                    >
                      Schedule
                    </span>
                  </label>
                </Link>
              </li>
              <li>
                <div
                  onClick={() => router.push("https://meet.neatskills.tech/")}
                  className="flex items-center p-2 text-base font-light text-white rounded-lg hover:bg-pin"
                >
                  <label className="inline-flex cursor-pointer items-center space-x-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
                        isChecked ? "shadow-white text-white" : ""
                      }`}
                      style={{
                        boxShadow: isChecked ? "0 0 5px #A145CD" : "none",
                      }}
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />

                    <span
                      className={`ml-3 ${
                        isChecked === "https://meet.neatskills.tech"
                          ? "text-#E1348B"
                          : ""
                      }`}
                    >
                      Live Class
                    </span>
                  </label>
                </div>
              </li>

              <li>
                <Link
                  href="studymaterial"
                  className="flex items-center p-2 text-base font-light text-white rounded-lg  hover:bg-pin "
                  replace
                >
                  <label className="inline-flex cursor-pointer items-center space-x-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
                        router.pathname === "/meta/studymaterial"
                          ? "shadow-white"
                          : ""
                      }`}
                      style={{
                        boxShadow:
                          router.pathname === "/meta/studymaterial"
                            ? "0 0 5px #A145CD"
                            : "none",
                      }}
                    />

                    <span
                      className={`${
                        router.pathname == "/meta/studymaterial"
                          ? "text-[#E1348B]"
                          : ""
                      }`}
                    >
                      Study Material
                    </span>
                  </label>
                </Link>
              </li>
              <li>
                <Link
                  href="/meta/assignments"
                  className="flex items-center p-2 text-base font-light text-white rounded-lg    hover:bg-pin "
                  replace
                >
                  <label className="inline-flex cursor-pointer items-center space-x-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
                        router.pathname === "/meta/assignments"
                          ? "shadow-white"
                          : ""
                      }`}
                      style={{
                        boxShadow:
                          router.pathname === "/meta/assignments"
                            ? "0 0 5px #A145CD"
                            : "none",
                      }}
                    />

                    <span
                      className={`${
                        router.pathname == "/meta/assignments"
                          ? "text-[#E1348B]"
                          : ""
                      }`}
                    >
                      Assignment
                    </span>
                  </label>
                </Link>
              </li>
              <hr className="h-px  bg-gray-500 border-0 w-[90%] mx-auto my-1 "></hr>
              <li>
                <Link
                  href="/meta/chats"
                  className="flex items-center p-2 text-base font-light text-white rounded-lg hover:bg-pin "
                >
                  <label className="inline-flex cursor-pointer items-center space-x-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
                        router.pathname === "/meta/chats" ? "shadow-white" : ""
                      }`}
                      style={{
                        boxShadow:
                          router.pathname === "/meta/chats"
                            ? "0 0 5px #A145CD"
                            : "none",
                      }}
                    />

                    <span
                      className={`${
                        router.pathname == "/meta/chats" ? "text-[#E1348B]" : ""
                      }`}
                    >
                      Chats
                    </span>
                  </label>
                </Link>
              </li>
              <li>
                <Link
                  href="/meta/profile"
                  className="flex items-center cursor-pointer p-2 text-base font-normal text-white rounded-lg   hover:bg-pin "
                >
                  <label className="inline-flex items-center space-x-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
                        router.pathname === "/meta/profile"
                          ? "shadow-white"
                          : ""
                      }`}
                      style={{
                        boxShadow:
                          router.pathname === "/meta/profile"
                            ? "0 0 5px #A145CD"
                            : "none",
                      }}
                    />

                    <span
                      className={`${
                        router.pathname == "/meta/profile"
                          ? "text-[#E1348B]"
                          : ""
                      }`}
                    >
                      Profile
                    </span>
                  </label>
                </Link>
              </li>
              <li className="md:hidden block">
                <Link
                  href="/meta/setting"
                  className="flex items-center cursor-pointer p-2 text-base font-normal text-white rounded-lg   hover:bg-pin "
                >
                  <label className="inline-flex items-center space-x-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
                        router.pathname === "/meta/setting"
                          ? "shadow-white"
                          : ""
                      }`}
                      style={{
                        boxShadow:
                          router.pathname === "/meta/setting"
                            ? "0 0 5px #A145CD"
                            : "none",
                      }}
                    />

                    <span
                      className={`${
                        router.pathname == "/meta/setting"
                          ? "text-[#E1348B]"
                          : ""
                      }`}
                    >
                      Settings
                    </span>
                  </label>
                </Link>
              </li>
              <li className="md:hidden block">
                <Link
                  href="profile"
                  className="flex items-center cursor-pointer p-2 text-base font-normal text-white rounded-lg   hover:bg-pin "
                >
                  <label className="inline-flex items-center space-x-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
                        router.pathname === "/meta/logout" ? "shadow-white" : ""
                      }`}
                      style={{
                        boxShadow:
                          router.pathname === "/meta/logout"
                            ? "0 0 5px #A145CD"
                            : "none",
                      }}
                    />

                    <span
                      className={`${
                        router.pathname == "/meta/logout"
                          ? "text-[#E1348B]"
                          : ""
                      } cursor-pointer`}
                    >
                      <p
                        onClick={() => {
                          signOut(auth);
                          router.push("/");
                        }}
                      >
                        Logout
                      </p>
                    </span>
                  </label>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-white space-y-5  md:block hidden mt-10">
          <button
            onClick={()=>router.push("/meta/setting")}
          className=" bg-[#373A41]  flex  justify-center  items-center px-5  m-auto  rounded-[10px] pt-2.5 pb-2 text-xs font-medium uppercase leading-normal gap-x-2 ">
            <AiOutlineSetting />
            <span

              className={`${router.pathname == "/meta/dashboard" ? "" : ""}`}
            >
              Settings{" "}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default MentorSidebar;
