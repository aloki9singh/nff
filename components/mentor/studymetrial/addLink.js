import { useRouter } from "next/router";
import {  useState } from "react";
import { useMediaQuery } from "react-responsive";
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

function AddLink({ closeForm }) {
  const { addLink } = useStudyMaterialContext();
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [subtitle, setSubtitle] = useState("");

  const addLinkHandler = async () => {
    try {
      if (!title || !link || !subtitle ) {
        alert("Please fill all the fields");
        return;
      }

      const newLink = {
        title,
        link,
        subtitle,
      };
      setLoading(true);
      await addLink(newLink);

      setLoading(false);
      closeForm();

      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <div className="w-full  flex flex-col">
      <div className="flex my-5 items-center px-10">
        <div className="w-28">Title :</div>
        <input
          type="text"
          className="border rounded px-2 py-1 bg-inherit"
          // Add any additional props or event handlers to the input as needed
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex my-5 items-center px-10">
        <div className="w-28">Subtitle :</div>
        <input
          type="text"
          className="border rounded px-2 py-1 bg-inherit"
          // Add any additional props or event handlers to the input as needed
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
      </div>
      <div className="flex my-5 items-center px-10">
        <div className="w-28">Link :</div>
        <input
          type="text"
          className="border rounded px-2 py-1 bg-inherit"
          // Add any additional props or event handlers to the input as needed
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>

      <div className="w-full flex flex-row-reverse ">
        <button
          onClick={addLinkHandler}
          type="button"
          disabled={loading}
          className="py-2.5 px-5 text-sm font-medium text-white bg-primary rounded-lg transition-colors duration-100 cursor-pointer border-gray-200 hover:bg-[#b42a6f] focus:z-10 focus:ring-2    inline-flex items-center mr-10 mt-12 "
        >
          {loading && <Loading className="inline w-4 h-4 mr-3  animate-spin " />}
          Add Link
        </button>
      </div>
    </div>
  );
}


export default AddLink;
