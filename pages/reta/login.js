
// it is admin login page

import { useContext, useEffect, useState } from "react";
import NeatS from "/public/componentsgraphics/schools/login/neatskillslogosample.svg";
import Woman from "@/public/pagesgraphics/admin/login/Adminlogingraphic.svg";
import { AiOutlineMail } from "react-icons/ai";
import Image from "next/image";
import { FaLock } from "react-icons/fa";
import { useRouter } from "next/router";
import {
  callSignupApi,
  generateOTP,
  handleResetPassword,
  sendOTP,
} from "@/lib/exportablefunctions";
import CryptoJS from "crypto-js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "@/config/firebaseconfig";
import { Loading } from "@/lib/context/contextprovider";
import { HashLoader } from "react-spinners";
import { getDoc, doc } from "@firebase/firestore";

function Adminlogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [blinkingIndex, setBlinkingIndex] = useState(0);
  const router = useRouter();
  const { loading, setLoading } = useContext(Loading);
  async function handleLogin(e) {
    e.preventDefault();
    // ----------------------------------------------------------------------
    // this section will Signup user as admin comment login section trycatch  and uncomment this trycatch and vice-versa
    //  signup trycatch
    // open this trycatch to register admin

    // try {
    //   const userCredential = await createUserWithEmailAndPassword(
    //     auth,
    //     email,
    //     password
    //   );
    //   const { user } = userCredential;
    //   const data = {
    //     uid: user.uid,
    //     displayName: user.email,
    //     email: user.email,
    //     photoURL: user.photoURL,
    //     authCode: authCode,
    //     role: "admin",
    //        verified:true
    //   };

    //   await callSignupApi(data);
    //   console.log("Success");
    // } catch (error) {
    //   if (error.message == "Firebase: Error (auth/email-already-in-use).") {
    //     signInWithEmailAndPassword(auth, email, password);
    //     console.log("Success Logged");
    //   } else {
    //     console.log(error);
    //   }
    // }
    //  ------------------------------------------------------------------------------------
    // login  trycatch, otp };
    //open this trycatch to login admin
      // Prev login code but it is not working properly
        // const data = await response.json();
    // if (response.ok) {
    //   const otp = generateOTP(6);
    //   const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY_FOR_OTP_ENCRYPTION;
    //   const encryptedOTP = CryptoJS.AES.encrypt(otp, secretKey).toString();
    //   localStorage.setItem("otp", encryptedOTP);
    //   localStorage.setItem("email", JSON.stringify(email));
    //   const data = { email, otp };
    //   await sendOTP(data).then((res) => console.log(res));
    //   router.push("/reta/otpverification");
    //   console.log("Login Successful");
    // } else {
    //   if (data.error.includes("Firebase: Error (auth/wrong-password)")) {
    //     alert("Please check Your Credentials.");
    //   } else if (data.error.includes("Internal server error")) {
    //     alert("Please check Your Credentials.");
    //   } 
    // else {
    //     alert("Please check Your Credentials.");
    //     console.log("Error logging in:", data.error);
    //   }
    // }
    // New login method
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;
      // Retrieve user document from the database
      const userDoc = await getDoc(doc(db, "allusers", user.uid));
      const userData = userDoc.data();

      if (userData.authCode !== authCode) {
        alert({ error: "Invalid authentication code" });
      }

      // Check if the user has the required role
      if (userData.role !== "admin") {
        alert({ error: "Unauthorized User" });
      }
      // Successful login
      const otp = generateOTP(6);
      const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY_FOR_OTP_ENCRYPTION;
      const encryptedOTP = CryptoJS.AES.encrypt(otp, secretKey).toString();
      localStorage.setItem("otp", encryptedOTP);
      localStorage.setItem("email", JSON.stringify(email));
      const data = { email, otp };
      await sendOTP(data).then((res) => console.log(res));
      router.push("/reta/otpverification");
      console.log("Login Successful");
      setLoading(false);
    }
    catch (error) {
      if (error.message=="Firebase: Error (auth/wrong-password)") {
        alert("Please check Your Credentials.");
      } else if (error.message=="Internal server error") {
        alert("Please check Your Credentials.");
      }
      else {
        alert("Please check Your Credentials.");
        console.log("Error logging in:", error);
      }
      setLoading(false)
    }
  }
  useEffect(() => {
    localStorage.setItem("isAdmin", JSON.stringify(false));
    const interval = setInterval(() => {
      setBlinkingIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 500);
    return () => {
      clearInterval(interval);
    };
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
      <main
        className={`max-w-full md:h-screen   grid justify-center md:grid-cols-2 text-center text-white md:overflow-hidden `}
      >
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

          <div className="w-full flex justify-center mt-5 py-5">
            <div className="m-auto w-full relative">
              <div className="absolute inset-0 rounded-[100%] filter blur-3xl bg-[#A145CD]  opacity-75 w-[50%] m-auto"></div>
              <Image
                alt="Icon"
                src={Woman}
                width={150}
                height={150}
                className="md:p-10 md:w-[50%] m-auto relative z-10"
              />
            </div>
          </div>

          <div>
            <p className="hidden md:block text-normal text-sm  pb-[20px]">
              Control everthing, from one place
            </p>
            <div className="  hidden  md:flex justify-center gap-2 ">
              <div
                className={`w-[50px] h-[7px] rounded ${blinkingIndex === 0 ? "bg-white" : "bg-gray-500"
                  }`}
              ></div>
              <div
                className={`w-[50px] h-[7px] rounded ${blinkingIndex === 1 ? "bg-white" : "bg-gray-500"
                  }`}
              ></div>
              <div
                className={`w-[50px] h-[7px] rounded ${blinkingIndex === 2 ? "bg-white" : "bg-gray-500"
                  }`}
              ></div>
            </div>
          </div>
        </div>
        <div className="m-auto md:mt-auto  ">
          <div className="rounded-[25px] p-4 w-full   bg-[#15161B] md:bg-[#ffffff05] px-5  ">
            <h1 className="md:mt-[30px] md:text-2xl">Admin Control</h1>

            <div className=" md:pb-5 md:px-10 ">
              <form method="post" action="#" onSubmit={(e) => handleLogin(e)}>
                <div
                  style={{
                    "background-image":
                      "linear-gradient(177.81deg, rgba(255, 255, 255, 0.11) 1.84%, rgba(255, 255, 255, 0) 123.81%)",
                  }}
                  className="  flex rounded-[15px] md:mt-10 mt-5 bg-[#ffffff05] items-center "
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
                    className="input  p-3 pr-10 cursor-pointer  focus:border-transparent focus:outline-none    rounded-lg  bg-transparent  w-[100%] text-sm "
                  />
                </div>

                <div
                  style={{
                    "background-image":
                      "linear-gradient(177.81deg, rgba(255, 255, 255, 0.11) 1.84%, rgba(255, 255, 255, 0) 123.81%)",
                  }}
                  className="   flex rounded-[15px]   my-8 bg-[#ffffff05] items-center "
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
                    className="input  p-3 pr-10 cursor-pointer focus:border-transparent focus:outline-none  rounded-lg  bg-transparent  w-[100%] text-sm"
                  />
                </div>
                <div
                  style={{
                    "background-image":
                      "linear-gradient(177.81deg, rgba(255, 255, 255, 0.11) 1.84%, rgba(255, 255, 255, 0) 123.81%)",
                  }}
                  className="   flex rounded-[15px]   my-8 bg-[#ffffff05] items-center "
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
                    placeholder="Enter your unique id"
                    className="input  p-3 pr-10 cursor-pointer focus:border-transparent focus:outline-none  rounded-lg  bg-transparent  w-[100%] text-sm"
                  />
                </div>

                <br />
                <p
                  onClick={() => handleResetPassword(email)}
                  className=" cursor-pointer text-xs font-light mb-5 md:mt-[-30px] mt-[-40px]"
                >
                  Forgot Password ?
                </p>

                <button
                  type="submit"
                  className="bg-[#E1348B] md:w-[100%] w-[50%] p-2 py-3  rounded-[10px]"
                >
                  {false ? (
                    <span className="text-base">Logging In ...</span>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Adminlogin;
