import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { callEmailApiMentor } from "@/lib/api";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { auth } from "@/config/firebaseConfig";
const detailadd = async (id) => {
  const res = await fetch(`/api/mentorsdetail/${id}`, {
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
const signupsuccess = () => {
  const router = useRouter();

  const displayName = router.query.email;
  const email = router.query.email;
  let arr = { displayName, email };
  //   const { data } = useSelector((state) => state.authManagerMentor);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        user.emailVerified = true;
        // data.email = user.email
        // data.role = "mentor"
        // data.uid = user.uid
        // data.verified = true
        await detailadd(user.uid);
      }
    });
    // if (!email) {
    //   router.push("/");
    // }
    return () => unsubscribe(); // Cleanup the listener
  }, []);

  //   const sentWelcomeMail = async () => {
  //     try {
  //       await callEmailApiMentor(arr);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  // if (!email) {
  //   return null; // Don't render the user if not verified
  // }
  return (
    <div className="text-white text-center">
      <div className="md:w-[80%] md:m-auto my-auto">
        <div className="flex justify-start m-7">
          <Image alt="Icon" src="/pagesgraphics/mentor/signupsuccess/Neatskills.svg" width={150} height={150} />
        </div>
        <div className="m-auto flex-col justify-center p-10 w-full rounded-[25px] sm:bg-[#ffffff03] h-auto">
          <div>
            <p className="text-center text-2xl">
            Welcome back, Raviraj!
            </p>
            <p className="mt-4 text-[#FFFFFF] text-sm">
            Please click on proceed to start  creating your account.
            </p>
          </div>
          <div className="flex justify-center m-10">
            <Image
              src="/pagesgraphics/mentor/signupsuccess/signupsuccess.svg"
              width={300}
              height={200}
              alt="businesswomen"
            />
          </div>
          <div>
            <div className="mt-10">
              <Link href="/MentorRegForm">
                <button
                  //   onClick={sentWelcomeMail}
                  className="p-2 border rounded-lg pr-5 pl-5 bg-[#A145CD] w-[100%] md:m-auto md:w-[20%]"
                >
                  Proceed
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default signupsuccess;
