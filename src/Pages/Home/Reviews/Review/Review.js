import { Rating } from "@mui/material";
import React from "react";
import { Card, Col } from "react-bootstrap";

const Review = ({ review }) => {
	return (
		<Col>
			<Card>
				<Card.Body>
					<Card.Title className='text-center my-3'>{review.name}</Card.Title>
					<Card.Title className='text-center my-3'>{review.email}</Card.Title>
					<Rating
						name='half-rating'
						readOnly
						defaultValue={parseFloat(review.ratting)}
						precision={0.5}
					/>
					<Card.Text className='text-center mb-3'>{review.review}</Card.Text>
				</Card.Body>
			</Card>
		</Col>
	);
};

export default Review;
