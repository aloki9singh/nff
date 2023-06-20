
import { collection, getDocs, addDoc } from "firebase/firestore";
import CoursesMain from "@/components/student/courses";

export default function CourseOverview({ coursesData }) {
  return (
    <div className="">
      <CoursesMain coursesData={coursesData} />
    </div>
  );
}

export async function getStaticProps() {
  // try {
  //   const CoursesCollectionref = collection(db, "courses");
  //   console.log(1);
  //   console.log(CoursesCollectionref)
  //   const coursesSnapshot = await getDocs(CoursesCollectionref);
  //   console.log(coursesSnapshot);
  //   const coursesData = coursesSnapshot.docs.map((doc) => ({
  //     id: doc.id,
  //     title: doc.data().title,
  //     desc: doc.data().desc,
  //     level: doc.data().level,
  //     sessions: doc.data().sessions,
  //     language: doc.data().language,
  //     category: doc.data().category,
  //   }));
  //   return {
  //     props: {
  //       coursesData,
  //     },
  //   };
  // } catch (error) {
  //   console.error(error);
  //   return {
  //     props: {
  //       coursesData: [],
  //     },
  //   };
  // }
  return {
    props: {
      coursesData: [],
    }
  }
}
