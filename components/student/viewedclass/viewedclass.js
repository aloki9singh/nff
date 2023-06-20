// needs rechecking and checked by Satyabrat Ojha
// import DasboardCard from components/student/dashboard/card changed

import DashBoardCard from "../dashboard/card";

const Viewedclass = ({ ti }) => {
  const suggestedCourses = [
    {
      id: 1,
      lessons: 25,
      level: "Beginner",
      title: "Introduction to C++",
      desc: "Learn the basics of C++ and how to write your first code.",
      textSize: "text-lg",
    },
    {
      id: 2,
      lessons: 30,
      level: "Beginner",
      title: "Introduction to C++",
      desc: "Learn the basics of C++ and how to write your first code.",
      textSize: "text-lg",
    },
    {
      id: 3,
      lessons: 25,
      level: "Beginner",
      title: "Introduction to Java",
      desc: "Learn the basics of C++ and how to write your first code.",
      textSize: "text-lg",
    },
    {
      id: 4,
      lessons: 20,
      level: "Internmediate",
      title: "Introduction to C++",
      desc: "Learn the basics of C++ and how to write your first code.",
      textSize: "text-lg",
    },
    {
      id: 5,
      lessons: 25,
      level: "Advanced",
      title: "Introduction to Java",
      desc: "Learn the basics of C++ and how to write your first code.",
      textSize: "text-lg",
    },
    {
      id: 6,
      lessons: 25,
      level: "Beginner",
      title: "Introduction to Java",
      desc: "Learn the basics of C++ and how to write your first code.",
      textSize: "text-lg",
    },
  ];

  return (
    <div className="p-10">
      <div className="text-white flex justify-between items-center font-Inter font-semibold my-8">
        <div className="pl-8">{`${ti}`} </div>
        <a className="border text-xs px-4 py-2 text-white" href="#">
          View All
        </a>
      </div>
      <div className="flex space-x-2 flex-wrap justify-center my-2 ml-5 ">
        {suggestedCourses.map((course) => (
          <DashBoardCard
            key={course.id}
            title={course.title}
            desc={course.desc}
            lessons={course.lessons}
            level={course.level}
            textSize={course.textSize}
          />
        ))}
      </div>
    </div>
  );
};

export default Viewedclass;
