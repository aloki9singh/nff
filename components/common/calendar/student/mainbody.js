import Datecard from "../common/datecard";
import Dates2 from "../common/datelist";
import { useState, useEffect } from "react";
import Months from "../common/monthlist";
import Card from "./card";

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
let Mainbody = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [currentMonth, setCurrentMonth] = useState(
    months[currentDate.getMonth()]
  );
  const [currentYear, setCurrentYear] = useState(
    currentDate.getFullYear().toString()
  );
  let [monthData, setMonthData] = useState("");
  let selectedMonth = (M) => {
    setMonthData(M);
  };
  let timeSelectFun = (e) => {
    console.log(e.target.innerText);
    e.target.style = "background: #A145CD";
  };
  let mainMonth = monthData ? monthData : currentMonth;
  let [dateData, setdateData] = useState(currentDate.getDate());
  let selectedDate = (M) => {
    setdateData(M);
  };
  let combined = { currentYear, mainMonth, dateData };

  let timing = [
    "1:00AM",
    "2:00AM",
    "3:00AM",
    "4:00AM",
    "5:00AM",
    "6:00AM",
    "7:00AM",
    "8:00AM",
    "9:00AM",
    "10:00AM",
    "11:00AM",
    "12:00AM",
    "1:00PM",
    "2:00PM",
    "3:00PM",
    "4:00PM",
    "5:00PM",
    "6:00PM",
    "7:00PM",
    "8:00PM",
    "9:00PM",
    "10:00PM",
    "11:00PM",
    "12:00PM",
  ];
  let leftposi = 0;
  let [showReschedulevar, setshowReschedulevar] = useState(false);
  let showReschedule = () => {
    setshowReschedulevar(true);
  };
  let hideFun = () => {
    setshowReschedulevar(false);
  };
  let dataFetched = [
    {
      AddBatch: "my batch",
      AddTitle: "something",
      Discription: "non-thing specail something new always",
      Endtime: "1:00PM",
      Starttime: "2:00PM",
      date: 18,
      defaultradio: "#E1348B",
      month: 4,
      year: 2023,
    },
    {
      AddBatch: "ohibh batch",
      AddTitle: "hchh",
      Discription: "nhghvhgvething new always",
      Endtime: "12:00AM",
      Starttime: "2:00AM",
      date: 15,
      defaultradio: "#8642AA",
      month: 3,
      year: 2023,
    },
    {
      AddBatch: "my wvevv",
      AddTitle: "someeevefvthing",
      Discription: "non-vefvewfvefv specail something new always",
      Endtime: "5:00PM",
      Starttime: "9:00PM",
      date: 19,
      defaultradio: "#2E3036",
      month: 3,
      year: 2023,
    },
    {
      AddBatch: "new",
      AddTitle: "something",
      Discription: "good to attend",
      Endtime: "6:00PM",
      Starttime: "4:00PM",
      date: 18,
      defaultradio: "#E1348B",
      month: 4,
      year: 2023,
    },
  ];
  console.log(combined);

  return (
    <>
      <div
        className="m-0 lg:m-2 p-0 lg:p-3 rounded-3xl  text-white "
        style={{ background: "#33353B" }}
      >
        <div className="bg-black lg:bg-inherit p-2 lg:p-0 rounded-b-3xl ">
          <Datecard
            seletedMonth={monthData}
            currentMonth={currentMonth}
            currentYear={currentYear}
          ></Datecard>
          <Months
            selectedMonth={selectedMonth}
            currentMonth={currentMonth}
          ></Months>
          <Dates2
            selectedDate={selectedDate}
            currentMonth={currentMonth}
            currentDate={currentDate}
            monthData={monthData}
            currentYear={currentYear}
          ></Dates2>
        </div>
        <hr className="m-2 opacity-50 hidden lg:block"></hr>
        <div
          className="grid grid-cols-1 overflow-y-scroll "
          style={{ height: "90vh" }}
        >
          {showReschedulevar ? (
            <Reschedule hidefun={hideFun}></Reschedule>
          ) : (
            <></>
          )}
          {timing.map((val, index) => {
            console.log(val, dataFetched.Starttime);
            return (
              <div className="flex m-3 relative  text-sm py-4" key={index}>
                <h2
                  onClick={timeSelectFun}
                  className="py-2 px-6 flex  text-white bg-white bg-opacity-10 rounded-full w-fit "
                >
                  {val}
                </h2>
                <div className="border w-full my-auto border-dashed opacity-30"></div>
                {dataFetched.map((valueof, indexof) => {
                  return (
                    <>
                      {combined.dateData == dataFetched[indexof].date &&
                      combined.mainMonth ==
                        months[dataFetched[indexof].month] &&
                      combined.currentYear == dataFetched[indexof].year &&
                      val == dataFetched[indexof].Starttime ? (
                        <div className={`absolute bottom-1 left-2/4 `}>
                          {
                            <div onClick={showReschedule}>
                              <Card cardData={valueof}></Card>
                            </div>
                          }
                        </div>
                      ) : (
                        <></>
                      )}
                    </>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default studentcalendarmainbody;
