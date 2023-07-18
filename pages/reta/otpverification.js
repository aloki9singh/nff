// in mobile view needed to be fixed make it unscrollable

import axios from "axios";
import Image from "next/image";
import React, { useContext, useRef, useState } from "react";
import CryptoJS from "crypto-js";
import { useRouter } from "next/router";
import { generateOTP, sendOTP } from "@/lib/exportablefunctions";
import { useEffect } from "react";
import { auth } from "@/config/firebaseconfig";
import { Loading, userLogger } from "@/lib/context/contextprovider";
import { HashLoader } from "react-spinners";

const Otpverification = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [flag, setFlag] = useState(false);
  const [sendAgain, setsendAgain] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const { loading, setLoading } = useContext(Loading);
  const inputRefs = useRef([]);
  const maxLength = 1; // Maximum length for each input field
  const router = useRouter();

  const handleKeyUp = (index, event) => {
    if (event.key === "Backspace" && event.target.value === "") {
      // Check if Backspace key was pressed and the current input value is empty
      const previousIndex = index - 1;
      setFlag(false);
      if (previousIndex >= 0) {
        // Check if there is a previous input field
        inputRefs.current[previousIndex].focus(); // Move the focus to the previous input field
      }
    } else if (event.target.value.length >= maxLength) {
      // Check if the current input value has reached the maximum length
      const nextIndex = index + 1;

      if (nextIndex < inputRefs.current.length) {
        // Check if there is a next input field
        inputRefs.current[nextIndex].focus(); // Move the focus to the next input field
      } else {
        // If it's the last input field, gather all input values to form the OTP
        const otpValues = inputRefs.current.map((ref) => ref.value);
        const otpCode = otpValues.join("");
        setOtp(otpCode);

        // this  is to color button on fill
        const isFilled = otpValues.every((value) => value !== "");
        if (isFilled) {
          setFlag(true);
        } else {
          setFlag(false);
        }
      }
    }
  };
  //verify otp
  const handleOtpVerification = async () => {
    setLoading(true);
    const encryptedOTP = localStorage.getItem("otp");
    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY_FOR_OTP_ENCRYPTION;
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedOTP, secretKey);
    const decryptedOTP = decryptedBytes.toString(CryptoJS.enc.Utf8);
    if (otp === decryptedOTP) {
      //   console.log("OTP verification successful");
      const isAdmin = localStorage.setItem("isAdmin", JSON.stringify(true));
      router.push("/reta/dashboard");
    } else {
      alert("Invalid OTP");
      //   console.log("Invalid OTP");
    }
    setLoading(false);
  };
  //send OTP again
  const sendOTPAgain = async () => {
    setLoading(true);
    try {
      const otp = generateOTP(6);
      const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY_FOR_OTP_ENCRYPTION;
      const encryptedOTP = CryptoJS.AES.encrypt(otp, secretKey).toString();
      localStorage.setItem("otp", encryptedOTP);
      const data = { email, otp };
      await sendOTP(data);
      setsendAgain(true);
      setTimeout(() => {
        setsendAgain(false);
      }, 1500);
    } catch (error) {
      alert(error.message);
      setsendAgain(false);
    }
    setLoading(false);
  };

  //email verify and disturbroutes

  useEffect(() => {
    localStorage.setItem("isAdmin", JSON.stringify(false));
    const email = JSON.parse(localStorage.getItem("email")) || "";
    setEmail(email);
    setTimeout(() => {
      setShowMessage(true);
    }, 1500);
  }, []);
  return (
    <div className={`${loading ? "pointer-events-none z-1" : ""}`}>
      {loading && (
        <div style={{ pointerEvents: "none", zIndex: 1 }}>
          <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
            <HashLoader color="#E1348B" size={80} />
          </div>
        </div>
      )}
      <div className=" md:h-screen h-[92vh] align-middle flex justify-center">
        {/* <div className="absolute right-0 top-0 text-white bg-[#373A41] justify-center align-middle flex w-[200px] h-[150px] text-sm">
            <div>OTP was sent!.</div>
        </div> */}

        {!showMessage && (
          <div className="fixed top-0 right-0 w-44 h-28 bg-[#373A41] text-white flex justify-center items-center text-sm rounded-md shadow-md animate-slide-in border-[#E1348B] border-[1px]  ">
            <div>OTP was sent!</div>
          </div>
        )}
        {sendAgain && (
          <div className="fixed top-0 right-0 w-44 h-28 bg-[#373A41] text-white flex justify-center items-center text-sm rounded-md shadow-md animate-slide-in border-[#E1348B] border-[1px]  ">
            <div>OTP was sent!</div>
          </div>
        )}
        <div className="  text-white  text-center my-auto space-y-5">
          <div className="flex justify-center">
            <Image
              alt="Icon"
              width={"100"}
              height={"100"}
              src="/pagesgraphics/admin/login/otpverification.svg"
            />
          </div>

          <h1 className="text-2xl">Admin Verification</h1>
          <p className=" text-gray-600">
            Enter OTP Code sent to <span>{email}</span>{" "}
          </p>
          <div className="flex gap-2 md:gap-5 justify-center pt-10 pb-5  ">
            {Array.from({ length: 6 }, (_, index) => (
              <input
                key={index}
                type="text"
                maxLength={maxLength}
                className="md:w-[75px] md:h-[75px] w-[50px] h-[50px] bg-[#373A41] rounded-[10px] border-[#D9D9D9] text-white text-lg text-center"
                ref={(el) => (inputRefs.current[index] = el)} // Save the reference to each input field
                onKeyUp={(event) => handleKeyUp(index, event)} // Call the event handler for each input field
              />
            ))}
          </div>

          <div className="text-sm">
            {" "}
            Did not receive the code?{" "}
            <span className="cursor-pointer font-semibold" onClick={sendOTPAgain}>
              Send again.
            </span>{" "}
          </div>

          <div>
            <button
              type="button"
              className={`  px-12 py-2 text-sm rounded  font-Inter ${
                flag ? "bg-[#E1348B]" : "bg-[#373A41]"
              }`}
              onClick={handleOtpVerification}
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otpverification;
