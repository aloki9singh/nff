// 1 Completed By Mayank Jain

import Navbar from "@/components/common/navbar/navbar";
import { db } from "../config/firebaseconfig";
import { collection, getDocs, addDoc, limit } from "firebase/firestore";
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
import Layout from "@/components/common/Layout/Layout";

export default function Home({ coursesData }) {
  const [nav, setNav] = useState(false);

  return (
    <Layout pageTitle="Home Page">
      <Navbar nav={nav} setNav={setNav} />
      <div>
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
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const CoursesCollectionref = collection(db, "courses");
    const coursesSnapshot = await getDocs(CoursesCollectionref, limit(6));
    const coursesData = coursesSnapshot?.docs?.map((doc) => ({
      id: doc.id,
      title: doc.data().title||"",
      desc: doc.data().desc || "",
      level: doc.data().level || "",
      lessons: doc.data().lectures || "",
      language: doc.data().language || "",
      category: doc.data().category || "",
      banner: doc.data().banner || "",
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
