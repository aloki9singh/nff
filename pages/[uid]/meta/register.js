import { useEffect, useState } from "react";
import "@/styles/style/style.module.css";
<<<<<<< HEAD:pages/meta/register.js
import MentorRegFormStep1 from "@/components/mentor/registration/step1";
import MentorStep2 from "@/components/mentor/registration/step2";
import MentorStep3 from "@/components/mentor/registration/step3";
import MentorFinal from "@/components/mentor/registration/final";
import Congratulations from "@/components/mentor/registration/congrats";

=======
import MentorRegFormStep1 from "@/components/Mentor/MentorRegComponents/MentorRegFormStep1";
import MentorStep2 from "@/components/Mentor/MentorRegComponents/MentorStep2";
import MentorStep3 from "@/components/Mentor/MentorRegComponents/MentorStep3";
import MentorFinal from "@/components/Mentor/MentorRegComponents/MentorFinal";
import Congratulations from "@/components/Mentor/MentorRegComponents/congratulations";
import { useSelector } from "react-redux";
>>>>>>> fb7d19bffffe82f28eb6371ec4118fdd33f531a4:pages/[uid]/meta/register.js
import { useRouter } from "next/router";
const MentorRegForm = () => {
  const [regStepCount, setRegStepCount] = useState(1);
  const router=useRouter()
  // const { data } = useSelector((state) => state.authManagerMentor);
  // useEffect(() => {
  //   if (!data.verified) {
  //     router.push("/");
  //   }
  // }, []);
  // if (!data.verified) {
  //   return null; // Don't render the user if not verified
  // }
  return (
    <>
      {regStepCount == 5 && (
        <MentorRegFormStep1
          setRegStepCount={setRegStepCount}
          regStepCount={regStepCount}
        />
      )}
      {regStepCount == 2 && (
        <MentorStep2
          setRegStepCount={setRegStepCount}
          regStepCount={regStepCount}
        />
      )}
      {regStepCount == 3 && (
        <MentorStep3
          setRegStepCount={setRegStepCount}
          regStepCount={regStepCount}
        />
      )}
      {regStepCount == 4 && (
        <MentorFinal
          setRegStepCount={setRegStepCount}
          regStepCount={regStepCount}
        />
      )}
      {regStepCount == 1 && <Congratulations />}
    </>
  );
};

export default MentorRegForm;
