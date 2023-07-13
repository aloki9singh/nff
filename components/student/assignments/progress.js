import React, { useState, useEffect } from "react";

import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/config/firebaseconfig";
import CircularProgress from "../dashboard/circularprogress";

const HomeworkProgress = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "homeworkDummy"), orderBy("id"));

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAssignments(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="font-Inter mt-10">
        <h1 className="text-white text-2xl font-semibold w-[90%] mx-auto">
          Homework Progress
        </h1>
        <div className="text-white w-[90%] mx-auto flex justify-around py-4">
          <h1 className="flex-1 flex justify-center"></h1>
          <h1 className="flex-1 flex justify-center"></h1>
          <h1 className="flex-1 flex justify-center text-[#ffffffd6] text-sm">
            To be Submitted by
          </h1>
          <h1 className="flex-1 flex justify-center text-[#ffffffd6] text-sm">
            Status
          </h1>
          {/* <h1 className="flex-1 flex justify-center text-[#ffffffd6] text-sm">
            Progress
          </h1> */}
        </div>
        {assignments.length == 0 ? (
          <div
            className="px-4 py-2 text-gray-500 text-center w-full h-[150px] flex items-center justify-center"
            colSpan="3"
            
          >
            No homework created yet.
          </div>
        ) : (
          assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="rounded-md text-white w-76 mx-auto flex py-4 text-xl  hover:bg-[#A145CDA8] transition-all duration-300 ease-in-out cursor-pointer"
            >
              <h1 className=" flex-1 flex justify-center items-center text-sm  font-medium">
                {assignment.id}
              </h1>
              <h1 className="flex-1 flex justify-center items-center text-sm  font-medium">
                Assignment-{assignment.id}
              </h1>
              <h1 className="flex-1 flex justify-center items-center text-sm  font-medium">
                {assignment.submittedBy}
              </h1>
              <h1 className="flex-1 flex justify-center items-center text-sm  font-medium">
                {assignment.status}
              </h1>
              <div className="flex-1 flex justify-c       </h1>enter">
                <CircularProgress
                  percentage={assignment.per}
                  circleWidth="45"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default HomeworkProgress;
