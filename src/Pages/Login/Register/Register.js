import React, { useEffect, useState } from "react";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, FloatingLabel, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../Shared/Footer";
import useAuth from "../../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Register = () => {
	const [registerData, setRegisterData] = useState({});

	const navigate = useNavigate();
	const location = useLocation();

	const { signUpWithPassword, error, setUser, setError, updateUserProfile } =
		useAuth();

	const handleBlur = (e) => {
		const field = e.target.name;
		const value = e.target.value;
		const newRegisterData = { ...registerData };
		newRegisterData[field] = value;
		setRegisterData(newRegisterData);
	};
	useEffect(() => {
		setError(null);
	}, [setError]);

	const handleSubmit = (e) => {
		e.preventDefault();
		signUpWithPassword(registerData?.email, registerData?.password)
			.then((result) => {
				saveUser(result?.user?.email);
				setUser(result.user);
				updateUserProfile(registerData?.name);
				navigate(location.state?.from || "/");
			})
			.catch((error) => setError(error.message));
	};

	const saveUser = (email) => {
		const user = { email, role: "normal" };
		axios.post("https://cryptic-mesa-14109.herokuapp.com/user", user).then();
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
					<h3>Register</h3>
					<form className='w-50 mt-5 text-center' onSubmit={handleSubmit}>
						<FloatingLabel
							controlId='floatingName'
							label='Your Name'
							className='mb-3'>
							<Form.Control
								required
								name='name'
								onBlur={handleBlur}
								type='text'
								placeholder='Your Name'
							/>
						</FloatingLabel>
						<FloatingLabel
							name='email'
							controlId='floatingEmaiL'
							label='Email address'
							className='mb-3'>
							<Form.Control
								name='email'
								required
								type='email'
								onBlur={handleBlur}
								placeholder='name@example.com'
							/>
						</FloatingLabel>
						<FloatingLabel controlId='floatingPassword' label='Password'>
							<Form.Control
								name='password'
								type='password'
								required
								onBlur={handleBlur}
								placeholder='Password'
							/>
						</FloatingLabel>
						<Alert variant={`${error && "danger"}`}>{error}</Alert>
						<Button type='submit' className='my-5' variant='outline-warning'>
							Register
						</Button>
					</form>
					<Link className='text-decoration-none' to='/login'>
						Already have an account? Login.
					</Link>
				</Container>
			</Container>
			<Footer />
		</>
	);
};

export default Register;
