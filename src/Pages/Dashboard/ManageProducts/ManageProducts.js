import { Grid } from "@mui/material";
import axios from "axios";
import * as React from "react";
import Product from "./Product";

const ManageProducts = () => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("https://cryptic-mesa-14109.herokuapp.com/products")
      .then((result) => setProducts(result.data));
  }, []);
  return (
    <div className="mt-5">
      <h2 className="my-5">Manage Products</h2>
      <Grid container spacing={5}>
        {products.map((product) => (
          <Product
            key={product._id}
            product={product}
            products={products}
            setProducts={setProducts}
          />
        ))}
      </Grid>
    </div>
  );
};

export default ManageProducts;
