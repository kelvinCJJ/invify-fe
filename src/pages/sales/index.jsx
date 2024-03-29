
import Layout from "@/components/Layout";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import SortableTable from "@/components/ui/SortableTable";
import { useStateContext } from "@/contexts/ContextProvider";
import { Add } from "@mui/icons-material";
import dayjs from "dayjs";
import { Button } from "@mui/material";

function Sales() {
  const [headData, setHeadData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const {  openSnackbar } = useStateContext();
  const openSnackbarRef = useRef(openSnackbar);

  useEffect(() => {
    openSnackbarRef.current = openSnackbar;
  }, [openSnackbar]);

  const headers = [
    // { id: "id", label: "Id", disablePadding: false, numeric: false },
    { id: "productName", label: "Product", disablePadding: false, numeric: false },
    { id: "quantity", label: "Quantity", disablePadding: false, numeric: false, },
    { id: "price", label: "Price($)", disablePadding: false, numeric: false },
    { id: "saleDate", label: "Sale Date", disablePadding: false, numeric: false },
  ];
  
  const handleDelete = (rowId) => {
    setRowData((rowData) => rowData.filter((row) => row.id !== rowId));
  };

  useEffect(() => {
    async function getProducts() {
      const res = await axios.get(process.env.APIURL + "/products", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setProducts(res.data);
    }
  
    async function getSales() {
      try {
        const res = await axios.get(process.env.APIURL + "/sales", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        res.data.map((sales) => {
          sales.saleDate = new dayjs(sales.saleDate).format("DD/MM/YYYY");
        });
        setRowData(res.data);
        setLoading(false);
      } catch (err) {
        openSnackbarRef.current(err.message, 'error');
      }
    }
  
    async function fetchData() {
      //await getProducts();
      getSales();
    }
  
    fetchData();
  }, []);
  
  
  

  return (
    <Layout>
      <div className="my-2">
      </div>
      <div className="flex flex-row ">
        <Button className="text-md md:text-base text-primary-900 rounded-md normal-case p-2 lg:px-4  bg-lightshade-500 hover:bg-lightshade-600" href="/sales/create">
          <Add />
          New Sales
        </Button>
      </div>
      <SortableTable
        headers={headers}
        rows={rowData}
        pageurl={"/sales"}
        onDelete={handleDelete}
      />
    </Layout>
  );
}

export default Sales;
