import {
	Button,
	Paper,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import axios from "axios";
import Table from "@mui/material/Table";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useNavigate, Outlet } from "react-router";

const Pay = () => {
	const [orders, setOrders] = React.useState([]);
	const { user } = useAuth();

	const navigate = useNavigate();

	React.useEffect(() => {
		axios
			.get(
				`https://cryptic-mesa-14109.herokuapp.com/orders?email=${user?.email}`,
			)
			.then((result) => setOrders(result.data));
	}, [user]);

	const handlePay = (id) => {
		navigate(`/dashboard/payment/${id}`);
	};

	return (
		<div>
			<TableContainer sx={{ mt: 9 }} component={Paper}>
				<h3>My Orders</h3>
				<Table sx={{ minWidth: 650, mt: 4 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>Product name</TableCell>
							<TableCell align='right'>Price</TableCell>
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
								<TableCell align='right'>
									<Button
										onClick={() => handlePay(order._id)}
										variant='outlined'
										color='success'>
										Pay
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Outlet />
		</div>
	);
};

export default Pay;
