import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Divider,
  TextField,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

function Checkout() {
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [message, setMessage] = useState("");

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Box sx={{ minHeight: "100vh", py: 6, backgroundColor: "#0b0b0b" }}>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ color: "white", mb: 4, fontWeight: "bold" }}>
          Checkout
        </Typography>

        {message && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {message}
          </Alert>
        )}

        <Paper sx={{ p: 4, backgroundColor: "#161616", color: "white" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Customer Information
          </Typography>

          <TextField
            fullWidth
            label="Name"
            value={user?.name || ""}
            margin="normal"
            InputProps={{ readOnly: true }}
            InputLabelProps={{ style: { color: "#aaa" } }}
            sx={{ input: { color: "white" } }}
          />

          <TextField
            fullWidth
            label="Email"
            value={user?.email || ""}
            margin="normal"
            InputProps={{ readOnly: true }}
            InputLabelProps={{ style: { color: "#aaa" } }}
            sx={{ input: { color: "white" } }}
          />

          <Divider sx={{ backgroundColor: "#333", my: 3 }} />

          <Typography variant="h6" sx={{ mb: 2 }}>
            Order Summary
          </Typography>

          <Typography sx={{ mb: 1 }}>
            Total Items:{" "}
            {cartItems.reduce((total, item) => total + item.quantity, 0)}
          </Typography>

          <Typography variant="h5" sx={{ mb: 3 }}>
            Total Price: ${totalPrice.toFixed(2)}
          </Typography>

          <Button
            fullWidth
            variant="contained"
            disabled={cartItems.length === 0}
            onClick={() => setMessage("Checkout page is ready. Next step: save order to Firestore.")}
          >
            Place Order
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}

export default Checkout;
