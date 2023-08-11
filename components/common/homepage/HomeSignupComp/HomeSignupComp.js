import Image from "next/image";
import Link from "next/link";

export default function SignUp() {
  return (
    <div className="bg-bs  flex flex-col justify-center items-center lg:px-[62px] md:px-12 md:min-h-screen py-12 md:py-36 lg:py-56">
      <div
        className="flex  justify-center items-center
         w-full max-w-[1280px] 
        bg-[#DA2C84] text-white rounded-3xl 
          py-2 px-5 md:py-4 md:px-16
          "
      >
        <div
          className="h-full w-7/12 space-y-3 sm:space-y-4  md:space-y-5 lg:space-y-7 pr-4 md:pr-16
            "
        >
          <h1
            className="text-sm
               sm:text-xl
               md:text-3xl
               lg:text-[40px] lg:leading-[132%]"
          >
            The great aim of education is not knowledge, but action.
          </h1>
          <div>
            <Link href={"/beta/signup"}>
              <button
                className="flex items-center w-28 h-[30px] 
               sm:h-10 sm:w-28
               md:h-12 md:w-40
               lg:h-16 lg:w-[235px] 
              bg-black
               border border-white justify-center space-x-1 sm:space-x-2 md:space-x-4"
              >
                <p className="text-[12px] sm:text-xs md:text-base lg:text-2xl">
                  Sign Up
                </p>
                <Image
                  src="/componentsgraphics/common/homepage/signup/3.png"
                  alt="/"
                  width={20}
                  height={20}
                  className="w-[10px] sm:w-5 md:w-7 lg:w-[34px]"
                />
              </button>
            </Link>
          </div>
        </div>
        <div className="w-5/12">
          <Image
            src="/componentsgraphics/common/homepage/signup/5.svg"
            width={10}
            height={10}
            alt="image"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
