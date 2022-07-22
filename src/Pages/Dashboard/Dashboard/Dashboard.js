import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../../hooks/useAuth";

export default function ResponsiveDrawer(props) {
	const drawerWidth = 200;
	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const navigate = useNavigate();

	const { logout, admin } = useAuth();

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<div>
			<Toolbar>
				<ListItem sx={{ px: 0 }} button onClick={() => navigate("/")}>
					<FontAwesomeIcon icon={faChevronLeft} />
					<ListItemText sx={{ px: 0 }} className='ms-2' primary={"Home"} />
				</ListItem>
			</Toolbar>
			<Divider />
			{admin !== "admin" && (
				<List>
					<ListItem button onClick={() => navigate(`pay`)}>
						<ListItemText primary={"Pay"} />
					</ListItem>
					<ListItem button onClick={() => navigate(`myOrder`)}>
						<ListItemText primary={"My Order"} />
					</ListItem>
					<ListItem button onClick={() => navigate(`review`)}>
						<ListItemText primary={"Review"} />
					</ListItem>
					<ListItem onClick={logout} button>
						<ListItemText primary={"Logout"} />
					</ListItem>
				</List>
			)}
			<Divider />
			{admin === "admin" && (
				<List>
					<ListItem
						button
						onClick={() => navigate(`dashboard/manageAllOrders`)}>
						<ListItemText primary={"Manage all Orders"} />
					</ListItem>
					<ListItem button onClick={() => navigate(`dashboard/addAProduct`)}>
						<ListItemText primary={"Add a Products"} />
					</ListItem>
					<ListItem button onClick={() => navigate(`dashboard/MakeAdmin`)}>
						<ListItemText primary={"Make Admin"} />
					</ListItem>
					<ListItem button onClick={() => navigate(`dashboard/MangeProducts`)}>
						<ListItemText primary={"Manage Products"} />
					</ListItem>
					<ListItem button onClick={logout}>
						<ListItemText primary={"Logout"} />
					</ListItem>
				</List>
			)}
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				position='fixed'
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
					backgroundColor: "#212529",
				}}>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' noWrap component='div'>
						Dashboard
					</Typography>
				</Toolbar>
			</AppBar>
			<Box
				component='nav'
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label='mailbox folders'>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Drawer
					container={container}
					variant='temporary'
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}>
					{drawer}
				</Drawer>
				<Drawer
					variant='permanent'
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
					open>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					p: 3,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
				}}>
				<Outlet />
			</Box>
		</Box>
	);
}
