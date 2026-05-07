import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';

import React, { useState } from "react";
import { Box, Button, Divider, TextField, Typography, Alert } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthLayout from "../components/AuthLayout";
import { registerWithEmail, loginWithGoogle } from "../firebase/service/authService"
import { setUser, setAuthLoading, setAuthError } from "../Redux/auth/authSlice";
import { createUserDocument } from '../firebase/service/userService';


function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
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
  //   uid: user.uid,
  //   name: user.displayName,
  //   email: user.email,
  //   photoURL: user.photoURL,
  //   role: "customer",
  // });

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    dispatch(setAuthLoading(true));

    try {
      const user = await registerWithEmail(formData);
      const userData = await createUserDocument(user, {
        name: formData.name,
      })
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

  const handleGoogleRegister = async () => {
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

  const outlinedPasswordId = React.useId();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <AuthLayout title="Create Account" subtitle="Register to start shopping">
      <Box component="form" onSubmit={handleRegister}>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Full Name"
          name="name"
          margin="normal"
          value={formData.name}
          onChange={handleChange}
          required
          InputLabelProps={{ style: { color: "#aaa" } }}
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

        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          required
          InputLabelProps={{ style: { color: "#aaa" } }}
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
          {loading ? "Creating account..." : "Register"}
        </Button>

        <Divider sx={{ my: 3, borderColor: "#333", color: "#777" }}>
          OR
        </Divider>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          disabled={loading}
          onClick={handleGoogleRegister}
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
          Already have an account?{" "}
          <Typography
            component={Link}
            to="/login"
            sx={{
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Login
          </Typography>
        </Typography>
      </Box>
    </AuthLayout>
  );
}

export default Register;
