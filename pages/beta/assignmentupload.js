// dynamic navbar missing
// drag and drop feature missing
// upload through url not working
// file icon missing

import { useState } from 'react';
import CourseoverviewSidebar from '@/components/common/sidebar/courseoverview';
import { BiBell } from 'react-icons/bi';
import { BsPersonCircle } from 'react-icons/bs';
import Image from 'next/image';
// import Draganddrop from "../components/Student/Draganddrop";
import { ref } from 'firebase/storage';
import { storage } from '@/config/firebaseconfig';
import { useRouter } from 'next/router';
// import MobileNav from "../components/CalenderParts/MobileNav";

const Assignmentupload = () => {
  const router = useRouter();
  const [file, setFile] = useState('');
  const [uploadState, setUploadState] = useState('neutral');
  const [title, setTitle] = useState('');
  const [maximumMarks, setMaximumMarks] = useState(null);
  const [submissionDate, setSubmissionDate] = useState(null);
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
  return (
    <div className="flex">
      <div className="lg:col-span-1 hidden lg:grid">
        <CourseoverviewSidebar pathname={router.pathname} />
      </div>
      <div
        style={{ background: '#2E3036' }}
        className="flex flex-col col-span-5 lg:col-span-4 w-full min-h-screen"
      >
        <div className="flex justify-between lg:flex pt-6">
          <h1 className="text-white my-auto ml-12 md:text-2xl text-[19px]">
            Homework
          </h1>
          <div className="mr-12 flex">
            <div className=" xl:w-96">
              <form className=" items-center hidden md:block ">
                <label for="voice-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="voice-search"
                    className="bg-transparent  border border-gray-300 text-slate-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search..."
                    required
                    value={searchstate}
                    onChange={searchfun}
                  />
                </div>
              </form>
            </div>

            <div className="ml-12 flex space-x-4">
              <BiBell className="text-white text-2xl my-auto" />
              <BsPersonCircle className="text-white text-4xl" />
            </div>
          </div>
        </div>
        <hr className="hidden lg:block opacity-50 m-3"></hr>
        <div className="h-full bg-[#37383F] m-5 rounded-[30px] text-white space-y-6 pb-20">
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
                  src={'/pagesgraphics/student/assignmentupload/folderpink.png'}
                  width="100"
                  height="100"
                  alt=""
                  className="w-[60px]"
                />
                <Image
                  src={
                    '/pagesgraphics/student/assignmentupload/folderpinkarrow.png'
                  }
                  width="100"
                  height="100"
                  alt=""
                  className="w-[30px] top-[-8px] left-[-20px] absolute"
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

export default Assignmentupload;
