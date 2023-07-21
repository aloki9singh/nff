import { useState } from 'react';
import MentorSidebar from '@/components/common/sidebar/mentor';
import MentorTopbar from '@/components/common/navbar/mentortopbar';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { auth } from '@/config/firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import { callUserById } from '@/lib/exportablefunctions';
import { useMediaQuery } from 'react-responsive';

import { useAuthContext } from '@/lib/context/AuthContext';
import withMentorAuthorization from '@/lib/HOC/withMentorAuthorization.js';
import HomeWorkCard from '@/components/mentor/homework/homeworkcard';
import UploadCard from '@/components/mentor/homework/uploadcard';

function Homework() {
  //set Below two for marked homework
  const [marked, setMarked] = useState(0);
  const [toBeMarked, setToBeMarked] = useState(0);

  let [searchstate, setsearchstate] = useState('');
  const { user, userProfile } = useAuthContext();
  const router = useRouter();
  let searchfun = e => {
    setsearchstate(e.target.value);
  };
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);

  const [activeElement, setActiveElement] = useState('');

  const handleToggleElement = element => {
    setActiveElement(element);
  };

  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }
  // useEffect(() => {
  //   if (isMediumScreen) {
  //     sendSideBarState(false);
  //   }
  //   const unsubscribe = onAuthStateChanged(auth, async user => {
  //     if (user) {
  //       user.emailVerified = true;
  //       const value = await callUserById(user.uid);
  //       setVerified(value.user.verified);
  //     }
  //   });

  //   return () => unsubscribe(); // Cleanup the listener
  // }, [isMediumScreen]);

  // if (!verified) {
  //   return null;
  // }

  return (
    <>
      <div className='h-full text-base bg-[#2E3036] '>
        <div className='flex'>
          {/* First Sidebar - Visible on Mobile */}
          {isMobileScreen && (
            <div
              className={`fixed right-0 ${
                SideBarState ? 'block' : 'hidden'
              } w-[281px] h-screen bg-[#25262C]  rounded-l-[40px] z-10`}>
              <MentorSidebar toggleSideBar={toggleSideBar} />
            </div>
          )}

          {/* Second Sidebar - Visible on Desktop */}
          {!isMobileScreen && (
            <div className={`md:block  hidden w-[221px] bg-[#141518] z-10`}>
              <MentorSidebar toggleSideBar={toggleSideBar} />
            </div>
          )}

          <div className='flex-grow md:rounded-tl-[40px]'>
            <div className='flex justify-between md:bg-[#2E3036] bg-[#141518] md:pt-0 pt-2 top-0 md:border-b-[1px]  border-b-[2px] border-[#717378] md:rounded-tl-[40px]'>
              <MentorTopbar heading='Homework' toggleSideBar={toggleSideBar} />
            </div>

            <div className=' font-semibold  text-lg text-white  mt-10 ml-20'>
              Assignment
            </div>

            <div className=' w-auto mr-10 md:ml-221px p-4 md:p-8 border border-[#5F6065] ml-20 mt-11 rounded-xl  flex flex-col  mb-5'>
              <div className=' w-full h-20 text-white flex flex-row  justify-between '>
                <div className='flex ml-12 mt-5'>
                  <div className='mr-2'>class 6</div>
                  <div>Group-A</div>
                </div>

                <div className='flex ml-12 mt-5 mr-16 gap-4'>
                  <div className='flex'>
                    <div onClick={() => handleToggleElement('active')}>
                      <span
                        className={`border-b-2 ${
                          activeElement === 'active'
                            ? 'border-[#E1348B]'
                            : 'border-transparent'
                        }`}>
                        active
                      </span>
                    </div>
                    <div className='mr-2 cursor-pointer'>
                      <div className='bg-[#494c53] rounded-sm ml-2 w-6 h-6 flex items-center justify-center'>
                        1
                      </div>
                    </div>
                  </div>

                  <div className=' flex'>
                    {' '}
                    <div>
                      <span
                        className={`border-b-2 ${
                          activeElement === 'check'
                            ? 'border-[#E1348B]'
                            : 'border-transparent'
                        }`}
                        onClick={() => handleToggleElement('check')}>
                        check
                      </span>
                    </div>
                    <div className='mr-2 cursor-pointer'>
                      <div className='bg-[#494c53] rounded-sm ml-2 w-6 h-6 flex items-center justify-center'>
                        1
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div className='grid gap-4 m-5 md:grid-cols-2 lg:grid-cols-3'>

//               <div className='grid grid-cols-3 gap-4 m-5'>

                {activeElement === 'active' ? (
                  <>
                    <HomeWorkCard title='Course 1' desc='Description 1' />
                  
                    <UploadCard />
                  </>
                ) : (
                  <>
                    <HomeWorkCard title='Course 2' desc='Description 2' />

                    <UploadCard />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homework;
