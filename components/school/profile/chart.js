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

const StudentChart = ({ data }) => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],

      datasets: [
        {
          label: "Students",
          data: data,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: ["#728095", "#A145CD"],
          borderRadius: 10,
        },
      ],
    });
    setChartOptions({
      plugins: {
        legend: {
          position: "top",
          display: false,
          borderRadius: 10,
        },
        // title: {
        //   display: true,
        //   text: "Daily Revenue",
        // },
      },
      maintainAspectRatio: false,
      responsive: true,
      elements: {
        bar: {
          backgroundColor: "#373A41",
          borderRadius: 10,
          borderSkipped: "bottom",
          barThickness: 20,
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
          },
        },
      },
    });
  }, [data]);

  if(!data){
    return <h1 className="text-white">Data absent</h1>
  }

  return (
    <>
     
        <Bar  data={chartData} options={chartOptions} />
    </>
  );
};

export default StudentChart;
