import Schoolsidebar from "@/components/common/sidebar/school";
import SchoolTopbar from "@/components/common/navbar/schooltopbar";
import { useEffect, useState } from "react";
import MonthSelector from "../../components/common/calendar/common/monthselector";
import Datelist from "@/components/common/calendar/common/datelist";
import DonutInProfile from "@/components/school/dashboard/circularpfp";
import { callStudentDataApi } from "@/lib/setaapi"; // Import the API function
import Calendar from "@/components/common/calendar/school/calendar";
import { useMediaQuery } from "react-responsive";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export default function Studentdetails() {
  const tabClass = "w-10 h-10 rounded-xl";
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);
  const activeTabClass = "w-10 h-10 bg-[#A145CD] rounded-xl";
  const Leaderboard = [
    //Dummy Data for LeaderBoard
    {
      id: 1,
      rank: "1st",
      image: "",
      name: "Mehul Jain",
      percentage: 99.2,
    },
    {
      id: 2,
      rank: "2nd",
      image: "",
      name: "Mehul Jain",
      percentage: 98.3,
    },
    {
      id: 3,
      rank: "3rd",
      image: "",
      name: "Mehul Jain",
      percentage: 97.4,
    },
    {
      id: 3,
      rank: "3rd",
      image: "",
      name: "Mehul Jain",
      percentage: 97.4,
    },
    {
      id: 3,
      rank: "3rd",
      image: "",
      name: "Mehul Jain",
      percentage: 97.4,
    },
    {
      id: 3,
      rank: "3rd",
      image: "",
      name: "Mehul Jain",
      percentage: 97.4,
    },
    {
      id: 3,
      rank: "3rd",
      image: "",
      name: "Mehul Jain",
      percentage: 97.4,
    },
    {
      id: 3,
      rank: "3rd",
      image: "",
      name: "Mehul Jain",
      percentage: 97.4,
    },
  ];

  const [students, setStudents] = useState([]); // State to hold the fetched student data
  const [currentDate, setCurrentDate] = useState(new Date());

  const [currentMonth, setCurrentMonth] = useState(
    months[currentDate.getMonth()]
  );
  let [dateData, setdateData] = useState(currentDate.getDate());
  const [currentYear, setCurrentYear] = useState(
    currentDate.getFullYear().toString()
  );
  let [monthData, setMonthData] = useState("");
  let selectedDate = (M) => {
    setdateData(M);
  };
  let selectedMonth = (M) => {
    setMonthData(M);
  };
  let monthclick = (e) => {
    let months = document.querySelectorAll(".month");
    selectedMonth(e.target.innerText);
    for (let i = 0; i < months.length; i++) {
      months[i].style = "opacity:0.6";
    }
    e.target.style = "opacity:1";
  };
  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }
  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }
  }, [isMediumScreen]);
  const classes = [
    {
      id: 1,
      time: "2:30",
      name: "User Experience Design",
    },
    {
      id: 2,
      time: "4:30",
      name: "User Experience Design",
    },
  ];

  useEffect(() => {
    let months = document.querySelectorAll(".month");
    for (let i = 0; i < months.length; i++) {
      if (currentMonth == months[i].innerText) months[i].style = "opacity:1";
    }
  }, [currentMonth]);

  return (
    <div className="flex h-screen">
      {isMobileScreen && (
        <div
          className={`fixed right-0 ${SideBarState ? "block" : "hidden"
            } w-[281px] h-screen bg-[#25262C]  rounded-l-[40px] z-10`}
        >
          <Schoolsidebar toggleSideBar={toggleSideBar} />
        </div>
      )}

      {/* Second Sidebar - Visible on Desktop */}
      {!isMobileScreen && (
        <div className={`md:block  hidden w-[221px] bg-[#141518] z-10`}>
          <Schoolsidebar toggleSideBar={toggleSideBar} />
        </div>
      )}
      <div className="flex-grow bg-[#2E3036] h-screen">
        <div className="md:bg-[#2E3036] bg-[#141518] top-0 md:border-b-[1px] border-b-[2px] border-[#717378]">
          <SchoolTopbar heading="Dashboard" toggleSideBar={toggleSideBar} />
        </div>
        <hr className="hidden lg:block opacity-50"/>
        {/* text */}
        <div className="bg-[#2D2E35] my-4 text-white md:grid grid-cols-2 w-full gap-10 space-y-10  px-5 md:pt-0  pt-20 pb-5">
          <div className="space-y-10">
            <div className="grid grid-cols-2 text-center rounded-2xl bg-[#373A41] mt-[-30px] md:mt-[0] p-12 px-16 items-center h-[240px]">
              <div className="space-y-3 w-fit mx-auto">
                <div className="text-3xl">Active Learners</div>
                <div>
                  {" "}
                  <div className="text-[#E1348B] text-2xl">850</div>
                  <div>Out of 1000</div>
                </div>
              </div>
              <div className="mx-auto">
                <DonutInProfile />
              </div>
            </div>
            <div className="">

              <Calendar />

            </div>
          </div>
          <div className="bg-[#2D2E35]">
            <div className=" px-5    rounded-2xl bg-[#373A41] text-white py-5 md:mt-[-40px]">
              <div className="flex justify-between   pb-4 items-center pt-4">
                <h1 className="text-l">Leaderboard</h1>
              </div>
              {/*               //api called function in this code apply after getting data of dashboard in database 
              <div className="space-y-5 pb-7">
                {students.map((item) => (
                  <div key={item.id} className="text-white flex justify-between my-3">
                    <h1 className="m-auto text-sm flex-1 flex justify-center">{item.rank}</h1>
                    <div className="flex-1 flex justify-center">
                      <div className="border rounded-full h-10 w-10 flex justify-center">
                        <img src={item.image} alt="Student" />
                      </div>
                    </div>
                    <h1 className="m-auto text-sm flex-[2_2_0%] flex justify-center text-gray-500">
                      {item.name}
                    </h1>
                    <h1 className="m-auto text-sm flex-1 flex justify-center">{item.percentage}</h1>
                  </div>
                ))}
              </div> */}

              <div className="space-y-5 pb-7">
                {Leaderboard &&
                  Leaderboard.map((item) => (
                    <div
                      key={item.id}
                      className="text-white flex justify-between my-3  "
                    >
                      <h1 className="m-auto text-sm flex-1 flex justify-center">
                        {item.rank}
                      </h1>
                      <div className="flex-1 flex justify-center">
                        <div className="border rounded-full h-10 w-10 flex justify-center"></div>
                      </div>
                      <h1 className="m-auto text-sm flex-[2_2_0%] flex justify-center  text-gray-500">
                        {item.name}
                      </h1>
                      <h1 className="m-auto text-sm flex-1 flex justify-center">
                        {item.percentage}
                      </h1>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
