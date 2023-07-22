import TopCard from "@/components/ui/TopCard";
import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import { AttachMoney, Paid, Sell, Shop, Shop2 } from "@mui/icons-material";
import axios, { all } from "axios";
import SortableTable from "@/components/ui/SortableTable";
import PieChart from "@/components/ui/DonutChart";
import { Box, ButtonBase, Tab, Tabs, Typography } from "@mui/material";
import LineChart from "@/components/ui/LineChart";
import DateRangePicker from "@/components/ui/DateRangePicker";
import BasicTabs from "@/components/ui/BasicTabs";
import Skeleton from "react-loading-skeleton";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [totalRevenueThisYear, setTotalRevenueThisYear] = useState(0);
  const [totalRevenueLastMonth, setTotalRevenueLastMonth] = useState(0);
  const [totalRevenueLastWeek, setTotalRevenueLastWeek] = useState(0);
  const [totalSalesThisYear, setTotalSalesThisYear] = useState(0);
  const [totalSalesLastMonth, setTotalSalesLastMonth] = useState(0);
  const [totalSalesLastWeek, setTotalSalesLastWeek] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [top5ProductsThisYear, setTop5ProductsThisYear] = useState([]);
  const [top5ProductsLastMonth, setTop5ProductsLastMonth] = useState([]);
  const [top5ProductsLastWeek, setTop5ProductsLastWeek] = useState([]);
  const [yearlySalesForecast, setYearlySalesForecast] = useState([]);

  const [productLowStock, setProductLowStock] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      //axios all
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      await axios
        .all([
          axios.get(process.env.APIURL + "/analytics/dashboard", { headers }),
          axios.get(process.env.APIURL + "/analytics/forecastsales/month", {
            headers,
          }),
          axios.get(process.env.APIURL + "/analytics/top5products", {
            headers,
          }),
          axios.get(process.env.APIURL + "/analytics/lowstock", { headers }),
        ])
        .then(
          axios.spread(
            (
              dashboardResponse,
              forecastResponse,
              top5ProductsResponse,
              lowStockResponse
            ) => {
              //console.log(dashboardResponse.data);
              setTotalRevenueThisYear(
                "$" + dashboardResponse.data.totalRevenueThisYear
              );
              setTotalRevenueLastMonth(
                "$" + dashboardResponse.data.totalRevenueLastMonth
              );
              setTotalRevenueLastWeek(
                "$" + dashboardResponse.data.totalRevenueLastWeek
              );
              setTotalSalesThisYear(dashboardResponse.data.totalSalesThisYear);
              setTotalSalesLastMonth(
                dashboardResponse.data.totalSalesLastMonth
              );
              setTotalSalesLastWeek(dashboardResponse.data.totalSalesLastWeek);
              setTotalProducts(dashboardResponse.data.totalProducts);

              //console.log(forecastResponse.data);
              setYearlySalesForecast(forecastResponse.data);

              //console.log(top5ProductsResponse.data);
              setTop5ProductsThisYear(
                top5ProductsResponse.data.top5ProductsThisYearData
              );
              setTop5ProductsLastMonth(
                top5ProductsResponse.data.top5ProductsLastMonthData
              );
              setTop5ProductsLastWeek(
                top5ProductsResponse.data.top5ProductsLastWeekData
              );

              setProductLowStock(lowStockResponse.data);
            }
          )
        )
        .finally(() => {
          setLoading(false);
        });
    };

    fetchAll();
  }, []);

  const headers = [
    // { id: "id", label: "Id", disablePadding: false, numeric: false },
    { id: "name", label: "Product", disablePadding: false, numeric: false },
    {
      id: "quantity",
      label: "Quantity",
      disablePadding: false,
      numeric: false,
    },
    {
      id: "restockLevel",
      label: "Restock Level",
      disablePadding: false,
      numeric: false,
    },
  ];

  return (
    <Layout>
      {loading ? (
        <div className="animate-pulse">
          <Skeleton count={5} />
        </div>
      ) : (
        <BasicTabs>
          <div label="Current Year">
            <div className="grid grid-col-1 gap-4 md:grid-cols-3 md:gap-2">
              <Card
                title="Total revenue this year"
                value={totalRevenueThisYear}
                icon={<Paid />}
              />

              <Card
                title="Total sales this year"
                value={totalSalesThisYear}
                icon={<Sell />}
              />
              <Card
                title="Total products"
                value={totalProducts}
                icon={<Shop2 />}
              />
            </div>
            <div className="grid grid-col-1 lg:grid-cols-3 lg:gap-4 mt-4">
              <div className="col-span-1 rounded">
                <div className="flex flex-row text-lg mb-2 justify-center">
                  Top 5 Products this year
                </div>
                {{ top5ProductsThisYear }.length > 0 ? (
                  <div>No data available</div>
                ) : (
                  <div className="min-h-[300px] max-h-[600px] lg:min-h-[400px] lg:max-h-[600px] rounded">
                    <PieChart currentData={top5ProductsThisYear} />
                  </div>
                )}
              </div>
              <div className="col-span-2 min-h-[200px] max-h-[300px] lg:min-h-[400px] lg:max-h-[450px] rounded">
                <div className="flex flex-row text-lg gap-x-2 items-center justify-center">
                  Sales Forecast (2023)
                  <ButtonBase className="bg-warning-500 text-md p-1 rounded">
                    Train model
                  </ButtonBase>
                </div>
                <LineChart
                  data1={yearlySalesForecast.actualData}
                  data2={yearlySalesForecast.forecastedData}
                  label1={"Actual Sales"}
                  label2={"Forecasted Sales"}
                />
              </div>
            </div>
          </div>
          <div label="Last month">
            <div className="grid grid-col-1 gap-4 md:grid-cols-3 md:gap-2">
              <Card
                title="Total revenue last month"
                value={totalRevenueLastMonth}
                icon={<Paid />}
              />
              <Card
                title="Total sales last month"
                value={totalSalesLastMonth}
                icon={<Sell />}
              />
              <Card
                title="Total products"
                value={totalProducts}
                icon={<Shop2 />}
              />
            </div>
            <div className="grid grid-col-1 md:grid-cols-3 md:gap-4 mt-4 ">
              <div className="col-span-1   rounded">
                <div className="flex flex-row text-lg mb-2 justify-center">
                  Top 5 Products last month
                </div>
                {{ top5ProductsLastMonth }.length < 0 ? (
                  <div>No data available</div>
                ) : (
                  <div className="min-h-[300px] max-h-[600px] lg:min-h-[400px] lg:max-h-[600px] rounded">
                    <PieChart currentData={top5ProductsLastMonth} />
                  </div>
                )}
              </div>
              <div className="col-span-2 min-h-[200px] max-h-[300px] lg:min-h-[400px] lg:max-h-[450px] rounded">
                <div className="flex flex-row text-lg gap-x-2 items-center justify-center">
                  Sales Forecast (2023)
                  <ButtonBase className="bg-warning-500 text-md p-1 rounded">
                    Train model
                  </ButtonBase>
                </div>

                <LineChart
                  data1={yearlySalesForecast.actualData}
                  data2={yearlySalesForecast.forecastedData}
                  label1={"Actual Sales"}
                  label2={"Forecasted Sales"}
                />
              </div>
            </div>
          </div>
          <div label="Last week">
            <div className="grid grid-col-1 gap-4 md:grid-cols-3 md:gap-2">
              <Card
                title="Total revenue last week"
                value={totalRevenueLastWeek}
                icon={<Paid />}
              />
              <Card
                title="Total sales last week"
                value={totalSalesLastWeek}
                icon={<Sell />}
              />
              <Card
                title="Total products"
                value={totalProducts}
                icon={<Shop2 />}
              />
            </div>
            <div className="grid grid-col-1 md:grid-cols-3 md:gap-4 mt-4">
              <div className="col-span-1 rounded">
                <div className="flex flex-row text-lg mb-2 justify-center">
                  Top 5 Products last week
                </div>
                {{ top5ProductsLastWeek }.length > 0 ? (
                  <div>No data available</div>
                ) : (
                  <div className=" min-h-[300px] max-h-[600px] lg:min-h-[400px] lg:max-h-[600px] rounded">
                    <PieChart currentData={top5ProductsLastWeek} />
                  </div>
                )}
              </div>
              <div className="col-span-2 min-h-[200px] max-h-[300px] lg:min-h-[400px] lg:max-h-[450px] rounded">
                <div className="flex flex-row text-lg gap-x-2 items-center justify-center">
                  Sales Forecast (2023)
                  <ButtonBase className="bg-warning-500 text-md p-1 rounded">
                    Train model
                  </ButtonBase>
                </div>
                <LineChart
                  data1={yearlySalesForecast.actualData}
                  data2={yearlySalesForecast.forecastedData}
                  label1={"Actual Sales"}
                  label2={"Forecasted Sales"}
                />
              </div>
            </div>
          </div>
        </BasicTabs>
      )}
      <div className="text-lg bg-darkaccent-800 p-4 mt-2 lg:mt-4 rounded">
        Products Low on Stock
        <SortableTable
          headers={headers}
          rows={productLowStock}
          buttons={false}
        />
      </div>
    </Layout>
  );
};

export default Dashboard;
