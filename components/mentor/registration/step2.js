// Verified by Pradhumn
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useClickOutside from "@/components/mentor/other/useclickoutside";

const MentorStep2 = ({ setRegStepCount, regStepCount }) => {
  // this state is  for qualification array data
  const [arrQ, setArrQ] = useState([]);
  // this state is  for experience array data
  const [arrE, setArrE] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [user, setUser] = useState([]);
  // const router = useRouter();

  const [qualification, setQualification] = useState({
    universityname: "",
    fieldOfStudy: "",
    startdate: "",
    enddate: "",
    grade: "",
    cgpa: "",
    percentage: "",
  });
  const [experience, setExperience] = useState({
    jobtitle: "",
    employmenttype: "",
    companyname: "",
    startdate: "",
    enddate: "",
    working: "",
    location: "",
    locationtype: "",
  });
  // delete
  const deleteItemq = (itemToDelete) => {
    const updatedArray = arrQ.filter((item) => item !== itemToDelete);

    // Update the state with the new array
    setArrQ(updatedArray);
  };
  const deleteIteme = (itemToDelete) => {
    const updatedArray = arrE.filter((item) => item !== itemToDelete);

    // Update the state with the new array
    setArrE(updatedArray);
  };
  // popover function
  //--------------------
  // for Qualification setting refrence model
  const handleToggle = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleClickOutside = () => {
    setIsModalOpen(false);
  };
  const ref = useClickOutside(handleClickOutside);

  // for Work experience setting refrence model
  const handleToggle2 = () => {
    setIsModalOpen2(!isModalOpen2);
  };
  const handleClickOutside2 = () => {
    setIsModalOpen2(false);
  };
  const ref2 = useClickOutside(handleClickOutside2);
  //-----------------------------------

  //Setting data from input  of qualifications
  const setData = (e) => {
    const { name, value } = e.target;
    setQualification((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const addqualification = () => {
    if (
      qualification.universityname == "" ||
      qualification.fieldOfStudy == "" ||
      qualification.startdate == "" ||
      qualification.enddate == ""
    ) {
      alert("Field Empty!");
    } else {
      setArrQ([...arrQ, qualification]);
      setQualification({
        universityname: "",
        fieldOfStudy: "",
        startdate: "",
        enddate: "",
        grade: "",
        cgpa: "",
        percentage: "",
      });
      setIsModalOpen(false);
    }
  };

  // Experience Section data
  const setData2 = (e) => {
    const { name, value, checked, type } = e.target;
    if (type == "checkbox") {
      setExperience((preval) => {
        return {
          ...preval,
          [name]: checked,
        };
      });
    } else {
      setExperience((preval) => {
        return {
          ...preval,
          [name]: value,
        };
      });
    }
  };

  // add experience from  experience popup in object format
  const addexperience = () => {
    if (
      experience.jobtitle == "" ||
      experience.employmenttype == "" ||
      experience.startdate == "" ||
      experience.locationtype == ""
    ) {
      alert("Field Empty!");
    } else if (experience.working && experience.enddate !== "") {
      alert(
        "Please select either 'Working' or provide an 'End Date', not both."
      );
    } else {
      setArrE([...arrE, experience]);
      setExperience({
        jobtitle: "",
        employmenttype: "",
        companyname: "",
        startdate: "",
        enddate: "",
        working: "",
        location: "",
        locationtype: "",
      });
      setIsModalOpen2(false);
    }
  };
  // const user = JSON.parse(localStorage.getItem("userdata"));
  // Main Data to be sent from page 2 with qualification and expereience as arrQ and arrE respectively
  const addInputData = async (e) => {
    e.preventDefault();
    if (arrE.length == 0 || arrQ.length == 0) {
      alert("Please add required details to continue!");
    } else {
      try {
        user.experience = arrE;
        user.qualification = arrQ;
        localStorage.setItem("userdata", JSON.stringify(user));

        setRegStepCount(3);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(JSON.parse(localStorage.getItem("userdata")));
    }
  }, []);

  return (
    <>
      <div className="flex h-screen  md:mt-12 ml-[15px]">
        <div className=" w-full h-full flex flex-col  ">
          <div className="  text-white grow flex items-center justify-center ">
            <div
              className="w-[90%] m-auto flex  rounded-[30px] h-fit"
              ref={ref2}
            >
              {/* {/* //start of model 2 which i put at this another place */}
              {isModalOpen2 && (
                <div
                  className={`z-10 ${
                    isModalOpen2 ? "block" : "hidden"
                  } absolute    left-1/2  md:left-1/2  transform -translate-x-1/2  w-full max-w-md bg-[#1E1E1E]   shadow-lg p-4 rounded-[20px]`}
                >
                  <h1 className="border-b border-[#728095] mb-5 text-xl ">
                    {" "}
                    Add Details
                  </h1>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-white mb-1">
                      Job Title
                    </label>
                    <input
                      required
                      type="text"
                      onChange={setData2}
                      name="jobtitle"
                      value={experience.jobtitle}
                      className="text-white focus:border-transparent focus:outline-none text-sm rounded-lg block w-full p-2.5 bg-[#333333] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Type here"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-white mb-1">
                      Employment Type
                    </label>
                    <select
                      onChange={setData2}
                      name="employmenttype"
                      value={experience.employmenttype}
                      className="text-white focus:border-transparent focus:outline-none text-sm rounded-lg block w-full p-2.5 bg-[#333333] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Employment Type</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Permanent">Permanent</option>
                      <option value="Freelancer">Freelancer</option>
                      <option value="Internship">Internship</option>
                      <option value="Trainee">Trainee</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-white mb-1">
                      Company Name
                    </label>
                    <input
                      required
                      type="text"
                      onChange={setData2}
                      name="companyname"
                      value={experience.companyname}
                      className="text-white focus:border-transparent focus:outline-none text-sm rounded-lg block w-full p-2.5 bg-[#333333] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Type here"
                    />
                  </div>
                  {/* <div className="mb-6 flex items-center w-full space-x-4">
                    <label className="block text-sm font-medium text-white">
                      Start date
                    </label>
                    <input
                      type="date"
                      name="startdate"
                      className="text-white focus:border-transparent focus:outline-none text-sm rounded-lg block w-1/2 p-3.5 bg-[#333333] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500"
                      onChange={setData2}
                      value={experience.startdate}
                      required
                    />

                    <label className="block text-sm font-medium text-white">
                      End Date
                    </label>
                    <input
                      type="date"
                      className="text-white focus:border-transparent focus:outline-none text-sm rounded-lg block w-1/2 p-3.5 bg-[#333333] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500"
                      onChange={setData2}
                      name="enddate"
                      value={experience.enddate}
                      required
                    />
                  </div> */}
                  <div className="mb-6 md:flex items-center w-full gap-10">
                    <div>
                      <label className="block text-sm font-medium text-white">
                        Start date
                      </label>
                      <input
                        type="date"
                        name="startdate"
                        className="text-white focus:border-transparent focus:outline-none text-sm rounded-lg block  p-3.5 bg-[#333333] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500 w-full"
                        onChange={setData2}
                        value={experience.startdate}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white">
                        End Date
                      </label>
                      <input
                        type="date"
                        className="text-white focus:border-transparent focus:outline-none text-sm rounded-lg block  p-3.5 bg-[#333333] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500 w-full"
                        onChange={setData2}
                        name="enddate"
                        value={experience.enddate}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3 flex">
                    <input
                      required
                      type="checkbox"
                      onChange={setData2}
                      name="working"
                      checked={experience.working}
                      className="text-white focus:border-transparent focus:outline-none text-sm rounded-lg block mr-3 bg-[#AA2769] border border-[#5F6065] placeholder-[#AA2769] focus:ring-blue-500 focus:border-blue-500 focus:text-[#AA2769] selection:text-[#AA2769]"
                    />
                    <label className="block text-sm font-medium text-white w-[100%]">
                      I am currently Working in this role
                    </label>
                  </div>{" "}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-white mb-1">
                      Location
                    </label>
                    <input
                      required
                      type="text"
                      onChange={setData2}
                      name="location"
                      value={experience.location}
                      className="text-white focus:border-transparent focus:outline-none text-sm rounded-lg block w-full p-2.5 bg-[#333333] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500 "
                      placeholder="Type here"
                    />
                  </div>{" "}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-white mb-1">
                      Location Type
                    </label>
                    <select
                      onChange={setData2}
                      name="locationtype"
                      value={experience.locationtype}
                      className="text-white focus:border-transparent focus:outline-none text-sm rounded-lg block w-full p-2.5 bg-[#333333] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Location Type</option>
                      <option value="Onsite">Onsite</option>
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                  <button
                    onClick={addexperience}
                    type="submit"
                    className="text-white focus:border-transparent text  bg-[#AA2769] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-[#93225a] focus:ring-blue-800 my-8 ml-auto"
                  >
                    Add
                  </button>
                </div>
              )}

              {/* //End of model 2 which i put at this another place */}
              {/* main div Top section */}
              <div className="flex-[2_2_0%] px-[12rem] space-y-10  bg-[#222222] rounded-[30px] ml-[-18px] ">
                <div className=" flex justify-between text-xl mt-10 mb-[-20px]  ">
                  <div>
                    <button
                      onClick={() => setRegStepCount(1)}
                      className=" rounded text-xs p-2 px-4 bg-[#505057]"
                    >
                      {"<- "}Back
                    </button>
                  </div>
                  <div className="flex gap-20">
                    <div
                      onClick={() => setRegStepCount(1)}
                      className={`${
                        regStepCount == 2 ? "text-[#6E294C]" : `text-[#E1348B]`
                      }  mt-3 hidden md:block`}
                    >
                      Step1
                    </div>
                    <div
                      onClick={() => setRegStepCount(2)}
                      className={`${
                        regStepCount == 2 ? `text-[#E1348B]` : "text-[#6E294C]"
                      } mt-3 hidden md:block`}
                    >
                      Step2
                    </div>
                    <div
                      onClick={() => setRegStepCount(3)}
                      className={`${
                        regStepCount == 2 ? "text-[#6E294C]" : `text-[#E1348B]`
                      } mt-3 hidden md:block`}
                    >
                      Step3
                    </div>
                  </div>
                  <div></div>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300 mb-5" />
                {/* main div main section starts  with educationa and eperience */}
                <h1 className="text-2xl m focus:border-transparent focus:outline-noney-4    font-Inter text-[#E1348B]">
                  Education & Experience
                </h1>

                {/* Qualification Section with popup and respective data */}
                <h2 className="">Qualification</h2>
                <div
                  className="mb-64 relative flex flex-col items-center justify-center w-full space-x-4 space-y-5  border border-[#5F6065] p-10 rounded-2xl py-12 "
                  ref={ref}
                >
                  <div className="flex space-x-4 items-center justify-center">
                    {" "}
                    <div
                      className={`block text-sm font-medium text-white border border-[#5F6065] rounded p-2 ${
                        isModalOpen ? "bg-gray-600" : ""
                      } text-center`}
                      onClick={handleToggle}
                    >
                      Add Qualification
                    </div>
                  </div>
                  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-[-30px] text-center  overflow-hidden ">
                    {arrQ.map((e, i) => (
                      <div
                        key={i}
                        className="border  border-[#823DA2] rounded-[15px] p-3 text-xs space-y-1 overflow-hidden"
                      >
                        <div>{e.universityname}</div>
                        <div>{e.fieldOfStudy}</div>
                        <div>
                          {e.startdate.split("-")[0]}
                          {" - "}
                          {e.enddate.split("-")[0]}
                        </div>
                        <div>Grade: {e.grade}</div>
                        <div
                          onClick={() => deleteItemq(e)}
                          className="flex justify-end align-bottom text-[#A145CD] "
                        >
                          x
                        </div>
                      </div>
                    ))}
                  </div>
                  {isModalOpen && (
                    <div
                      className={`z-10 ${
                        isModalOpen ? "block" : "hidden"
                      } absolute top-1/2 left-1/2 md:top-1/2 md:left-1/2  transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#1E1E1E]  shadow-lg p-4 rounded-[20px]`}
                    >
                      <h1 className="border-b border-[#728095] mb-4 text-xl ">
                        {" "}
                        Add Details
                      </h1>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-white mb-1">
                          University Name
                        </label>
                        <input
                          required
                          type="text"
                          onChange={setData}
                          name="universityname"
                          value={qualification.universityname}
                          className="text-white focus:border-transparent focus:outline-none text-sm rounded-lg block w-full p-2.5 bg-[#333333] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500"
                          placeholder="University Name"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-white mb-1">
                          Field of Study
                        </label>
                        <input
                          required
                          type="text"
                          onChange={setData}
                          name="fieldOfStudy"
                          value={qualification.fieldOfStudy}
                          className="text-white focus:border-transparent focus:outline-none text-sm rounded-lg block w-full p-2.5 bg-[#333333] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Interest"
                        />
                      </div>
                      <div className="mb-6 md:flex items-center w-full gap-10">
                        <div>
                          <label className="block text-sm font-medium text-white">
                            Start date
                          </label>
                          <input
                            type="date"
                            name="startdate"
                            className="text-white focus:border-transparent focus:outline-none text-sm rounded-lg block  p-3.5 bg-[#333333] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500 w-full"
                            onChange={setData}
                            value={qualification.startdate}
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-white">
                            End Date
                          </label>
                          <input
                            type="date"
                            className="text-white focus:border-transparent focus:outline-none text-sm rounded-lg block  p-3.5 bg-[#333333] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500 w-full"
                            onChange={setData}
                            name="enddate"
                            value={qualification.enddate}
                            required
                          />
                        </div>
                      </div>

                      <h1>Score</h1>
                      <div className="flex  justify-between gap-3">
                        <select
                          onChange={setData}
                          name="grade"
                          value={qualification.grade}
                          className="text-white focus:border-transparent focus:outline-none text-sm rounded-lg block w-full p-2.5 bg-[#333333] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Grade</option>
                          <option value="A+">A+</option>
                          <option value="A">A</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B">B</option>
                          <option value="B-">B-</option>
                          <option value="C+">C+</option>
                          <option value="C">C</option>
                          <option value="C-">C-</option>
                          <option value="D+">D+</option>
                          <option value="D">D</option>
                          <option value="D-">D-</option>
                          <option value="E">E</option>

                        </select>
                        <input
                          onChange={setData}
                          name="cgpa"
                          value={qualification.cgpa}
                          placeholder="CGPA"
                          className="text-white focus:border-transparent focus:outline-none text-sm rounded-lg block w-full p-2.5 bg-[#333333] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500"
                          type="number"
                          min="0"
                          max="10"
                        />

                        <input
                          onChange={setData}
                          name="percentage"
                          value={qualification.percentage}
                          placeholder="percentage"
                          className="text-white focus:border-transparent focus:outline-none text-sm rounded-lg block w-full p-2.5 bg-[#333333] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500"
                          type="number"
                          min="0"
                          max="100"
                        />
                      </div>
                      <button
                        onClick={addqualification}
                        type="submit"
                        className="text-white focus:border-transparent   bg-[#AA2769] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-[#93225a] focus:ring-blue-800 my-8 ml-auto"
                      >
                        Add
                      </button>
                    </div>
                  )}
                </div>

                {/* Work Experience Section with popup and respective data */}

                <h2 className="">Work Experience</h2>
                <div className="mb-64 relative flex flex-col items-center justify-center w-full space-x-4 space-y-4  border border-[#5F6065] rounded-2xl p-10 py-12">
                  <div className="flex space-x-4 items-center justify-center">
                    {" "}
                    <div
                      className={`block text-sm font-medium text-white border border-[#5F6065] rounded p-2 ${
                        isModalOpen2 ? "bg-gray-600" : ""
                      } text-center`}
                      onClick={handleToggle2}
                    >
                      Add Experience
                    </div>
                  </div>
                  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-[-30px] text-center  overflow-hidden ">
                    {arrE.map((e, i) => (
                      <div
                        key={i}
                        className="border  border-[#823DA2] rounded-[15px] p-3 text-xs space-y-1 over"
                      >
                        <div>{e.jobtitle}</div>
                        <div>{e.employmenttype}</div>
                        <div>{e.companyname}</div>
                        <div>
                          {e.startdate.split("-")[0]}
                          {" - "}
                          {e.enddate.split("-")[0]}
                        </div>
                        <div> {e.location}</div>
                        <div
                          onClick={() => deleteIteme(e)}
                          className="flex justify-end align-bottom text-[#A145CD] "
                        >
                          x
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* // Model for  experience */}

                  {/* // Model for  experience  till here*/}
                </div>

                {/* submit button */}
                <div className="flex justify-end">
                  <button
                    onClick={addInputData}
                    type="submit"
                    className="text-white focus:border-transparent   bg-[#A145CD] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2.5 text-center hover:bg-[#93225a] focus:ring-blue-800 my-5"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorStep2;
