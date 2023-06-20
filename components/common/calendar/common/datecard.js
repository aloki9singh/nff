//need rechecking
import { useState } from "react";

const MonthSelector = ({
  currentMonth,
  currentYear,
  seletedMonth,
  selectedYear,
}) => {
  let arr = [];
  for (let i = currentYear; i > currentYear - 1000; i--) {
    arr[i] = i;
  }
  return (
    <div className="p-2 text-lg hidden lg:block w-auto">
      <span className="p-1">{seletedMonth ? seletedMonth : currentMonth}</span>
      <select
        onChange={(e) => {
          selectedYear(e.target.value);
        }}
        id="yearsSelect"
        className="bg-transparent border-none outline-none"
        name="yearsSelect"
      >
        {arr.map((val, index) => {
          if (val == arr.length - 1) {
            return (
              <>
                <option key={index} value={val} selected>
                  {val}
                </option>
              </>
            );
          }
          return (
            <>
              <option key={index} value={val}>
                {val}
              </option>
            </>
          );
        })}
      </select>
    </div>
  );
};

export default MonthSelector;
