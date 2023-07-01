import Advertisement from "../components/Student/Advertisement";
import Progress from "../components/Student/Progress";
import LeaderBoardStudent from "../components/Student/LeaderBoardStudent";
import CalenderStudent from "../components/CalenderParts/CalenderStudent";
// import StudentSidebar from "../components/Sidebar/StudentSidebar";
import { useRouter } from "next/router";
import StudentTopbar from "../components/Navbar/StudentTopbar";
// import MobileNav from "../components/CalenderParts/MobileNav";
import ActiveComp from "../components/Student/ActiveComp";
import InActiveComp from "../components/Student/InActiveComp";
import { useState } from "react";
import Sidebar from "../components/Sidebar/sidebar";

const Studentdashboard = () => {
  const [active,setActive]=useState(false)
   
  var percentage = "0%";
  active ? (percentage = "75%") : (percentage = "0%"); //Control the percentage of the user here
  const tip =
    "Learning that is spread out over time drastically increases knowledge retention.";
  var user = "Guest";
  active ? (user = "Rahul") : "Guest";
  const router = useRouter();
  return (
    <>
      <div className="md:h-screen h-full  text-base md:bg-[#2E3036] md:w-full">
        <div className="flex">
          <div className="lg:col-span-1 hidden lg:grid">
            {" "}
            {/* <StudentSidebar pathname={router.pathname} /> //this is deleted by some one */}
          <Sidebar pathname={router.pathname}/>
          </div>
          <div
            style={{ background: "#2E3036" }}
            className="col-span-5 lg:col-span-4 md:rounded-l-[50px] pt-2 w-full "
          >
            <StudentTopbar heading={"My Progress"} />
            <hr className="hidden lg:block opacity-50 mt-3 "></hr>

            {/* /// */}
            <div className="md:flex gap-5 m-5 md:mt-0 mt-14   text-white">
              <div className="md:space-y-5 ">
                <Advertisement />
                {/* //welcomebar */}
                <Progress percentage={percentage} user={user.displayName} />
                 {active?<ActiveComp/>: <InActiveComp/>}
              </div>
              <div className=" ">
                <div className="md:px-2  md:w-[300px] mt-5 space-y-5 md:space-y-8">
                  <div>
                    <CalenderStudent />
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
                    {" "}
                    <LeaderBoardStudent />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" ">
          {/* <MobileNav></MobileNav> */}
        </div>
      </div>
    </>
  );
};

export default Studentdashboard;
