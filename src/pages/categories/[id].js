import Layout from "@/components/Layout";
import { Container } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

function CategoryDetail() {
 const router = useRouter();
 const { id } = router.query;

 //get category by id
  useEffect(() => {
    if (id) {
      console.log(id);
      getCategories(id);
    }
  }, [id]);

  async function getCategories(id) {
    try {
      await axios
        .get(process.env.APIURL + "/categories/"+id, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res.data);
          setRowData(res.data);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Layout>
      <div className="container">
        <h1>Category {id}</h1>
        
        
      </div>
    </Layout>
  );
};

export default CategoryDetail;
