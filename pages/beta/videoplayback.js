// import Sidebar from '../components/Sidebar/sidebar';
import Image from 'next/image';
import laptop from '@/public/pagesgraphics/student/videoplayback/Group 11.svg';
import { IoIosArrowForward } from 'react-icons/io';
import { AiFillLock } from 'react-icons/ai';
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { db } from '@/config/firebaseconfig';
import { collection, query, where, getDocs, getDoc } from 'firebase/firestore';
import Sidebar from '@/components/common/sidebar/sidebar';
import Dashboardnav from '@/components/common/navbar/dashboardnav';
import CourseVideoPlayer from '@/components/student/courses/videoplayer';

const VideoPlayer = ({ videoUrl }) => {
  return (
    <video controls>
      <source src={videoUrl} type="video/mp4" />
    </video>
  );
};

export default function Videos() {
  const [course, setCourse] = useState([]);
  const [modules, setModules] = useState([]);
  const [currentModule, setCurrentModule] = useState(null);

  const router = useRouter();
  const title = router.query.title ? router.query.title : 'Basics of C++';
  const fetchCourseData = async () => {
    try {
      const courseRef = collection(db, 'courses');
      const q = query(courseRef, where('title', '==', title));
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
      }
    } catch (error) {
      console.error('Error fetching course data:', error);
      setCourse(null);
    }
  };

  const startVideoStream = (videoUrl) => {
    console.log(modules[0].video);
    setCurrentModule(<VideoPlayer videoUrl={videoUrl} />);
  };

  useEffect(() => {
    if (title) {
      fetchCourseData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex bg-[rgb(21 22 27 / var(--tw-bg-opacity))]">
      <Sidebar />

      <div className="w-full  min-h-screen md:h-[100vh] md:rounded-l-3xl bg-[#2D2E35]">
        <Dashboardnav heading="My Course" />
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
              <p className="opacity-30">{course?.desc}</p>
            </div>
          </div>
          <div className="w-28 md:w-14 md:mr-8 flex items-center justify-center ">
            <CircularProgressbarWithChildren
              value={100}
              styles={buildStyles({
                pathColor: '#ADADB0',
                trailColor: 'gray',
                strokeLinecap: 'round',
              })}
            >
              <CircularProgressbar
                value={75}
                text={`${75}%`}
                styles={buildStyles({
                  pathColor: '#E1348B',
                  trailColor: 'transparent',
                  strokeLinecap: 'round',
                  textColor: '#fff',
                  textSize: '20px',
                })}
              />
            </CircularProgressbarWithChildren>
          </div>
        </div>

        <div className="flex mx-4 md:mx-8 my-6 ">
          <div className="grid  grid-cols-7 md:gap-10 w-full">
            <div className="md:col-span-5 col-span-7">
              <CourseVideoPlayer url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
              <div
                className=""
                style={{
                  width: '356px',

                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  fontSize: '24px',

                  color: '#FFFFFF',
                }}
              >
                {currentModule}
              </div>
              <div className="text-white">
                <h1 className="text-2xl">{course?.title}</h1>
                <p className="opacity-50  pb-2">{course.desc}</p>
              </div>
            </div>

            <div className="md:col-span-2 col-span-7  rounded-2xl bg-[#373A41] text-white text-center scrollbar-hide overflow-y-scroll h-[450px] ">
              <div className="bg-[#E1348B] p-2 text-xl  h-[7vh]">
                <h2>Course Content</h2>
              </div>

              <div class="h-fit self-start">
                {modules?.map((m, i) => {
                  return (
                    <div key={i} className="h-fit">
                      <div
                        className="justify-between hover:bg-[#585d67] bg-[#373A41] p-3 border-b border-slate-500 flex h-fit cursor-pointer"
                        onClick={() => startVideoStream(m.video)}
                      >
                        <p>{m.title}</p>
                        <IoIosArrowForward></IoIosArrowForward>
                      </div>
                    </div>
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
  );
}
