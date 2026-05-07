import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../Redux/cart/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <Box sx={{ minHeight: "100vh", py: 6, backgroundColor: "#0b0b0b" }}>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ color: "white", mb: 4, fontWeight: "bold" }}>
            Shopping Cart
          </Typography>

          <Paper sx={{ p: 4, backgroundColor: "#161616", color: "white" }}>
            <Typography sx={{ mb: 2 }}>Your cart is empty.</Typography>

            <Button variant="contained" href="/products">
              Continue Shopping
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", py: 6, backgroundColor: "#0b0b0b" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ color: "white", mb: 4, fontWeight: "bold" }}>
          Shopping Cart
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            {cartItems.map((item) => (
              <Paper
                key={item.id}
                sx={{
                  p: 2,
                  mb: 2,
                  backgroundColor: "#161616",
                  color: "white",
                }}
              >
                <Grid container spacing={2} >
                  <Grid size={{ xs: 12, sm: 4 }} >
                    <div>

                      <Box sx={{

                        backgroundColor: "white",
                        borderRadius: 2,
                        p: 1,
                        display: "flex",
                        justifyContent: "center",
                        height: 190,
                        maxWidth: 200,
                        mx: "auto"
                      }}>
                        <Box
                          component="img"
                          src={item.image}
                          alt={item.title}
                          sx={{
                            width: "100%",
                            // height: 120,
                            objectFit: "contain",
                            backgroundColor: "white",
                            borderRadius: 2,
                            p: 1,
                          }}
                        />

                      </Box>
                    </div>

                  </Grid>

                  <Grid size={{ xs: 12, sm: 8 }} >
                    <Typography sx={{ fontWeight: "bold" }}>
                      {item.title}
                    </Typography>
                    <Typography sx={{ color: "#aaa" }}>
                      ${item.price}
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Button
                        variant="outlined"
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                      >
                        -
                      </Button>

                      <Typography>{item.quantity}</Typography>

                      <Button
                        variant="outlined"
                        onClick={() => dispatch(increaseQuantity(item.id))}
                      >
                        +
                      </Button>
                      <IconButton
                        color="error"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Grid>

                </Grid>
              </Paper>
            ))}
          </Grid>

          <Grid size={{ xs: 12, md: 4 }} >
            <Paper sx={{ p: 3, backgroundColor: "#161616", color: "white" }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                Order Summary
              </Typography>

              <Divider sx={{ backgroundColor: "#333", mb: 2 }} />

              <Typography sx={{ mb: 2 }}>
                Total Items: {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </Typography>

              <Typography variant="h6" sx={{ mb: 3 }}>
                Total Price: ${totalPrice.toFixed(2)}
              </Typography>

              <Button
                fullWidth
                variant="contained"
                sx={{ mb: 2 }}
                disabled={cartItems.length === 0}
                onClick={() => navigate("/checkout")}
              >
                Checkout
              </Button>


              <Button
                fullWidth
                variant="outlined"
                color="error"
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Cart;
