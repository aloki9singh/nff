//need rechecking
import { useState } from "react";

const MonthSelector = ({
  currentMonth,
  currentYear,
  seletedMonth,
  selectedYear,
}) => {
  let arr = [2023,2024,2025,2026,2027,2028,2029,2030,2031,2032,2033];
  return (
    <div className="pl-5 md:text-lg text-sm block w-auto">
      <span className="p-1">{seletedMonth ? seletedMonth : currentMonth}</span>
      <select
        onChange={(e) => {
          selectedYear(e.target.value);
        }}
        id="yearsSelect"
        className="bg-[#33353B] focus:border-[#33353B] border-none focus:outline-none outline-none text-sm md:text-[16px]"
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
