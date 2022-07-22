import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Card, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <Col>
      <Card>
        <Card.Img variant="top" src={product.img} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>Price: $ {product.price}</Card.Text>
          <Card.Text>{product.description}</Card.Text>
          <Button as={Link} to={`/order/${product._id}`}>
            Order now
            <FontAwesomeIcon className="ms-2" icon={faArrowAltCircleRight} />
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Product;
