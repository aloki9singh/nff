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
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/firebaseconfig';

function Homework() {
    //set Below two for marked homework
    const [marked, setMarked] = useState(0);
    const [toBeMarked, setToBeMarked] = useState(0);
    const [verified, setVerified] = useState();
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
    const [dataFetched, setDataFetched] = useState(false);
    const [activeElement, setActiveElement] = useState('');
    const [activeCourse, setActive] = useState()

    const handleToggleElement = element => {
        setActiveElement(element);
    };
    const getData = async () => {
        if (!dataFetched) {
            const courseCollection = collection(db, "courses");
            const q = query(
                collection(db, "courses"),
                where("mentorid", "==", user.uid),
            );
            const courseInfo = await getDocs(q);
            const courseData = courseInfo.docs.map((doc) => doc.data());
            setActive(courseData);
            setDataFetched(true);
        }
    };
    function toggleSideBar() {
        setShowSideBar(!showSideBar);
        sendSideBarState(showSideBar);
    }
    useEffect(() => {
        if (isMediumScreen) {
            sendSideBarState(false);
        }
        const unsubscribe = onAuthStateChanged(auth, async user => {
            if (user) {
                user.emailVerified = true;
                const value = await callUserById(user.uid);
                setVerified(value.user?.verified);
            }
        });
        getData()
        return () => unsubscribe(); // Cleanup the listener
    }, [isMediumScreen, dataFetched]);

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
                            className={`fixed right-0 ${SideBarState ? 'block' : 'hidden'
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
                                                className={`border-b-2 ${activeElement === 'active'
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
                                                className={`border-b-2 ${activeElement === 'check'
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

                            <div className='grid grid-cols-3 gap-4 m-5'>
                                {activeElement === 'active' ? (
                                    <>
                                        {activeCourse && activeCourse.map((e) => {
                                            const data = e.assignment;
                                            return (
                                                data && data.map((ele, i) => {
                                                    const date = new Date(ele.date.seconds * 1000 + ele.date.nanoseconds / 1000000);
                                                    return (
                                                        <div className='cursor-pointer' onClick={() => { router.push(`/meta/homework/${e.id}`) }} key={ele.id}>
                                                            <HomeWorkCard
                                                                title={ele.title}
                                                                desc={ele.module}
                                                                date={date.toLocaleString().split(",")[0]}
                                                                banner={e.banner}
                                                                course={ele.course}
                                                            />
                                                        </div>
                                                    );
                                                })
                                            );
                                        })}
                                        <UploadCard />
                                    </>
                                ) : (
                                    <>
                                        <HomeWorkCard title='Course 2' desc='Description 2' />
                                        <HomeWorkCard title='Course 2' desc='Description 2' />
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
