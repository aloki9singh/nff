import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Dashboardnav from '@/components/common/navbar/dashboardnav';
import { useMediaQuery } from 'react-responsive';

const NoInternetPage = () => {
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [sideBarState, setSideBarState] = useState(false);

  useEffect(() => {
    if (isMobileScreen) {
      setSideBarState(false);
    }
  }, [isMobileScreen]);

  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    setSideBarState(showSideBar);
  }

  return (
    <div style={{ minHeight: '100vh', overflow: 'hidden' }}>
      {isMobileScreen && (
        <Dashboardnav heading='About Us' toggleSideBar={toggleSideBar} />
      )}

      <div className='bg-[#1E1E1E]  md:px-10 flex md:justify-center md:items-center h-screen'>
        <div className='bg-gradient-to-br from-[#A145CD] to-[#E1348B] w-full md:w-[90%] h-[90%] max-h-[90vh] flex flex-col justify-center items-center rounded-lg p-10'>
          <div className='flex items-center justify-center mb-5'>
            <Image
              src='/pagesgraphics/common/errors/nointernet.svg'
              alt='nointernet'
              height={500}
              width={500}
            />
          </div>

          <div className='text-white text-2xl  mt-5 mb-5  text-center'>
            No Internet connection
          </div>

          <div className='flex flex-col md:flex-row justify-center gap-3'>
            <div className='w-full px-5 md:w-auto h-10 flex items-center justify-center bg-transparent border-2 rounded-lg text-white mb-3 md:mb-0'>
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

export default NoInternetPage;
