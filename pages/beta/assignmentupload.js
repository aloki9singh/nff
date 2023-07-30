// dynamic navbar missing
// drag and drop feature missing
// upload through url not working
// file icon missing

import { useState, useEffect } from "react";
import CourseoverviewSidebar from "@/components/common/sidebar/courseoverview";
import { BiBell } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import Image from "next/image";
import { ref } from "firebase/storage";
import { storage } from "@/config/firebaseconfig";
import { useRouter } from "next/router";

import { useMediaQuery } from "react-responsive";
import Dashboardnav from "@/components/common/navbar/dashboardnav";
import withStudentAuthorization from "@/lib/HOC/withStudentAuthorization";
import { db } from "@/config/firebaseconfig";
import { useAuthContext } from "@/lib/context/AuthContext";
import { uploadBytes } from "firebase/storage";
// import MobileNav from "../components/CalenderParts/MobileNav";
import IDdraganddrop from "@/components/student/assignments/iddraganddrop";
import { Controller, useForm } from "react-hook-form";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useCallback } from "react";
import Link from "next/link";

const Assignmentupload = () => {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [uploadState, setUploadState] = useState("neutral");
  const [title, setTitle] = useState("");
  const [maximumMarks, setMaximumMarks] = useState(null);
  const [submissionDate, setSubmissionDate] = useState(null);
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);
  const { id, courseid } = router.query;
  const [course, setCourse] = useState();
  const { user } = useAuthContext();
  const [link, setLink] = useState("");
  const [progressData, setProgress] = useState();
  const [url, setUrl] = useState();
  const [key, setkey] = useState();
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUrl(null);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (link || url) {
      course[0].file = url ? url : link;
      const files = [];
      if (course[0].files) {
        course[0].files.map((ele) => {
          files.push(ele);
        });
      }
      const courseRef = doc(db, "courses", courseid);
      const courseInfo = await getDoc(courseRef);
      const data = {
        submittedby: user.uid,
        file: url ? url : link,
        date: new Date(),
      };
      files.push(data);
      course[0].files = files;

      if (courseInfo.exists()) {
        try {
          const assignmentRef = collection(courseRef, "assignment");
          const q = query(assignmentRef, where("id", "==", id));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            const docRef = doc.ref;
            updateDoc(docRef, course[0]);
          });
          alert("Successfully Submitted");
        } catch (err) {
          alert("Error Occured");
        }
        router.push("/beta/assigments")
        setkey(key + 1);
        setFile("");
        setUrl("");
        setProgress();
      } else {
        console.log("Course not found.");
      }
    }
    else {
      alert("Enter a valid File")
    }
  };

  // const storageRef = ref(storage, `assignment/${file.name}`);
  // const uploadFile = useCallback(async () => {
  //   const uploadTask = uploadBytesResumable(storageRef, file);
  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const progress =
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       // console.log("Upload is " + progress + "% done");
  //       setProgress(progress);
  //     },
  //     (error) => {
  //       console.log(error);
  //     },
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         setUrl(downloadURL);
  //       });
  //     }
  //   );
  // }, [file]);

  const uploadFile = useCallback(async () => {
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }

    try {
      const storageRef = ref(storage, `assignment/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.error("Upload error:", error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setUrl(downloadURL);
        }
      );
    } catch (error) {
      console.error("Error during upload:", error);
    }
  }, [file]);

  useEffect(() => {
    if (file) {
      uploadFile();
    }
  }, [file, uploadFile]);

  const uploadAssignmentFile = async () => {
    if (link.length < 1) {
      console.log("Invalid Link")
    } else {
      try {
        // console.log("here");
        const storageRef = ref(storage, `assignment/`)
        uploadBytes(storageRef, link)
          .then(() => console.log("success"))
          .catch((err) => console.log(err));

      } catch (err) {
        console.log(err);
      }
    }
  };
  let [searchstate, setsearchstate] = useState("");
  let searchfun = (e) => {
    setsearchstate(e.target.value);
  };
  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }
    const getData = async () => {
      const courseRef = doc(db, "courses", courseid);
      const courseInfo = await getDoc(courseRef);

      if (courseInfo.exists()) {
        try {
          const assignmentRef = collection(courseRef, "assignment");
          const q = query(assignmentRef, where("id", "==", id));
          const querySnapshot = await getDocs(q);
          const arr = [];
          querySnapshot.docs.forEach((doc) => {
            if (doc.data().files) {
              setSubmitted(
                doc.data().files.map((ele) => {
                  if (ele.submittedby == user.uid) {
                    return true;
                  }
                })
              );
            }
            arr.push(doc.data());
          });

          setCourse(arr);
        } catch (err) {
          alert("Error occured");
        }
      } else {
        console.log("Course not found.");
      }
    };
    getData();
  }, [isMediumScreen, courseid, id, user.uid]);
  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }

  const handleCancel = () => {
    setFile(null);
    setUrl(null);
    setProgress(0);
  };

  const time =
    course &&
    new Date(
      course[0]?.date.seconds * 1000 + course[0]?.date.nanoseconds / 1000000
    );

    console.log(course)

  return (
    <div className="flex">
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
      <div className="flex-grow bg-[#2E3036]">
        {/* <StudentTopbar heading={"My Progress"} /> */}
        <div className="flex justify-between  top-0 md:border-b-[1px] border-b-[2px] border-[#717378]">
          <Dashboardnav heading="Homework" toggleSideBar={toggleSideBar} />
        </div>

        <div className=" bg-[#37383F] m-5 rounded-[30px] text-white space-y-6 pb-20">
          <div className="text-left  p-5  ">
            <div className="ml-5 space-x-3 text-sm md:text-lg">
              {" "}
              <span
                className="cursor-pointer"
                onClick={() => {
                  router.push("/beta/assignments");
                }}
              >
                {course && course[0]?.module}
              </span>
              <span>{">"}</span>
              <span
                className="cursor-pointer"
                onClick={() => {
                  router.push("/beta/assignments");
                }}
              >
                Files
              </span>{" "}
              <span>{">"}</span>
              <span>{course && course[0]?.title}</span>
            </div>
            <hr className="hidden lg:block opacity-50 m-3"></hr>
          </div>

          <div className="my-10 mx-8 space-y-8 md:mx-20 md:ml-30 overflow-scroll scrollbar-hide ">
            <div className="">
              <div className="flex space-x-5 relative">
                <Image
                  src={"/componentsgraphics/mentor/FolderNotch.svg"}
                  width="100"
                  height="100"
                  alt=""
                  className="w-[60px]"
                />
                <span className="md:text-[25px] m-auto">
                  {course && course[0]?.title}
                </span>
              </div>
              <div className="opacity-50 text-sm mt-5">
                {" "}
                Deadline : {time && time.toDateString()}{" "}
                <span className="ml-2"></span> Time :{" "}
                {time && time.toTimeString()}
              </div>
            </div>
            <div className="flex justify-between px-2.5 md:px-5 py-5 border border-solid border-[#505057] border-opacity-80 rounded-[20px] ">
              <div className="mt-1 md:text-[17px] text-[12px]">
                Assignment Pdf
              </div>

              <Link
                className="bg-[#505057] rounded-10 pt-2 px-1.5 md:px-2 text-xs md:text-[17px]"
                href={""}
                target="_blank"
                rel="noopener noreferrer"
                download ={course && `${course[0].title}.pdf`}
              >
                Download
              </Link>
            </div>
            <div>Submit Your Assignment</div>
            <div className=" justify-between  p-5 border border-solid border-[#505057] border-opacity-80 rounded-[20px] ">
              <form
                className="md:w-[60%] mx-auto md:m-auto w-full"
                onSubmit={onSubmitHandler}
              >
                <div className="w-full  flex justify-center">
                  <div className="mt-10 flex items-center p-8 w-[80%]  h-48 rounded-lg border-2 border-[#5F6065] ">
                    <input
                      type="file"
                      key={key}
                      id="file"
                      disabled={submitted || link ? true : false}
                      className="w-full h-full border-dashed border-2 rounded-xl bg-[#505057]"
                      onChange={handleChange}
                      hidden
                    />
                    <label
                      htmlFor="file"
                      className="w-full h-full flex flex-col items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-folder w-12 h-12 mb-2"
                      >
                        <path d="M22 11V6c0-1.1-.9-2-2-2H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-5" />
                        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                      </svg>

                      <p className="text-white text-center mt-2 text-xs">
                        Click to Upload or drag and drop
                      </p>
                      <p className="text-white text-center text-xs mt-1">
                        pdf, word document (max 2-5 MB)
                      </p>
                      <p className="text-center">
                        {file?.name}
                        <br />
                        {progressData && progressData != 0 && `${progressData}% done`}
                      </p>
                      {file && (
                        <p>
                          <button
                            className="border bg-grey p-2 rounded-[10px]"
                            onClick={handleCancel}
                          >
                            Remove
                          </button>
                        </p>
                      )}
                    </label>
                  </div>
                </div>
                <div className="space-y-4  ">
                  <div className="mt-3">or attach URL of work</div>
                  <div className="flex justify-between px-5 py-3 bg-[#505057] rounded-[20px] ">
                    <input
                      className="outline-none bg-[#505057] w-full md:text-[16px] text-[14px]"
                      placeholder="Add file URL"
                      value={link}
                      disabled={file || submitted ? true : false}
                      onChange={(e) => setLink(e.target.value)}
                    />
                    <button
                      onClick={uploadAssignmentFile}
                      className="bg-[#373A41] rounded-10 p-2 text-xs md:text-sm"
                      disabled={file || submitted ? true : false}
                    >
                      Upload
                    </button>
                  </div>
                </div>
                <div class="flex justify-center">
                  <button
                    type="submit"
                    class={`md:mt-10 mt-5 h-10 px-5 text-indigo-100 transition-colors duration-150 bg-[${submitted ? "#505057" : "#E1348B"
                      }] rounded-lg focus:shadow-outline`}
                    disabled={submitted}
                  >
                    {submitted ? " Submitted" : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withStudentAuthorization(Assignmentupload);
