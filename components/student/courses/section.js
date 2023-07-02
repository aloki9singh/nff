import React from "react";

import styles from "@/styles/componentsstyling/cards/coursecards.module.css";
import CourseCard from "./CourseCard";

function CourseSec({ courses, category, FilterUsed, coursesAfterFilter }) {
  // const cardInfo = [
  //   {
  //     name: "Introduction to C++",
  //     desc: "Learn the basics of C++ and how to write your first code.",
  //   },
  //   {
  //     name: "Introduction to Java",
  //     desc: "Learn the basics of Java and how to write your first code.",
  //   },
  //   {
  //     name: "Introduction to Swift",
  //     desc: "Learn the basics of Swift and how to write your first code.",
  //   },
  // ];
  const cardInfo = FilterUsed ? coursesAfterFilter : courses;

  return (
    <>
      <div className={styles.secMain}>
        <div className={styles.secHead}>
          <p>Expand your career opportunities</p>
          <button className="mx-4" style={{ whiteSpace: "nowrap", textAlign: "center" }}>
            View All
          </button>
        </div>
        <div className={styles.mainList}>
          {cardInfo?.map((info, i) => (
            <CourseCard coursedata={info} category={category} key={i} />
          ))}
        </div>
      </div>
    </>
  );
}

export default CourseSec;
