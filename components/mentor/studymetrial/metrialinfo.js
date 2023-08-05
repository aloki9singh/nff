import MentorSidebar from "@/components/common/sidebar/mentor";
import MentorTopbar from "@/components/common/navbar/mentortopbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Video from "@/components/mentor/studymetrial/videos";
import ShareLink from "@/components/mentor/studymetrial/shareLink";
import Pdf from "@/components/mentor/studymetrial/pdf";
import { useStudyMaterialContext } from "@/lib/context/StudyMaterialContext";
import Button from "@/components/common/button/primary-button";
import AddVideo from "./addVideo";
import AddPdf from "./addpdf";
import AddLink from "./addLink";

const ArrowIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m13 5 7 7-7 7M5 5l7 7-7 7"
    />
  </svg>
);

function MetrialInfo({ }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const { selectedModule: module, setSelectedModule, isMentor } =
    useStudyMaterialContext();




  return (
    <div className=" max-w-6xl  h-full pb-6  bg-[#2D2E35] text-white grow flex items-center justify-center overflow-hidden ">
      <div className="w-full min-h-[30rem] flex md:bg-[#373A41] rounded-[30px] h-full  ">
        <div className="w-full  flex flex-col">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center">
              <div
                className="m-8 ml-12 cursor-pointer hover:underline "
                onClick={() => setSelectedModule(null)}
              >
                All Modules
              </div>

              <ArrowIcon className="w-6 h-6 text-white" />

              <div
                className="m-8 ml-12 cursor-pointer hover:underline"
                onClick={() => setSelectedCard(null)}
              >
                {module.name}
              </div>
              <ArrowIcon className="w-6 h-6  text-white" />
              <div className="ml-2">
                {selectedCard && (
                  <span className="ml-2 cursor-pointer hover:underline text-[#DA2E8B]">
                    {selectedCard}
                  </span>
                )}
              </div>
            </div>
            {selectedCard && !showForm && isMentor && (
              <Button onClick={() => setShowForm(true)} className={"mr-4"}>
                Add {selectedCard}
              </Button>
            )}
          </div>
          <div className=" border-2 border-[#5F6065] w-full "></div>
          <div>
            {selectedCard === null ? (
              <div className="flex justify-center md:ml-10  flex-wrap md:grid md:gap-x-20 md:gap-y-5 lg:grid-cols-3 md:grid-cols-3 gap-y-5 m-5">
                <div className="flex justify-between items-center ">
                  <div
                    onClick={() => setSelectedCard("Pdf")}
                    className="m-2 p-3 border rounded-2xl bg-gradient-to-r from-[#673CAF] to-[#DA2E8B] h-32 w-48 flex flex-col cursor-pointer hover:-translate-y-1 transition-all duration-150 hover:shadow-md hover:shadow-gray-500 "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      class="w-16 h-16"
                    >
                      <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8l6 6v10a2 2 0 0 1-2 2h-4"></path>
                    </svg>

                    <div>
                      <h1 className="text-white text-base font-medium ">
                        {module.pdf?.length ?? 0} pdf
                      </h1>
                      {/* <div className=" flex flex-row  justify-between gap-3">
                        <p className="text-white text-sm ">aditya</p>
                        <div className="text-sm text-white pr-2 space-y-6">
                          20/11/2000
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div
                    onClick={() => setSelectedCard("Shared Link")}
                    className=" m-2 p-3 border rounded-2xl bg-gradient-to-r from-[#673CAF] to-[#DA2E8B] h-32 w-48 flex flex-col cursor-pointer hover:-translate-y-1 transition-all duration-150 hover:shadow-md hover:shadow-gray-500 "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      class="w-16 h-16 "
                    >
                      <circle cx="12" cy="5" r="3"></circle>
                      <circle cx="12" cy="19" r="3"></circle>
                      <line x1="12" y1="6" x2="12" y2="16"></line>
                    </svg>

                    <div>
                      <h1 className="text-white text-base font-medium ">
                        {module.link?.length ?? 0} shared link
                      </h1>
                      {/* <div className=" flex flex-row  justify-between gap-3">
                        <p className="text-white text-sm ">aditya</p>
                        <div className="text-sm text-white pr-2 space-y-6">
                          20/11/2000
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div
                    onClick={() => setSelectedCard("Video")}
                    className="m-2 p-3 border rounded-2xl bg-gradient-to-r from-[#673CAF] to-[#DA2E8B] h-32 w-48 flex flex-col cursor-pointer hover:-translate-y-1 transition-all duration-150 hover:shadow-md hover:shadow-gray-500 "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      class="w-16 h-16"
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
                      <h1 className="text-white text-base font-medium ">
                        {module.video?.length ?? 0} video
                      </h1>
                      {/* <div className=" flex flex-row  justify-between gap-3">
                        <p className="text-white text-sm ">aditya</p>
                        <div className="text-sm text-white pr-2 space-y-6">
                          20/11/2000
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {selectedCard === "Video" && (
                  <>
                    {!showForm ? (
                      <Video videos={module.video ?? []} />
                    ) : (
                      <AddVideo
                        closeForm={() => {
                          setShowForm(false);
                        }}
                      />
                    )}
                  </>
                )}
                {selectedCard === "Shared Link" && (
                  <>
                    {!showForm ? (
                      <ShareLink links={module.link ?? []} />
                    ) : (
                      <AddLink
                        closeForm={() => {
                          setShowForm(false);
                        }}
                      />
                    )}
                  </>
                )}
                {selectedCard === "Pdf" && (
                  <>
                    {!showForm ? (
                      <Pdf pdfs={module.pdf ?? []} />
                    ) : (
                      <AddPdf
                        closeForm={() => {
                          setShowForm(false);
                        }}
                      />
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MetrialInfo;
