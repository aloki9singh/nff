import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AdminSidebar from '@/components/common/sidebar/admin';
import AdminTopbar from '@/components/common/navbar/admintopbar';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

function AdminStudent() {
  const [count, setCount] = useState(1);
  // const { data } = useSelector((state) => state.authManagerMentor);
  const [initialcount, setinitialCount] = useState(0);
  const [gap, setGap] = useState(10);
  const [hide, setHide] = useState(true);
  const [id, setId] = useState();
  const [filterData, setFilterData] = useState();
  let [searchstate, setsearchstate] = useState();
  const router = useRouter();
  let searchfun = e => {
    setsearchstate(e.target.value);
  };
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);
  const [activeTab, setActiveTab] = useState('mentor');

  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }
  const handleTabClick = tab => {
    setActiveTab(tab);
  };

  const activeTabClass = 'w-10 h-10 bg-[#A145CD] rounded-xl';
  const tabClass = 'w-10 h-10 rounded-xl';

  function handleClick(e) {
    switch (e.currentTarget.getAttribute('name')) {
      case 'fwd':
        if (count < totalPage) {
          setCount(count + 1);
          setinitialCount(initialcount + 10);
          setGap(gap + 10);
        }
        break;

      case 'back':
        if (count > 1) {
          setCount(count - 1);
          setinitialCount(initialcount - 10);
          setGap(gap - 10);
        }
        break;

      default:
        const pageNumber = parseInt(e.currentTarget.getAttribute('name'));
        if (pageNumber >= 1 && pageNumber <= totalPage) {
          setCount(pageNumber);
          setinitialCount((pageNumber - 1) * 10);
          setGap(pageNumber * 10);
        }
        break;
    }
  }
  return (
    <>
      <div className='h-full text-base bg-[#2E3036]  '>
        <div className='flex'>
          {/* First Sidebar - Visible on Mobile */}
          {isMobileScreen && (
            <div
              className={`fixed right-0 ${
                SideBarState ? 'block' : 'hidden'
              } w-[281px] h-screen bg-[#25262C]  rounded-l-[40px] z-10`}>
              <AdminSidebar toggleSideBar={toggleSideBar} />
            </div>
          )}

          {/* Second Sidebar - Visible on Desktop */}
          {!isMobileScreen && (
            <div className={`md:block hidden w-[221px] bg-[#141518] z-10`}>
              <AdminSidebar toggleSideBar={toggleSideBar} />
            </div>
          )}

          <div className='flex-grow '>
            <div className='flex md:pt-0 pt-2 justify-between md:bg-[#2E3036] bg-[#141518] top-0 md:border-b-[1px] border-b-[2px] border-[#717378]'>
              <AdminTopbar heading='Review' toggleSideBar={toggleSideBar} />
            </div>

            <div className=' flex gap-2 mt-10'>
              <div
                className={`ml-8 md:ml-12 mt-7 font-semibold text-xl md:text-4xl text-white ${
                  activeTab === 'mentor' ? 'cursor-pointer' : ''
                }`}
                onClick={() => handleTabClick('mentor')}>
                Mentor : 199
              </div>

              <div
                className={`ml-8 md:ml-12 mt-7 font-semibold text-xl md:text-4xl text-white ${
                  activeTab === 'student' ? 'cursor-pointer' : ''
                }`}
                onClick={() => handleTabClick('student')}>
                Student : 199
              </div>
            </div>

            {/* Dropdown bar */}
            <div className='gap-5  mx-8 max-[700px]:mx-4 md:mt-0 mt-20 text-white'>
              <div className='flex flex-wrap items-center justify-between w-[100%] m-5 space-y-2'>
                <div
                  className='md:flex items-center rounded-lg gap-4 justify-around'
                  onClick={() => setActiveTab('mentor')}>
                  Total {activeTab === 'mentor' ? 'Mentors' : 'Students'}:{' '}
                  {activeTab === 'mentor' ? 199 : 198}
                </div>
                <div className='flex justify-between'>
                  <form className=' items-center hidden md:block '>
                    <label htmlFor='voice-search' className='sr-only'>
                      Search
                    </label>
                    <div className='relative'>
                      <div className='flex absolute inset-y-0 right-[10px]  items-center pointer-events-none'>
                        <svg
                          className='w-5 h-5 text-white dark:text-white'
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
                        className='bg-[#414348]  border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-[#414348] dark:border-gray-600 dark:placeholder-white placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        placeholder='Search '
                        required
                        value={searchstate}
                        onChange={searchfun}
                      />
                    </div>
                  </form>
                  <button className='bg-[#414348] w-fit h-fit flex px-8 py-2.5 max-[585px]:mx-0 max-[585px]:mr-2 items-center justify-center mx-2 rounded-xl mr-14'>
                    <span>
                      <Image
                        src='/componentsgraphics/student/courses/list/chartbaricon.svg'
                        width={20}
                        height={20}
                        alt='chart icon'
                        className='ml-1'
                      />
                    </span>
                    Filter
                  </button>
                </div>
              </div>

              {/* <div className="  md:w-5/6 ">
                <BasicDetails />
                   
                <div className="md:flex gap-5">
                  <div className="md:w-1/2">
                    <div>
                      {" "}
                      <LeaderBoardMentor />
                      <div className="bg-[#373A41] rounded-[20px] p-5 px-8 my-5 space-y-2 text-white mt-[-12px]">
                        <div className="py-2 text-center">Homework Status</div>
                        <div className="flex justify-between px-5 py-3 bg-[#2E3036] rounded-[10px]">
                          <div>To be Marked</div>
                          <div className=" border border-[#A145CD] rounded-[5px] px-1">
                            {" "}
                            29
                          </div>{" "}
                        </div>
                        <div className="flex justify-between px-5 py-3 bg-[#2E3036] rounded-[10px]">
                          <div>Marked</div>
                          <div className=" border border-[#A145CD] rounded-[5px] px-1">
                            {" "}
                            2
                          </div>{" "}
                        </div>
                      </div>
                    </div>
                    <div> </div>
                  </div>
                  <div className="md:w-1/2">
                    <div className="bg-[#373A41] rounded-[20px] pt-1">
                      {" "}
                      <CirProgress />
                    </div>
                    <div className="bg-[#373A41] rounded-[20px] mb-10 mt-[-20px] md:mt-0">
                      {" "}
                      <MentorChatWidget />
                    </div>
                  </div>
                </div>
              </div>
              <div className=" md:mt-0 mt-[-20px] ">
                <Calender />
                <div className="bg-[#373A41] rounded-[20px] md:pb-5 mt-[-20px] md:[mt-0] ">
                  <TaskList />
                </div>
              </div> */}
            </div>

            {/* table */}

            <div className='ms-[2%] me-[2%] h-[712px] bg-[#373A41] max-[700px]:mx-4 rounded-[30px] border md:text-base text-xs mx-auto mb-4 text-white'>
              <div className=''>
                <table className='w-full'>
                  <thead className='items-center border-b'>
                    <tr className='flex font-semibold justify-around p-5'>
                      <th className='w-[14.2%]'>Photo</th>

                      {activeTab === 'student' && (
                        <>
                          <th className='w-[14.2%]'>studnet Name</th>
                          <th className='w-[14.2%]'>ID</th>
                          <th className='w-[14.2%]'>class</th>
                          <th className='w-[14.2%] md:block hidden'>Group</th>
                          <th className='w-[14.2%] md:block hidden'>Status</th>
                        </>
                      )}
                      {activeTab === 'mentor' && (
                        <>
                          <th className='w-[14.2%]'>Mentor Name</th>

                          <th className='w-[14.2%]'>ID</th>
                          <th className='w-[14.2%]'>subject</th>
                          <th className='w-[14.2%] md:block hidden'>email</th>
                          <th className='w-[14.2%] md:block hidden'>Grade</th>
                        </>
                      )}
                      <th className='w-[14.2%] md:pl-10'>Profile</th>
                    </tr>
                  </thead>
                  <tbody className='flex w-[90%] h-[550px] flex-col mt-2 items-center mx-auto space-y-5'>
                    <tr className='flex items-center w-full font-medium text-xs justify-between'>
                      <td className='w-[14.2%]'>
                        <div className='flex items-center justify-center first-letter md:mr-16'>
                          <Image
                            src='/path/to/mentor-image.jpg'
                            alt='Mentor Image'
                            height={25}
                            width={25}
                            className='rounded-full h-8 object-contain'
                          />
                        </div>
                      </td>
                      <div className='md:ml-6'>
                        <td className='w-[14.2%]'>John Doe</td>
                      </div>
                      <div className='md:ml-32'>
                        <td className='w-[14.2%]'> 123456</td>
                      </div>
                      <div className='md:ml-36 md:mr-10 '>
                        <td className='w-[14.2%] text-center'> 10</td>
                      </div>
                      {activeTab === 'mentor' && (
                        <>
                          <div className='md:ml-20  '>
                            <td className='w-[14.2%] text-center md:block hidden'>
                              123@gmail.com
                            </td>
                          </div>
                          <div className='md:ml-20'>
                            <td className='w-[14.2%] mr-4 text-center text-[#E1348B] md:block hidden'>
                              Active
                            </td>
                          </div>
                        </>
                      )}
                      {activeTab === 'student' && (
                        <>
                          <div className='md:ml-32 '>
                            <td className='w-[14.2%] text-center md:block hidden'>
                              2022
                            </td>
                          </div>
                          <div className='md:ml-36 md:mr-2'>
                            <td className='w-[14.2%] mr-4 text-center text-[#E1348B] md:block hidden'>
                              A+
                            </td>
                          </div>
                        </>
                      )}
                      <div className='md:ml-36 md:mr-1'>
                        <td className='w-[14.2%] mr-2 text-right pr-[3%]'>
                          <Link href='' className='text-[#E1348B]'>
                            Profile
                          </Link>
                        </td>
                      </div>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* pagination */}
              <div className='w-60 h-10 lg:bottom-0 mx-10 my-5 flex justify-center items-center space-x-4'>
                <button
                  className='w-6 h-5 border flex justify-center items-center'
                  name='back'
                  onClick={handleClick}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-4 h-4'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z'
                    />
                  </svg>
                </button>
                <button
                  className={count == 1 ? activeTabClass : tabClass}
                  name='1'
                  onClick={handleClick}>
                  1
                </button>
                <button
                  className={count == 2 ? activeTabClass : tabClass}
                  name='2'
                  onClick={handleClick}>
                  2
                </button>
                <button
                  className={count == 3 ? activeTabClass : tabClass}
                  name='3'
                  onClick={handleClick}>
                  3
                </button>
                <button
                  className='w-6 h-5 border flex justify-center items-center'
                  name='fwd'
                  onClick={handleClick}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-4 h-4'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className=' '>{/* <MobileNav></MobileNav> */}</div>
      </div>
    </>
  );
}
export default AdminStudent;
