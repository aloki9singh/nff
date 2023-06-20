// Verified by Pradhumn
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function CirProgress() {
  const percentage = 60;

  return (
    <div className=" h-40 mx-auto mb-10 rounded-2xl bg-[#373A41] text-white lg:my-8">
      <div className="flex justify-between w-[90%] mx-auto mt-4 items-center">
        <h1 className="text-xs">Working Progress</h1>
        <h1 className="text-xs flex items-center gap-2">
          Today
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-3 h-3 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </h1>
      </div>
      <div className="w-[90%] mx-auto">
        <div className="w-28 h-28  ml-24 -mb-9">
          <CircularProgressbarWithChildren
            value={80}
            styles={buildStyles({
              pathColor: '#A145CD',
              trailColor: 'gray',
              strokeLinecap: 'round',
            })}
          >
            <CircularProgressbar
              value={percentage}
              text={`${percentage}%`}
              styles={buildStyles({
                pathColor: '#E1348B',
                trailColor: 'transparent',
                strokeLinecap: 'round',
                textColor: '#fff',
                textSize: '20px',
              })}
            />
          </CircularProgressbarWithChildren>
        </div>
        <p className="flex items-center gap-2 text-sm">
          <input className="w-2 h-2 bg-[#E1348B] outline-none rounded-full cursor-default" />
          Done
        </p>
        <p className="flex items-center gap-2 text-sm">
          <input className="w-2 h-2 bg-[#A145CD] outline-none rounded-full cursor-default" />
          Progress
        </p>
      </div>
    </div>
  );
}
