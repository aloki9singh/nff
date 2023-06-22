// Page not Provided in figma CSS need to be fixed  // currently frontend of this page is fixed  without figma
//Backend needed to be implemented with appwrite
// it is admin login page

import { useState } from "react";
import NeatS from "/public/componentsgraphics/schools/login/neatskillslogosample.svg";
import Woman from "@/public/pagesgraphics/admin/login/Adminlogingraphic.png";
import { AiOutlineMail } from "react-icons/ai";
import Image from "next/image";
import { FaLock } from "react-icons/fa";

function Adminlogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authCode, setAuthCode] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    console.log(email, password, authCode);
    //reset the form
    setEmail("");
    setPassword("");
    setAuthCode("");
  }
  return (
    
    <main className="max-w-full md:h-screen   grid justify-center md:grid-cols-2 text-center text-white md:overflow-hidden">
      <div className=" m-auto w-full   ">
        <div className="flex justify-center md:pt-0  pt-[20px]  ">
          <div className="m-auto h-full ">
            <Image
              alt="Icon"
              src="/pagesgraphics/mentor/signupsuccess/Neatskills.svg"
              width={200}
              height={200}
              className="xl:w-[270px] lg:w-[220px] md:w-[170px] sd:w-[200px]"
            />
          </div>
        </div>

        <div className="w-full flex justify-center mt-5">
          <div className="m-auto w-full  ">
            <Image
              alt="Icon"
              src={Woman}
              width={200}
              height={200}
              className=" md:p-10 md:w-[70%] m-auto "
            />
          </div>
        </div>
        <p className="hidden md:block text-normal text-lg">
          Start learning the right away!
        </p>
      </div>
      <div className="m-auto md:mt-auto mt-[-20px] ">
        <div className="rounded-[25px] p-4 w-full   bg-[#15161B] md:bg-[#ffffff05] md:px-20 ">
          <h1 className="md:mt-[30px] md:text-3xl">Admin Login</h1>

          <hr
            style={{ border: "0.5px solid rgba(255, 255, 255, 0.32)" }}
            className="mt-5  m-auto"
          />

          <div className="">
            <form
              method="post"
              action="#"
              //  onSubmit={}
            >
              <div
                style={{
                  "background-image":
                    "linear-gradient(177.81deg, rgba(255, 255, 255, 0.11) 1.84%, rgba(255, 255, 255, 0) 123.81%)",
                }}
                className="flex rounded-[15px] md:mt-10 mt-5 bg-[#ffffff05] items-center "
              >
                <AiOutlineMail
                  size={"2.5vh"}
                  style={{
                    color: "green",
                    width: "30px",
                    marginLeft: "2vh",
                    marginRight: "2vh",
                  }}
                />

                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="input p-3 cursor-pointer  focus:border-transparent focus:outline-none    rounded-lg  bg-transparent  w-[100%] text-sm "
                />
              </div>

              <div
                style={{
                  "background-image":
                    "linear-gradient(177.81deg, rgba(255, 255, 255, 0.11) 1.84%, rgba(255, 255, 255, 0) 123.81%)",
                }}
                className=" flex rounded-[15px]   my-8 bg-[#ffffff05] items-center "
              >
                <FaLock
                  size={"2.5vh"}
                  style={{
                    color: "blue",
                    width: "30px",
                    marginLeft: "2vh",
                    marginRight: "2vh",
                  }}
                />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input p-3 cursor-pointer focus:border-transparent focus:outline-none  rounded-lg  bg-transparent  w-[100%] text-sm"
                />
              </div>
              <div
                style={{
                  "background-image":
                    "linear-gradient(177.81deg, rgba(255, 255, 255, 0.11) 1.84%, rgba(255, 255, 255, 0) 123.81%)",
                }}
                className=" flex rounded-[15px]   my-8 bg-[#ffffff05] items-center "
              >
                <FaLock
                  size={"2.5vh"}
                  style={{
                    color: "blue",
                    width: "30px",
                    marginLeft: "2vh",
                    marginRight: "2vh",
                  }}
                />
                <input
                  required
                  type="password"
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                  placeholder="Unique Auth Code"
                  className="input p-3 cursor-pointer focus:border-transparent focus:outline-none  rounded-lg  bg-transparent  w-[100%] text-sm"
                />
              </div>

              <br />
              <p
                onClick={handleLogin}
                className=" cursor-pointer text-xs font-light mb-5 md:mt-[-30px] mt-[-40px]"
              >
                Forgot Password ?
              </p>

              <button
                type="submit"
                className="bg-[#E1348B] w-[100%]  p-2 rounded-[10px]"
              >
                {false ? (
                  <span className="text-base">Logging In ...</span>
                ) : (
                  "Login"
                )}
              </button>

              <p className="text-xs font-light  text-gray-500 mt-5 ">
                Let’s make some awesome changes
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
    // <main className="mx-auto my-12 flex-1 flex flex-col md:flex-row justify-center items-center text-white gap-x-20 mb-0 md:mb-4">
    //   {/* left */}
    //   <div className="w-full md:w-1/2 md:pb-12 flex flex-col justify-center mt-16 md:mb-0">
    //     <Image src={NeatS} alt="Neat Skills" className="hidden md:block" />
    //     <div className="flex flex-col justify-center items-center">
    //       <Image src={Woman} alt="Women connecting laptop to server" />
    //       <p className="hidden md:block text-normal text-lg">
    //         Start learning the right away!
    //       </p>
    //     </div>
    //   </div>
    //   {/* right */}
    //   <div
    //     className="w-screen rounded-t-[60px] border-2 border-black md:border-0 md:rounded-none md:w-[593px] md:pt-24 h-[615px] md:h-[700px] flex flex-col items-center gap-y-4 md:gap-y-6 mb-0 md:px-0"
    //     style={{
    //       background: 'rgba(255, 255, 255, 0.02)',
    //       //background: 'green',
    //     }}
    //   >
    //     <Image src={NeatS} alt="Neat Skills" className="md:hidden sm:block" />
    //     <div className="w-screen flex flex-col justify-center text-center">
    //       <h1 className="text-2xl md:text-5xl text-left px-10 pt-8 md:text-center">
    //         Admin
    //       </h1>
    //       <p className="text-xl md:text-3xl text-left px-10 md:text-center">
    //         Login
    //       </p>
    //     </div>
    //     <hr
    //       className="hidden md:block w-3/4 h-0.5 border-none"
    //       style={{ background: 'rgba(255, 255, 255, 0.32)' }}
    //     />
    //     <form className="sm-w-full md:w-5/6 h-72 flex flex-col gap-y-4 py-2">
    //       <div
    //         className="w-96 h-14 px-4 flex justify-start items-center gap-x-4 text-white rounded-xl mb-4 mx-auto"
    //         style={{
    //           background:
    //             'linear-gradient(177.81deg, rgba(255, 255, 255, 0.11) 1.84%, rgba(255, 255, 255, 0) 123.81%)',
    //         }}
    //       >
    //         <AiOutlineMail color="green" />
    //         <input
    //           type="text"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           placeholder="Enter your email"
    //           className="border-none focus:outline-none bg-inherit placeholder:text-white"
    //         />
    //       </div>
    //       <div
    //         className="w-96 h-14 px-4 flex justify-start items-center gap-x-4  text-white rounded-xl mb-4 mx-auto"
    //         style={{
    //           background:
    //             'linear-gradient(177.81deg, rgba(255, 255, 255, 0.11) 1.84%, rgba(255, 255, 255, 0) 123.81%)',
    //         }}
    //       >
    //         <FaLock color="blue" />
    //         <input
    //           type="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           placeholder="Enter your password"
    //           className="border-none focus:outline-none bg-inherit placeholder:text-white"
    //         />
    //       </div>
    //       <div
    //         className="w-96 h-14 px-4 flex justify-start items-center gap-x-4  text-white rounded-xl mx-auto"
    //         style={{
    //           background:
    //             'linear-gradient(177.81deg, rgba(255, 255, 255, 0.11) 1.84%, rgba(255, 255, 255, 0) 123.81%)',
    //         }}
    //       >
    //         <FaLock color="blue" />
    //         <input
    //           type="password"
    //           value={authCode}
    //           onChange={(e) => setAuthCode(e.target.value)}
    //           placeholder="Unique Auth Code"
    //           className="border-none focus:outline-none bg-inherit placeholder:text-white"
    //         />
    //       </div>
    //     </form>
    //     <p className="text-center mt-[-30px]">Forgot Password?</p>
    //     <button
    //       className="w-96 h-14 bg-[#E1348B] rounded-2xl"
    //       onClick={handleLogin}
    //     >
    //       Login
    //     </button>
    //     <p>{`Let's make some awesome changes`}</p>
    //   </div>
    // </main>
  );
}

export default Adminlogin;
