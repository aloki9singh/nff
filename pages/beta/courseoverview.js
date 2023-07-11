
import { collection, getDocs, addDoc } from "firebase/firestore";
import CoursesMain from "@/components/student/courses";
import { db } from "@/config/firebaseconfig";

export default function CourseOverview({ coursesData }) {
  return (
    <div className="">
      <CoursesMain coursesData={JSON.parse(coursesData)} />
    </div>
  );
}

export async function getStaticProps() {
  try {
    const CoursesCollectionref = collection(db, "courses");
    const coursesSnapshot = await getDocs(CoursesCollectionref);
    const coursesData = JSON.stringify(coursesSnapshot.docs.map((doc) => {return ({
      id: doc.id,
      title: doc.data().title,
      desc: doc.data().desc,
      level: doc.data().level,
      sessions: doc.data().sessions,
      language: doc.data().language,
      category: doc.data().category,
    })}));
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
