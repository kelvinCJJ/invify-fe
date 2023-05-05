import { Card, colors } from "@mui/material";
import dynamic from 'next/dynamic'
import { Doughnut } from 'react-chartjs-2';
import { mockPieData } from "@/data/mockData";

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

  return (
    <Card>
      <div id="chart">  
        {(typeof window !== 'undefined') &&
          <Chart
            options={pieChartData.options}
            series={pieChartData.series}
            type="bar"
            width="380"
            height="350"
          />
        }
      </div>
    </Card>
  );
}

export default PieChart;