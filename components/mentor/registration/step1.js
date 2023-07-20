// Verified by Pradhumn
import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";

const MentorRegFormStep1 = ({ setRegStepCount, regStepCount }) => {
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
  });

  // const router = useRouter();
  const setData = (e) => {
    const { name, value } = e.target;
    setInput((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };
  const addInputData = async (e) => {
    if (
      input.firstname == "" ||
      input.email == "" ||
      input.pPhone == "" ||
      input.city == "" ||
      input.country == "" ||
      input.address == ""
    ) {
      alert("Field Empty");
    } else {
      e.preventDefault();

      const selectedDate = new Date(input.dob);
      const currentDate = new Date();
      const diffYears = Math.floor(
        (currentDate - selectedDate) / (1000 * 60 * 60 * 24 * 365)
      );
      // console.log(diffYears);
      if (diffYears < 15) {
        alert("Invalid date of birth.");
        return;
      }

      localStorage.setItem("userdata", JSON.stringify(input));

      // router.push("/MentorStep2");
      setRegStepCount(2);
    }
  };
  return (
    <>
      <div className="text-white md:m-10 rounded-[25px] p-10 bg-[#222222] ">
        <div className="">
          <div className=" flex justify-between text-xl md:mx-10 ">
            <div>
              <h6 className="text-3xl font-bold mb-5 text-[#E1348B]">
                Registration Form
              </h6>
              <p className="text-xs w-[80%] text-[#FFFFFF82]">
                Fill out this form with correct information to proceed forward.
                After submission it takes 1-2 weeks to review your application.
                If you have any query reach out to us at (add email).
              </p>
            </div>{" "}
            <div className=" text-pink-500 mt-3 hidden md:block text-[#E1348B]">
              Step1
            </div>
          </div>
          <hr className="mt-6 border-b-1 border-blueGray-300 mb-5 md:mx-10" />
        </div>
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
                className=" input rounded   focus:border-transparent focus:outline-none text-sm p-2 my-2 w-[100%] bg-[#333333] "
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
                className="input rounded   focus:border-transparent focus:outline-none text-sm p-2 my-2 w-[100%]  bg-[#333333] "
              />
            </div>
          </div>
          {/* 1 */}
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
                className="input rounded   focus:border-transparent focus:outline-none text-sm p-2 my-2 w-[100%] bg-[#333333] "
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
                maxLength={10}
                placeholder="Type here"
                className="input rounded   focus:border-transparent focus:outline-none text-sm p-2 my-2 w-[100%]  bg-[#333333] "
              />
            </div>
          </div>
          {/* //2 */}
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
                className="input rounded   focus:border-transparent focus:outline-none text-sm p-2 my-2 w-[100%] bg-[#333333] "
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
                maxLength={10}
                type="tel"
                placeholder="Type here"
                className="input rounded   focus:border-transparent focus:outline-none text-sm p-2 my-2 w-[100%]  bg-[#333333] "
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
                  className="input rounded   focus:border-transparent focus:outline-none text-sm p-2 my-2 w-[100%] bg-[#333333] "
                />
              </div>
            </div>
            <div className=" grid max-w-full md:max-w-4xl mt-5 justify-between md:grid-cols-2 gap-5">
              <div className="md:flex ">
                <label htmlFor="" className=" text-sm font-md mr-10 md: mt-3">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  onChange={setData}
                  value={input.city}
                  placeholder="Enter City"
                  className="input rounded   focus:border-transparent focus:outline-none text-sm p-2 my-2 w-[100%] bg-[#333333] "
                ></input>
                {/* <select
                  type="text"
                  name="city"
                  onChange={setData}
                  value={input.city}
                  className="input rounded   focus:border-transparent focus:outline-none text-sm p-2 my-2 w-[100%] bg-[#333333] "
                >
                  <option value="">Select City</option>
                  <option value="Jaipur">Jaipur</option>
                  <option value="Ajmer">Ajmer</option>
                  <option value="Behror">Behror</option>
                  <option value="Udaipur">Udaipur</option>
                  <option value="Ajmer">Ajmer</option>
                  <option value="Jaipur">Jaipur</option>
                </select> */}
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
                  maxLength={8}
                  placeholder="Enter Area code"
                  className="input rounded   focus:border-transparent focus:outline-none text-sm p-2 my-2 w-[100%]  bg-[#333333] "
                />
              </div>
            </div>
            <div className=" grid max-w-full md:max-w-4xl mt-5 justify-between md:grid-cols-2 gap-5">
              <div className="md:flex ">
                <label htmlFor="" className=" text-sm font-md mr-10 md: mt-3">
                  Select Country
                </label>
                <input
                  name="country"
                  onChange={setData}
                  value={input.country}
                  type="text"
                  placeholder="Enter Country"
                  className="input rounded   focus:border-transparent focus:outline-none text-sm p-2 md:my-2 w-[100%] bg-[#333333] "
                ></input>
                {/* <select
                  name="country"
                  onChange={setData}
                  value={input.country}
                  type="text"
                  className="input rounded   focus:border-transparent focus:outline-none text-sm p-2 md:my-2 w-[100%] bg-[#333333] "
                >
                  <option value="">Select Country</option>
                  <option value="India">India</option>
                  <option value="India">India</option>
                  <option value="India">India</option>
                  <option value="India">India</option>
                  <option value="India">India</option>
                  <option value="India">India</option>
                </select> */}
              </div>
            </div>
          </div>
        </form>
        <div className="max-w-full text-right">
          <button
            onClick={addInputData}
            className="p-2 mt-5 m-3 border rounded-lg pr-5 pl-5 bg-[#A145CD] "
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default MentorRegFormStep1;
