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

const Dashboard = () => {
  console.log("dashboard");
  const [loading, setLoading] = React.useState(false);
  const [totalRevenue, setTotalRevenue] = React.useState(0);
  const [totalRevenueLastWeek, setTotalRevenueLastWeek] = React.useState(0);
  const [totalGrossProfit, setTotalGrossProfit] = React.useState(0);
  const [totalSalesLastMonth, setTotalSalesLastMonth] = React.useState([]);
  const [totalProducts, setTotalProducts] = React.useState(0);
  const [datas, setDatas] = React.useState([
    setTotalRevenue,
    setTotalRevenueLastWeek,
    setTotalGrossProfit,
    setTotalProducts,
  ]);

  const requestUrls = [
    "/sales/totalrevenue/lastmonth",
    "/sales/totalrevenue/lastweek",
    "/sales/totalgrossprofit/lastmonth",
    "/sales/lastmonth",
  ];

  const fetchAll = async () => {
    const requests = requestUrls.map((url) =>
      axios.get(process.env.APIURL + url)
    );
    axios.all(requests).then(
      axios.spread(function (
        totalrevenue,
        totalrevenuelastweek,
        totalgrossprofit,
        totalsaleslastmonth
        //totalproducts
      ) {
        setTotalRevenue(totalrevenue.data);
        setTotalRevenueLastWeek(totalrevenuelastweek.data);
        setTotalGrossProfit(totalgrossprofit.data);
        setTotalSalesLastMonth(totalsaleslastmonth.data);
        //setTotalProducts(totalproducts.data);
        console.log(totalrevenue.data);
        console.log(totalrevenuelastweek.data);
        console.log(totalgrossprofit.data);
        console.log(totalsaleslastmonth.data);
        //console.log(totalproducts.data);
      })
    );
  };

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

  useEffect(() => {
    setLoading(true);
    fetchAll();
    setLoading(false);
  }, [loading]);

  return (
    <Layout>
      <div className="grid grid-cols-2 gap-2 ">
        {/* <div className="flex flex-col"> */}
        {/* <div className="col-span-6">
          <TopCard />
        </div> */}
        <div className="">
          <Card
            title="Total Gross profit"
            value={totalGrossProfit}
            icon={<AttachMoney />}
          />
          <Card title="Total revenue" value={totalRevenue} icon={<Paid />} />
          <Card
            title="Total revenue last week"
            value={totalRevenueLastWeek}
            icon={<Sell />}
          />
        </div>
        {/* <div className="col-span-12">
          <Card title="test" value={totalSalesLastMonth} icon={<Shop />} />
        </div> */}
        {/* <SortableTable headers={headers} /> */}

        <div className="md:col-span-6">
          <PieChart />
        </div>
        <div className="md:col-span-6">
          <LineChart />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
