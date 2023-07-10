// coursecards should be made considering from the neatskills code

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import StudentTopbar from '@/components/common/navbar/studenttopbar';
import Advertisement from '@/components/student/dashboard/adbanner';
import Progress from '@/components/student/assignments/status';
import ActiveComp from '@/components/student/assignments/activecomp';
import InActiveComp from '@/components/student/assignments/inactivecomp';
import Sidebar from '@/components/common/sidebar/sidebar';
import Calendar from '@/components/common/calendar/student/calendar';
import LeaderBoardMentor from '@/components/student/dashboard/leaderboard';
import Dashboardnav from '@/components/common/navbar/dashboardnav';
import CourseoverviewSidebar from '@/components/common/sidebar/courseoverview';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebaseconfig';

const Studentdashboard = () => {
  const [active, setActive] = useState(false);
  var [user, setUser] = useState({});
  var percentage = '0%';
  active ? (percentage = '75%') : (percentage = '0%'); //Control the percentage of the user here
  const tip =
    'Learning that is spread out over time drastically increases knowledge retention.';
  // var user = "Guest";
  active ? (user = 'Rahul') : 'Guest';

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
    <>
      <div className="md:h-screen h-full text-base md:w-full">
        <div className="flex">
          <div className="lg:col-span-1 rounded-l-xl hidden lg:grid">
            {' '}
            <CourseoverviewSidebar pathname={router.pathname} />
          </div>
          <div className="col-span-5 lg:col-span-4 bg-[#2E3036] rounded-l-[50px]  w-full">
            {/* <StudentTopbar heading={"My Progress"} /> */}
            <Dashboardnav heading="My Progress" />
            {/* <hr className="hidden lg:block opacity-50 mt-3 "></hr> */}

            {/* /// */}
            <div className="md:flex gap-2 m-3 md:mt-0 mt-14 text-white">
              <div className="md:space-y-5 w-full ">
                <Advertisement />
                {/* //welcomebar */}
                <Progress percentage={percentage} user={user.displayName} />

                <div className="overflow-y-auto">
                  {active ? <ActiveComp /> : <InActiveComp />}
                </div>
              </div>
              <div className="md:px-2  mt-5 space-y-5  flex flex-col gap-4 ">
                <div>
                  <Calendar />
                </div>
                {/* //Daily tip section open */}
                <div className=" md:block  p-6 rounded-2xl bg-[#FFB8DC]">
                  <div>
                    <div className="text-white  border border-black w-20 text-center  bg-[#A145CD] py-1 mb-1 text-xs">
                      Daily Tip
                    </div>
                    <p className=" text-sm font-semibold text-[#000000]">
                      Learning that is spread out over time drastically
                      increases knowledge retention.
                    </p>
                  </div>
                </div>
                {/* //Daily tip section close */}
                <div>
                  {' '}
                  <LeaderBoardMentor />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" ">{/* <MobileNav></MobileNav> */}</div>
      </div>
    </>
  );
};

export default Studentdashboard;
