import axios from "axios";
import { Carousel } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "./Gallery.css";

const Gallery = () => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    axios
      .get("https://cryptic-mesa-14109.herokuapp.com/gallery")
      .then((result) => setImages(result.data));
  }, []);
  return (
    <div className="my-5">
      <div className="d-flex flex-lg-row flex-column align-items-center justify-content-center px-5 my-5">
        <h3 className="h3Border pe-md-5 d-inline-block my-3 py-3">
          WE IMPORT YOUR <br />
          <span className="text-danger"> DREAM BIKE</span>
        </h3>
        <h4
          style={{ letterSpacing: "7px" }}
          className="mx-5 h4design letter my-3"
        >
          BEST VALUE
          <br /> & <br /> SATISFACTION
        </h4>
      </div>
      <Carousel controls={false}>
        {images.map((image) => (
          <Carousel.Item key={image._id}>
            <img className="d-block w-100" src={image.img} alt="First slide" />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Gallery;
