import Image from "next/image";
import { useState, useEffect } from "react";
import { db } from "../config/firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";

export default function coursecard({ coursedata, category }) {
  //const [recommendations, setRecommendations] = useState([]);
  let course = coursedata;
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const q = query(collection(db, "CoursesCollection"));
  //     const recommendationSnapshot = await getDocs(q);
  //     const recommendationData = recommendationSnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setRecommendations(recommendationData);
  //   };
  //   fetchData();
  // }, []);
  return (
    // <div className="flex justify-center flex-wrap gap-x-3 gap-y-5 m-5 ">
    //   {recommendations.map((course) => (
    //     <div
    //       key={course.id}
    //       className="rounded-2xl border-2 border-white shadow-lg bg-[#141518] md:w-64 max-w-sm md:gap-6"
    //     >
    //       <div className="flex justify-between items-center">
    //         <div>
    //           <Image
    //             src="/laptop.svg"
    //             width={60}
    //             height={60}
    //             alt="f"
    //             className="ml-4 mt-4"
    //           ></Image>
    //         </div>
    //         <div className="text-sm text-[#E1348B] pr-6 pt-2">
    //           <span className="mr-2 text-xs">{`${course.lessons} Lessons`}</span>
    //           <span className="text-xs">{course.level}</span>
    //         </div>
    //       </div>
    //       <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light"></a>
    //       <div class="px-4">
    //         <h1 class="text-slate-400 text-[8px] font-medium">COURSE</h1>
    //         <h1 className="text-white text-sm font-medium">{course.title}</h1>
    //         <div className="w-[80%] text-left">
    //           <p class="text-white text-[9px] mb-4">{course.desc}</p>
    //         </div>
    //         <div className="flex justify-end">
    //           <button
    //             type="button"
    //             className="mx-4 mb-2 inline-block px-4 py-2 bg-transparent  border-pin border text-white font-medium text-xs leading-tight uppercase  shadow-md hover:bg-pin hover:shadow-lg focus:bg-pin focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pin active:shadow-lg transition duration-150  ease-in-out"
    //           >
    //             Explore
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    // </div>
    <>
      {category ? (
        category === course.category ? (
          <div className="flex justify-center flex-wrap gap-x-3 gap-y-5 m-5 ">
            <div
              key={course.id}
              className="rounded-2xl border-2 border-white shadow-lg bg-[#141518] md:w-64 max-w-sm md:gap-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <Image
                    src="/laptop.svg"
                    width={60}
                    height={60}
                    alt="f"
                    className="ml-4 mt-4"
                  ></Image>
                </div>
                <div className="text-sm text-[#E1348B] pr-6 pt-2">
                  <span className="mr-2 text-xs">{`${course.language} Lessons`}</span>
                  <span className="text-xs">{course.level}</span>
                </div>
              </div>
              <a
                href="#!"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              ></a>
              <div class="px-4">
                <h1 class="text-slate-400 text-[8px] font-medium">
                  COURSE : {course.sessions} sessions
                </h1>
                <h1 className="text-white text-sm font-medium">
                  {course.title}
                </h1>
                <div className="w-[80%] text-left">
                  <p class="text-white text-[9px] mb-4">{course.desc}</p>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="mx-4 mb-2 inline-block px-4 py-2 bg-transparent  border-pin border text-white font-medium text-xs leading-tight uppercase  shadow-md hover:bg-pin hover:shadow-lg focus:bg-pin focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pin active:shadow-lg transition duration-150  ease-in-out"
                  >
                    Explore
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )
      ) : (
        <div className="flex justify-center flex-wrap gap-x-3 gap-y-5 m-5 ">
          <div
            key={course.id}
            className="rounded-2xl border-2 border-white shadow-lg bg-[#141518] md:w-64 max-w-sm md:gap-6"
          >
            <div className="flex justify-between items-center">
              <div>
                <Image
                  src="/laptop.svg"
                  width={60}
                  height={60}
                  alt="f"
                  className="ml-4 mt-4"
                ></Image>
              </div>
              <div className="text-sm text-[#E1348B] pr-6 pt-2">
                <span className="mr-2 text-xs">{`${course.language} Lessons`}</span>
                <span className="text-xs">{course.level}</span>
              </div>
            </div>
            <a
              href="#!"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            ></a>
            <div class="px-4">
              <h1 class="text-slate-400 text-[8px] font-medium">
                COURSE : {course.sessions} sessions
              </h1>
              <h1 className="text-white text-sm font-medium">{course.title}</h1>
              <div className="w-[80%] text-left">
                <p class="text-white text-[9px] mb-4">{course.desc}</p>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mx-4 mb-2 inline-block px-4 py-2 bg-transparent  border-pin border text-white font-medium text-xs leading-tight uppercase  shadow-md hover:bg-pin hover:shadow-lg focus:bg-pin focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pin active:shadow-lg transition duration-150  ease-in-out"
                >
                  Explore
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
