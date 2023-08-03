import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiOutlineArrowRight } from "react-icons/ai";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebaseconfig";
import { detailadd } from "@/lib/exportablefunctions";
import { callEmailApi } from "@/lib/api";
import { HashLoader } from "react-spinners";
import { useContext } from "react";
import { Loading } from "@/lib/context/contextprovider";
import { useAuthContext } from "@/lib/context/AuthContext";
import Layout from "@/components/common/Layout/Layout";

const ProfileContinuepage = () => {
  const router = useRouter();

  //context for user data and loading
  const { userProfile, user } = useAuthContext();
  const { loading, setLoading } = useContext(Loading);

  //refers to profile details page
  function handleContinueClick() {
    router.push("/beta/profiledetails");
  }

  //checking wether the email address is verified or not
  useEffect(() => {
    const isEmailVerified =
      new URLSearchParams(window.location.search).get("mode") === "verifyEmail";
    if (isEmailVerified) {
      // Display a message to inform the user that their email has been verified
      alert("Your email has been verified. You can now log in.");
    }

    // verification on firebase for the user 
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        user.emailVerified = true;
        const data = { verified: true };
        await detailadd(userProfile.uid, data);
        await callEmailApi({
          displayName: user.email.substring(0, 5),
          email: user.email,
        });
      }

    });
    return () => unsubscribe(); // Cleanup the listener
  }, [userProfile]);

  return (
    <Layout pageTitle="Profile Continue">
    <div className={`${loading ? "pointer-events-none z-1" : ""}`}>
      {loading && (
        <div style={{ pointerEvents: "none", zIndex: 1 }}>
          <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
            <HashLoader color="#E1348B" size={80} />
          </div>
        </div>
      )}
      <div className="flex md:h-screen">
        {/* <Sidebar /> */}
        <div className="w-full flex flex-col">
          {/* <NavBarSecond buttonVis="hidden" title="Contact Us" /> */}
          <div className="uppercase  w-[112px] md:w-[186px] md:h-[71px] flex-shrink-0">
            <Image
              src="/pagesgraphics/student/profilecontinue/Neatskills.svg"
              alt="logo"
              className="w-full h-full object-contain md:ml-10 ml-7 mt-5"
              width={100}
              height={100}
            />
          </div>
          <div className=" md:px-30 px-5  text-white  flex justify-center  relative w-1440px h-[calc(100%-43px)]  ">
            {/* Ellipses */}
            <div className="absolute z-0 inset-0 flex items-center justify-center ">
              <div
                className=" md:w-80 w-20 md:h-80 h-40 rounded-full bg-[#B26ED3] bg-opacity-30 blur-2xl  "
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -25%)",
                }}
              ></div>

              <div
                className="md:w-80 w-30 md:h-80 h-40 rounded-full bg-[#DD4A94] bg-opacity-30 absolute blur-2xl end-2 "
                style={{
                  top: "55%",
                  left: "calc(50% + 100px)",
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
            </div>

            {/* add profile lines  */}
            <div className="relative flex flex-col items-center md:space-y-0 space-y-5 md:p-0 p-5 w-fit m-auto translate-y-[-5%]">
              <div className=" flex  justify-center w-full sm:mx-0 sm:mb-4 sm:w-350px  ">
                <h1 className=" sm:px-20  mt-20 sm:h-20 not-italic font-bold text-3xl sm:text-6xl text-white text-center">
                  Add <span className="text-[#A145CD]"> Profile Details</span>
                </h1>
              </div>
              <div className="">
                <h2 className="flex justify-center  text-white  sm:mt-2 text-center">
                  Complete your profile to access the courses
                </h2>
              </div>
              {/* image section */}
              <div className="flex justify-center mb-8 p-8">
                <Image
                  src="/pagesgraphics/student/profilecontinue/businessexplaintowomen.svg"
                  alt="My Image"
                  width={400}
                  height={400}
                  className=""
                />
              </div>
              {/* button sec */}
              <div className=" flex justify-center -translate-y-5 md:pt-0 mt-5">
                <button
                  type="button"
                  onClick={handleContinueClick}
                  className="px-6 py-3 bg-[#A145CD]  rounded-lg text-white shadow-md hover:bg-gray-200 hover:text-black "
                >
                  <div className="flex gap-2">
                    <span> Continue</span>
                    <span className="m-auto">
                      {" "}
                      <AiOutlineArrowRight />
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default ProfileContinuepage;
