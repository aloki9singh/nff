import React, { useEffect, useState } from "react";
import Image from "next/image";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/config/firebaseconfig";
import Link from "next/link";
const InActiveComp = () => {
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
    <div>
      {/* viewed courses by class students */}
      <div>
        <div className="flex justify-between m-5 md:mt-5 gap-2 ">
          <div className="md:text-base text-xs">
            Students can view these courses
          </div>
          <div>
            <button className="border-2 p-1 text-xs w-[60px] ">View All</button>
          </div>
        </div>
        <div className="w-[100%] flex-wrap md:grid md:grid-cols-3 rounded-[30px] md:space-y-0 space-y-5  gap-3 pt-5">
          {myCourse &&
            myCourse.slice(0, 6).map((e) => (
              <div
                className="border bg-black rounded-[30px] p-5 md:py-5 "
                key={e.id}
              >
                <div className="flex ">
                  <div className="my-auto">
                    <Image
                      width={110}
                      height={110}
                      alt={"img"}
                      src={e.banner}
                      className="w-12 h-12 md:w-10"
                    />
                  </div>
                  <div className="text-xs md:text-[10px] text-[#E1348B] m-auto">
                    {e.lectures} Lessons
                  </div>
                  <div className="text-xs md:text-[10px] md:ml-1 text-[#E1348B] m-auto">
                    {e.level}
                  </div>
                </div>
                <div className="text-[10px] text-gray-600">COURSE</div>
                <h1 className="text-sm overflow-hidden overflow-ellipsis md:line-clamp-1">{e.title}</h1>
                <p className="text-[13px] md:text-[10px] md:w-auto w-[300px] whitespace-break-spaces leading-4 text-gray-500 overflow-hidden overflow-ellipsis md:line-clamp-2 line-clamp-3">
                  {e.desc}
                </p>

                <div className="text-right">
                  <Link href={{
                    pathname: "/beta/coursedetail",
                    query: { title: e.title }
                  }}>
                    <button className="mt-2 text-xs  border-pink p-2 border">
                      Explore
                    </button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default InActiveComp;
