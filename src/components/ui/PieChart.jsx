import { Card, colors } from "@mui/material";
import dynamic from 'next/dynamic'
import Chart from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { mockPieData } from "@/data/mockData";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

const PieChart = () => {
  //apex chart pie chart
  const pieChartData = {
    // chart: {
    //   type: 'bar'
    // },  
    series: [{
      name: 'sales',
      data: [30, 40, 45, 50, 49, 60, 70, 91, 125]
    }],
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    }
  };

  const data = {
    options: {
      height: 150,
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Doughnut Chart'
        }
      }
    },
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

  return (
    <Card>
      <div id="chart">  
        <Doughnut data={data} />
      </div>
    </Card>
  );
}

export default PieChart;