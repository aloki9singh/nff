import { useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/componentsstyling/courselist/courselist.module.css';
import CourseSec from './section2';
import chartIcon from '@/public/componentsgraphics/student/courses/list/chartbaricon.svg';
import FilterNav from './filernav';

function CourseList({courses}) {
  const [filterUsed, setFilterUsed] = useState()
  const [courseAfterFilter, setCoursesAfterFilter] = useState()
  const openFilter = () => {
    document.getElementById('filterNav').style.transform = "translate(0px,0)"
    document.getElementById('filterNav').style.width = '348px';
  };
  return (
    <>
      <div className={styles.mainCList}>
        <div className={styles.listHeader}>
          <div className='text-white md:text-4xl text-xl align-middle flex items-end pl-10 pt-10 '>ALL COURSES</div>
          {/* <button onClick={openFilter}>
            Filter
            <span>
              <Image src={chartIcon} height={100} width={100} alt="image" />
            </span>
          </button> */}
        </div>
        <div className={styles.courseCardsSec}>
          <CourseSec courses={courses} FilterUsed={filterUsed} coursesAfterFilter={courseAfterFilter} />
        </div>
        <div id="filterNav" className={styles.FNavMain} >
          <FilterNav courses={courses} setFilterUsed={setFilterUsed} setCoursesAfterFilter={setCoursesAfterFilter} />
        </div>
      </div>
    </>
  );
}

export default CourseList;
