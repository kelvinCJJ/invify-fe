import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  TextField,
  TablePagination,
  TableContainer,
  InputAdornment,
} from "@mui/material";
import {
  DeleteForever,
  Edit,
  Search,
  SearchOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import axios from "axios";
import Button from "./Button";
import { useStateContext } from "@/contexts/ContextProvider";
import UniversalModal from "./UniversalModal";
import { useEffect } from "react";

const SortableTable = ({ headers, rows, pageurl, onDelete, buttons=true }) => {
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { openSnackbar, openModal, closeModal } = useStateContext();

  const router = useRouter();

  //Sorting
  const handleSort = (header) => {
    if (orderBy === header) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setOrderBy(header);
      setOrder("asc");
    }
  };

  //Search
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  //Pagination
  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) => {
      return value !==null ? value.toString().toLowerCase().includes(searchQuery.toLowerCase()) : false;
      
    })
  );

  const sortedRows = filteredRows.sort((a, b) => {
    if (order === "asc") {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (rowId) => {
    router.push(router.pathname + `/edit/`+rowId);
  };

  const handleDelete = (rowId) => {
    openModal({
      isAlert: true,
      severity: "error",
      title: "Delete",
      content: "Are you sure you want to delete this item?",
      actions: [
        {
          label: "Delete",
          onClick: () => deleteCategory(rowId),
          severity: "error",
        },
        { label: "Cancel", onClick: () => closeModal(), severity: "info" },
      ],
    });
  };

  const deleteCategory = (rowId) => {
    axios
      .delete(process.env.APIURL + router.pathname + `/${rowId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        closeModal();
        openSnackbar(res.data.message, "success");
      })
      .catch((err) => {
        closeModal();
        openSnackbar(err.response.data.message, "error");
      });
    onDelete(rowId);
  };

  return (
    <div>
      <div>
        <TextField
          label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          margin="normal"
          variant="standard"
          color="light"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search className="" />
              </InputAdornment>
            ),
            placeholder:"search..."
          }}
          className="rounded-lg"
          
        />
      </div>
      <TableContainer className="bg-darkaccent-800 mt-3 rounded-xl p-3">
        <Table>
          <TableHead>
            <TableRow className="border-b-2 border-darkaccent-600" >
              <TableCell
                key={"#"}
                sortDirection={orderBy === "#" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "#"}
                  direction={order}
                  onClick={() => handleSort(0)}
                >
                  #
                </TableSortLabel>
              </TableCell>
              {headers.map((header) => (
                <TableCell
                  key={header.id}
                  sortDirection={orderBy === header.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === header.id}
                    direction={order}
                    onClick={() => handleSort(header.id)}
                  >
                    {header.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              {buttons && (
              <TableCell>Actions</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  key={row.id}
                  className="border-b-2 border-darkaccent-600"
                  hover
                >
                  <TableCell key={page * rowsPerPage + index + 1}>
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  {headers.map((header) => (
                    <TableCell key={`${row.id}-${header.id}`}>
                      {row[header.id]}
                    </TableCell>
                  ))}
                  {buttons && (
                  <TableCell className="p-1 m-1 lg:space-x-2">
                    <Button
                      variant="contained"
                      //href={`${pageurl}/${row.id}`}
                      severity="info"
                      onClick={() => handleEdit(row.id)}
                      //className="bg-main-500 hover:bg-main-700  mr-2 "
                    >
                      <Edit
                        style={{
                          display: "inline-block",
                          verticalAlign: "middle",
                        }}
                      />
                    </Button>
                    <Button
                      variant="contained"
                      //href={`${pageurl}/${row.id}`}
                      severity="error"
                      onClick={() => handleDelete(row.id)}
                      //className="bg-main-500 hover:bg-main-700"
                    >
                      <DeleteForever
                        style={{
                          display: "inline-block",
                          verticalAlign: "middle",
                        }}
                      />
                    </Button>
                  </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default SortableTable;
