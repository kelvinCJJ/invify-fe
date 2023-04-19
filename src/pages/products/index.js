import EnhancedTable from "@/components/ui/EnhancedTable";
import Layout from "@/components/Layout";
import { Container } from "@mui/material";
import React from "react";

const Product = () => {
  return (
    <Layout>
      <div className="container">
        <h1>Product</h1>
        <EnhancedTable/>
        
      </div>
    </Layout>
  );
};

export default Product;
