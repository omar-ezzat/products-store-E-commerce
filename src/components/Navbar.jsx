
import { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../firebase/service/authService";
import { clearUser } from "../Redux/auth/authSlice";

function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();
    const { cartItems } = useSelector((state) => state.cart)
    const [drawerOpen, setDrawerOpen] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = async () => {
        try {
            await logoutUser();
            dispatch(clearUser());
            goToPage("/");
        } catch (error) {
            console.log(error.message);
        }
    };


    const scrollToSection = (sectionId) => {
        setDrawerOpen(false);

        if (location.pathname !== "/") {
            navigate(`/#${sectionId}`);

            setTimeout(() => {
                document.getElementById(sectionId)?.scrollIntoView({
                    behavior: "smooth",
                });
            }, 150);
        } else {
            document.getElementById(sectionId)?.scrollIntoView({
                behavior: "smooth",
            });
        }
    };

    const goToPage = (path) => {
        setDrawerOpen(false);
        navigate(path);
    };

    const navLinks = [
        { label: "Home", section: "home" },
        { label: "Products", section: "products" },
        { label: "About", section: "about" },
    ];

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <>
            <AppBar
                position="sticky"
                sx={{
                    backgroundColor: "#111",
                    boxShadow: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
            >
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography
                        variant="h6"
                        onClick={() => scrollToSection("home")}
                        sx={{
                            fontWeight: "bold",
                            cursor: "pointer",
                            letterSpacing: "1px",
                        }}
                    >
                        Online Dark Store
                    </Typography>


                    <Box
                        sx={{
                            display: { xs: "none", md: "flex" },
                            alignItems: "center",
                            gap: 2,
                        }}
                    >
                        {navLinks.map((link) => (
                            <Button
                                key={link.label}
                                onClick={() => scrollToSection(link.section)}
                                sx={{ color: "white" }}
                            >
                                {link.label}
                            </Button>
                        ))}

                        <Button onClick={() => goToPage("/products")}>
                            Shop
                        </Button>

                        {/* <Button onClick={() => goToPage("/profile")} sx={{ color: "white" }}>
                            Profile
                        </Button> */}

                        <IconButton onClick={() => goToPage("/cart")} sx={{ color: "white" }}>
                            <Badge badgeContent={cartCount} color="error">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>

                        {user ? (
                            <>
                                <Button
                                    startIcon={<AccountCircleIcon />}
                                    onClick={() => goToPage("/profile")}
                                    sx={{ color: "white" }}
                                >
                                    {user.name || "Profile"}
                                </Button>

                                <Button
                                    startIcon={<LogoutIcon />}
                                    variant="outlined"
                                    onClick={handleLogout}
                                    sx={{
                                        color: "white",
                                        borderColor: "white",
                                        "&:hover": {
                                            borderColor: "#aaa",
                                        },
                                    }}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="outlined"
                                onClick={() => goToPage("/login")}
                                sx={{
                                    color: "white",
                                    borderColor: "white",
                                    "&:hover": {
                                        borderColor: "#aaa",
                                    },
                                }}
                            >
                                Login
                            </Button>
                        )}

                    </Box>


                    <IconButton
                        onClick={() => setDrawerOpen(true)}
                        sx={{
                            color: "white",
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>


            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                        Online Dark Store
                    </Typography>

                    <List>
                        {navLinks.map((link) => (
                            <ListItem key={link.label} disablePadding>
                                <ListItemButton onClick={() => scrollToSection(link.section)}>
                                    <ListItemText primary={link.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}

                        <ListItem disablePadding>
                            <ListItemButton onClick={() => goToPage("/products")}>
                                <ListItemText primary="Shop" />
                            </ListItemButton>
                        </ListItem>

                        {/* <ListItem disablePadding>
                            <ListItemButton onClick={() => goToPage("/profile")}>
                                <ListItemText primary="Profile" />
                            </ListItemButton>
                        </ListItem> */}

                        <ListItem disablePadding>
                            <ListItemButton onClick={() => goToPage("/cart")}>
                                <ListItemText primary="Cart" />
                            </ListItemButton>
                        </ListItem>

                        {user ? (
                            <>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => goToPage("/profile")}>
                                        <ListItemText primary={user.name || "Profile"} />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton onClick={handleLogout}>
                                        <ListItemText primary="Logout" />
                                    </ListItemButton>
                                </ListItem>
                            </>
                        ) : (
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => goToPage("/login")}>
                                    <ListItemText primary="Login" />
                                </ListItemButton>
                            </ListItem>
                        )}

                    </List>
                </Box>
            </Drawer>
        </>
    );
}

export default Navbar;
