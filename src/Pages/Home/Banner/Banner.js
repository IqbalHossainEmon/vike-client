import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Banner = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios
      .get("https://cryptic-mesa-14109.herokuapp.com/carousel")
      .then((result) => setItems(result.data));
  }, []);
  return (
    <Carousel fade interval={2500}>
      {items.map((item) => (
        <Carousel.Item key={item._id}>
          <img className="d-block w-100" src={item.img} alt="First slide" />
          <Carousel.Caption>
            <h3>Ride, Speed, Enjoy</h3>
            <Link to="/products">
              <Button variant="outline-warning">
                Explore Our Collections
                <FontAwesomeIcon className="ms-2" icon={faChevronCircleRight} />
              </Button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Banner;
