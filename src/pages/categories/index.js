import EnhancedTable from "@/components/ui/EnhancedTable";
import Layout from "@/components/Layout";
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import SortableTable from "@/components/ui/SortableTable";

function Category() {
  const [rowData, setRowData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [headData, setHeadData] = useState([]);
  useEffect(() => {
    setLoading(true);
    getCategories();
  }, []);

  const headers = [
    { id: 'id', label: 'Id' },
    { id: 'name', label: 'Name' },
    { id: 'age', label: 'Age' },
    { id: 'city', label: 'City' },
  ];
  
  const rows = [
    { id:1, name: 'John Doe', age: 32, city: 'New York' },
    { id:2, name: 'Jane Doe', age: 28, city: 'San Francisco' },
    { id:3, name: 'Bob Smith', age: 45, city: 'Los Angeles' },
  ];
  

  
  async function getCategories() {
    try {
      const headData = [
        { id: "id", label: "Id", disablePadding: false, numeric: false },
        { id: "name", label: "Name", disablePadding: false, numeric: false },
        { id: "dateTimeCreated", label: "Created", disablePadding: false, numeric: false },
        { id: "action", label: "Actions", disablePadding: false, numeric: false },
      ];
      setHeadData(headData);
      setRowData(
      [
        {            
            "name": "Electronics",       
            "id": 1,     
            "dateTimeCreated": "2023-03-25T16:57:08.1249878"
        },
        {
            "name": "Clothes",
            "id": 2,
            "dateTimeCreated": "2023-04-18T03:26:40.4287487"
        }
    ]);
      // await axios
      //   .get(process.env.APIURL + "/categories/all", {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: "Bearer " + localStorage.getItem("token"),
      //     },
      //   })
      //   .then((res) => {
      //     console.log(res.data);
      //     setRowData(res.data);
      //     setLoading(false);
      //   });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Layout>
      <div className="container p-4">
        <h1>Category</h1>
        <div className="flex flex-row ">
          <Button href="/categories/create" />
        </div>
        <SortableTable headers={headers} rows={rows} pageurl={"/categories"} />
        {/* <EnhancedTable headCells={headData} rows={rowData} tableTitle={"Categories"} /> */}
      </div>
    </Layout>
  );
}

export default Category;
