import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useRef } from "react";
import useAuth from "../../../hooks/useAuth";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";

const MakeAdmin = () => {
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		borderRadius: "40px",
		bgcolor: "background.paper",
		border: "2px solid rgba(0,0,0,0.5)",
		boxShadow: 24,
		p: 4,
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
		alignItems: "center",
	};

	const navigate = useNavigate();

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		navigate("/");
		setOpen(false);
	};

	const emailRef = useRef();
	const { admin } = useAuth();

	const handleAdmin = () => {
		const email = emailRef.current.value;
		const userRole = admin;
		axios
			.put("https://cryptic-mesa-14109.herokuapp.com/user/admin", {
				email,
				userRole,
			})
			.then((result) => {
				if (result.data.message === "Successfull") {
					handleOpen();
				}
			});
	};

	return (
		<>
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
			<div className='mt-5'>
				<h2>Make anyone Admin</h2>
				<div className='mt-5 d-flex  flex-column align-items-center justify-content-center'>
					<TextField
						sx={{ width: "45%" }}
						id='filled-basic'
						label='Email'
						inputRef={emailRef}
						variant='filled'
					/>
					<Button onClick={handleAdmin} sx={{ my: 3 }} variant='outlined'>
						Make Admin
					</Button>
				</div>
			</div>
		</>
	);
};

export default MakeAdmin;
