import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import AddVideo from "@/components/mentor/studymetrial/addVideo";
import { useStudyMaterialContext } from "@/lib/context/StudyMaterialContext";
import ReactPlayer from "react-player";
import { BsFillPlayFill } from "react-icons/bs";

const VideoModal = ({ videoUrl, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div
      onClick={() => {
        onClose();
      }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div className="bg-gray-600 p-4 rounded-lg w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/3">
        <div className="relative">
          <ReactPlayer
            url={videoUrl}
            playing={isPlaying}
            controls
            width="100%"
            height="auto"
          />
          {/* <button
            className="absolute top-0 right-0 p-2 m-2 bg-red-500 text-white rounded-full"
            onClick={() => onClose()}
          >
            Close
          </button> */}
          {/* <button
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-black bg-opacity-50 text-white rounded-full"
            onClick={handleVideoToggle}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button> */}
        </div>
      </div>
    </div>
  );
};

function Videos() {
  const { selectedModule } = useStudyMaterialContext();
  console.log("videos", selectedModule.video);
  const [videoUrl, setVideoUrl] = useState(null);

  return (
    <div>
      {videoUrl && (
        <VideoModal videoUrl={videoUrl} onClose={() => setVideoUrl(null)} />
      )}
      <div className="flex justify-center items-center  md:items-start md:ml-10   flex-col  gap-y-5 m-5">
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
              <div className="flex justify-between items-center ">
                <div className="m-2 p-3 border rounded-2xl bg-gradient-to-r from-[#673CAF] to-[#DA2E8B] h-32 w-48 flex flex-col  group relative ">
                  <div className="z-20 group-hover:bg-black/30 inset-0 absolute rounded-2xl duration-150 flex justify-center items-center">
                    <BsFillPlayFill
                      onClick={() => {
                        setVideoUrl(video.url);
                      }}
                      className="text-white text-4xl cursor-pointer hidden group-hover:block  "
                    />
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-10 h-10 mb-2"
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
                    <div className=" flex flex-row  justify-end gap-3">
                      {/* <p className="text-white text-sm ">aditya</p> */}
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
