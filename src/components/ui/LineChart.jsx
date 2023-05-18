
import { Card } from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
//generate line chart with chart.js
const LineChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const options = {
    Responsive: true,
    scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            display: false
          }
        },
        y: {
          grid: {
            display: false
          },
          ticks: {
            display: false
          }
        }
      }
  };

  return (
    <Card>
      <div id="chart">
        <Line data={data} options={options} />
      </div>
    </Card>
  );
}

export default LineChart;