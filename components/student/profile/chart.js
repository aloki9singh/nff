// Verified by Pradhumn
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend
);

const StudentProfileChart = ({ data }) => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  // useEffect(() => {
  //   setChartData({
  //     labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],

  //     datasets: [
  //       {
  //         label: "Students",
  //         data: data,
  //         borderColor: "rgb(53, 162, 235)",
  //         backgroundColor: ["#728095", "#A145CD"],
  //       },
  //     ],
  //   });
  //   setChartOptions({
  //     plugins: {
  //       legend: {
  //         position: "top",
  //         display: false,
  //       },
  //       // title: {
  //       //   display: true,
  //       //   text: "Daily Revenue",
  //       // },
  //     },
  //     maintainAspectRatio: false,
  //     responsive: true,
  //     elements: {
  //       bar: {
  //         backgroundColor: "#373A41",
  //         // borderRadius: 10,
  //         // borderSkipped: "bottom",
  //         // barThickness: 20,
  //       },
  //     },
  //     scales: {
  //       x: {
  //         grid: {
  //           color: "",
  //         },
  //         ticks: {
  //           color: "white",
  //         },
  //       },
  //       y: {
  //         grid: {
  //           color: "",
  //         },
  //         ticks: {
  //           color: "white",
  //         },
  //       },
  //     },
  //   });
  // }, [data]);
  useEffect(() => {
    const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayData = data.map((hours, index) => {
      if (index >= 1 && index <= 3) {
        // Apply the logic for Mon, Tue, Wed
        return hours; // Subtract 2 hours from the original data
      }
      return hours; // Keep the original data for other days
    });
  
    setChartData({
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      datasets: [
        {
          label: "Students",
          data: dayData,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: ["#728095", "#A145CD"],
        },
      ],
    });
  
    setChartOptions({
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
          ticks: {
            color: "white",
            callback: (value) => `${value}h`, // Add 'h' to the y-axis labels
          },
        },
      },
    });
  }, [data]);
  
  if (!data) {
    return <h1 className="text-white">Data absent</h1>;
  }

  return (
    <>
      <div className=" md:h-[204px] md:col-span-2 p-3 rounded-[20px] m-auto bg-[#373A41] ">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default StudentProfileChart;
