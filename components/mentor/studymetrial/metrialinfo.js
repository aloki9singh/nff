import MentorSidebar from "@/components/common/sidebar/mentor";
import MentorTopbar from "@/components/common/navbar/mentortopbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Video from "@/components/mentor/studymetrial/videos";
import ShareLink from "@/components/mentor/studymetrial/shareLink";
import Pdf from "@/components/mentor/studymetrial/pdf";
import { setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseconfig";
import { addPdfStudyMaterial } from "@/lib/exportablefunctions";




function MetrialInfo({ module, modules, courseID }) {
  const router = useRouter();
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }


  const addPdfHandler = async ({ name, url, size }) => {
    try {
      console.log("courseID", courseID);
      console.log("module", module);
      console.log("modules", modules);
      console.log("new pdf", {
        name,
        url,
        size,
      });

      const newPdf = {
        name,
        url,
        size,
      };

      // Assuming you have the necessary declarations for courseID, module, and modules array.
      await addPdfStudyMaterial(courseID, module.id, newPdf)

      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };



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

  const { query } = router;

  useEffect(() => {
    const { selectedCard } = query;
    if (selectedCard) {
      setSelectedCard(decodeURIComponent(selectedCard));
    }
  }, [query]);

  return (
    <div className=" w-full  h-full pb-10  bg-[#2D2E35] text-white grow flex items-center justify-center ">
      <div className="w-[90%] flex md:bg-[#373A41] rounded-[30px] h-full  ">
        <div className="w-full  flex flex-col">
          <div className="w-full flex flex-col">
            <div className="flex items-center">
              <div className="m-8 ml-12" onClick={() => setSelectedCard(null)}>
                {module.name}
              </div>
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                ></path>
              </svg>
              <div className="ml-2">
                {selectedCard && (
                  <span className="ml-2 text-[#DA2E8B]">{selectedCard}</span>
                )}
              </div>
            </div>
          </div>
          <div className=" border-2 border-[#5F6065] w-full "></div>
          <div>
            {selectedCard === null ? (
              <div className="flex justify-center md:ml-10  flex-wrap md:grid md:gap-x-20 md:gap-y-5 lg:grid-cols-3 md:grid-cols-3 gap-y-5 m-5">
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
                      class="w-16 h-16"
                    >
                      <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8l6 6v10a2 2 0 0 1-2 2h-4"></path>
                    </svg>

                    <div>
                      <h1
                        className="text-white text-base font-medium "
                        onClick={() => setSelectedCard("Pdf")}
                      >
                        {module.pdf?.length ?? 0} pdf
                      </h1>
                      <div className=" flex flex-row  justify-between gap-3">
                        <p className="text-white text-sm ">aditya</p>
                        {/* <div className="text-sm text-white pr-2 space-y-6">
                          20/11/2000
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className=" m-2 p-3 border rounded-2xl bg-gradient-to-r from-[#673CAF] to-[#DA2E8B] h-32 w-48 flex flex-col ">
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
                      <h1
                        className="text-white text-base font-medium "
                        onClick={() => setSelectedCard("Shared Link")}
                      >
                        {module.link?.length ?? 0} shared link
                      </h1>
                      <div className=" flex flex-row  justify-between gap-3">
                        <p className="text-white text-sm ">aditya</p>
                        {/* <div className="text-sm text-white pr-2 space-y-6">
                          20/11/2000
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>

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
                      <h1
                        className="text-white text-base font-medium "
                        onClick={() => setSelectedCard("Video")}
                      >
                        {module.video?.length ?? 0} video
                      </h1>
                      <div className=" flex flex-row  justify-between gap-3">
                        <p className="text-white text-sm ">aditya</p>
                        {/* <div className="text-sm text-white pr-2 space-y-6">
                          20/11/2000
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {selectedCard === "Video" && (
                  <Video videos={module.video ?? []} />
                )}
                {selectedCard === "Shared Link" && (
                  <ShareLink links={module.link ?? []} />
                )}
                {selectedCard === "Pdf" && <Pdf addPdfHandler={addPdfHandler} pdfs={module.pdf ?? []} />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MetrialInfo;
