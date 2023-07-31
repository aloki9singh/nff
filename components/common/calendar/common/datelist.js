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
    let dayvar = currentDate - 1;
    let monthforCheck = monthData || currentMonth;
    console.log(monthforCheck);
    let arr = [];
    for (let i = 0; i < 14 && months[monthforCheck].length > fileDate; i++) {
      fileDate++;
      dayvar++;
      if (dayvar === 7) {
        dayvar = 0;
      }
      arr.push([fileDate, dayvar]);
    }
    return arr;
  });


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateFinalArr = useCallback(
    (selectedMonth) => {
      console.log("updateFinalArr");
      let fileDate = currentDate - 1;
      let dayvar = currentDate - 1;

      let arr = [];
      for (let i = 0; i < 14 && months[selectedMonth].length > fileDate; i++) {
        fileDate++;
        dayvar++;
        if (dayvar === 7) {
          dayvar = 0;
        }
        const date = months[selectedMonth][fileDate - 1]; // get date from months
        if (date) {
          arr.push([date, dayvar]);
        }
      }
      setFinalArr(arr);
    },
    [currentDate, months]
  );
  //removing the above currentDate deppendancy will work fine but it is throwing build warning and adding dependency is creating  seleciton error in schedule


  //iska kya kaam hai???
  const memoizedSelectedDate = useCallback(selectedDate, [selectedDate]);
  // console.log(memoizedSelectedDate)

  useEffect(() => {
    memoizedSelectedDate(currentDate);
    const currentElement = document.getElementById(currentDate);
    if (currentElement && currentElement == 0) {
      currentElement.style.background = "#E1348B";
    }
  }, [currentDate, memoizedSelectedDate]);


  useEffect(() => {
    setMonthforCheck(monthData || currentMonth);
    // ... Update finalArr based on the new month ...
    updateFinalArr(monthData || currentMonth);
  }, [currentMonth, monthData, updateFinalArr]);


  //selecting date Function here 
  const dateSelect = (e) => {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
      (day.style.background = "none")
    });
    // e.target.style.background = "#E1348B";  //on select date
    // console.log(selectedDateId);
    const selectedDateId = e.target.id;
    const day = document.getElementById(selectedDateId);
    // console.log(day);
    if (day) {
      day.style.background = "#E1348B"; //on select date
    }
    selectedDate(selectedDateId);
  };


  // Function to shift the dates to the left (previous dates within the selected month)

  const dateShiftLeft = () => {

    console.log("dateShiftLeft");

    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
      (day.style.background = "none")
    });

    setFinalArr((prev) =>
      prev.map(([date, day]) => {
        date = date - 1;
        if (day === 0) {
          day = 6;
        } else {
          day = day - 1;
        }
        // Check if the date falls within the current month range
        const currentMonthDates = months[monthforCheck];
        if (currentMonthDates.includes(date)) {
          return [date, day];
        } else {
          // If date is out of range, get the last date of the current month
          const lastDate = currentMonthDates[currentMonthDates.length - 1];
          const lastDateDay = getDayFromDate(
            `${currentYear}-${getMonthNumber(monthforCheck)}-${lastDate}`
          );
          return [lastDate, lastDateDay];
        }
      })
    );
  };

  // Function to shift the dates to the right (next dates within the selected month)
  const dateShiftRight = () => {

    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
      (day.style.background = "none")
    });
    console.log("dateShiftRight");

    setFinalArr((prev) =>
      prev.map(([date, day]) => {
        date = date + 1;
        const currentMonthDates = months[monthforCheck];
        // Check if the date falls within the current month range
        if (currentMonthDates.includes(date)) {
          if (day === 6) {
            day = 0;
          } else {
            day = day + 1;
          }
        } else {
          // If date is out of range, set to the first date of the current month
          const firstDate = currentMonthDates[0];
          const firstDateDay = getDayFromDate(
            `${currentYear}-${getMonthNumber(monthforCheck)}-${firstDate}`
          );
          return [firstDate, firstDateDay];
        }
        return [date, day];
      })
    );
  };
  // console.log(finalArr);
  return (
    <>
      <div className="grid grid-cols-12 w-full">
        <Image
          className="justify-self-center place-self-center col-span-1"
          onClick={dateShiftLeft}
          src="/componentsgraphics/common/calendar/datelist/caretcircleleft.svg"
          alt="back"
          width={30}
          height={30}
        />
        <div className="flex col-span-10 lg:bg-inherit p-3 overflow-scroll scrollbar-hide text-[17px] text-white">
          {finalArr.map(([date, day], index) => (
            <div
              key={index}
              id={date}
              className={`w-auto px-2 py-1 mx-5 rounded-[5px] lg:rounded-lg text-center day cursor-pointer 
             `}
              onClick={(e) => dateSelect(e)}
            >
              {date !== 0 && (
                <>
                  <p> {date}</p>
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
          onClick={dateShiftRight}
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