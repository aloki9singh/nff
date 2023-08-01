import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useDropzone } from "react-dropzone";
import { uploadToFirebase } from "@/lib/exportablefunctions";
import { useStudyMaterialContext } from "@/lib/context/StudyMaterialContext";


const Loading = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    aria-hidden="true"
    viewBox="0 0 100 101"
    {...props}
  >
    <path
      fill="currentColor"
      d="M100 50.59c0 27.615-22.386 50.001-50 50.001s-50-22.386-50-50 22.386-50 50-50 50 22.386 50 50Zm-90.919 0c0 22.6 18.32 40.92 40.919 40.92 22.599 0 40.919-18.32 40.919-40.92 0-22.598-18.32-40.918-40.919-40.918-22.599 0-40.919 18.32-40.919 40.919Z"
    />
    <path
      fill="#1C64F2"
      d="M93.968 39.04c2.425-.636 3.894-3.128 3.04-5.486A50 50 0 0 0 41.735 1.279c-2.474.414-3.922 2.919-3.285 5.344.637 2.426 3.12 3.849 5.6 3.484a40.916 40.916 0 0 1 44.131 25.769c.902 2.34 3.361 3.802 5.787 3.165Z"
    />
  </svg>
)

function AddVideo({ closeForm }) {
  const router = useRouter();
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const { addVideo } = useStudyMaterialContext();
  const [loading, setLoading] = useState(false);



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

  const { query } = router;

  const [selectedModule, setSelectedModule] = useState("Module 1");
  const [fileName, setFileName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null);
  const [size, setSize] = useState(null);


  const addVideoHandler = async () => {
    try {


      if (!fileName || !pdfUrl || !subtitle) {
        alert("Please fill all the fields");
        return;
      }

      const newVideo = {
        name: fileName,
        url: pdfUrl,
        size,
        subtitle,
      };
      setLoading(true);
      await addVideo(newVideo);

      setLoading(false);
      closeForm();

      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <div className="w-full  flex flex-col">
      <div className="flex items-center px-10 py-3">
        <div className="mr-1 w-24">Video Title:</div>
        <input
          type="text"
          className="border rounded px-2 py-1 bg-inherit"
          // Add any additional props or event handlers to the input as needed
          value={fileName}
          // placeholder="Add File Name"
          onChange={(e) => setFileName(e.target.value)}
        />
      </div>
      <div className="flex items-center px-10 py-3">
        <div className="mr-1 w-24">Subtitle:</div>
        <input
          type="text"
          className="border rounded px-2 py-1 bg-inherit"
          // Add any additional props or event handlers to the input as needed
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
      </div>
      <div className=" border-[#5F6065] border rounded-2xl py-8 mx-8 ">
        <DropZone accept={"video"} setSize={setSize} setUrl={setPdfUrl} />
      </div>

      <div className="w-full flex flex-row-reverse ">
        <button
          onClick={addVideoHandler}
          type="button"
          disabled={loading}
          className="py-2.5 px-5 text-sm font-medium text-white bg-primary rounded-lg transition-colors duration-100 cursor-pointer border-gray-200 hover:bg-[#b42a6f] focus:z-10 focus:ring-2    inline-flex items-center mr-10 mt-12 "
        >
          {loading && <Loading className="inline w-4 h-4 mr-3  animate-spin " />}
          Upload
        </button>
      </div>
    </div>
  );
}

const baseStyle = {
  flex: 1,
  maxWidth: 580,
  height: 120,
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 20,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#505057",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};


const fileAccept = {
  "video": {
    "video/*": []
  },
  "pdf": {
    "application/pdf": [".pdf"]
  },
  "image": {
    "image/*": []
  }
}

function DropZone({ setUrl, setSize, accept }) {
  const [loading, setLoading] = useState(false);
  const {
    getRootProps,
    acceptedFiles,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: fileAccept[accept] || {},
    onDrop: (acceptedFiles) => {
      setLoading(true);
      setSize(acceptedFiles[0].size);
      uploadToFirebase(acceptedFiles[0], (url) => {
        setUrl(url);
        setLoading(false);
      });
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()}  />
        <div className="flex flex-col items-center">
          <FileIcon />
          <p>Click to upload or drag and drop</p>
          <p>
            {
              accept === "video" ? "mp4, mkv, mov, avi, flv, webm (max 2-5 mb)" :
                accept === "pdf" ? "pdf (max 2-5 mb)" :
                  accept === "image" ? "jpeg , png, svg (max 2-5 mb)" : ""
            }
          </p>
        </div>
      </div>
      <aside>
        {/* <h4>Accepted files</h4> */}
        <ul>{acceptedFileItems}</ul>
      </aside>
      {loading && <div className="text-white">Uploading...</div>}
    </div>
  );
}

const FileIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={31}
    height={34}
    fill="none"
    {...props}
  >
    <path
      stroke="#ADADB0"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M24.219 29.266H6.78a.934.934 0 0 1-.685-.306 1.089 1.089 0 0 1-.284-.739V5.226c0-.277.103-.543.284-.74a.934.934 0 0 1 .685-.305h11.625l6.782 7.316v16.724c0 .277-.103.543-.284.74a.934.934 0 0 1-.685.305Z"
    />
    <path
      stroke="#ADADB0"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18.406 4.18v7.317h6.782M12.11 19.337l3.39-3.658 3.39 3.658M15.5 24.04V15.68"
    />
  </svg>
);

export default AddVideo;
