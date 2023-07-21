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

function Categories() {
  const router = useRouter();
  const [headData, setHeadData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const {  openSnackbar, openModal } = useStateContext();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleDelete = (rowId) => {
    setRowData((rowData) => rowData.filter((row) => row.id !== rowId));
  };

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    try {
      const headers = [
        { id: "name", label: "Name", disablePadding: false, numeric: false },
        { id: "dateTimeCreated", label: "Date time Created", disablePadding: false, numeric: false, },
      ];
      setHeadData(headers);
      await axios
        .get(process.env.APIURL + "/categories", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          res.data.map((item) => {
            item.dateTimeCreated = new dayjs(item.dateTimeCreated).format("DD/MM/YYYY");
          });
          setRowData(res.data);
          setLoading(false);
        });
    } catch (err) {
      openSnackbar("error", "Error getting categories");
    }
  }

  return (
    <Layout>
      <div className="my-2">
      </div>
      <div className="flex flex-row ">
        <Button variant="contained" href="/categories/create">
          <Add />
          New Category
        </Button>
      </div>
      <SortableTable
        headers={headData}
        rows={rowData}
        pageurl={"/categories"}
        onDelete={handleDelete}
      />
    </Layout>
  );
}

export default Categories;
