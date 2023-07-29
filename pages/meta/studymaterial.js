import StudyMaterialCard from "@/components/mentor/studymetrial/card";
import MentorSidebar from "@/components/common/sidebar/mentor";
import MentorTopbar from "@/components/common/navbar/mentortopbar";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";
import withMentorAuthorization from "@/lib/HOC/withMentorAuthorization.js";
import MetrialInfo from "@/components/mentor/studymetrial/metrialinfo";
import { useAuthContext } from "@/lib/context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebaseconfig";
import { getStudyMaterial } from "@/lib/exportablefunctions";

function StudyMaterial() {
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);

  const [material, setMaterial] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const [showStudyMaterialCard, setShowStudyMaterialCard] = useState(true);
  const [showMetrailInfo, setShowMetrailInfo] = useState(false);
  const [modules, setModules] = useState(null);


  const menuItems = [...new Set(material.map((Val) => Val.title))];

  // console.log(menuItems);
  const filteredMaterial = selectedOption
    ? material.filter((item) => item.title === selectedOption)
    : material;

  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }
  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }
    // const unsubscribe = onAuthStateChanged(auth, async (user) => {
    //   if (user) {
    //     user.emailVerified = true;
    //     const value = await callUserById(user.uid);
    //     setVerified(value.user.verified);
    //   }
    // });

    // return () => unsubscribe(); // Cleanup the listener
  }, [isMediumScreen]);

  const handleCardClick = (module) => {
    setSelectedModule(module); // Set the selected module
  };

  const { userProfile } = useAuthContext();

  console.log("userProfile", userProfile);

  const courseID = userProfile?.assignedCourses[0];

  const [courseData, setCourseData] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  console.log("selectedModule", selectedModule);

  console.log("courseData", courseData);
  useEffect(() => {
    if (!courseID) {
      return;
    }

    const sub = onSnapshot(doc(db, "courses", courseID), (doc) => {
      setCourseData(doc.data());
    });

    return sub;
  }, [courseID]);

  useEffect(() => {

    const getModules = async () => {
      const data = await getStudyMaterial(courseID);
      setModules(data)
    };

    if (!courseID) {
      return;
    }

    getModules();
  }, [courseID]);

  console.log("modules", modules)

  if (!courseData || !modules) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full">
      <div className="h-full w-full text-base bg-[#2E3036] ">
        <div className="flex w-full">
          {/* First Sidebar - Visible on Mobile */}
          {isMobileScreen && (
            <div
              className={`fixed right-0 ${SideBarState ? "block" : "hidden"
                } w-[281px] h-screen bg-[#25262C]  rounded-l-[40px] z-10`}
            >
              <MentorSidebar toggleSideBar={toggleSideBar} />
            </div>
          )}

          {/* Second Sidebar - Visible on Desktop */}
          {!isMobileScreen && (
            <div className={`md:block hidden w-[221px] bg-[#141518] z-10`}>
              <MentorSidebar toggleSideBar={toggleSideBar} />
            </div>
          )}

          <div className="flex-grow">
            <div className="flex md:pt-0 pt-2 justify-between md:bg-[#2E3036] bg-[#141518] top-0 md:border-b-[1px] border-b-[2px] border-[#717378]">
              <MentorTopbar
                heading="Study Material"
                toggleSideBar={toggleSideBar}
              />
            </div>

            <div className="w-fit p-8">
              <select
                className="bg-[#A145CD] text-white rounded-xl px-12"
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option disabled selected hidden>
                  Select an option
                </option>
                {menuItems.map((item) => (
                  <option className="p-4" key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* {filteredMaterial.length == 0 ? (
              <div className='text-gray-500 md:h-[55vh] h-screen w-full justify-center flex items-center'>
                {' '}
                No material available currently
              </div>
            ) : (
              <div className='bg-[#2D2E35] text-white grow flex items-center justify-center h-[screen]'>
                <div className='w-[90%] flex md:bg-[#373A41] rounded-[30px] h-full  '>
                  <div className='flex justify-center md:ml-10  flex-wrap md:grid md:gap-x-20 md:gap-y-5 lg:grid-cols-3 md:grid-cols-3 gap-y-5 m-5'>
                    <StudyMaterialCard />
                  </div>
                </div>
              </div>
            )} */}
            {!selectedModule &&
              (
                <div
                  className="bg-[#2D2E35] text-white grow flex items-center justify-center h-full"
                >
                  <div className="w-[90%] flex md:bg-[#373A41] rounded-[30px] h-full  ">
                    <div className="flex justify-center items-stretch md:ml-10  flex-wrap md:grid md:gap-x-20 md:gap-y-5 lg:grid-cols-3 md:grid-cols-3 gap-y-5 m-5">
                      {
                        modules.map((module, index) => (
                          <StudyMaterialCard
                            key={index}
                            module={module}
                            onClick={() => {
                              handleCardClick(module);
                            }}
                          />
                        ))
                      }
                    </div>
                  </div>
                </div>
              )}
            {selectedModule && (
              <MetrialInfo
                modules={courseData.modules}
                courseID={courseID}
                module={selectedModule}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withMentorAuthorization(StudyMaterial);
