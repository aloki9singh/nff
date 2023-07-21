import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { auth } from '@/config/firebaseconfig';
import { BiLogIn } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { AiOutlineArrowRight, AiOutlineSetting } from 'react-icons/ai';
import { logout } from '@/lib/exportablefunctions';
import { useAuthContext } from '@/lib/context/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { BsPersonCircle } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
const AdminSidebar = ({ toggleSideBar }) => {
  const router = useRouter();
  const { user, userProfile } = useAuthContext();
  return (
    <>
      <aside className='h-screen  md:bg-[#141518] bg-[#25262C] p-5 rounded-l-[40px] md:rounded-l-[0px]  flex flex-col justify-between '>
        <div>
          <div>
            <div>
              <Image
                src='/pagesgraphics/common/createcategory/Neatskills.svg'
                width={150}
                height={100}
                alt='logo'
                className='mb-6 md:block hidden'
              />

              <div
                className=' flex justify-end w-full md:hidden  '
                onClick={() => toggleSideBar()}>
                <div className='bg-gray-500 rounded-full p-[5px]'>
                  <RxCross2 className='text-white  text-sm' />
                </div>
              </div>
              <div className='md:hidden block p-2 text-white'>
                <Link href={'/meta/profile'}>
                  {user && userProfile && user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt='proImg'
                      height={60}
                      width={60}
                      className='inline-block relative object-cover object-center md:hidden !rounded-full border border-[#E1348B] aspect-square'
                    />
                  ) : (
                    <BsPersonCircle className='text-white text-4xl'></BsPersonCircle>
                  )}
                </Link>
                <p className='pt-2'>{user ? user.displayName : 'Anonymous'}</p>
                {userProfile && (
                  <p className='text-gray-500 text-[12px] mt-[-4px]'>
                    {/* Roll no-{userProfile.rollNo} */}  Admin
                  </p>
                )}
              </div>
            </div>
            <div className='flex flex-col h-full justify-around '>
              <ul>
                <li className='md:space-y-[16px]'>
                  <Link
                    href='/reta/dashboard'
                    className='flex items-center p-2 text-base font-normal  text-white rounded-lg  hover:bg-pin'>
                    <label className='inline-flex items-center space-x-3'>
                      <input
                        id='default-checkbox'
                        type='checkbox'
                        className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
                          router.pathname === '/reta/dashboard'
                            ? 'shadow-white'
                            : ''
                        }`}
                        style={{
                          boxShadow:
                            router.pathname === '/reta/dashboard'
                              ? '0 0 5px #A145CD'
                              : 'none'
                        }}
                      />{' '}
                      <span
                        className={`ml-3 text-[${
                          router.pathname == '/reta/dashboard' ? '#E1348B' : ''
                        }]`}>
                        Home
                      </span>
                    </label>
                  </Link>
                  <Link
                    href='/reta/modifyCourses'
                    className='flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-pin'>
                    <label className='inline-flex items-center space-x-3'>
                      <input
                        id='default-checkbox'
                        type='checkbox'
                        className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
                          router.pathname === '/reta/modifyCourses'
                            ? 'shadow-white'
                            : ''
                        }`}
                        style={{
                          boxShadow:
                            router.pathname === '/reta/modifyCourses'
                              ? '0 0 5px #A145CD'
                              : 'none'
                        }}
                      />{' '}
                      <span
                        className={`ml-3 text-[${
                          router.pathname == '/reta/modifyCourses'
                            ? '#E1348B'
                            : ''
                        }]`}>
                        Courses
                      </span>
                    </label>
                  </Link>
                  <Link
                        href='/reta/mentors'
                        className='flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-pin'>
                        <label className='inline-flex items-center space-x-3'>
                          <input
                            id='default-checkbox'
                            type='checkbox'
                            className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
                              router.pathname === '/reta/mentors'
                                ? 'shadow-white'
                                : ''
                            }`}
                            style={{
                              boxShadow:
                              router.pathname === '/reta/mentors'
                                  ? '0 0 5px #A145CD'
                                  : 'none'
                            }}
                          />{' '}
                          <span
                            className={`ml-3 text-[${
                              router.pathname == '/reta/mentors'
                                ? '#E1348B'
                                : ''
                            }]`}>
                           Students/Mentors
                          </span>
                        </label>
                      </Link>
                  <hr className='h-px  md:my-4 bg-gray-500 border-0 w-[90%] m-auto '></hr>
                 
                  {user ? (
                    ' '
                  ) : (
                    <Link
                      href='/reta/community'
                      className='flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-pin'>
                      <label className='inline-flex items-center space-x-3'>
                        <input
                          id='default-checkbox'
                          type='checkbox'
                          className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
                            router.pathname === '/reta/team'
                              ? 'shadow-white'
                              : ''
                          }`}
                          style={{
                            boxShadow:
                              router.pathname === '/reta/team'
                                ? '0 0 5px #A145CD'
                                : 'none'
                          }}
                        />{' '}
                        <span
                          className={`ml-3 text-[${
                            router.pathname == '/reta/team' ? '#E1348B' : ''
                          }]`}>
                          Team
                        </span>
                      </label>
                    </Link>
                  )}

                  {user ? (
                    <div style={{ marginTop: '0' }}>
{/* 
                      <Link
                        href='/reta/mentors'
                        className='flex items-center p-2 text-base font-normal my-4 text-white rounded-lg   hover:bg-pin'>
                        <label className='inline-flex items-center space-x-3'>
                          <input
                            id='default-checkbox'
                            type='checkbox'
                            className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
                              router.pathname === '/reta/mentors'
                                ? 'shadow-white'
                                : ''
                            }`}
                            style={{
                              boxShadow:
                                router.pathname === '/reta/mentors'
                                  ? '0 0 5px #A145CD'
                                  : 'none'
                            }}
                          />{' '}
                          <span
                            className={`ml-3 text-[${
                              router.pathname === '/reta/mentors'
                                ? '#E1348B'
                                : ''
                            }]`}>
                            View Mentors
                          </span>
                        </label>
                      </Link> */}
                      <Link
                        href='/reta/addmentor'
                        className='flex items-center p-2 text-base font-normal mb-2 text-white rounded-lg  hover:bg-pin'>
                        <label className='inline-flex items-center space-x-3'>
                          <input
                            id='default-checkbox'
                            type='checkbox'
                            className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
                              router.pathname === '/reta/addmentor'
                                ? 'shadow-white'
                                : ''
                            }`}
                            style={{
                              boxShadow:
                                router.pathname === '/reta/addmentor'
                                  ? '0 0 5px #A145CD'
                                  : 'none'
                            }}
                          />{' '}
                          <span
                            className={`ml-3 text-[${
                              router.pathname == '/reta/addmentor'
                                ? '#E1348B'
                                : ''
                            }]`}>
                            Add Mentor
                          </span>
                        </label>
                      </Link>
                      <Link
                        href=''
                        className='flex items-center p-2 text-base font-normal mb-2 text-white rounded-lg  hover:bg-pin'>
                        <label className='inline-flex items-center space-x-3'>
                          <input
                            id='default-checkbox'
                            type='checkbox'
                            className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
                              router.pathname === '/reta/checkclass'
                                ? 'shadow-white'
                                : ''
                            }`}
                            style={{
                              boxShadow:
                                router.pathname === '/reta/checkclass'
                                  ? '0 0 5px #A145CD'
                                  : 'none'
                            }}
                          />{' '}
                          <span
                            className={`ml-3 text-[${
                              router.pathname == '/reta/checkclass'
                                ? '#E1348B'
                                : ''
                            }]`}>
                            View Team
                          </span>
                        </label>
                      </Link>
                      <Link
                        href='/reta/addteam'
                        className='flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-pin'>
                        <label className='inline-flex items-center space-x-3'>
                          <input
                            id='default-checkbox'
                            type='checkbox'
                            className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
                              router.pathname === '/reta/addteam'
                                ? 'shadow-white'
                                : ''
                            }`}
                            style={{
                              boxShadow:
                                router.pathname === '/reta/addteam'
                                  ? '0 0 5px #A145CD'
                                  : 'none'
                            }}
                          />{' '}
                          <span
                            className={`ml-3 text-[${
                              router.pathname == '/reta/addteam'
                                ? '#E1348B'
                                : ''
                            }]`}>
                            Add Team
                          </span>
                        </label>
                      </Link>
                  <hr className='h-px  md:my-4 bg-gray-500 border-0 w-[90%] m-auto '></hr>

                      <Link
                        href=""
                        className='flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-pin'>
                        <label className='inline-flex items-center space-x-3'>
                          <input
                            id='default-checkbox'
                            type='checkbox'
                            className={`rounded form-checkbox h-3 w-3 text-gray-600 ${
                              router.pathname === '/reta/profile'
                                ? 'shadow-white'
                                : ''
                            }`}
                            style={{
                              boxShadow:
                                router.pathname === '/reta/profile'
                                  ? '0 0 5px #A145CD'
                                  : 'none'
                            }}
                          />{' '}
                          <span
                            className={`ml-3 text-[${
                              router.pathname == '/reta/profile'
                                ? '#E1348B'
                                : ''
                            }]`}>
                            Profile
                          </span>
                        </label>
                      </Link>
                      <button
                        onClick={() => {
                          logout(router);
                        }}
                        className='flex items-center p-2 text-base font-normal text-white rounded-lg cursor-pointer hover:bg-pin md:hidden'>
                        <label className='inline-flex items-center space-x-3'>
                          <input
                            id='default-checkbox'
                            type='checkbox'
                            className='rounded form-checkbox h-3 w-3 text-gray-600'
                          />{' '}
                          <span
                            className={`ml-3 flex text-[${
                              router.pathname == '/reta/logout' ? '#E1348B' : ''
                            }]`}>
                            Logout
                          </span>
                        </label>
                      </button>

                    </div>
                  ) : (
                    <></>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div>
            {user ? (
              <div className='text-white flex-row mt-2 md:mt-5 md:block hidden'>
                <button
                  onClick={() => {
                    logout(router);
                  }}
                  className=' bg-[#373A41]  flex  justify-center  items-center w-full  rounded   pt-2.5 pb-2 text-xs font-medium uppercase leading-normal '>
                  <span>Log Out </span>
                  <BiLogIn className='text-2xl' />
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
          {user ? (
            <></>
          ) : (
            <div className=' w-full opacity-60 text-left pl-5 bottom-6 mt-40 flex flex-col gap-5'>
              <div>
                <Link href='#'>
                  <span className='text-white'>Cookies</span>
                </Link>
              </div>
              <div>
                <Link href='/alpha/privacypolicy'>
                  {' '}
                  <span className='text-white'>Privacy</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
