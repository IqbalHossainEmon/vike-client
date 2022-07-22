import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const MyOrder = () => {
	const [orders, setOrders] = React.useState([]);
	const [deleteId, setDeleteId] = React.useState("");
	const { user } = useAuth();

	const [open, setOpen] = React.useState(false);
	const handleOpen = (id) => {
		setDeleteId(id);
		setOpen(true);
	};
	const handleClose = () => setOpen(false);

	const handleDelete = () => {
		handleClose();
		axios
			.delete(`https://cryptic-mesa-14109.herokuapp.com/orders/${deleteId}`)
			.then((result) => {
				if (result.data.deletedCount) {
					const remainingOrder = orders.filter(
						(order) => order._id !== deleteId,
					);
					setOrders(remainingOrder);
				}
			});
	};

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

	React.useEffect(() => {
		axios
			.get(
				`https://cryptic-mesa-14109.herokuapp.com/orders?email=${user?.email}`,
			)
			.then((result) => setOrders(result.data));
	}, [user]);

	return (
		<div>
			{/* Modal */}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={style}>
					<Typography id='modal-modal-title' variant='h6' component='h2'>
						Are you sure you want to delete?
					</Typography>
					<Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
						<Button
							onClick={handleDelete}
							sx={{ mx: 2 }}
							variant='outlined'
							color='error'>
							Yes
						</Button>
						<Button
							onClick={handleClose}
							sx={{ mx: 2 }}
							variant='outlined'
							color='success'>
							No
						</Button>
					</Box>
				</Box>
			</Modal>
			{/* modal end */}
			<TableContainer sx={{ mt: 9 }} component={Paper}>
				<h3>My Orders</h3>
				<Table sx={{ minWidth: 650, mt: 4 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>Product name</TableCell>
							<TableCell align='right'>Price</TableCell>
							<TableCell align='right'>Order Status</TableCell>
							<TableCell align='right'>Want To Delete?</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{orders.map((order) => (
							<TableRow
								key={order._id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
								<TableCell component='th' scope='row'>
									{order.productName}
								</TableCell>
								<TableCell align='right'>{order.price}</TableCell>
								<TableCell align='right' sx={{ color: "info.main" }}>
									{order.state}
								</TableCell>
								<TableCell align='right'>
									<Button
										onClick={() => handleOpen(order._id)}
										variant='outlined'
										color='error'>
										Delete
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default MyOrder;
