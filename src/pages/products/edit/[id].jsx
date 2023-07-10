//add product page
import Layout from "@/components/Layout";
import BGrid from "@/components/ui/BGrid";
import { useStateContext } from "@/contexts/ContextProvider";
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
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { Fragment, useEffect, useRef, useState } from "react";
import * as Yup from "yup";

const EditProduct = () => {
  const router = useRouter();

  const { openSnackbar } = useStateContext();
  const openSnackbarRef = useRef(openSnackbar);
  const [data, setData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const productId = router.query.id;

  // Update the ref value whenever openSnackbar changes
  useEffect(() => {
    openSnackbarRef.current = openSnackbar;
  }, [openSnackbar]);

  useEffect(() => {
    console.log(productId);
    let isCancelled = false;
    async function fetchData() {
      try {
        const [categoriesRes, productRes] = await Promise.all([
          axios.get(process.env.APIURL + "/categories", {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }),
          axios.get(process.env.APIURL + "/products/" + productId, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }),
        ]);

        setOptions(categoriesRes.data);
        const product = productRes.data;
        product.price = product.price.toFixed(2);
        product.cost = product.cost.toFixed(2);
        setData(product);

        const category = categoriesRes.data.find(
          (category) => category.id === productRes.data.categoryId
        );
        setSelectedOption(category);
      } catch (error) {
        console.log(error);
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
  }, [productId]);

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
    initialValues: data || {
      name: "",
      sku: "",
      description: "",
      price: 0,
      cost: 0,
      categoryId: 1,
      dateTimeCreated: "",
      dateTimeUpdated: "",
      quantity: 0,
      restockLevel: 0,
    },
    enableReinitialize: true,
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
                InputLabelProps={{
                  shrink: true,
                }}
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
                InputLabelProps={{
                  shrink: true,
                }}
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
                InputLabelProps={{
                  shrink: true,
                }}
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
                InputLabelProps={{
                  shrink: true,
                }}
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
                InputLabelProps={{
                  shrink: true,
                }}
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
                isOptionEqualToValue={(option, value) =>
                  value != undefined ? option.id === value.id : false
                }
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
                        <Fragment>
                          {loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </Fragment>
                      ),
                    }}
                  />
                )}
              />

              {/*Product Quantity and restock level */}
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
                InputLabelProps={{
                  shrink: true,
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
                id="restockLevel"
                name="restockLevel"
                label="Restock Level"
                placeholder="50"
                variant="filled"
                margin="normal"
                color="light"
                InputLabelProps={{
                  shrink: true,
                }}
                className=" bg-darkaccent-800 rounded-lg"
                value={formik.values.restockLevel}
                onChange={formik.handleChange}
                error={
                  formik.touched.restockLevel &&
                  Boolean(formik.errors.restockLevel)
                }
                helperText={
                  formik.touched.restockLevel && formik.errors.restockLevel
                }
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
