// in mobile screen whole ui is according to figma design

import { BiBell } from 'react-icons/bi';
import { BsPersonCircle } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import StudentScheduleMainBody from '@/components/common/calendar/student/mainbody';
import { useRouter } from 'next/router';
import StudentTopbar from '@/components/common/navbar/studenttopbar';
import { auth } from '@/config/firebaseconfig';
import Sidebar from '@/components/common/sidebar/sidebar';
import Dashboardnav from '@/components/common/navbar/dashboardnav';
import CourseoverviewSidebar from '@/components/common/sidebar/courseoverview';
import { onAuthStateChanged } from 'firebase/auth';

export default function CheckClassSchedule() {
  const [count, setCount] = useState(1);
  const [user, setUser] = useState({});
  let [searchstate, setsearchstate] = useState('');
  let searchfun = (e) => {
    setsearchstate(e.target.value);
  };
  console.log(auth.currentUser);
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  if (!user) {
    return null;
  }
  return (
    <div className="h-screen w-full text-base ">
      <div className="flex lg:bg-[black] ">
        <div className="hidden lg:grid">
          <CourseoverviewSidebar pathname={router.pathname} />
        </div>
        <div
          style={{ background: '#2E3036', borderRadius: '50px 0px 0px 0px' }}
          className="lg:col-span-6 col-span-7 w-full "
        >
          <Dashboardnav heading="My Profile" />
          {/* <StudentTopbar heading={"My Profile"} /> */}

          {/* <hr className="hidden lg:block opacity-50 m-3"></hr> */}
          <div className="grid grid-cols-5 justify-center lg:h-auto mt-18">
            <div
              className="m-1 col-span-5 lg:col-span-5 lg:h-auto mb-7"
              style={{ height: '90%' }}
            >
              <div className="md:flex mt-2 md:mt-0">
                <div
                  className="w-full overflow-hidden"
                  onClick={() => setCount(1)}
                >
                  <StudentScheduleMainBody />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
