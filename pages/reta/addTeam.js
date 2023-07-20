import React from "react";
import { useState, useEffect } from "react";
import AdminSidebar from "@/components/common/sidebar/admin";
import AdminTopbar from "@/components/common/navbar/admintopbar";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/router";
import Image from "next/image";
import withAdminAuthorization from "@/lib/HOC/withAdminAuthorization";

const Addteam = () => {
  const router = useRouter();
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSidebar, setShowSidebar] = useState(false);

  const [filterMentor, setFilterMentor] = useState();
  function toggleSidebar() {
    setShowSidebar((prevState) => !prevState);
  }
  useEffect(() => {
    if (isMediumScreen) {
      setShowSidebar(false);
    }
  }, [isMediumScreen]);

  const [val, setVal] = useState(["a"]);
  const [hover, setHover] = useState(false);

  const handleAdd = () => {
    const adding = [...val, []];
    setVal(adding);
  };

  return (
    <>
      <div className="h-full text-base bg-[#2E3036]">
        <div className="flex">
          {/* First Sidebar - Visible on Mobile */}
          {isMobileScreen && showSidebar && (
            <div className="fixed right-0 w-[281px] h-screen bg-[#25262C] rounded-l-[40px] z-10">
              <AdminSidebar toggleSideBar={toggleSidebar} />
            </div>
          )}

          {/* Second Sidebar - Visible on Desktop */}
          {!isMobileScreen && (
            <div className="md:block hidden w-[221px] bg-[#141518] z-10">
              <AdminSidebar toggleSideBar={toggleSidebar} />
            </div>
          )}

          <div className="flex-grow ">
            <div className="flex md:pt-0 pt-2 justify-between md:bg-[#2E3036] bg-[#141518] top-0 md:border-b-[1px] border-b-[2px] border-[#717378]">
              <AdminTopbar heading="Add Team" toggleSideBar={toggleSidebar} />
            </div>
            <div className=" flex items-center justify-center">
              <div className="justify-center  rounded-xl bg-[#1E1E1E] w-full">
                <section className="text-white">
                  <div className="container flex flex-col justify-center mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
                    <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                      <Image
                        src="/pagesgraphics/admin/AddTeam/amico.svg"
                        alt=""
                        className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
                        width={600}
                        height={400}
                      />
                    </div>

                    <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                      <h2 className="text-center text-3xl font-semibold">
                        Create A Team
                      </h2>
                      <p className="text-center text-sm m-2">
                        Add admin extended team
                      </p>
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
                            <option value="Student Complain">
                              Student Complain
                            </option>
                            <option value="Mentorkyc">Mentor KYC</option>
                            <option value="ContentRegulation">
                              Content Regulation
                            </option>
                            {/* #E1348B */}
                          </select>
                        </div>

                        {val.map((da, i) => {
                          return (
                            <div className="main_form_container " key={i}>
                              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

                              <h4>Employee</h4>
                              <div>
                                <input
                                  key={`name.${i}`}
                                  type="text"
                                  id={`name-${i}`}
                                  className="d-flex h-9 w-64 sm:w-96 px-5 py-6 items-center gap-16 shrink-0 rounded-xl bg-[#333] my-2"
                                  placeholder="Name"
                                  required
                                />
                                <input
                                  key={`email.${i}`}
                                  type="text"
                                  id={`email-${i}`}
                                  className="d-flex h-9 w-64 sm:w-96 px-5 py-6 items-center gap-16 shrink-0 rounded-xl bg-[#333] my-2"
                                  placeholder="Email"
                                  required
                                />
                                <input
                                  key={`contact.${i}`}
                                  type="text"
                                  id={`contact-${i}`}
                                  className="d-flex h-9 w-64 sm:w-96 px-5 py-6 items-center gap-16 shrink-0 rounded-xl bg-[#333] my-2"
                                  placeholder="Contact No"
                                  required
                                />
                                <input
                                  key={`employee-id.${i}`}
                                  type="text"
                                  id={`employee-id-${i}`}
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
                            className="d-flex w-52 h-8 px-5  gap-3.5 shrink-0 rounded-xl bg-[#fff] text-start text-[#5F6065] text-base font-medium  inline-flex items-center m-2"
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
                        <div className="submit-container text-end  w-full flex items-center justify-center  mr-5 ">
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withAdminAuthorization(Addteam);
