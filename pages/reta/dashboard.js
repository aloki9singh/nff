// need to implement backend logic including sidebar and navbar
// side bar is dummy need to change side bar  front data w.r.t  admin
import AdminTopbar from '@/components/common/navbar/admintopbar';
import Sidebar from '@/components/common/sidebar/admin';
import { useAuthContext } from '@/lib/context/AuthContext';

import { removeDomainFromEmail } from '@/lib/exportablefunctions';
import withAdminAuthorization from '@/lib/HOC/withAdminAuthorization';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
// #DD4A94 #B26ED3
// #A145CD

const Dashboard = () => {


  // // code to check if verified to visit this page or not
  // const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);
  const {userProfile} =useAuthContext()
  useEffect(() => {
    // const isAdmin = localStorage.getItem('isAdmin');
    // setIsAdmin(isAdmin);
    // if (!isAdmin) {
    //   router.push('/');
    // }
  }, [router]);

  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }
  }, [isMediumScreen]);

  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }

  // if (!isAdmin) {
  //   return null;
  // }

  // console.log(userProfile)
  return (
    <div>
      <div className='flex h-full md:h-screen  md:rounded-tl-[50px]  '>
 {/* First Sidebar - Visible on Mobile */}
          {isMobileScreen && (
            <div
              className={`fixed right-0 ${
                SideBarState ? "block" : "hidden"
              } w-[281px] h-screen bg-[#25262C]  rounded-l-[40px] z-10`}
            >
              <Sidebar toggleSideBar={toggleSideBar} />
            </div>
          )}

          {/* Second Sidebar - Visible on Desktop */}
          {!isMobileScreen && (
            <div className={`md:block  hidden w-[221px] bg-[#141518] z-10`}>
              <Sidebar toggleSideBar={toggleSideBar} />
            </div>
          )}
        <div className='w-full h-[92vh] md:h-screen bg-[#1E1E1E]  md:rounded-tl-[50px]   space-y-4  '>
          <AdminTopbar heading={'Dashboard'} toggleSideBar={toggleSideBar} />
          {/* text */}
          <div className='w-full bg-[#1E1E1E]  space-y-5 pt-10 '>
            <div className='flex flex-col justify-center h-full'>
              <div className='flex align-middle justify-center  '>
                <div className='text-center space-y-5 '>
                  <div className=' space-y-4 '>
                    <h1 className='text-[#A145CD] md:text-4xl text-2xl  '>
                      Welcome Back, {removeDomainFromEmail(userProfile?.email)}!{' '}
                    </h1>
                    <p className='text-white'>Select what you want to do</p>
                  </div>

                  <div className='m-auto w-full pt-10 pb-5'>
                    {/* <div className=" absolute inset-0 rounded-[100%] filter blur-3xl bg-[#B26ED3]  opacity-75 w-[50%] m-auto"></div> */}

                    <div className='md:flex grid  grid-cols-2    text-center justify-around gap-10   m-auto text-sm text-white  '>
                      <div
                        className='bg-[#B26ED3] md:w-[150px] w-[120px] md:h-[200px] h-[150px] rounded m-auto p-2 space-y-2 hover:border-[2px] cursor-pointer'
                        >
                        <Link href={'/reta/modifyCourses'} className='h-full flex flex-col justify-around'>
                          <div className='flex justify-center align-middle'>
                            <Image
                              alt='Icon'
                              src='/pagesgraphics/admin/welcome/FolderSimplePlus.svg'
                              width={100}
                              height={100}
                              className='w-[50%]'
                            />
                          </div>
                          <div className='flex align-bottom'>
                            Add/Modify Courses
                          </div>
                        </Link>
                      </div>
                      <div
                        className='bg-[#B26ED3] md:w-[150px] w-[120px] md:h-[200px] h-[150px] rounded m-auto p-2 space-y-2 flex flex-col justify-around hover:border-[2px] cursor-pointer'
                        onClick={() => router.push('mentors')}>
                        <div className='flex justify-center align-middle'>
                          <Image
                            alt='Icon'
                            src='/pagesgraphics/admin/welcome/studentsandmentors.svg'
                            width={100}
                            height={100}
                            className='w-[50%]'
                          />
                        </div>
                        <div>View Students/ Mentors</div>
                      </div>
                      <div
                        className='bg-[#B26ED3] md:w-[150px] w-[120px] md:h-[200px] h-[150px] rounded m-auto p-2 space-y-2 flex flex-col justify-around hover:border-[2px]  cursor-pointer'
                        onClick={() => router.push('addTeam')}>
                        <div className='flex justify-center align-middle'>
                          <Image
                            alt='Icon'
                            src='/pagesgraphics/admin/welcome/UsersThree.svg'
                            width={100}
                            height={100}
                            className='w-[50%]'
                          />
                        </div>
                        <div>Create Team</div>
                      </div>
                      <div
                        className='bg-[#B26ED3] md:w-[150px] w-[120px] md:h-[200px] h-[150px] rounded m-auto p-2 space-y-2 flex flex-col justify-around hover:border-[2px] cursor-pointer'
                        onClick={() => router.push('addteam')}>
                        <div className='flex justify-center align-middle'>
                          <Image
                            alt='Icon'
                            src='/pagesgraphics/admin/welcome/UserList.svg'
                            width={100}
                            height={100}
                            className='w-[50%]'
                          />
                        </div>
                        <div>Add/View Team</div>
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
  );
};

export default withAdminAuthorization(Dashboard);
//  export default (dashboard);
