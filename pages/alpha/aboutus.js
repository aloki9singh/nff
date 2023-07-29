import React, { useEffect, useRef, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useMediaQuery } from "react-responsive";
import { db } from "@/config/firebaseconfig";
import Image from "next/image";
import Dashboardnav from "@/components/common/navbar/dashboardnav";

import Sidebar from "@/components/common/sidebar/sidebar";
import { contactFn, contactFnaboutus } from "@/lib/api";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import Footer from "@/components/common/footer/footer";
import CourseoverviewSidebar from "@/components/common/sidebar/courseoverview";

const Aboutus = () => {
  const [mentor, setMentor] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const q = query(
        collection(db, "allusers"),
        where("role", "==", "mentor")
      );
      const querySnapshot = await getDocs(q);
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMentor(newData);
    };

    fetchPost();
  }, [mentor]);

  const scrollContainerRef = useRef(null);

  const scrollBackward = () => {
    scrollContainerRef.current.scrollBy({
      left: -200, // Adjust the scroll amount as per your requirements
      behavior: "smooth",
    });
  };

  const scrollForward = () => {
    scrollContainerRef.current.scrollBy({
      left: 200, // Adjust the scroll amount as per your requirements
      behavior: "smooth",
    });
  };

  const style = document.createElement("style");

  // Set the CSS code as the inner text of the <style> element
  style.innerText = `
  .hide-scrollbar {
    overflow-x: auto;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
  }

  .hide-scrollbar::-webkit-scrollbar {
    width: 0.5rem; /* Adjust as needed */
    background-color: transparent;
  }

  .hide-scrollbar::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
`;

  document.head.appendChild(style);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const formData = { title, email, name, phoneNo, subject };

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];
  const clearFormFields = () => {
    setEmail("");
    setName("");
    setPhoneNo("");
    setTitle("");
    setSubject("");
  };
  const extractNameFromEmail = (email) => {
    const atIndex = email.indexOf("@");

    if (atIndex !== -1) {
      const name = email.substring(0, atIndex);
      return name;
    } else {
      return email;
    }
  };
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);
  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }
  }, [isMediumScreen]);

  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }
  return (
    <div className="flex flex-col items-center">
      <Dashboardnav heading="About Us" toggleSideBar={toggleSideBar} />
      {isMobileScreen && (
        <div
          className={`fixed right-0 ${
            SideBarState ? "block" : "hidden"
          } w-[281px] h-screen bg-[#25262C]  rounded-l-[40px] z-10`}
        >
          <CourseoverviewSidebar toggleSideBar={toggleSideBar} />
        </div>
      )}
      <div className="flex flex-col items-center mt-8 md:mt-0 ">
        <div
          className="text-center text-2xl md:text-4xl md:m-10 py-2
        space-y-4 border-b-white border-b-4"
        >
          <p className="text-white">We are here to</p>
          <p className=" bg-gradient-to-r from-[#A134CD] to-[#E1348B] bg-clip-text  text-transparent   ">
            Your Skill Development Partner
          </p>
        </div>

        <div className="relative w-full flex flex-col items-center px-4 md:px-20 ">
          <div
            className="w-full pb-20 sm:pb-20  md:pb-32 max-w-[1440px] mt-11 px- p-10 rounded-[50px] bg-gradient-to-b from-[#A134CD] to-[#E1348B] flex  text-white"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 0% 100%)" }}
          >
            <p className="text-sm md:text-xl lg:text-2xl lg:px-11  ">
              neatskills.tech is developed and managed by Provoke Developers
              Private Limited. At the core of this, we value quality and want to
              provide everyone with the affordable way to access any skill and
              explore themselves in their own way with their own lifelong
              learning partner.
            </p>
          </div>
          <Image
            src="/componentsgraphics/common/aboutpage/about.png"
            alt="random image"
            width={900}
            height={600}
            className="w-9/12 pt-3 -translate-y-[40%]  sm:-translate-y-1/3 object-cover shadow-md rounded-lg max-w-[900px]"
          />
          {/* <div
							className="absolute
              top-full left-1/2
              rounded-lg overflow-hidden bg-red-200"
							// style={{
							// 	clipPath:
							// 		"polygon(50% 32%, 100% 30%, 100% 100%, 0 100%, 0% 38%)",
							// }}
						>
							<img
								src="/componentsgraphics/common/aboutpage/about.png"
								alt="random image"
								className="w-full object-cover shadow-md rounded-lg"
							/>
						</div> */}
        </div>
        <div className="relative">
          <div
            className="absolute w-full h-[28rem] ml-10 md:ml-44  -bottom-48 rounded-lg overflow-hidden"
            style={{
              clipPath: "polygon(50% 32%, 100% 30%, 100% 100%, 0 100%, 0% 38%)",
            }}
          >
            <Image
              src="/componentsgraphics/common/aboutpage/about.png"
              width={100}
              height={100}
              alt="random image"
              className="w-full object-cover mt-[10rem] shadow-md transform -translate-y-16 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Our misson */}
      
      <div className="space-y-12 max-w-[1440px] mx-4 sm:mx-8 md:mx-16">
        <div className="">
          <p>
            <span className="text-4xl  font-extrabold text-white">Our</span>
            <span className="text-4xl  font-extrabold ml-2 bg-gradient-to-r from-[#A134CD] to-[#E1348B] text-transparent bg-clip-text">
              Mission
            </span>
          </p>
          <div className=" md:w-[40rem] h-1 bg-white mt-2" />

          <div className="flex flex-col md:flex-row py-4 ">
            <p className="text-white mb-4 md:mb-0 md:w-[240px] lg:w-[370px]  shrink-0">
              We believe in
            </p>
            <p className=" text-white ">Affordability</p>
          </div>

          <div className="flex flex-col md:flex-row py-4">
            <p className="text-white mb-4 md:mb-0 md:w-[240px] lg:w-[370px]  shrink-0">
              Quality
            </p>
            <p className="text-white ">Skills</p>
          </div>

          <div className="flex flex-col md:flex-row py-4">
            <p className="text-white mb-4 md:mb-0 md:w-[240px] lg:w-[370px]  shrink-0">
              Why We?
            </p>
            <p className="text-white">We love to do stuffs for everyone</p>
          </div>

          <div className="flex flex-col md:flex-row py-4">
            <p className="text-white mb-4 md:mb-0 md:w-[240px] lg:w-[370px]  shrink-0">
              Provoke Developers Private Limited?
            </p>
            <p className="text-white ">The parent company of neatskills.tech</p>
          </div>
        </div>

        {/* Our commitmnetn */}
        <div className="">
          <span className="text-4xl  font-extrabold text-white">Our</span>
          <span className="text-4xl  font-extrabold ml-2 bg-gradient-to-r from-[#A134CD] to-[#E1348B] text-transparent bg-clip-text">
            Love
          </span>
          <div className="md:w-[40rem] h-1 bg-white mt-2 " />

          <div className="flex flex-col md:flex-row py-4">
            <p className="text-white mb-4 md:mb-0 md:w-[240px] lg:w-[370px]  shrink-0">
              & Support
            </p>
            <p className="text-white">
              We love you as much you do and want to stand and be with you
              unconditially.
            </p>
          </div>

          <div className="flex flex-col md:flex-row py-4">
            <p className="text-white mb-4 md:mb-0 md:w-[240px] lg:w-[370px]  shrink-0">
              Care
            </p>
            <p className="text-white">
              We care for your future with skills & academics both.
            </p>
          </div>

          <div className="flex flex-col md:flex-row py-4">
            <p className="text-white mb-4 md:mb-0 md:w-[240px] lg:w-[370px]  shrink-0">
              Impact
            </p>
            <p className="text-white">
              We want to create an great impact in this world with
              neatskills.tech by Provoke Developers Private Limiited.
            </p>
          </div>
        </div>
      </div>

      {/* Our Team */}

      <div className="max-w-[1440px] w-full px-4 sm:px-8 md:px-16 my-16">
        <h1 className="mb-4  px-2 text-center text-2xl md:text-5xl font-extrabold uppercase bg-gradient-to-r from-[#A134CD] to-[#E1348B] text-transparent bg-clip-text lg:6xl">
          The team
        </h1>
        <div
          ref={scrollContainerRef}
          className="mb-8 flex  overflow-x-scroll  hide-scrollbar space-x-5 sm:space-x-10"
        >
          {mentor &&
            mentor.map((mentor, index) => {
              return (
                <a
                  key={index}
                  href="#"
                  className="flex flex-col items-center
                    shrink-0 "
                >
                  <Image
                    src={`${
                      mentor.photoURL
                        ? mentor.photoURL
                        : "/componentsgraphics/common/aboutpage/team2.svg"
                    }`}
                    height={100}
                    width={100}
                    className="w-[95px] sm:w-[140px] md:w-[200px]  object-cover bg-transparent rounded-xl aspect-[3/4]"
                    alt="team memebers"
                  />
                  <h2 className=" text-center mt-2 text-xs md:text-base text-white font-semibold">
                    {extractNameFromEmail(mentor.displayName)}
                  </h2>
                </a>
                // <>
                // 	<div className="mr-8 max-w-fit flex-none  md:pb-4">
                // 		<a href="#" className="space-y-4">
                // 			<div className="aspect-w-max aspect-h-ma">
                // 				<img
                // 					className="rounded-lg object-cover shadow-md hover:shadow-xl"
                // 					src={
                // 						ment.photoURL
                // 							? ment.photoURL
                // 							: "/componentsgraphics/common/aboutpage/team2.svg"
                // 					}
                // 					alt=""
                // 					style={{ height: "28rem" }}
                // 				/>
                // 			</div>
                // 			<h2 className="text-center mt-2 text-2xl text-white font-semibold">
                // 				{extractNameFromEmail(ment.displayName)}
                // 			</h2>
                // 		</a>
                // 	</div>
                // </>
              );
            })}

          {/* <div className='mr-8 max-w-fit flex-none rounded-lg md:pb-4'>

                  <a href='#' className='space-y-4'>
                    <div className='aspect-w-max aspect-h-ma'>
                      <img
                        className='rounded-lg object-cover shadow-md hover:shadow-xl'
                        src='/componentsgraphics/common/aboutpage/team1.svg'
                        alt=''
                      />
                    </div>
                    <h2 className='text-center mt-2 text-2xl text-white font-semibold'>
                      Jenny Wilson
                    </h2>
                  </a>
                </div>

                <div className='mr-8 max-w-fit flex-none   md:pb-4'>
                  <a href='#' className='space-y-4'>
                    <div className='aspect-w-max aspect-h-ma'>
                      <img
                        className='rounded-lg object-cover shadow-md hover:shadow-xl'
                        src='/componentsgraphics/common/aboutpage/team2.svg'
                        alt=''
                      />
                    </div>
                    <h2 className='text-center mt-2 text-2xl text-white font-semibold'>
                      Eleanor Pena
                    </h2>
                  </a>
                </div>

                <div className='mr-8 max-w-fit flex-none   md:pb-4'>
                  <a href='#' className='space-y-4'>
                    <div className='aspect-w-max aspect-h-ma'>
                      <img
                        className='rounded-lg object-cover shadow-md hover:shadow-xl'
                        src='/componentsgraphics/common/aboutpage/team3.svg'
                        alt=''
                      />
                    </div>
                    <h2 className='text-center mt-2 text-2xl text-white font-semibold'>
                      Robert Fox{' '}
                    </h2>
                  </a>
                </div>

                <div className='mr-8 max-w-fit flex-none   md:pb-4'>
                  <a href='#' className='space-y-4'>
                    <div className='aspect-w-max aspect-h-ma'>
                      <img
                        className='rounded-lg object-cover shadow-md hover:shadow-xl'
                        src='/componentsgraphics/common/aboutpage/team1.svg'
                        alt=''
                      />
                    </div>
                    <h2 className='text-center mt-2 text-2xl text-white font-semibold'>
                      Robert Fox{' '}
                    </h2>
                  </a>
                </div> */}

          {/* <div className="mr-8 max-w-fit flex-none   md:pb-4">
								<a href="#" className="space-y-4">
									<div className="aspect-w-max aspect-h-ma">
										<img
											className="rounded-lg object-cover shadow-md hover:shadow-xl"
											src="/componentsgraphics/common/aboutpage/team3.svg"
											alt=""
										/>
									</div>
									<h2 className="text-center mt-2 text-2xl text-white font-semibold">
										Eleanor Pena
									</h2>
								</a>
							</div> */}
        </div>

        <div className=" py-8 ">
          <section className="max-w-screen-md mx-auto">
            <h2 className="mb-4 text-3xl md:text-4xl lg:text-5xl tracking-tight font-extrabold text-center bg-gradient-to-r from-[#A134CD] to-[#E1348B] text-transparent bg-clip-text">
              Get in touch
            </h2>
            <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 md:text-xl">
              We’d love to hear from you. Please fill out this form.
            </p>
            <form className="space-y-6">
              <div className="flex flex-col">
                <input
                  type="text"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  className="py-2 md:px-3 align-start border-0 border-b border-white text-white dark:text-gray-300 focus:ring-none focus:border-none dark:bg-transparent dark:border-white dark:focus:ring-none dark:focus:border-none  bg-transparent  outline-0 w-[90%] sm:w-[80%] md:w-[28rem] m-auto"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="flex flex-col">
                <input
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="py-2 px-3  border-0 border-b border-white   text-white dark:text-gray-300 focus:ring-none focus:border-none dark:bg-transparent dark:border-white dark:focus:ring-none dark:focus:border-none  bg-transparent outline-none w-[90%] sm:w-[80%] md:w-[28rem] m-auto"
                  placeholder="Company Email"
                  required
                />
              </div>
              <div className="flex flex-col">
                <input
                  type="tel"
                  maxLength={10}
                  id="phone"
                  onChange={(e) => setPhoneNo(e.target.value)}
                  className="py-2 px-3  border-0 border-b border-white   text-white dark:text-gray-300 focus:ring-none focus:border-none   dark:focus:ring-none  dark:bg-transparent dark:border-white dark:focus:ring-none dark:focus:border-none  bg-transparent  outline-none w-[90%] sm:w-[80%] md:w-[28rem] m-auto"
                  placeholder="Phone Number"
                  required
                />
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  id="title"
                  className="py-2 px-3  border-0 border-b border-white   text-white dark:text-gray-300 focus:ring-none focus:border-none   dark:focus:ring-none dark:focus:border-none dark:bg-transparent dark:border-white dark:focus:ring-none   bg-transparent  outline-none w-[90%] sm:w-[80%] md:w-[28rem] m-auto"
                  placeholder="Title/Position"
                  required
                />
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  onChange={(e) => setSubject(e.target.value)}
                  id="subject"
                  className="py-2 px-3  border-0 border-b border-white  dark:text-gray-300 focus:ring-none focus:border-none da dark:focus:ring-none dark:bg-transparent dark:border-white dark:focus:ring-none dark:focus:border-none bg-transparent text-white outline-0 w-[90%] sm:w-[80%] md:w-[28rem] m-auto"
                  placeholder="Subject"
                  required
                />
              </div>
              <div className="flex justify-center items-center">
                <button
                  onClick={(e) => {
                    contactFnaboutus(e, formData);

                    alert("Message Sent!");
                    clearFormFields();
                  }}
                  type="submit"
                  className="py-3 px-8 md:px-40 text-sm font-medium text-center bg-[#E1348B] text-white rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-[90%] sm:w-[80%] md:w-[28rem]"
                >
                  Connect with us
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Aboutus;
