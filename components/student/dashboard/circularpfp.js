import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularProgressBar = ({ value, maxValue, color }) => {
  const percentage = (value / maxValue) * 100;

  return (
    <div style={{ width: "100px", height: "100px" }}>
      <CircularProgressbar
        value={percentage}
        text={`${(value/maxValue)*100}%`}
        strokeWidth={15}
        styles={buildStyles({
          pathColor: color,
          textColor: color,
          trailColor: "#eee",
          
        })}
      />
    </div>
  );
};

const DonutInProfile = () => {
  return (
    <div>
      <CircularProgressBar value={850} maxValue={1000} color="#E1348B" />
    </div>
  );
};

export default DonutInProfile;
