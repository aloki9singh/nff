import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AdminSidebar from "@/components/common/sidebar/admin";
import AdminTopbar from "@/components/common/navbar/admintopbar";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { detailadd, removeDomainFromEmail } from "@/lib/exportablefunctions";

function AdminStudent() {
  const [count, setCount] = useState(1);
  const [initialcount, setinitialCount] = useState(0);
  const [gap, setGap] = useState(10);
  const [hide, setHide] = useState(true);
  const [id, setId] = useState();
  const [filterStudent, setFilterStudent] = useState();
  const [filterMentor, setFilterMentor] = useState();
  let [searchstate, setsearchstate] = useState();
  const router = useRouter();
  let searchfun = (e) => {
    setsearchstate(e.target.value);
  };
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);
  const [activeTab, setActiveTab] = useState("mentor");
  const [student, setStudent] = useState([]);
  const [mentor, setMentor] = useState([]);

  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }

  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }
    setStudent(
      filterStudent &&
        filterStudent.filter((ele) => {
          return ele.displayName.includes(searchstate);
        })
    );
    setMentor(
      filterMentor &&
        filterMentor.filter((ele) => {
          return ele.displayName.includes(searchstate);
        })
    );
  }, [searchstate, isMediumScreen]);

  const handleTabClick = (tab) => {
    setsearchstate("");
    setActiveTab(tab);
  };

  useEffect(() => {
    fetch("/api/signup")
      .then((response) => response.json())
      .then((data) => {
        setFilterStudent(
          data.users.filter((ele) => {
            return ele.role == "student";
          })
        );
        setStudent(
          data.users.filter((ele) => {
            return ele.role == "student";
          })
        );
        setMentor(
          data.users.filter((ele) => {
            return ele.role == "mentor";
          })
        );
        setFilterMentor(
          data.users.filter((ele) => {
            return ele.role == "mentor";
          })
        );
      });
  }, []);
  const activeTabClass = "w-10 h-10 bg-[#A145CD] rounded-xl";
  const tabClass = "w-10 h-10 rounded-xl";

  function handleClick(e) {
    switch (e.currentTarget.getAttribute("name")) {
      case "fwd":
        if (count < totalPage) {
          setCount(count + 1);
          setinitialCount(initialcount + 10);
          setGap(gap + 10);
        }
        break;

      case "back":
        if (count > 1) {
          setCount(count - 1);
          setinitialCount(initialcount - 10);
          setGap(gap - 10);
        }
        break;

      default:
        const pageNumber = parseInt(e.currentTarget.getAttribute("name"));
        if (pageNumber >= 1 && pageNumber <= totalPage) {
          setCount(pageNumber);
          setinitialCount((pageNumber - 1) * 10);
          setGap(pageNumber * 10);
        }
        break;
    }
  }
  return (
    <>
      <div className="h-full text-base bg-[#2E3036]  ">
        <div className="flex">
          {/* First Sidebar - Visible on Mobile */}
          {isMobileScreen && (
            <div
              className={`fixed right-0 ${
                SideBarState ? "block" : "hidden"
              } w-[281px] h-screen bg-[#25262C]  rounded-l-[40px] z-10`}
            >
              <AdminSidebar toggleSideBar={toggleSideBar} />
            </div>
          )}

          {/* Second Sidebar - Visible on Desktop */}
          {!isMobileScreen && (
            <div className={`md:block hidden w-[221px] bg-[#141518] z-10`}>
              <AdminSidebar toggleSideBar={toggleSideBar} />
            </div>
          )}

          <div className="flex-grow ">
            <div className="flex md:pt-0 pt-2 justify-between md:bg-[#2E3036] bg-[#141518] top-0 md:border-b-[1px] border-b-[2px] border-[#717378]">
              <AdminTopbar heading="Review" toggleSideBar={toggleSideBar} />
            </div>

            <div className="flex gap-2 mt-10">
              <div
                className={`ml-8 md:ml-12 mt-7 font-semibold text-xl md:text-4xl text-white ${
                  activeTab === "mentor" ? "cursor-pointer underline" : ""
                }`}
                onClick={() => handleTabClick("mentor")}
              >
                Mentor : {mentor?.length}
              </div>

              <span className="ml-8 md:ml-12 mt-7 font-semibold text-xl md:text-4xl text-white">
                /
              </span>

              <div
                className={`ml-8 md:ml-10 mt-7 font-semibold text-xl md:text-4xl text-white ${
                  activeTab === "student" ? "cursor-pointer underline" : ""
                }`}
                onClick={() => handleTabClick("student")}
              >
                Student : {student?.length}
              </div>
            </div>

            {/* filter bar */}

            <div className="gap-5  mx-8 max-[700px]:mx-4 md:mt-0 mt-5 text-white">
              {activeTab == "mentor" && (
                <div className=" flex   justify-between">
                  <div>
                    <div className="flex flex-wrap items-center justify-between w-[100%] m-5 space-y-2">
                      <div className="flex justify-between">
                        <form className=" items-center hidden md:block ">
                          <label htmlFor="voice-search" className="sr-only">
                            Search
                          </label>
                          <div className="relative">
                            <div className="flex absolute  inset-y-0 right-[10px]  items-center pointer-events-none">
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
                              className="bg-[#414348]  border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-[#414348] dark:border-gray-600 dark:placeholder-white placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Search Mentor "
                              required
                              value={searchstate}
                              onChange={searchfun}
                            />
                          </div>
                        </form>
                        <Link href={"/reta/addmentor"}>
                          <button className=" w-fit h-fit flex px-8 py-2.5  max-[585px]:mx-0 max-[585px]:mr-2 items-center justify-center mx-2 rounded-xl mr-14 bg-[#E1348B]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-4 h-4 text-white mr-1"
                            >
                              <path d="M12 5v14M5 12h14" />
                            </svg>
                            Add Mentor
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* {/student/} */}
                  <div>
                    <button className="bg-[#414348] w-fit h-fit mt-4 flex px-8 py-2.5 max-[585px]:mx-0 max-[585px]:mr-2 items-center justify-center mx-2 rounded-xl mr-14">
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
              )}

              {activeTab === "student" && (
                <div className="gap-5  mx-8 max-[700px]:mx-4 md:mt-0  mt-5 text-white">
                  <div className="flex flex-wrap items-center justify-between w-[100%] m-5 space-y-2">
                    <div className="md:flex items-center rounded-lg gap-4 justify-around ">
                      Total student : {student?.length}
                    </div>
                    <div className="flex justify-between">
                      <form className=" items-center hidden md:block ">
                        <label htmlFor="voice-search" className="sr-only">
                          Search
                        </label>
                        <div className="relative">
                          <div className="flex absolute inset-y-0 right-[10px]  items-center pointer-events-none">
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
                            className="bg-[#414348]  border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-[#414348] dark:border-gray-600 dark:placeholder-white placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search student"
                            required
                            value={searchstate}
                            onChange={searchfun}
                          />
                        </div>
                      </form>
                      <button className="bg-[#414348] w-fit h-fit flex px-8 py-2.5 max-[585px]:mx-0 max-[585px]:mr-2 items-center justify-center mx-2 rounded-xl mr-14">
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
              )}
            </div>

            {/* table */}

            <div className=" ms-[2%] me-[2%] h-[712px]  max-[700px]:mx-4 rounded-[30px] border md:text-base text-xs mx-auto mb-4 text-white">
              <div className="">
                <table className="w-full ">
                  <thead className="items-center  border-b  ">
                    <tr className="flex font-semibold  justify-between   p-5 mx-4">
                      <th className="">Photo</th>
                      {activeTab === "student" && (
                        <>
                          <th className="md:block hidden">Student Name</th>
                          <th className="md:hidden block"> Name</th>
                          <th className="md:block hidden">ID</th>
                          <th className="">Class</th>
                          <th className="hidden md:table-cell">Group</th>
                          <th className="">Status</th>
                          <th className="md:pl-10">Profile</th>
                        </>
                      )}
                      {activeTab === "mentor" && (
                        <>
                          <th className="md:block hidden">Mentor Name</th>
                          <th className="md:hidden block"> Name</th>
                          <th className="md:block hidden">ID</th>
                          <th className="">Subject</th>
                          <th className="hidden md:table-cell">Email</th>
                          <th className="">Status</th>
                          <th className="md:w-[16.6%] md:pl-10 ">Profile</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody className="flex w-[95%] h-[550px] flex-col mt-2 items-center mx-auto space-y-6">
                    {activeTab === "student" &&
                      student &&
                      student.slice(initialcount, gap).map((e, i) => (
                        <tr className="flex items-center w-full font-medium text-xs justify-between ">
                          <td className="flex items-center gap-2 w-[16.6%] ">
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
                            {console.log(e)}
                          </td>
                          <td className="w-[16.6%] ">
                            {removeDomainFromEmail(e.displayName)}
                          </td>
                          <td className="w-[16.6%] md:block hidden">
                            {" "}
                            {e.uid.slice(0, 5)}
                          </td>
                          <td className="w-[16.6%] text-center ">{e?.class}</td>
                          <td className="w-[16.6%] text-center md:block hidden">
                            {e?.courses || "No Group"}
                          </td>
                          <td className="w-[16.6%] text-center cursor-pointer">
                            {!e.active ? (
                              <p
                                className="text-red-500 "
                                onClick={async () => {
                                  const value = await detailadd(e.uid, {
                                    active: true,
                                  });
                                  // console.log(value);
                                }}
                              >
                                InActive
                              </p>
                            ) : (
                              <p
                                className="text-green-500  "
                                onClick={async () => {
                                  const value = await detailadd(e.uid, {
                                    active: false,
                                  });
                                  // console.log(value);
                                }}
                              >
                                Active
                              </p>
                            )}
                          </td>

                          <td className="w-[16.6%] text-right text-[#E1348B] pr-[3%] cursor-pointer ">
                            <Link href="">View Profile</Link>
                          </td>
                        </tr>
                      ))}
                    {activeTab === "mentor" &&
                      mentor &&
                      mentor.slice(initialcount, gap).map((e, i) => (
                        <tr
                          className="flex items-center w-full font-medium text-xs justify-around "
                          key={i}
                        >
                          <td className="flex items-center gap-2 w-[16.6%] ">
                            <Image
                              src={
                                e.photoURL
                                  ? e.photoURL
                                  : "/componentsgraphics/common/Anonymousimage/anonymous.png"
                              }
                              alt="img"
                              height={25}
                              width={25}
                              className="rounded-full h-8 w-8  object-cover inline"
                            />
                          </td>
                          <td className="w-[16.6%] text-left ">
                            {removeDomainFromEmail(e.displayName)}
                          </td>
                          <td className="w-[16.6%] md:block hidden ">
                            {e.uid.slice(0, 5)}
                          </td>
                          <td className="w-[16.6%] text-center ">
                            {e.assignedCourses
                              ? e.assignedCourses[0]
                              : "Not Assigned"}
                          </td>
                          <td className="w-[16.6%] text-center  md:block hidden ">
                            {e?.email}
                          </td>
                          <td className="w-[16.6%] text-center cursor-pointer ">
                            {!e.active ? (
                              <p
                                className="text-red-500 "
                                onClick={async () => {
                                  const value = await detailadd(e.uid, {
                                    active: true,
                                  });
                                  // console.log(value);
                                }}
                              >
                                InActive
                              </p>
                            ) : (
                              <p
                                className="text-green-500  "
                                onClick={async () => {
                                  const value = await detailadd(e.uid, {
                                    active: false,
                                  });
                                  // console.log(value);
                                }}
                              >
                                Active
                              </p>
                            )}
                          </td>

                          <td className="w-[16.6%] text-right text-[#E1348B] pr-[3%]   cursor-pointer">
                            <Link href="">View Profile</Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* pagination */}
              <div className="w-60 h-10  lg:bottom-0 mx-10 my-5 flex justify-center  items-center space-x-4">
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
                <button
                  className={count == 1 ? activeTabClass : tabClass}
                  name="1"
                  onClick={handleClick}
                >
                  1
                </button>
                <button
                  className={count == 2 ? activeTabClass : tabClass}
                  name="2"
                  onClick={handleClick}
                >
                  2
                </button>
                <button
                  className={count == 3 ? activeTabClass : tabClass}
                  name="3"
                  onClick={handleClick}
                >
                  3
                </button>
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
        <div className=" ">{/* <MobileNav></MobileNav> */}</div>
      </div>
    </>
  );
}
export default AdminStudent;
