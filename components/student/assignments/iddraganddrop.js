import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { TbFileUpload } from 'react-icons/tb';

export let fileURL = '';

export default function IDdraganddrop({ name, setValue, onChange, onBlur }) {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop: (acceptedFiles) => {
      setValue(name, acceptedFiles[0], {
        shouldValidate: true,
      });
    },
    maxFiles: 1,
  });

  return (
    <div className="w-[80%] md:w-[70%] md:h-60 text-gray-400 ">
      <div
        {...getRootProps()}
        className={`w-full h-full px-10 py-4 md:py-6 mt-2 rounded-xl bg-[#333333]`}
      >
        <input {...getInputProps({
          onChange,
          onBlur,
        })} />
        <div className="flex py-2 md:py-8 justify-center">
          <TbFileUpload size={30} />
        </div>

        <p className="text-center text-sm  py-2"><span className='font-medium text-white'>Click to upload</span> or drag and drop</p>
        <p className="text-sm flex justify-center text-center">
          SVG , PNG or JPG(max.800x400px)
        </p>
      </div>
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
