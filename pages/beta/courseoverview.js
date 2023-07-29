// TODO: Can be modified for better view


import { collection, getDocs, addDoc } from "firebase/firestore";
import CoursesMain from "@/components/student/courses";
import { db } from "@/config/firebaseconfig";
import { useAuthContext } from "@/lib/context/AuthContext";
import { useRouter } from "next/router";

export default function CourseOverview({ coursesData }) {

  // const router = useRouter();
  // const { user, userProfile } = useAuthContext();
  // if (!user || !userProfile) {
  //   router.push("/");
  // }

  // if (!user || !userProfile) {
  //   return null;
  // }
  return (
    <div className="">
      <CoursesMain coursesData={coursesData ? JSON.parse(coursesData) : [] } />
    </div>
  );
}

export async function getStaticProps() {
  try {
    const CoursesCollectionref = collection(db, "courses");
    const coursesSnapshot = await getDocs(CoursesCollectionref);
    const coursesData = JSON.stringify(coursesSnapshot.docs.map((doc) => {
      return ({
        id: doc.id,
        title: doc.data().title,
        desc: doc.data().desc,
        level: doc.data().level,
        sessions: doc.data().lectures,
        language: doc.data().language,
        category: doc.data().category,
        banner: doc.data().banner
      })
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
