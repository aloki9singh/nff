import TaskList from "@/components/mentor/dashboard/tasklist";
import Calender from "@/components/common/calendar/mentor/calendar";
import MentorChatWidget from "@/components/mentor/chat/widget";
import BasicDetails from "@/components/mentor/other/basicdetails";
import { useState } from "react";
import MentorSidebar from "@/components/common/sidebar/mentor";
import MentorTopbar from "@/components/common/navbar/mentortopbar";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { auth, db } from "@/config/firebaseconfig";
import { where, query, collection, getDocs  } from "firebase/firestore";
import LeaderBoardMentor from "@/components/mentor/dashboard/leaderboard";
import CirProgress from "@/components/mentor/other/circularprogressbar";

import { onAuthStateChanged } from "firebase/auth";
import { callUserById } from "@/lib/exportablefunctions";
import { useMediaQuery } from "react-responsive";
import withAuth from "@/lib/context/mentorcontext";
import { useAuthContext } from "@/lib/context/AuthContext";
import withMentorAuthorization from "@/lib/HOC/withMentorAuthorization.js";
import { CiEdit } from "react-icons/ci";
import DailyTip from "@/components/mentor/dashboard/DailyTip";
import Layout from "@/components/common/Layout/Layout";

function MentorDashboard() {
  const [count, setCount] = useState(1);
  const [verified, setVerified] = useState();
  //set Below two for marked homework
  const [marked, setMarked] = useState(0);
  const [toBeMarked, setToBeMarked] = useState(0);
  let [searchstate, setsearchstate] = useState("");
  const { user, userProfile } = useAuthContext();
  const router = useRouter();
  const [checked, setChecked] = useState()
  const [assignment , setAssignment] = useState()
  let searchfun = (e) => {
    setsearchstate(e.target.value);
  };
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);
  const [dataFetched, setDataFetched] = useState(false)

  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }
  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }

    const getData = async () => {
      if (!dataFetched) {
        const q = query(
          collection(db, "courses"),
          where("MentorId", "array-contains", user.uid)
        );
        const courseInfo = await getDocs(q);
        const arr = [];
        const files = []
        for (const doc of courseInfo.docs) {
          const docRef = doc.ref;
          const collectionRef = collection(docRef, "assignment");
          const querySnapshot = await getDocs(collectionRef);
          querySnapshot.docs.map((doc) => arr.push(doc.data()))
        }
        const check = []
        arr.map(ele => {
          var count = 0
          if (ele.files) {
            ele.files.map((e) => {
              if (e.checked) {
                count += 1
              }
            })
            if (count != 0 && ele.files.length == count) {
              check.push(ele)
            }
          }
        })
        setChecked(check)
        setAssignment(arr)
        setDataFetched(true);
      }
    };
    getData()

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
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

  return (
    <Layout pageTitle="Dashboard">
      <div className="h-full text-base bg-[#2E3036] ">
        <div className="flex">
          {/* First Sidebar - Visible on Mobile */}
          {isMobileScreen && (
            <div
              className={`fixed right-0 ${
                SideBarState ? "block" : "hidden"
              } w-[281px] h-screen bg-[#25262C]  rounded-l-[40px] z-10`}
            >
              <MentorSidebar toggleSideBar={toggleSideBar} />
            </div>
          )}

          {/* Second Sidebar - Visible on Desktop */}
          {!isMobileScreen && (
            <div className={`md:block  hidden w-[221px] bg-[#141518] z-10`}>
              <MentorSidebar toggleSideBar={toggleSideBar} />
            </div>
          )}

          <div className="flex-grow md:rounded-tl-[40px]">
            <div className="flex justify-between md:bg-[#2E3036] bg-[#141518] md:pt-0 pt-2 top-0 md:border-b-[1px]  border-b-[2px] border-[#717378] md:rounded-tl-[40px]">
              <MentorTopbar
                heading="My Progress"
                toggleSideBar={toggleSideBar}
              />
            </div>

            <div className="md:flex gap-5 m-5 md:mb-0 md:mt-0 ">
              <div className="md:w-5/6 ">
                <BasicDetails checked={checked && checked.length}/>

                <div className="md:flex gap-5">
                  <div className="md:w-1/2">
                    <div>
                      <LeaderBoardMentor data={[]} />
                      <div className="bg-[#373A41] rounded-[20px] p-5 px-8 my-5 space-y-2 text-white mt-[-12px]">
                        <div className="py-2 text-center">Homework Status</div>
                        <div className="flex justify-between px-5 py-3 bg-[#2E3036] rounded-[10px]">
                          <div>To be Marked</div>
                          <div className="border border-[#A145CD] rounded-[5px] px-1">
                            {checked && assignment && assignment.length - checked.length}
                          </div>
                        </div>
                        <div className="flex justify-between px-5 py-3 bg-[#2E3036] rounded-[10px]">
                          <div>Marked</div>
                          <div className="border border-[#A145CD] rounded-[5px] px-1">
                            {checked && checked.length}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <div className="bg-[#373A41] rounded-[20px] pt-1">
                      <CirProgress percentage={0} />
                    </div>
                   
                    <DailyTip/>
                  </div>
                </div>
              </div>
              <div className="md:mt-0 ">
                <div className="md:w-[30vw] mt-5">
                  <Calender />
                </div>
                <div className="bg-[#373A41] rounded-[20px] md:pb-5 pb-7 mt-[-20px] md:[mt-0]">
                  <TaskList userId={userProfile && userProfile.uid} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withMentorAuthorization(MentorDashboard);
