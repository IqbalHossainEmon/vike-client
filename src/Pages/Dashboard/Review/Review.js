import { Rating } from "@mui/material";
import React, { useState } from "react";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import useAuth from "../../../hooks/useAuth";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

const Review = () => {
	const [rattingPoint, setRattingPoint] = useState(0);
	const [review, setReview] = useState({});
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const { user } = useAuth();
	const handleChange = (e) => setReview(e.target.value);

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		borderRadius: "40px",
		bgcolor: "white",
		border: "2px solid rgba(0,0,0,0.5)",
		boxShadow: 24,
		p: 4,
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
		alignItems: "center",
	};

	const navigate = useNavigate();

	const gotohome = () => {
		navigate("/");
	};

	const handleRatting = (e) => {
		if (e.target.value) {
			setRattingPoint(e.target.value);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const submitForm = {
			name: user.displayName,
			email: user.email,
			ratting: rattingPoint,
			review,
		};
		axios
			.post("https://cryptic-mesa-14109.herokuapp.com/reviews", { submitForm })
			.then((result) => {
				if (result.data.insertedId) {
					handleOpen();
				}
			});
	};
	return (
		<div className='d-flex mt-5 align-items-center justify-content-center'>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={style}>
					<Typography
						id='modal-modal-title'
						variant='h6'
						color='green'
						component='h2'>
						Successfull!
					</Typography>
					<Typography
						id='modal-modal-description'
						sx={{ mt: 2, textAlign: "center" }}>
						We have your Review successfully. <br /> Thank you.
					</Typography>
					<Button onClick={gotohome} variant='outlined'>
						Go To Home
					</Button>
				</Box>
			</Modal>
			<Form className='w-75 ' onSubmit={handleSubmit}>
				<h3 className='text-center'>Your Review about us</h3>
				<Form.Group as={Row} className='mb-3' controlId='formPlaintextEmail'>
					<Form.Label column sm='2'>
						Email
					</Form.Label>
					<Col sm='10'>
						<Form.Control plaintext readOnly defaultValue={user?.email} />
					</Col>
				</Form.Group>
				<Form.Group as={Row} className='mb-3' controlId='formPlaintextName'>
					<Form.Label column sm='2'>
						Name
					</Form.Label>
					<Col sm='10'>
						<Form.Control plaintext readOnly defaultValue={user?.displayName} />
					</Col>
				</Form.Group>

				<Rating
					onClick={handleRatting}
					name='half-rating'
					defaultValue={2.5}
					precision={0.5}
				/>
				<FloatingLabel controlId='floatingTextarea2' label='Describe'>
					<Form.Control
						onChange={handleChange}
						as='textarea'
						placeholder='Leave a comment here'
						style={{ height: "100px" }}
					/>
				</FloatingLabel>
				<Button type='submit' variant='contained' sx={{ mt: 3 }}>
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default Review;
