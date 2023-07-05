import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import withAuth from '@/lib/context/mentorcontext';
import MentorSidebar from "@/components/common/sidebar/mentor";
import MentorTopbar from "@/components/common/navbar/mentortopbar";
import MentorChart from "@/components/mentor/other/chart";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function MentorStudent() {
  const [initialcount, setinitialCount] = useState(0);
  const [gap, setGap] = useState(8)
  const [count, setCount] = useState(1)
  // const { data } = useSelector((state) => state.authManagerMentor);
  const [courseData, setCourseData] = useState()

  const chartData = [0, 10, 20, 50, 10, 5, 20, 15, 30, 10, 11, 12];
  const [monthData,setMonthData] = useState([0,0,0,0,0,0,0,0,0,0,0,0])

  let [searchstate, setsearchstate] = useState("");
  const router = useRouter();

  let searchfun = (e) => {
    setsearchstate(e.target.value);
  };

  useEffect(() => {
    fetch("/api/meta/coursedetail")
    .then((response) => response.json())
    .then((data) => { setCourseData(data)})
  }, [])
  const activeTabClass = 'w-10 h-10 bg-[#A145CD] rounded-xl';
  const tabClass = 'w-10 h-10 rounded-xl';
  function getTotalEnrolled() {
    let enrolled = 0
    if (courseData) {
      (courseData.coursedata).forEach((e) => {
        enrolled += e.Enrolled
      })
    }
    return enrolled
  }
  const totalEnrolled = getTotalEnrolled()

  // for getting chartData
    // courseData && courseData.forEach(element => {
    //     const month = new Date(`${element.createdAt.split(" ")[1]} 1, 2022`).getMonth()              
    //     setMonthData([...monthData,monthData[month]+1])
    // });


  function handleClick(e) {
    const totalPage = Math.ceil(courseData.coursedata.length / 8);
    switch (e.currentTarget.getAttribute("name")) {
      case "fwd":
        if (count < totalPage) {
          setCount(count + 1);
          setinitialCount(initialcount + 8);
          setGap(gap + 8);
        }
        break;
  
      case "back":
        if (count > 1) {
          setCount(count - 1);
          setinitialCount(initialcount - 8);
          setGap(gap - 8);
        }
        break;
  
      default:
        const pageNumber = parseInt(e.currentTarget.getAttribute("name"));
        if (pageNumber >= 1 && pageNumber <= totalPage) {
          setCount(pageNumber);
          setinitialCount((pageNumber - 1) * 8);
          setGap(pageNumber * 8);
        }
        break;
    }
  }
  
  return (
    <>
      <div className="h-screen text-base">
        <div className="flex">
          <div className="lg:col-span-1 hidden lg:grid w-[261px]">
            {" "}
            <MentorSidebar pathname={router.pathname} />
          </div>
          <div className="col-span-5 bg-[#2E3036] lg:col-span-4 md:rounded-l-3xl w-full overflow-x-hidden overflow-y-scroll scrollbar-hide text-white rounded-s-lg">
            <MentorTopbar heading={"My Courses"} />
            <hr className="hidden lg:block opacity-50 m-3"></hr>
            {/* Dropdown bar */}
            <div className="flex  gap-5 m-5 md:mt-0 mt-8">
              <div className="md:flex justify-end w-[100%] m-3 space-y-2">
                <div className=" flex justify-end">
                  <button className="bg-[#E1348B] px-4 py-2 rounded-md text-lg flex items-center justify-center">
                    <Link href="/reta/addcourse">
                      <span className="text-2xl mr-2">
                        +
                      </span>
                      Add New Course
                    </Link>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap w-[95%] justify-center rounded-[30px]  md:text-base text-sm mx-auto flex">
              <div className="w-[45%] max-[700px]:w-full h-fit md:text-base text-lg mx-auto  mb-4">
                <div
                  style={{
                    "background-image":
                      "linear-gradient(90deg, #E1348B 0%, #CD8BED 100%)",
                  }}
                  className="w-[95%] h-[20%] rounded-xl md:text-base text-lg mx-auto pb-6">
                  <div className="text-white py-4 px-3 text-lg font-bold">
                    Today 2 new students enrolled in your course.
                  </div>
                  <div className="flex justify-end mx-8">
                    <button className="bg-[#E1348B] px-4 py-2 rounded-md text-sm  flex items-center justify-center">
                      <Link href="student">
                        See Details
                      </Link>
                    </button>
                  </div>
                </div>

                <div className="w-[95%] h-[20%]  md:text-base text-xs flex justify-between mx-auto my-8  mb-4">
                  <div className="w-[44%] h-[95%] text-xs bg-[#373A41] rounded-lg py-2 px-2 flex flex-col justify-around align-center text-center py-2.5">
                    <div className="rounded-full w-[60px] h-[60px]  mx-auto bg-[#E1348B] flex align-center justify-center">
                      <Image
                        src="/pagesgraphics/mentor/profile/degree_icon.svg"
                        width={30}
                        height={30}
                        alt="Enrollments"
                      />
                    </div>
                    <p className="font-semibold text-lg py-1">{totalEnrolled}</p>
                    <p>Total Enrolments</p>
                  </div>
                  <div className="w-[44%] h-[95%] text-xs bg-[#373A41] rounded-lg py-2 px-2 flex flex-col justify-around align-center text-center py-2.5">
                    <div className="rounded-full w-[60px] h-[60px]  mx-auto bg-[#E1348B] flex align-center justify-center">
                      <Image
                        src="/componentsgraphics/common/homepage/activities/Book.svg"
                        width={30}
                        height={30}
                        alt="Courses"
                      />
                    </div>
                    <p className="font-semibold text-lg py-1">{(courseData?.coursedata)?.length}</p>
                    <p>Total Courses</p>
                  </div>
                </div>

                <div className="w-[95%] h-[40%]  md:text-base text-xs flex mx-auto  mb-4">
                  <div className="w-[100%] h-[100%]  bg-[#373A41] rounded-lg py-2 flex flex-col align-center ">
                    <div className="flex items-center justify-between w-[95%] mx-auto text-bold flex">
                      <h1 className="my-2 ">Enrollment Activity</h1>
                      <div className="flex my-2 justify-end">
                        <select className=" text-sm rounded-md focus:outline-none bg-[#373A41] text-white cursor-pointer p-2 my-2">
                          <option selected hidden>
                            Time
                          </option>
                          <option className="cursor-pointer selected">
                            Last Week
                          </option>
                          <option className="cursor-pointer">Last Month</option>
                          <option className="cursor-pointer">
                            Last Quater
                          </option>
                          <option className="cursor-pointer">
                            Last Semister
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="w-full max-h-[217px] py-4 flex justify-center ">
                      <MentorChart data={chartData} />
                    </div>
                  </div>
                </div>
              </div>

              {/* table */}
              <div className="w-[55%] max-[700px]:w-full h-[600px] bg-[#373A41] rounded-[30px] border md:text-base text-xs mx-auto  mb-4">
                <div className="">
                  <table className="w-full  ">
                    <thead className="  items-center  border-b  ">
                      <tr className=" flex font-semibold justify-around p-5 space-x-2">
                        <th className="inline">Course Name</th>
                        <th className="">Enrolled</th>
                        <th className="">Lectures</th>
                        <th className="md:block hidden">Created On</th>
                        <th className="md:block hidden">Level</th>
                      </tr>
                    </thead>
                    <tbody className="flex h-[450px] flex-col items-center mt-4 space-y-6 p-2">
                      {courseData &&
                        courseData.coursedata.slice(initialcount, gap).map((e, i) => (
                          <tr
                            className="flex space-x-4 items-center w-full font-medium text-xs text-center justify-around "
                            key={i}
                          >
                            <td className="flex items-center gap-2">
                              <Image
                                src={e.image}
                                alt="img"
                                height={25}
                                width={25}
                                className="rounded-full h-8  object-contain inline"
                              />
                              Rachit Rajput
                            </td>
                            <td className="">{e.Enrolled}</td>
                            <td className="">{e.Class}</td>
                            <td className="md:block hidden">{e.Active}</td>
                            <td className="md:block hidden">{e.Courses}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                {/* pagination */}
                <div className="w-60 h-10 lg:bottom-0 mx-10 my-5 flex justify-center items-center space-x-4">
                  <button className="w-6 h-5 border flex justify-center items-center" name='back' onClick={handleClick}>
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
                  <button className={count==1 ? activeTabClass : tabClass} name="1" onClick={handleClick}>1</button>
                  <button className={count==2 ? activeTabClass : tabClass} name="2" onClick={handleClick}>2</button>
                  <button className={count==3 ? activeTabClass : tabClass} name="3" onClick={handleClick}>3</button>
                  <button className="w-6 h-5 border flex justify-center items-center" name="fwd" onClick={handleClick}>
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
      </div>
    </>
  );
}
export default withAuth(MentorStudent, '/meta/signup');
