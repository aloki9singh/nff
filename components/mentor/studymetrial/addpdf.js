import MentorSidebar from "@/components/common/sidebar/mentor";
import MentorTopbar from "@/components/common/navbar/mentortopbar";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Video from "@/components/mentor/studymetrial/videos";
import ShareLink from "@/components/mentor/studymetrial/shareLink";
import Pdf from "@/components/mentor/studymetrial/pdf";
import { useDropzone } from "react-dropzone";
import { uploadToFirebase } from "@/lib/exportablefunctions";

function AddPdf({ addPdfHandler }) {
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

  const [selectedModule, setSelectedModule] = useState("Module 1");
  const [fileName, setFileName] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null);
  const [size, setSize] = useState(null);

  const handleModuleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedModule(selectedValue);
    setFileName(`File Name: ${selectedValue}`);
  };

  return (
    <div className="w-full  flex flex-col">
      <div className="flex items-center p-10">
        <div className="mr-3">File Name:</div>
        <input
          type="text"
          className="border rounded px-2 py-1 bg-inherit"
          // Add any additional props or event handlers to the input as needed
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
      </div>

      {/* <div className='flex items-center  p-10 '>
        <div className='mr-3'>
          <label htmlFor='moduleSelect'>Select Module:</label>
          <select
            id='moduleSelect'
            className='border rounded  ml-2 px-2 py-1 bg-inherit text-white '
            value={selectedModule}
            onChange={handleModuleChange}>
            <option value='Module 1' className=' bg-inherit'>
              Module 1
            </option>
            <option value='Module 2' className=' bg-inherit'>
              Module 2
            </option>
            <option value='Module 3' className=' bg-inherit'>
              Module 3
            </option>
          </select>
        </div>
      </div> */}

      <div className=" border-[#5F6065] border rounded-2xl py-8 mx-8 ">
        <DropZone setSize={setSize} setUrl={setPdfUrl} />
      </div>

      <div className="w-full flex flex-row-reverse ">
        <button onClick={async () => {
          console.log("pdfUrl", pdfUrl)
          await addPdfHandler({
            name: fileName,
            url: pdfUrl,
            size: size,
          })
          setPdfUrl(null)
          // router.reload()
        }} className=" mt-12 w-[10%] h-10  mr-10 bg-[#AA2769]">
          Add Pdf
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

function DropZone({ setUrl, setSize }) {

  const [loading, setLoading] = useState(false);
  const { getRootProps, acceptedFiles, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "application/pdf": [".pdf"],
      },
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

  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input  {...getInputProps()} accept="application/pdf" />
        <div className="flex flex-col items-center" >
          <FileIcon />
          <p>Click to upload or drag and drop</p>
          <p>pdf , word document (max 2-5 mb)
          </p>
        </div>
      </div>
      <aside>
        <h4>Accepted files</h4>
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
)

export default AddPdf;
