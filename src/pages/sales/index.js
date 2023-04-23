
import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { Snackbar } from "@mui/material";
import SortableTable from "@/components/ui/SortableTable";
import { useRouter } from "next/router";
import UniversalModal from "@/components/ui/UniversalModal";
import Button from "@/components/ui/Button";
import { useStateContext } from "@/contexts/ContextProvider";
import { Add } from "@mui/icons-material";
import dayjs from "dayjs";

function Sales() {
  const router = useRouter();
  const [headData, setHeadData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const { snackbarOpen, openSnackbar, openModal } = useStateContext();

  const headers = [
    // { id: "id", label: "Id", disablePadding: false, numeric: false },
    { id: "product", label: "Product", disablePadding: false, numeric: false },
    { id: "quantity", label: "Quantity", disablePadding: false, numeric: false, },
    { id: "price", label: "Price($)", disablePadding: false, numeric: false },
    { id: "saleDate", label: "Sale Date", disablePadding: false, numeric: false },
  ];
  
  const handleDelete = (rowId) => {
    setRowData((rowData) => rowData.filter((row) => row.id !== rowId));
  };

  useEffect(() => {
    getProducts();
    setHeadData(headers);
  }, []);
  
  useEffect(() => {
    if (products.length > 0) {
      getSales();
    }
  }, [products]);
  
  async function getProducts() {
    await axios
      .get(process.env.APIURL + "/products", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        //console.log(res.data);
        setProducts(res.data);
        //getSales();
      });
  }

  async function getSales() {
    try {
      await axios
        .get(process.env.APIURL + "/sales", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
           console.log(res.data);
           console.log(products);
           //console.log(categories);
           res.data.map((sales) => {
            if(products.length > 0){
            sales.product = products.find(
              (product) => product.id === sales.productId
            ).name;
            }
            sales.saleDate = new dayjs(sales.saleDate).format("DD/MM/YYYY");

          });
          setRowData(res.data);
          //console.log(rowData);
          setLoading(false);
        });
    } catch (err) {
      //console.log(err);
      openSnackbar("err", "error");
    }
  }

  return (
    <Layout>
      <div className="my-2">
      </div>
      <div className="flex flex-row ">
        <Button variant="contained" href="/sales/create">
          <Add />
          New Sales
        </Button>
      </div>
      <SortableTable
        headers={headData}
        rows={rowData}
        pageurl={"/sales"}
        onDelete={handleDelete}
      />
    </Layout>
  );
}

export default Sales;
