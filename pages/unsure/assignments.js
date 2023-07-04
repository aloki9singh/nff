// Mobile bottom-Navbar is missing
// Hard Coded top-Navbar

import { useState } from "react";
import Sidebar from "@/components/common/sidebar/sidebar";
import { BiBell } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import Image from "next/image";
// import MobileNav from "../components/CalenderParts/MobileNav";
import AssignmentCard from "../components/Student/AssignmentCard";

import { useRouter } from "next/router";
import assignmentupload from "./assignmentupload";

const assignments = () => {
  const router = useRouter();

  let [searchstate, setsearchstate] = useState("");
  let searchfun = (e) => {
    setsearchstate(e.target.value);
  };

  // We would get a courseID from the backend and then use that to fetch the assignments for a particular module

  //  need from backend
  let currentCourseId = 1;

  const [module, setModule] = useState(0);
  let Activestyle =
    "text-sm font-light py-2 pl-8 pr-12 bg-[#505057] border-r-2 border-[#E1348B]";
  let Inactivestyle = "text-sm font-light py-2 pl-8 pr-12";

  let Assignments = [
    {
      no: 1,
      module: 1,
      courseId: 1,
      name: "Rohit Mehta",
      date: "12/12/2021",
    },
    {
      no: 2,
      module: 1,
      courseId: 1,
      name: "Rohit Mehta",
      date: "12/12/2021",
    },
    {
      no: 3,
      module: 1,
      courseId: 1,
      name: "Rohit Mehta",
      date: "12/12/2021",
    },
    {
      no: 4,
      module: 1,
      courseId: 1,
      name: "Rohit Mehta",
      date: "12/12/2021",
    },
    {
      no: 5,
      module: 0,
      courseId: 1,
      name: "Rohit Mehta",
      date: "12/12/2021",
    },
  ];

  return (
    <div className="flex">
      <div className="lg:col-span-1 hidden lg:grid">
        <Sidebar />
      </div>
      <div
        style={{ background: "#2E3036" }}
        className="flex flex-col col-span-5 lg:col-span-4 w-full min-h-screen"
      >
        {/* Static Navbar to be replaced starts*/}
        <div className="flex justify-between lg:flex pt-6">
          <h1 className="text-white my-auto ml-12 md:text-2xl text-[19px]">
            Homework
          </h1>
          <div className="mr-12 flex">
            <div className=" xl:w-96">
              <form className=" items-center hidden md:block ">
                <label for="voice-search" className="sr-only">
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
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
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
              <BiBell className="text-white text-2xl my-auto" />
              <BsPersonCircle className="text-white text-4xl" />
            </div>
          </div>
        </div>
        {/* Static Navbar to be replaced ends*/}

        <hr className="hidden lg:block opacity-50 m-3"></hr>
        <div className="h-full bg-[#37383F] m-5 rounded-[30px] text-white space-y-6">
          <div className="lg:grid lg:grid-cols-11 h-full">
            {/* Modules */}
            <div className="col-span-3 lg:border-r-[1px] lg:border-gray-500 ">
              <div className="title font-medium text-xl pt-10 pb-5 pl-8">
                Modules
              </div>
              <div
                className={module == 0 ? Activestyle : Inactivestyle}
                onClick={() => setModule(0)}
              >
                1. UX Case Study - studying the experience
              </div>
              <div
                className={module == 1 ? Activestyle : Inactivestyle}
                onClick={() => setModule(1)}
              >
                1. UX Case Study - studying the experience
              </div>
              <div
                className={module == 2 ? Activestyle : Inactivestyle}
                onClick={() => setModule(2)}
              >
                1. UX Case Study - studying the experience
              </div>
              <div
                className={module == 3 ? Activestyle : Inactivestyle}
                onClick={() => setModule(3)}
              >
                1. UX Case Study - studying the experience
              </div>
              <div
                className={module == 4 ? Activestyle : Inactivestyle}
                onClick={() => setModule(4)}
              >
                1. UX Case Study - studying the experience
              </div>
            </div>

            {/* Assignments */}
            <div className="col-span-8">
              <div className="title font-medium text-xl pt-8 pb-2 pl-8 border-b-[1px] border-gray-500">
                Files
              </div>
              <div className="filecontainer py-8 px-12 flex gap-5 flex-wrap">
                {Assignments.filter(
                  (assignment) => module == assignment.module
                ).map((assignment, index) => (
                  <AssignmentCard
                    no={index + 1}
                    name={assignment.name}
                    date={assignment.date}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <MobileNav className="fixed bottom-0 left-0 w-full" /> */}
    </div>
  );
};

export default assignments;
