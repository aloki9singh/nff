import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import AddVideo from "@/components/mentor/studymetrial/addVideo";
import { useStudyMaterialContext } from "@/lib/context/StudyMaterialContext";

function Videos() {
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const [showSideBar, setShowSideBar] = useState(false);

  const { selectedModule } = useStudyMaterialContext();

  return (
    <div>
      <div className="flex justify-center items-center  md:items-start md:ml-10   flex-col  gap-y-5 m-5">
        {/* <div className=" ml-3">Module 1</div> */}


        {selectedModule.video?.length === 0 && (
          <div className="flex w-full justify-center items-center flex-col gap-y-5 m-5">
            <div className="text-2xl text-center font-medium">No Videos</div>
          </div>
        )}
        {selectedModule.video.map((video, i) => (
          <div
            key={i}
            className=" flex  flex-col items-center md:flex-row gap-5"
          >
            <div>
              <div className="flex justify-between items-center">
                <div className="m-2 p-3 border rounded-2xl bg-gradient-to-r from-[#673CAF] to-[#DA2E8B] h-32 w-48 flex flex-col ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    class="w-10 h-10 mb-2"
                  >
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect
                      x="1"
                      y="5"
                      width="15"
                      height="14"
                      rx="2"
                      ry="2"
                    ></rect>
                  </svg>

                  <div>
                    <h1 className="text-white text-base font-medium mb-2 ">
                      {selectedModule.name}
                    </h1>
                    <div className=" flex flex-row  justify-between gap-3">
                      <p className="text-white text-sm ">aditya</p>
                      <div className="text-sm text-white pr-2 space-y-6">
                        20/11/2000
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" flex flex-col gap-6 mt-4 items-center md:items-start">
              <div>{video.name}</div>
              <div className=" w-[80%]">{video.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Videos;
