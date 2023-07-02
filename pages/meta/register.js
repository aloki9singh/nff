import { useEffect, useState } from "react";

import "@/styles/style/style.module.css";

import MentorRegFormStep1 from "@/components/mentor/registration/step1";
import MentorStep2 from "@/components/mentor/registration/step2";
import MentorStep3 from "@/components/mentor/registration/step3";
import MentorFinal from "@/components/mentor/registration/final";
import Congratulations from "@/components/mentor/registration/congrats";
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
      {regStepCount == 1 && (
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
      {regStepCount == 5 && <Congratulations />}
    </>
  );
};

export default MentorRegForm;
