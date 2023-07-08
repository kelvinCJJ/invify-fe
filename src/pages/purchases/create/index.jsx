//add supplier page
import React from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useState } from "react";
import BGrid from "@/components/ui/BGrid";
import { useStateContext } from "@/contexts/ContextProvider";

const CreateSupplier = () => {
  const router = useRouter();
  const { openSnackbar } = useStateContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      setIsSubmitting(true);
      axios
        .post(process.env.APIURL + "/suppliers", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            openSnackbar("Supplier created successfully", "success");
            formik.setValues({
              name: "",
            });
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

  return (
    <Layout>
      <form onSubmit={formik.handleSubmit}>
        <BGrid>
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
              placeholder="John Supplies"
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
            <TextField
              required
              fullWidth
              id="contactname"
              name="contactname"
              label="ContactName"
              placeholder="John Doe"
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
              value={formik.values.contactname}
              onChange={formik.handleChange}
              error={
                formik.touched.contactname && Boolean(formik.errors.contactname)
              }
              helperText={
                formik.touched.contactname && formik.errors.contactname
              }
            />
            <TextField
              required
              fullWidth
              id="phone"
              name="phone"
              label="Contact Number"
              placeholder="91234231"
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
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <TextField
              required
              fullWidth
              id="email"
              name="email"
              label="Email"
              placeholder="johndoe@gmail.com"
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
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
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

export default CreateSupplier;
