import { useEffect, useState } from "react";
import "../styles/style.module.css";
import MentorRegFormStep1 from "../components/Mentor/MentorRegComponents/MentorRegFormStep1";
import MentorStep2 from "../components/Mentor/MentorRegComponents/MentorStep2";
import MentorStep3 from "../components/Mentor/MentorRegComponents/MentorStep3";
import MentorFinal from "../components/Mentor/MentorRegComponents/MentorFinal";
import Congratulations from "../components/Mentor/MentorRegComponents/congratulations";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
const MentorRegForm = () => {
  const [regStepCount, setRegStepCount] = useState(1);
  const router=useRouter()
  const { data } = useSelector((state) => state.authManagerMentor);
  useEffect(() => {
    if (!data.verified) {
      router.push("/");
    }
  }, []);
  if (!data.verified) {
    return null; // Don't render the user if not verified
  }
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
