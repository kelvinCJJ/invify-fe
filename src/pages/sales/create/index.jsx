//create sales page
import React, { useRef } from "react";
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

const CreateSales = () => {
  const router = useRouter();
  const { openSnackbar } = useStateContext();  
  const openSnackbarRef = useRef(openSnackbar);
  const [products, setProducts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedDate, handleDateChange] = useState(dayjs(new Date()));

  
  useEffect(() => {
    openSnackbarRef.current = openSnackbar;
  }, [openSnackbar]);

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      try {
        const [ productRes] = await Promise.all([
          axios.get(process.env.APIURL + "/products/idandname", {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }),
        ]);
        setProductOptions(productRes.data);
      } catch (error) {
        openSnackbarRef.current(error.message, "error");
      }
    };


  const validationSchema = Yup.object({
    price: Yup.string().test(
      "is-decimal",
      "Price must be a decimal number with two decimal places",
      (value) => (value + "").match(/^\d*(\.\d{2})$/)
    ),
  });

  const formik = useFormik({
    initialValues: {
      productId: "",
      quantity: "",
      price: "",
      saleDate: dayjs(Date().now).format("YYYY-MM-DDTHH:mm:ss"),
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      await axios
        .post(process.env.APIURL + "/sales", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.status == 200) {
            openSnackbar("Sales created successfully", "success");
            formik.resetForm();
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
              Create Sale
            </h1>
          </Grid>
          <Grid xs={6}>
            <Autocomplete
              open={open}
              color="light"
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              isOptionEqualToValue={(option, value) =>
                option.name === value.name
              }
              getOptionLabel={(option) => option.name}
              options={options}
              loading={loading}
              onChange={(event, value) => {
                formik.setFieldValue("productId", value.id);
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
              // defaultValue={dayjs(Date.now())}
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
              value={selectedDate}
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

export default CreateSales;
