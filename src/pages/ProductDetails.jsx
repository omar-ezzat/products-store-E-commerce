
import { useEffect, useState } from "react";
import {
    Box,
    Container,
    Grid,
    Typography,
    Button,
    CircularProgress,
    Paper,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cart/cartSlice";
import { getProductById } from "../firebase/service/productsService";

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const handleAddtoCart = () => {
        dispatch(addToCart(product))
    }
    useEffect(() => {
        async function loadProduct() {
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadProduct();
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error || !product) {
        return (
            <Box sx={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography color="error">{error || "Product not found"}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: "100vh", py: 6, backgroundColor: "#0b0b0b" }}>
            <Container maxWidth="lg">
                <Paper sx={{ p: 4, backgroundColor: "#161616", color: "white" }}>
                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, md: 5 }} >
                            <div>

                                <Box sx={{

                                    backgroundColor: "white",
                                    borderRadius: 2,
                                    p: 1,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: 350,
                                    maxWidth: 350,
                                    mx: "auto"
                                }}>
                                    <Box
                                        component="img"
                                        src={product.image}
                                        alt={product.title}
                                        sx={{
                                            height: 350,
                                            width: 350,
                                            objectFit: "contain",
                                            transition: "transform 0.3s ease",
                                            '&:hover': {
                                                transform: "scale(1.2) ",
                                                filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.5))",
                                            },
                                        }}
                                    />

                                </Box>
                            </div>
                        </Grid>

                        <Grid size={{ xs: 12, md: 7 }}>
                            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                                {product.title}
                            </Typography>

                            <Typography sx={{ color: "#aaa", mb: 2 }}>
                                {product.category}
                            </Typography>

                            <Typography variant="h5" sx={{ mb: 2 }}>
                                ${product.price}
                            </Typography>

                            <Typography sx={{ mb: 3, lineHeight: 1.8 }}>
                                {product.description}
                            </Typography>

                            <Button variant="contained" size="large" onClick={handleAddtoCart}>
                                Add to Cart
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
}

export default ProductDetails;
