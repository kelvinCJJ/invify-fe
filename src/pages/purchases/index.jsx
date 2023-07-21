
import Layout from "@/components/Layout";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import SortableTable from "@/components/ui/SortableTable";
import { useRouter } from "next/router";
import { useStateContext } from "@/contexts/ContextProvider";
import { Add } from "@mui/icons-material";
import { fetchData } from "next-auth/client/_utils";
import { Button } from "@mui/material";

function Purchases() {
  const router = useRouter();
  const [headData, setHeadData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [purchases, setPurchases] = useState([]);
  const { openSnackbar } = useStateContext();
  const openSnackbarRef = useRef(openSnackbar);

  useEffect(() => {
    openSnackbarRef.current = openSnackbar;
  }, [openSnackbar]);

  const headers = [
    // { id: "id", label: "Id", disablePadding: false, numeric: false },
    { id: "productName", label: "Product", disablePadding: false, numeric: false },
    { id: "quantity", label: "Quantity", disablePadding: false, numeric: false, },
    { id: "price", label: "Price", disablePadding: false, numeric: false },
  ];
  
  const handleDelete = (rowId) => {
    setRowData((rowData) => rowData.filter((row) => row.id !== rowId));
  };

  useEffect(() => {
    let isCancelled = false;
    
    async function fetchData() {
      try {
        await axios
          .get(process.env.APIURL + "/purchases", {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            setRowData(res.data);
          });
          
      } catch (err) {
        openSnackbarRef.current(err.message, 'error');
      }
    }

    if (!isCancelled) {
      setLoading(true);
      fetchData();
      setLoading(false);
    }
    return () => {
      isCancelled = true;
    };
  }, []);

  

  return (
    <Layout>
      <div className="my-2">
      </div>
      <div className="flex flex-row ">
        <Button className="text-md md:text-base text-primary-900 rounded-md normal-case p-2 lg:px-4  bg-lightshade-500 hover:bg-lightshade-600" href="/purchases/create">
          <Add />
          New Purchase
        </Button>
      </div>
      <SortableTable
        headers={headers}
        rows={rowData}
        pageurl={"/purchases"}
        onDelete={handleDelete}
      />
    </Layout>
  );
}

export default Purchases;
