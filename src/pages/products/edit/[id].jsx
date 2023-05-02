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

const EditProduct = () => {
  const router = useRouter();
  const { openSnackbar } = useStateContext();
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  //const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = useState(true);
  //const loading = open && options.length === 0;
  const [selectedOption, setSelectedOption] = useState(null);
  const productId = router.query.id;
  

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      //getCategories();

      if (active) {
        setOptions(categories);
      }
    })();

    return () => {
      active = false;
    };
  }, [categories, loading]);

  // useEffect(() => {
  //   if (!open) {
  //     setOptions([]);
  //   }
  // }, [open]);

  useEffect(() => {
    if (productId) {
      getProduct();
    }
    //setLoading(false);
  }, [productId]);
  
  async function getCategories() {
    await axios
      .get(process.env.APIURL + "/categories", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        //setCategories(res.data);
        setOptions(res.data);
      });
  }

  const getProduct = async () => {
    try {
      await axios
        .get(process.env.APIURL + "/products/" + productId, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res);
          formik.setValues({
            id: res.data.id,
            name: res.data.name,
            sku: res.data.sku,
            description: res.data.description,
            price: res.data.price.toFixed(2),
            cost: res.data.cost.toFixed(2),
            categoryId: res.data.categoryId,
            dateTimeCreated: res.data.dateTimeCreated,
            dateTimeUpdated: res.data.dateTimeUpdated,
          });
          setCategoryId(res.data.categoryId);
          // setSelectedOption(options.find((option) => option.id === res.data.categoryId)) ? options.find((option) => option.id === res.data.categoryId).name : null;
          setSelectedOption(options.find((option) => option.id === res.data.categoryId));
          setLoading(false);
         
        })
        .catch((err) => {
          openSnackbar(err.response.data.message, "error");
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      openSnackbar("error", "error");
    }
  };



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
      sku: "",
      description: "",
      price: 0,
      cost: 0,
      categoryId: 1,
      dateTimeCreated: "",
      dateTimeUpdated: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setIsSubmitting(true);
      console.log(values);
      axios
        .put(process.env.APIURL + "/products/" + productId, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            openSnackbar(
              "Product [" + values.name + "] updated successfully",
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

  return (
    <Layout>
      <form onSubmit={formik.handleSubmit}>
        <BGrid>
          <Grid item xs={12}>
            <h1 className="text-xl font-semibold overflow-ellipsis">
              Edit Product
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
                id="sku"
                name="sku"
                label="SKU"
                placeholder="e.g. IPHONE12PROMAX"
                variant="filled"
                margin="normal"
                color="light"
                className=" bg-darkaccent-800 rounded-lg"
                value={formik.values.sku}
                onChange={formik.handleChange}
                error={formik.touched.sku && Boolean(formik.errors.sku)}
                helperText={formik.touched.sku && formik.errors.sku}
              />
              <TextField
                required
                fullWidth
                id="description"
                name="description"
                label="Description"
                placeholder="e.g. Apple iPhone 12 Pro Max"
                variant="filled"
                margin="normal"
                color="light"
                InputProps={{
                  multiline: true,
                }}
                className=" bg-darkaccent-800 rounded-lg"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
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
              <TextField
                required
                fullWidth
                id="cost"
                name="cost"
                label="Cost"
                placeholder="e.g. 800.00"
                variant="filled"
                margin="normal"
                color="light"
                className=" bg-darkaccent-800 rounded-lg"
                value={formik.values.cost}
                onChange={formik.handleChange}
                error={formik.touched.cost && Boolean(formik.errors.cost)}
                helperText={formik.touched.cost && formik.errors.cost}
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

export default EditProduct;