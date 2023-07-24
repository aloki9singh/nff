import { useState } from 'react';
import MentorSidebar from '@/components/common/sidebar/mentor';
import MentorTopbar from '@/components/common/navbar/mentortopbar';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { auth } from '@/config/firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import { callUserById } from '@/lib/exportablefunctions';
import { useMediaQuery } from 'react-responsive';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/firebaseconfig';

function Homework() {
    //set Below two for marked homework
    const [verified, setVerified] = useState();
    let [searchstate, setsearchstate] = useState('');

    let searchfun = e => {
        setsearchstate(e.target.value);
    };
    const isMediumScreen = useMediaQuery({ minWidth: 768 });
    const isMobileScreen = useMediaQuery({ maxWidth: 767 });
    const [showSideBar, setShowSideBar] = useState(false);
    const [SideBarState, sendSideBarState] = useState(false);
    const [comment, setComment] = useState()
    const [teacher, setTeacher] = useState()
    const [marks, setMarks] = useState()

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
        return () => unsubscribe(); // Cleanup the listener
    }, [isMediumScreen]);

    // if (!verified) {
    //   return null;
    // }
    const handleSubmit = () => {
        // logic to save the assignment feedback
        router.push("/meta/homework")
    }

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

                    <div className='flex-grow md:rounded-tl-[40px] w-full'>
                        <div className='flex justify-between md:bg-[#2E3036] bg-[#141518] md:pt-0 pt-2 top-0 md:border-b-[1px]  border-b-[2px] border-[#717378] md:rounded-tl-[40px]'>
                            <MentorTopbar heading='Homework' toggleSideBar={toggleSideBar} />
                        </div>
                        <div className='w-[90%] mx-auto mt-8 border rounded-[10px] my-4'>
                            <div className='text-2xl font-semibold text-white p-10'>
                                Give Feedback
                            </div>
                            <hr />
                            <form action="" onSubmit={handleSubmit}>
                                <div className=''>
                                    <div className='flex my-2 text-white w-[95%] p-4 mx-auto max-[705px]:flex-col'>
                                        <div className='flex items-center '>
                                            <div>
                                                Maximum marks:
                                            </div>
                                            <input type="text" value={"10"} disbaled name="total" id="total" className='border-white bg-transparent m-2 w-[25%]'/>
                                        </div>
                                        <div className='flex items-center'>
                                            <div>
                                                Given marks:
                                            </div>
                                            <input type="number" className='border-white w-[25%] ml-2 max-[694px]:ml-10 bg-transparent' value={marks} onChange={(e) => setMarks(e.target.value)} />

                                        </div>
                                    </div>
                                    <div className="w-[95%] text-white mx-auto h-[127px] m-4 rounded-[10px]">
                                        <input type="text" placeholder='Add Comment' value={comment} onChange={(e)=>setComment(e.target.value)} className='w-full h-[127px] bg-[#474A50] rounded-[10px]' />
                                    </div>
                                    <div className='w-[95%] max-[500px]:flex-col mx-auto flex md:items-center text-white justify-end'>
                                        <div>Teacher Name:</div>
                                        <input type="text" placeholder='Type' value={teacher} onChange={(e) => setTeacher(e.target.value)} className=' bg-[#474A50] rounded-[10px] ml-2' />
                                    </div>
                                </div>
                                <div className="flex justify-end mx-8 my-8">
                                    <button type="submit" className="bg-[#E1348B] text-white px-4 py-2 rounded-md text-sm  flex items-center justify-center">
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
