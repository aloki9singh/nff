import React, { useState } from "react";

import { BiBell } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
const MentorTopbar = ({ heading }) => {
  let [searchstate, setsearchstate] = useState("");
  let searchfun = (e) => {
    setsearchstate(e.target.value);
  };
  return (
    <>
      <div className="flex justify-between lg:flex  md:static static md:ml-5 mt-4 w-full p-2 md:p-0">
        <h1 className="text-white my-auto ml-5 md:ml-10 md:text-2xl text-[19px]">
          {heading}
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

          <div className="ml-12 flex space-x-4  ">
            <BiBell className="text-white text-2xl my-auto"></BiBell>
            <BsPersonCircle className="text-white text-4xl"></BsPersonCircle>
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorTopbar;

