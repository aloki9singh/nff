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
                        <div className='w-[90%] mx-auto mt-8 border rounded-[10px]'>
                            <div className='text-2xl font-semibold text-white  mt-10 ml-20'>
                                Give Feedback
                            </div>
                            <hr />
                            <form action="">
                                <div className=''>
                                    <div className='flex my-2 text-white w-[80%] mx-auto '>
                                        <div className='flex'>
                                            <div>
                                                Maximum marks:
                                            </div>
                                            <div className='w-fit'  >
                                                <input type="text" value={"10"} disbaled name="total" id="total" className='bg-transparent w-fit' />
                                            </div>
                                        </div>
                                        <div>
                                            Given marks:
                                            <input type="number" value={"20"} />
                                        </div>
                                    </div>
                                    <div className="container">
                                        <input type="text" placeholder='Add Comment' />
                                    </div>
                                    <div>
                                        <input type="text" placeholder='Type' />
                                    </div>
                                </div>
                                <div className="flex justify-end mx-8 my-8">
                                    <button className="bg-[#E1348B] px-4 py-2 rounded-md text-sm  flex items-center justify-center">
                                        Submit
                                    </button>
                                </div>
                            </form>

                        </div>


                    </div>
                </div>
            </div>
        </>
    );
}

export default Homework;
