import MonthCard from "./MonthCard";
import ClassesContainer from "./ClassesContainer";
import MonthSelector from "./MonthSelector";
import Months from "./MonthCard";

const Calender = () => {
  return (
    <div className="bg-darkslategray rounded-2xl bg-[#373A41] p-5 md:mt-10">
      <div className=" flex top-5 flex-col text-xl  md:space-y-2">
        <MonthSelector />

        <Months />
        <ClassesContainer />
      </div>
    </div>
  );
};

export default Calender;
