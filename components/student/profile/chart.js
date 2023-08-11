import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { getActivityLogsForUser } from "@/lib/exportablefunctions";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,
} from "chart.js";

import { useAuthContext } from "@/lib/context/AuthContext";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend
);


const StudentProfileChart = () => {
  const [chartData, setChartData] = useState({
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Students",
        data: [0, 0, 0, 0, 0, 0, 0],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: ["#728095", "#A145CD"],
      },
    ],
  });
  const maxActivityValue = Math.max(...chartData.datasets[0].data);
const minActivityValue = Math.min(...chartData.datasets[0].data);
const range = maxActivityValue - minActivityValue;
let stepSize;

if (range <= 1 && maxActivityValue > 0) {
  if (maxActivityValue < 0.1) {
    stepSize = 0.01;
  } else if (maxActivityValue < 0.5) {
    stepSize = 0.1;
  } else {
    stepSize = 1;
  }
} else {
  stepSize = 1;
}

  const [chartOptions, setChartOptions] = useState({
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    elements: {
      bar: {
        backgroundColor: "#373A41",
      },
    },
    scales: {
      x: {
        grid: {
          color: "",
        },
        ticks: {
          color: "white",
        },
      },
      y: {
        grid: {
          color: "",
        },
        callback: (value) => {
          if (value < 1) {
            const minutes = Math.round(value * 60);
            return `${minutes}m`;
          } else {
            return `${value}h`;
          }
        },
      },
  
      stepSize: stepSize,
      

    },
  });
  const { user } = useAuthContext();
  useEffect(() => {
    if (!user) {
      return;
    }
    getActivityLogsForUser(user?.uid)
      .then((activityLogsData) => {
        if (activityLogsData) {
          const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          const dayData = dayLabels.map((day) => {
            const desiredDate = new Date();
            desiredDate.setHours(0, 0, 0, 0);
            const dayOffset = dayLabels.indexOf(day);
            desiredDate.setDate(
              desiredDate.getDate() - desiredDate.getDay() + dayOffset
            );

            const desiredDateString = desiredDate.toLocaleDateString();
            const activityValueMilliseconds =
              activityLogsData[desiredDateString] || 0;
            const activityValueHours = activityValueMilliseconds / 3600000;
            return activityValueHours;
          });

          setChartData((prevChartData) => ({
            ...prevChartData,
            datasets: [
              {
                ...prevChartData.datasets[0],
                data: dayData,
              },
            ],
          }));
        } else {
          console.error("Error fetching user activity data");
        }
      })
      .catch((error) => {
        console.error("Error fetching user activity data:", error);
      });
  }, [user]);

  return (
    <>
      <div className="md:h-[204px] md:col-span-2 p-3 rounded-[20px] m-auto bg-[#373A41]">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default StudentProfileChart;