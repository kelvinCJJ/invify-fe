
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

function Purchases() {
  const router = useRouter();
  const [headData, setHeadData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [purchases, setPurchases] = useState([]);
  const { snackbarOpen, openSnackbar, openModal } = useStateContext();

  const headers = [
    // { id: "id", label: "Id", disablePadding: false, numeric: false },
    { id: "name", label: "Company Name", disablePadding: false, numeric: false },
    { id: "contactname", label: "Contact Person", disablePadding: false, numeric: false, },
    { id: "phone", label: "Phone", disablePadding: false, numeric: false },
    { id: "email", label: "Email", disablePadding: false, numeric: false },
  ];
  
  const handleDelete = (rowId) => {
    setRowData((rowData) => rowData.filter((row) => row.id !== rowId));
  };

  useEffect(() => {
    getSuppliers();
    setHeadData(headers);
  }, []);

  async function getSuppliers() {
    try {
      await axios
        .get(process.env.APIURL + "/suppliers", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
           console.log(res.data);
          setRowData(res.data);
          setLoading(false);
        });
    } catch (err) {
      openSnackbar("err", "error");
    }
  }

  return (
    <Layout>
      <div className="my-2">
      </div>
      <div className="flex flex-row ">
        <Button variant="contained" href="/suppliers/create">
          <Add />
          New Supplier
        </Button>
      </div>
      <SortableTable
        headers={headData}
        rows={rowData}
        pageurl={"/suppliers"}
        onDelete={handleDelete}
      />
    </Layout>
  );
}

export default Suppliers;
