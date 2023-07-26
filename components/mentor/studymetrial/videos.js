import MentorSidebar from '@/components/common/sidebar/mentor';
import MentorTopbar from '@/components/common/navbar/mentortopbar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

function Videos() {
  const router = useRouter();
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }
  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }
    // const unsubscribe = onAuthStateChanged(auth, async (user) => {
    //   if (user) {
    //     user.emailVerified = true;
    //     const value = await callUserById(user.uid);
    //     setVerified(value.user.verified);
    //   }
    // });

    // return () => unsubscribe(); // Cleanup the listener
  }, [isMediumScreen]);

  return (
    <div>
      <div className='flex justify-center items-center  md:items-start md:ml-10   flex-col  gap-y-5 m-5'>
        <div className=' ml-3'>Module 1</div>

        <div className=' flex  flex-col items-center md:flex-row gap-5'>
          <div>
            <div className='flex justify-between items-center'>
              <div className='m-2 p-3 border rounded-2xl bg-gradient-to-r from-[#673CAF] to-[#DA2E8B] h-32 w-48 flex flex-col '>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  class='w-10 h-10 mb-2'>
                  <polygon points='23 7 16 12 23 17 23 7'></polygon>
                  <rect x='1' y='5' width='15' height='14' rx='2' ry='2'></rect>
                </svg>

                <div>
                  <h1
                    className='text-white text-base font-medium mb-2 '
                    onClick={() => setSelectedCard('Video')}>
                    Introduction c++
                  </h1>
                  <div className=' flex flex-row  justify-between gap-3'>
                    <p className='text-white text-sm '>aditya</p>
                    <div className='text-sm text-white pr-2 space-y-6'>
                      20/11/2000
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=' flex flex-col gap-6 mt-4 items-center md:items-start'>
            <div>Title</div>
            <div className=' w-[80%]'>
              Lesson 1: Learn the basics of C++ and how to write your first
              code...Lesson 1: Learn the basics of C++ and how to write your
              first code...
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}

export default Videos;
