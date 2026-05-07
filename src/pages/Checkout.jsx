import {
    Box,
    Container,
    Typography,
    Paper,
    Divider,
    TextField,
    CircularProgress,
} from "@mui/material";


import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


import { Elements } from "@stripe/react-stripe-js";


import { stripePromise } from "../stripe/stripeConfig";
import CheckoutForm from "../components/CheckoutForm";


function Checkout() {
    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);


    const [clientSecret, setClientSecret] = useState("");
    const [loadingPayment, setLoadingPayment] = useState(true);


    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );


    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                setLoadingPayment(true);


                const response = await fetch("/api/create-payment", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        amount: Math.round(totalPrice * 100),
                    }),
                });


                const data = await response.json();


                setClientSecret(data.clientSecret);
            } catch (error) {
                console.log(error.message);
            } finally {
                setLoadingPayment(false);
            }
        };


        if (cartItems.length > 0) {
            createPaymentIntent();
        } else {
            setLoadingPayment(false);
        }
    }, [cartItems, totalPrice]);


    return (
        <Box sx={{ minHeight: "100vh", py: 6, backgroundColor: "#0b0b0b" }}>
            <Container maxWidth="md">
                <Typography
                    variant="h4"
                    sx={{
                        color: "white",
                        mb: 4,
                        fontWeight: "bold",
                    }}
                >
                    Checkout
                </Typography>


                <Paper
                    sx={{
                        p: 4,
                        backgroundColor: "#161616",
                        color: "white",
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Customer Information
                    </Typography>


                    <TextField
                        fullWidth
                        label="Name"
                        value={user?.name || ""}
                        margin="normal"
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
                        value={user?.email || ""}
                        margin="normal"
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



                    <Divider sx={{ backgroundColor: "#333", my: 3 }} />


                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Order Summary
                    </Typography>


                    <Typography sx={{ mb: 1 }}>
                        Total Items:{" "}
                        {cartItems.reduce(
                            (total, item) => total + item.quantity,
                            0
                        )}
                    </Typography>


                    <Typography variant="h5" sx={{ mb: 3 }}>
                        Total Price: ${totalPrice.toFixed(2)}
                    </Typography>


                    <Divider sx={{ backgroundColor: "#333", my: 3 }} />


                    <Typography variant="h6" sx={{ mb: 3 }}>
                        Payment
                    </Typography>


                    {loadingPayment ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                py: 4,
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : clientSecret ? (
                        <Elements
                            stripe={stripePromise}
                            options={{
                                clientSecret,
                                appearance: {
                                    theme: "night",
                                },
                            }}
                        >
                            <StripeCheckoutForm totalPrice={totalPrice} />
                        </Elements>
                    ) : (
                        <Typography color="error">
                            Unable to initialize payment.
                        </Typography>
                    )}
                </Paper>
            </Container>
        </Box>
    );
}


export default Checkout;
