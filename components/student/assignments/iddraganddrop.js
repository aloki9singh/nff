import { uploadToFirebase } from "@/lib/exportablefunctions";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { TbFileUpload } from "react-icons/tb";

export default function IDdraganddrop({
  name,
  setValue,
  onChange,
  onBlur,
  value,
}) {
  const [uploading, setUploading] = useState(false);


  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop: (acceptedFiles) => {

      setUploading(true);
      uploadToFirebase(acceptedFiles[0], (url) => {
        setValue(name, url, {
          shouldValidate: true,
        });
        setUploading(false);
      });
    },
    accept: "image/jpeg, image/png, image/svg+xml",

    maxFiles: 1,
    maxSize: 5242880, // 5MB
  });

  return (
    <div className="w-[80%] md:w-[70%] h-fit text-gray-400 p-4">
      <div
        {...getRootProps()}
        className={`w-full h-full px-10 py-4 md:py-6 border-dashed border-white p-4 border-[1px] mt-2 rounded-xl bg-[#333333]`}
      >
        <input
          {...getInputProps({
            onChange,
            onBlur,
          })}
          type="file"
          accept="image/png, image/gif, image/jpeg"
        />

        <div className="flex flex-row">
          {value && (
            <div className="flex items-center">
              <Image
                alt=""
                className="rounded-full object-cover object-center w-[125px] h-[125px]"
                src={value}
                width={125}
                height={125}
              />
            </div>
          )}

          <div className=" flex-1 ">
            <div className="flex py-2 md:py-6 justify-center">
              <TbFileUpload size={30} />
            </div>

            <p className="text-center text-lg ">
              <span className="font-medium text-white">Click to upload or</span>{" "}
              drag and drop
            </p>
            <p className="text-sm flex justify-center text-center">
              jpeg , png, svg (max 2-5 mb)
            </p>
          </div>
        </div>
      </div>

      {uploading && <p>Loading....</p>}

      <div className="mt-3">
        {acceptedFiles.map((file) => (
          <div key={file.name} className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 mr-2 text-gray-500"
              fill="none"
              viewBox="0 0 12 12"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <div>
              <div className="font-medium">{file.name}</div>
              <div className="text-sm">{file.size} bytes</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
