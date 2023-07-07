//verified 1 by Raviraj Kumar
// const Mentorname="Raviraj Kumar"   //replace this by fetching mentor name
//    this needs to be replaced with mentor name on line 204 and mentor id must also needed to be send to backend

import { AiOutlineClockCircle, AiOutlineCalendar } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { CiTextAlignLeft } from "react-icons/ci";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import { getMonthName } from "@/components/common/calendar/common/timestampfun";
import { useEffect } from "react";

import { callSchedulePostApiMentor } from "@/lib/exportablefunctions";

const SideBodyClassSchedule = ({ count, setCount }) => {
  const [date, setDate] = useState(new Date(Date.now()));
  const [selectedColor, setSelectedColor] = useState("#E1348B");

  const val = date.getYear() + date.getMonth() + date.getDate();
  const Mentorname = "Raviraj Kumar"; //replace this by fetching mentor name
  const [userData, setUserData] = useState({
    addTitle: "",
    startTime: "",
    endTime: "",
    addBatch: "",
    description: "",
    defaultRadio: selectedColor,
    date: "",
  });
  console.log("This data is scheduled", userData);
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "date") {
      const [year, month, day] = value.split("-");
      setUserData((prevUserData) => ({
        ...prevUserData,
        date: {
          month: getMonthName(parseInt(month)),
          day: parseInt(day),
          year: parseInt(year),
        },
      }));
    } else {
      setUserData((prevUserData) => ({
        ...prevUserData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { addTitle, startTime, endTime, addBatch, description, date } =
      userData;
      
      if (startTime >= endTime) {
        alert("End time must be greater than start time.");
        return;
      }

    const requiredFields = [
      addTitle,
      startTime,
      endTime,
      addBatch,
      description,
      date,
    ];
    // console.log(requiredFields);
    if (requiredFields.every((field) => field !== "")) {
      const dataToSend = {
        ...userData,
        defaultRadio: selectedColor,
        // mentorId:""
        //mentorName:""
        link: "",
      };

      callSchedulePostApiMentor(dataToSend)
        .then(() => {
          setUserData({
            addTitle: "",
            startTime: "",
            endTime: "",
            addBatch: "",
            description: "",
            date: "",
          });
          setCount(1);
          alert("New Class is Scheduled");
        })
        .catch((error) => {
          console.log(error);
          alert("Something went wrong!");
        });
    } else {
      alert("Please fill in all the data");
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className="h-full">
      <div
        className="rounded-xl p-5  text-white m-2 "
        style={{ background: "#33353B" }}
      >
        {/* <label htmlFor="AddTitle" className="sr-only  ">
          Add title
        </label> */}
        <div>
          <input
            type="text"
            name="addTitle"
            id="AddTitle"
            // className="bg-transparent text-xl py-2 border-none border-gray-300 text-slate-200  outline-none "
            className="w-auto bg-transparent text-xl py-2 border-none border-gray-300 text-slate-200  outline-none "
            placeholder="Add title"
            required
            value={userData.addTitle}
            onChange={handleChange}
          />
        </div>
        <hr className="opacity-50 mt-1 mb-3"></hr>

        <div className="p-1   flex my-6">
          <div>
            {" "}
            <AiOutlineClockCircle className="text-2xl mx-4"></AiOutlineClockCircle>
          </div>
          <div>
            <input
              name="date"
              type="date"
              placeholder="date"
              onChange={handleChange}
              className="bg-transparent outline-none "
            />

            <div className="text-sm mt-3 flex w-auto">
              <input
                type="time"
                name="startTime"
                id="StartTime"
                className="bg-transparent    border-none border-gray-300 text-slate-200 mr-4 outline-none"
                placeholder="Start 00:00:00"
                required
                value={userData.startTime || "00:00"}
                onChange={handleChange}
              />
              <input
                type="time"
                name="endTime"
                id="Endtime"
                className="bg-transparent   border-none border-gray-300 text-slate-200  outline-none "
                placeholder="End 00:00:00"
                required
                value={userData.endTime || "00:00"}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="p-1 flex my-6">
          <div>
            {" "}
            <HiUserGroup className="text-2xl mx-4"></HiUserGroup>
          </div>
          <div className="relative w-full">
            <input
              type="text"
              name="addBatch"
              id="AddBatch"
              className="bg-transparent text-[16px]  md:w-full    border-none border-gray-300 text-slate-200  outline-none "
              placeholder="Add Batch"
              required
              value={userData.addBatch}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="p-1 flex my-6 ">
          <div>
            {" "}
            <CiTextAlignLeft className="text-xl mx-4 "></CiTextAlignLeft>
          </div>
          <div className="">
            <input
              type="text"
              name="description"
              id="AddDescriptionorAttachents"
              className="bg-transparent  md:w-full  w-[70vw]   border-none border-gray-300 text-slate-200  outline-none "
              placeholder="Add Description"
              required
              value={userData.description}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="p-1 flex my-6">
          <AiOutlineCalendar className="text-2xl mx-4"></AiOutlineCalendar>
          <div>
            {Mentorname}
            <br></br>
            <p className="opacity-50 text-sm">Notify 30 minutes ago</p>
          </div>
        </div>
        <div className="flex mt-12 mb-10 rounded-2xl justify-evenly h-12 bg-[#575E68]">
          <div
            className={`bg-[#2E3036] rounded-[30px] h-[50%] m-auto w-6 ${
              selectedColor === "#2E3036" ? "border-2 border-white" : ""
            }`}
            onClick={() => handleColorSelect("#2E3036")}
          ></div>
          <div
            className={`bg-[#E1348B] rounded-[30px] h-[50%] m-auto w-6 ${
              selectedColor === "#E1348B" ? "border-2 border-white" : ""
            }`}
            onClick={() => handleColorSelect("#E1348B")}
          ></div>
          <div
            className={`bg-[#8642AA] rounded-[30px] h-[50%] m-auto w-6 ${
              selectedColor === "#8642AA" ? "border-2 border-white" : ""
            }`}
            onClick={() => handleColorSelect("#8642AA")}
          ></div>
        </div>
      </div>
      <div
        onClick={handleSubmit}
        className="rounded-xl text-white px-3 py-3 text-center m-2"
        style={{ background: "#A145CD" }}
      >
        <button>Schedule new class</button>
      </div>
    </div>
  );
};

export default SideBodyClassSchedule;
