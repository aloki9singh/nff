import { useState } from "react";
// import MentorSidebar from "../components/Schedule/MentorSidebar2";
import CourseCardSmall from "../components/Courses/CourseCardSmall";
import { useRouter } from "next/router";
import { useEffect } from "react";
// import MobileNav from "../components/CalenderParts/MobileNav";
import MentorTopbar from "../components/Navbar/MentorTopbar";
import Image from "next/image";
import MentorChart from "../components/Mentor/MentorChart";
import { useSelector } from "react-redux";
import { FiEdit2 } from "react-icons/fi";
import MentorSidebar from "../components/Sidebar/MentorSidebar";
function MentorProfile() {
  const router = useRouter();
  const { data } = useSelector((state) => state.authManagerMentor);
  const chartData = [0, 10, 20, 50, 10, 5, 20, 15, 30, 10, 11, 12]; //Change this student data to show on chart, passed as prop

  //uncomment below code for verifying  !mentor
  // useEffect(() => {
  //   if (!data.verified) {
  //     router.push("/");
  //   }
  // }, []);
  // if (!data.verified) {
  //   return null; // Don't render the user if not verified
  // }
  return (
    <>
      <div className="md:h-screen h-full  text-base bg-[#15161B]">
        <div className="flex">
          <div className="lg:col-span-1 hidden lg:grid w-[261px] ">
            {" "}
            <MentorSidebar pathname={router.pathname} />
          </div>
          <div
            style={{ background: "#2E3036" }}
            className="col-span-5 lg:col-span-4 md:rounded-l-[50px] pt-2 w-full "
          >
            <MentorTopbar heading={"Profile"} />
            <hr className="hidden md:block opacity-50 mt-3 "></hr>
            <div className="text-white grow flex flex-col items-center justify-center h-fit md:pt-0 pt-14">
              {/* text */}

              <div className="   h-[120px] w-full bg-gradient-to-r from-[#A145CD] to-[#E1348B] "></div>

              <div className="w-full h-full   md:text-base text-sm  ">
                <div className=" md:mx-10 mx-5">
                  <div className="flex">
                    {" "}
                    <Image
                      src={"/ProfileGirlimg.png"}
                      alt="proImg"
                      height={100}
                      width={100}
                      className="rounded-full w-[100px] object-contain mt-[-60px]"
                    />
                    <div className="w-[100%] flex justify-between">
                      <div className="text-xl md:text-2xl ml-4 mt-[-35px]">
                        Garvit Kumar
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
            <div className="lg:grid lg:grid-cols-7   m-5  md:mt-0 text-white justify-between">
              <div className="lg:col-span-5 lg:pr-4">
                <div className="lg:flex gap-3 justify-around mt-10 mb-5">
                  <div className=" lg:w-1/4">
                    <div>
                      <div className="text-left font-semibold text-base ml-1">
                        Stats.
                      </div>
                      <div className="text-center gap-5  text-white  my-1 flex lg:block">
                        <div className="bg-gradient-to-r from-[#A145CD] to-[#E1348B] rounded-2xl   p-3 my-4 ">
                          <p className="text-sm font-semibold">4.8/5.0</p>
                          <p className="text-xs font-medium">Tutor rating</p>
                        </div>
                        <div className="bg-gradient-to-r from-[#A145CD] to-[#E1348B] rounded-2xl   p-3 my-4">
                          <p className="text-sm font-semibold">500+</p>
                          <p className="text-xs font-medium">
                            Question answered
                          </p>
                        </div>
                        <div className="bg-gradient-to-r from-[#A145CD] to-[#E1348B] rounded-2xl   p-3 my-4">
                          <p className="text-sm font-semibold">March 2023</p>
                          <p className="text-xs font-medium">
                            Material Prepared
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="text-left">
                      <div className="md:ml-1 font-semibold text-base">
                        Number of students
                      </div>
                      <div className="mt-5 md:mt-2 ">
                        <MentorChart data={chartData} />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between m-5 md:mx-0 my-2">
                    <div>Top courses</div>
                    <div>
                      <button className="border-2 p-1 text-sm">View All</button>
                    </div>
                  </div>
                  <div className="flex overflow-x-scroll scrollbar-hide gap-4">
                    <div>
                      <CourseCardSmall
                        key="1"
                        lessons="8"
                        title="Introduction to C++"
                        desc="Learn the basics of C++ programming language."
                        level="Beginner"
                        icon="/ProgrammingIcon.png"
                      />
                    </div>
                    <div>
                      <CourseCardSmall
                        key="1"
                        lessons="8"
                        title="Introduction to C++"
                        desc="Learn the basics of C++ programming language."
                        level="Beginner"
                        icon="/ProgrammingIcon.png"
                      />
                    </div>
                    <div>
                      <CourseCardSmall
                        key="1"
                        lessons="8"
                        title="Introduction to C++"
                        desc="Learn the basics of C++ programming language."
                        level="Beginner"
                        icon="/ProgrammingIcon.png"
                      />
                    </div>
                    <div>
                      <CourseCardSmall
                        key="1"
                        lessons="8"
                        title="Introduction to C++"
                        desc="Learn the basics of C++ programming language."
                        level="Beginner"
                        icon="/ProgrammingIcon.png"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="flex justify-end">
                  <div className="bg-[#373A41] rounded-[20px] pb-9 pt-3 px-4 space-y-2 md:w-[290px] mt-5 flex flex-col">
                    <div className=" text-center text-lg font-bold text-gray-500">
                      Educator highlights
                    </div>
                    <div className="text-center pt-2 pb-4 font-extralight">
                      Worked at Neatskills
                    </div>
                    <div className="flex gap-2 text-sm font-medium">
                      {" "}
                      <span>
                        <Image
                          src={"/mentorProfile/degree_icon.png"}
                          width={100}
                          height={100}
                          alt="img"
                          className="w-5"
                        />{" "}
                      </span>{" "}
                      Studied at{" "}
                      <span className="text-[#E1348B] font-black">
                        xxxxx(B.Tech.)
                      </span>
                    </div>
                    <p className="ml-7  font-extralight text-sm opacity-75">
                      Latest Result: Ashwin - 100%ile Thrice in Maths in JEE
                      Main 2021 , AIR 409 (JEE Advanced) through my Evolve
                      Batch. Many Students Scoring more than 99.5%ile in Maths.
                      Producing IITians every year.
                    </p>

                    <div className="flex gap-2 text-sm font-medium">
                      {" "}
                      <span>
                        <Image
                          src={"/mentorProfile/location_icon.png"}
                          width={100}
                          height={100}
                          alt="img"
                          className="w-4"
                        />{" "}
                      </span>{" "}
                      Lives in{" "}
                      <span className="text-[#E1348B] font-black">
                        {" "}
                        Kota, Rajasthan, India
                      </span>
                    </div>
                    <p className="ml-7  font-extralight text-sm opacity-75">
                      Unacademy Educator since 10th March, 2022
                    </p>

                    <div className="flex gap-2">
                      {" "}
                      <span>
                        <Image
                          src={"/mentorProfile/globe_icon.png"}
                          width={100}
                          height={100}
                          alt="img"
                          className="w-5"
                        />{" "}
                      </span>{" "}
                      <span className="text-sm font-medium">
                        {" "}
                        Knows Hinglish, Hindi and English
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className=" ">
          <MobileNav></MobileNav>
        </div> */}
      </div>
    </>
  );
}
export default MentorProfile;
