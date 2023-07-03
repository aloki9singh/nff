import Schoolsidebar from '@/components/common/sidebar/school';
import SchoolTopbar from '@/components/common/navbar/schooltopbar';
import { useEffect, useState } from 'react';
import MonthSelector from '../../components/common/calendar/common/monthselector';
import Datelist from '@/components/common/calendar/common/datelist';
import DonutInProfile from '@/components/school/dashboard/circularpfp';
import { callStudentDataApi } from '@/lib/setaapi'; // Import the API function

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
export default function Studentdetails() {
  const tabClass = 'w-10 h-10 rounded-xl';

  const activeTabClass = 'w-10 h-10 bg-[#A145CD] rounded-xl';
  const Leaderboard = [
    //Dummy Data for LeaderBoard
    {
      id: 1,
      rank: '1st',
      image: '',
      name: 'Mehul Jain',
      percentage: 99.2
    },
    {
      id: 2,
      rank: '2nd',
      image: '',
      name: 'Mehul Jain',
      percentage: 98.3
    },
    {
      id: 3,
      rank: '3rd',
      image: '',
      name: 'Mehul Jain',
      percentage: 97.4
    },
    {
      id: 3,
      rank: '3rd',
      image: '',
      name: 'Mehul Jain',
      percentage: 97.4
    },
    {
      id: 3,
      rank: '3rd',
      image: '',
      name: 'Mehul Jain',
      percentage: 97.4
    },
    {
      id: 3,
      rank: '3rd',
      image: '',
      name: 'Mehul Jain',
      percentage: 97.4
    },
    {
      id: 3,
      rank: '3rd',
      image: '',
      name: 'Mehul Jain',
      percentage: 97.4
    },
    {
      id: 3,
      rank: '3rd',
      image: '',
      name: 'Mehul Jain',
      percentage: 97.4
    }
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
  let [monthData, setMonthData] = useState('');
  let selectedDate = M => {
    setdateData(M);
  };
  let selectedMonth = M => {
    setMonthData(M);
  };
  let monthclick = e => {
    let months = document.querySelectorAll('.month');
    selectedMonth(e.target.innerText);
    for (let i = 0; i < months.length; i++) {
      months[i].style = 'opacity:0.6';
    }
    e.target.style = 'opacity:1';
  };
  const classes = [
    {
      id: 1,
      time: '2:30',
      name: 'User Experience Design'
    },
    {
      id: 2,
      time: '4:30',
      name: 'User Experience Design'
    }
  ];

  useEffect(() => {
    let months = document.querySelectorAll('.month');
    for (let i = 0; i < months.length; i++) {
      if (currentMonth == months[i].innerText) months[i].style = 'opacity:1';
    }
  }, [currentMonth]);

  return (
    <div className='flex h-full bg-[#2D2E35]  '>
      <div className='lg:col-span-1 hidden lg:grid'>
        <Schoolsidebar />
      </div>
      <div className='w-full h-fit   bg-[#2D2E35] space-y-4 mt-1 '>
        <SchoolTopbar heading={'School Dashboard'} />
        {/* text */}
        <div className='bg-[#2D2E35] text-white  h-full md:grid grid-cols-2 w-full gap-10     space-y-10  px-5 md:pt-0  pt-20 pb-5'>
          <div className='space-y-10 '>
            <div className='grid grid-cols-2 text-center rounded-2xl bg-[#373A41] p-5 mt-[-30px] md:mt-[0] items-center'>
              <div className='space-y-7'>
                <div className='ml-[-10px]'>Active Learners</div>
                <div>
                  {' '}
                  <div className='text-[#E1348B] text-2xl'>850</div>
                  <div>Out of 1000</div>
                </div>
              </div>
              <div className='flex justify-center'>
                <DonutInProfile />
              </div>
            </div>
            <div>
              {/* <CalenderStudent /> */}
              <div className='bg-darkslategray rounded-2xl bg-[#373A41] p-5  h-[408px] '>
                {/* //datecard */}
                <div className=' flex top-5 flex-col text-xl  md:space-y-2'>
                  {/* <div className="p-2 text-lg  lg:block ml-7">
          
                  <div className="text-sm">
                    <MonthSelector />
                  </div>
                  {/* Date and day */}
                  <Datelist
                    currentDate={currentDate}
                    monthData={monthData}
                    currentMonth={currentMonth}
                    currentYear={currentYear}
                    selectedDate={selectedDate}
                  />

                  <div className=' p-3 w-full shrink-0 text-xl text-gray-200'>
                    <div className=' ml-3 mb-2 '>Upcoming Classes</div>
                    <div className='flex flex-col items-start justify-between text-base text-white overflow-scroll scrollbar-hide '>
                      {classes.length == 0 && (
                        <div className='text-gray-500 text-xs text-center my-10 w-full'>
                          No upcoming classes ☹️
                        </div>
                      )}
                      {classes &&
                        classes.map(item => (
                          <div
                            key={item.id}
                            className='flex flex-row items-start w-full p-2 my-2'>
                            <div className='rounded-md bg-[#E1348B] shrink-0 p-2'>
                              4:30
                            </div>
                            <div className='flex flex-col justify-center ml-2 text-lg'>
                              <div className='text-sm'>{item.name}</div>
                              <p className='text-xs'>Online .Zoom Meeting</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              {/*  */}
            </div>
          </div>
          <div className='bg-[#2D2E35]'>
            <div className=' px-5    rounded-2xl bg-[#373A41] text-white py-5 md:mt-[-40px]'>
              <div className='flex justify-between   pb-4 items-center pt-4'>
                <h1 className='text-l'>Leaderboard</h1>
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

              <div className='space-y-5 pb-7'>
                {Leaderboard &&
                  Leaderboard.map(item => (
                    <div
                      key={item.id}
                      className='text-white flex justify-between my-3  '>
                      <h1 className='m-auto text-sm flex-1 flex justify-center'>
                        {item.rank}
                      </h1>
                      <div className='flex-1 flex justify-center'>
                        <div className='border rounded-full h-10 w-10 flex justify-center'></div>
                      </div>
                      <h1 className='m-auto text-sm flex-[2_2_0%] flex justify-center  text-gray-500'>
                        {item.name}
                      </h1>
                      <h1 className='m-auto text-sm flex-1 flex justify-center'>
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
