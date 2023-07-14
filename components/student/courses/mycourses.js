//percent is out of 150

import Image from "next/image";
import { useState, useEffect } from "react";

import { db } from "@/config/firebaseconfig";

import { collection, getDocs, query } from "firebase/firestore";

const MyCourses = ({percent}) => {
  const [myCourse, setMyCourse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "courses"));
      const myCourseSnapshot = await getDocs(q);
      const myCourseData = myCourseSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMyCourse(myCourseData);
    };
    fetchData();
  }, []);

  return (
    <div className=" mt-7">
      <h1 className="text-white text-2xl font-semibold w-[95%] mx-auto">
        My Courses
      </h1>
      <div className="overflow-scroll scrollbar-hide h-[210px]">
      {myCourse &&
        myCourse.map((course) => (
          <div
            key={course.id}
            className="w-[95%] mx-auto my-3 flex justify-between py-1 md:py-3 px-2 bg-[#373A41] cursor-pointer"
          >
            <div className="flex">
              <div className="my-auto">
                <Image
                  className="h-16 w-16"
                  src={course.banner}
                  alt="laptop"
                  width={100}
                  height={100}
                />
              </div>
              <div className="text-white ml-4 p-2">
                <h1 className="lg:text-xl font-semibold">{course.title}</h1>
                <h1 className="text-sm text-gray-500">
                  <span className="mr-4 text-gray-500"> Lead Mentor</span>
                  {course.mentor || "No Mentor"}
                </h1>
                <div className=" flex flex-row items-end md:hidden ">
                  <div className="h-2.5 w-full rounded-md my-2 bg-[#717378] flex">
                    <div
                      style={{ width: `${course.percentage || 0}px` }}
                      className={`h-2.5 rounded-md bg-[#D179D9]`}
                    ></div>
                  </div>
                  <h1 className="text-white ml-2">{`${
                    course.percentage || 0
                  }%`}</h1>
                </div>
              </div>
            </div>
            <div className="w-1/4  flex-col items-end md:flex hidden  my-auto md:mr-2 ">
              <h1 className="text-white">{`${course.percentage || 0} %`}</h1>
              <div className="h-2.5 w-full rounded-md my-2 bg-[#717378] flex">
                <div
                  style={{ width: `${course.percentage || 0}px` }}
                  className={`h-2.5 rounded-md bg-[#D179D9]`}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
