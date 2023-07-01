import { BiBell } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import { useState } from "react";
import StudentScheduleMainBody from "@/components/common/calendar/student/mainbody";
import { useRouter } from "next/router";
import StudentTopbar from "@/components/common/navbar/studenttopbar";
import { auth } from "@/config/firebaseconfig";
import Sidebar from "@/components/common/sidebar/sidebar";

function CheckClassSchedule() {
  const [count, setCount] = useState(1);

  let [searchstate, setsearchstate] = useState("");
  let searchfun = (e) => {
    setsearchstate(e.target.value);
  };
  console.log(auth.currentUser);
  const router = useRouter();

  return (
    <div className="h-screen w-full text-base">
      <div className="grid grid-cols-7 lg:bg-[black] ">
        <div className="lg:col-span-1 hidden lg:grid">
        {" "}
          <Sidebar/>
        </div>
        <div
          style={{ background: "#2E3036" ,borderRadius:"50px 0px 0px 50px"}}
          className="lg:col-span-6 col-span-7  "
        >
         
          <StudentTopbar heading={"My Profile"} />

          <hr className="hidden lg:block opacity-50 m-3"></hr>
          <div className="grid grid-cols-5 justify-center lg:h-auto mt-18">
            <div
              className="m-1 col-span-5 lg:col-span-5 lg:h-auto mb-7"
              style={{ height: "90%" }}
            >
              <div className="md:flex mt-2 md:mt-0">
                <div className="w-full overflow-hidden" onClick={() => setCount(1)}>
                  <StudentScheduleMainBody />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckClassSchedule;
