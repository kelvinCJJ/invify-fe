//add category page
import Layout from "@/components/Layout";
import BGrid from "@/components/ui/BGrid";
import { useStateContext } from "@/contexts/ContextProvider";
import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const EditSupplier = () => {
  const router = useRouter();
  const [supplier, setSupplier] = useState();
  const { openSnackbar } = useStateContext();
  const openSnackbarRef = useRef(openSnackbar);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const supplierId = router.query.id;
  
  // Update the ref value whenever openSnackbar changes
  useEffect(() => {
    openSnackbarRef.current = openSnackbar;
  }, [openSnackbar]);

  const formik = useFormik({
    initialValues: supplier || {},
    enableReinitialize: true,
    onSubmit: (values) => {
      //edit supplier
      axios
        .put(process.env.APIURL + "/suppliers/" + supplierId, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.status == 200) {
            openSnackbarRef.current("Supplier updated successfully", "success");
          }
        })
        .catch((err) => {
          openSnackbarRef.current(err.response.data.message, 'error');
        });
    },
  });

   useEffect(() => {
    let isCancelled = false;

    async function getSupplier() {
      try {       
  
        await axios
          .get(process.env.APIURL + "/suppliers/" + supplierId,
           {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })  
          .then((res) => {
            setSupplier(res.data);
          })
      } catch (error) {
        openSnackbarRef.current(error.message, 'error');
      }
    };
    
    if(!isCancelled)
    {
      setLoading(true);
      getSupplier();
      setLoading(false);

    }
      return () => {
        isCancelled = true;
      }
  }, [supplierId]);

  if (loading) { 
    return <Layout>Loading...</Layout>
}
  return (
    <Layout>
      <form onSubmit={formik.handleSubmit}>
        <BGrid>
          <Grid item xs={12}>
            <h1 className="text-xl text-darkaccent-100 font-semibold overflow-ellipsis">
              Edit Supplier
            </h1>
          </Grid>
          <Grid xs={6}>
            <TextField
              required
              fullWidth
              id="name"
              name="name"
              label="Name"
              variant="filled"
              margin="normal"
              color="light"
              InputLabelProps={{
                className: "text-darkaccent-100",
                shrink: true
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
              id="contactName"
              name="contactName"
              label="Contact Name"
              placeholder="John Doe"
              variant="filled"
              margin="normal"
              color="light"
              InputLabelProps={{
                className: "text-darkaccent-100",
                shrink: true
              }}
              InputProps={{
                className: "text-darkaccent-100",
              }}
              className=" bg-darkaccent-800 rounded-lg"
              value={formik.values.contactName}
              onChange={formik.handleChange}
              error={formik.touched.contactName && Boolean(formik.errors.contactName)}
              helperText={formik.touched.contactName && formik.errors.contactName}
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
                shrink: true
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
                shrink: true
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

export default EditSupplier;
