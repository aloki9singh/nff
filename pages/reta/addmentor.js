import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AdminSidebar from "@/components/common/sidebar/admin";
import AdminTopbar from "@/components/common/navbar/admintopbar";
import { useRouter } from "next/router";

import { useMediaQuery } from "react-responsive";
import { detailadd, removeDomainFromEmail } from "@/lib/exportablefunctions";
import withAdminAuthorization from "@/lib/HOC/withAdminAuthorization";

function AddMentor() {
  const [count, setCount] = useState(1);
  const [initialCount, setInitialCount] = useState(0);
  const [gap, setGap] = useState(10);
  const [searchState, setSearchState] = useState("");
  const router = useRouter();
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSidebar, setShowSidebar] = useState(false);
  const [mentor, setMentor] = useState([]);
  const [filterMentor, setFilterMentor] = useState();

  const [numberOfPages, setNumberOfPages] = useState();

  function toggleSidebar() {
    setShowSidebar((prevState) => !prevState);
  }

  useEffect(() => {
    if (isMediumScreen) {
      setShowSidebar(false);
    }

    setMentor(
      filterMentor &&
        filterMentor.filter((ele) => {
          return ele.displayName.includes(searchState);
        })
    );
  }, [searchState, isMediumScreen]);

  const handleTabClick = (tab) => {
    setSearchState("");
  };

  useEffect(() => {
    fetch("/api/signup")
      .then((response) => response.json())
      .then((data) => {
        const filteredMentors = data.users.filter((ele) => {
          return ele.role === "mentor" && ele.courseAssigned == false;
        });
        setMentor(filteredMentors);
        setFilterMentor(filteredMentors);
      });
  }, []);

  const activeTabClass = "w-10 h-10 bg-[#A145CD] rounded-xl";
  const tabClass = "w-10 h-10 rounded-xl";

  function handleClick(e) {

    const totalPage = Math.ceil(mentor.length / 10)+1;
    const name = e.currentTarget.getAttribute("name");

    switch (name) {
      case "fwd":
        if (count < totalPage) {
          setCount((prevCount) => prevCount + 1);
          setInitialCount((prevInitialCount) => prevInitialCount + 10);
          setGap((prevGap) => prevGap + 10);
        }
        break;

      case "back":
        if (count > 1) {
          setCount((prevCount) => prevCount - 1);
          setInitialCount((prevInitialCount) => prevInitialCount - 10);
          setGap((prevGap) => prevGap - 10);
        }
        break;

      default:
        const pageNumber = parseInt(name);
        if (pageNumber >= 1 && pageNumber <= totalPage) {
          setCount(pageNumber);
          setInitialCount((pageNumber - 1) * 10);
          setGap(pageNumber * 10);
        }
        break;
    }
  }


  useEffect(()=>{
    const totalPage = Math.ceil(mentor?.length / 1)+1;
    setNumberOfPages(totalPage);
  })

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
              <AdminTopbar heading="Add Mentor" toggleSideBar={toggleSidebar} />
            </div>

            <div className="flex gap-2 mt-20 md:mt-10">
              <div
                className="ml-8 md:ml-12 mt-7 font-semibold text-xl  md:text-4xl text-white cursor-pointer"
                onClick={() => handleTabClick("mentor")}
              >
                Application Pending: ({mentor?.length})
              </div>
            </div>

            {/* filter bar */}
            <div className="gap-5 mx-8 max-[700px]:mx-4 md:mt-0 mt-5 text-white">
              <div className="flex justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between w-[100%] m-5 space-y-2">
                    <div className="flex justify-between">
                      <form className="items-center hidden md:block">
                        <label htmlFor="voice-search" className="sr-only">
                          Search
                        </label>
                        <div className="relative">
                          <div className="flex absolute inset-y-0 right-[10px] items-center pointer-events-none">
                            <svg
                              className="w-5 h-5 text-white dark:text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </div>
                          <input
                            type="text"
                            id="voice-search"
                            className="bg-[#414348] border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-[#414348] dark:border-gray-600 dark:placeholder-white placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search Application"
                            required
                            value={searchState}
                            onChange={(e) => setSearchState(e.target.value)}
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div>
                  <button className="bg-[#414348] w-fit h-fit mt-4 flex px-8 py-2.5 max-[585px]:mx-0 mb-2 max-[585px]:mr-2 items-center justify-center mx-2 rounded-xl mr-14">
                    <span>
                      <Image
                        src="/componentsgraphics/student/courses/list/chartbaricon.svg"
                        width={20}
                        height={20}
                        alt="chart icon"
                        className="ml-1"
                      />
                    </span>
                    Filter
                  </button>
                </div>
              </div>
            </div>

            {/* table */}
            <div className="ms-[2%] me-[2%] h-[712px] max-[700px]:mx-4 rounded-[30px] border md:text-base text-xs mx-auto mb-4 text-white">
              <div className="">
                <table className="w-full">
                  <thead className="items-center border-b">
                    <tr className="flex font-semibold justify-between p-5 mx-4">
                      <th className="">Photo</th>
                      <th className="">Applicant Name</th>
                      <th className="md:block hidden">Contact No.</th>
                      <th className="md:block hidden">Email</th>
                      <th className="">Course</th>
                      <th className="">View Application</th>
                    </tr>
                  </thead>
                  <tbody className="flex w-[95%] h-[550px] flex-col mt-2 items-center mx-auto space-y-6">
                    {mentor &&
                      mentor.slice(initialCount, gap).map((e, i) => (
                        <tr
                          className="flex items-center w-full font-medium text-xs justify-around"
                          key={i}
                        >
                          <td className="flex items-center gap-2 w-[16.6%]">
                            <Image
                              src={
                                e.photoURL
                                  ? e.photoURL
                                  : "/componentsgraphics/common/Anonymousimage/anonymous.png"
                              }
                              alt="img"
                              height={25}
                              width={25}
                              className="rounded-full h-8 w-8 object-cover inline"
                            />
                          </td>
                          <td className="w-[16.6%] text-left">
                            {removeDomainFromEmail(e.displayName)}
                          </td>
                          <td className="w-[16.6%] md:block hidden">
                            {e.details?.pPhone}
                          </td>
                          <td className="w-[16.6%] text-center md:block hidden">
                            {e?.email}
                          </td>
                          <td className="w-[16.6%] text-center ">
                            {e?.details.interest}
                          </td>
                          <td className="w-[16.6%] text-right text-[#E1348B] pr-[3%] cursor-pointer">
                            <div
                              onClick={() =>
                                router.push({
                                  pathname: "/reta/mentordetails",
                                  query: { uid: e.uid },
                                })
                              }
                            >
                              Details
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* pagination */}
              <div className="w-60 h-10 lg:bottom-0 mx-10 my-5 flex overflow-scroll md:overflow-visible items-center space-x-4">
                <button
                  className="w-6 h-5 border flex justify-center items-center"
                  name="back"
                  onClick={handleClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
                    />
                  </svg>
                </button>
                {Array.from({ length: numberOfPages }, (_, index) => (
                  <button
                    className={`${(count == (index + 1)) ? activeTabClass : tabClass} px-4 overflow-sc
                        `}
                    name={index + 1}
                    onClick={handleClick}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  className="w-6 h-5 border flex justify-center items-center"
                  name="fwd"
                  onClick={handleClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAdminAuthorization(AddMentor);
