// need to implement backend logic including sidebar and navbar
// side bar is dummy need to change side bar  front data w.r.t  admin
import AdminTopbar from '@/components/common/navbar/admintopbar';
import Sidebar from '@/components/common/sidebar/admin';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
// #DD4A94 #B26ED3
// #A145CD
const Signupsuccess = () => {
  // code to check if verified to visit this page or not
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    setIsAdmin(isAdmin);
    if (!isAdmin) {
      router.push('/');
    }
  }, [router]);

  if (!isAdmin) {
    return null;
  }
  return (
    <div>
      <div className='flex h-full md:h-screen  md:rounded-tl-[50px]  '>
        <div className='lg:col-span-1 hidden lg:grid'>
          <Sidebar />
        </div>
        <div className='w-full h-[92vh] md:h-screen bg-[#1E1E1E]  md:rounded-tl-[50px]   space-y-4  '>
          <AdminTopbar heading={''} />
          {/* text */}
          <div className='w-full bg-[#1E1E1E]  space-y-5 pt-[80px] '>
            <div className='flex flex-col justify-center h-full'>
              <div className='flex align-middle justify-center  '>
                <div className='text-center space-y-5 '>
                  <div className=' space-y-4 '>
                    <h1 className='text-[#A145CD] md:text-4xl text-2xl  '>
                      Welcome Back, Raviraj !{' '}
                    </h1>
                    <p className='text-white'>Select what you want to do</p>
                  </div>

                  <div className='m-auto w-full pt-10 pb-5'>
                    {/* <div className=" absolute inset-0 rounded-[100%] filter blur-3xl bg-[#B26ED3]  opacity-75 w-[50%] m-auto"></div> */}

                    <div className='md:flex grid  grid-cols-2    text-center justify-around gap-10   m-auto text-sm text-white  '>
                      <div
                        className='bg-[#B26ED3] md:w-[150px] w-[120px] md:h-[200px] h-[150px] rounded m-auto p-2 space-y-2 hover:border-[2px] cursor-pointer'
                        onClick={() => router.push('addcourse')}>
                        <div className='h-full flex flex-col justify-around'>
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
                        </div>
                      </div>
                      <div
                        className='bg-[#B26ED3] md:w-[150px] w-[120px] md:h-[200px] h-[150px] rounded m-auto p-2 space-y-2 flex flex-col justify-around hover:border-[2px] cursor-pointer'
                        onClick={() => router.replace('students')}>
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
                        onClick={() => router.push('addTeam')}>
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

export default Signupsuccess;
