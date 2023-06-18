import React from "react";
import Image from "next/image";
import styles from "@/styles/componentsstyling/auth/auth.module.css";

import NeatS from "../../public/Neatskills.svg";
import neatSvg from "../../public/Auth/Group 2.svg";
import Google from "../../public/Auth/_Google.svg";

import { AiOutlineMail } from "react-icons/ai";
import { FaLock } from "react-icons/fa";

import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";
import Link from "next/link";
import { callEmailApi, callVerificationEmailApi } from "../../lib/api";
import { signUp } from "../../lib/exportableFunctions";
// import { adminAuth } from '../config/firebaseAdminConfig';

function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  

  const handleSignup = async (e) => {
    if (!email) {
      alert("Please enter your email");
      return;
    }
    if (!password) {
      alert("Please enter your password");
      return;
    }
    e.preventDefault();
    try {
      await signUp(email, password,router);
      // routing towards add profile details page
    } catch (error) {
      console.log(error);
    }
  };

  async function createWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      const { displayName, email } = user;
      const data = { displayName, email };
      await callEmailApi(data);
      alert("Sign up successful!!");
      // router.push('/course-overview');
      router.push("/profileContinuepage");
    } catch (error) {
      console.error("Failed to sign up with Google:", error);
    }
  }

  return (
    <>
      <div className="md:w-1/2 md:h-full sd:w-full sd:h-1/3 bg-inherit  ">

        <div className='h-full w-full py-8 md:py-20 flex flex-col items-center justify-center md:gap-8 sd:gap-2 relative  '>
          <Image className="xl:w-[270px] lg:w-[220px] md:w-[180px] sd:w-[130px]" src={NeatS} alt="" />
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
        <div className="md:w-[90%] xl:w-[80%] sd:w-[80%] sd:h-[auto] lg:h-[85%] md:h-[80%] text-center bg-signupForm px-[10%] flex flex-col justify-center items-center gap-1 rounded-[30px]">
          <h3 className="xl:text-[30px] lg:text-[25px] md:text-[22px] sd:text-[18px] text-white">Get started for free</h3>


          <p className="xl:text-[16px] lg:text-[12px] text-white md:text-[10px] sd:text-[8px]">
            Already have an account ?{" "}
            <span style={{ color: "#E1348B" }}>
              <Link href={"/login"}> Log In </Link>
            </span>
          </p>

          <button
            onClick={createWithGoogle}
            className="flex xl:w-[90%] sd:w-full xl:text-[15px] lg:text-[12px] md:text-[10px] sd:text-[10px] text-white items-center justify-center gap-2 xl:p-[2px] lg:p-1.5px xl:mt-8 lg:mt-6 md:mt-6 sd:mt-4 xl:border-2 sd:border-[1px] border-white rounded-lg"
          >
            <Image
              src={Google}
              alt=""
              className=" xl:w-[40px] lg:w-[35px] md:w-[30px]  sd:w-[20px]"
            />{" "}
            <span>Continue with Google</span>
          </button>

          <div className="flex w-[90%] items-center gap-1 xl:mt-4 lg:mt-2 sd:mt-2 text-white">
            <div className="w-[48%] h-0 lg:border-[.5px]  md:border-[.3px] sd:border-[.07px] border-orBorder "></div>
            <h5 className="xl:text-[15px] lg:text-[12px] md:text-[10px] sd:text-[8px]">
              or
            </h5>
            <div className="w-[48%] h-0 lg:border-[.5px]  md:border-[.3px] sd:border-[.07px] border-orBorder"></div>
          </div>
          <div className="xl:w-[90%] md:w-full h-auto">
            <form className="w-full h-auto flex flex-col gap-4 md:mt-1 ">
              <div className="w-full h-auto flex flex-col text-white text-left">

                <span className="xl:text-[16px] lg:text-[14px] sd:text-[12px]">Email</span>
                <div
                  style={{
                    "background-image":
                      "linear-gradient(177.81deg, rgba(255, 255, 255, 0.11) 1.84%, rgba(255, 255, 255, 0) 123.81%)",
                  }}
                  className="w-full h-auto flex  xl:p-4  md:p-3 sd:p-2 items-center justify-start rounded-[15px] overflow-hidden">

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

                <span className="xl:text-[16px] lg:text-[14px] sd:text-[12px] ">Password</span>
                <div
                  style={{
                    "background-image":
                      "linear-gradient(177.81deg, rgba(255, 255, 255, 0.11) 1.84%, rgba(255, 255, 255, 0) 123.81%)",
                  }}
                  className="w-full h-auto flex  xl:p-4  md:p-3 sd:p-2 items-center justify-start rounded-[15px] overflow-hidden">

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
              {/* <Link href={"/signup"} */}
              <button
                className="w-full xl:p-4 md:p-3 sd:p-2 md:text-[12px] lg:text-[16px] sd:text-[14px] bg-pink text-white rounded-lg"
                onClick={handleSignup}
              >
                Create Account
              </button>

              <div className="text-white xl:text-[15px] lg:text-[13px] md:text-[12px] sd:text-[10px]">
                <h5>
                  By signing up, I agree to Neat Skill's Terms of Service &
                  Privacy Policy.
                </h5>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;