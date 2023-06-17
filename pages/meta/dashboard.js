import TaskList from "../components/TaskList/ TaskList";
import Calender from "../components/Mentor/Calender";
import MentorChatWidget from "../components/Mentor/MentorChatWidget";
import BasicDetails from "../components/Mentor/BasicDetails";
import { BiBell } from "react-icons/bi";
import { BsPersonCircle, BsPlusLg } from "react-icons/bs";
import { useState } from "react";
import MentorSidebar from "../components/Sidebar/MentorSidebar";
import MentorTopbar from "../components/Navbar/MentorTopbar";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { auth } from "../config/firebaseConfig";
import LeaderBoardMentor from "../components/Mentor/LeaderBoardMentor";
import CirProgress from "../components/Mentor/CirProgress";
// import MobileNav from "../components/CalenderParts/MobileNav";
import { useSelector } from "react-redux";
function MentorDashboard() {
  const [count, setCount] = useState(1);
  const { data } = useSelector((state) => state.authManagerMentor);
  let [searchstate, setsearchstate] = useState("");
  const router = useRouter();
  let searchfun = (e) => {
    setsearchstate(e.target.value);
  };

  // useEffect(() => {
  //   if (!data.verified) {
  //     router.push("/mentorSignup");
  //   } 
  // }, [count]);
  // if (!data.verified) {
  //   return null
  // } 
  return (
    <>
      <div className="h-screen text-base bg-[#2E3036] ">
        <div className="flex max-w-full">
          <div className="lg:col-span-1 hidden lg:grid w-[261px]">
            {" "}
            <MentorSidebar pathname={router.pathname} />
          </div>
          <div
            style={{ background: "#2E3036" }}
            className="col-span-5 lg:col-span-4 md:rounded-l-3xl pt-2 w-screen overflow-y-scroll scrollbar-hide"
          >
            {/* <div className="flex justify-between lg:flex pt-3 md:static fixed w-full pb-2 bg-[#2E3036] top-0 md:rounded-l-10">
              <h1 className="text-white my-auto ml-12 md:text-2xl text-[19px]">
                My Progress
              </h1>
              <div className="mr-12 flex">
                <div className=" xl:w-96">
                  <form className=" items-center hidden md:block ">
                    <label htmlFor="voice-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full">
                      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="voice-search"
                        className="bg-transparent  border border-gray-300 text-slate-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search..."
                        required
                        value={searchstate}
                        onChange={searchfun}
                      />
                    </div>
                  </form>
                </div>

                <div className="ml-12 flex space-x-4">
                  <BiBell className="text-white text-2xl my-auto"></BiBell>
                  <BsPersonCircle className="text-white text-4xl"></BsPersonCircle>
                </div>
              </div>
            </div> */}
            <MentorTopbar heading={"My Progress"} />

            <hr className="hidden lg:block opacity-50 m-3"></hr>
            <div className="md:flex gap-5 m-5 md:mt-0 mt-20">
              <div className="  md:w-5/6 ">
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
}
export default MentorDashboard;
