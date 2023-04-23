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
  const { snackbarOpen, openSnackbar, openModal } = useStateContext();
  // const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  // const handleCloseModal = () => {
  //   setModalOpen(false);
  // };

  const handleDelete = (rowId) => {
    setRowData((rowData) => rowData.filter((row) => row.id !== rowId));
  };

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    try {
      const headers = [
        // { id: "id", label: "Id", disablePadding: false, numeric: false },
        { id: "name", label: "Name", disablePadding: false, numeric: false },
        { id: "dateTimeCreated", label: "Date time Created", disablePadding: false, numeric: false, },
        // { id: "action", label: "Actions", disablePadding: false, numeric: false },
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
          console.log(res.data);
          res.data.map((item) => {
            item.dateTimeCreated = new dayjs(item.dateTimeCreated).format("DD/MM/YYYY");
          });
          setRowData(res.data);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
      openSnackbar("error", "Error getting categories");
    }
  }

  return (
    <Layout>
      <div className="my-2">
      </div>
      <div className="flex flex-row ">
        {/* <Button href="/categories/create" variant="contained" className="bg-lightaccent-500 hover:bg-lightaccent-800">
            Create
          </Button> */}
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
      {/* <EnhancedTable headCells={headData} rows={rowData} tableTitle={"Categories"} /> */}
    </Layout>
  );
}

export default Categories;
