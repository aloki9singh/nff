import React from "react";
import { useState } from "react";
// import navbar from "@/components/common/navbar/navbar";
// import Navbar from "@/components/common/navbar/navbar";
import NavbarSecond from "@/components/common/navbar/navbar2";

const addTeam = () => {
  // hook for dynamic form
  const [val, setVal] = useState(["a"]);
  const [hover, setHover] = useState(false);

  // handling add employee function
  const handleAdd = () => {
    const adding = [...val, []];
    setVal(adding);
  };

  return (
    <>
      <NavbarSecond />

      <div className="justify-center w-[80%] sm:w-[1350px] min-h-[924px] rounded-xl bg-[#1E1E1E] m-12">
        <section className="text-white">
          <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
            <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
              <img
                src="/pagesgraphics/AddTeam/amico.svg"
                alt=""
                className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
              />
            </div>

            <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
              <h2 className="text-center text-3xl font-semibold">
                Create A Team
              </h2>
              <p className="text-center text-sm m-2">Add admin extented team</p>
              <form action="#">
                {/* dropdown starts here */}

                <div className="text-center">
                  <select
                    id="countries"
                    className="d-flex  w-60 h-14 px-5 py-4 text-center items-start gap-16 shrink-0 rounded-xl bg-[#333]"
                  >
                    <option value="" disabled selected>
                      Team Name
                    </option>
                    <option
                      className="bg-[#E1348B] !hover:bg-[#E1348B] !active:bg-[#E1348B] focus:outline-none focus:ring focus:ring-[#E1348B]"
                      value="Helpdesk"
                    >
                      Helpdesk
                    </option>
                    <option value="Student Complain">Student Complain</option>
                    <option value="Mentorkyc">Mentor KYC</option>
                    <option value="ContentRegulation">
                      Content Regulation
                    </option>
                    {/* #E1348B */}
                  </select>
                </div>
                {/* horizontal line for seperation */}

                {val.map((da, i) => {
                  return (
                    <div className="main_form_container">
                      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

                      <h4>Employee</h4>
                      <div>
                        <input
                          type="text"
                          id="name"
                          className="d-flex h-9 w-64 sm:w-96 px-5 py-6 items-center gap-16 shrink-0 rounded-xl bg-[#333] my-2"
                          placeholder="Name"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          id="email"
                          className="d-flex h-9 w-64 sm:w-96 px-5 py-6 items-center gap-16 shrink-0 rounded-xl bg-[#333] my-2"
                          placeholder="Email"
                          required
                        />
                      </div>

                      <div>
                        <input
                          type="text"
                          id="contact"
                          className="d-flex h-9 w-64 sm:w-96 px-5 py-6 items-center gap-16 shrink-0 rounded-xl bg-[#333] my-2"
                          placeholder="Contact No"
                          required
                        />
                      </div>

                      <div>
                        <input
                          type="text"
                          id="first_name"
                          className="d-flex h-9 w-64 sm:w-96 px-5 py-6 items-center gap-16 shrink-0 rounded-xl bg-[#333] my-2"
                          placeholder="Employee ID"
                          required
                        />
                      </div>
                    </div>
                  );
                })}

                {/* Button for adding another form */}

                <div className="button-container">
                  <button
                    type="button"
                    className="d-flex w-52 h-8 px-5 items-center gap-3.5 shrink-0 rounded-xl bg-[#fff] text-start text-[#5F6065] text-base font-medium  inline-flex items-center m-2"
                    onClick={() => {
                      handleAdd();
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      xmlns="http://www.w3.org/2000/svg"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    >
                      <path d="M11 11v-11h1v11h11v1h-11v11h-1v-11h-11v-1h11z" />
                    </svg>
                    Add Employee
                  </button>

                  <button
                    type="button"
                    className="d-flex w-36 h-8 justify-center items-center gap-2 shrink-0 rounded-xl border border-solid border-white bg-[#A145CD]"
                    onClick={() => {
                      handleAdd();
                    }}
                  >
                    Save
                  </button>
                </div>

                {/* submit Button */}

                <div className="submit-container text-end">
                  <button
                    className="d-flex h-11 px-6 justify-center items-center gap-2 rounded-xl bg-[#E1348B] my-6"
                    type="submit"
                    value="Submit"
                  >
                    Submit{" "}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );

  // some basic change
};

export default addTeam;
