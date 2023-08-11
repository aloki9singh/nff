import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { ImMenu } from "react-icons/im";
import Image from "next/image";
import { useAuthContext } from "@/lib/context/AuthContext";
import Avatar from "../chat/avatar";
import { BsPersonCircle } from "react-icons/bs";
import { Popover, Transition } from "@headlessui/react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebaseconfig";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Navbar({ nav, setNav }) {
  const handleNav = () => {
    setNav(!nav);
  };

  //   change navbar color when scrolling
  const [color, setColor] = useState(false);
  const { user, userProfile } = useAuthContext();
  const [profileMenu, setProfileMenu] = useState(false);
  const changeColor = () => {
    if (window.scrollY >= 90) {
      setColor(true);
    } else {
      setColor(false);
    }
  };
  // console.log(user, userProfile);
  useEffect(() => {
    const removeNav = () => {
      setNav(false);
    };
    window.addEventListener("scroll", changeColor);
    window.addEventListener("resize", removeNav);
    return () => {
      window.removeEventListener("scroll", changeColor);
      window.removeEventListener("resize", removeNav);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        className={` w-full px-4 md:px-8 lg:px-16 py-4 ${
          color ? "bg-[#131313] shadow-xl" : "bg-transparent"
        } fixed z-10 transition-all duration-300 h-[49px] md:h-[105px] flex justify-center items-center`}
      >
        <div className="w-full max-w-[1440px] flex justify-between items-center font-ral ">
          <Link
            href="/"
            className="uppercase hover:border-b w-[112px] h-[43px] md:w-[186px] md:h-[71px] flex-shrink-0"
          >
            <Image
              src="/componentsgraphics/common/navbar/navbar/neatskillslogosample.svg"
              alt="logo"
              className="w-full h-full object-contain
                           "
              width={100}
              height={100}
            />
          </Link>
          <div className="hidden md:flex justify-center  w-full items-center text-white text-xs  lg:text-base mx-10 lg:mx-12">
            <ul className="max-w-[407px] w-full flex justify-between">
              <Link href="/beta/courseoverview">
                <li className="text-md uppercase hover:border-b ">Courses</li>
              </Link>
              <Link href="/alpha/aboutus">
                <li className="text-md uppercase hover:border-b ">About Us</li>
              </Link>
              <Link href="/alpha/contactus">
                <li className="text-md uppercase hover:border-b ">Contact</li>
              </Link>
            </ul>
          </div>
          <div className="hidden md:flex items-center">
            {userProfile?.role == "student" && user ? (
              <div className="text-white max-[768px]:hidden flex items-center mt-2 z-10 ">
                <IoMdNotificationsOutline className="text-3xl mr-2" />
                <div className="] h-12 w-12 flex justify-center items-center">
                  <Popover className="">
                    <Popover.Button className="outline-none ">
                      {user.photoURL ? (
                        <Image
                          src={user.photoURL}
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
                            <Link href="/beta/profile">
                              <p className="p-2">
                                {userProfile.role == "student" && user ? (
                                  <div className="flex gap-2 items-center">
                                    <Image
                                      src={
                                        user.photoURL ||
                                        "/componentsgraphics/common/Anonymousimage/anonymous.png"
                                      }
                                      height="35"
                                      width="35"
                                      className="rounded-full h-6 w-6"
                                      alt="img"
                                    />
                                    <div className="text-center">
                                      <p className="text-[13px] mb-1">
                                        {user.displayName}
                                      </p>
                                      <p className="text-[10px] -mt-2">
                                        Class {userProfile?.class || "N/A"}
                                      </p>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex gap-1 items-center">
                                    <BsPersonCircle
                                      onClick={() =>
                                        setProfileMenu(!profileMenu)
                                      }
                                      className="text-white text-4xl"
                                    />
                                    <div className="text-left">
                                      <p className="text-[13px] mb-1">Guest</p>
                                      <p className="text-[10px] -mt-2">
                                        Class N/A
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </p>
                            </Link>

                            <div className="text-[13px] p-2">
                              <Link href="/beta/profile">
                                <p className="mb-2">Profile</p>
                              </Link>
                              <Link href="#">
                                <p>Invite a Friend</p>
                              </Link>
                            </div>
                            <div className="text-[13px] p-2">
                              <Link href="/alpha/contactus">
                                <p className="mb-2">Neat Skills Help Centre</p>
                              </Link>
                              <Link href="/alpha/termsandconditions">
                                <p>Terms & Conditions</p>
                              </Link>
                            </div>
                            <div className="text-[13px] p-2">
                              <p onClick={() => signOut(auth)}>Logout</p>
                            </div>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </Popover>
                </div>
              </div>
            ) : (
              <>
                <Link href={"/beta/signup"}>
                  <button
                    type="button"
                    //Ye pehle tha by someone
                    // className="inline-block justify-start items-start px-[20px] py-2.5 bg-pink text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"

                    // MAYANK - YE abhi kr rha hu. without all those hover and all abhi unki need nhi lg rhi, unka color etc bhi soch ke baad mei krunga. Prev one doesnt match figma
                    className="bg-pink text-white font-Inter uppercase font-semibold   rounded-10 border-2 border-white 
                        text-xs w-[77px] h-7
                        md:text-sm md:w-24 md:h-11
                        lg:text-xl lg:w-32 lg:h-14 
                        "
                  >
                    Sign up
                  </button>
                </Link>
                <Link href={"/beta/login"}>
                  <button
                    type="button"
                    // className="inline-block justify-start items-start px-[20px] ml-6 mr-3 py-2.5 bg-pin text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    className="bg-transparent text-white font-Inter uppercase font-semibold   rounded-10 border-2 border-white 
                        text-xs w-[77px] h-7 ml-10
                        md:text-sm md:w-24 md:h-11 md:ml-6
                        lg:text-xl lg:w-32 lg:h-14 lg:ml-[52px]
                        "
                  >
                    LOGIN
                  </button>
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center gap-4 md:hidden">
            <Link href={"/beta/signup"}>
              <button
                type="button"
                className="bg-pink text-white text-[10px]  w-[72px] h-[27px] rounded-10 border border-white
                        "
              >
                Get Started
              </button>
            </Link>
            <div
              onClick={handleNav}
              className=" cursor-pointer flex items-center"
            >
              <RxHamburgerMenu className="text-white text-3xl block md:hidden mr-2" />
            </div>
          </div>
        </div>
        <div />
      </div>
      <div
        className={
          nav
            ? " fixed right-0 top-0 w-full h-screen bg-black/70 z-50  ease-in duration-700 "
            : " fixed  "
        }
      >
        {/* // Side Drawer Menu */}
        <div onClick={handleNav} className="w-full h-full "></div>
        <div
          className={
            nav
              ? "fixed right-0 top-0  w-[60%] sm:w-[60%] md:w-[50%] h-full bg-bs backdrop-blur-md p-4 ease-in duration-200 z-10"
              : "fixed right-0 translate-x-full top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen  p-5 ease-in duration-300 "
          }
        >
          <div className="">
            <div className=" cursor-pointer flex w-full items-center justify-between top-0  overflow-clip">
              <div className="w-full">
                <div
                  onClick={() => setNav(false)}
                  className="rounded-full shadow-lg  p-3 cursor-pointer float-right"
                >
                  <AiOutlineClose className="text-[30px] text-yellow-50" />
                </div>
              </div>
            </div>

            <div className="text-white ">
              <ul className="uppercase text-center ">
                <Link href="/alpha/aboutus">
                  <div
                    onClick={() => setNav(false)}
                    className="py-4 text-sm hover:scale-110 "
                  >
                    Why Neatskills ?
                  </div>
                </Link>
                <Link href="/beta/courseoverview">
                  <div
                    onClick={() => setNav(false)}
                    className="py-4 text-sm hover:scale-110"
                  >
                    Our Courses
                  </div>
                </Link>
                <Link href="/alpha/aboutus">
                  <div
                    onClick={() => setNav(false)}
                    className="py-4 text-sm hover:scale-110"
                  >
                    AboutUs
                  </div>
                </Link>

                {userProfile?.role == "student" && user ? (
                  <Link href="/beta/profile">
                    <div
                      onClick={() => setNav(false)}
                      className="py-4 text-sm hover:scale-110 inline-flex items-center gap-2"
                    >
                      {/* <Avatar src={user.photoURL} alt="proImg" height={32} width={32} /> */}
                      Profile
                    </div>
                  </Link>
                ) : (
                  <>
                    <Link href="/beta/login">
                      <div
                        onClick={() => setNav(false)}
                        className="py-4 text-sm hover:scale-110"
                      >
                        Login
                      </div>
                    </Link>
                    <Link href="/beta/signup">
                      <div
                        onClick={() => setNav(false)}
                        className="py-4 text-sm hover:scale-110"
                      >
                        Signup
                      </div>
                    </Link>
                  </>
                )}

                <Link href="/alpha/contactus">
                  <div
                    onClick={() => setNav(false)}
                    className="py-4 text-sm hover:scale-110"
                  >
                    watch a Demo Session
                  </div>
                </Link>
              </ul>

              <div className="">
                <Link href={"/beta/signup"}>
                  <button
                    onClick={() => {
                      userProfile?.role == "student" && user
                        ? signOut(auth)
                        : "";
                    }}
                    className="uppercase tracking-widest text-white text-xs px2 py-4 w-full bg-pin border-2 rounded-xl "
                  >
                    {userProfile?.role == "student" && user
                      ? "Logout"
                      : "Get Started"}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
