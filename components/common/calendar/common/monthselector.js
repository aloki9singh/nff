import { useState } from "react";
import Image from "next/image";

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

const MonthSelector = ({
  currentMonth,
  currentYear,
  handlePrevClick,
  handleNextClick,
}) => {
  return (
    <div className="flex items-center justify-center mb-4 text-white">
      <button className="w-8 h-8" onClick={handlePrevClick}>
        <Image
          src="/componentsgraphics/mentor/monthselector/caretcircleleft.svg"
          alt="Previous"
          className="w-full h-full"
          width={15}
          height={15}
        />
      </button>

      <h2 className="text-2xl font-bold mx-4">
        {currentMonth} {currentYear}
      </h2>

      <button className="w-8 h-8" onClick={handleNextClick}>
        <Image
          src="/componentsgraphics/mentor/monthselector/caretcircleright.svg"
          alt="Next"
          className="w-full h-full"
          width={15}
          height={15}
        />
      </button>
    </div>
  );
};

export default MonthSelector;
