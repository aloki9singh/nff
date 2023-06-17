import React from "react";
import HomeworkProgress from "./HomeworkProgress";
import MyCourses from "../Courses/MyCourses";

const ActiveComp = () => {
  return (
    <div className="md:w-[700px] h-full">
      <div>
        <MyCourses />
      </div>
      <HomeworkProgress />
    </div>
  );
};

export default ActiveComp;
