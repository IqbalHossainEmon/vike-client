import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Footer from "../Shared/Footer";
import Navigation from "../Shared/Navigation";
import Product from "./Product/Product";

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("https://cryptic-mesa-14109.herokuapp.com/products")
      .then((result) => setProducts(result.data));
  }, []);
  return (
    <>
      <Navigation />
      <Container className="my-5">
        <h2 className="text-center my-5">Our Collections</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Products;
