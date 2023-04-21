//add category page
import React from "react";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";

const EditCategory = (id) => {
  const router = useRouter();
  const [category, setCategory] = React.useState([]);

  React.useEffect(() => {
    axios.get(process.env.APIURL + "/categories/" + router.query.id)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router.query.id]);

  const formik = useFormik({
    initialValues: {
      id: category.id,
      name: category.name,
    },
    onSubmit: (values) => {
      //edit category
      axios.put(process.env.APIURL + "/categories/" + values.id, values,{
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          router.push({
            pathname: process.env.APIURL + "/categories",
            query: { snackbar: "Category [] updated successfully" },
            // Replace [id] with the ID of the newly created item
          });
        }
      })
      .catch((err) => {
        
      });
    },
  });

  return (
    <Layout>
      <form onSubmit={formik.handleSubmit}>
        <input
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </Layout>
  );
};

export default EditCategory;
