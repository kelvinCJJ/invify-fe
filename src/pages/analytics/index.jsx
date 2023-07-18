//analytics page
import { useState, useEffect } from "react";
import axios from "axios";
import LineChart from "@/components/ui/LineChart";
import SortableTable from "@/components/ui/SortableTable";
import Layout from "@/components/Layout";
import BasicTabs from "@/components/ui/BasicTabs";

const productProfitabilityHeaders = [
    { id: "productName", label: "Product", disablePadding: false, numeric: false },
    {
      id: "totalRevenue",
      label: "Total Revenue",
      disablePadding: false,
      numeric: false,
    },
    {
      id: "totalCost",
      label: "Total Cost",
      disablePadding: false,
      numeric: false,
    },
    {
      id: "profit",
      label: "Profit",
      disablePadding: false,
      numeric: false,
    },
  ];

const inventoryManagementHeaders = [
  { id: "productName", label: "Product", disablePadding: false, numeric: false },
  {
    id: "quantityPurchased",
    label: "Quantity Purchased",
    disablePadding: false,
    numeric: false,
  },
  {
    id: "quantitySold",
    label: "Quantity Sold",
    disablePadding: false,
    numeric: false,
  },
  {
    id: "quantityTaken",
    label: "Quantity Taken",
    disablePadding: false,
    numeric: false,
  },
  {
    id: "currentInventoryLevel",
    label: "Current Inventory Level",
    disablePadding: false,
    numeric: false,
  },
];

const Analytics = () => {
  const [loading, setLoading] = useState(false);
  const [productProfitability, setProductProfitability] = useState([]);
  const [inventoryManagement, setInventoryManagement] = useState([]);
  const [salesTrends, setSalesTrends] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      setLoading(true);
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };

      const productProfitabilityResult = await axios.get(
        process.env.APIURL + "/analytics/productprofitability"
      );
      setProductProfitability(productProfitabilityResult.data);

      const inventoryManagementResult = await axios.get(
        process.env.APIURL + "/analytics/inventorymanagement"
      );
      setInventoryManagement(inventoryManagementResult.data);

      const salesTrendsResult = await axios.get(
        process.env.APIURL + "/analytics/salestrends"
      );
      setSalesTrends(salesTrendsResult.data);
    };

    fetchData();
    setLoading(false);
  }, []);

  return (
    <Layout>
      <div className="m-2">
      <BasicTabs>
          <div label="Product Profitability">
        <div >
          <SortableTable
            headers={productProfitabilityHeaders}
            rows={productProfitability}
            buttons={false}
          />
        </div>
      </div>

      <div label="Inventory Management">
        <div>
          <SortableTable
            headers={inventoryManagementHeaders}
            rows={inventoryManagement}
            buttons={false}
          />
        </div>
      </div>
      </BasicTabs>
        {/* <Typography variant="h4" component="h1">
          Sales Trends
        </Typography> */}
        <div className="grid grid-col-1">
            Sales Trends (Revenue)
            <div className="min-h-[200px] max-h-[300px] lg:min-h-[400px] lg:max-h-[450px] object-center">
            <LineChart data1={salesTrends.totalSales} data2={salesTrends.totalRevenue} label1={"Total Sales per Month"} label2={"Total Revenue per Month"} />
            </div>
        </div>
         
        </div>
    </Layout>
  );
};

export default Analytics;
