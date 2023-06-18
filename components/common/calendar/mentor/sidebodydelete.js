//verified 1 by Raviraj Kumar
import { AiOutlineClockCircle, AiOutlineCalendar } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { CiTextAlignLeft, CiEdit } from "react-icons/ci";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";
import { RiDeleteBin6Line } from "react-icons/ri";

import { timestampfunc } from "../common/timestampfun";
import { useContext } from "react";
import { selectSch } from "../../../../lib/context/contextprovider";
import { useEffect } from "react";
import { db } from "../../../../config/firebaseconfig";

const SideBodyDelete = ({ count, setCount }) => {
  const [date, setDate] = useState(new Date(Date.now()));
  const { scheduleSelect } = useContext(selectSch);

  const [userData, setUserData] = useState({
    addTitle: "",
    startTime: "",
    endTime: "",
    addBatch: "",
    description: "",
    defaultRadio: "#8642AA",
    date: timestampfunc(Date.now()),
  });

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleDeleteData = async () => {
    try {
      await deleteDoc(doc(db, "mentorsSchedule", userData.id));
      setCount(1);
      alert("Schedule is Deleted");
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };

  const handleEditData = async (event) => {
    event.preventDefault();

    const {
      addTitle,
      startTime,
      endTime,
      addBatch,
      description,
      defaultRadio,
      date,
    } = userData;

    if (
      addTitle &&
      startTime &&
      endTime &&
      defaultRadio &&
      addBatch &&
      description &&
      date
    ) {
      try {
        const docRef = doc(db, "mentorsSchedule", userData.id);

        // Get the existing document data
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          await updateDoc(docRef, userData);
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
    if (scheduleSelect) {
      userData.date = scheduleSelect.e.year + "-" + scheduleSelect.e.month + "-" + scheduleSelect.e.day
      setUserData(scheduleSelect.e);

    }
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
            className="w-[90vw] bg-transparent text-xl py-2 border-none border-gray-300 text-slate-200  outline-none "
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

            <div className="text-sm mt-3 flex w-[60vw]">
              <input
                type="time"
                name="startTime"
                id="StartTime"
                className="bg-transparent    border-none border-gray-300 text-slate-200 mr-4 outline-none "
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
              className="bg-transparent text-[16px]  md:w-full  w-[70vw]  border-none border-gray-300 text-slate-200  outline-none "
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
            Raviraj Kumar<br></br>
            <p className="opacity-50 text-sm">Notify 30 minutes ago</p>
          </div>
        </div>
        <div className=" flex mt-12 mb-10 rounded-2xl justify-evenly">
          <div className="bg-[#2E3036] rounded-[30px] h-[50%] m-[auto]">
            <input
              id="defaultRadio"
              type="radio"
              value={"#2E3036" ? "#2E3036" : userData.defaultRadio}
              onChange={handleChange}
              className="w-4 h-4 m-3 defaultradio1  drop-shadow-xl"
              name="defaultRadio"
              style={{ accentColor: "#2E3036" }}
            />
          </div>
          <div className="bg-[#E1348B] rounded-[30px] h-[50%] m-[auto]">
            <input
              id="defaultRadio"
              name="defaultRadio"
              type="radio"
              value={"#E1348B" ? "#E1348B" : userData.defaultRadio}
              onChange={handleChange}
              className="w-4 h-4 m-3 defaultradio2 drop-shadow-xl "
              style={{ accentColor: "#E1348B" }}
            />
          </div>
          <div className="bg-[#8642AA] rounded-[30px] h-[50%] m-[auto]">
            <input
              id="defaultradio"
              name="defaultradio"
              type="radio"
              value={"#8642AA" ? "#8642AA" : userData.defaultRadio}
              onChange={handleChange}
              style={{ accentColor: "#8642AA" }}
              className="w-4 h-4 m-3 defaultradio3 drop-shadow-xl "
            />
          </div>
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

export default calendarsidebodydelete;
