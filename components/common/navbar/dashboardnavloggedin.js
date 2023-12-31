import { IoMdNotificationsOutline } from 'react-icons/io';
import { AiOutlineSearch } from 'react-icons/ai';
import Link from 'next/link';
import Image from 'next/image';
import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebaseconfig';

export default function DashboardNav({ heading, sendSideBarState }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [user, setUser] = useState({});
  const [showSideBar, setShowSideBar] = useState(false);


  // fixed navbbbbbar humburger

  function toogleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  });

  return (
    <>
      <nav className="bg-[#2D2E35] border-b-2 border-[#728095] px-0 py-6">
        <div className="container flex flex-col md:flex-row gap-y-6 mx-auto justify-between px-10">
          <div className="flex justify-between items-center">
            <p className="text-white font-Inter text-2xl flex justify-start">
              <button
                type="button"
                className="inline-block justify-start items-start px-[20px] py-2.5 bg-[#404147] text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Back
              </button>
            </p>

            <section className="MOBILE-MENU flex lg:hidden">
              <div
                className="HAMBURGER-ICON space-y-2"
                onClick={() => setIsNavOpen((prev) => !prev)}
              >
                <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
              </div>

              <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
                <div
                  className="absolute top-0 right-0 px-8 py-8"
                  onClick={() => setIsNavOpen(false)}
                >
                  <svg
                    className="h-8 w-8 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <div
                  className="flex items-center gap-x-2  md:mr-1 py-2 rounded-lg"
                  style={{ border: "1px solid #728095" }}
                >
                  <AiOutlineSearch className="text-white text-xl ml-4" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="focus:outline-none bg-inherit text-white"
                  />
                </div>
              </div>
            </section>
          </div>
          <div className="flex items-center gap-x-4">
            <div
              className="md:flex items-center gap-x-2  md:mr-1 py-2 rounded-lg hidden "
              style={{ border: "1px solid #728095" }}
            >
              <AiOutlineSearch className="text-white text-xl ml-4" />
              <input
                type="text"
                placeholder="Search"
                className="focus:outline-none bg-inherit text-white"
              />
            </div>

            {user && (
              <div className="text-white flex items-center">
                <IoMdNotificationsOutline className="text-3xl mr-2" />
                <div className="border border-white rounded-full h-12 w-12 flex justify-center items-center">
                  <Popover className="">
                    <Popover.Button className="outline-none p-2">
                      <Image
                        src={user.photoURL}
                        alt="proImg"
                        height={10}
                        width={10}
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
          </div>
        </div>
      </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
    </>
  );
}
