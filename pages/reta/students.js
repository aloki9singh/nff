import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/components/common/sidebar/admin";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import AdminTopbar from "@/comp@/lib/hooks/mediaqueryar/admintopbar";

function AdminStudent() {
  const [count, setCount] = useState(1);
  // const { data } = useSelector((state) => state.authManagerMentor);
  const [studentData, setStudentData] = useState();
  const [initialcount, setinitialCount] = useState(0);
  const [gap, setGap] = useState(10);
  const [hide, setHide] = useState(true);
  const [id, setId] = useState();
  const [filterData, setFilterData] = useState();
  let [searchstate, setsearchstate] = useState();
  const router = useRouter();
  let searchfun = (e) => {
    setsearchstate(e.target.value);
  };
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);

  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }

  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }
    setStudentData(
      filterData &&
        filterData.filter((ele) => {
          return ele.displayName.includes(searchstate);
        })
    );
  }, [searchstate, isMediumScreen]);

  const activeTabClass = "w-10 h-10 bg-[#A145CD] rounded-xl";
  const tabClass = "w-10 h-10 rounded-xl";

  useEffect(() => {
    fetch("/api/signup")
      .then((response) => response.json())
      .then((data) => {
        setFilterData(
          data.users.filter((ele) => {
            return ele.role == "student";
          })
        );
        setStudentData(
          data.users.filter((ele) => {
            return ele.role == "student";
          })
        );
      });
  }, []);
  function handleChange(e) {
    e.preventDefault();
    setId(e.target.value);
  }
  function handleSubmit() {
    fetch(`/api/signup/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => alert(data.msg));
  }
  function handleClick(e) {
    const totalPage = Math.ceil(studentData.length / 10);

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
      <div className="h-full text-base bg-[#2E3036] ">
        <div className="flex">
          {/* First Sidebar - Visible on Mobile */}
          {isMobileScreen && (
            <div
              className={`fixed right-0 ${
                SideBarState ? "block" : "hidden"
              } w-[281px] h-screen bg-[#25262C]  rounded-l-[40px] z-10`}
            >
              <Sidebar toggleSideBar={toggleSideBar} />
            </div>
          )}

          {/* Second Sidebar - Visible on Desktop */}
          {!isMobileScreen && (
            <div className={`md:block hidden w-[221px] bg-[#141518]z-10`}>
              <Sidebar toggleSideBar={toggleSideBar} />
            </div>
          )}

          <div className="flex-grow">
            <div className="flex justify-between md:bg-[#2E3036] bg-[#141518] top-0 md:border-b-[1px] border-b-[2px] border-[#717378]">
              <AdminTopbar heading="Review" toggleSideBar={toggleSideBar} />
            </div>

            {/* Dropdown bar */}
            <div className="gap-5 mx-8  max-[700px]:mx-4 md:mt-0 text-white">
              <div className="flex flex-wrap items-center justify-between w-[100%] m-5 space-y-2">
                <div className="md:flex items-center rounded-lg gap-4 justify-around ">
                  <div className="flex  min-w-[200px] space-x-4">
                    <select className="block w-fit p-2  text-sm rounded-md focus:outline-none bg-[#A145CD] text-white cursor-pointer mt-5">
                      <option selected hidden>
                        Select Course
                      </option>
                      <option className="cursor-pointer">Course-1</option>
                      <option className="cursor-pointer">Course-2</option>
                      <option className="cursor-pointer">Course-3</option>
                      <option className="cursor-pointer">Course-4</option>
                    </select>
                  </div>
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
                        placeholder="Search Student..."
                        required
                        value={searchstate}
                        onChange={searchfun}
                      />
                    </div>
                  </form>
                  <button className="bg-[#414348] w-fit h-fit flex px-8 py-2.5 max-[585px]:mx-0 max-[585px]:mr-2 items-center justify-center mx-2 rounded-xl">
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
                  <button
                    className="bg-[#414348] rounded-xl w-fit h-fit flex px-8 py-2.5"
                    onClick={() => setHide(!hide)}
                  >
                    Remove a Student
                  </button>
                  {!hide && (
                    <div className="absolute right-[1%] bg-black p-4 rounded-2xl w-fit top-[18%]">
                      <form className="flex flex-col" onSubmit={handleSubmit}>
                        <input
                          type="text"
                          name="delete"
                          id="delete"
                          className="text-black"
                          value={id}
                          onChange={handleChange}
                          placeholder="Enter the uid of student"
                        />
                        <button
                          className="my-2 bg-[#A145CD] text-white w-fit p-2 mx-auto rounded-lg"
                          type="submit"
                        >
                          Delete student
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>

              {/* <div className="  md:w-5/6 ">
                <BasicDetails />
                   
                <div className="md:flex gap-5">
                  <div className="md:w-1/2">
                    <div>
                      {" "}
                      <LeaderBoardMentor />
                      <div className="bg-[#373A41] rounded-[20px] p-5 px-8 my-5 space-y-2 text-white mt-[-12px]">
                        <div className="py-2 text-center">Homework Status</div>
                        <div className="flex justify-between px-5 py-3 bg-[#2E3036] rounded-[10px]">
                          <div>To be Marked</div>
                          <div className=" border border-[#A145CD] rounded-[5px] px-1">
                            {" "}
                            29
                          </div>{" "}
                        </div>
                        <div className="flex justify-between px-5 py-3 bg-[#2E3036] rounded-[10px]">
                          <div>Marked</div>
                          <div className=" border border-[#A145CD] rounded-[5px] px-1">
                            {" "}
                            2
                          </div>{" "}
                        </div>
                      </div>
                    </div>
                    <div> </div>
                  </div>
                  <div className="md:w-1/2">
                    <div className="bg-[#373A41] rounded-[20px] pt-1">
                      {" "}
                      <CirProgress />
                    </div>
                    <div className="bg-[#373A41] rounded-[20px] mb-10 mt-[-20px] md:mt-0">
                      {" "}
                      <MentorChatWidget />
                    </div>
                  </div>
                </div>
              </div>
              <div className=" md:mt-0 mt-[-20px] ">
                <Calender />
                <div className="bg-[#373A41] rounded-[20px] md:pb-5 mt-[-20px] md:[mt-0] ">
                  <TaskList />
                </div>
              </div> */}
            </div>

            {/* table */}
            <div className="ms-[2%] me-[2%] h-[712px] bg-[#373A41] max-[700px]:mx-4 rounded-[30px] border md:text-base text-xs mx-auto  mb-4 text-white">
              <div className="">
                <table className="w-full  ">
                  <thead className="  items-center  border-b  ">
                    <tr className=" flex font-semibold  justify-around p-5 mx-4">
                      <th className="w-[16.6%]">Student Name</th>
                      <th className="w-[16.6%]">Id</th>
                      <th className="w-[16.6%]">Class</th>
                      <th className="w-[16.6%] md:block hidden">Active</th>
                      <th className="w-[16.6%] md:block hidden">Courses</th>
                      <th className="w-[16.6%]">Action</th>
                    </tr>
                  </thead>
                  <tbody className="flex w-[90%] h-[550px] flex-col mt-2 items-center mx-auto space-y-6">
                    {studentData &&
                      studentData.slice(initialcount, gap).map((e, i) => (
                        <tr
                          className="flex items-center w-full font-medium text-xs justify-around "
                          key={i}
                        >
                          <td className="flex items-center gap-2 w-[16.6%] ">
                            <Image
                              src={
                                e.photoURL
                                  ? e.photoURL
                                  : "/componentsgraphics/common/navbar/schoolprofiletopbar/Male.svg"
                              }
                              alt="img"
                              height={25}
                              width={25}
                              className="rounded-full h-8  object-contain inline"
                            />
                            {e.displayName}
                          </td>
                          <td className="w-[16.6%] ">ID : {e.uid}</td>
                          <td className="w-[16.6%] text-center ">{e?.class}</td>
                          <td className="w-[16.6%] text-center md:block hidden">
                            {e?.active}
                          </td>
                          <td className="w-[16.6%] text-center md:block hidden">
                            {e?.courses}
                          </td>
                          <td className="w-[16.6%] text-right text-[#E1348B] pr-[3%]">
                            <Link href="">View Profile</Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {/* pagination */}
              <div className="w-60 h-10 lg:bottom-0 mx-10 my-5 flex justify-center items-center space-x-4">
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
