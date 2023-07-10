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

export default function Home({ coursesData }) {
  return (
    <div>
      <Navbar />
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
