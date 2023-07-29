import React, { useState } from "react";
import ChoosePlan from "@/components/student/payment/plan";
import { useAuthContext } from "@/lib/context/AuthContext";
import { useRouter } from "next/router";
import { db } from "@/config/firebaseconfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { accountcleanup } from "@/pages/api/signup/index";
import CourseAccess from "@/lib/context/AccessCourseContext";
import ToastMessage from "@/components/student/payment/ToastMessage";


const Payment = ({updatePage, updatePrice}) => {

  const router = useRouter();
  const { user, userProfile } = useAuthContext();
  const [SideBarState, sendSideBarState] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const [showToast, setShowToast] = useState(false);

  let isTrialValid = true;

  if (user) {
    isTrialValid = CourseAccess(user.uid).isTrialValid;
  }


  const handleToastMessage = () => {
    setShowToast(true);
  };

  const styles = `
    .myClass {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1440' height='1012' viewBox='0 0 1440 1012' fill='none'%3E%3Cpath opacity='0.54' d='M881.288 1196.87C705.969 1179.04 207.581 1209.43 -383.417 1473.54L-551.57 493.971C-501.112 470.272 -396.61 421.837 -382.268 417.683C-251.982 351.669 150.434 190.453 752.548 216.331C911.832 232.306 1277.06 253.161 1463.71 208.783C1634.65 177.113 2024.9 91.1137 2218.42 0.475026L2391.02 973.228C2313.09 1008.5 2129.11 1088.47 2016.66 1126.12C1942.01 1148.07 1754.55 1193.53 1601.84 1199.72C1487.07 1208.02 1182.29 1219.06 881.288 1196.87Z' fill='url(%23paint0_linear_4957_11156)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_4957_11156' x1='810.911' y1='136.258' x2='827.708' y2='964.837' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23EF75B3' stop-opacity='0.59'/%3E%3Cstop offset='1' stop-color='%23E1348B' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E");
        background-repeat: no-repeat no-repeat;
        background-position: center center;
        background-size: cover;
    }
  `;

  const handleClickFreeTrail = async (e) => {
    e.preventDefault();
    if (!user || !userProfile) {
      router.push("/beta/login");
    }

    if (!user || !userProfile) {
      return null;
    }

    if (user) {
      const trialStartDate = new Date();
      const startdate = trialStartDate.toString();
      const trialEndDate = new Date(trialStartDate.getTime() + 1 * 24 * 60 * 60 * 1000);

      const trialData = {
        trial: {
          trialStartDate: startdate,
          trialEndDate: trialEndDate,
        },
        trialValid: false,
        courseAccess: true,
      };

      try {
        const userRef = doc(db, "allusers", user.uid); // searching if user exists or not
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          await updateDoc(userRef, trialData); // exist condition update the doc
        }

        handleToastMessage();

      } catch (error) {
        console.error("Error activating trial:", error);
      }

    }
  };

  return (
    <>
      <div
        className={` h-screen ${showToast ? "blur-lg" : null
          }`}
      >
        {showToast && (
          <ToastMessage
            heading="Trial Activated"
            message="Learn and become your best with Neatskills by getting started with course"
          />
        )}
        <style>{styles}</style>
        
        <div className="w-full bg-[#0D0E14] overflow-hidden">
          <div className="text-center text-white text-lg">
            <h1 className="text-[2.2rem] font-bold">Subscribe</h1>
            <p className="mb-4">Join NeatSkills & Choose From The Below Plan</p>
          </div>
          <div className="md:h-screen myClass flex flex-col items-center text-white font-Inter">
            <ChoosePlan
              clickEvent={(e) => handleClickFreeTrail(e)}
              trial={isTrialValid}

              updatePrice = {updatePrice}

              updatePage = {(e) => updatePage(e)}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Payment;

