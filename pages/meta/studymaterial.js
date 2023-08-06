import StudyMaterialCard from "@/components/mentor/studymetrial/card";
import MentorSidebar from "@/components/common/sidebar/mentor";
import MentorTopbar from "@/components/common/navbar/mentortopbar";
import { useEffect,  useState } from "react";
import { useMediaQuery } from "react-responsive";
import withMentorAuthorization from "@/lib/HOC/withMentorAuthorization.js";
import {
  StudyMaterialProvider,
} from "@/lib/context/StudyMaterialContext";
import StudyMaterialMain from "@/components/mentor/studymetrial/studyMaterial";
import Layout from "@/components/common/Layout/Layout";

function StudyMaterial() {
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);

  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }

  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }
  }, [isMediumScreen]);

  

  return (
    <Layout pageTitle="Study Material">
    <div className="flex w-full h-full">
      <div className="h-full w-full text-base bg-[#2E3036] ">
        <div className="flex w-full">
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

            {/* <div className="w-fit p-8">
              <select
                className="bg-[#A145CD] text-white rounded-xl px-12"
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option disabled selected hidden>
                  Select an option
                </option>
                {menuItems?.map((item) => (
                  <option className="p-4" key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div> */}

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
            <StudyMaterialMain />
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}


export default withMentorAuthorization(StudyMaterial);
