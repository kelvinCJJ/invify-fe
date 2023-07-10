//add product page
import Layout from "@/components/Layout";
import BGrid from "@/components/ui/BGrid";
import { useStateContext } from "@/contexts/ContextProvider";
import {
  Autocomplete,
  Button,
  CircularProgress,
  Grid,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { Fragment, useEffect, useRef, useState } from "react";
import * as Yup from "yup";

const EditPurchase = () => {
  const router = useRouter();
  const { openSnackbar } = useStateContext();
  const openSnackbarRef = useRef(openSnackbar);
  const [purchase, setPurchase] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [openSupplier, setOpenSupplier] = useState(false);
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSupplierOption, setSelectedSupplierOption] = useState(null);
  const [selectedProductOption, setSelectedProductOption] = useState(null);
  const [selectedDates, setSelectedDate] = useState(null);
  const purchaseId = router.query.id;

  useEffect(() => {
    openSnackbarRef.current = openSnackbar;
  }, [openSnackbar]);

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      try {
        const [suppliersRes, productRes, purchasesRes] = await Promise.all([
          axios.get(process.env.APIURL + "/suppliers", {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }),
          axios.get(process.env.APIURL + "/products/idandname", {
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

        setSupplierOptions(suppliersRes.data);
        setProductOptions(productRes.data);
        const purchase = purchasesRes.data;
        purchase.price = purchase.price.toFixed(2);
        purchase.purchaseDate = dayjs(purchase.purchaseDate);
        setPurchase(purchasesRes.data);
        setSelectedDate(purchase.purchaseDate);
        // setSupplierId(purchasesRes.data.supplierId);
        const supplier = suppliersRes.data.find(
          (supplier) => supplier.id === purchasesRes.data.supplierId
        );
        setSelectedSupplierOption(supplier);
        const product = productRes.data.find(
          (product) => product.id === purchasesRes.data.productId
        );
        setSelectedProductOption(product);
      } catch (error) {
        console.log(error);
        openSnackbarRef.current(error.message, "error");
      }
    };

    if (!isCancelled) {
      setLoading(true);
      fetchData();
      setLoading(false);
    }
    return () => {
      isCancelled = true;
    };
  }, [purchaseId]);

  const validationSchema = Yup.object({
    price: Yup.string().test(
      "is-decimal",
      "Price must be a decimal number with two decimal places",
      (value) => (value + "").match(/^\d*(\.\d{2})$/)
    ),
  });

  const formik = useFormik({
    initialValues: purchase || {
      productId: 1,
      supplierId: 1,
      quantity: 1,
      price: 1,
      purchaseDate: dayjs(Date().now).format("YYYY-MM-DDTHH:mm:ss"),
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setIsSubmitting(true);
      console.log("test");
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
            openSnackbarRef.current("Purchase updated successfully",
            "success");
          } else {
            openSnackbarRef.current(res.data.message, "error");
          }
        })
        .catch((error) => {
          console.log(error);
          openSnackbarRef.current(error.message, "error");
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
              Edit Purchases
            </h1>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="">
              <Autocomplete
                open={openProduct}
                color="light"
                onOpen={() => {
                  setOpenProduct(true);
                }}
                onClose={() => {
                  setOpenProduct(false);
                }}
                isOptionEqualToValue={(option, value) =>
                  value != undefined ? option.id === value.id : false
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                options={productOptions}
                loading={loading}
                defaultValue={selectedProductOption}
                value={selectedProductOption}
                onChange={(event, value) => {
                  if (value) {
                    setSelectedProductOption(value);
                    formik.setFieldValue("productId", value.id);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className=" bg-darkaccent-800 rounded-lg"
                    variant="filled"
                    color="light"
                    label="Product"
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
              <Autocomplete
                open={openSupplier}
                color="light"
                onOpen={() => {
                  setOpenSupplier(true);
                }}
                onClose={() => {
                  setOpenSupplier(false);
                }}
                isOptionEqualToValue={(option, value) =>
                  value != undefined ? option.id === value.id : false
                }
                getOptionLabel={(option) => (option.name ? option.name : "")}
                options={supplierOptions}
                loading={loading}
                defaultValue={selectedSupplierOption}
                value={selectedSupplierOption}
                onChange={(event, value) => {
                  if (value) {
                    setSelectedSupplierOption(value);
                    formik.setFieldValue("supplierId", value.id);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className=" bg-darkaccent-800 rounded-lg"
                    variant="filled"
                    color="light"
                    label="Supplier"
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
              <DatePicker
                defaultValue={dayjs(Date.now()).format("YYYY-MM-DDTHH:mm:ss")}
                className=" rounded-lg"
                label="Date of Purchase"
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
                  setSelectedDate(dayjs(date));
                  formik.setFieldValue(
                    "purchaseDate",
                    dayjs(date).format("YYYY-MM-DDTHH:mm:ss")
                  );
                }}
              />
              <div className="mt-4">
              <Button
                type="submit"
                className="text-white bg-darkshade-400 font-semibold lowercase p-2 rounded-lg"
                disabled={isSubmitting}
              >
                Submit
              </Button>
              </div>
            </div>
          </Grid>
        </BGrid>
      </form>
    </Layout>
  );
};

export default EditPurchase;
