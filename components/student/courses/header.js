import React from "react";
import Image from "next/image";

import styles from "@/styles/componentsstyling/courseheader/courseheader.module.css";

import user from "@/public/componentsgraphics/student/courses/header/pfpsample.svg";
import books from "@/public/componentsgraphics/student/courses/header/booksicon.svg";
import search from "@/public/componentsgraphics/student/courses/header/searchicon.svg";
import desktop from "@/public/componentsgraphics/student/courses/header/desktopicon.svg";
import laptop from "@/public/componentsgraphics/student/courses/header/laptopicon.svg";

function CourseHeader() {
  return (
    <>
      {/* removing double header in courseOverview */}

      {/* <div className={styles.headerMain}> */}
      {/* <div className={styles.headerNav}>
          <h3>Courses</h3>
          <div className={styles.coursesAct}>
            <input
              className={styles.searchIn}
              type="search"
              placeholder="Search"
            />
            {/* <div className={styles.logsButton}> */}
      {/* <button>Log In</button> */}
      {/* <button>Sign Up</button> */}
      {/* </div>  */}
      {/* <div className={styles.userImg}>
              <Image src={user} alt="user" />
            </div>
          </div>
        </div> */}

      {/* <hr style={{ border: "1px solid #728095" }} /> */}
      {/* <div className={styles.headerSubMain}>
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
      </div> */}

      <section className="text-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">


    
          <h2 className="mx-6 mb-4 text-[40px] font-[600] font-[Inter] leading-[48px] tracking-tight leading-none md:text-3xl lg:text-4xl">
          Unleash your full potential <br/> with our courses
          </h2>
          <p className="mb-8 text-[16px] font-[400] font-[Inter] leading-[19px] lg:text-xl sm:px-16 xl:px-48 ">
          Build your skills with our interactive courses.<br/> Get the education
              you need, on your own terms.
          </p>
          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">       
         
            <a
              href="#"
              className="inline-flex justify-center text-white  items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-[15px] border border-gray-300 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800 bg-[#a145cd]"
            >
              Get Started for Free
            </a>
          </div>
          <div>
              <Image src={books} className="absolute right-[22rem] top-[23rem] hidden md:block" alt="books" />
              <Image src={search} className="absolute left-[32rem] top-[21rem] hidden md:block"alt="search" />
              <Image src={laptop} className="absolute right-[21rem] top-[13rem] hidden md:block" alt="laptop" />
              <Image src={desktop} className="absolute left-[30rem] top-[13rem] hidden md:block" alt="desktop" />
            </div>
        </div>
      </section>
    </>
  );
}

export default CourseHeader;
