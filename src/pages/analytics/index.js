//analytics page
import React, { Component } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import SortableTable from "@/components/ui/SortableTable";
import { useRouter } from "next/router";

export default function Analytics() {
  const [headData, setHeadData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [totalSales, setTotalSales] = useState([]);
  const [totalSalesAmount, setTotalSalesAmount] = useState([]);
  const [totalSalesAmountByCategory, setTotalSalesAmountByCategory] = useState(
    []
  );
  const [totalSalesAmountByProduct, setTotalSalesAmountByProduct] = useState(
    []
  );
  const [totalSalesAmountByDate, setTotalSalesAmountByDate] = useState([]);
  const [totalSalesAmountByMonth, setTotalSalesAmountByMonth] = useState([]);
  const [totalSalesAmountByYear, setTotalSalesAmountByYear] = useState([]);

  const [totalRevenueCurrentYear, setTotalRevenueCurrentYear] = useState(0);
  const [totalRevenueLastWeek, setTotalRevenueLastWeek] = useState(0);
  const [totalGrossProfit, setTotalGrossProfit] = useState(0);
  const [totalSalesLastMonth, setTotalSalesLastMonth] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const thisYear = new Date().getFullYear() + "-01-01";
      const thisMonth = new Date().getMonth();
      const startDateLastWeek = new Date(
        new Date().getTime() - 7 * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split("T")[0];
      const dateToday = new Date().toISOString().split("T")[0];
      const requestUrls = [
        "/analytics/totalrevenue?startDate=" +
          thisYear +
          "&endDate=" +
          dateToday,
        "/analytics/totalrevenue?startDate=" +
          startDateLastWeek +
          "&endDate=" +
          dateToday,
        "/analytics/totalgrossprofit?startDate=" +
          thisYear +
          "&endDate=" +
          dateToday,
        // '/analytics/GetTotalGrossProfitByTimePeriod?startDate=${startDate}&endDate=${endDate}',
        "/analytics/totalgrossprofit?startDate=" +
          thisYear +
          "&endDate=" +
          dateToday,
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

  //RETURN
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Analytics</h1>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Total Revenue</h5>
                                    <p className="card-text">{totalRevenueCurrentYear}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Total Revenue Last Week</h5>
                                    <p className="card-text">{totalRevenueLastWeek}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Total Gross Profit</h5>
                                    <p className="card-text">{totalGrossProfit}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    </div>
                    </div>
    );
                            

}


