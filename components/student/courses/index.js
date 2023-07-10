import CourseList from "./list";
import Dashboardnav from "@/components/common/navbar/dashboardnav";
import CourseHeader from "./header";
import CourseoverviewSidebar from "@/components/common/sidebar/courseoverview";
import { useState } from "react";
import { useRouter } from "next/router";
// import BottomNav from "../Footer/BottomNav";


// creating changes for courseOverview


export default function CoursesMain({ coursesData }) {
  const router = useRouter();
  const [courses] = useState(coursesData);
  //console.log(courses);
  
  return (
    <div className="flex">
      <div className="hidden lg:block">
        <CourseoverviewSidebar pathname={router.pathname} />
      </div>
      <div className="bg-[#2e3036] rounded-l-[50px] w-full">
        <Dashboardnav heading="Courses" />
        <CourseHeader />
        <CourseList courses={courses} />
        {/* <BottomNav /> */}
      </div>
    </div>
  );
}
