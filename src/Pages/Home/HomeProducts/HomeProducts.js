import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import HomeProduct from "./HomeProduct/HomeProduct";

const HomeProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("https://cryptic-mesa-14109.herokuapp.com/products?place=home")
      .then((result) => setProducts(result.data));
  }, []);
  return (
    <Container className="my-5">
      <h3 className="text-center my-5">Our best Bikes</h3>
      <Row xs={1} md={2} lg={3} className="g-4">
        {products.map((product) => (
          <HomeProduct key={product._id} product={product} />
        ))}
      </Row>
    </Container>
  );
};

export default HomeProducts;
