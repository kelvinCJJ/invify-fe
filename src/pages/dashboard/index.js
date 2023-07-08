import TopCard from "@/components/ui/TopCard";
import Layout from "@/components/Layout";
import React, { useEffect } from "react";
import Card from "@/components/ui/Card";
import { AttachMoney, Paid, Sell, Shop, Shop2 } from "@mui/icons-material";
import axios, { all } from "axios";
import SortableTable from "@/components/ui/SortableTable";
import PieChart from "@/components/ui/PieChart";
import { Typography } from "@mui/material";
import LineChart from "@/components/ui/LineChart";
import DateRangePicker from "@/components/ui/DateRangePicker";


const Dashboard = () => {
  console.log("dashboard");
  const [loading, setLoading] = React.useState(false);
  const [totalRevenueCurrentYear, setTotalRevenueCurrentYear] = React.useState(0);
  const [totalRevenueLastWeek, setTotalRevenueLastWeek] = React.useState(0);
  const [totalGrossProfit, setTotalGrossProfit] = React.useState(0);
  const [totalSalesLastMonth, setTotalSalesLastMonth] = React.useState([]);
  const [totalProducts, setTotalProducts] = React.useState(0);

 

useEffect(() => {

  const fetchAll = async () => {
    setLoading(true);
    const thisYear = new Date().getFullYear()+'-01-01';
    const thisMonth = new Date().getMonth();
    const startDateLastWeek = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const dateToday = new Date().toISOString().split('T')[0];
    const requestUrls = [
      '/analytics/totalrevenue?startDate='+thisYear+'&endDate='+dateToday,
      '/analytics/totalrevenue?startDate='+startDateLastWeek+'&endDate='+dateToday,
      '/analytics/totalgrossprofit?startDate='+thisYear+'&endDate='+dateToday,
      // '/analytics/GetTotalGrossProfitByTimePeriod?startDate=${startDate}&endDate=${endDate}',
      '/analytics/totalgrossprofit?startDate='+thisYear+'&endDate='+dateToday
    ];

    const requests = requestUrls.map((url) =>
      axios.get(process.env.APIURL + url)
    );
    axios.all(requests).then(
      axios.spread(function (
        totalRevenueCurrentYear,
        totalRevenueLastWeek,
        totalGrossprofit,
        totalSalesLastMonth
        //totalproducts
      ) {
        setTotalRevenueCurrentYear(totalRevenueCurrentYear.data);
        setTotalRevenueLastWeek(totalRevenueLastWeek.data);
        setTotalGrossProfit(totalGrossprofit.data);
        setTotalSalesLastMonth(totalSalesLastMonth.data);
        //setTotalProducts(totalproducts.data);
        console.log(totalRevenueCurrentYear.data);
        console.log(totalRevenueLastWeek.data);
        console.log(totalGrossprofit.data);
        console.log(totalSalesLastMonth.data);
        //console.log(totalproducts.data);
      })
    );

  };
  fetchAll();
}, []);

  const headers = [
    // { id: "id", label: "Id", disablePadding: false, numeric: false },
    { id: "product", label: "Product", disablePadding: false, numeric: false },
    {
      id: "quantity",
      label: "Quantity",
      disablePadding: false,
      numeric: false,
    },
    { id: "price", label: "Price($)", disablePadding: false, numeric: false },
    {
      id: "saleDate",
      label: "Sale Date",
      disablePadding: false,
      numeric: false,
    },
  ];



  return (
    <Layout>
      <div className="flex flex-row justify-end">
       <DateRangePicker />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-2">
        {/* <div className="flex flex-col"> */}
        {/* <div className="col-span-6">
          <TopCard />
        </div> */}
          <Card
            title="Total Gross profit"
            value={totalGrossProfit}
            icon={<AttachMoney />}
          />
          <Card title="Total revenue" value={totalRevenueCurrentYear} icon={<Paid />} />
          <Card
            title="Total revenue last week"
            value={totalRevenueLastWeek}
            icon={<Sell />}
          />
        {/* <div className="col-span-12">
          <Card title="test" value={totalSalesLastMonth} icon={<Shop />} />
        </div> */}
        {/* <SortableTable headers={headers} /> */}

          <PieChart />
          <LineChart />
      </div>
    </Layout>
  );
};

export default Dashboard;
