//need rechecking
import Image from "next/image";
import { use, useEffect, useState } from "react";

const  Datelist = ({
  currentDate,
  monthData,
  currentMonth,
  currentYear,
  selectedDate,
}) => {
  let months = {
    January: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ],
    February:
      currentYear % 4 === 0
        ? [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
          ]
        : [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28,
          ],
    March: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ],
    April: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30,
    ],
    May: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ],
    June: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30,
    ],
    July: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ],
    August: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ],
    September: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30,
    ],
    October: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ],
    November: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30,
    ],
    December: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ],
  };

  let day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let arr = [];
  let arr2 = [];
  let fileDate = currentDate.getDate() - 1;
  let dayvar = currentDate.getDay() - 1;
  let monthforCheck = monthData ? monthData : currentMonth;
  for (let i = 0; i < 14 && months[monthforCheck].length > fileDate; i++) {
    fileDate++;
    dayvar++;
    if (dayvar === 7) {
      dayvar = dayvar - 7;
    }
    arr = [...arr, [fileDate, dayvar]];
  }
  //
  let fileDate2 = 0;
  let monthforCheck2 = monthData ? monthData : currentMonth;
  for (let i = 0; months[monthforCheck2].length > fileDate2; i++) {
    fileDate2++;
    arr2 = [...arr2, [fileDate2]];
  }
  //
  selectedDate=currentDate.getDate();

  let [finalArr, setfinalArr] = useState(arr.slice());
  useEffect(() => {
    setfinalArr(arr.slice());
  }, [monthData]);
  useEffect(() => {
    // let days = document.querySelectorAll(".day");
    // let daytag = document.querySelectorAll(".actualdate");
    // for (let i = 0; i < days.length; i++) {
    //   if (currentDate.getDate() == daytag[i].innerText) {
    //     days[i].style = "background: #E1348B";
    //   }
    // }
    selectedDate=currentDate.getDate();
    document.getElementById(currentDate.getDate()).style="background: #E1348B";
  }, [currentDate]);
  let dateSelect = (e) => {
    let days = document.querySelectorAll(".day");
    // let daytag = document.querySelectorAll(".actualdate");
    // for (let i = 0; i < days.length; i++) {
    //   days[i].style = "background:none";
    // }
    // for (let i = 0; i < days.length; i++) {
    //   if (e.target.innerText == daytag[i].innerText) {
      //     days[i].style = "background: #E1348B";
      //   }
      e.target.style="background: #E1348B";
      if(document.getElementById(selectedDate)) 
      {document.getElementById(selectedDate).style="background:none";}
      else{
        for (let i = 0; i < days.length; i++) {
            days[i].style = "background:none";
          }}
      e.target.style="background: #E1348B";
      selectedDate=e.target.id;
  };
  let dateShifLeft = () => {
    setfinalArr((prev) => {
      let prevArr = prev.slice();
      for (let i = 0; i < prev.length; i++) {
        let date = prevArr[i][0] - 1;
        let day = prevArr[i][1] - 1;
        if (date > 0) {
          if (day < 0) {
            day = day + 7;
          }
          prevArr[i][0] = date;
          prevArr[i][1] = day;
        } else {
          break;
        }
      }
      return prevArr;
    });
  };

  let dateShifRight = () => {

    
    setfinalArr((prev) => {
      let prevArr = prev.slice();
      let last = prevArr[prev.length - 1][0];
      
      for (let i = 0; i < prev.length; i++) {
        let date = prevArr[i][0] + 1;
        let day = prevArr[i][1] + 1;
        if (months[monthforCheck].length > last) {
          if (day > 6) {
            day = day - 7;
          }
          prevArr[i][0] = date;
          prevArr[i][1] = day;
        } else {
          break;
        }
      }
      return prevArr;
    });
    
  };
  return (
    <>
      <div className="grid grid-cols-12">
        <div className=" hidden lg:hidden justify-evenly px-2">
          {/* <Image
          onClick={dateShifLeft}
          src="/caretcircleleft.svg"
          alt="back"
          width={30}
          height={30}
        ></Image>

        {finalArr.map((val, index) => {
          return (
            <div
              key={index}
              className=" p-2 rounded-lg text-center day "
              onClick={dateSelect}
            >
              <p className="actualdate text-center">{val[0]}</p>
              <p>{day[val[1]].slice(0, 3)}</p>
            </div>
          );
        })}
        <Image
          onClick={dateShifRight}
          src="caretcircleright.svg"
          alt="next"
          width={30}
          height={30}
        ></Image> */}
        </div>

        <Image
          className="justify-self-center place-self-center col-span-1"
          onClick={dateShifLeft}
          src="/componentsgraphics/common/calendar/datelist/caretcircleleft.svg"
          alt="back"
          width={30}
          height={30}
        ></Image>
        <div className=" flex col-span-10 lg:bg-inherit p-3 overflow-scroll scrollbar-hide text-[17px]">
          {finalArr.map((val, index) => {
            return (
              <div
                key={index}
                id={val[0]}
                className=" w-auto px-2 py-1 mx-5 rounded-[5px] lg:rounded-lg text-center day cursor-pointer"
                onClick={dateSelect}
              >
                {/* <p className="actualdate"> */}
                {val[0]}{'\n'}
                {/* </p> */}
                {/* <p> */}
                  {day[val[1]].slice(0, 3)}
                  {/* </p> */}
              </div>
            );
          })}
        </div>
        <Image
          className="place-self-center justify-self-center col-span-1"
          onClick={dateShifRight}
          src="/componentsgraphics/common/calendar/datelist/caretcircleright.svg"
          alt="next"
          width={30}
          height={30}
        ></Image>
      </div>
    </>
  );
};

export default Datelist;
