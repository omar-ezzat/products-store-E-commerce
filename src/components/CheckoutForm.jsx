import { useState } from "react";
import {
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { Alert, Button, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../firebase/service/orderService";
import { clearCart } from "../Redux/cart/cartSlice";

function CheckoutForm({ totalPrice }) {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        try {
            setLoading(true);
            setMessage("");
            setErrorMessage("");

            const result = await stripe.confirmPayment({
                elements,
                redirect: "if_required",
            });

            if (result.error) {
                setErrorMessage(result.error.message);
                return;
            }

            if (result.paymentIntent.status === "succeeded") {
                await createOrder({
                    userId: user.uid,
                    customerName: user.name,
                    customerEmail: user.email,
                    items: cartItems,
                    totalPrice,
                    paymentStatus: "paid",
                    stripePaymentIntentId: result.paymentIntent.id,
                });

                dispatch(clearCart());
                setMessage("Payment successful. Order placed successfully.");
                navigate("/")
            }
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handlePayment}>
            {message && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    {message}
                </Alert>
            )}

            {errorMessage && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {errorMessage}
                </Alert>
            )}

            <PaymentElement />

            <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={!stripe || loading || cartItems.length === 0}
                sx={{ mt: 3 }}
            >
                {loading ? "Processing Payment..." : "Pay with Stripe"}
            </Button>
        </Box>
    );
}

export default CheckoutForm;
