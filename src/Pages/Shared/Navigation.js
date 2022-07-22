import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navigation = ({ children }) => {
	const { logout, user } = useAuth();
	return (
		<Navbar bg='dark' sticky={`${children}`} variant='dark'>
			<Container>
				<Navbar.Brand as={Link} to='/home'>
					Vike
				</Navbar.Brand>
				<Nav className='ms-auto'>
					<Nav.Link as={NavLink} to='/home'>
						Home
					</Nav.Link>
					{
						/* user?.email */ true && (
							<Nav.Link as={NavLink} to='/dashboard'>
								Dashboard
							</Nav.Link>
						)
					}
					{user?.email ? (
						<Nav.Link onClick={logout}>Logout</Nav.Link>
					) : (
						<Nav.Link as={NavLink} to='/login'>
							Login
						</Nav.Link>
					)}
				</Nav>
			</Container>
		</Navbar>
	);
};

export default Navigation;
