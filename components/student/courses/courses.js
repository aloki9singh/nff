import { useEffect, useMemo, useState } from "react";
import CourseCard from "./CourseCard";
import Link from "next/link";
// import CourseCard from "./CourseCard";g
// import { db } from '../config/firebaseConfig';
// import { collection, getDocs, addDoc } from 'firebase/firestore';

export default function Courses({ coursesData }) {
  const [activeClass, setActiveClass] = useState("All Category");

  const dummyCourses = [
    {
      lessons: 8,
      title: "Introduction to C++",
      desc: "Learn the basics of C++ programming language.",
      level: "Beginner",
      icon: "/componentsgraphics/common/homepage/explorecourses/ProgrammingIcon.png",
    },
    {
      lessons: 12,
      title: "Responsive Web Design",
      desc: "Master the art of creating responsive web layouts.",
      level: "Intermediate",
      icon: "/componentsgraphics/common/homepage/explorecourses/ProgrammingIcon.png",
    },
    {
      lessons: 10,
      title: "Python for Data Analysis",
      desc: "Explore data manipulation and analysis using Python.",
      level: "Intermediate",
      icon: "/componentsgraphics/common/homepage/explorecourses/ProgrammingIcon.png",
    },
    {
      lessons: 18,
      title: "Full-Stack Web Dev",
      desc: "Become proficient in front-end and back-end web development.",
      level: "Expert",
      icon: "/componentsgraphics/common/homepage/explorecourses/ProgrammingIcon.png",
    },
    {
      lessons: 6,
      title: "Introduction to AI",
      desc: "Discover the basics of Artificial Intelligence and its applications.",
      level: "Intermediate",
      icon: "/componentsgraphics/common/homepage/explorecourses/ProgrammingIcon.png",
    },
    {
      lessons: 15,
      title: "Database Management",
      desc: "Learn the essentials of designing and managing databases.",
      level: "Intermediate",
      icon: "/componentsgraphics/common/homepage/explorecourses/ProgrammingIcon.png",
    },
  ];

  // coursesData = dummyCourses;
  const categories = useMemo(
    () => [
      "All Category",
      "Coding",
      "Design",
      "Arts",
      "Web Development",
      "Machine Learning",
    ],
    []
  );

  const [courses, setCourses] = useState(coursesData);

  // console.log(courses);
  // const CoursesCollectionref = collection(db, 'CoursesCollection');

  // useEffect(() => {
    // const CoursesCollectionref = collection(db, 'CoursesCollection');
    // const getData = async () => {
    //   getDocs(CoursesCollectionref).then((response) => {
    //     setCourses(
    //       response.docs.map((item) => {
    //         return item.data();
    //       })
    //     );
    //   });
    // };
    // getData()
  //   categories.forEach((category) => {
  //     const element = document.getElementById(category);
  //     element.classList.remove("text-[#DA2C84]");
  //     element.classList.remove("underline");
  //     element.classList.remove("font-semibold");
  //   });

  //   const element = document.getElementById(activeClass);
  //   element.classList.add("text-[#DA2C84]");
  //   element.classList.add("underline");
  //   element.classList.add("font-semibold");
  // }, [activeClass, categories]);

  // const Arr = courses.filter((el) => el.category[1] == 'All Category');

  // const [c, setC] = useState(Arr);
  const [c, setC] = useState(coursesData);

  const clickHandler = (cat) => {
    setActiveClass(cat);
    if (cat == "All Category") setC(Arr);
    else {
      var newArray = courses.filter((el) => el.category[0] == cat);
      setC(newArray);
    }
  };

  return (
    <div className="w-full py-10 md:py-16 flex items-center justify-center flex-col font-raleway min-h-screen ">
      <div className="flex flex-col max-w-[90%] md:flex-row justify-around text-white text-2xl lg:text-3xl mx-auto">
        <div className="flex flex-col items-center justify-evenly">
          <div className="flex justify-center items-center text-center font-semibold  lg:text-4xl">
            <span className="hidden md:flex">Explore our Courses</span>
            <span className="md:hidden">Explore our top-rated Courses</span>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="pt-2 md:pt-0 w-3/4 md:w-7/12 text-sm lg:text-xl font-normal justify-between text-center flex items-center text-white">
            {`You don't need to have any prior knowledge to take our classes. You
            just need curiosity and the desire to learn.`}
          </div>
        </div>

        <Link href={'/beta/courseoverview'} className="hidden md:flex border-2 text-base md:text-lg w-64 h-16 justify-center items-center font-semibold">
          Explore Courses
        </Link>
      </div>
      <div className="flex flex-col md:w-[90%] w-[90%] items-center mx-auto lg:mt-20 mt-12 max-w-[1440px]">
        {/* <div className="text-white w-screen lg:w-full overflow-x-scroll scrollbar-hide flex md:space-x-24 self-center ">
          {categories.map((category, index) => (
            <h1
              className="mx-6 text-lg cursor-pointer whitespace-nowrap"
              id={category}
              key={index}
              onClick={() => clickHandler(category)}
            >
              {category}
            </h1>
          ))}
        </div> */}
        <div className="w-full lg:mt-16 mt-10 flex flex-col ">
          {/* <div className="flex justify-between md:flex-wrap overflow-x-scroll scrollbar-hide w-full">
            {coursesData.map((course) => (
              <CourseCard
                key={course.id}
                lessons={course.lessons}
                title={course.title}
                desc={course.desc}
                level={course.level}
                icon={course.icon}
              />
            ))}
          </div> */}
          <div className="grid grid-cols-3 grid-flow-col overflow-scroll scrollbar-hide gap-10">
            {coursesData.map((course, i) => (
              <div key={i}>
                <CourseCard
                  key={course.id}
                  sessions={course.lessons}
                  title={course.title}
                  desc={course.desc}
                  level={course.level}
                  icon={course.icon}
                  banner={course.banner}
                />
              </div>
            ))}
          </div>
          <button className=" flex  text-white md:hidden border-2 text-base md:text-lg w-44 h-[52px] justify-center items-center font-semibold self-center mt-20">
            Explore Courses
          </button>
        </div>
      </div>
    </div>
  );
}
