import Image from "next/image";
export default function homepageactivities() {
   const cards = [
      {
         id: "1",
         icon: "./componentsgraphics/common/homepageactivities/meet.png",
         first: "1:1",
         second: "Meetings",
         margin: "mt-10 md:mt-2",
      },
      {
         id: "2",
         icon: "./componentsgraphics/common/homepageactivities/live.png",
         first: "Live",
         second: "Sessions",
         margin: "ml-20 md:ml-48 lg:ml-56",
      },
      {
         id: "3",
         icon: "./componentsgraphics/common/homepageactivities/video.png",
         first: "Videos",
         margin: "mt-6 ml-32 md:ml-64 lg:ml-80 md:mt-20",
      },
      {
         id: "4",
         icon: "./componentsgraphics/common/homepageactivities/book.svg",
         first: "Practice",
         second: "Material",
         margin: "mt-2 ml-20 md:ml-48 lg:ml-56 md:mt-12",
      },
      {
         id: "5",
         icon: "./componentsgraphics/common/homepageactivities/Question.svg",
         first: "Doubt",
         second: "Sessions",
         margin: "mb-12 md:mb-4",
      },
   ];

   return (
      <div className="flex flex-col py-11 lg:py-[125px] w-full bg-bs justify-center items-center">
         <div className="max-w-[1440px] space-y-4">
            <div className="flex w-full pl-[22px] sm:pl-16 lg:pl-[84px]">
               <p className="text-[15px] sm:text-xl md:text-2xl lg:text-[32px] self-start text-white text-center">
                  A number of available learning <br /> activities that will{" "}
                  <span className="text-[#E1348B]">shock you</span>
               </p>
            </div>
            <div className="w-full px-5 sm:px-14 md:px-28 lg:px-48">
               <Image
                  src={"/activities.png"}
                  className="w-full object-contain"
                  width={1000}
                  height={1000}
               />
            </div>
         </div>
      </div>
   );
}
