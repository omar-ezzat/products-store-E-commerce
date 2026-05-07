import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import GoogleIcon from "@mui/icons-material/Google";
import { Box, Button, Divider, TextField, Typography, Alert } from "@mui/material";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthLayout from "../components/AuthLayout";
import { loginWithEmail, loginWithGoogle } from "../firebase/service/authService"
import { setUser, setAuthLoading, setAuthError } from "../features/auth/authSlice";
import { createUserDocument } from '../firebase/service/userService';

function Login() {


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const outlinedPasswordId = React.useId();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // const formatUser = (user) => ({
    //     uid: user.uid,
    //     name: user.displayName,
    //     email: user.email,
    //     photoURL: user.photoURL,
    //     role: "customer",
    // });

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setLoading(true);
        dispatch(setAuthLoading(true));

        try {
            const user = await loginWithEmail(formData);
            console.log("tring to login     ",user);
            const userData = await createUserDocument(user)
            console.log("tring to login     ",userData);
            dispatch(setUser(userData));
            navigate("/");
        } catch (error) {
            setErrorMessage(error.message);
            dispatch(setAuthError(error.message));
        } finally {
            setLoading(false);
            dispatch(setAuthLoading(false));
        }
    };

    const handleGoogleLogin = async () => {
        setErrorMessage("");
        setLoading(true);
        dispatch(setAuthLoading(true));

        try {
            const user = await loginWithGoogle();

            const userData = await createUserDocument(user)

            dispatch(setUser(userData));
            navigate("/");
        } catch (error) {
            setErrorMessage(error.message);
            dispatch(setAuthError(error.message));
        } finally {
            setLoading(false);
            dispatch(setAuthLoading(false));
        }
    };


    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    return (
        <AuthLayout title="Welcome Back" subtitle="Login to your account">
            <Box component="form" onSubmit={handleLogin}>
                {errorMessage && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {errorMessage }
                    </Alert>
                )}

                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    margin="normal"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    InputLabelProps={{ style: { color: "#ffffff" } }}
                    sx={{
                        "& .MuiInputLabel-root": {
                            color: "#aaa",
                        },
                        "& .MuiOutlinedInput-root": {
                            color: "white",

                            "& fieldset": {
                                borderColor: "#333",
                            },

                            "&:hover fieldset": {
                                borderColor: "#777",
                            },

                            "&.Mui-focused fieldset": {
                                borderColor: "#777",
                            },
                        },

                        "& .MuiIconButton-root": {
                            color: "#aaa",
                        },
                    }}
                />

                <FormControl
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    sx={{
                        "& .MuiInputLabel-root": {
                            color: "#aaa",
                        },
                        "& .MuiOutlinedInput-root": {
                            color: "white",

                            "& fieldset": {
                                borderColor: "#333",
                            },

                            "&:hover fieldset": {
                                borderColor: "#777",
                            },

                            "&.Mui-focused fieldset": {
                                borderColor: "#777",
                            },
                        },

                        "& .MuiIconButton-root": {
                            color: "#aaa",
                        },
                    }}
                >
                    <InputLabel htmlFor={`${outlinedPasswordId}-input`}>
                        Password
                    </InputLabel>

                    <OutlinedInput
                        id={`${outlinedPasswordId}-input`}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword
                                            ? "hide the password"
                                            : "display the password"
                                    }
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>


                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{ mt: 3, py: 1.4, fontWeight: "bold" }}
                >
                    {loading ? "Logging in..." : "Login"}
                </Button>

                <Divider sx={{ my: 3, borderColor: "#333", color: "#777" }}>
                    OR
                </Divider>

                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    disabled={loading}
                    onClick={handleGoogleLogin}
                    sx={{
                        color: "white",
                        borderColor: "#333",
                        py: 1.3,
                        "&:hover": { borderColor: "#777" },
                    }}
                >
                    Continue with Google
                </Button>

                <Typography sx={{ mt: 3, textAlign: "center", color: "#aaa" }}>
                    Don't have an account?{" "}
                    <Typography
                        component={Link}
                        to="/register"
                        sx={{
                            color: "white",
                            textDecoration: "none",
                            fontWeight: "bold",
                        }}
                    >
                        Register
                    </Typography>
                </Typography>
            </Box>
        </AuthLayout>
    );
}

export default Login;
