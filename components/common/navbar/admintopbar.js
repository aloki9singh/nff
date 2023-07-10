import { IoMdNotificationsOutline } from 'react-icons/io';
import { AiOutlineSearch } from 'react-icons/ai';
import Link from 'next/link';
import Image from 'next/image';
import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useEffect, useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';

export default function AdminTopbar({ sendSideBarState, heading }) {
  const [user, setUser] = useState({});
  const [showSideBar, setShowSideBar] = useState(false);

  function toogleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }

  let [searchstate, setsearchstate] = useState("");
  const [profileMenu, setProfileMenu] = useState(false);
  let searchfun = (e) => {
    setsearchstate(e.target.value);
  };
  

  useEffect(() => {
    // const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //   console.log(currentUser);
    //   setUser(currentUser);
    // });
    // return () => {
    //   unsubscribe();
    // };
  });

  return (
    <nav className=' pl-2 py-2 w-full md:static  fixed top-0 right-0 left-0 space-y-4 border-b-[1px] md:rounded-tl-[50px]  bg-[#2E3036]'>
      <div className=' flex  gap-y-6  justify-between'>
        <div className='flex justify-between   items-center'>
          <p className='text-white font-Inter text-2xl flex justify-start  ml-5'>
            {heading}
          </p>
        </div>
        <div className='flex items-center gap-x-4 mr-12  '>
          <div className=' xl:w-96 mr-10 '>
            <form className=' items-center hidden md:block '>
              <label htmlFor='voice-search' className='sr-only'>
                Search
              </label>
              <div className='relative w-full '>
                <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
                  <svg
                    className='w-5 h-5 text-gray-500 dark:text-gray-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      fillRule='evenodd'
                      d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                      clipRule='evenodd'></path>
                  </svg>
                </div>
                <input
                  type='text'
                  id='voice-search'
                  className='bg-[#2E3036] border border-gray-300 text-slate-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Search...'
                  required
                  value={searchstate}
                  onChange={searchfun}
                />
              </div>
            </form>
          </div>

          {user && (
            <div className='text-white flex items-center '>
              <IoMdNotificationsOutline className='text-3xl mr-2' />
              <div className='border border-white rounded-full h-12 w-12 flex justify-center items-center mr-5'>
                <Popover className=''>
                  <Popover.Button className='outline-none  pt-[6px]'>
                    <Image
                      src={
                        user.photoURL
                          ? user.photoURL
                          : '/componentsgraphics/common/navbar/schoolprofiletopbar/Male.svg'
                      }
                      alt='img'
                      height={100}
                      width={100}
                      className='rounded-full h-12 w-12 object-contain'
                    />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-200'
                    enterFrom='opacity-0 translate-y-1'
                    enterTo='opacity-100 translate-y-0'
                    leave='transition ease-in duration-150'
                    leaveFrom='opacity-100 translate-y-0'
                    leaveTo='opacity-0 translate-y-1'>
                    <Popover.Panel className='absolute mt-10 top-4 right-12 z-10 transform'>
                      <div className='h-48 w-36 text-center p-3'>
                        <div className='relative bg-[#373A41] text-white rounded-tl-lg rounded-b-lg divide-y border border-white'>
                          <Link href='/profile'>
                            <p className='p-2 '>
                              {user.photoURL ? (
                                <div className='flex gap-1 items-center'>
                                  <Image
                                    src={user.photoURL}
                                    height='35'
                                    width='35'
                                    className='rounded-full h-6 w-6'
                                    alt='img'
                                  />
                                  <div className='text-left'>
                                    <p className='text-[10px] mb-1'>
                                      {user.displayName}
                                    </p>
                                    <p className='text-[7px] -mt-1'>
                                      Class N/A
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <div className='flex gap-1 items-center'>
                                  <Image
                                    src='/download.png'
                                    height='35'
                                    width='35'
                                    className='rounded-full h-6 w-6'
                                    alt='img'
                                  />
                                  <div className='text-left'>
                                    <p className='text-[10px] mb-1'>Guest</p>
                                    <p className='text-[7px] -mt-1'>
                                      Class N/A
                                    </p>
                                  </div>
                                </div>
                              )}
                            </p>
                          </Link>

                          <div className='text-[10px] p-2'>
                            <Link href='/profile'>
                              <p className='mb-2'>Profile</p>
                            </Link>
                            <Link href='/invite'>
                              <p>Invite a Friend</p>
                            </Link>
                          </div>
                          <div className='text-[10px] p-2'>
                            <Link href='/contactUs'>
                              <p className='mb-2'>Neat Skills Help Centre</p>
                            </Link>
                            <Link href='/termsAndCondition'>
                              <p>Terms & Conditions</p>
                            </Link>
                          </div>
                          <div className='text-[10px] p-2'>
                            <Link href='/logout'>
                              <p>Logout</p>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </Popover>
              </div>
            </div>
          )}
          {!user && (
            <div className='hidden md:block ml-6'>
              <Link href={'/signup'}>
                <button
                  type='button'
                  className='inline-block justify-start items-start px-[20px] py-2.5 bg-[#404147] text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'>
                  Signup
                </button>
              </Link>
              <Link href={'/login'}>
                <button
                  type='button'
                  className='inline-block justify-start items-start px-[20px] ml-6 mr-3 py-2.5 bg-pin text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'>
                  LOGIN
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* <RxHamburgerMenu className="text-white text-3xl block md:hidden" /> */}
      </div>

      {/* <hr className="h-2 w-full mt-[-20px]" /> */}
    </nav>
  );
}
