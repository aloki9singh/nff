// Needs rechecking Image not found mentorsign.png
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { sendPasswordResetEmail } from "firebase/auth";

import { AiOutlineMail } from "react-icons/ai";
import { FaLock } from "react-icons/fa";

import { auth, db } from "../../../config/firebaseconfig";

import { signUpMentor } from "@/lib/exportablefunctions";
import { useContext } from "react";
import { Loading } from "@/lib/context/contextprovider";
import { HashLoader } from "react-spinners";
import { collection, getDocs, query, where } from "firebase/firestore";

const MentorSignupcomp = () => {
  var { loading, setLoading } = useContext(Loading);
  const [role, setRole] = useState("mentor");
  const [userid, setuserid] = useState("");
  const router = useRouter();
  const [mentorLogData, setMentorLogData] = useState({
    email: "",
    pass: "",
  });

  const mentorDataFromInput = (e) => {
    const { name, value } = e.target;
    setMentorLogData((prevVal) => ({
      ...prevVal,
      [name]: value,
    }));
  };
  const { email, pass } = mentorLogData;

  const addNewMentor = async (e) => {
    e.preventDefault();
    if (!mentorLogData.email) {
      alert("Please enter your email");
      return;
    }
    if (!mentorLogData.pass) {
      alert("Please enter your password");
      return;
    }
    try {
      signUpMentor(
        mentorLogData,
        router,
        setLoading,
        role,
        setRole,
        setuserid,
        userid
      );
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  };
  const handleResetPassword = async () => {
    setLoading(true);
    try {
      if (!email) {
        alert("Please enter your email!");
      } else {
        // Find user by email
        const userQuery = query(
          collection(db, "allusers"),
          where("email", "==", email)
        );
        const userSnapshot = await getDocs(userQuery);

        console.log(userSnapshot);
        if (userSnapshot.empty) {
          alert("User not found!");
        } else {
          // Get the user document
          const user = userSnapshot.docs[0].data();

          if (user.role !== "mentor") {
            alert("You may be authorized for different role!");
            router.push("/");
          } else {
            const value = await sendPasswordResetEmail(auth, email);
            console.log(value);
            alert("Password reset email sent. Please check your inbox/spam.");
          }
        }
      }
    } catch (error) {
      alert("Error resetting password. Please try again.");
      console.error(error);
    }
    setLoading(false);
  };

  // console.log(loading)
  return (
    <div className={`${loading ? "pointer-events-none z-1" : ""}`}>
      {loading && (
        <div style={{ pointerEvents: "none", zIndex: 1 }}>
          <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
            <HashLoader color="#E1348B" size={80} />
          </div>
        </div>
      )}
      <main className="max-w-full md:h-screen   grid justify-center md:grid-cols-2 text-center text-white md:overflow-hidden">
        <div className=" m-auto w-full   ">
          <div className="flex justify-center md:pt-0  pt-[20px]  ">
            <div className="m-auto h-full ">
              <Image
                alt="Icon"
                src="/pagesgraphics/mentor/signupsuccess/Neatskills.svg"
                width={200}
                height={200}
                className="xl:w-[270px] lg:w-[220px] md:w-[180px] sd:w-[200px]"
              />
            </div>
          </div>

          <div className="w-full flex justify-center mt-5">
            <div className="m-auto w-full  ">
              <Image
                alt="Icon"
                src="/componentsgraphics/mentor/signup/teachingsample.svg"
                width={200}
                height={200}
                className=" md:p-10 md:w-[70%]    m-auto "
              />
            </div>
          </div>
        </div>
        <div className="m-auto md:mt-auto mt-[-20px] ">
          <div className="rounded-[25px] p-4 w-full   bg-[#15161B] md:bg-[#ffffff05] md:px-10 ">
            <p className="md:mt-[50px] md:text-[19px] text-sm">
              Do you want to become a mentor?
            </p>
            <p className="mt-[20px] text-sm">
              Sign up below to <span className="text-[#E1348B]">Register</span>
            </p>

            <hr
              style={{ border: "0.5px solid rgba(255, 255, 255, 0.32)" }}
              className="mt-5 w-10/12 m-auto"
            />

            <div className="md:m-5">
              <form method="post" action="#" onSubmit={addNewMentor}>
                <div
                  style={{
                    "background-image":
                      "linear-gradient(177.81deg, rgba(255, 255, 255, 0.11) 1.84%, rgba(255, 255, 255, 0) 123.81%)",
                  }}
                  className="flex rounded-[15px] md:mt-10 mt-5 bg-[#ffffff05] items-center"
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
                    type="email"
                    onChange={mentorDataFromInput}
                    value={mentorLogData.email}
                    required
                    autoComplete="off"
                    name="email"
                    id="email"
                    className="input p-3 cursor-pointer  focus:border-transparent focus:outline-none    rounded-lg  bg-transparent  w-[100%] text-sm "
                    placeholder="Enter your email"
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
                    onChange={mentorDataFromInput}
                    value={mentorLogData.pass}
                    autoComplete="off"
                    name="pass"
                    id="pass"
                    className="input p-3 cursor-pointer focus:border-transparent focus:outline-none  rounded-lg  bg-transparent  w-[100%] text-sm"
                    placeholder="Enter your pass"
                  />
                </div>

                <br />
                <p
                  onClick={handleResetPassword}
                  className=" cursor-pointer text-xs font-light mb-5 md:mt-[-30px] mt-[-40px]"
                >
                  Forgot Password ?
                </p>

                <button
                  type="submit"
                  className="bg-[#E1348B] w-[100%]  p-2 rounded-[10px]"
                >
                  {loading ? (
                    <span className="text-base">Signing ...</span>
                  ) : (
                    "Sign Up"
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
    </div>
  );
};

export default MentorSignupcomp;
