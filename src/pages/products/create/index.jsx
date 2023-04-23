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

const CreateProduct = () => {
  const router = useRouter();
  const { openSnackbar } = useStateContext();
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  //const [loading, setLoading] = useState(true);
  const loading = open && options.length === 0;
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    let active = true;

    // if (!loading) {
    //   return undefined;
    // }

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

  useEffect(() => {
    getCategories();
  }, []);

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
        formik.setFieldValue("categoryId", res.data[0].id);
      });
  }

  const validationSchema = Yup.object({
    price: Yup.string()
      .test(
        'is-decimal',
        'Price must be a decimal number with two decimal places',
        (value) => (value + "").match(/^\d*(\.\d{2})$/)
      ),
    cost: Yup.string()
        .test(
            'is-decimal',
            'Cost must be a decimal number with two decimal places',
            (value) => (value + "").match(/^\d*(\.\d{2})$/)
        )
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      sku: "",
      description: "",
      price: "",
      cost: "",
      categoryId: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setIsSubmitting(true);
      //console.log(values);
      axios
        .post(process.env.APIURL + "/products", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          //console.log(res);
          if (res.status == 200) {
            openSnackbar(
              "Product [" + values.name + "] created successfully",
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
              Create Product
            </h1>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required fullWidth id="name" name="name" label="Product Name"
              placeholder="e.g. Apple iPhone 12 Pro Max" variant="filled" margin="normal" color="light"
              
              className=" bg-darkaccent-800 rounded-lg"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              required fullWidth id="sku" name="sku" label="SKU"
              placeholder="e.g. IPHONE12PROMAX" variant="filled" margin="normal" color="light"
              InputLabelProps={{
                className: "text-darkaccent-100",
              }}
              InputProps={{
                className: "text-darkaccent-100",
              }}
              className=" bg-darkaccent-800 rounded-lg"
              value={formik.values.sku}
              onChange={formik.handleChange}
              error={formik.touched.sku && Boolean(formik.errors.sku)}
              helperText={formik.touched.sku && formik.errors.sku}
            />
            <TextField
              required fullWidth id="description" name="description" label="Description"
              placeholder="e.g. Apple iPhone 12 Pro Max" variant="filled" margin="normal" color="light"
              InputLabelProps={{
                className: "text-darkaccent-100",
              }}
              InputProps={{
                className: "text-darkaccent-100",
                multiline: true,
              }}
              className=" bg-darkaccent-800 rounded-lg"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
            <TextField
              required fullWidth id="price" name="price" label="Price"
              placeholder="e.g. 1000.00" variant="filled" margin="normal" color="light"
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
            <TextField
              required fullWidth id="cost" name="cost" label="Cost"
              placeholder="e.g. 800.00" variant="filled" margin="normal" color="light"
              InputLabelProps={{
                className: "text-darkaccent-100",
              }}
              InputProps={{
                className: "text-darkaccent-100",
              }}
              className=" bg-darkaccent-800 rounded-lg"
              value={formik.values.cost}
              onChange={formik.handleChange}
              error={formik.touched.cost && Boolean(formik.errors.cost)}
                helperText={formik.touched.cost && formik.errors.cost}
            />
            <div>
              {/* <FormGroup color="light">
                <InputLabel id="category">Category</InputLabel>
                <Select
                  id="category"
                  value={formik.values.categoryId}
                  onChange={formik.handleChange("categoryId")}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
                {formik.errors.category && <p>{formik.errors.category}</p>}
              </FormGroup> */}
              <Autocomplete
                open={open}
                color="light"
                onOpen={() => {
                  setOpen(true);
                }}
                onClose={() => {
                  setOpen(false);
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => (option.name ? option.name : "")}
                options={categories}
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
            </div>
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

export default CreateProduct;
