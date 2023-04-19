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
  Button,
  TableContainer,
} from "@mui/material";
import { DeleteForever, Edit } from "@mui/icons-material";

const SortableTable = ({ headers, rows, pageurl }) => {
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSort = (header) => {
    if (orderBy === header) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setOrderBy(header);
      setOrder("asc");
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
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

  return (
    <div>
      <div>
        <TextField
          label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <TableContainer className="bg-lightshade-500 mt-3">
        <Table >
          <TableHead>
            <TableRow>
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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  {headers.map((header) => (
                    <TableCell key={`${row.id}-${header.id}`}>
                      {row[header.id]}
                    </TableCell>
                  ))}
                  <TableCell className="p-1 m-1 space-x-2">
                    <Button
                      variant="contained"
                      href={`${pageurl}/${row.id}`}
                      style={{ textAlign: "center" }}
                    >
                      <Edit
                        style={{
                          display: "inline-block",
                          verticalAlign: "middle",
                        }}
                      />
                      edit
                    </Button>
                    <Button
                      variant="contained"
                      href={`${pageurl}/${row.id}`}
                      style={{ textAlign: "center" }}
                    >
                      <DeleteForever
                        style={{
                          display: "inline-block",
                          verticalAlign: "middle",
                        }}
                      />
                      delete
                    </Button>
                  </TableCell>
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
