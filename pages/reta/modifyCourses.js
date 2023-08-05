import React, { useEffect, useState } from "react";
import desktop from "@/public/componentsgraphics/student/courses/header/desktopicon.svg";
import laptop from "@/public/componentsgraphics/student/courses/header/laptopicon.svg";
import { useMediaQuery } from "react-responsive";
import CourseList from "@/components/student/courses/list2";
import withMentorAuthorization from "@/lib/HOC/withMentorAuthorization.js";
import { callUserById } from "@/lib/exportablefunctions";
import { auth } from "@/config/firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import { db } from "@/config/firebaseconfig";
import { useRouter } from "next/router";
import { collection, getDocs } from "firebase/firestore";
import withAdminAuthorization from "@/lib/HOC/withAdminAuthorization";
import AdminSidebar from "@/components/common/sidebar/admin";
import AdminTopbar from "@/components/common/navbar/admintopbar";
import Layout from "@/components/common/Layout/Layout";

function ModifyCourses() {
  const router = useRouter();

  const [verified, setVerified] = useState();
  const [courses, setCourses] = useState();
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);

  useEffect(() => {
    const getCourseData = async () => {
      try {
        const CoursesCollectionref = collection(db, "courses");
        const coursesSnapshot = await getDocs(CoursesCollectionref);
        const coursesData = JSON.stringify(
          coursesSnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              title: doc.data().title,
              desc: doc.data().desc,
              level: doc.data().level,
              sessions: doc.data().lectures,
              language: doc.data().language,
              category: doc.data().category,
              banner: doc.data().banner,
            };
          })
        );
        setCourses(JSON.parse(coursesData));
      } catch (error) {
        console.error(error);
        setCourses([]);
      }
    };

    getCourseData();
  }, []);

  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }

  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        user.emailVerified = true;
        const value = await callUserById(user.uid);
        setVerified(value?.user?.verified);
      }
    });

    return () => unsubscribe(); // Cleanup the listener
  }, [isMediumScreen]);

  // if (!verified) {
  //   return null;
  // }

  return (
    <Layout pageTitle="Modify Courses">
      <div className="h-full w-full text-base bg-[#2E3036] ">
        <div className="flex">
          {/* First Sidebar - Visible on Mobile */}
          {isMobileScreen && (
            <div
              className={`fixed right-0 ${
                SideBarState ? "block" : "hidden"
              } w-[281px] h-screen bg-[#25262C]  rounded-l-[40px] z-10`}
            >
              <AdminSidebar toggleSideBar={toggleSideBar} />
            </div>
          )}

          {/* Second Sidebar - Visible on Desktop */}
          {!isMobileScreen && (
            <div className={`md:block  hidden w-[221px] bg-[#141518] z-10`}>
              <AdminSidebar toggleSideBar={toggleSideBar} />
            </div>
          )}
          <div className="flex-grow md:rounded-tl-[40px] w-[78%]">
            <div className="flex justify-between md:bg-[#2E3036] bg-[#141518] md:pt-0  top-0 md:border-b-[1px]  border-b-[2px] border-[#717378] md:rounded-tl-[40px]">
              <AdminTopbar
                heading="Modify Course"
                toggleSideBar={toggleSideBar}
              />
            </div>
            <div className="text-white">
              <div className="flex flex-col items-center max-w-[630px]  mx-auto relative pt-20 pb-10 px-10">
                <h2 className="text-4xl font-medium text-center mb-12 pb-8">
                  Have a New Course in Mind?
                </h2>

                <button
                  className="bg-[#a145cd] rounded-2xl font-semibold text-sm text-white py-4 px-4"
                  onClick={() => router.push("/reta/addcourse")}
                >
                  Add Course
                </button>
                <div className="item-center">
                  <Image
                    src={laptop}
                    alt="laptop"
                    className="absolute md:right-16  right-6 bottom-9 w-16"
                  />
                  <Image
                    src={desktop}
                    alt="desktop"
                    className="absolute left-16 bottom-11 w-10"
                  />
                </div>
              </div>
            </div>
            <CourseList courses={courses} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default withAdminAuthorization(ModifyCourses);
