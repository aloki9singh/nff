//verified 1 by Raviraj Kumar
import Datecard from "../common/datecard";
import Dates2 from "../common/datelist.js";
import { useState, useEffect } from "react";
import Months from "../common/monthlist.js";
import CardUserPop from "./CardUserPop";
import CardMentor from "./card.js";
import { useContext } from "react";
import { adddate } from "@/lib/context/contextprovider";

import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

import { db } from "@/config/firebaseconfig";
import e from "cors";

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

const Mainbodymentor = () => {
  const fulldate = new Date();
  const [popupvalue, setPopupvalue] = useState({});
  const [currentDate, selectedDate] = useState(fulldate.getDay());
  const [id, setId] = useState("");
  const { setdate } = useContext(adddate);
  const monthValue = months[fulldate.getMonth()];
  const [currentMonth, setCurrentMonth] = useState(monthValue); //initial it has current month but on select it should change

  const [loading, setLoading] = useState(true);

  const [currentYear, selectedYear] = useState(
    fulldate.getFullYear().toString()
  ); ///// initial it has current year but on select it should change

  const [dataFetched, setDataFetched] = useState([]);
  const [monthData, selectedMonth] = useState("");

  const [showPopUpvar, setshowPopUpvar] = useState(false);

  const timing = [
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "00:00",
  ];

  const hideFun = () => {
    setshowPopUpvar(false);
  };

  let timeSelectFun = (e) => {
    const newTarget = e.target;
    const selectedTarget = document.querySelector(".selected");

    if (selectedTarget) {
      selectedTarget.style.background = "";
      selectedTarget.classList.remove("selected");
    }

    newTarget.style.background = "#A145CD";
    newTarget.classList.add("selected");
  };

  const showPopUp = (e, val) => {
    e.preventDefault();
    setshowPopUpvar(true);
    setPopupvalue(val);
  };

  const combined = {
    currentYear,
    mainMonth: monthData || currentMonth,
    currentDate,
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setdate(currentYear + combined.mainMonth + currentDate);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [currentYear, combined.mainMonth, currentDate, setdate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res = await callScheduleGetApiMentor();
        const q = query(collection(db, "mentorsSchedule"));
        onSnapshot(q, (querySnapshot) => {
          const docSnapshots = querySnapshot.docs;

          let arr = [];
          for (var i in docSnapshots) {
            const doc = docSnapshots[i].data();
            // console.log(doc);
            arr.push(doc);
          }
          setDataFetched(arr);
          setLoading(false);
        });
      } catch (error) {
        // console.log(error);
        alert("Something went wrong!");
      }
    };

    fetchData();
  }, []);

  // console.log(combined);
  //  console.log(dataFetched);

  return (
    <>
      <div
        className="m-0 lg:m-2 p-0 lg:p-3 rounded-3xl text-white md:mx-0 mx-2 "
        style={{ background: "#33353B" }}
      >
        <div className="bg-[#33353B] rounded-t-[30px] md:mt-2 lg:bg-inherit p-2 lg:p-0 md:space-y-3 space-x-2 mt-2">
          <Datecard
            seletedMonth={monthData}
            currentYear={currentYear} //current year
            selectedYear={selectedYear}
            currentMonth={currentMonth} //current month
          />
          <Months
            selectedMonth={selectedMonth}
            currentMonth={currentMonth} //current month
          ></Months>
          <Dates2
            selectedDate={selectedDate}
            currentYear={currentYear} //current year
            currentMonth={currentMonth} //current month
            currentDate={currentDate}
            monthData={monthData}
            all={combined}
          ></Dates2>
        </div>
        <hr className="m-2 opacity-50 hidden lg:block"></hr>
        <div className="grid grid-cols-1 overflow-hide overflow-y-scroll scrollbar-hide h-[50vh]">
          {showPopUpvar ? (
            <CardUserPop
              id={id}
              hidefun={hideFun}
              popupValue={popupvalue}
            ></CardUserPop>
          ) : (
            <></>
          )}
          {timing.map((val, index) => {
            return (
              <div className="flex m-3 relative  text-sm py-4 " key={index}>
                <h2
                  onClick={timeSelectFun}
                  className="py-2 px-6 flex  text-white bg-white bg-opacity-10 rounded-full w-fit "
                >
                  {val}
                </h2>
                <div className="border w-full my-auto border-dashed opacity-30 "></div>
                {dataFetched.map((valueof, indexof) => {
                  return (
                    <div key={indexof}>
                      {combined.currentDate == valueof.date.day &&
                      combined.mainMonth == valueof.date.month &&
                      combined.currentYear == valueof.date.year &&
                      val[0] + val[1] ==
                        valueof.startTime[0] + valueof.startTime[1] ? (
                        <div
                          className={`absolute bottom-1 left-2/4 `}
                          key={indexof}
                        >
                          {
                            <div
                              onClick={(e) => {
                                showPopUp(e, valueof);
                                setId(valueof.uid);
                              }}
                            >
                              <CardMentor cardData={valueof}></CardMentor>
                            </div>
                          }
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
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

export default Mainbodymentor;
