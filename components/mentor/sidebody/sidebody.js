//verified 1 by Raviraj Kumar
import { useContext } from "react";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { adddate, selectSch } from "@/lib/context/contextprovider";

import Image from "next/image";

import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

import { db } from "@/config/firebaseconfig";

let SideBody = ({ count, setCount }) => {
  const [schedules, setSchedules] = useState([]);
  const { date, setdate } = useContext(adddate);
  const { scheduleSelect, setScheduleSelect } = useContext(selectSch);
  
  const some = new Date(Date.now());
  const monthNumber = some.getMonth() + 1;
  const monthcur = new Date(0, monthNumber - 1).toLocaleString("default", {
    month: "short",
  });
  const datecur = some.getDate();
  const yearcur = some.getFullYear();
  const todaysDate = yearcur + monthcur + datecur;

  const submitData = () => {
    setCount(2);
  };
  useEffect(() => {
    const q = query(collection(db, "mentorsSchedule"));
    onSnapshot(q, (querySnapshot) => {
      const docSnapshots = querySnapshot.docs;

      let arr = [];
      for (var i in docSnapshots) {
        const doc = docSnapshots[i].data();
        const docDate = doc.date.year + doc.date.month + doc.date.day;
        if (docDate === date) {
          arr.push(doc);
        }
        // console.log(date,docDate)
      }
      
      setSchedules(arr);
      
    });
  }, [date]);

  console.log(schedules);

  return (
    <div className="w-full h-full  overflow-scroll-y  ">
      <div
        className="rounded-xl p-4 px-6 text-white m-5 h-[400px] overflow-scroll scrollbar-hide "
        style={{ background: "#33353B" }}
      >
        <div className="relative w-full bg-transparent text-xl  border-none border-gray-300 text-slate-200  text-center my-4">
          Class Schedule
        </div>
        <hr className="opacity-50 mt-1 mb-3"></hr>

        <div className="space-y-6 overflow-scroll scrollbar-hide">
          {schedules &&
            schedules.map((e) => (
              <div
                key={e.id}
                className="flex space-x-2 p-2  text-sm"
                onClick={() => {
                  setCount(3);
                  setScheduleSelect({ e: e });
                  console.log(e,"seeit");
                }}
              >
                <div
                  className={`flex bg-[${e.defaultRadio}] rounded-[100%] p-3 h-10 w-10    justify-start`}
                >
                  <Image
                    width={100}
                    height={100}
                    src="/componentsgraphics/common/calendar/sidebody/Videoplayericon.svg"
                    alt="player"
                    className="w-7px h-3 m-auto"
                  />
                </div>
                <div className="m-auto">
                  {e.addTitle}
                  {todaysDate == date ? " will  starts soon" : ` is scheduled `}
                  <br />
                  <div className="font-light text-gray-500">
                    {" "}
                    {`${e.startTime}-${e.endTime}`}
                  </div>
                </div>
              </div>
            ))}{" "}
        </div>
      </div>
      <div className="flex justify-evenly">
        <div
          className="rounded-xl text-white px-5 py-3 text-center m-2  flex space-x-2"
          style={{ background: "#A145CD" }}
        >
          <button onClick={submitData} className="cursor-pointer">
            Add new class
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBody;
