//verified 1 by Raviraj Kumar
import { AiOutlineClockCircle, AiOutlineCalendar } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { CiTextAlignLeft, CiEdit } from "react-icons/ci";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";
import { RiDeleteBin6Line } from "react-icons/ri";

import {
  getMonthName,
  timestampfunc,
} from "../../common/calendar/common/timestampfun";
import { useContext } from "react";
import { selectSch } from "../../../lib/context/contextprovider";
import { useEffect } from "react";
import { db } from "../../../config/firebaseconfig";
import { useAuthContext } from "@/lib/context/AuthContext";
import { removeDomainFromEmail } from "@/lib/exportablefunctions";

const SideBodyDelete = ({ count, setCount }) => {
  const [date, setDate] = useState(new Date(Date.now()));
  const { scheduleSelect } = useContext(selectSch);
  const [selectedColor, setSelectedColor] = useState(
    scheduleSelect.e.defaultRadio
  );
  const { userProfile } = useAuthContext();

  // console.log("select", scheduleSelect);
  const [userData, setUserData] = useState({
    addTitle: scheduleSelect.e.addTitle,
    startTime: scheduleSelect.e.startTime,
    endTime: scheduleSelect.e.endTime,
    addBatch: scheduleSelect.e.addBatch,
    description: scheduleSelect.e.description,
    date: "",

    // date: timestampfunc(Date.now()),
  });
  // date: timestampfunc(Date.now()),
  const handleDateChange = (date) => {
    setDate(date);
  };

  const Mentorname = userProfile
    ? removeDomainFromEmail(userProfile.displayName)
    : "";
  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };
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

  const handleDeleteData = async () => {
    try {
      await deleteDoc(doc(db, "mentorsSchedule", scheduleSelect.e.uid));
      setCount(1);
      alert("Schedule is Deleted");
    } catch (error) {
      // console.log(error);
      alert("Something went wrong!");
    }
  };

  const handleEditData = async (event) => {
    event.preventDefault();

    const { addTitle, startTime, endTime, addBatch, description, date } =
      userData;

    if (startTime >= endTime) {
      alert("End time must be greater than start time.");
      return;
    }

    if (addTitle && startTime && endTime && addBatch && description && date) {
      try {
        const docRef = doc(db, "mentorsSchedule", scheduleSelect.e.uid);

        // Get the existing document data
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const dataToSend = {
            ...userData,
            defaultRadio: selectedColor,
          };

          await updateDoc(docRef, dataToSend);
          setCount(1);
          alert("Schedule is updated successfully");
        } else {
          alert("Document does not exist");
        }
      } catch (error) {
        console.error("Error updating document:", error);
        alert("Something went wrong!");
      }
    } else {
      alert("Please fill in all the data");
    }
  };

  useEffect(() => {
    // if (scheduleSelect) {
    //   userData.date =
    //     scheduleSelect.e.year +
    //     "-" +
    //     scheduleSelect.e.month +
    //     "-" +
    //     scheduleSelect.e.day;
    //   setUserData(scheduleSelect.e);
    // }
  }, [scheduleSelect, userData]);

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
            className="w-full bg-transparent text-xl py-2 border-none border-gray-300 text-slate-200  outline-none "
            placeholder="Add title"
            required
            value={userData.addTitle}
            onChange={handleChange}
          />
        </div>
        <hr className="opacity-50 mt-1 mb-3"></hr>

        <div className="p-1   flex ">
          <div>
            {" "}
            <AiOutlineClockCircle className="text-2xl mx-4 my-auto"></AiOutlineClockCircle>
          </div>
          <div className="w-full">
            <input
              name="date"
              type="date"
              placeholder="date"
              onChange={handleChange}
              className="bg-transparent outline-none "
            />

            <div className="text-sm grid grid-cols-2">
              <input
                type="time"
                name="startTime"
                id="StartTime"
                className="bg-transparent    border-none border-gray-300 text-slate-200  outline-none"
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
        <div className="p-1 flex ">
          <div>
            {" "}
            <HiUserGroup className="text-2xl my-auto mx-4"></HiUserGroup>
          </div>
          <div className="relative w-full">
            <input
              type="text"
              name="addBatch"
              id="AddBatch"
              className="bg-transparent text-[16px]  w-full    border-none border-gray-300 text-slate-200  outline-none "
              placeholder="Add Batch"
              required
              value={userData.addBatch}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="p-1 flex  ">
          <div>
            {" "}
            <CiTextAlignLeft className="text-xl mx-4 "></CiTextAlignLeft>
          </div>
          <div className="w-full">
            <input
              type="text"
              name="description"
              id="AddDescriptionorAttachents"
              className="bg-transparent  w-full     border-none border-gray-300 text-slate-200  outline-none "
              placeholder="Add Description"
              required
              value={userData.description}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className=" flex w-full ">
          <AiOutlineCalendar className="text-2xl mx-4 my-auto"></AiOutlineCalendar>
          <div className="w-full p-2">
            {Mentorname}
            <br></br>
            <p className="opacity-50 text-sm w-full">Notify 30 minutes ago</p>
          </div>
        </div>
        <div className="flex  my-5 rounded-2xl justify-evenly h-12 bg-[#575E68]">
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
      <div className="flex justify-evenly">
        <div
          className="rounded-xl text-white px-5 py-3 text-center m-2  flex space-x-2"
          style={{ background: "#A145CD" }}
        >
          <CiEdit className="mt-1" />
          <button onClick={handleEditData}>Edit</button>
        </div>
        <div
          className="rounded-xl text-white px-3 py-3 text-center m-2 flex space-x-2"
          style={{ background: "#A145CD" }}
        >
          <RiDeleteBin6Line className="mt-1" />
          <button onClick={handleDeleteData}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default SideBodyDelete;
