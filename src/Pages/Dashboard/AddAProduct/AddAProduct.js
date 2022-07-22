import { Button, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddAProduct = () => {
	const [product, setProduct] = useState({});
	const [open, setOpen] = useState(false);

	const handleChange = (e) => {
		const newProduct = { ...product };
		const field = e.target.name;
		const value = e.target.value;
		newProduct[field] = value;
		setProduct(newProduct);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("https://cryptic-mesa-14109.herokuapp.com/product", product)
			.then((result) => {
				if (result.data.insertedId) {
					handleOpen();
				}
			});
	};

	const navigate = useNavigate();

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		navigate("/");
		setOpen(false);
	};

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
	return (
		<div className='mt-5 d-flex align-items-center justify-content-center'>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={style}>
					<Typography id='modal-modal-title' variant='h6' component='h2'>
						Successfull!
					</Typography>
					<Button onClick={handleClose} variant='outlined'>
						Go to Home
					</Button>
				</Box>
			</Modal>
			<form className='w-75 mt-5' onSubmit={handleSubmit}>
				<h2 className='my-3 text-center'>Add a Product</h2>
				<FloatingLabel controlId='floatingName' label='Name' className='mb-3'>
					<Form.Control
						onChange={handleChange}
						name='name'
						type='text'
						placeholder='Name'
					/>
				</FloatingLabel>
				<FloatingLabel className='my-3' controlId='floatingprice' label='Price'>
					<Form.Control
						onChange={handleChange}
						name='price'
						type='text'
						placeholder='Price'
					/>
				</FloatingLabel>
				<FloatingLabel controlId='floatingTextarea2' label='Description'>
					<Form.Control
						onChange={handleChange}
						name='description'
						as='textarea'
						placeholder='Description'
						className='my-3'
						style={{ height: "100px" }}
					/>
				</FloatingLabel>
				<FloatingLabel
					controlId='floatingImageLink'
					label='Image Link'
					className='my-3'>
					<Form.Control
						onChange={handleChange}
						name='img'
						type='text'
						placeholder='Image Link'
					/>
				</FloatingLabel>
				<Button type='submit' variant='contained'>
					Submit
				</Button>
			</form>
		</div>
	);
};

export default AddAProduct;
