import React from 'react';

import CourseNav from './CourseNav';
import CourseHeader from './CourseHeader';
import CourseList from './CourseList';

import styles from '../../styles/coursesMain.module.css';

function CoursesMain() {
  return (
    <>
      <div className={styles.mainCourse}>
        <CourseNav />
        <div className={styles.CoursesSec}>
          <CourseHeader />
          <CourseList />
        </div>
      </div>
    </>
  );
}

export default CoursesMain;
