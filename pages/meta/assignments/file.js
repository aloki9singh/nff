import { useState } from "react";
import MentorSidebar from "@/components/common/sidebar/mentor";
import MentorTopbar from "@/components/common/navbar/mentortopbar";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { auth } from "@/config/firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";
import { callUserById } from "@/lib/exportablefunctions";
import { useMediaQuery } from "react-responsive";
import {
  collection,
  getDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@/config/firebaseconfig";
import Layout from "@/components/common/Layout/Layout";

function Homework() {
  //set Below two for marked homework
  const [verified, setVerified] = useState();
  let [searchstate, setsearchstate] = useState("");
  const router = useRouter();
  const { id, courseid, submitid } = router.query;
  const [course, setCourse] = useState();
  const [studentName, setStudent] = useState();
  let searchfun = (e) => {
    setsearchstate(e.target.value);
  };
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);

  const getData = async () => {
    const studentRef = doc(db, "allusers", submitid);
    const studentInfo = await getDoc(studentRef);
    setStudent(studentInfo.data()?.displayName);
    const courseRef = doc(db, "courses", courseid);
    const courseInfo = await getDoc(courseRef);
    if (courseInfo.exists()) {
      try {
        const assignmentRef = collection(courseRef, "assignment");
        const q = query(assignmentRef, where("id", "==", id));
        const querySnapshot = await getDocs(q);
        setCourse(
          querySnapshot.docs.map((doc) => {
            return doc.data().files.filter((data) => {
              return data.submittedby == submitid;
            });
          })
        );
      } catch (err) {
        // alert("Error occured", err);
        console.log(err);
      }
    } else {
      console.log("Course not found.");
    }
  };

  // console.log(course[0][0].file)
  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }
  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }
    getData();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        user.emailVerified = true;
        const value = await callUserById(user.uid);
        setVerified(value.user?.verified);
      }
    });
    return () => unsubscribe(); // Cleanup the listener
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMediumScreen]);

  return (
    <Layout pageTitle="File">
      <div className="h-full text-base bg-[#2E3036] ">
        <div className="flex">
          {/* First Sidebar - Visible on Mobile */}
          {isMobileScreen && (
            <div
              className={`fixed right-0 ${
                SideBarState ? "block" : "hidden"
              } w-[281px] h-screen bg-[#25262C]  rounded-l-[40px] z-10`}
            >
              <MentorSidebar toggleSideBar={toggleSideBar} />
            </div>
          )}

          {/* Second Sidebar - Visible on Desktop */}
          {!isMobileScreen && (
            <div className={`md:block w-[261px]  hidden w-[221px] bg-[#141518] z-10`}>
              <MentorSidebar toggleSideBar={toggleSideBar} />
            </div>
          )}

          <div className="flex-grow md:rounded-tl-[40px] w-full">
            <div className="flex justify-between md:bg-[#2E3036] bg-[#141518] md:pt-0 pt-2 top-0 md:border-b-[1px]  border-b-[2px] border-[#717378] md:rounded-tl-[40px]">
              <MentorTopbar heading="Homework" toggleSideBar={toggleSideBar} />
            </div>
            <div className="w-[90%] mx-auto mt-8 border rounded-[10px] my-4">
              <div className="text-2xl font-semibold text-white p-10">
                File - {studentName}
              </div>
              <hr />
              <iframe
                src={course && course[0][0].file}
                width="100%"
                height="600"
              ></iframe>
              <div className="flex justify-end mx-8 my-8" allowfullscreen>
                <button
                  type
                  className="bg-[#E1348B] text-white px-4 py-2 rounded-md text-sm  flex items-center justify-center"
                  onClick={() =>
                    router.push({
                      pathname: "/meta/assignments/feedback",
                      query: { courseid: courseid, id: id, submitid: submitid },
                    })
                  }
                >
                  Feedback
                </button>
              </div>
              {/* Student File */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Homework;
