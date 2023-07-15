import React from "react";
import styles from "@/styles/componentsstyling/cards/coursecards.module.css";
import CourseCard from "./CourseCard";

function CourseSec({ courses, FilterUsed, coursesAfterFilter }) {
  const cardInfo = FilterUsed ? coursesAfterFilter : courses;
  return (
    <>
      <div className={styles.secMain}>
        <div className={styles.secHead}>
          <p>Expand your career opportunities</p>
          <button
            className="mx-4"
            style={{ whiteSpace: "nowrap", textAlign: "center" }}
          >
            View All
          </button>
        </div>
        <div className="overflow-scrollbar scrollbar-hide ">
          <div className={styles.mainList}>
            {cardInfo &&
              cardInfo
                .slice(3, 6)
                .map((info, i) => (
                  <CourseCard
                    key={i}
                    title={info.title}
                    desc={info.desc}
                    level={info.level}
                    sessions={info.sessions}
                    language={info.language}
                    category={info.category}
                    banner={info.banner}
                  />
                ))}
          </div>
        </div>
      </div>
      <div className={styles.secMain}>
        <div className={styles.secHead}>
          <p>Expand your career opportunities</p>
          <button
            className="mx-4"
            style={{ whiteSpace: "nowrap", textAlign: "center" }}
          >
            View All
          </button>
        </div>
        <div className={styles.mainList}>
          {cardInfo &&
            cardInfo
              .slice(3, 6)
              .map((info, i) => (
                <CourseCard
                  key={i}
                  title={info.title}
                  desc={info.desc}
                  level={info.level}
                  sessions={info.sessions}
                  language={info.language}
                  category={info.category}
                  banner={info.banner}
                />
              ))}
        </div>
      </div>
    </>
  );
}

export default CourseSec;
