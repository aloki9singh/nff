import CourseList from "./CourseList";
import DashboardNav from "../Navbar/Dashboardnav";
import CourseHeader from "./CourseHeader";
import Courseoverviewsidebar from "../Sidebar/Courseoverviewsidebar";
import { useState } from "react";
import { useRouter } from "next/router";
import BottomNav from "../Footer/BottomNav";

export default function CoursesMain({ coursesData }) {
  const router = useRouter();
  const [courses] = useState(coursesData);
  //console.log(courses);
  return (
    <div className="flex">
      <div className="hidden lg:block">
        <Courseoverviewsidebar pathname={router.pathname} />
      </div>
      <div className="rounded-tl-[50px] w-full bg-[#2e3036]">
        <DashboardNav heading="Courses" />
        <CourseHeader />
        <CourseList courses={courses} />
        <BottomNav />
      </div>
    </div>
  );
}
