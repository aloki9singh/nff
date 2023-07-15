import React from 'react';
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function StudentProfileCirProgress({ percentage }) {
  return (
    <div className="h-30 mx-auto my-2 rounded-2xl text-white lg:my-8">
      <div className="w-[90%] mx-auto">
        <div className="w-28 h-28 mx-auto -mb-9">
          <CircularProgressbarWithChildren
            value={0}
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
      </div>
    </div>
  );
}
