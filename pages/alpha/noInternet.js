import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Dashboardnav from '@/components/common/navbar/dashboardnav';
import { useMediaQuery } from 'react-responsive';
import CourseoverviewSidebar from '@/components/common/sidebar/courseoverview';
import { useRouter } from 'next/router';

const NoInternetPage = () => {
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const router = useRouter()
  const [showSideBar, setShowSideBar] = useState(false);
  const [sideBarState, setSideBarState] = useState(false);

  useEffect(() => {
    if (isMobileScreen) {
      setSideBarState(false);
    }
  }, [isMobileScreen]);

  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    setSideBarState(!sideBarState); // Corrected setting sideBarState
  }

  return (
    <div
      className={`flex flex-col ${
        isMobileScreen ? 'h-screen' : 'min-h-screen'
      }`}>
      <Dashboardnav heading='No internet' toggleSideBar={toggleSideBar} />
      {isMobileScreen && (
        <div
          className={`fixed right-0 ${
            sideBarState ? 'block' : 'hidden'
          } w-[281px] h-screen bg-[#25262C] md:rounded-l-[40px] z-10`}>
          <CourseoverviewSidebar toggleSideBar={toggleSideBar} />
        </div>
      )}

      <div className='flex flex-1 md:px-10 justify-center items-center'>
        <div
          className={`bg-gradient-to-br p-5 md:mt-4 md:mb-5 from-[#A145CD] to-[#E1348B] w-full md:w-[90%] ${
            isMobileScreen ? 'h-[95%]' : 'h-[100%] max-h-[100vh]'
          } flex flex-col justify-center items-center rounded-lg p-1`}>
          <div className='flex h-[90%] w-[90%] items-center justify-center mb-5'>
            <Image
              src='/pagesgraphics/common/errors/nointernet.svg'
              alt='no internet'
              height={200}
              width={200}
              className=' w-[100%] h-[100%]'
            />
          </div>

          <div className='text-white text-2xl mt-5 mb-5 text-center'>
            Page Not found
          </div>

          <div className='flex flex-col md:flex-row justify-center gap-3'>
            {/* <div className='w-full px-5 md:w-auto h-10 flex items-center justify-center bg-transparent border-2 rounded-lg text-white mb-3 md:mb-0'>
              Refresh
            </div> */}

            <div className='w-full cursor-pointer px-10 py-5 md:w-auto h-10 flex items-center justify-center bg-[#A145CD] rounded-lg text-white' onClick={()=>{
              router.push("/")
            }}>
              Back to Home
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoInternetPage;
