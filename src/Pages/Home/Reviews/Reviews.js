import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Review from "./Review/Review";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    axios
      .get("https://cryptic-mesa-14109.herokuapp.com/reviews")
      .then((result) => setReviews(result.data));
  }, []);
  return (
    <Container className="my-5">
      <h2 className="text-center text-warning my-4">Our Happy Users Review</h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {reviews.map((review) => (
          <Review key={review._id} review={review} />
        ))}
      </Row>
    </Container>
  );
};

export default Reviews;
