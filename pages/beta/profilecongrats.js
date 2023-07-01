import React from 'react';
import Image from 'next/image'
import { useRouter } from 'next/router';

const ProfileCongratulation = () => {
  const router = useRouter()
  setTimeout(() => {
    router.push("dashboard");
  }, 2000)
  return (
    <div className="flex  ">
      {/* <Sidebar /> */}
      <div className="w-full md:h-screen h-[75vh] flex flex-col ">
        {/* <NavBarSecond buttonVis="hidden" title="Contact Uss" /> */}

        <div
          className="uppercase  w-[112px] h-[43px] md:w-[186px] md:h-[71px] flex-shrink-0  " >
          <Image
            src="/pagesgraphics/student/profilecontinue/Neatskills.svg"
            alt="logo"
            className="w-full h-full object-contain md:ml-10 ml-7 mt-5"
            width={100}
            height={100}
          />
        </div>
        <div className="md:px-30 px-5 text-white  flex justify-center  relative w-1440px h-[calc(100%-43px)] ">
                  
          {/* Ellipses */}

          <div className="absolute z-0 inset-0 flex items-center justify-center ">
            <div className=" md:w-80 md:h-80 h-40 w-20 rounded-full bg-[#B26ED3] bg-opacity-30 blur-2xl  " style={{ top: "50%", left: "50%", transform: "translate(-50%, -25%)" }}></div>

            <div className="md:w-80 md:h-80 w-20 h-40  rounded-full bg-[#DD4A94] bg-opacity-30 absolute blur-2xl end-2 " style={{ top: "55%", left: "calc(50% + 100px)", transform: "translate(-50%, -50%)" }}></div>
          </div>



          {/* add profile lines  */}
          <div className="flex flex-col items-center w-fit m-auto text-center md:space-x-5 md:p-0 translate-y-[-10%]">
            <div className="flex  justify-center w-full sm:mx-0 sm:mb-4 sm:w-350px">
              <h1 className="sm:px-20 sm:h-20 not-italic font-semibold text-2xl sm:text-6xl text-white">
                Welcome <span>Gaurav</span>
              </h1>
            </div>
            <div className="">
              <h2 className="flex justify-center  text-white ">You have successfully completed your profile</h2>
            </div>

          </div>
        </div>
      </div>
    </div>


  );
};


export default ProfileCongratulation;