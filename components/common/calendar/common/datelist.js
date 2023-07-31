import { getDayFromDate, getMonthNumber } from "@/lib/exportablefunctions";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

const Datelist = ({
  selectedDate,
  currentYear,
  currentMonth,
  currentDate,
  monthData,
}) => {
  console.log( currentYear, currentMonth, currentDate, monthData);
  const today = new Date();

  const [colourid, setColourid] = useState(today.getDate());

  // console.log(currentYear); // ... The rest of the component ...
  let months = useMemo(() => {
    return {
      January: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
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
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ],
      April: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      ],
      May: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ],
      June: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      ],
      July: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ],
      August: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ],
      September: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      ],
      October: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ],
      November: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      ],
      December: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ],
    };
  }, [currentYear]);
  const [monthforCheck, setMonthforCheck] = useState(monthData || currentMonth);

  const [finalArr, setFinalArr] = useState(() => {
    let fileDate = currentDate - 1;

    let monthforCheck = monthData || currentMonth;
    const currentMonthDates = months[monthforCheck];

    let arr = [];
    for (let i = 0; i < 14; i++) {
      if (fileDate >= 0 && fileDate < currentMonthDates.length) {
        const date = currentMonthDates[fileDate];
        arr.push([date]);
      } else {
        // If the fileDate is outside the range of the current month,
        // fill the array with 0 (to maintain a fixed length of 14)
        arr.push([0]);
      }
      fileDate++;
    }
    return arr;
  });

  const memoizedSelectedDate = useCallback(selectedDate, [selectedDate]);
  //useEffect1
  useEffect(() => {
    memoizedSelectedDate(currentDate);
    // const currentElement = document.getElementById(currentDate);
    // if (currentElement && currentElement == 0) {
    //   currentElement.style.background = "#E1348B";
    // }
  }, [currentDate, memoizedSelectedDate, finalArr, monthforCheck, months]);

  useEffect(() => {
    setMonthforCheck(monthData || currentMonth);
    // Whenever the selected month changes, update the `finalArr` state.
    const currentMonthDates = months[monthforCheck];
    let fileDate = currentDate - 1;
    let arr = [];
    for (let i = 0; i < 14; i++) {
      if (fileDate >= 0 && fileDate < currentMonthDates.length) {
        const date = currentMonthDates[fileDate];
        arr.push([date]);
      } else {
        arr.push([0]);
      }
      fileDate++;
    }
    setFinalArr(arr);
  }, [currentMonth, monthData, months]);

  const dateSelect = (e) => {
    const days = document.querySelectorAll(".day");
    // days.forEach((day) => (day.style.background = "none"));
    // e.target.style.background = "#E1348B"; //on select date

    const selectedDateId = e.target.id;
    console.log(selectedDateId, "id");
    setColourid(selectedDateId);
    selectedDate(selectedDateId);
  };

  // Function to shift the dates to the left or right
  
  const shiftDates = (direction) => {
    setFinalArr((prev) =>
      prev.map(([date, day]) => {
        if (direction === "left") {
          date = date - 1;
        } else if (direction === "right") {
          date = date + 1;
        }

        const currentMonthDates = months[monthforCheck];
        // Check if the date falls within the current month range
        if (currentMonthDates.includes(date)) {
          return [date];
        } else {
          if (direction === "left") {
            // If date is out of range on the left, get the last date of the current month
            const lastDate = currentMonthDates[currentMonthDates.length - 1];
            return [lastDate];
          } else if (direction === "right") {
            // If date is out of range on the right, set to the first date of the current month
            const firstDate = currentMonthDates[0];
            const firstDateDay = getDayFromDate(
              `${currentYear}-${getMonthNumber(monthforCheck)}-${firstDate}`
            );
            return [firstDate, firstDateDay];
          }
        }
      })
    );
  };

  console.log(finalArr);
  return (
    <>
      <div className="grid grid-cols-12 w-full">
        <Image
          className="justify-self-center place-self-center col-span-1"
          onClick={() => shiftDates("left")}
          src="/componentsgraphics/common/calendar/datelist/caretcircleleft.svg"
          alt="back"
          width={30}
          height={30}
        />
        <div className="flex col-span-10 lg:bg-inherit p-3 overflow-scroll scrollbar-hide text-[17px] text-white">
          {finalArr.map(([date], index) => (
            <div
              key={index}
              id={date}
              className={`w-auto px-2 py-1 mx-5 rounded-[5px] lg:rounded-lg text-center  cursor-pointer 
                   ${colourid == date ? "bg-[#E1348B]" : ""}
              `}
              onClick={dateSelect}
            >
              {date !== 0 && (
                <>
                  {date}
                  <br />
                  {"\n"}
                  {getDayFromDate(
                    `${currentYear}-${getMonthNumber(
                      monthData || currentMonth
                    )}-${date}`
                  ).slice(0, 3)}
                </>
              )}
            </div>
          ))}
        </div>
        <Image
          className="place-self-center justify-self-center col-span-1"
          onClick={() => shiftDates("right")}
          src="/componentsgraphics/common/calendar/datelist/caretcircleright.svg"
          alt="next"
          width={30}
          height={30}
        />
      </div>
    </>
  );
};

export default Datelist;
