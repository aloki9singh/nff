import React, { useEffect, useRef, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import { db } from "@/config/firebaseconfig";

import Dashboardnav from "@/components/common/navbar/dashboardnav"

import Sidebar from "@/components/common/sidebar/sidebar";
import Image from "next/image";
import { contactFn } from "@/lib/api";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import Footer from "@/components/common/footer/footer";

const Aboutus = () => {
  
  const [mentor, setMentor] = useState([]);

  const fetchPost = async () => {
    const q = query(collection(db, "allusers"), where("role", "==", "mentor"));
    const querySnapshot = await getDocs(q);
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setMentor(newData);
    console.log(mentor);
  };

  useEffect(() => {
    fetchPost();
  }, []);

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

  const [que, setQuery] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const formData = { que, email, name, phoneNo };

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  const extractNameFromEmail = (email) => {
    const atIndex = email.indexOf("@");

    if (atIndex !== -1) {
      const name = email.substring(0, atIndex);
      return name;
    } else {
      return email;
    }
  };

  return (
    <>

      <Dashboardnav heading="About Us" />

      <div className="mt-8 md:mt-0 h-full">
        <div className="w-full h-full flex flex-col">
          <div className="flex justify-center items-center flex-col">
            <span className="text-white text-4xl mt-14">
              We&apos;re here to
            </span>
            <span className=" text-4xl mt-5 text-center bg-gradient-to-r from-[#A134CD] to-[#E1348B] bg-clip-text  text-transparent   ">
              guarantee your success
            </span>
            <div className="w-3rem md:w-[30rem] h-1 bg-white mt-2 ml-4" />
          </div>

          <div className="w-[80%] h-auto">
            <div className="relative">
              <div
                className="w-full h-[24rem] md:h-[18rem] self-start ml-10 md:ml-44 mt-11 px- p-10 rounded-lg bg-gradient-to-b from-[#A134CD] to-[#E1348B] flex  text-white  "
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 0% 100%)" }}
              >
                <span className="text-sm md:text-sm lg:text-2xl lg:px-11  ">
                  ConsultUs provides consulting services that help business
                  owners and leaders build a more valuable business. We worked
                  with their founder to build a professional, modern site that
                  follows the StoryBrand framework to clearly communicate the
                  value it adds to potential clients.
                </span>
              </div>
            </div>
            <div className="relative">
              <div
                className="absolute w-full h-[28rem] ml-10 md:ml-44  -bottom-48 rounded-lg overflow-hidden"
                style={{
                  clipPath:
                    "polygon(50% 32%, 100% 30%, 100% 100%, 0 100%, 0% 38%)",
                }}
              >
                <img
                  src="/componentsgraphics/common/aboutpage/about.png"
                  alt="random image"
                  className="w-full object-center h-[28rem] md:h-[46rem] mt-[10rem] shadow-md transform -translate-y-16 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[80%] h-auto  mt-56 ml-10 md:ml-44 mb-10">
          <span className="text-4xl  font-extrabold ml-4 text-white">Our</span>
          <span className="text-4xl  font-extrabold ml-2 bg-gradient-to-r from-[#A134CD] to-[#E1348B] text-transparent bg-clip-text">
            Mission
          </span>
          <div className=" md:w-[40rem] h-1 bg-white mt-2 ml-4" />

          <div className="flex flex-col md:flex-row p-4 ">
            <div className="text-white mb-4 md:mb-0 md:mr-[-60px]">
              unmatched service
            </div>
            <div className="text-white ml-0 md:ml-24 md:pl-20 ">
              Support corporate clients and financial investors with their
              growth strategy and international development.
            </div>
          </div>

          <div className="flex flex-col md:flex-row p-4">
            <div className="text-white mb-4 md:mb-0 md:mr-8">Specific</div>
            <div className="text-white ml-0 md:ml-24 md:pl-20 ">
              ConsultUs core expertise lies in the ability to support our
              clients in understanding, analysing and executing commercial and
              investment strategies in specific markets.
            </div>
          </div>

          <div className="flex flex-col md:flex-row p-4">
            <div className="text-white mb-4 md:mb-0 md:mr-8">Experience</div>
            <div className="text-white ml-0 md:ml-36 md:pl-2">
              Experience in working with and assisting a wide range of clients
              from international corporations to small/medium-sized businesses,
              from large corporate debt providers to mid-market private equity
              investors.
            </div>
          </div>

          <div className="flex flex-col md:flex-row p-4">
            <div className="text-white mb-4 md:mb-0 md:mr-8">Technology</div>
            <div className="text-white md:ml-36">
              The best combination of technology and people.
            </div>
          </div>
        </div>

        {/* Our mission */}
        <div className="w-[80%] h-auto mt-10 ml-10 md:ml-44 mb-10">
          <span className="text-4xl  font-extrabold ml-4 text-white">Our</span>
          <span className="text-4xl  font-extrabold ml-2 bg-gradient-to-r from-[#A134CD] to-[#E1348B] text-transparent bg-clip-text">
            Commitment
          </span>
          <div className="md:w-[40rem] h-1 bg-white mt-2 ml-4" />

          <div className="flex flex-col md:flex-row p-4">
            <div className="text-white mb-4 md:mb-0 md:mr-8">Ethics</div>
            <div className="text-white ml-0 md:ml-48">
              Ethics for ConsultUs means ensuring our customers the
              confidentiality and uniqueness of the service they are provided. A
              client must be reassured by the fact that the service provided to
              them is made-to-measure and will not be recycled for their
              competitors.
            </div>
          </div>

          <div className="flex flex-col md:flex-row p-4">
            <div className="text-white mb-4 md:mb-0 md:mr-8">Quality</div>
            <div className="text-white ml-0 md:ml-44 md:pl-1">
              ConsultUs is committed to ensuring that our advice and
              recommendations are based on the best combination of methods,
              information research, creativity and internal quality assurance.
            </div>
          </div>

          <div className="flex flex-col md:flex-row p-4">
            <div className="text-white mb-4 md:mb-0 md:mr-8">Continuity</div>
            <div className="text-white ml-0 md:ml-36 md:pl-2">
              ConsultUs considers that the continuity of relations on the long
              term with its clients is the guarantee of the satisfaction of
              these and the quality of the services provided.
            </div>
          </div>
        </div>

        {/* ourteam section */}
        {/* Our Team */}
        <div className="container mx-auto w-screen flex-grow  px-4 py-4 sm:py-16">
          <h1 className="mx-auto mb-4  px-2 text-center text-2xl lg:text-5xl font-extrabold uppercase bg-gradient-to-r from-[#A134CD] to-[#E1348B] text-transparent bg-clip-text lg:6xl">
            our successful team
          </h1>
          <div className="mx-auto w-auto  md:w-auto">
            <div className="container my-8">
              <div
                ref={scrollContainerRef}
                className="flex-no-wrap scrolling-touch mb-8 flex items-start   overflow-x-auto  hide-scrollbar"
              >
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

                {mentor &&
                  mentor.map((ment, index) => {
                    if (index < 5) {
                      return (
                        <>
                          <div className="mr-8 max-w-fit flex-none  md:pb-4">
                            <a href="#" className="space-y-4">
                              <div className="aspect-w-max aspect-h-ma">
                                <img
                                  className="rounded-lg object-cover shadow-md hover:shadow-xl"
                                  src={
                                    ment.photoURL
                                      ? ment.photoURL
                                      : "/componentsgraphics/common/aboutpage/team2.svg"
                                  }
                                  alt=""
                                  style={{ height: "28rem" }}
                                />
                              </div>
                              <h2 className="text-center mt-2 text-2xl text-white font-semibold">
                                {extractNameFromEmail(ment.displayName)}
                              </h2>
                            </a>
                          </div>
                        </>
                      );
                    }
                  })}

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
                      Eleanor Pena
                    </h2>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full mx-auto px-4 py-8 md:px-8 lg:px-16 xl:px-20">
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
                    className="py-2 md:px-3 align-start border-0 border-b border-white text-white dark:text-gray-300 focus:ring-none focus:border-none dark:bg-transparent dark:border-white dark:focus:ring-none dark:focus:border-none  bg-transparent  outline-0 w-[80%] md:w-[28rem] m-auto"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <input
                    type="email"
                    id="email"
                    className="py-2 px-3  border-0 border-b border-white   text-white dark:text-gray-300 focus:ring-none focus:border-none dark:bg-transparent dark:border-white dark:focus:ring-none dark:focus:border-none  bg-transparent outline-none w-[80%] md:w-[28rem] m-auto"
                    placeholder="Company Email"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <input
                    type="text"
                    id="phone"
                    className="py-2 px-3  border-0 border-b border-white   text-white dark:text-gray-300 focus:ring-none focus:border-none   dark:focus:ring-none  dark:bg-transparent dark:border-white dark:focus:ring-none dark:focus:border-none  bg-transparent  outline-none w-[80%] md:w-[28rem] m-auto"
                    placeholder="Phone Number"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <input
                    type="text"
                    id="title"
                    className="py-2 px-3  border-0 border-b border-white   text-white dark:text-gray-300 focus:ring-none focus:border-none   dark:focus:ring-none dark:focus:border-none dark:bg-transparent dark:border-white dark:focus:ring-none   bg-transparent  outline-none w-[80%] md:w-[28rem] m-auto"
                    placeholder="Title/Position"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <input
                    type="text"
                    id="subject"
                    className="py-2 px-3  border-0 border-b border-white  dark:text-gray-300 focus:ring-none focus:border-none da dark:focus:ring-none dark:bg-transparent dark:border-white dark:focus:ring-none dark:focus:border-none bg-transparent text-white outline-0 w-[80%] md:w-[28rem] m-auto"
                    placeholder="Subject"
                    required
                  />
                </div>
                <div className="flex justify-center items-center">
                  <button
                    type="submit"
                    className="py-3 px-8 md:px-40 text-sm font-medium text-center bg-[#E1348B] text-white rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-[80%] md:w-[28rem]"
                  >
                    Connect with us
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Aboutus;
