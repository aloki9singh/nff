import { useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/componentsstyling/courselist/courselist.module.css';
import CourseSec from './section';
import chartIcon from '@/public/componentsgraphics/student/courses/list/chartbaricon.svg';
import FilterNav from './filernav';

function CourseList() {
  // const [navState, setNavState] = useState("46vh");
  // console.log(navState);
  const openFilter = () => {
    document.getElementById('filterNav').style.width = '50vh';
  };
  return (
    <>
      <div className={styles.mainCList}>
        <div className={styles.listHeader}>
          <h1>ALL COURSES</h1>
          <button onClick={openFilter}>
            Filter
            <span>
              <Image src={chartIcon} height="2" width="2" alt="image" />
            </span>
          </button>
        </div>
        <div className={styles.courseCardsSec}>
          <CourseSec />
          <CourseSec />
          <CourseSec />
        </div>
        <div id="filterNav" className={styles.FNavMain}>
          <FilterNav />
        </div>
      </div>
    </>
  );
}

export default CourseList;