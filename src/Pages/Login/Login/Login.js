import React, { useEffect, useState } from "react";
import { Container, FloatingLabel, Form, Button, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Footer from "../../Shared/Footer";
import useAuth from "../../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Login = () => {
	const [loginData, setLoginData] = useState({});

	const { signInWithPassword, error, setError, setUser } = useAuth();

	const navigate = useNavigate();
	const location = useLocation();

	const handleChange = (e) => {
		setError(null);
		const field = e.target.name;
		const value = e.target.value;
		const newLoginData = { ...loginData };
		newLoginData[field] = value;
		setLoginData(newLoginData);
	};

	useEffect(() => {
		setError(null);
	}, [setError]);
	const handleSubmit = (e) => {
		e.preventDefault();
		signInWithPassword(loginData.email, loginData.password)
			.then((result) => {
				const updateUser = { ...result.user };
				navigate(location.state?.from || "/");
				axios
					.get(
						`https://cryptic-mesa-14109.herokuapp.com/user/${result.user.email}`,
					)
					.then((result) => {
						updateUser.role = result.data?.role;
						setUser(updateUser);
					});
			})
			.catch((error) => setError(error.message));
	};

	return (
		<>
			<Container>
				<Link to='/'>
					<FontAwesomeIcon
						style={{ fontSize: "40px", color: "black" }}
						icon={faChevronLeft}
					/>
				</Link>
				<Container className='d-flex my-5 py-5 flex-column justify-content-center align-items-center'>
					<h3>Login</h3>
					<form className='w-50 mt-5 text-center' onSubmit={handleSubmit}>
						<FloatingLabel
							controlId='floatingInput'
							label='Email address'
							className='mb-3'>
							<Form.Control
								name='email'
								type='email'
								onChange={handleChange}
								placeholder='name@example.com'
							/>
						</FloatingLabel>
						<FloatingLabel controlId='floatingPassword' label='Password'>
							<Form.Control
								name='password'
								type='password'
								onChange={handleChange}
								placeholder='Password'
							/>
						</FloatingLabel>
						<Alert variant={`${error && "danger"}`}>{error}</Alert>
						<Button type='submit' className='my-5' variant='outline-warning'>
							Login
						</Button>
					</form>
					<Link className='text-decoration-none' to='/register'>
						New here? Go to Register
					</Link>
				</Container>
			</Container>
			<Footer />
		</>
	);
};

export default Login;
