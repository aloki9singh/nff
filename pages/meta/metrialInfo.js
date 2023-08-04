import MentorSidebar from '@/components/common/sidebar/mentor';
import MentorTopbar from '@/components/common/navbar/mentortopbar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Layout from '@/components/common/Layout/Layout';

function MetrialInfo() {
  const router = useRouter();
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);

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
    <Layout pageTitle="Material Info">
    <div className='flex w-full'>
      <div className='h-full w-full text-base bg-[#2E3036] '>
        <div className='flex w-full'>
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
            <div className={`md:block hidden w-[221px] bg-[#141518] z-10`}>
              <MentorSidebar toggleSideBar={toggleSideBar} />
            </div>
          )}

          <div className='flex-grow'>
            <div className='flex md:pt-0 pt-2 justify-between md:bg-[#2E3036] bg-[#141518] top-0 md:border-b-[1px] border-b-[2px] border-[#717378]'>
              <MentorTopbar
                heading='Study Material'
                toggleSideBar={toggleSideBar}
              />
            </div>

            <div className=' w-full  h-full pb-10 mt-20  bg-[#2D2E35] text-white grow flex items-center justify-center '>
              <div className='w-[90%] flex md:bg-[#373A41] rounded-[30px] h-full  '>
                <div className='w-full  flex flex-col'>
                  <div>

                  <div className=' m-8 ml-12 '>Introduction of c++</div>


                  </div>
                  <div className=' border-2 border-[#5F6065] w-full '></div>
                  <div>
                    <div className='flex justify-center md:ml-10  flex-wrap md:grid md:gap-x-20 md:gap-y-5 lg:grid-cols-3 md:grid-cols-3 gap-y-5 m-5'>
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
                            class='w-16 h-16'>
                            <path d='M14 3v4a1 1 0 0 0 1 1h4'></path>
                            <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8l6 6v10a2 2 0 0 1-2 2h-4'></path>
                          </svg>

                          <div>
                            <h1 className='text-white text-base font-medium '>
                              20 pdf
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

                      <div className='flex justify-between items-center'>
                        <div className=' m-2 p-3 border rounded-2xl bg-gradient-to-r from-[#673CAF] to-[#DA2E8B] h-32 w-48 flex flex-col '>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            class='w-16 h-16 '>
                            <circle cx='12' cy='5' r='3'></circle>
                            <circle cx='12' cy='19' r='3'></circle>
                            <line x1='12' y1='6' x2='12' y2='16'></line>
                          </svg>

                          <div>
                            <h1 className='text-white text-base font-medium '>
                              20 link
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
                            class='w-16 h-16'>
                            <polygon points='23 7 16 12 23 17 23 7'></polygon>
                            <rect
                              x='1'
                              y='5'
                              width='15'
                              height='14'
                              rx='2'
                              ry='2'></rect>
                          </svg>

                          <div>
                            <h1 className='text-white text-base font-medium '>
                              20 video
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}

export default MetrialInfo;
