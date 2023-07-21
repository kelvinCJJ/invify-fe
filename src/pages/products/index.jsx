
  import Layout from "@/components/Layout";
  import { useState, useEffect } from "react";
  import axios from "axios";
  import { Button, Snackbar } from "@mui/material";
  import SortableTable from "@/components/ui/SortableTable";
  import { useRouter } from "next/router";
  import UniversalModal from "@/components/ui/UniversalModal";
  import { useStateContext } from "@/contexts/ContextProvider";
  import { Add } from "@mui/icons-material";
  
  function Products() {
    const router = useRouter();
    const [headData, setHeadData] = useState([]);
    const [rowData, setRowData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const { snackbarOpen, openSnackbar, openModal } = useStateContext();

    const handleDelete = (rowId) => {
      setRowData((rowData) => rowData.filter((row) => row.id !== rowId));
    };
  
    useEffect(() => {
      getCategories();
    }, []);
    
    useEffect(() => {
      if (categories.length > 0) {
        getProducts();
      }
    }, [categories]);
    
    async function getCategories() {
      await axios
        .get(process.env.APIURL + "/categories", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          //console.log(res.data);
          setCategories(res.data);
          //getProducts();
        });
    }

    async function getProducts() {
      try {
        //getCategories();
        const headers = [
          // { id: "id", label: "Id", disablePadding: false, numeric: false },
          { id: "name", label: "Name", disablePadding: false, numeric: false },
          {
            id: "sku",
            label: "SKU",
            disablePadding: false,
            numeric: false,
          },
          { id: "category", label: "Category", disablePadding: false, numeric: false },
          { id: "price", label: "Price($)", disablePadding: false, numeric: false },
        ];
        setHeadData(headers);
        await axios
          .get(process.env.APIURL + "/products", {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
             //console.log(res.data);
             //console.log(categories);
             res.data.map((product) => {
              if(product.categoryId)
              {
                product.category = categories.find(
                  (category) => category.id === product.categoryId
                ).name;
              }              
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
        <div className="flex flex-row space-x-2">
          <Button className="text-md md:text-base text-primary-900 rounded-md normal-case p-2 lg:px-4  bg-lightshade-500 hover:bg-lightshade-600" href="/products/create">
            <Add />
            New Product
          </Button>
          <Button className="text-md md:text-base text-primary-900 rounded-md normal-case p-2 lg:px-4  bg-lightshade-500 hover:bg-lightshade-600" href="/products/stocktake">
            <Add />
            StockTake
          </Button>
        </div>
        <SortableTable
          headers={headData}
          rows={rowData}
          pageurl={"/products"}
          onDelete={handleDelete}
        />
      </Layout>
    );
  }

export default Products;
