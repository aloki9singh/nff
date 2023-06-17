import Image from "next/image";
import { useEffect } from "react";

let Months = ({ selectedMonth, currentMonth }) => {
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
    <>
    
      <div className="md:space-x-20 mx-7 flex  overflow-scroll bg-[#33353B] lg:bg-transparent p-6 lg:p-0 scrollbar-hide">
      
        <p onClick={monthclick} className="month opacity-60 mx-6 lg:mx-1 ">
          January
        </p>
        <p onClick={monthclick} className="month opacity-60 mx-6 lg:mx-1">
          February
        </p>
        <p onClick={monthclick} className="month opacity-60 mx-6 lg:mx-1">
          March
        </p>
        <p onClick={monthclick} className="month opacity-60 mx-6 lg:mx-1">
          April
        </p>
        <p onClick={monthclick} className="month opacity-60 mx-6 lg:mx-1">
          May
        </p>
        <p onClick={monthclick} className="month opacity-60 mx-6 lg:mx-1">
          June
        </p>
        <p onClick={monthclick} className="month opacity-60 mx-6 lg:mx-1">
          July
        </p>
        <p onClick={monthclick} className="month opacity-60 mx-6 lg:mx-1">
          August
        </p>
        <p onClick={monthclick} className="month opacity-60 mx-6 lg:mx-1">
          September
        </p>
        <p onClick={monthclick} className="month opacity-60 mx-6 lg:mx-1">
          October
        </p>
        <p onClick={monthclick} className="month opacity-60 mx-6 lg:mx-1">
          November
        </p>
        <p onClick={monthclick} className="month opacity-60 mx-6 lg:mx-1">
          December
        </p>
      </div>
    </>
  );
};

export default monthlist;
