import { useState } from 'react';
import MentorSidebar from '@/components/common/sidebar/mentor';
import MentorTopbar from '@/components/common/navbar/mentortopbar';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { auth } from '@/config/firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import { callUserById } from '@/lib/exportablefunctions';
import { useMediaQuery } from 'react-responsive';
import { collection, getDocs, query, updateDoc, where, doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseconfig';

function Homework() {
    //set Below two for marked homework
    const router = useRouter()
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
    const [maxMarks, setMaxMarks] = useState()
    const [course, setCourse] = useState()
    const { id, courseid, submitid } = router.query

    function toggleSideBar() {
        setShowSideBar(!showSideBar);
        sendSideBarState(showSideBar);
    }

    const getMarks = async () => {
        const courseRef = doc(db, "courses", courseid);
        const courseInfo = await getDoc(courseRef);
        if (courseInfo.exists()) {
            try {
                const assignmentRef = collection(courseRef, "assignment");
                const q = query(assignmentRef, where("id", "==", id));
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map((doc) => {
                    return doc.data().files.filter((data) => {
                        return data.submittedby == submitid;
                    });
                })
                setComment(data && data[0][0].comment)
                setMarks(data && data[0][0].obtMarks)
                setTeacher(data && data[0][0].checkedBy)
                const assignmentDoc = querySnapshot.docs[0];
                if (!assignmentDoc) {
                    console.log("Assignment not found.");
                    return;
                }
                const assignmentData = assignmentDoc.data();
                setMaxMarks(assignmentData.marks)
            } catch (err) {
                alert("Error occurred", err);
            }
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (marks > maxMarks) {
            alert("Enter valid Marks")
        }
        else if (!marks) {
            alert("Enter marks")
        }
        else if (!teacher) {
            alert("Enter valid Teacher Name")
        }
        else {
            const courseRef = doc(db, "courses", courseid);
            const courseInfo = await getDoc(courseRef);
            if (courseInfo.exists()) {
                try {
                    const assignmentRef = collection(courseRef, "assignment");
                    const q = query(assignmentRef, where("id", "==", id));
                    const querySnapshot = await getDocs(q);

                    const assignmentDoc = querySnapshot.docs[0];
                    if (!assignmentDoc) {
                        console.log("Assignment not found.");
                        return;
                    }
                    const assignmentData = assignmentDoc.data();
                    setMaxMarks(assignmentData.marks)
                    const updatedFiles = assignmentData.files.map((data) => {
                        if (data.submittedby === submitid) {
                            return {
                                ...data,
                                obtMarks: marks,
                                comment: comment ? comment : "No comment",
                                checkedBy: teacher,
                                checked: true
                            };
                        }
                        return data;
                    });

                    // Update the specific assignment document using the update method
                    await updateDoc(doc(assignmentRef, assignmentDoc.id), { files: updatedFiles });
                    alert("Assignment Checked");
                    router.push("/meta/homework")
                } catch (err) {
                    alert("Error occurred", err);
                }
            } else {
                console.log("Course not found.");
            }
        }
    };

    useEffect(() => {
        if (isMediumScreen) {
            sendSideBarState(false);
        }
        getMarks()
        const unsubscribe = onAuthStateChanged(auth, async user => {
            if (user) {
                user.emailVerified = true;
                const value = await callUserById(user.uid);
                setVerified(value.user?.verified);
            }
        });
        return () => unsubscribe(); // Cleanup the listener
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMediumScreen, maxMarks]);



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
                                            <input type="text" value={maxMarks} disbaled name="total" id="total" className='border-white bg-transparent m-2 w-[25%]' />
                                        </div>
                                        <div className='flex items-center'>
                                            <div>
                                                Given marks:
                                            </div>
                                            <input type="number" className='border-white w-[25%] ml-2 max-[694px]:ml-10 bg-transparent' value={marks} onChange={(e) => { e.preventDefault(); setMarks(e.target.value) }} />
                                        </div>
                                    </div>
                                    <div className="w-[95%] text-white mx-auto h-[127px] m-4 rounded-[10px]">
                                        <input type="text" placeholder='Add Comment' value={comment} onChange={(e) => { e.preventDefault(); setComment(e.target.value) }} className='w-full h-[127px] bg-[#474A50] rounded-[10px]  placeholder:text-center' />
                                    </div>
                                    <div className='w-[95%] max-[500px]:flex-col mx-auto flex md:items-center text-white justify-end'>
                                        <div>Teacher Name:</div>
                                        <input type="text" placeholder='Type' value={teacher} onChange={(e) => { e.preventDefault(); setTeacher(e.target.value) }} className=' bg-[#474A50] rounded-[10px] ml-2' />
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
