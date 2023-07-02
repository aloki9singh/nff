import { BiBell } from "react-icons/bi";
import { BsPersonCircle, BsPlusLg } from "react-icons/bs";
import { useState } from "react";

import Mainbodymentor from "@/components/common/calendar/mentor/mainbody";
import SideBodyClassSchedule from "@/components/mentor/sidebody/classschedulesidebody";
import SideBodyDelete from "@/components/mentor/sidebody/sidebodydelete";
import SideBody from "@/components/mentor/sidebody/sidebody";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { auth } from "../../config/firebaseconfig";
import MentorSidebar from "@/components/common/sidebar/mentor";

// import MobileNav from "../components/CalenderParts/MobileNav";
function Schedule() {
  const [count, setCount] = useState(1);

  let [searchstate, setsearchstate] = useState("");
  let searchfun = (e) => {
    setsearchstate(e.target.value);
  };

  const router = useRouter();
  useEffect(() => { }, [count]);
  
  return (
    <>
      <div className="h-full text-base bg-[#15161B]">
        <div className="flex w-full">
          <div className="lg:col-span-1 hidden lg:grid w-[261px]">
            {" "}
            <MentorSidebar pathname={router.pathname} />
          </div>
          <div className="w-[88%] flex-wrap max-[1024px]:w-[100%]  col-span-5 lg:col-span-4 md:rounded-l-3xl pt-2 h-full bg-[#2E3036]">
            <div className="flex justify-between lg:flex pt-3 md:static fixed w-full pb-2 bg-[#2E3036] top-0 md:rounded-l-10">
              <h1 className="text-white my-auto ml-12 md:text-2xl text-[19px]">
                My Progress
              </h1>
              <div className="mr-12 flex">
                <div className="xl:w-96">
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
            </div>
            <hr className="hidden lg:block opacity-50 md:m-3"></hr>
            <div className="md:flex gap-5 md:m-5 m-1 md:mt-0 mt-20 md:space-y-0 space-y-7 md:mb-5 mb-0 ">
              <div className="md:w-4/6 " onClick={() => setCount(1)}>
                <Mainbodymentor />
              </div>
              <div className=" md:mt-0 mt-[-20px] w-full md:w-2/6">
                <div>
                  {count == 1 && (
                    <SideBody setCount={setCount} count={count} />
                  )}
                  {count == 2 && (
                    <SideBodyClassSchedule
                      setCount={setCount}
                      count={count}
                    />
                  )}
                  {count == 3 && (
                    <SideBodyDelete setCount={setCount} count={count} />
                  )}
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
export default Schedule;
