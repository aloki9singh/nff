import Image from "next/image";

export default function ExploreCourses() {
   return (
      <div className="w-full flex justify-center bg-[#16171C] lg:min-h-screen">
         <div
            className="max-w-[1440px] flex justify-center items-center w-full flex-col-reverse md:flex-row  text-white md:px-[75px] 
         mt-9 mb-[76px] md:my-14
         "
         >
            <div className="px-[30px] md:px-0 md:pr-20 
            lg:py-8
            md:w-1/2">
               <h4
                  className="font-ral leading-[112%] 
               text-2xl lg:text-4xl  
               font-semibold"
               >
                  Stand out with a skill
                  <span className="text-pink"> certificate</span>
               </h4>

               <p className="
               text-[15px]  lg:text-2xl 
               font-light text-[#DFDFDF] leading-[121%] mt-4">
                  Earn globally recognized certification and improve your
                  knowledge.
               </p>

               <div className="mt-16 md:mt-12 w-full flex justify-center md:justify-start">
                  <button className="bg-transparent text-white font-ral border-2 border-white 
                  w-[173px] h-[52px]
                  lg:w-[203px] lg:h-[75px]
                  relative md:ml-[70px] lg:ml-[110px]">
                     Explore Courses
                     <Image
                        src="/componentsgraphics/common/homepage/explorecourses/arrow.png"
                        alt="/"
                        width={66}
                        height={45}
                        className="absolute 
                        w-[30px] 
                        left-1/2 rotate-90 -top-4 
                        -translate-y-full
                        md:w-[50px] 
                        md:-left-4 md:top-1/2 md:rotate-0 md:-translate-x-full 
                        lg:w-[66px]
                        lg:-left-8
                        "
                     />
                  </button>
               </div>
               {/* <div className="bg-transparent text-white pt-5 leading-[36px] sm:text-xl md:text-2xl lg:w-[84%] w-[82%]">
               Earn globally recognized certification and improve your
               knowledge.
               <div className="m-10 flex">
                  <div>
                     <Image src="/2.png" alt="/" width={50} height={50} />
                  </div>
                  <div className="mt-10 ml-6">
                     <button className="bg-transparent text-white font-semibold p-1 text-lg border-2 border-gray-400">
                        Explore Courses
                     </button>
                  </div>
               </div> 
            </div> */}
            </div>
            <div className="mb-9 md:mb-0 px-9  md:p-0 xl:pr-11 md:w-1/2">
               <Image
                  src="/componentsgraphics/common/homepage/explorecourses/Certificate.svg"
                  alt="/"
                  width={1000}
                  height={1000}
               />
            </div>
         </div>
      </div>
   );
}
