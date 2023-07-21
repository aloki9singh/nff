import { useState } from 'react';
import MentorSidebar from '@/components/common/sidebar/mentor';
import MentorTopbar from '@/components/common/navbar/mentortopbar';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { auth, db } from '@/config/firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import { callUserById } from '@/lib/exportablefunctions';
import { useMediaQuery } from 'react-responsive';
import { getDocs } from 'firebase/firestore';
import { useAuthContext } from '@/lib/context/AuthContext';
import AssigmentForm from '@/components/mentor/assigment/assigmentForm';
import { collection, doc } from 'firebase/firestore';

function AddAssigments() {
  const [count, setCount] = useState(1);
  const [verified, setVerified] = useState();
  // Set below two for marked homework
  const [marked, setMarked] = useState(0);
  const [toBeMarked, setToBeMarked] = useState(0);
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
  const [assignedCourse, setAssignCourse] = useState([])
  const [activeElement, setActiveElement] = useState('');
  let course = []


  const handleToggleElement = element => {
    setActiveElement(element);
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
        setVerified(value?.user?.verified);
      }
    });

    return () => unsubscribe(); // Cleanup the listener
  }, [isMediumScreen]);

  // if (!verified) {
  //   return null;
  // }
  const getData = async () => {
    const courseCollection = collection(db, "courses")
    const courseInfo = await getDocs(courseCollection);
    courseInfo.forEach((doc) => {
      course.push(doc.data())
    });
    setAssignCourse(course.filter((ele)=> {return ele?.mentorid == user.uid}))
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div className='h-full text-base bg-[#2E3036] '>
        <div className='flex   flex-row-reverse'>
          {/* First Sidebar - Visible on Mobile */}
          {isMobileScreen && (
            <div
              className={`fixed right-0 ${SideBarState ? 'block' : 'hidden'
                } w-[281px] h-screen bg-[#25262C] rounded-l-[40px] z-10`}>
              <MentorSidebar toggleSideBar={toggleSideBar} />
            </div>
          )}

          <div className='flex-grow'>
            <div className='flex justify-between bg-[#2E3036] md:bg-transparent md:pt-0 pt-2 top-0 border-b-[2px] border-[#717378] md:rounded-tl-[40px]'>
              <MentorTopbar
                heading='Assginment'
                toggleSideBar={toggleSideBar}
              />
            </div>

            <div className='w-full md:ml-221px p-4 md:p-8'>
              <div className='border-2 border-[#535760] rounded-xl'>
                <div>
                  <div className=' text-white p-4 '>Add Assginment</div>

                  <div className=' w-full border-2 border-[#535760] '></div>
                </div>

                <AssigmentForm assignedCourse={assignedCourse} />
              </div>
            </div>
          </div>

          {/* Second Sidebar - Visible on Desktop */}
          {!isMobileScreen && (
            <div className='md:block hidden w-[221px] bg-[#141518] z-10'>
              <MentorSidebar toggleSideBar={toggleSideBar} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AddAssigments;
