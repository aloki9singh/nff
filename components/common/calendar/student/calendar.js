import { db } from "@/config/firebaseconfig";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import Datelist from "../common/datelist";
import MonthSelector from "../common/monthselector";
import Schedulecard from "./schedulecard";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Calendar = () => {
  const [schedules, setSchedules] = useState([]);
  const CurDate = new Date();
  const [currentDate, selectedDate] = useState(CurDate.getDate());
  const [currentMonth, setCurrentMonth] = useState(CurDate.getMonth());
  const [currentYear, setCurrentYear] = useState(CurDate.getFullYear());

  const handlePrevClick = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = prevMonth - 1;
      if (newMonth < 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 11;
      }
      return newMonth;
    });
  };

  const handleNextClick = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = prevMonth + 1;
      if (newMonth > 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0;
      }
      return newMonth;
    });
  };

  const selectedMonth = months[currentMonth];
  const date = currentYear + months[currentMonth] + currentDate;

  useEffect(() => {
    const months = document.querySelectorAll(".month");
    for (let i = 0; i < months.length; i++) {
      if (currentMonth === months[i].innerText) {
        months[i].style.opacity = "1";
      } else {
        months[i].style.opacity = "0.6";
      }
    }
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
  }, [currentMonth, currentDate,date]);
  // console.log(schedules);
  return (
    <div className="bg-darkslategray rounded-2xl bg-[#373A41] p-5">
      <div className="flex flex-col text-xl md:space-y-2">
        <div className="text-sm">
          <MonthSelector
            currentDate={currentDate}
            currentMonth={selectedMonth}
            currentYear={currentYear}
            handlePrevClick={handlePrevClick}
            handleNextClick={handleNextClick}
          />
        </div>

        <div className="md:w-[25vw] m-auto">
          <Datelist
            selectedDate={selectedDate}
            currentYear={currentYear}
            currentMonth={selectedMonth}
            currentDate={currentDate}
          />
        </div>

        <div className="p-3 w-full shrink-0 text-xl text-gray-200">
          <div className="ml-3 mb-2">Upcoming Classes</div>
          <div className="flex flex-col h-[18vh] items-start justify-between text-base text-white overflow-scroll scrollbar-hide">
            {schedules.length === 0 ? (
              <div className="text-gray-500 text-xs text-center my-10 w-full">
                No upcoming classes ☹️
              </div>
            ) : (
              schedules.map((item) => <Schedulecard key={item} item={item} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
