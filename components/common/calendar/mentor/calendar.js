// Nedd to rechecking Monthcard is missing

// import MonthCard from "../../calendar/common/monthlist";
import ClassesContainer from "../../../mentor/other/classescontainer";
import MonthSelector from "../../calendar/common/monthselector";
import Months from "../../calendar/common/monthlist";

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
