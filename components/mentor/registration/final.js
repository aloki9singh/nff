// Verified by Pradhumn
import React, { useEffect, useState } from "react";


import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../config/firebaseconfig";

const MentorFinal = ({setRegStepCount,regStepCount}) => {

  const [id, setId] = useState("");
  const [mentor, setMentor] = useState();
  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    pPhone: "",
    dob: "",
    sPhone: "",
    address: "",
    city: "",
    postalcode: "",
    country: "",
    interest: "",
    others: "",
    skills: "",
    reason: "",
    aspiring: "",
  });
  console.log(id);
  // this state is  for experience array data

  //--------------------
  // for Qualification setting refrence model

  //step2end
  // Setting Data in  respective state

  const setData = (e) => {
    const { name, value } = e.target;
    setInput((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  // detail added to  Render

  const detailadd = async () => {
    const res = await fetch(`/api/mentorsdetail/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ details: mentor }),
    });

    const data = await res.json();

    if (res.status === 404) {
      alert("error");
      console.log("Error!");
    } else {
      console.log("Data Added Successfully");
      setRegStepCount(5)
    }
  };

  useEffect(() => {
    const LSdata = JSON.parse(localStorage.getItem("userdata"));
    if (typeof window !== "undefined") {
      setMentor(JSON.parse(localStorage.getItem("userdata")));
    }
    setInput(LSdata);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated
        // You can access the user's properties like user.uid, user.displayName, etc.
        setId(user.uid);
      } else {
        // User is not authenticated
      }
    });

    return () => unsubscribe(); // Cleanup the listener
  }, []);

  return (
    <>
      <div className="text-white md:m-10 rounded-[25px] p-10 bg-[#222222]  ">
        <div className="">
          <div className=" flex justify-between text-xl md:mx-20 ">
            <div>
              <h6 className=" font-bold mb-5 text-[#E1348B] text-3xl">
                Preview
              </h6>
              <p className="text-xs w-[80%] text-[#FFFFFF82]">
                Preview the information carefully and submit the form.
              </p>
            </div>{" "}
          </div>
          <hr className="mt-6 border-b-1 border-blueGray-300 mb-5 md:mx-20" />
        </div>
        {/* section form starts of preview */}
        <div className="md:mx-10">
          <form action=" " className="md:ml-10">
            <div className=" text-2xl text-pink-500 mt-3 mb-5 text-[#E1348B]">
              Personal Details
            </div>
            <div className=" grid max-w-full md:max-w-4xl mt-5 justify-between md:grid-cols-2 gap-5 ">
              <div className="md:flex ">
                <label htmlFor="" className=" text-sm font-md mr-10 md: mt-3">
                  First Name
                </label>
                <input
                  name="firstname"
                  value={input.firstname}
                  onChange={setData}
                  type="text"
                  placeholder="First Name"
                  className="rounded focus:border-transparent focus:outline-none text-sm p-2 my-2 w-[100%] bg-[#333333] "
                />
              </div>
              <div className="md:flex ">
                <label htmlFor="" className=" text-sm font-md mr-10 md: mt-3">
                  Last Name
                </label>
                <input
                  name="lastname"
                  value={input.lastname}
                  onChange={setData}
                  type="text"
                  placeholder="Last Name"
                  className="rounded focus:border-transparent focus:outline-none text-sm p-2 my-2 w-[100%]  bg-[#333333] "
                />
              </div>
            </div>

            <div className=" grid max-w-full md:max-w-4xl mt-5 justify-between md:grid-cols-2 gap-5">
              <div className="md:flex ">
                <label htmlFor="" className=" text-sm font-md mr-10 md: mt-3">
                  Email
                </label>
                <input
                  name="email"
                  value={input.email}
                  onChange={setData}
                  type="text"
                  placeholder="Email"
                  className="rounded focus:border-transparent focus:outline-none text-sm p-2 my-2 w-[100%] bg-[#333333] "
                />
              </div>
              <div className="md:flex ">
                <label htmlFor="" className=" text-sm font-md mr-10 md: mt-3">
                  Primary Phone Number
                </label>
                <input
                  name="pPhone"
                  value={input.pPhone}
                  onChange={setData}
                  type="tel"
                  placeholder="Type here"
                  className="rounded focus:border-transparent focus:outline-none text-sm p-2 my-2 w-[100%]  bg-[#333333] "
                />
              </div>
            </div>

            <div className=" grid max-w-full md:max-w-4xl mt-5 justify-between md:grid-cols-2 gap-5">
              <div className="md:flex ">
                <label htmlFor="" className=" text-sm font-md mr-10 md: mt-3">
                  DOB
                </label>
                <input
                  name="dob"
                  value={input.dob}
                  onChange={setData}
                  type="date"
                  className="rounded focus:border-transparent focus:outline-none text-sm p-2 my-2 w-[100%] bg-[#333333] "
                />
              </div>
              <div className="md:flex ">
                <label htmlFor="" className=" text-sm font-md mr-10 md: mt-3">
                  Secondary Phone Number
                </label>
                <input
                  name="sPhone"
                  value={input.sPhone}
                  onChange={setData}
                  type="tel"
                  placeholder="Type here"
                  className="rounded focus:border-transparent focus:outline-none text-sm p-2 my-2 w-[100%]  bg-[#333333] "
                />
              </div>
            </div>
            <div>
              <div className=" text-2xl text-pink-500 mt-3 mb-5 text-[#E1348B]">
                Address
              </div>
              <div className=" grid max-w-full md:max-w-4xl mt-5 justify-between md:grid-cols-1 gap-5">
                <div className="md:flex ">
                  <label htmlFor="" className=" text-sm font-md mr-10 md: mt-3">
                    Apartment, Street Name
                  </label>
                  <input
                    name="address"
                    value={input.address}
                    onChange={setData}
                    type="text"
                    placeholder="Apartment,Street Name"
                    className="rounded focus:border-transparent focus:outline-none text-sm p-2 my-2 w-[100%] bg-[#333333] "
                  />
                </div>
              </div>
              <div className=" grid max-w-full md:max-w-4xl mt-5 justify-between md:grid-cols-2 gap-5">
                <div className="md:flex ">
                  <label htmlFor="" className=" text-sm font-md mr-10 md: mt-3">
                    City
                  </label>
                  <select
                    type="text"
                    name="city"
                    onChange={setData}
                    value={input.city}
                    className="rounded focus:border-transparent focus:outline-none text-sm p-2 my-2 w-[100%] bg-[#333333] "
                  >
                    <option value="">Select City</option>
                    <option value="Jaipur">Jaipur</option>
                    <option value="Ajmer">Ajmer</option>
                    <option value="Behror">Behror</option>
                    <option value="Udaipur">Udaipur</option>
                    <option value="Ajmer">Ajmer</option>
                    <option value="Jaipur">Jaipur</option>
                  </select>
                </div>
                <div className="md:flex ">
                  <label htmlFor="" className=" text-sm font-md mr-10 md: mt-3">
                    Postal Code
                  </label>
                  <input
                    name="postalcode"
                    value={input.postalcode}
                    onChange={setData}
                    type="text"
                    placeholder="Enter Area code"
                    className="rounded focus:border-transparent focus:outline-none text-sm p-2 my-2 w-[100%]  bg-[#333333] "
                  />
                </div>
              </div>
              <div className=" grid max-w-full md:max-w-4xl mt-5 justify-between md:grid-cols-2 gap-5">
                <div className="md:flex ">
                  <label htmlFor="" className=" text-sm font-md mr-10 md: mt-3">
                    Select Country
                  </label>
                  <select
                    name="country"
                    onChange={setData}
                    value={input.country}
                    type="text"
                    className="rounded focus:border-transparent focus:outline-none text-sm p-2 md:my-2 w-[100%] bg-[#333333] "
                  >
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="India">India</option>
                    <option value="India">India</option>
                    <option value="India">India</option>
                    <option value="India">India</option>
                    <option value="India">India</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
          {/* //step2 */}
          {/* <div className=" h-screen ">
            <div className=" w-full h-full   "> */}
          <div className="  text-white grow flex items-center justify-center my-5  mx-[-15px]">
            <div className="w-[92%] m-auto flex  rounded-[30px] h-fit">
              {/* {/* //start of model 2 which i put at this another place */}

              {/* //End of model 2 which i put at this another place */}

              {/* main div Top section */}
              <div className="flex-[2_2_0%]  px-9 space-y-10  bg-[#222222] rounded-[30px] ml-[-18px] w-full ">
                {/* main div main section starts  with educationa and eperience */}
                <h1 className="text-2xl m focus:border-transparent focus:outline-noney-4    font-Inter text-[#E1348B]">
                  Education & Experience
                </h1>

                {/* Qualification Section with popup and respective data */}
                <h2 className="">Qualification</h2>
                <div className="mb-64 relative flex flex-col items-center justify-center w-full space-x-4 space-y-5  border border-[#5F6065] rounded p-10 ">
                  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4  text-center   overflow-hidden ">
                    {mentor !== undefined &&
                      mentor.qualification.length !== 0 &&
                      mentor.qualification.map((e, i) => (
                        <div
                          key={i}
                          className="border   border-[#823DA2] rounded-[15px] p-3 text-xs space-y-1 overflow-hidden"
                        >
                          <div>{e.universityname}</div>
                          <div>{e.fieldOfStudy}</div>
                          <div>
                            {e.startdate.split("-")[0]}
                            {" - "}
                            {e.enddate.split("-")[0]}
                          </div>
                          <div>Grade: {e.grade}</div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Work Experience Section with popup and respective data */}

                <h2 className="">Work Experience</h2>
                <div className="mb-64 relative flex flex-col items-center justify-center w-full space-x-4 space-y-4  border border-[#5F6065] rounded p-10 ">
                  <div className="flex space-x-4 items-center justify-center"></div>
                  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-[-30px] text-center  overflow-hidden ">
                    {mentor !== undefined &&
                      mentor.experience.map((e, i) => (
                        <div
                          key={i}
                          className="border  border-[#823DA2] rounded-[15px] p-3 text-xs space-y-1 overflow-hidden"
                        >
                          <div>{e.jobtitle}</div>
                          <div>{e.employmenttype}</div>
                          <div>{e.companyname}</div>
                          <div>
                            {e.startdate.split("-")[0]}
                            {" - "}
                            {e.enddate.split("-")[0]}
                          </div>
                          <div>Working: {e.working}</div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </div>
          </div> */}

          {/* step3 */}

          <div className=" md:mx-20 ">
            <h1 className="text-2xl my-10    font-Inter text-[#E1348B]">
              Area of Expertise
            </h1>

            {/* skills */}
            <div className="md:flex">
              <div className="mb-10 md:flex items-center space-y-4    w-full ">
                <label className="block text-sm font-medium text-white mt-4 mr-5">
                  Feild of Interest:
                </label>
                <select
                  name="interest"
                  onChange={setData}
                  value={input.interest}
                  className="focus:outline-none text-white text-sm rounded-lg block w-full p-4  bg-[#333333] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" className="text-xs">
                    Select from this List
                  </option>
                  <option value="Python" className="text-xs">
                    Python
                  </option>
                  <option value="Java" className="text-xs">
                    Java
                  </option>
                  <option value="MERN" className="text-xs">
                    MERN
                  </option>
                </select>
              </div>
              <div className="mb-10 md:flex items-center space-y-4    w-full">
                <label className="block text-sm font-medium text-white mt-4 mr-12 md:ml-5">
                  Others:
                </label>
                <input
                  type="text"
                  className="focus:outline-none text-white text-sm rounded-lg block w-full p-4  bg-[#333333] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Type if not mention in the list"
                  name="others"
                  onChange={setData}
                  value={input.others}
                />
              </div>
            </div>
            <div className="mb-10 md:flex items-center space-y-4    w-full">
              <label className="block text-sm font-medium text-white mt-4 mr-12">
                Skills:
              </label>
              <div className="text-white text-sm rounded-lg block w-full p-4  bg-[#333333] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500">
                <div className="flex flex-wrap  gap-2  justify-around align-middle mb-4 ">
                  {mentor !== undefined &&
                    mentor.skills.map((e, i) => (
                      <div
                        key={i}
                        className="border  border-[#823DA2] rounded-[10px] px-2 py-2 text-sm "
                      >
                        {e}{" "}
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* ques 1 */}
            <div className="mb-10">
              <label
                htmlFor="universityName"
                className="block text-sm font-medium text-white mb-1"
              >
                What is the reason you choose your feild of Interest?
              </label>
              <input
                type="text"
                className="focus:outline-none text-white text-sm rounded-lg block w-full p-8 bg-[#333333] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write Answer between 30 - 50 words"
                name="reason"
                onChange={setData}
                value={input.reason}
              />
            </div>

            {/* ques 2 */}

            <div className="mb-10">
              <label
                htmlFor="universityName"
                className="block text-sm font-medium text-white mb-1"
              >
                What Aspires you to be a teacher?
              </label>
              <input
                type="text"
                className="text-white focus:outline-none text-sm rounded-lg block w-full p-8 bg-[#333333] border border-[#5F6065] placeholder-[#5F6065] focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write Answer between 30 - 50 words"
                name="aspiring"
                onChange={setData}
                value={input.aspiring}
              />
            </div>
          </div>

          {/* //endsection3 */}
        </div>
        <div className="max-w-full text-right">
          <button
            onClick={detailadd}
            className="p-2 mt-5 m-3 border rounded-lg pr-5 pl-5 bg-[#A145CD] "
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default MentorFinal;
