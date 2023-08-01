import Image from "next/image";
import React from "react";

const Nodata = ({ title, value }) => {
  return (
    <div className="flex justify-center align-middle items-center w-full">
      <div className="flex bg-[#37383F] mx-5 py-7 px-2 rounded-[30px] w-[80%] text-white space-y-6 justify-center items-center  ">
        <div className="space-y-5 ">
          <h1 className="text-center text-2xl"> {title}</h1>
          <Image
            alt="Image"
            width={100}
            height={100}
            className="w-[20rem]"
            src={"/componentsgraphics/common/nodata/nodata.svg"}
          />
          <div className="flex items-center justify-center">
            <button
              type="button"
              className=" text-center bg-[#E1348B] rounded-[30px] px-5 py-4"
            >
              {value}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nodata;
