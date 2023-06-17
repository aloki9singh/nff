import Image from "next/image";
import { AiOutlineArrowRight, AiOutlineSetting } from "react-icons/ai";

const Liveclasssidebar = () => {
  return (
    <>
      <aside id="fontfix" className=" h-screen   p-10 flex flex-col">
        <div className="">
          <div className="">
            <Image
              src="/Neatskills.svg"
              width={600}
              height={600}
              alt="logo"
              className=""
            />
          </div>
          <div className="flex flex-col h-full   justify-around">
            <ul>
              <li className="space-y-[18px]">
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-pin"
                >
                  <label classname="inline-flex items-center">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      classname="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span className="ml-3">Home</span>
                  </label>
                </a>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-pin"
                >
                  <label classname="inline-flex items-center ">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      classname="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span className="ml-3">Course</span>
                  </label>
                </a>
                {/* <a
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-pin"
                >
                  <label classname="inline-flex items-center ">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      classname="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span className="ml-3">Students</span>
                  </label>
                </a> */}
                <hr className="h-px my-8 bg-gray-200 border-0 "></hr>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-pin"
                >
                  <label classname="inline-flex items-center ">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      classname="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span className="ml-3">Schedule</span>
                  </label>
                </a>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-pin"
                >
                  {/* checkbox */}
                  <label classname="inline-flex items-center">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      classname="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span className="ml-3">Live Class</span>
                  </label>
                </a>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg  hover:bg-pin"
                >
                  <label classname="inline-flex items-center">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      classname="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span className="ml-3">Study Material</span>
                  </label>
                </a>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg    hover:bg-pin"
                >
                  <label classname="inline-flex items-center">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      classname="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span className="ml-3">Homework</span>
                  </label>
                </a>
                <hr className="h-px my-8 bg-gray-200 border-0 "></hr>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg   hover:bg-pin"
                >
                  <label classname="inline-flex items-center">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      classname="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span className="ml-3">Chats</span>
                  </label>
                </a>

                <a
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-white rounded-lg   hover:bg-pin"
                >
                  <label classname="inline-flex items-center">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      classname="form-checkbox h-3 w-3 text-gray-600"
                    />{" "}
                    <span className="ml-3">Profile</span>
                  </label>
                </a>
                <div className=" w-48 text-lg font-semibold text-white bg-[#373A41] flex flex-col mt-9 rounded-xl">
                  <div className=" px-8 py-2 ">
                    <h1 className="text-xl font-Inter md:inline">
                      Discord Community
                    </h1>
                    <p>150 members</p>
                    <button className="inline-flex items-center mt-10 h-10 px-5 text-indigo-100 transition-colors duration-150 bg-[#E1348B] rounded-lg focus:shadow-outline ">
                      <span>Join</span>
                      <AiOutlineArrowRight />
                    </button>
                  </div>
                </div>
                <div className="text-white flex-row  space-y-5 mt-20">
                  <button className=" bg-[#373A41]  flex  justify-center  items-center w-[85%] rounded  px-2 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal ">
                    <AiOutlineSetting />
                    <span className="pl-1">Settings </span>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Liveclasssidebar;
