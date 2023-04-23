//create sales page
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
  const [products, setProducts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [selectedDate, handleDateChange] = useState(dayjs(new Date()));

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      getProducts();

      if (active) {
        setOptions(products);
      }
    })();

    return () => {
      active = false;
    };
  }, [products, loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  useEffect(() => {
    //getProducts();
  }, []);

  async function getProducts() {
    await axios
      .get(process.env.APIURL + "/products", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        //console.log(res.data);
        setProducts(res.data);
      });
  }

  const validationSchema = Yup.object({
    price: Yup.string().test(
      "is-decimal",
      "Price must be a decimal number with two decimal places",
      (value) => (value+"").match(/^\d*(\.\d{2})$/)
      
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
      console.log(values);
      await axios
        .post(process.env.APIURL + "/sales", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          //console.log(res);
          if (res.status == 200) {
            openSnackbar(
              "Sales created successfully",
              "success"
            );
            formik.resetForm();
          } else {
            openSnackbar(res.data.message, "error");
          }
        })
        .catch((err) => {
          //console.log(err);
          openSnackbar(err.response.data.message, "error");
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
  });

  return (
    <Layout>
        <form onSubmit={formik.handleSubmit}>
          <BGrid>
            <Grid item xs={12}>
              <h1 className="text-xl text-darkaccent-100 font-semibold overflow-ellipsis">
                Create Sale
              </h1>
            </Grid>
            <Grid item xs={12} md={6}>
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
                error={
                  formik.touched.quantity && Boolean(formik.errors.quantity)
                }
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
                defaultValue={dayjs(Date.now()).format('YYYY-MM-DDTHH:mm:ss')}

                className=" rounded-lg"
                label="Sale Date"
                slotProps={{
                  field: { className:"text-darkaccent-100"},
                  textField: { variant:"filled", color:"light", className:" text-darkaccent-100 bg-darkaccent-800 rounded-lg" },
                }}
                value = {selectedDate}
                //value={dayjs(selectedDate)}
                //value={dayjs(selectedDate)}
                onChange={(date) => {handleDateChange(dayjs(date))  
                  //formik.handleChange                
                  // formik.setFieldValue("saleDate", dayjs(date).format('YYYY-MM-DD HH:mm:ss'));
                  formik.setFieldValue("saleDate", dayjs(date).format('YYYY-MM-DDTHH:mm:ss'));
                
                }}
                
              />

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
