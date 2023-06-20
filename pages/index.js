import HomePage from '../components/common/homepage/part1/home';
import Why from '../components/School/Why';
import ExploreCourses from '../components/School/ExploreCourses';
import Navbar from '../components/Navbar/navbar';
import Activities from '../components/Activity/Activities';
import Courses from '../components/Courses/Courses';
import Mentor from '../components/Mentor/Mentor';
import HomeSignupComp from '../components/School/HomeSignupComp';
import Footer from '../components/Footer/Footer';
import { db } from "../config/firebaseconfig"
import { collection, getDocs, addDoc } from 'firebase/firestore';
import Join from '../components/School/Join';

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
      <HomeSignupComp /> {/* Done */}
      <Footer /> {/* Done */}
    </div>
  );
}

export async function getStaticProps() {

  try {
    const CoursesCollectionref = collection(db, 'CoursesCollection');
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
