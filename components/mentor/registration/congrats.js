// Needs to be rechecked
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const Congratulations = () => {
  const router = useRouter();
  setTimeout(() => {
    router.push("/mentorSignup");
  }, 3000);
  return (
    <div className=" md:mx-20 text-center text-white bg-[#222222] ">
      <div>
        <div
          className="h-screen bg-cover bg-center rounded-[30px] bg-[#222222] md:my-0 my-[-60px] "
          style={{ backgroundImage: 'url("/transparent sparkle.svg")' }}
        >
          <div className="flex items-center justify-center h-screen ">
            <div
              style={{
                backgroundImage: 'url("/Blur effect.svg")',
                backdropFilter: "blur(8.5px)",
              }}
              className=" flex flex-col align-middle  gap-y-4  rounded-[30px] p-10 md:p-20  m-5 "
            >
              <p className="text-3xl font-bold ">Congratulations</p>
              <p className="text-s md:mx-20   flex justify-center font-light md:w-[350px]">
                Your Registration is successfully submitted. We will get back to
                you within 1-2 weeks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Congratulations;
