import HomePage from "@/components/common/homepage/part1/home";
import Why from "@/components/common/homepage/why/why";
import ExploreCourses from "@/components/student/explorecourses/explorecourses";
import Navbar from "@/components/common/navbar/navbar";
import Activities from "../components/common/homepage/activities/activities";
import Courses from "@/components/student/courses/courses";
import Mentor from "@/components/common/homepage/mentor/mentor";
import HomeSignupComp from "@/components/common/homepage/HomeSignupComp/HomeSignupComp";
import { db } from "../config/firebaseconfig";
import { collection, getDocs, addDoc } from "firebase/firestore";
import Join from "@/components/common/homepage/join/join";
import Footer from "@/components/common/footer/footer";
export default function Home({ coursesData }) {
  return (
    <div>
      <Navbar /> {/* Done */}
      <HomePage /> {/* Done */}
      <Courses coursesData={coursesData} /> {/* Done */}
      <Why /> {/* Done */}
      <Join /> {/* Done */}
      <Mentor /> {/* Done */}
      <Activities /> {/* Done */}
      <ExploreCourses /> {/* Done */}
      <HomeSignupComp />
      <Footer /> {/* Done */}
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
