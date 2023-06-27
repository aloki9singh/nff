import Image from "next/image";
import React from "react";
// #DD4A94 #B26ED3
// #A145CD
const signupsuccess = () => {
  return (
    <div>
      <div className="w-full  justify-center h-screen">
        <div className="flex justify-start md:pt-0   ">
          <div className=" h-full ">
            <Image
              alt="Icon"
              src="/pagesgraphics/admin/login/Neatskills.svg"
              width={200}
              height={200}
              className="xl:w-[270px] lg:w-[220px] md:w-[170px] sd:w-[200px]"
            />
          </div>
        </div>
        <div className="text-center ">
          <div>
            <h1 className="text-[#A145CD] text-3xl">
              Welcome Back, Raviraj !{" "}
            </h1>
            <p>Select what you want to do</p>
          </div>

          <div className="m-auto w-full relative">
            <div className="absolute inset-0 rounded-[100%] filter blur-3xl bg-[#B26ED3]  opacity-75 w-[50%] m-auto"></div>
            {/* <div className="absolute inset-0 rounded-[100%] filter blur-3xl bg-[#DD4A94] opacity-75 w-[50%] m-auto"></div> */}
            <div className="grid md:grid-cols-4 grid-cols-2 gap-5  text-center justify-center md:w-[80%] m-auto">
              <div className="bg-[#B26ED3] w-[150px] h-[200px] rounded m-auto flex align-middle">
                <div>
                  <div className="flex justify-center align-middle">
                    <Image
                      alt="Icon"
                      src="/pagesgraphics/admin/welcome/FolderSimplePlus.svg"
                      width={100}
                      height={100}
                      className="w-[50%]"
                    />
                  </div>
                  <div>Add/Modify Courses</div>
                </div>
              </div>
              <div className="bg-[#B26ED3] w-[150px] h-[200px] rounded m-auto">
                <div className="flex justify-center align-middle">
                  <Image
                    alt="Icon"
                    src="/pagesgraphics/admin/welcome/studentsandmentors.svg"
                    width={100}
                    height={100}
                    className="w-[50%]"
                  />
                </div>
                <div>View Students/ Mentors</div>
              </div>
              <div className="bg-[#B26ED3] w-[150px] h-[200px] rounded m-auto">
                <div className="flex justify-center align-middle">
                  <Image
                    alt="Icon"
                    src="/pagesgraphics/admin/welcome/UsersThree.svg"
                    width={100}
                    height={100}
                    className="w-[50%]"
                  />
                </div>
                <div>Create Team</div>
              </div>
              <div className="bg-[#B26ED3] w-[150px] h-[200px] rounded m-auto">
                <div className="flex justify-center align-middle">
                  <Image
                    alt="Icon"
                    src="/pagesgraphics/admin/welcome/UserList.svg"
                    width={100}
                    height={100}
                    className="w-[50%]"
                  />
                </div>
                <div>Add/View Team</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default signupsuccess;
