// in mobile view needed to be fixed make it unscrollable

import axios from "axios";
import Image from "next/image";
import React, { useRef, useState } from "react";

const otpverification = () => {
  const [otp, setOtp] = useState("");
  const inputRefs = useRef([]);
  const maxLength = 1; // Maximum length for each input field

  const handleKeyUp = (index, event) => {
    if (event.key === "Backspace" && event.target.value === "") {
      // Check if Backspace key was pressed and the current input value is empty
      const previousIndex = index - 1;

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
      }
    }
  };
  const handleOtpVerification = async () => {
    try {
      const response = await axios.post("/api/verifyOTP", { otp });
      console.log(response.data.message);
    } catch (error) {
      console.error("Failed to verify OTP:", error.response.data.error);
    }
  };
  return (
    <div className=" md:h-screen h-[92vh] align-middle flex justify-center">
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
          Enter OTP Code sent to <span>+91 1234567890</span>{" "}
        </p>
        <div className="flex gap-5 justify-center pt-10 pb-5 ">
          {Array.from({ length: 5 }, (_, index) => (
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

        <div className="text-sm"> Did not receive the code? Send again.</div>

        <div>
          <button
            type="button"
            className=" bg-[#373A41] px-12 py-2 text-sm rounded  font-Inter"
            onClick={handleOtpVerification}
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default otpverification;
