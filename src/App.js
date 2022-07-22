import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRoute from "./Pages/AdminRoute/AdminRoute";
import ComingSoon from "./Pages/ComingSoon/ComingSoon";
import AuthProvider from "./Pages/Context/AuthProvider";
import AddAProduct from "./Pages/Dashboard/AddAProduct/AddAProduct";
import Dashboard from "./Pages/Dashboard/Dashboard/Dashboard";
import MakeAdmin from "./Pages/Dashboard/MakeAdmin/MakeAdmin";
import ManageProducts from "./Pages/Dashboard/ManageProducts/ManageProducts";
import ManageAllOrders from "./Pages/Dashboard/MangeAllOrders/ManageAllOrders";
import MyOrder from "./Pages/Dashboard/MyOrder/MyOrder";
import Pay from "./Pages/Dashboard/Pay/Pay";
import Payment from "./Pages/Dashboard/Pay/Payment";
import Review from "./Pages/Dashboard/Review/Review";
import Home from "./Pages/Home/Home/Home";
import Login from "./Pages/Login/Login/Login";
import Register from "./Pages/Login/Register/Register";
import NotFound from "./Pages/NotFound/NotFound";
import Order from "./Pages/Order/Order";
import PrivateRoute from "./Pages/PrivateRoute/PrivateRoute";
import Products from "./Pages/Products/Products";

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route index element={<Home />} />
					<Route path='home' element={<Home />} />
					<Route path='login' element={<Login />} />
					<Route path='register' element={<Register />} />
					<Route path='products' element={<Products />} />
					<Route path='comingSoon' element={<ComingSoon />} />
					<Route path='order/:id' element={<Order />} />
					<Route path='/*' element={<PrivateRoute />}>
						<Route path='dashboard' element={<Dashboard />}>
							<Route path={`pay`} element={<Pay />} />
							<Route path={`myOrder`} element={<MyOrder />} />
							<Route path={`payment/:id`} element={<Payment />} />
							<Route path={`review`} element={<Review />} />
							<Route
								path={`manageAllOrders`}
								element={
									<AdminRoute>
										<ManageAllOrders />
									</AdminRoute>
								}
							/>
							<Route
								path={`addAProduct`}
								element={
									<AdminRoute>
										<AddAProduct />
									</AdminRoute>
								}
							/>
							<Route
								path={`MakeAdmin`}
								element={
									<AdminRoute>
										<MakeAdmin />
									</AdminRoute>
								}
							/>
							<Route
								path={`MangeProducts`}
								element={
									<AdminRoute>
										<ManageProducts />
									</AdminRoute>
								}
							/>
						</Route>
						<Route path='*' element={<NotFound />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
