import { useState } from "react";
// import MentorSidebar from "../components/Schedule/MentorSidebar2"
import CourseCard from "@/components/student/courses/CourseCard";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { callUserById } from "@/lib/exportablefunctions";
import { auth } from "@/config/firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";

import withAuth from "@/lib/context/mentorcontext";
// import MobileNav from "../components/CalenderParts/MobileNav";
import MentorSidebar from "@/components/common/sidebar/mentor";
import MentorTopbar from "@/components/common/navbar/mentortopbar";
import Image from "next/image";
import StudentChart from "@/components/mentor/other/chart";
import { useSelector } from "react-redux";
import { FiEdit2 } from "react-icons/fi";
import { FaGreaterThan } from "react-icons/fa";

// Some bugs are there which are yet need to fix

import { Tabs, Tab } from "@/components/student/profile/Tabs";

function MentorProfile() {
  const router = useRouter();
  const chartData = [0, 10, 20, 50, 10, 5, 20, 15, 30, 10, 11, 12]; //Change this student data to show on chart, passed as prop
  const [uid, setUid] = useState("");
  const [userData, setUserData] = useState({});


  console.log(userData);
  return (
    <>
      <div className="md:h-screen h-full  text-base bg-[#15161B]">
        <div className="flex">
          <div className="lg:col-span-5 hidden lg:grid ">
            {" "}
            <MentorSidebar pathname={router.pathname} />
          </div>
          <div className="md:rounded-l-[50px] pt-2 w-[87%] bg-[#2E3036] ">
            <MentorTopbar heading={"Profile"} />
            <hr className="hidden md:block opacity-50 mt-3 "></hr>
            <div className="text-white grow flex flex-col items-center justify-center h-fit md:pt-0 pt-14">
              {/* text */}
              <div className="h-[120px] w-full bg-gradient-to-r from-[#A145CD] to-[#E1348B] " />
              <div className="w-[90%] h-full   md:text-base text-sm  ">
                <div className=" md:mx-10 mx-5">
                  <div className="flex">
                    {" "}
                    <Image
                      src={
                        userData.photoURL
                          ? userData.photoURL
                          : "/pagesgraphics/mentor/profile/ProfileGirlimg.svg"
                      }
                      alt="proImg"
                      height={100}
                      width={100}
                      className="rounded-full w-[100px] object-contain mt-[-60px]"
                    />
                    <div className="w-[100%] flex justify-between">
                      <div className="text-xl md:text-2xl ml-4 mt-[-35px]">
                        {userData.displayName}
                      </div>
                      <div className="flex text-xs md:text-sm mt-[-25px]">
                        Edit profile
                        <FiEdit2 className="ml-1 mt-[2px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /// */}
            <div className="flex max-[963px]:flex-wrap max-[963px]:justify-start mx-auto w-[95%] m-5  md:mt-0 text-white ">
              <div className="lg:pr-4 w-[70%] max-[963px]:w-[98%] ">
                <div className="lg:flex gap-3 justify-around mt-10 mb-5">
                  <div className="w-[602px] h-[355px] p-6 border border-gray-200 rounded-[36px] bg-[#373A41] shadow text-white">
                    <Tabs>
                      <Tab label="Tab 1">
                        <div className="py border-l-2 border-[#E1348B] mb-2">
                          <div className="flex justify-around">
                            <div>
                              <h2 className="text-white mb-[-9px]">
                                After Effects Colored Course
                              </h2>
                              <span className="text-gray-400 text-[11px]">
                                10:00-11:00
                              </span>
                            </div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="11"
                              height="35"
                              viewBox="0 0 256 256"
                            >
                              <path
                                fill="#fff"
                                strokeMiterlimit="10"
                                strokeWidth="0"
                                d="M7.236 90a6.999 6.999 0 01-3.151-13.254L67.193 45 4.085 13.255A7 7 0 0110.376.748l75.539 37.998a7 7 0 010 12.506L10.376 89.251a6.964 6.964 0 01-3.14.749z"
                                transform="matrix(2.81 0 0 2.81 1.407 1.407)"
                              ></path>
                            </svg>
                          </div>
                        </div>

                        <div className="py border-l-2 border-[#E1348B]">
                          <div className="flex justify-around">
                            <div>
                              <h2 className="text-white mb-[-9px]">
                                After Effects Colored Course
                              </h2>
                              <span className="text-gray-400 text-[11px]">
                                10:00-11:00
                              </span>
                            </div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="11"
                              height="35"
                              viewBox="0 0 256 256"
                            >
                              <path
                                fill="#fff"
                                strokeMiterlimit="10"
                                strokeWidth="0"
                                d="M7.236 90a6.999 6.999 0 01-3.151-13.254L67.193 45 4.085 13.255A7 7 0 0110.376.748l75.539 37.998a7 7 0 010 12.506L10.376 89.251a6.964 6.964 0 01-3.14.749z"
                                transform="matrix(2.81 0 0 2.81 1.407 1.407)"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </Tab>
                      <Tab label="Tab 2">
                        <div className="py-4">
                          <div className="py border-l-2 border-[#E1348B] mb-2">
                            <div className="flex justify-around">
                              <div>
                                <h2 className="text-white mb-[-9px]">
                                  After Effects Colored Course
                                </h2>
                                <span className="text-gray-400 text-[11px]">
                                  10:00-11:00
                                </span>
                              </div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="11"
                                height="35"
                                viewBox="0 0 256 256"
                              >
                                <path
                                  fill="#fff"
                                  strokeMiterlimit="10"
                                  strokeWidth="0"
                                  d="M7.236 90a6.999 6.999 0 01-3.151-13.254L67.193 45 4.085 13.255A7 7 0 0110.376.748l75.539 37.998a7 7 0 010 12.506L10.376 89.251a6.964 6.964 0 01-3.14.749z"
                                  transform="matrix(2.81 0 0 2.81 1.407 1.407)"
                                ></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </Tab>
                    </Tabs>
                  </div>
                  <div className="w-[10rem]">
                    <div className="text-left">
                      <div className="md:ml-8 text-base">Activity Hours</div>
                      <div className="mt-[-25px] border-1 border-white">
                        <div className="flex text-center md:w-[590px] md:h-[360px] md:col-span-2 p-3 m-auto rounded-[20px] border-1 border-white bg-[#373A41]">
                          <StudentChart data={chartData} />

                          <div className="side">
                            {/* <button className=""> */}
                            <button
                              class="flex items-center justify-center whitespace-nowrap rounded-lg bg-gray-400 px-2 text-xs font-medium uppercase text-white "
                              type="button"
                              id="dropdownMenuButton1"
                              data-te-dropdown-toggle-ref
                              aria-expanded="false"
                              data-te-ripple-init
                              data-te-ripple-color="light"
                            >
                              Weekly
                              <span class="ml-2 w-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  class="h-5 w-5"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              </span>
                            </button>

                            <div
                              className="box w-[115px] mt-4 items-start flex-col rounded-[10px] justify-center bg-gradient-to-r from-[#A145CD] to-[#E1348B]"
                              style={{ padding: "6px 21px 4px 23px" }}
                            >
                              <h3>heading</h3>
                              <div className="flex">
                                <h2>28</h2>
                                <span className="bg-black text[5px] text-white mx-2 rounded-[4px] p">
                                  149%
                                </span>
                              </div>
                            </div>

                            <div
                              className="box mt-4 w-[115px] items-start flex-col rounded-[10px] justify-center bg-gradient-to-r from-[#A145CD] to-[#E1348B]"
                              style={{ padding: "6px 21px 4px 23px" }}
                            >
                              <h3>heading</h3>
                              <div className="flex">
                                <h2>28</h2>
                                <span className="bg-black text[5px] text-white mx-2 rounded-[4px] p">
                                  149%
                                </span>
                              </div>
                            </div>

                            <div
                              className="box w-[115px] mt-4 items-start flex-col rounded-[10px] justify-center bg-gradient-to-r from-[#A145CD] to-[#E1348B]"
                              style={{ padding: "6px 21px 4px 23px" }}
                            >
                              <h3>heading</h3>
                              <div className="flex">
                                <h2>28</h2>
                                <span className="bg-black text[5px] text-white mx-2 rounded-[4px] p">
                                  149%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* //under  */}

            <div className="flex max-[963px]:flex-wrap ml-12 justify-start mx-auto m-5  md:mt-0 text-white ">
              <div className="lg:pr-4 max-[963px]:w-[98%] ">
                <div className="lg:flex gap-3 justify-around mt-10 mb-5">
                  <div className="w-[602px] h-[240px] p-6 border border-gray-200 rounded-[36px] bg-[#373A41] shadow text-white">
                    {/* //content */}
                    <h3 className="text-center text-lg" >Certificates</h3>
                    <div className="list flex justify-around my-2">
                      <input type="radio" name="" id="" />
                      <span>
                         user interface design
                        </span>

                        <button className="bg-[#E1348B] px-4 py-2 rounded-md text-sm  flex items-center justify-center">
                          View Certificate</button>
                    </div>

                    <div className="list flex justify-around my-2">
                      <input type="radio" name="" id="" />
                      <span>
                         user interface design
                        </span>

                        <button className="bg-[#E1348B] px-4 py-2 rounded-md text-sm  flex items-center justify-center">
                          View Certificate</button>
                    </div>

                    <div className="list flex justify-around my-2">
                      <input type="radio" name="" id="" />
                      <span>
                         user interface design
                        </span>

                        <button className="bg-[#E1348B] px-4 py-2 rounded-md text-sm  flex items-center justify-center">
                          View Certificate</button>
                    </div>

                    <div className="list flex justify-around my-2">
                      <input type="radio" name="" id="" />
                      <span>
                         user interface design
                        </span>

                        <button className="bg-[#E1348B] px-4 py-2 rounded-md text-sm  flex items-center justify-center">
                          View Certificate</button>
                    </div>
                  </div>
                  <div className="flex ml-5">
                    <div className="w-[250px] h-[240px] mx-2 ml-3 p-6 border border-gray-200 rounded-[36px] bg-[#373A41] shadow text-white">

                      <h2 className="text-center">Subscription</h2>
                      {/* content */}

                      <div className="py border-l-2 border-[#E1348B] mb-2">
                          <div className="flex justify-around">
                            <div>
                              <p className="text-white text-[12px]">
                                After Effects 
                              </p>
                            </div>
                            <button className="bg-[#E1348B] rounded-md text-sm  flex items-center justify-center text-[12px]">
                          Active</button>                            
                          </div>
                        </div>
                    </div>
                    <div className="w-[250px] h-[240px] p-6 border border-gray-200 rounded-[36px] bg-[#373A41] shadow text-white">
                      {/* //content */}
                    
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default withAuth(MentorProfile, "/meta/signup");
