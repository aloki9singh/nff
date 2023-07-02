import { useState, useEffect } from 'react';
import Image from 'next/image';
import { db, storage } from '@/config/firebaseconfig';
import { collection, getDocs, where, query, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import Link from 'next/link';

export default function Uploadvideo() {
  const [leadMentor, setLeadMentor] = useState('');
  const [course, setCourse] = useState('');
  const [courseModule, setCourseModule] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [courseList, setCoursesList] = useState([]);
  const [courseModuleLists, setCourseModuleLists] = useState([])
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [id, setId] = useState('')


  const LeadMentor = ['Ravi', 'Rahul', 'Raj', 'Rajesh', 'Rakesh'];

  useEffect(() => {
    async function fetchData() {
      const courseRef = collection(db, "courses");

      try {
        const querySnapshot = await getDocs(courseRef);
        const coursesData = querySnapshot.docs.map((doc) => doc.data().title);
        setCoursesList(coursesData);

      } catch (error) {
        console.log("Error fetching courses: ", error);
      }
    }
    fetchData();
  }, []);

  const setModulesForCourse = async (e) => {
    setCourse(e.target.value);
    const courseModuleRef = collection(db, "courses");
    const selectedCourse = query(courseModuleRef, where("title", "==", e.target.value));
    try {
      const querySnapshot = await getDocs(selectedCourse);
      if (!querySnapshot.empty) {
        const modulesData = querySnapshot.docs[0].data().modules.map((d) => d.title);
        setCourseModuleLists(modulesData);
        setId(querySnapshot.docs[0].id);
        console.log("modules", querySnapshot.docs[0].data().modules)
      }
    } catch (error) {
      console.log("Error fetching course: ", error);
    }
  };

  function handleFileInputChange(event) {
    const file = event.target.files[0];
    // uploadVideo(file);
    setVideoFile(file)
  }

  async function uploadVideo(file) {
    const storageRef = ref(storage, 'videos/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Handle progress updates here
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setUploadProgress(progress);
      },
      (error) => {
        console.error('Error uploading file:', error);
      },
      async () => {
        console.log('File uploaded successfully');
        setUploadProgress(0);
        setShowSuccessMessage(true);

        const downloadURL = await getDownloadURL(storageRef);
        console.log(downloadURL)
        // Get the document reference
        const courseRef = doc(db, "courses", id);

        // Update the specific object in the modules array with video URL
        try {
          await updateDoc(courseRef, {
            modules: arrayUnion({
              title: courseModule,
              video: downloadURL
            })
          });
          console.log("Module updated successfully");
        } catch (error) {
          console.log("Error updating module:", error);
        }
      }
    );
  }


  return (
    <div className="text-white flex flex-col justify-center items-center">
      <div className="w-screen border-b-2 border-grey text-center">
        <div className=" flex justify-center gap-x-96 items-center">
          <Link href="/">
            <ul>
              <li className="ml-2 md:ml-10 text-2xl uppercase hover:border-b text-white text-center">
                <Image
                  src="/pagesgraphics/common/createcourse/Neatskills.svg"
                  alt="logo"
                  className="w-[100px] h-[43px] md:w-[186px] md:h-[71px]"
                  width={100}
                  height={100}
                />
              </li>
            </ul>
          </Link>
          <div className="justify-start flex gap-2  sm:text-xs  md:text-md">
            <ul className="hidden sm:flex justify-center items-center  text-white sm:gap-0 lg:gap-12 pr-5 ">
              <Link href="/create-category">
                <li className="ml-10 text-md uppercase hover:border-b ">
                  Create Category
                </li>
              </Link>
              <Link href="/create-course">
                <li className="ml-10 text-md uppercase hover:border-b ">
                  Create Course
                </li>
              </Link>
              <Link href="/upload-video">
                <li className="ml-10 text-md uppercase hover:border-b ">
                  Upload video
                </li>
              </Link>
            </ul>
          </div>
        </div>
        {/* end */}
      </div>
      <div className="w-full md:w-10/12 h-max mx-auto px-4 bg-[#222222] rounded-lg mt-4 mb-4">
        <h1 className="text-2xl py-4">Upload Video</h1>
        <hr className="border-x-2 border-gray-500 mb-4" />
        <div className="md:w-1/2 flex items-center gap-x-2 px-4 mb-8">
          <label className="w-1/4 text-xs md:text-base">Lead Mentor:</label>
          <select
            className="AddMentorInput w-full md:w-[284px] h-10 rounded-lg px-2"
            style={{ background: '#333333' }}
            value={leadMentor}
            onChange={(e) => setLeadMentor(e.target.value)}
          >
            {LeadMentor.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="md:w-1/2 flex items-center gap-x-2 px-4 mb-8">
          <label className="w-1/4 text-xs md:text-base">Course:</label>
          <select
            className="AddMentorInput w-full md:w-[600px] h-10 rounded-lg px-2"
            style={{ background: '#333333' }}
            value={course}
            onChange={(e) => setModulesForCourse(e)}
          >
            <option key={"1"} value={""}>
              {"Select Course"}
            </option>
            {courseList.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="md:w-1/2 flex items-center gap-x-2 px-4 mb-8">
          <label className="w-1/4 text-xs md:text-base">Module:</label>
          <select
            className="AddMentorInput w-full md:w-[600px] h-10 rounded-lg px-2"
            style={{ background: '#333333' }}
            value={courseModule}
            onChange={(e) => setCourseModule(e.target.value)}
          >
            {courseModuleLists.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col bg-[#404046] h-fit rounded-lg my-6">
          <p className="px-8 py-4 md:py-6 text-xl">Add Module</p>
          <hr className="border-x-2 border-gray-500 mb-6" />
          <div className="flex flex-col md:flex-row justify-start items-start md:items-center gap-y-2 md:gap-x-2 px-4 mb-8">
            <label htmlFor="">Module Subtitle:</label>
            <input
              type="text"
              placeholder="Type here"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              className="AddMentorInput w-full md:w-3/4 h-10 rounded-lg px-2"
              style={{ background: '#333333' }}
            />
          </div>
          <div className="flex flex-col md:flex-row justify-start items-start md:items-center gap-y-2 md:gap-x-2 px-4 mb-4 md:mb-8">
            <label htmlFor="">Description:</label>
            <textarea
              type="text"
              placeholder="Type here"
              value={videoDescription}
              onChange={(e) => setVideoDescription(e.target.value)}
              className="AddMentorInput w-full h-24 rounded-lg px-4 py-4"
              style={{ background: '#333333' }}
            />
          </div>
          {/* <div className="w-10/12 md:w-7/12 h-28 md:h-36 md:mx-auto flex flex-col justify-center items-center bg-[#505057] border-2 border-dashed border-[#FFFFFF] px-2 py-1 mx-8 mb-4 gap-y-2">
            <Image src={Upload} alt="Upload button" />
            <label style={{ color: 'rgba(255, 255, 255, 0.79)' }}>
              Click to upload Video
            </label>
          </div> */}
          <div className="flex border rounded-2xl  border-[#728095] justify-center">
            <div className="flex flex-col items-center justify-center h-[200px]">
              {/* <input type="file" onChange={handleFileInputChange} /> */}
              <label className="bg-[#E1348B] rounded-lg hover:bg-pink-600 text-white font-bold py-2 px-4 cursor-pointer">
                <span>Upload File</span>
                <input type="file" className="hidden" onChange={handleFileInputChange} />
              </label>
              {uploadProgress > 0 && (
                <div className="w-full mt-4">
                  <div className="h-3 relative max-w-xl rounded-full overflow-hidden">
                    <div className="w-full h-full bg-gray-300 absolute"></div>
                    <div className="h-full bg-blue-500 absolute" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                  <div className="text-gray-400 text-sm mt-2">{uploadProgress.toFixed(0)}%</div>
                </div>
              )}
              {showSuccessMessage && (
                <div className="mt-4 bg-green-500 text-white rounded-full px-4 py-2">
                  Upload completed successfully!
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="w-1/2 md:w-2/12 h-10 bg-[#E1348B] rounded-lg mb-6"
            onClick={() => uploadVideo(videoFile)}
          >
            Upload Video
          </button>
        </div>
      </div>
    </div>
  );
}
