//create sales page
import React, { use, useRef } from "react";
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
import { Formik, useFormik } from "formik";
import axios from "axios";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useState } from "react";
import BGrid from "@/components/ui/BGrid";
import { useStateContext } from "@/contexts/ContextProvider";
import { useEffect } from "react";
import * as Yup from "yup";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Input } from "postcss";

const EditSales = () => {
  const router = useRouter();
  const { openSnackbar } = useStateContext();
  const openSnackbarRef = useRef(openSnackbar);
  const [productId, setProductId] = useState("");
  const [sale, setSale] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDate, handleDateChange] = useState(null);
  const [selectedDates, setSelectedDate] = useState(null);
  const saleId = router.query.id;

  useEffect(() => {
    openSnackbarRef.current = openSnackbar;
  }, [openSnackbar]);

  useEffect(() => {
    let isCancelled = false;
    async function fetchData() {
      try {
        const [productRes, salesRes] = await Promise.all([
          axios.get(process.env.APIURL + "/products/idandname", {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }),
          axios.get(process.env.APIURL + "/sales/"+saleId, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }),
        ]);

        setOptions(productRes.data);
        const sale = salesRes.data;
        sale.price = sale.price.toFixed(2);
        sale.saleDate = dayjs(sale.saleDate);
        setSale(sale);
        setSelectedDate(sale.saleDate);

        const product = productRes.data.find(
          (product) => product.id === salesRes.data.productId
        );
        setSelectedOption(product);
      } catch (error) {
        openSnackbarRef.current('error', 'error');
      }
      setLoading(false);
    }

    if (!isCancelled) {
      setLoading(true);
      fetchData();
      setLoading(false);
    }
    return () => {
      isCancelled = true;
    };
  }, [saleId]);
  

  const validationSchema = Yup.object({
    price: Yup.string().test(
      "is-decimal",
      "Price must be a decimal number with two decimal places",
      (value) => (value + "").match(/^\d*(\.\d{2})$/)
    ),
  });

  const formik = useFormik({
    initialValues: sale || {
      id: "",
      product: "",
      productId: "",
      quantity: "",
      price: "",
      saleDate: dayjs(Date().now).format("YYYY-MM-DDTHH:mm:ss"),
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      await axios
        .put(process.env.APIURL + "/sales/"+saleId, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.status == 200) {
            openSnackbar("Sales updated successfully", "success");
          } else {
            openSnackbar(res.data.message, "error");
          }
        })
        .catch((err) => {
          openSnackbar(err.response.data.message, "error");
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
  });

  if (loading) {
    return <Layout>loading...</Layout>;
  }
  return (
    <Layout>
      <form onSubmit={formik.handleSubmit}>
        <BGrid>
          <Grid item xs={12}>
            <h1 className="text-xl text-darkaccent-100 font-semibold overflow-ellipsis">
              Edit Sale
            </h1>
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
            id="productId"
            name="productId"
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
                  formik.setFieldValue("productId", value.id);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className=" bg-darkaccent-800 rounded-lg"
                  required
                  variant="filled"
                  color="light"
                  label="Product"
                  InputLabelProps={{
                    className: "text-darkaccent-100",
                  }}
                  InputProps={{
                    ...params.InputProps,
                    className: "text-darkaccent-100",
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
              id="quantity"
              name="quantity"
              label="Quantity"
              placeholder="e.g. 10"
              variant="filled"
              margin="normal"
              color="light"
              InputLabelProps={{
                className: "text-darkaccent-100",
                shrink: true,
              }}
              InputProps={{
                className: "text-darkaccent-100",
              }}
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
              InputLabelProps={{
                className: "text-darkaccent-100",
                shrink: true,
              }}
              InputProps={{
                className: "text-darkaccent-100",
              }}
              className=" bg-darkaccent-800 rounded-lg"
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
            <DatePicker
              defaultValue={dayjs(Date.now()).format("YYYY-MM-DDTHH:mm:ss")}
              className=" rounded-lg"
              label="Sale Date"
              slotProps={{
                field: { className: "text-darkaccent-100" },
                textField: {
                  variant: "filled",
                  color: "light",
                  className:
                    " text-darkaccent-100 bg-darkaccent-800 rounded-lg",
                },
              }}
              value={selectedDates}
              onChange={(date) => {
                handleDateChange(dayjs(date));
                formik.setFieldValue(
                  "saleDate",
                  dayjs(date).format("YYYY-MM-DDTHH:mm:ss")
                );
              }}
            />

            
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              className="text-white bg-darkshade-400 font-semibold lowercase p-2 rounded-lg"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </Grid>
        </BGrid>
      </form>
    </Layout>
  );
};

export default EditSales;
