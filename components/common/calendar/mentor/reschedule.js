import { BsTrash } from "react-icons/bs";
import { RxCounterClockwiseClock, RxCross2 } from "react-icons/rx";
import { useState } from "react";
import RescheduleWindow from "./reschedulewindow";


let Reschedule = ({ hidefun }) => {
  let hideschedule = (e) => {
    e.preventDefault();
    hidefun();
  };
  let [rescheduleOpen, setrescheduleOpen] = useState(false);
  let openReschedular = (e) => {
    e.preventDefault();
    setrescheduleOpen(true);
  };
  let closeReschedular = (e) => {
    e.preventDefault();
    setrescheduleOpen(false);
  };
  if (rescheduleOpen) {
    return <RescheduleWindow hidepopup={closeReschedular}></RescheduleWindow>;
  } else {
    return (
      <>
        <div className="w-screen h-screen  top-0 left-0  absolute">
          <div className="w-full h-full flex justify-center  ">
            <div className="text-white text-3xl  my-auto z-10">
              <div
                className="border-l-8 flex p-6 relative"
                style={{ background: "rgba(161, 69, 205, 0.75)" }}
              >
                <button
                  className="absolute right-3 top-2 text-xl"
                  onClick={hideschedule}
                >
                  <RxCross2></RxCross2>
                </button>
                <button
                  className="p-4 rounded-full m-3 "
                  style={{ background: "#E1348B" }}
                >
                  <BsTrash></BsTrash>
                </button>
                <div className="border "></div>
                <button
                  className="p-4 rounded-full m-3"
                  style={{ background: "#E1348B" }}
                  onClick={openReschedular}
                >
                  <RxCounterClockwiseClock></RxCounterClockwiseClock>
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default calendarreschedule;
