import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { RxCross2 } from "react-icons/rx";
import { BsPersonCircle } from "react-icons/bs";
import { useAuthContext } from "@/lib/context/AuthContext";
import { AiOutlineArrowRight, AiOutlineSetting } from "react-icons/ai";
const Sidebar = ({ toggleSideBar }) => {
  const router = useRouter();
  const { user, userProfile } = useAuthContext();
  return (
    <>
      <aside className="h-screen md:bg-[#141518] bg-[#25262C] p-5 rounded-l-[40px] md:rounded-l-[0px]  flex flex-col justify-between ">
        <div>
          <div>
            <Image
              src="/componentsgraphics/common/sidebar/schoolsidebar/Neatskills.svg"
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
              <p className="pt-2">{user ? user.displayName : "Guest"}</p>
              <p className="text-gray-500 text-[12px] mt-[-7px]">
                Roll no - {userProfile ? userProfile?.rollno : "None"}
              </p>
            </div>
          </div>
          <div className="flex flex-col h-full ">
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
                      className={`rounded form-checkbox h-3 w-3 text-gray-600 ${router.pathname === "/seta/dashboard"
                          ? "shadow-white"
                          : ""
                        }`}
                      style={{
                        boxShadow:
                          router.pathname === "/seta/dashboard"
                            ? "0 0 5px #A145CD"
                            : "none",
                      }}
                    />{" "}
                    <span
                      className={`${router.pathname == ""
                          ? "text-[#E1348B]"
                          : ""
                        }`}
                    >
                      Home
                    </span>
                  </label>
                </Link>
                <Link
                  href="/reta/students"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-pin"
                >
                  <label className="inline-flex items-center space-x-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
                        router.pathname === "/reta/students"
                          ? "shadow-white"
                          : ""
                      }`}
                      style={{
                        boxShadow:
                          router.pathname === "/reta/students"
                            ? "0 0 5px #A145CD"
                            : "none",
                      }}
                    />{" "}
                    <span className={`${
                        router.pathname == "/reta/students"
                          ? "text-[#E1348B]"
                          : ""
                      }`}>Students</span>
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
                      className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
                        router.pathname === ""
                          ? "shadow-white"
                          : ""
                      }`}
                      style={{
                        boxShadow:
                          router.pathname === ""
                            ? "0 0 5px #A145CD"
                            : "none",
                      }}
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
                      className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
                        router.pathname === ""
                          ? "shadow-white"
                          : ""
                      }`}
                      style={{
                        boxShadow:
                          router.pathname === ""
                            ? "0 0 5px #A145CD"
                            : "none",
                      }}
                    />{" "}
                    <span
                      className={`ml-3 text-[${router.pathname == "/Schedule" ? "#E1348B" : ""
                        }]`}
                    >
                      Schedule
                    </span>
                  </label>
                </Link>

                <Link
                  href="/seta/profile"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-pin"
                >
                  <label className="inline-flex items-center space-x-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
                        router.pathname === ""
                          ? "shadow-white"
                          : ""
                      }`}
                      style={{
                        boxShadow:
                          router.pathname === ""
                            ? "0 0 5px #A145CD"
                            : "none",
                      }}
                    />{" "}
                    <span
                      className={`ml-3 text-[${router.pathname == "/Schedule" ? "#E1348B" : ""
                        }]`}
                    >
                      Live Class
                    </span>
                  </label>
                </Link>

                <Link
                  href="/seta/profile"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-pin"
                >
                  <label className="inline-flex items-center space-x-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
                        router.pathname === ""
                          ? "shadow-white"
                          : ""
                      }`}
                      style={{
                        boxShadow:
                          router.pathname === ""
                            ? "0 0 5px #A145CD"
                            : "none",
                      }}
                    />{" "}
                    <span
                      className={`ml-3 text-[${router.pathname == "/Schedule" ? "#E1348B" : ""
                        }]`}
                    >
                      Study Material
                    </span>
                  </label>
                </Link>


                <Link
                  href="/seta/profile"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-pin"
                >
                  <label className="inline-flex items-center space-x-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
                        router.pathname === ""
                          ? "shadow-white"
                          : ""
                      }`}
                      style={{
                        boxShadow:
                          router.pathname === ""
                            ? "0 0 5px #A145CD"
                            : "none",
                      }}
                    />{" "}
                    <span
                      className={`ml-3 text-[${router.pathname == "/Schedule" ? "#E1348B" : ""
                        }]`}
                    >
                      Homework
                    </span>
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
                      className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
                        router.pathname === ""
                          ? "shadow-white"
                          : ""
                      }`}
                      style={{
                        boxShadow:
                          router.pathname === ""
                            ? "0 0 5px #A145CD"
                            : "none",
                      }}
                    />{" "}
                    <span
                      className={`ml-3 text-[${router.pathname == "/Schedule" ? "#E1348B" : ""
                        }]`}
                    >
                      Chat
                    </span>
                  </label>
                </Link>

                <Link
                  href="/seta/profile"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-pin"
                >
                  <label className="inline-flex items-center space-x-3">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
                        router.pathname === ""
                          ? "shadow-white"
                          : ""
                      }`}
                      style={{
                        boxShadow:
                          router.pathname === ""
                            ? "0 0 5px #A145CD"
                            : "none",
                      }}
                    />{" "}
                    <span
                      className={`ml-3 text-[${router.pathname == "/Schedule" ? "#E1348B" : ""
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
        <div className="text-white flex-row  space-y-5  mt-32 ">
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
