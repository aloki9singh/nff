import React from "react";
import Image from "next/image";
import { BiRightArrowAlt } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";

import styles from "../../styles/cnav.module.css";

import NeatLogo from "../../public/courses/Neatskills-removebg-preview 1.svg";

function CourseNav() {
  return (
    <>
      <div className={styles.cnavMain}>
        <div className={styles.head}>
          <Image 
          src={NeatLogo}
          alt= ""
           />
        </div>
        <div className={styles.mainNav}>
          <div className={styles.navPart1}>
            <li>Home</li>
            <li>Certificate</li>
            <hr
              style={{ width: "127px", marginTop: "40px", marginLeft: "50px" }}
            />
            <li>Courses</li>
            <li>Lessons</li>
            <li>Assignments</li>
            <hr
              style={{ width: "127px", marginTop: "40px", marginLeft: "50px" }}
            />
            <li>Chats</li>
            <li>Community</li>
          </div>
          {/* <div className={styles.navPolicy}>
            <li>Cookies</li>
            <li>Privacy</li>
          </div> */}
          <div className={styles.navAccess}>
            <div className={styles.joinDis}>
              <h3>Discord Community</h3>
              <p>150 members</p>
              <button>
                Join
                <BiRightArrowAlt size={"medium"} />
              </button>
            </div>
            <div className={styles.logOut}>
              <button>
                Log Out <FiLogOut style={{ fontSize: "20px" }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseNav;
