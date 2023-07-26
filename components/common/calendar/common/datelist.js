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
  let monthforCheck = monthData || currentMonth;
  const [finalArr, setFinalArr] = useState(() => {
    let fileDate = currentDate - 1;
    let dayvar = currentDate - 1;
    let monthforCheck = monthData || currentMonth;

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
  const memoizedSelectedDate = useCallback(selectedDate, [selectedDate]);

  useEffect(() => {
    memoizedSelectedDate(currentDate);
    const currentElement = document.getElementById(currentDate);
    if (currentElement) {
      currentElement.style.background = "#E1348B";
    }
  }, [currentDate, currentMonth, memoizedSelectedDate]);

  const dateSelect = (e) => {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => (day.style = "background:none"));
    e.target.style = "background: #E1348B";
    selectedDate(e.target.id);
  };

  const dateShifLeft = () => {
    setFinalArr((prev) =>
      prev.map(([date, day]) => {
        date = date - 1;
        if (day === 0) {
          day = 6;
        } else {
          day = day - 1;
        }
        return [date, day];
      })
    );
  };

  const dateShifRight = () => {
    setFinalArr((prev) =>
      prev.map(([date, day]) => {
        date = date + 1;
        if (day === 6) {
          day = 0;
        } else {
          day = day + 1;
        }
        return [date, day];
      })
    );
  };

  return (
    <>
      <div className="grid grid-cols-12">
        <Image
          className="justify-self-center place-self-center col-span-1"
          onClick={dateShifLeft}
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
              className="w-auto px-2 py-1 mx-5 rounded-[5px] lg:rounded-lg text-center day cursor-pointer"
              onClick={dateSelect}
              style={{
                background:
                  date === 0
                    ? "none"
                    : date == currentDate
                    ? "#E1348B"
                    : "none",
              }}
            >
              {date !== 0 && (
                <>
                  {date}
                  {"\n"}
                  {getDayFromDate(
                    `${currentYear}-${getMonthNumber(monthforCheck)}-${date}`
                  ).slice(0, 3)}
                </>
              )}
            </div>
          ))}
        </div>
        <Image
          className="place-self-center justify-self-center col-span-1"
          onClick={dateShifRight}
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
