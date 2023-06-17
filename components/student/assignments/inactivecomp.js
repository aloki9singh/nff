import React from "react";
import Image from "next/image";
const InActiveComp = () => {
  return (
    <div>
      {/* viewed courses by class students */}
      <div>
        <div className="flex justify-between m-5 md:mt-2 gap-2 ">
          <div className="md:text-base text-xs">
            Students from your class viewed these courses
          </div>
          <div>
            <button className="border-2 p-1 text-xs w-[60px] ">View All</button>
          </div>
        </div>
        <div className="md:flex  rounded-[30px] md:space-y-0 space-y-5  gap-3">
          <div className="border bg-black rounded-[30px] p-5 md:py-5  ">
            <div className="flex justify-between">
              <Image
                width={100}
                height={100}
                alt={"img"}
                src="/Programmer coding on laptop.png"
                className="w-12"
              />
              <div className="text-xs md:text-[10px] text-[#E1348B] m-auto">25 Lessons</div>
              <div className="text-xs md:text-[10px] md:ml-1 text-[#E1348B] m-auto">Beginner</div>
            </div>
            <div className="text-[10px] text-gray-600">COURSE</div>
            <h1 className="text-sm">Introduction to C++</h1>
            <p className="text-[13px] leading-4 text-gray-500">
              Learn the basics of C++ and how to write your first code.{" "}
            </p>
            <div className="text-right">
              <button className="mt-2 text-xs  border-pink p-2 border">
                Explore
              </button>
            </div>
          </div>
          <div className="border bg-black rounded-[30px] p-5 md:py-5 ">
            <div className="flex justify-between">
              <Image
                width={100}
                height={100}
                alt={"img"}
                src="/Programmer coding on laptop.png"
                className="w-12"
              />
              <div className="text-xs md:text-[10px] text-[#E1348B] m-auto">25 Lessons</div>
              <div className="text-xs md:text-[10px] md:ml-1 text-[#E1348B] m-auto">Beginner</div>
            </div>
            <div className="text-[10px] text-gray-600">COURSE</div>
            <h1 className="text-sm">Introduction to C++</h1>
            <p className="text-[13px] leading-4 text-gray-500">
              Learn the basics of C++ and how to write your first code.{" "}
            </p>
            <div className="text-right">
              <button className="mt-2 text-xs border-pink  p-2 border">
                Explore
              </button>
            </div>
          </div>
          <div className="border bg-black rounded-[30px] p-5 md:py-5 ">
            <div className="flex justify-between">
              <Image
                width={100}
                height={100}
                alt={"img"}
                src="/Programmer coding on laptop.png"
                className="w-12"
              />
              <div className="text-xs md:text-[10px] text-[#E1348B] m-auto">25 Lessons</div>
              <div className="text-xs md:text-[10px] md:ml-1 text-[#E1348B] m-auto">Beginner</div>
            </div>
            <div className="text-[10px] text-gray-600">COURSE</div>
            <h1 className="text-sm">Introduction to C++</h1>
            <p className="text-[13px] leading-4 text-gray-500">
              Learn the basics of C++ and how to write your first code.{" "}
            </p>
            <div className="text-right">
              <button className="mt-2 text-xs border-[#E1348B]  p-2 border ">
                Explore
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* recommended courses  */}
      <div>
        <div className="flex justify-between m-5 gap-2 md:mt-2 ">
          <div className="md:text-base text-xs my-auto">
            Recommended Courses For you
          </div>
          <div>
            <button className="border-2 p-1 text-xs w-[60px] ">View All</button>
          </div>
        </div>

        <div className="md:flex gap-3  rounded-[30px] md:space-y-0 space-y-5  ">
          <div className="border bg-black rounded-[30px] p-5 md:py-5  ">
            <div className="flex justify-between">
              <Image
                width={100}
                height={100}
                alt={"img"}
                src="/Programmer coding on laptop.png"
                className="w-12"
              />
              <div className="text-xs md:text-[10px] text-[#E1348B] m-auto">25 Lessons</div>
              <div className="text-xs md:text-[10px] md:ml-1 text-[#E1348B] m-auto">Beginner</div>
            </div>
            <div className="text-[10px] text-gray-600">COURSE</div>
            <h1 className="text-sm">Introduction to C++</h1>
            <p className="text-[13px] leading-4 text-gray-500">
              Learn the basics of C++ and how to write your first code.{" "}
            </p>
            <div className="text-right">
              <button className="mt-2 text-xs  border-pink p-2 border">
                Explore
              </button>
            </div>
          </div>
          <div className="border bg-black rounded-[30px] p-5 md:py-5 ">
            <div className="flex justify-between">
              <Image
                width={100}
                height={100}
                alt={"img"}
                src="/Programmer coding on laptop.png"
                className="w-12"
              />
              <div className="text-xs md:text-[10px] text-[#E1348B] m-auto">25 Lessons</div>
              <div className="text-xs md:text-[10px] md:ml-1 text-[#E1348B] m-auto">Beginner</div>
            </div>
            <div className="text-[10px] text-gray-600">COURSE</div>
            <h1 className="text-sm">Introduction to C++</h1>
            <p className="text-[13px] leading-4 text-gray-500">
              Learn the basics of C++ and how to write your first code.{" "}
            </p>
            <div className="text-right">
              <button className="mt-2 text-xs border-pink  p-2 border">
                Explore
              </button>
            </div>
          </div>
          <div className="border bg-black rounded-[30px] p-5 md:py-5 ">
            <div className="flex justify-between">
              <Image
                width={100}
                height={100}
                alt={"img"}
                src="/Programmer coding on laptop.png"
                className="w-12"
              />
              <div className="text-xs md:text-[10px] text-[#E1348B] m-auto">25 Lessons</div>
              <div className="text-xs md:text-[10px] md:ml-1 text-[#E1348B] m-auto">Beginner</div>
            </div>
            <div className="text-[10px] text-gray-600">COURSE</div>
            <h1 className="text-sm">Introduction to C++</h1>
            <p className="text-[13px] leading-4 text-gray-500">
              Learn the basics of C++ and how to write your first code.{" "}
            </p>
            <div className="text-right">
              <button className="mt-2 text-xs border-[#E1348B]  p-2 border ">
                Explore
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InActiveComp;
