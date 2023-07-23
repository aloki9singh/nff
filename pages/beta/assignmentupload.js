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
// import MobileNav from "../components/CalenderParts/MobileNav";

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
  const uploadAssignmentFile = async () => {
    try {
      console.log('here');
      uploadBytes(storageRef, file)
        .then(() => console.log('success'))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
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
  }, [isMediumScreen]);
  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }

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
              <span>Module1</span>
              <span>{'>'}</span>
              <span>Files</span> <span>{'>'}</span>
              <span>Assignment-4</span>
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
                <span className="md:text-[25px] m-auto">Assignment-4</span>
              </div>
              <div className="opacity-50 text-sm mt-5">
                {' '}
                Deadline : 10 February, 23 <span className="ml-2"></span> Time :
                10 pm
              </div>
            </div>
            <div className="flex justify-between px-2.5 md:px-5 py-5 border border-solid border-[#505057] border-opacity-80 rounded-[20px] ">
              <div className="mt-1 md:text-[17px] text-[12px]">
                Assignment Pdf
              </div>
              <button className="bg-[#505057] rounded-10 px-1.5 md:px-2 text-xs md:text-[17px] ">
                Download
              </button>
            </div>
            <div>Submit Your Assignment</div>
            <div className=" justify-between  p-5 border border-solid border-[#505057] border-opacity-80 rounded-[20px] ">
              <div className="md:w-[60%] mx-auto md:m-auto w-[80%]">
                {/* <Draganddrop file={file} setFile={setFile} /> */}
                <div className="space-y-4 ">
                  <div className="mt-3">or attach URL of work</div>
                  <div className="flex justify-between px-5 py-3 bg-[#505057] rounded-[20px] ">
                    <input
                      className="outline-none bg-[#505057] w-full md:text-[16px] text-[14px]"
                      placeholder="Add file URL"
                    />
                    <button
                      onClick={uploadAssignmentFile}
                      className="bg-[#373A41] rounded-10 p-2 text-xs md:text-sm  "
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
      {/* <MobileNav className="fixed bottom-0 left-0 w-full" /> */}
    </div>
  );
};

export default withStudentAuthorization( Assignmentupload);

