import React from "react";
import HomeworkProgress from "./progress";
import MyCourses from "../courses/mycourses";

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
