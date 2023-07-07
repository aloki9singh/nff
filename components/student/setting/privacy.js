// Verified by Satyabrat Ojha

import { useState } from "react";

function Privacy() {
  let [showProfile, setshowProfile] = useState(false);
  let showProfileFun = () => {
    if (showProfile === false) {
      setshowProfile(true);
    } else {
      setshowProfile(false);
    }
  };

  let [showcourses, setshowcourses] = useState(false);
  let showcoursesFun = () => {
    if (showcourses === false) {
      setshowcourses(true);
    } else {
      setshowcourses(false);
    }
  };

  return (
    <>
      <div className="py-8 px-14 text-white rounded-[40px] bg-[#373A41]">
        <div className="mb-4">
          <h3 className="text-2xl">Privacy</h3>
          <p className="text-sm opacity-50">your privacy settings here</p>
        </div>
        <div className="my-6">
          <div className=" flex justify-between">
            <div className="">Show your profile to logged-in user</div>
            <div className="">
              <label className="relative inline-flex items-center mr-5 cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={showProfile}
                />
                <div
                  onClick={showProfileFun}
                  className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                ></div>
              </label>
            </div>
          </div>
        </div>
        <div className="my-6">
          <div className=" flex justify-between">
            <div className="">Show courses you’re talking on profile page</div>
            <div className="">
              <label className="relative inline-flex items-center mr-5 cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={showcourses}
                />
                <div
                  onClick={showcoursesFun}
                  className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                ></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Privacy;
