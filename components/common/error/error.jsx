import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

function Error({ message }) {
  const router = useRouter();

  return (
    <div>
      <div className="bg-[#1E1E1E] h-screen lg:p-10">
        <div className="h-full w-full p-5 bg-[#455A64] flex justify-center flex-col lg:rounded-lg">
          <div className="flex items-center justify-center mb-5">
            <Image
              src="/pagesgraphics/common/errors/404.svg"
              alt="404"
              height={500}
              width={500}
            />
          </div>

          <div className="flex justify-center text-white text-xl">
            {
              "Internal Server Error. Please try again later or contact support."
            }
          </div>

          <div className=" flex justify-center">
            <div className="flex flex-col md:flex-row  item-center  md:justify-center mt-10 gap-5">
              <button
                onClick={() => {
                  router.reload();
                }}
                className="w-32  ml-2 md:w-36 h-10 flex items-center justify-center bg-transparent border-2 rounded-lg text-white"
              >
                Refresh
              </button>

              <button
                onClick={() => {
                  router.back();
                }}
                className="w-36 md:w-44  h-10 flex items-center justify-center bg-[#A145CD] rounded-lg text-white"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Error;
