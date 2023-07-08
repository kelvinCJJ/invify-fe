//add product page
import React from "react";
import {
  Autocomplete,
  Button,
  CircularProgress,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useState } from "react";
import BGrid from "@/components/ui/BGrid";
import { useStateContext } from "@/contexts/ContextProvider";
import { useEffect } from "react";
import * as Yup from "yup";

const EditPurchase = () => {
  const router = useRouter();
  const { openSnackbar } = useStateContext();
  const [supplier, setSupplir] = useState([]);
  const [supplierId, setSupplierId] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const purchaseId = router.query.id;
  
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const [suppliersRes, purchasesRes] = await Promise.all([
          axios.get(process.env.APIURL + "/suppliers", {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }),
          axios.get(process.env.APIURL + "/purchases/" + purchaseId, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }),
         
        ]);
    
        setOptions(suppliersRes.data);
    
        formik.setValues({
          id: purchasesRes.data.id,
          name: purchasesRes.data.product.name,
          quantity: purchasesRes.data.quantity,
          price: purchasesRes.data.price.toFixed(2),
          purchaseDate: purchasesRes.data.purchaseDate,
          supplierId: purchasesRes.data.supplierId,
        });

        setSupplierId(purchasesRes.data.supplierId);
        setSelectedOption(
          options.find((option) => option.id === purchasesRes.data.supplierId)
        );
      } catch (error) {
        console.log(error);
        openSnackbar("error", "error");
      }
      setLoading(false);
    };

    
    if (purchaseId) {
      fetchData();
    }
  }, [formik, openSnackbar, options, purchaseId]);
  
  
  


  const validationSchema = Yup.object({
    price: Yup.string().test(
      "is-decimal",
      "Price must be a decimal number with two decimal places",
      (value) => (value + "").match(/^\d*(\.\d{2})$/)
    ),
    cost: Yup.string().test(
      "is-decimal",
      "Cost must be a decimal number with two decimal places",
      (value) => (value + "").match(/^\d*(\.\d{2})$/)
    ),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      quantity: 0,
      price: 0,
      purchaseDate: "",
      supplierId: 1,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setIsSubmitting(true);
      console.log(values);
      axios
        .put(process.env.APIURL + "/purchases/" + purchaseId, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            openSnackbar(
              "Purchase [" + values.product.name + "] updated successfully",
              "success"
            );
          } else {
            openSnackbar(res.data.message, "error");
          }
        })
        .catch((err) => {
          console.log(err);
          // setSnackbarMessage(err.response.data.message);
          // setSnackbarSeverity("error");
          // setSnackbarOpen(true);
          openSnackbar(err.response.data.message, "error");
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
  });

  if (loading) {
    return 'loading...';
  }

  return (   

    <Layout>
      <form onSubmit={formik.handleSubmit}>
        <BGrid>
          <Grid item xs={12}>
            <h1 className="text-xl font-semibold overflow-ellipsis">
              Edit Purchases
            </h1>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="">
              <TextField
                required
                fullWidth
                id="name"
                name="name"
                label="Product Name"
                placeholder="e.g. Apple iPhone 12 Pro Max"
                variant="filled"
                margin="normal"
                color="light"
                className=" bg-darkaccent-800 rounded-lg"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                required
                fullWidth
                id="quantity"
                name="quantity"
                label="Quantity"
                placeholder="0"
                variant="filled"
                margin="normal"
                color="light"
                className=" bg-darkaccent-800 rounded-lg"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                helperText={formik.touched.quantity && formik.errors.quantity}
              />
              <TextField
                required
                fullWidth
                id="price"
                name="price"
                label="Price"
                placeholder="e.g. 1000.00"
                variant="filled"
                margin="normal"
                color="light"
                className=" bg-darkaccent-800 rounded-lg"
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
              <Autocomplete
                open={open}
                color="light"
                onOpen={() => {
                  setOpen(true);
                }}
                onClose={() => {
                  setOpen(false);
                }}
                isOptionEqualToValue={(option, value) => value!=undefined  ? option.id === value.id : false}
                getOptionLabel={(option) => (option.name ? option.name : "")}
                options={options}
                loading={loading}
                defaultValue={selectedOption}
                value={selectedOption}
                onChange={(event, value) => {
                  if (value) {
                    setSelectedOption(value);
                    formik.setFieldValue("categoryId", value.id);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className=" bg-darkaccent-800 rounded-lg"
                    variant="filled"
                    color="light"
                    label="Category"
                    InputLabelProps={{}}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
              <TextField
                required
                fullWidth
                id="purchaseDate"
                name="purchaseDate"
                label="Purchase Date"
                placeholder="e.g. 2021-01-01"
                variant="filled"
                margin="normal"
                color="light"
                className=" bg-darkaccent-800 rounded-lg"
                value={formik.values.purchaseDate}
                onChange={formik.handleChange}
                error={formik.touched.purchaseDate && Boolean(formik.errors.purchaseDate)}
                helperText={formik.touched.purchaseDate && formik.errors.purchaseDate}
              />
              <Button
                type="submit"
                className="text-white bg-darkshade-400 font-semibold lowercase p-2 rounded-lg"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </div>
          </Grid>
        </BGrid>
      </form>
    </Layout>
  );
};

export default EditPurchase;
