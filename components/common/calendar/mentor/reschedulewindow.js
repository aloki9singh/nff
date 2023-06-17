import { AiOutlineClockCircle, AiOutlineCalendar } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { CiTextAlignLeft } from "react-icons/ci";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

let RescheduleWindow = ({ hidepopup }) => {
  const [startDate, setStartDate] = useState(new Date());
  let [schedular, setSchedular] = useState({});
  let schedularfun = (val) => {
    let fieldname = val.target.id;
    let fieldvalue = val.target.value;
    setSchedular((form) => {
      return {
        ...form,
        [fieldname]: fieldvalue,
      };
    });
  };
  let dateSeletfun = (date) => {
    setSchedular((form) => {
      return {
        ...form,
        dateof: date,
      };
    });
    setStartDate(date);
  };
  return (
    <>
      <div className="p-2   absolute z-30 bg-black  rounded-2xl">
        <div className="w-fit">
          <div
            className="rounded-xl p-3 px-6 text-white m-2  "
            style={{ background: "#33353B" }}
          >
            <div
              className="text-white text-2xl  flex justify-end"
              onClick={hidepopup}
            >
              <RxCross2></RxCross2>
            </div>
            <label for="AddTitle" className="sr-only">
              Add title
            </label>
            <div className="relative w-full">
              <input
                type="text"
                id="AddTitle"
                className="bg-transparent text-xl  border-none border-gray-300 text-slate-200  outline-none "
                placeholder="Add title"
                required
                onChange={schedularfun}
              />
            </div>
            <hr className="opacity-50 mt-1 mb-3"></hr>

            <div className="p-1   flex my-6">
              <AiOutlineClockCircle className="text-2xl mx-2"></AiOutlineClockCircle>
              <div>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    dateSeletfun(date);
                  }}
                  className="bg-transparent outline-none"
                />{" "}
                <br></br>
                <div className="text-sm ">
                  <div className="text-sm ">
                    <input
                      type="text"
                      id="start time"
                      className="bg-transparent   border-none border-gray-300 text-slate-200  outline-none "
                      placeholder="start 00:00:00"
                      required
                      onChange={schedularfun}
                    />
                    <input
                      type="text"
                      id="end time"
                      className="bg-transparent   border-none border-gray-300 text-slate-200  outline-none "
                      placeholder="end 00:00:00"
                      required
                      onChange={schedularfun}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-1 flex my-6">
              <HiUserGroup className="text-2xl mx-2"></HiUserGroup>
              <div className="relative w-full">
                <input
                  type="text"
                  id="AddBatch"
                  className="bg-transparent text-xl  border-none border-gray-300 text-slate-200  outline-none "
                  placeholder="Add Batch"
                  required
                  onChange={schedularfun}
                />
              </div>
            </div>
            <div className="p-1 flex my-6">
              <CiTextAlignLeft className="text-2xl mx-2"></CiTextAlignLeft>
              <div className="relative w-full">
                <input
                  type="text"
                  id="AddDiscriptionorAttachents"
                  className="bg-transparent text-xl  border-none border-gray-300 text-slate-200  outline-none "
                  placeholder="Add Discription"
                  required
                  onChange={schedularfun}
                />
              </div>
            </div>
            <div className="p-1 flex my-6">
              <AiOutlineCalendar className="text-2xl mx-2"></AiOutlineCalendar>
              <div>
                Raviraj Kumar<br></br>
                <p className="opacity-50 text-sm">Notify 30 minutes ago</p>
              </div>
            </div>
            <div
              className=" flex my-6 rounded-2xl justify-evenly"
              style={{ background: "#575E68" }}
            >
              <input
                id="defaultradio"
                type="radio"
                value="#2E3036"
                onChange={schedularfun}
                className="w-6 h-6 m-3 defaultradio1 drop-shadow-xl focus:ring-2 focus:ring-slate-100"
                name="defaultradio"
                style={{ accentColor: "#2E3036" }}
              />
              <input
                id="defaultradio"
                name="defaultradio"
                type="radio"
                value="#E1348B"
                onChange={schedularfun}
                className="w-6 h-6 m-3 defaultradio2 drop-shadow-xl focus:ring-2 focus:ring-slate-100"
                style={{ accentColor: "#E1348B" }}
              />
              <input
                id="defaultradio"
                name="defaultradio"
                type="radio"
                value="#8642AA"
                onChange={schedularfun}
                style={{ accentColor: "#8642AA" }}
                className="w-6 h-6 m-3 defaultradio3 drop-shadow-xl focus:ring-2 focus:ring-slate-100"
              />
            </div>
          </div>
          <div
            className="rounded-xl text-white px-3 py-3 text-center m-2"
            style={{ background: "#A145CD" }}
          >
            <button>Schedule new class</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default calendarreschedulewindow;
