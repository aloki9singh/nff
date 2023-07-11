// 1 Completed By Mayank Jain

import Navbar from "@/components/common/navbar/navbar";
import { db } from "../config/firebaseconfig";
import { collection, getDocs, addDoc } from "firebase/firestore";
import HomePage from "@/components/common/homepage/part1/home";
import Courses from "@/components/student/courses/courses";
import Why from "@/components/common/homepage/why/why";
import Join from "@/components/common/homepage/join/join";
import Mentor from "@/components/common/homepage/mentor/mentor";
import ExploreCourses from "@/components/student/explorecourses/explorecourses";
import Footer from "@/components/common/footer/footer";
import HomepageActivities from "@/components/common/homepage/activities/HomepageActivities";
import SignUp from "@/components/common/homepage/HomeSignupComp/HomeSignupComp";
import { useState } from "react";
import useHoverOutside from "@/components/common/homepage/useHoverOutside/useHoverOutside";

export default function Home({ coursesData }) {
  const [nav, setNav] = useState(false);
  const handleClickOutside = () => {
    setNav(false);
  };
  const ref = useHoverOutside(handleClickOutside);

  return (
    <div>
      <Navbar nav={nav} setNav={setNav} />
      <div ref={ref}>
        <HomePage />
        <Courses coursesData={coursesData} />
        <Why />
        <Mentor />
        <Join />
        <HomepageActivities />
        <ExploreCourses />
        <SignUp />
        <Footer />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const CoursesCollectionref = collection(db, "CoursesCollection");
    const coursesSnapshot = await getDocs(CoursesCollectionref);
    const coursesData = coursesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return {
      props: {
        coursesData,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        coursesData: [],
      },
    };
  }
}
