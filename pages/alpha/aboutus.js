import React, { useEffect, useRef, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useMediaQuery } from 'react-responsive';
import { db } from '@/config/firebaseconfig';
import Image from 'next/image';
import Dashboardnav from '@/components/common/navbar/dashboardnav';

import Sidebar from '@/components/common/sidebar/sidebar';
import { contactFn, contactFnaboutus } from '@/lib/api';
import { Carousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Footer from '@/components/common/footer/footer';
import CourseoverviewSidebar from '@/components/common/sidebar/courseoverview';
import InfoSection from '@/components/common/aboutus/infosection';
import GetInTouch from '@/components/common/aboutus/getInTouch';
import OurMissionSection from '@/components/common/aboutus/ourmission';
import OurLoveSection from '@/components/common/aboutus/ourLove';
import Layout from '@/components/common/Layout/Layout';

const Aboutus = () => {
  const [mentor, setMentor] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const q = query(
        collection(db, 'allusers'),
        where('role', '==', 'mentor')
      );
      const querySnapshot = await getDocs(q);
      const newData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setMentor(newData);
    };

    fetchPost();
  }, [mentor]);

  const scrollContainerRef = useRef(null);

  const scrollBackward = () => {
    scrollContainerRef.current.scrollBy({
      left: -200, // Adjust the scroll amount as per your requirements
      behavior: 'smooth'
    });
  };

  const scrollForward = () => {
    scrollContainerRef.current.scrollBy({
      left: 200, // Adjust the scroll amount as per your requirements
      behavior: 'smooth'
    });
  };

  const style = document.createElement('style');

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

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const formData = { title, email, name, phoneNo, subject };

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
  ];
  const clearFormFields = () => {
    setEmail('');
    setName('');
    setPhoneNo('');
    setTitle('');
    setSubject('');
  };
  const extractNameFromEmail = email => {
    const atIndex = email.indexOf('@');

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
    <Layout pageTitle="About Us">
    <div className='flex flex-col items-center'>
      <Dashboardnav heading='About Us' toggleSideBar={toggleSideBar} />
      {isMobileScreen && (
        <div
          className={`fixed right-0 ${
            SideBarState ? 'block' : 'hidden'
          } w-[281px] h-screen bg-[#25262C]  rounded-l-[40px] z-10`}>
          <CourseoverviewSidebar toggleSideBar={toggleSideBar} />
        </div>
      )}
      <div className='flex flex-col items-center mt-8 md:mt-0 '>
        <div
          className='text-center text-2xl md:text-4xl md:m-10 py-2
        space-y-4 border-b-white border-b-4'>
          <p className='text-white'>We are here to</p>
          <p className=' bg-gradient-to-r from-[#A134CD] to-[#E1348B] bg-clip-text  text-transparent   '>
            Your Skill Development Partner
          </p>
        </div>

        <InfoSection />
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

      {/* Our misson */}

      <div className='space-y-12 max-w-[1440px] mx-4 sm:mx-8 md:mx-16'>
        <OurMissionSection />

        {/* Our love */}
        <OurLoveSection />
      </div>

      {/* Our Team */}

      <div className='max-w-[1440px] w-full px-4 sm:px-8 md:px-16 my-16'>
        <h1 className='mb-4  px-2 text-center text-2xl md:text-5xl font-extrabold uppercase bg-gradient-to-r from-[#A134CD] to-[#E1348B] text-transparent bg-clip-text lg:6xl'>
          The team
        </h1>
        <div
          ref={scrollContainerRef}
          className='mb-8 flex  overflow-x-scroll  hide-scrollbar space-x-5 sm:space-x-10'>
          {mentor &&
            mentor.map((mentor, index) => {
              return (
                <a
                  key={index}
                  href='#'
                  className='flex flex-col items-center
                    shrink-0 '>
                  <Image
                    src={`${
                      mentor.photoURL
                        ? mentor.photoURL
                        : '/componentsgraphics/common/aboutpage/team2.svg'
                    }`}
                    height={100}
                    width={100}
                    className='w-[95px] sm:w-[140px] md:w-[200px]  object-cover bg-transparent rounded-xl aspect-[3/4]'
                    alt='team memebers'
                  />
                  <h2 className=' text-center mt-2 text-xs md:text-base text-white font-semibold'>
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

        <GetInTouch />
      </div>
      <Footer />
    </div>
    </Layout>
  );
};

export default Aboutus;
