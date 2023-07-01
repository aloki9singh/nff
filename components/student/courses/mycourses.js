import Image from 'next/image';
import { useState, useEffect } from 'react';
import { db } from '@/config/firebaseConfig';
import { collection, getDocs, query } from 'firebase/firestore';

const MyCourses = () => {
  const [myCourse, setMyCourse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'enrolledCoursesDummy'));
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
    <div className="auto mt-10">
      <h1 className="text-white text-2xl font-semibold w-[90%] mx-auto">
        My Courses
      </h1>
      {myCourse.map((course) => (
        <div
          key={course.id}
          className="w-[90%] mx-auto my-6 flex justify-around py-4 bg-[#373A41] cursor-pointer"
        >
          <div className="flex">
            <Image
              className="h-16 w-16"
              src="/laptop.svg"
              alt="laptop"
              width={10}
              height={10}
            />
            <div className="text-white ml-4 p-2">
              <h1 className="lg:text-2xl font-semibold">{course.coursename}</h1>
              <h1 className="text-sm">
                <span className="mr-4">Mentor</span>
                {course.mentor}
              </h1>
            </div>
          </div>
          <div className="w-1/4 flex flex-col items-end">
            <h1 className="text-white">{course.percentage}</h1>
            <div className="h-2.5 w-full rounded-md my-2 bg-[#717378] flex">
              <div
                style={{ width: `${course.percentage}` }}
                className={`h-2.5 rounded-md bg-[#D179D9]`}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyCourses;
