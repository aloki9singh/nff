import React from "react";
import styles from "@/styles/componentsstyling/filternav/filternav.module.css";

function FilterNav({ nNavState }) {
  const skills = [
    "Programming Language",
    "Data Analytics",
    "Design",
    "AI/ML",
    "Business",
    "Arts",
    "Web Development",
    "Music",
  ];

  const diff = ["Advanced", "Beginner", "Intermediate"];
  const sort = ["Most Popular", "Recommended", "Newest"];

  const clearFun = () => {
    document.getElementById("filterForm").reset();
  };

  let newState = "0vh";

  const onClick = () => {
    document.getElementById("filterNav").style.width = "0vh";
  };

  return (
    <>
      <div className={styles.fOverView}>
        <div className={styles.fNavClose}>
          <button onClick={onClick}>&#10005;</button>
        </div>
        <div className={styles.fNavHeader}>
          <h3>Filter Courses</h3>
          <button onClick={clearFun}>Clear</button>
        </div>
        <form id="filterForm">
          <div className={styles.skillsSec}>
            <h3>Skills</h3>
            <div className={styles.skillsOptions}>
              <div className={styles.skillUpper}>
                {skills.map((skill, i) => (
                  <div className={styles.options} key={i}>
                    <input type="checkbox" className={styles.checkB} />
                    <label>{skill}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.diffCheck}>
            <h3>Difficulty</h3>
            {diff.map((diff, i) => (
              <div className={styles.diffOption} key={i}>
                <input type={"checkbox"} />
                <label>{diff}</label>
              </div>
            ))}
          </div>
          <div className={styles.sortSec}>
            <h3>Sort By</h3>
            {sort.map((sort, i) => (
              <div className={styles.sortOption} key={i}>
                <input type={"radio"} name="sort" id={sort} />
                <label for="MP">{sort}</label>
              </div>
            ))}
          </div>
        </form>
        <div className={styles.submitButton}>
          <button>Apply Filter</button>
        </div>
      </div>
    </>
  );
}

export default FilterNav;
