//add category page
import React from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useState } from "react";
import BGrid from "@/components/ui/BGrid";
import { useStateContext } from "@/contexts/ContextProvider";

const CreateCategory = () => {
  const router = useRouter();
  const {openSnackbar } = useStateContext();
  // const [open, setOpen] = useState(false);
  // const [snackbarMessage, setSnackbarMessage] = useState("");
  // const [severity, setSeverity] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      setIsSubmitting(true);
      axios
        .post(process.env.APIURL + "/categories", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            // router.push({
            //   pathname: "/categories",
            //   //query: { snackbar: res.data.message },
            //   // Replace [id] with the ID of the newly created item
            // });
            openSnackbar("Category created successfully", "success");
            formik.setValues({
              name: "",
            });
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
      {/* <Snackbar
        open={open}
        setOpen={setOpen}
        message={snackbarMessage}
        severity={severity}
      /> */}
      <form onSubmit={formik.handleSubmit} >
        <BGrid >
          <Grid item xs={12}>
            <h1 className="text-xl text-darkaccent-100 font-semibold overflow-ellipsis">
              Create Category
            </h1>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              id="name"
              name="name"
              label="Name"
              placeholder="Enter category name"
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
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
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

export default CreateCategory;
