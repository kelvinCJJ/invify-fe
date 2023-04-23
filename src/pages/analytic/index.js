//analytics page
import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from "react";
import axios from "axios";
import { Snackbar } from "@mui/material";
import SortableTable from "@/components/ui/SortableTable";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function Analytics() {
    const classes = useStyles();
    const [headData, setHeadData] = useState([]);
    const [rowData, setRowData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [sales, setSales] = useState([]);
    const [totalSales, setTotalSales] = useState([]);
    const [totalSalesAmount, setTotalSalesAmount] = useState([]);
    const [totalSalesAmountByCategory, setTotalSalesAmountByCategory] = useState([]);
    const [totalSalesAmountByProduct, setTotalSalesAmountByProduct] = useState([]);
    const [totalSalesAmountByDate, setTotalSalesAmountByDate] = useState([]);
    const [totalSalesAmountByMonth, setTotalSalesAmountByMonth] = useState([]);
    const [totalSalesAmountByYear, setTotalSalesAmountByYear] = useState([]);
    const [totalSalesAmountByDay, setTotalSalesAmountByDay] = useState([]);
    const [totalSalesAmountByHour, setTotalSalesAmountByHour] = useState([]);
    const [totalSalesAmountByMinute, setTotalSalesAmountByMinute] = useState([]);
    const [totalSalesAmountBySecond, setTotalSalesAmountBySecond] = useState([]);
    const [totalSalesAmountByWeek, setTotalSalesAmountByWeek] = useState([]);
    const [totalSalesAmountByQuarter, setTotalSalesAmountByQuarter] = useState([]);
    const [totalSalesAmountByWeekday, setTotalSalesAmountByWeekday] = useState([]);
    const [totalSalesAmountByWeekend, setTotalSalesAmountByWeekend] = useState([]);
    const [totalSalesAmountByWeekdayName, setTotalSalesAmountByWeekdayName] = useState([]);
    const [totalSalesAmountByWeekendName, setTotalSalesAmountByWeekendName] = useState([]);
    const [totalSalesAmountByMonthName, setTotalSalesAmountByMonthName] = useState([]);
    const [totalSalesAmountByQuarterName, setTotalSalesAmountByQuarterName] = useState([]);
    const [totalSalesAmountByYearName, setTotalSalesAmountByYearName] = useState([]);
    const [totalSalesAmountByDayName, setTotalSalesAmountByDayName] = useState([]);
    const [totalSalesAmountByHourName, setTotalSalesAmountByHourName] = useState([]);
    

    const handleDelete = (rowId) => {
        setRowData((rowData) => rowData.filter((row) => row.id !== rowId));
    }

    useEffect(() => {
        getProducts();
    }
    , []);

    return (
        <p>WIP</p>
    );

}
