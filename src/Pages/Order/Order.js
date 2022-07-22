import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Button, Form, Row, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Footer from "../Shared/Footer";
import Navigation from "../Shared/Navigation";

const Order = () => {
	const { id } = useParams();
	const [product, setProduct] = useState({});
	const [show, setShow] = useState(false);

	const { user } = useAuth();

	const navigate = useNavigate();

	const [order, setOrder] = useState({
		name: user.displayName,
		email: user.email,
	});

	useEffect(() => {
		const newOrder = { ...order };
		newOrder.productName = product.name;
		newOrder.price = product.price;
		setOrder(newOrder);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [product]);

	const handleClose = () => {
		navigate("/");
		setShow(false);
	};
	const handleShow = () => setShow(true);

	const handleChange = (e) => {
		const field = e.target.name;
		const value = e.target.value;
		const newOrder = { ...order };
		newOrder[field] = value;
		setOrder(newOrder);
	};

	useEffect(() => {
		axios
			.get(`https://cryptic-mesa-14109.herokuapp.com/product/${id}`)
			.then((result) => setProduct(result.data));
	}, [id]);

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("https://cryptic-mesa-14109.herokuapp.com/order", { order })
			.then((result) => {
				if (result.data.insertedId) {
					handleShow();
				}
			});
	};

	return (
		<Box>
			<Navigation />
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Congratulations</Modal.Title>
				</Modal.Header>
				<Modal.Body className='text-success'>
					Woohoo, you ordered successfully
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Go To Home
					</Button>
				</Modal.Footer>
			</Modal>
			<div
				style={{
					backgroundImage: `url(${product.img})`,
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
				}}
				className='d-flex flex-column justify-content-center align-items-center'>
				<Form
					className='d-flex flex-column my-5 text-white'
					onSubmit={handleSubmit}>
					<h2 className='text-center my-3'>Order</h2>
					<div>
						<Form.Group className='mb-3' controlId='formGridAddress2'>
							<Form.Label>Your Name</Form.Label>
							<Form.Control
								name='name'
								onChange={handleChange}
								value={order.name || ""}
								placeholder='Your Name'
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='formGridAddress1'>
							<Form.Label>Your Email</Form.Label>
							<Form.Control
								name='email'
								onChange={handleChange}
								value={order.email || ""}
								placeholder='Your Email'
							/>
						</Form.Group>
						<Row className='mb-3'>
							<Form.Group as={Col} controlId='formGridEmail'>
								<Form.Label>Your Address</Form.Label>
								<Form.Control
									name='address'
									onChange={handleChange}
									type='text'
									placeholder='Your Address'
								/>
							</Form.Group>

							<Form.Group as={Col} controlId='formGridPassword'>
								<Form.Label>Your Phone Number</Form.Label>
								<Form.Control
									name='phone'
									onChange={handleChange}
									type='text'
									placeholder='Your Phone Number'
								/>
							</Form.Group>
						</Row>

						<Row className='mb-3'>
							<Form.Group as={Col} controlId='formGridCity'>
								<Form.Label>Product Name</Form.Label>
								<Form.Control
									name='productName'
									type='text'
									readOnly
									defaultValue={order.productName || ""}
								/>
							</Form.Group>

							<Form.Group
								as={Col}
								className='mb-3'
								controlId='formPlaintextEmail'>
								<Form.Label sm='2'>Product Price</Form.Label>

								<Form.Control readOnly defaultValue={order.price || ""} />
							</Form.Group>
						</Row>
					</div>
					<Button variant='primary' type='submit'>
						Submit
					</Button>
				</Form>
			</div>
			<Footer />
		</Box>
	);
};

export default Order;
