import React from "react";
import { Spinner } from "react-bootstrap";
import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AdminRoute = ({ children }) => {
	const { user, isLoading, admin } = useAuth();
	const location = useLocation();
	if (isLoading) {
		return (
			<div className='vw-100 vh-100 d-flex align-items-center justify-content-center'>
				<Spinner animation='grow' variant='info' />
			</div>
		);
	} else {
		return user?.email && admin === "admin" ? (
			children
		) : (
			<Navigate to='/login' state={{ form: location }} replace />
		);
	}
};

export default AdminRoute;
