import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Dashboardnav from '@/components/common/navbar/dashboardnav';
import { useMediaQuery } from 'react-responsive';
import CourseoverviewSidebar from '@/components/common/sidebar/courseoverview';

const ErrorPage = () => {
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [sideBarState, setSideBarState] = useState(false);

  useEffect(() => {
    if (isMediumScreen) {
      setSideBarState(false);
    }
  }, [isMediumScreen]);

  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    setSideBarState(showSideBar);
  }

  return (
    <div style={{ minHeight: '100vh', overflow: 'hidden' }}>
      {isMobileScreen && (
        <div>
          <Dashboardnav heading='About Us' toggleSideBar={toggleSideBar} />
          <div
            className={`fixed right-0 ${
              sideBarState ? 'block' : 'hidden'
            } w-[281px] h-screen bg-[#25262C]  rounded-l-[40px] z-10`}>
            <CourseoverviewSidebar toggleSideBar={toggleSideBar} />
          </div>
        </div>
      )}

      <div className='  md:px-10 flex md:justify-center md:items-center h-screen'>
        <div className=' bg-[#455A64]  w-full md:w-[90%] h-[90%] max-h-[90vh] flex flex-col justify-center items-center rounded-lg p-1'>
          <div className='flex items-center justify-center mb-5'>
            <Image
              src='/pagesgraphics/common/errors/404.svg'
              alt='404'
              height={500}
              width={500}
            />
          </div>

          <div className='text-white text-2xl  mt-5 mb-5  text-center'>
            No Internet connection
          </div>

          <div className='flex flex-col md:flex-row justify-center gap-3'>
            <div className='w-full  px-5 md:w-auto h-10 flex items-center justify-center bg-transparent border-2 rounded-lg text-white mb-3 md:mb-0'>
              Refresh
            </div>

            <div className='w-full px-10 py-5 md:w-auto h-10 flex items-center justify-center bg-[#A145CD] rounded-lg text-white'>
              Back to Home
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
