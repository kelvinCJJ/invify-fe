//add category page
import { Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { useStateContext } from "@/contexts/ContextProvider";
import { useEffect, useState } from "react";
import BGrid from "@/components/ui/BGrid";

const EditCategory = () => {
  const router = useRouter();
  const [category, setCategory] = useState();
  const { openSnackbar } = useStateContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const categoryId = router.query.id;
  
  const getCategory = async () => {
    try {
      
      await axios
        .get(process.env.APIURL + "/categories/" + categoryId,
         {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })

        .then((res) => {
          formik.setValues({
            id: res.data[0].id,
            name: res.data[0].name,
            dateTimeCreated: res.data[0].dateTimeCreated,
          });
        })
        .catch((err) => {
          openSnackbar(err.response.data.message, "error");
        });
    } catch (error) {
      openSnackbar("error", "error");
    }
  };
  useEffect(() => {
    if (categoryId) {
      getCategory();
    }  
  setLoading(false);
  }, [categoryId]);


  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      dateTimeCreated: '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      //edit category
      axios
        .put(process.env.APIURL + "/categories/" + categoryId, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.status == 200) {
            openSnackbar("Category updated successfully", "success");
          }
        })
        .catch((err) => {
          openSnackbar(err.response.data.message, "error");
        });
    },
  });

  // if (loading) return <p>Loading...</p>
  return (
    <Layout>
      <form onSubmit={formik.handleSubmit}>
        <BGrid>
          <Grid item xs={12}>
            <h1 className="text-xl text-darkaccent-100 font-semibold overflow-ellipsis">
              Edit Category
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

export default EditCategory;
