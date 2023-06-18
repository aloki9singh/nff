// verified by Anurag Asawa
import { useState } from 'react';
import Image from 'next/image';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const MonthSelector = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(months[currentDate.getMonth()]);
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear().toString());

  const handlePrevClick = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
    setCurrentMonth(months[newDate.getMonth()]);
    setCurrentYear(newDate.getFullYear().toString());
  };

  const handleNextClick = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
    setCurrentMonth(months[newDate.getMonth()]);
    setCurrentYear(newDate.getFullYear().toString());
  };

  return (

    <div className="cursor-pointer  flex  flex-row items-end justify-between text-white hover:text-gray-300 text">
      <button className=" w-8 h-8" onClick={handlePrevClick}>
        <Image src="componentsgraphics/mentor/monthselector/caretcircleleft.svg" alt="Previous" className="w-full h-full" width={15} height={15} />
      </button>

      <div className="inline-block  h-[30px] shrink-0 text-center">
        <span className="text-xl ">{currentMonth}{" "} {currentYear}</span>
      </div>

      <button className="  w-10 h-8" onClick={handleNextClick}>
        <Image src="componentsgraphics/mentor/monthselector/caretcircleright.svg" alt="Next" className="w-full h-full" width={15} height={15} />
      </button>
    </div>

  );
};

export default monthselector;
