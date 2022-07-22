import React from "react";
import { Spinner } from "react-bootstrap";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PrivateRoute = () => {
	const { user, isLoading } = useAuth();
	const location = useLocation();
	if (isLoading) {
		return (
			<div className='vw-100 vh-100 d-flex align-items-center justify-content-center'>
				<Spinner animation='grow' variant='info' />
			</div>
		);
	} else {
		return user.email ? (
			<Outlet />
		) : (
			<Navigate to='/login' state={{ form: location }} replace />
		);
	}
};

export default PrivateRoute;
