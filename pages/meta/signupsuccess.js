import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { callEmailApiMentor } from "@/lib/api";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/config/firebaseconfig";
import { useContext } from "react";
import withAuth from "@/lib/context/mentorcontext"
import { Loading } from "@/lib/context/contextprovider";
import { HashLoader } from "react-spinners";



const detailadd = async (id) => {
  const res = await fetch(`/api/signup/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ verified: true }),
  });
  const data = await res.json();

  if (res.status === 404) {
    alert("error");
    console.log("Error!");
  } else {
    console.log("Data Added Successfully");
  }
};
const MentorSignupSuccess = () => {
  const router = useRouter();
  const { loading, setLoading } = useContext(Loading);
  const displayName = router.query.email;
  const email = router.query.email;
  let arr = { displayName, email };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        user.emailVerified = true;
        await detailadd(user.uid);
      }
    });
    // if (!email) {
    //   router.push("/");
    // }
    return () => unsubscribe(); // Cleanup the listener
  }, []);

  const sentWelcomeMail = async () => {
    try {
      await callEmailApiMentor(arr);
    } catch (error) {
      console.log(error);
    }
  };
  // if (!email) {
  //   return null; // Don't render the user if not verified
  // }
  return (
    <>
    <div className="m-7">
    <Image alt="Icon" src="/pagesgraphics/mentor/signupsuccess/Neatskills.svg" width={150} height={150} />
  </div>
    <div className={`${loading ? "pointer-events-none z-1" : ""}`}>
      {loading && (
        <div style={{ pointerEvents: "none", zIndex: 1 }}>
          <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
            <HashLoader color="#E1348B" size={80} />
          </div>
        </div>
      )}
    <div className="flex justify-center items-center h-[85vh]">
      <div className="text-white text-center bg-[#FFFFFF05] w-fit rounded-3xl p-8 max-[780px]:m-8">
        <div className="md:m-auto">
          <div className="m-auto flex-col justify-center p-8 w-fit h-auto">
            <div>
              <p className="text-center text-4xl">
                You have successfully Signed up
              </p>
              <p className="mt-4 text-[#FFFFFF] text-m">
                Please click on proceed to start your registration
              </p>
            </div>
            <div className="flex justify-center m-10">
              <Image
                src="/pagesgraphics/mentor/signupsuccess/signupsuccess.svg"
                width={400}
                height={400}
                alt="businesswomen"
              />
            </div>
            <div>
              <div className="mt-10">
                <Link href="/meta/register">
                  <button
                    onClick={sentWelcomeMail}
                    className="p-2 font-semibold border rounded-lg bg-[#E1348B] w-[100%] md:m-auto w-fit px-12"
                  >
                    Proceed
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>   
    </div>
    </>
  );
};

export default withAuth(MentorSignupSuccess, "/meta/signup");
