import { Card } from "@mui/material";
import Chart from 'chart.js/auto';
import React from "react";
import { Line } from "react-chartjs-2";
import { LinearScale } from "chart.js/auto";

Chart.register(
  LinearScale,
)

const LineChart = ({ data1, data2, label1, label2 }) => {
  const data = {
    
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: label1 || "null",
          data: data1 || 0,
          fill: false,
          backgroundColor: "rgb(252, 161, 36)",
          borderColor: "rgba(252, 161, 36, 0.5)",
        },
        {
          label: label2 || "null",
          data: data2 || 0,
          fill: false,
          backgroundColor: "rgb(27, 163, 142)",
          borderColor: "rgba(27, 163, 142,0.5)",
        },
      ],
  };

  const option = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: {
          color: "white",
          }
        },
      },
      layout: {
        padding: 20
    },
    scales: {
      y: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255,255,255,0.2)",
        },
      },
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255,255,255,0.2)",
        },
      },
    }
    };

  return  (
   <Line data={data} options={option} />
  );
};

export default LineChart;
