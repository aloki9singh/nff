// dynamic navbar missing
// drag and drop feature missing
// upload through url not working
// file icon missing

import { useState, useEffect } from 'react';
import CourseoverviewSidebar from '@/components/common/sidebar/courseoverview';
import { BiBell } from 'react-icons/bi';
import { BsPersonCircle } from 'react-icons/bs';
import Image from 'next/image';
// import Draganddrop from "../components/Student/Draganddrop";
import { ref } from 'firebase/storage';
import { storage } from '@/config/firebaseconfig';
import { useRouter } from 'next/router';
import { useMediaQuery } from "react-responsive";
import Dashboardnav from '@/components/common/navbar/dashboardnav';
import withStudentAuthorization from '@/lib/HOC/withStudentAuthorization';
import { db } from '@/config/firebaseconfig';
import { useAuthContext } from '@/lib/context/AuthContext';
import { uploadBytes } from 'firebase/storage';
// import MobileNav from "../components/CalenderParts/MobileNav";
import IDdraganddrop from '@/components/student/assignments/iddraganddrop';
import { Controller, useForm } from 'react-hook-form';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useCallback } from 'react';

const Assignmentupload = () => {
  const router = useRouter();
  const [file, setFile] = useState('');
  const [uploadState, setUploadState] = useState('neutral');
  const [title, setTitle] = useState('');
  const [maximumMarks, setMaximumMarks] = useState(null);
  const [submissionDate, setSubmissionDate] = useState(null);
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);
  const { id, courseid } = router.query
  const [course, setCourse] = useState()
  const { user } = useAuthContext()
  const [link, setLink] = useState("")
  const [progressData, setProgress] = useState()
  const [url, setUrl] = useState()
  const [key, setkey] = useState()

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const getData = async () => {
    const courseRef = doc(db, "courses", courseid);
    const courseInfo = await getDoc(courseRef);

    if (courseInfo.exists()) {
      const assignmentRef = collection(courseRef, "assignment");
      const q = query(assignmentRef, where("id", "==", id));
      const querySnapshot = await getDocs(q);

      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });

      setCourse(arr)
    } else {
      console.log("Course not found.");
    }
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const data = {
      title,
      course: optionSelected,
      module: optionSelected,
      maximumMarks,
      submissionDate,
      fileURL,
    };
    //   fetch('/api/course_assignments', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log(data);
    //     });
    //   setTitle('');
    //   setMaximumMarks(null);
    //   setSubmissionDate(null);
  };
  const storageRef = ref(storage, `assignment/${file.name}`);
  const uploadFile = useCallback(async () => {
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress(progress)
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
        });
      }
    );
  }, [file]);
  useEffect(() => {
    if (file) {
      uploadFile();
    }
  }, [file, uploadFile])
  const uploadAssignmentFile = async () => {
    if (link.length < 1) {
      alert("Enter a valid link")
    }
    else {
      try {
        console.log('here');
        uploadBytes(storageRef, file)
          .then(() => console.log('success'))
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    }
  };
  let [searchstate, setsearchstate] = useState('');
  let searchfun = (e) => {
    setsearchstate(e.target.value);
  };
  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }
    getData()
  }, [isMediumScreen]);
  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }
  const time = course && new Date(course[0]?.date.seconds * 1000 + course[0]?.date.nanoseconds / 1000000);
  console.log(file)

  return (
    <div className="flex">
      {isMobileScreen && (
        <div
          className={`fixed right-0 ${SideBarState ? "block" : "hidden"} w-[281px] h-screen bg-[#25262C]  rounded-l-[40px] z-10`}
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
      <div className="flex-grow md:bg-[#2E3036] bg-[#141518]">
        {/* <StudentTopbar heading={"My Progress"} /> */}
        <div className="flex justify-between  top-0 md:border-b-[1px] border-b-[2px] border-[#717378]">
          <Dashboardnav heading="Homework" toggleSideBar={toggleSideBar} />
        </div>

        <div className="md:h-screen bg-[#37383F] m-5 rounded-[30px] text-white space-y-6 pb-20">
          <div className="text-left  p-5  ">
            <div className="ml-5 space-x-3 text-sm md:text-lg">
              {' '}
              <span>{course && course[0]?.module}</span>
              <span>{'>'}</span>
              <span>Files</span> <span>{'>'}</span>
              <span>{course && course[0]?.title}</span>
            </div>
            <hr className="hidden lg:block opacity-50 m-3"></hr>
          </div>

          <div className="my-10 mx-8 space-y-8 md:mx-20 md:ml-30">
            <div className="">
              <div className="flex space-x-5 relative">
                <Image
                  src={'/componentsgraphics/mentor/FolderNotch.svg'}
                  width="100"
                  height="100"
                  alt=""
                  className="w-[60px]"
                />
                <span className="md:text-[25px] m-auto">{course && course[0]?.title}</span>
              </div>
              <div className="opacity-50 text-sm mt-5">
                {' '}
                Deadline : {time && time.toDateString()} <span className="ml-2"></span> Time : {time && time.toTimeString()}
              </div>
            </div>
            <div className="flex justify-between px-2.5 md:px-5 py-5 border border-solid border-[#505057] border-opacity-80 rounded-[20px] ">
              <div className="mt-1 md:text-[17px] text-[12px]">
                Assignment Pdf
              </div>
              <button className="bg-[#505057] rounded-10 px-1.5 md:px-2 text-xs md:text-[17px]" onClick={() => router.push(course[0]?.url)}>
                Download
              </button>
            </div>
            <div>Submit Your Assignment</div>
            <div className=" justify-between  p-5 border border-solid border-[#505057] border-opacity-80 rounded-[20px] ">
              <div className="md:w-[60%] mx-auto md:m-auto w-[80%]">
                {/* <Controller
                  control={control}
                  name="profilePhoto"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <IDdraganddrop
                      setValue={setValue}
                      name="file"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={file}
                    />
                  )}
                /> */}
                <div className='w-full  flex justify-center'>
                  <div className='mt-10 flex items-center p-8 w-[80%]  h-48 rounded-lg border-2 border-[#5F6065] '>
                    <input type='file' key={key} id='file' className='w-full h-full border-dashed border-2 rounded-xl bg-[#505057]' onChange={handleChange} hidden />
                    <label htmlFor='file' className='w-full h-full flex flex-col items-center justify-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='white'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='feather feather-folder w-12 h-12 mb-2'>
                        <path d='M22 11V6c0-1.1-.9-2-2-2H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-5' />
                        <rect x='2' y='2' width='20' height='8' rx='2' ry='2' />
                      </svg>

                      <p className='text-white text-center mt-2 text-xs'>
                        Click to Upload or drag and drop
                      </p>
                      <p className='text-white text-center text-xs mt-1'>
                        pdf, word document (max 2-5 MB)
                      </p>
                      {file?.name}<br />
                      {progressData && `${progressData}% done`}
                    </label>
                  </div>
                </div>
                <div className="space-y-4 ">
                  <div className="mt-3">or attach URL of work</div>
                  <div className="flex justify-between px-5 py-3 bg-[#505057] rounded-[20px] ">
                    <input
                      className="outline-none bg-[#505057] w-full md:text-[16px] text-[14px]"
                      placeholder="Add file URL"
                      value={link}
                      onChange={() => setLink(e.target.value)}
                    />
                    <button
                      onClick={uploadAssignmentFile}
                      className="bg-[#373A41] rounded-10 p-2 text-xs md:text-sm"
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withStudentAuthorization(Assignmentupload);

