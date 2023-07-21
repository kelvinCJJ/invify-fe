
import Layout from "@/components/Layout";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import SortableTable from "@/components/ui/SortableTable";
import { useRouter } from "next/router";
import { useStateContext } from "@/contexts/ContextProvider";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";

function Suppliers() {
  const router = useRouter();
  const [headData, setHeadData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const { openSnackbar } = useStateContext();
  const openSnackbarRef = useRef(openSnackbar);

  const headers = [
    // { id: "id", label: "Id", disablePadding: false, numeric: false },
    { id: "name", label: "Company Name", disablePadding: false, numeric: false },
    { id: "contactName", label: "Contact Person", disablePadding: false, numeric: false, },
    { id: "phone", label: "Phone", disablePadding: false, numeric: false },
    { id: "email", label: "Email", disablePadding: false, numeric: false },
  ];
  
  const handleDelete = (rowId) => {
    setRowData((rowData) => rowData.filter((row) => row.id !== rowId));
  };

  useEffect(() => {
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
            setRowData(res.data);
            setLoading(false);
          });
      } catch (err) {
        openSnackbarRef.current(err.response.data.message, 'error');
      }
    }

    getSuppliers();
  }, []);

  useEffect(() => {
    openSnackbarRef.current = openSnackbar;
  }, [openSnackbar]);

  return (
    <Layout>
      <div className="my-2">
      </div>
      <div className="flex flex-row ">
        <Button className="text-md md:text-base text-primary-900 rounded-md normal-case p-2 lg:px-4  bg-lightshade-500 hover:bg-lightshade-600" href="/suppliers/create">
          <Add />
          New Supplier
        </Button>
      </div>
      <SortableTable
        headers={headers}
        rows={rowData}
        pageurl={"/suppliers"}
        onDelete={handleDelete}
      />
    </Layout>
  );
}

export default Suppliers;
