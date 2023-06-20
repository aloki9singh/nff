import React from "react";
import Image from "next/image";

import styles from "@/styles/componentsstyling/courseheader/courseheader.module.css";

import user from "@/public/componentsgraphics/student/courses/header/pfpsample.jpeg";
import books from "@/public/componentsgraphics/student/courses/header/booksicon.svg";
import search from "@/public/componentsgraphics/student/courses/header/searchicon.svg";
import desktop from "@/public/componentsgraphics/student/courses/header/desktopicon.svg";
import laptop from "@/public/componentsgraphics/student/courses/header/laptopicon.svg";

function CourseHeader() {
  return (
    <>
      <div className={styles.headerMain}>
        <div className={styles.headerNav}>
          <h3>Courses</h3>
          <div className={styles.coursesAct}>
            <input
              className={styles.searchIn}
              type="search"
              placeholder="Search"
            />
            {/* <div className={styles.logsButton}>
              <button>Log In</button>
              <button>Sign Up</button>
            </div> */}
            <div className={styles.userImg}>
              <Image src={user} alt="user" />
            </div>
          </div>
        </div>

        <hr style={{ border: "1px solid #728095" }} />
        <div className={styles.headerSubMain}>
          <div className={styles.quoteMain}>
            <h2>Unleash your full potential with our courses</h2>
            <p>
              Build your skills with our interactive courses. Get the education
              you need, on your own terms.
            </p>
            <button>Get Started for Free</button>
            <div className={styles.quoteRandom}>
              <Image src={books} alt="books" />
              <Image src={search} alt="search" />
              <Image src={laptop} alt="laptop" />
              <Image src={desktop} alt="desktop" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseHeader;
