import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Auth/auth.module.css";
import NeatS from "../../public/Neatskills.svg";
import neatSvg from "../../public/Auth/Group 2.svg";
import Google from "../../public/Auth/_Google.svg";
import { AiOutlineMail } from "react-icons/ai";
import { FaLock } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { createWithGoogle, handleResetPassword, login } from "../../lib/exportableFunctions";

function LoginComp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const isEmailVerified =
      new URLSearchParams(window.location.search).get("mode") === "verifyEmail";
    if (isEmailVerified) {
      // Display a message to inform the user that their email has been verified
      alert("Your email has been verified. You can now log in.");
    }
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password,router);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="md:w-1/2 md:h-full sd:w-full sd:h-1/3 bg-inherit  ">

        <div className='h-full w-full py-8 md:py-20 flex flex-col items-center justify-center md:gap-8 sd:gap-2 relative  '>
          <Image className="xl:w-[270px] lg:w-[220px] md:w-[180px] sd:w-[130px]" src={NeatS}  alt="" />
          <div className={`${styles.Effect} hidden md:block  xl:w-[60%] xl:h-[50%] lg:w-[50%] lg:h-[50%] md:w-[45%]  md:h-[40%] sd:w-[35%]  sd:h-[30%]  top-[10px] lg:left-[29px]  `}></div>

          <div className=" md:w-[55%] sd:w-[30%]">
            <Image src={neatSvg} className="w-full" alt="" />
          </div>
          <div className="text-white xl:text-[18px] lg:text-[16px] md:text-[13px] sd:text-[10px]">
            <h3>Start learning right away !</h3>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 h-full sd:w-full sd:h-full bg-inherit flex items-start md:items-center justify-center ">
        <div className="md:w-[90%] xl:w-[80%] sd:w-[80%] sd:h-auto lg:h-[85%] md:h-[80%] text-center md:bg-[#222222] sd:px-[8%] sd:py-[5%] md:py-0 flex flex-col justify-center items-center gap-1 rounded-[30px]">
          <h3 className="xl:text-[30px] lg:text-[25px] md:text-[22px] sd:text-[18px] text-white">
            Welcome Back
          </h3>

          <p className="xl:text-[16px] lg:text-[12px] text-white md:text-[10px] sd:text-[8px]">
            Don’t have an account ?{" "}
            <span style={{ color: "#E1348B" }}>
              <Link href={"/signup"}> Start for free </Link>
            </span>
          </p>

          <button
            onClick={()=>createWithGoogle(router)}
            className="flex xl:w-[90%] sd:w-[90%] xl:text-[15px] lg:text-[12px] md:text-[10px] sd:text-[10px] text-white items-center justify-center gap-2 xl:p-[2px] lg:p-1.5px xl:mt-8 lg:mt-6 md:mt-6 sd:mt-4 xl:border-2 sd:border-[1px] border-white rounded-lg"
          >
            <Image
              src={Google}
              alt=""
              className=" xl:w-[40px] lg:w-[35px] md:w-[30px]  sd:w-[20px]"
            />{" "}
            <span>Continue with Google</span>
          </button>

          <div className="flex w-[90%] items-center gap-1 xl:mt-4 lg:mt-2 sd:mt-2 text-white">
            <div className="w-[48%] h-0 lg:border-[.5px]  md:border-[.3px] sd:border-[.07px] border-[#696969] "></div>
            <h5 className="xl:text-[15px] lg:text-[12px] md:text-[10px] sd:text-[8px]">
              or
            </h5>
            <div className="w-[48%] h-0 lg:border-[.5px]  md:border-[.3px] sd:border-[.07px] border-[#696969]"></div>
          </div>
          <div className="xl:w-[90%] sd:w-full h-auto">
            <form className="w-full h-auto flex flex-col gap-4 md:mt-1 ">
              <div className="w-full h-auto flex flex-col text-white text-left">
                <span className="xl:text-[16px] lg:text-[14px] sd:text-[12px]">
                  Email
                </span>
                <div
                  style={{
                    "background-image":
                      "linear-gradient(177.81deg, rgba(255, 255, 255, 0.11) 1.84%, rgba(255, 255, 255, 0) 123.81%)",
                  }}
                  className="w-full h-auto flex  xl:p-4  md:p-3 sd:p-2 items-center justify-start rounded-[15px] overflow-hidden"
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
                    className="bg-inherit text-white w-full outline-none md:text-[12px] lg:text-[14px] sd:text-[12px]"
                    type="email"
                    placeholder="E-mail"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="w-full h-auto flex flex-col text-white text-left">
                <span className="xl:text-[16px] lg:text-[14px] sd:text-[12px] ">
                  Password
                </span>
                <div
                  style={{
                    "background-image":
                      "linear-gradient(177.81deg, rgba(255, 255, 255, 0.11) 1.84%, rgba(255, 255, 255, 0) 123.81%)",
                  }}
                  className="w-full h-auto flex  xl:p-4  md:p-3 sd:p-2 items-center justify-start rounded-[15px] overflow-hidden"
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
                    className="bg-inherit text-white w-full outline-none md:text-[12px] lg:text-[14px] sd:text-[12px]"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              <button
                className="w-full xl:p-4 md:p-3 sd:p-2 md:text-[12px] lg:text-[16px] sd:text-[14px] bg-pink text-white rounded-[15px]"
                onClick={handleLogin}
              >
                Log In
              </button>

              <div className="text-white xl:text-[15px] lg:text-[13px] md:text-[12px] sd:text-[10px]">
                <h5 onClick={() => handleResetPassword(email)}>
                  Forget Your Password ?
                </h5>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginComp;
