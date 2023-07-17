import { colors } from "@mui/material";
import { Doughnut } from "react-chartjs-2";

const DonutChart = ({ currentData }) => {
  const data = {
    labels: currentData.labelData,
    datasets: [
      {
        label: "My First Dataset",
        data: currentData.seriesData,
        backgroundColor: [
          "rgb(252, 161, 36)",
          "rgb(27, 163, 142)",
          "rgb(220, 61, 94)",
          "rgb(0, 123, 255)",
          "rgb(40, 167, 69)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const option = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
        align: "start",
        labels: {
        color: colors.common.white,
        }
      },
    },
    layout: {
      padding: 20
  }
  };

  return <Doughnut data={data} options={option} />;
};

export default DonutChart;
