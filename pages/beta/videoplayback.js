import Image from "next/image";
import laptop from "@/public/pagesgraphics/student/videoplayback/Group 11.svg";
import { AiFillLock, AiOutlineLock } from "react-icons/ai";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { db } from "@/config/firebaseconfig";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  arrayUnion,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import Dashboardnav from "@/components/common/navbar/dashboardnav";
import CourseVideoPlayer from "@/components/student/courses/videoplayer";
import { useMediaQuery } from "react-responsive";
import CourseoverviewSidebar from "@/components/common/sidebar/courseoverview";
import { useAuthContext } from "@/lib/context/AuthContext";
import withStudentAuthorization from "@/lib/HOC/withStudentAuthorization";
import withAll from "@/lib/HOC/withAll";
import ToastMessage from "@/components/common/ToastMessage/ToastMessage";
import CourseAccess from "@/lib/context/AccessCourseContext";
import { BsFillPlayFill } from "react-icons/bs";

const VideoPlayer = ({ videoUrl }) => {
  return (
    <video controls>
      <source src={videoUrl} type="video/mp4" />
    </video>
  );
};

async function checkUserJoinedCourse(courseId, userId) {
  const courseRef = doc(db, "allusers", userId, "joinedCourses", courseId);

  const courseDoc = await getDoc(courseRef);
  return courseDoc.exists();
}

const Accordion = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-2 px-5 rounded-md md:w-[28rem] max-w-md overflow-hidden">
      <h2 id="accordion-flush-heading-1">
        <button
          type="button"
          className="flex items-center justify-between w-[68%] overflow-hidden py-2 font-medium text-left "
          data-accordion-target="#accordion-flush-body-1"
          aria-expanded="true"
          aria-controls="accordion-flush-body-1"
          onClick={() => setOpen(!open)}
        >
          <span>{title}</span>
          <svg
            data-accordion-icon=""
            className={`w-3 h-3 ${open ? "rotate-180" : ""}  shrink-0`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id="accordion-flush-body-1"
        className={`${open ? "" : "hidden"}`}
        aria-labelledby="accordion-flush-heading-1"
      >
        <div className="py-3">{children}</div>
      </div>
    </div>
  );
};

function Videos() {
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  // const [currentModule, setCurrentModule] = useState(null);
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const { user, userProfile } = useAuthContext();
  const [currentarray, setCurrentArray] = useState([""]);
  const [showModal, setShowModal] = useState(false);
  const { userSubsribed, isTrialValid } = CourseAccess(user?.uid);

  useEffect(() => {
    const checkJoined = async () => {
      const isJoined = await checkUserJoinedCourse(course.id, user.uid);
      setIsJoined(isJoined);
    };
    if (course?.id) {
      checkJoined();
    }
  }, [course?.id, user.uid]);

  const router = useRouter();
  const title = router.query.title ? router.query.title : "Basics of C++";

  const startVideoStream = (videoUrl) => {
    console.log(modules[0].video);
    // setCurrentModule(<VideoPlayer videoUrl={videoUrl} />);
    setVideoUrl(videoUrl);
  };

  const styles = `

  .lockedClass{
    filter:blur(1.4px);
  }
  .unblur{
    filter:none;
  }
`;

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseRef = collection(db, "courses");
        const q = query(courseRef, where("title", "==", title));
        const courseDocs = await getDocs(q);
        if (courseDocs.empty) {
          setCourse(null);
        } else {
          var courseData;
          courseDocs.forEach((doc) => {
            courseData = doc.data();
          });
          console.log(courseData);
          // const courseData = courseDocs.docs[0]._document.data.value.mapValue.fields;
          setModules(courseData.modules);
          setCourse(courseData);
          setVideoUrl(courseData.modules[0].video[0]);
          const userRef = doc(db, "allusers", courseData.mentorid); // searching if user exists or not
          const docSnap = await getDoc(userRef).then((docsnap) => {
            if (docsnap.exists()) {
              const userd = docsnap.data();
              setCurrentArray(userd.joinedStudents);
            } else {
              setCurrentArray([]);
              console.log("user not found");
            }
          });
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
        // setCourse(null);
      }
    };

    if (title) {
      fetchCourseData();
    }
  }, [title]);

  //check and set the eligibility for the course access through context
  // useEffect(() => {

  // }, []);

  const fetchsubsdata = CourseAccess(user.uid).userSubsribed;

  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }

  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }
  }, [isMediumScreen]);

  //securedroute

  if (!user || !userProfile) {
    router.push("/");
  }

  async function joinCourseChat() {
    const groupRef = doc(db, "chatGroups", course.id);

    await updateDoc(doc(collection(db, "chatGroups"), course.id), {
      members: arrayUnion(user.uid),
    });

    await setDoc(doc(db, "allusers", user.uid, "joinedCourses", course.id), {
      id: course.id,
      title: course.title,
      joinedAt: serverTimestamp(),
    });

    await updateDoc(doc(db, "courses", course.id), {
      students: arrayUnion(user.uid),
    });

    // const mentorRef = doc(db, "allusers", course.mentorid);
    // // const courseRef = doc(db, "courses", course.uid);

    // const d = {
    //   courseId: course.id,
    //   studentId: user.uid,
    //   joinedAt: new Date(),
    // };

    // let joinedStudents = [];
    // if(currentarray.length > 0){
    //   currentarray.map((item) => {
    //     joinedStudents.push(item);
    //   });
    // }
    // joinedStudents.push(d);

    // const joindData = {
    //   joinedStudents,
    // };

    // await updateDoc(mentorRef, joindData);
    setIsJoined(true);
  }


  return (
    <>
      {showModal && (
        <ToastMessage
          heading={"OOPS!"}
          message={
            "You have not joined any courses yet. Please join a course to access this course."
          }
        />
      )}

      {!isTrialValid && !userSubsribed ? <ToastMessage
        heading={"OOPS!"}
        message={
          "Your Trail Period has been over. Please subsribe to continue."
        }
      /> : null}

      {/* <div className={`
       ${!userSubsribed ? "blur-lg" : null }
      `}> */}
      <style>{styles}</style>
      <div>
        <div
          className={`flex bg-[rgb(21 22 27 / var(--tw-bg-opacity))] ${showModal ? "blur-lg" : null
            } ${!isTrialValid && !userSubsribed ? "blur-sm" : null}`}
        >
          {isMobileScreen && (
            <div
              className={`fixed right-0 ${SideBarState ? "block" : "hidden"
                } w-[281px] h-screen bg-[#25262C]  rounded-l-[40px] z-10`}
            >
              <CourseoverviewSidebar toggleSideBar={toggleSideBar} />
            </div>
          )}

          {/* Second Sidebar - Visible on Desktop */}
          {!isMobileScreen && (
            <div className={`md:block  hidden w-[221px] bg-[#141518] z-10`}>
              <CourseoverviewSidebar toggleSideBar={toggleSideBar} />
            </div>
          )}

          <div className="w-full  min-h-screen  md:rounded-l-3xl bg-[#2D2E35]">
            <Dashboardnav heading="My Course" toggleSideBar={toggleSideBar} />
            <div className="flex  bg-[#373A41] rounded-2xl p-4 mx-4 md:mx-8 justify-between  my-6">
              <div className="flex ">
                <Image
                  src={laptop}
                  className=" w-14 h-14"
                  alt=""
                  width={10}
                  height={10}
                />
                <div className="text-white mx-2">
                  <h2 className="">{course?.title}</h2>
                  <p className="opacity-30">{course?.category}</p>
                </div>
              </div>
              <button
                className="px-6 py-1 bg-primary text-white my-1 mr-3 rounded-full hover:scale-105 duration-100 transition-transform hover:shadow-md   disabled:opacity-50 disabled:hover:scale-100"
                onClick={() => {
                  userSubsribed ? joinCourseChat() : setShowModal(true);
                }}
                disabled={isJoined}
              >
                {isJoined ? "Joined" : "Join"}
              </button>
              {/* <div className="w-28 md:w-14 md:mr-8 flex items-center justify-center ">
            <CircularProgressbarWithChildren
            value={100}
            styles={buildStyles({
              pathColor: "#ADADB0",
              trailColor: "gray",
              strokeLinecap: "round",
            })}
            >
            <CircularProgressbar
            value={75}
            text={`${75}%`}
            styles={buildStyles({
              pathColor: "#E1348B",
              trailColor: "transparent",
              strokeLinecap: "round",
              textColor: "#fff",
              textSize: "20px",
            })}
            />
            </CircularProgressbarWithChildren>
          </div> */}
            </div>

            <div className="flex mx-4 md:mx-8 my-6">
              <div className="grid  grid-cols-7 md:gap-10 gap-10 w-full">
                <div className="md:col-span-5 col-span-7 py-5">
                  {videoUrl ? (
                    <video
                      src={videoUrl}
                      controls
                      className="max-h-[30rem] pb-5"
                    />
                  ) : (
                    <div className="h-[300px] text-gray-500  items-center justify-center flex text-center">
                      <div>No video selected yet or video not found</div>
                    </div>
                  )}
                  {/* <div
                className="md:mt-0 mt-10"
                style={{
                  width: "356px",
                  
                  fontFamily: "Inter",
                  fontStyle: "normal",
                  fontWeight: 500,
                  fontSize: "24px",
                  
                  color: "#FFFFFF",
                }}
                >
                {currentModule}
              </div> */}
                  <div className="text-white">
                    <h1 className="text-2xl">{course?.title}</h1>
                    <p className="opacity-50  pb-2">{course?.desc}</p>
                  </div>
                </div>

                <div className="md:col-span-2 col-span-7  rounded-2xl bg-[#373A41] text-white text-center scrollbar-hide overflow-y-scroll h-[450px]">
                  <div className="bg-[#E1348B] p-2 text-xl  h-[7vh]">
                    <h2>Course Content</h2>
                  </div>

                  <div class="h-fit self-start w-full overflow-hidden">
                    {modules?.map((module, ind) => {
                      return (
                        <Accordion key={ind} title={module.name}>
                          <div className="flex flex-col gap-2 ">
                            {module.video.map((video, i) => {
                              return (
                                <>
                                  <div className="flex relative">
                                    <button
                                      onClick={() => {
                                        setVideoUrl(video);
                                      }}
                                      disabled={
                                        !(i <= 1 && ind == 0) && !isJoined
                                      }
                                      className={`flex items-center text-white/80 hover:text-white  ${(!(i <= 1 && ind == 0) && !isJoined) ? "blur-sm" : null
                                        }`}
                                      key={i}
                                    >
                                      <BsFillPlayFill className="mr-2" />
                                      <p className="truncate max-w-[15rem]">
                                        {module.name} video {i + 1}
                                      </p>
                                    </button>
                                    <p
                                      className={`absolute overflow-auto flex ${isJoined ? "hidden" : null
                                        } ${i <= 1 && ind == 0 ? "hidden" : null
                                        }`}
                                    >
                                      Join To Access
                                      <AiOutlineLock className="text-xl mt-2 unblur" />
                                    </p>
                                  </div>
                                </>
                              );
                            })}

                            {/* <div key={i} className="h-fit">
                        <div
                          className="justify-between hover:bg-[#585d67] bg-[#373A41] p-3 border-b border-slate-500 flex h-fit cursor-pointer"
                          onClick={() => startVideoStream(m.video)}
                          >
                          <p>{m.name}</p>
                          <IoIosArrowForward></IoIosArrowForward> */}
                          </div>
                        </Accordion>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div>
              {/* <div className="block md:hidden  text-white text-center overflow-y-scroll h-[520px]">
            <div className="bg-[#E1348B] p-2 text-xl rounded-t-2xl ">
            <h2>Course Content</h2>
            </div>
            {[0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1].map((val, index, arr) => {
              if (index != arr.length - 1) {
                if (val == 0) {
                  return (
                    <div key={index}>
                    <div className="justify-between hover:bg-[#585d67] bg-[#373A41] p-3 border-b border-slate-500 flex ">
                    <p>Introduction to Course</p>
                    <IoIosArrowForward></IoIosArrowForward>
                    </div>
                    </div>
                    );
                      }
                      return (
                        <div key={index}>
                        <div className="justify-between hover:bg-[#585d67] bg-[#373A41] opacity-50 p-3 border-b border-slate-500 flex ">
                        <p>Introduction to Course</p>
                        <AiFillLock></AiFillLock>
                    </div>
                    </div>
                    );
              } else {
                if (val == 0) {
                  return (
                    <div key={index}>
                    <div className="justify-between hover:bg-[#585d67] bg-[#373A41] p-3 border-b border-slate-500 flex rounded-b-2xl">
                    <p>Introduction to Course</p>
                    <IoIosArrowForward></IoIosArrowForward>
                    </div>
                    </div>
                    );
                  }
                  return (
                    <div key={index}>
                    <div className="justify-between hover:bg-[#585d67] bg-[#373A41] p-3 border-b opacity-50 border-slate-500 flex rounded-b-2xl">
                    <p>Introduction to Course</p>
                    <AiFillLock></AiFillLock>
                    </div>
                    </div>
                    );
                  }
                })}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default withAll(Videos);
