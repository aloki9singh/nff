import { useEffect, useState } from "react";
import MonthSelector from "../common/monthselector";
// import DateWithDay from "./DateWithDay";
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
const Calender = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [classes, setClasses] = useState([]);

  const [currentMonth, setCurrentMonth] = useState(
    months[currentDate.getMonth()]
  );

  let [dateData, setdateData] = useState(currentDate.getDate());
  const [currentYear, setCurrentYear] = useState(
    currentDate.getFullYear().toString()
  );
  

  let selectedDate = (M) => {
    setdateData(M);

  };
  let selectedMonth = (M) => {
    setMonthData(M);

  };
  let monthclick = (e) => {
    let months = document.querySelectorAll(".month");
    selectedMonth(e.target.innerText);
    for (let i = 0; i < months.length; i++) {
      months[i].style = "opacity:0.6";
    }
    e.target.style = "opacity:1";
  };

  useEffect(() => {
    let months = document.querySelectorAll(".month");
    for (let i = 0; i < months.length; i++) {
      if (currentMonth == months[i].innerText) months[i].style = "opacity:1";
    }
   
  }, [currentMonth]);

  return (
    <div className="bg-darkslategray rounded-2xl bg-[#373A41] p-5  ">
      {/* //datecard */}
      <div className=" flex top-5 flex-col text-xl  md:space-y-2">
        {/* <div className="p-2 text-lg  lg:block ml-7">
          <span className="p-1">
            {seletedMonth ? seletedMonth : currentMonth}
          </span>
          <span className="p-1">{currentYear}</span>
        </div> */}
        <div className="text-sm"><MonthSelector/></div>
        {/* Date and day */}
        {/* //Some one Deleted this  datewith day comp*/}
        {/* <DateWithDay
          currentDate={currentDate}
          currentMonth={currentMonth}
          currentYear={currentYear}
          selectedDate={selectedDate}
          
        /> */}

        <div className=" p-3 w-full shrink-0 text-xl text-gray-200">
          <div className=" ml-3 mb-2 ">Upcoming Classes</div>
          <div className="flex flex-col h-[15vh] items-start justify-between text-base text-white overflow-scroll scrollbar-hide ">
            {classes.length == 0 && (
              <div className="text-gray-500 text-xs text-center my-10 w-full">
                No upcoming classes ☹️
              </div>
            )}
            {classes &&
              classes.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-row items-start w-full p-2"
                >
                  <div className="rounded-md bg-[#E1348B] shrink-0 p-2">
                    4:30
                  </div>
                  <div className="flex flex-col justify-center ml-2 text-lg">
                    <div className="text-sm">{item.name}</div>
                    <p className="text-xs">Online .Zoom Meeting</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default studentcalendar;
