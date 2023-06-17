import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiOutlineArrowRight } from "react-icons/ai";
const ProfileContinuepage = () => {
  const router = useRouter();

  function handleContinueClick() {
    router.push("/profileDetails");
  }
  return (
    <div className="flex md:h-screen  ">
      {/* <Sidebar /> */}
      <div className="w-full h-full flex flex-col">
        {/* <NavBarSecond buttonVis="hidden" title="Contact Us" /> */}
        <div className="uppercase  w-[112px] h-[43px] md:w-[186px] md:h-[71px] flex-shrink-0">
          <Image
            src="/Neatskills-cropped.png"
            alt="logo"
            className="w-full h-full object-contain md:ml-10 ml-7 mt-5"
            width={100}
            height={100}
          />
        </div>
        <div className=" md:px-30 px-5  text-white  flex justify-center  relative w-1440px h-[calc(100%-43px)]  ">
          {/* Ellipses */}
          <div className="absolute z-0 inset-0 flex items-center justify-center ">
            <div
              className=" md:w-80 w-20 md:h-80 h-40 rounded-full bg-[#B26ED3] bg-opacity-30 blur-2xl  "
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -25%)",
              }}
            ></div>

            <div
              className="md:w-80 w-30 md:h-80 h-40 rounded-full bg-[#DD4A94] bg-opacity-30 absolute blur-2xl end-2 "
              style={{
                top: "55%",
                left: "calc(50% + 100px)",
                transform: "translate(-50%, -50%)",
              }}
            ></div>
          </div>

          {/* add profile lines  */}
          <div className="flex flex-col items-center md:space-y-0 space-y-5 md:p-0 p-5">
            <div className=" flex  justify-center w-full   sm:mx-0 sm:mb-4 sm:w-350px  ">
              <h1 className=" sm:px-20  mt-20   sm:h-20 not-italic font-semibold text-2xl sm:text-6xl text-white text-center">
                Add <span className="text-[#A145CD]"> Profile Details</span>
              </h1>
            </div>
            <div className="">
              <h2 className="flex justify-center  text-white  sm:mt-2 text-center">
                Complete your profile to access the courses
              </h2>
            </div>
            {/* image section */}
            <div className=" flex justify-center mb-8 ">
              <Image
                src="/profiledetails.png"
                alt="My Image"
                width={400}
                height={400}
                className=""
              />
            </div>
            {/* button sec */}
            <div className=" flex justify-center -translate-y-5 md:pt-0 mt-5">
              <button
                type="button"
                onClick={handleContinueClick}
                className="px-6 py-3 bg-purple-600 text-gray-800 rounded-full shadow-md hover:bg-gray-200 "
              >
                <div className="flex gap-2">
                  <span> Continue</span>
                  <span className="m-auto">
                    {" "}
                    <AiOutlineArrowRight />
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContinuepage;
