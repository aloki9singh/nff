import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { callVerificationEmailApiMentor } from "@/lib/api";
import { updateProfile } from "firebase/auth";

import { auth } from "@/config/firebaseconfig";
import { useContext } from "react";
import { Loading } from "@/lib/context/contextprovider";
import { HashLoader } from "react-spinners";
import Link from "next/link";

const MentorVerify = () => {
  const [email, setEMail] = useState("");
  const { loading, setLoading } = useContext(Loading);
  const router = useRouter();
  var datas = { displayName: email, email };
  const user = auth.currentUser;

  const resendMail = async () => {
    setLoading(true);
    try {
      const val = await callVerificationEmailApiMentor(datas);
      auth.currentUser.isAnonymous = true;
      alert("Verification email sent again!!");
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!user) {
      window.location.href = "/";
    } else {
      var useremail = user.email;
      setEMail(useremail);
    }
  }, [user]);

  if (!user) {
    return null; // Don't render the user if not verified
  }
  return (
    <div className={`${loading ? "pointer-events-none z-1" : "mx-3 "}`}>
      {loading && (
        <div style={{ pointerEvents: "none", zIndex: 1 }}>
          <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
            <HashLoader color="#E1348B" size={80} />
          </div>
        </div>
      )}
      <div className="md:h-[100vh] h-[90vh] flex align-middle m-auto flex-col justify-center align-center max-w-sm sm:max-w-xl text-white text-center space-x-2">
        <div>
          <p className="text-center text-3xl">Verify your email</p>
          <p className="mt-5">
            You will need to verify your email to complete your registration.
          </p>
        </div>
        <div className="flex justify-center m-10 relative">
          <Image
            src="/pagesgraphics/mentor/verification/freepik--paper-planes--inject-41.svg"
            alt="Icon"
            width={250}
            height={130}
          />
          <Image
            src="/pagesgraphics/mentor/verification/Group 1997.svg"
            alt="Icon"
            width={90}
            height={90}
            className="absolute bottom-[40%] right-[25%]"
          />
          <Image
            src="/pagesgraphics/mentor/verification/freepik--speech-bubble--inject-41.svg"
            alt="Icon"
            width={60}
            height={90}
            className="absolute bottom-[20%] right-[25%]"
          />
        </div>
        <div>
          <p className="text-xs font-light mx-2">
            An email has been sent to {email} with a link to verify your
            account.If you have not received the email after a few minutes
            ,please check your spam folder.
          </p>
          <div className="flex justify-around mt-10 text-sm md:text-base">
            {" "}
            <button
              onClick={resendMail}
              className="p-2 m-3   rounded-lg pr-5 pl-5 bg-[#E1348B] hover:bg-transparent border border-[#E1348B] hover:text-[#E1348B] transition-all duration-200  "
            >
              {loading ? "Sending..." : "Resend Email"}
            </button>
            <Link href={"/meta/contactus"}>
              <button className="p-2 m-3 border rounded-lg pr-5 pl-5 text-[#E1348B] border-[#E1348B] hover:bg-[#E1348B] hover:text-white transition-all duration-200 ">
                Contact Support
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorVerify;
