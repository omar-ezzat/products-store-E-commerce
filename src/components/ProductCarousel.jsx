import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../firebase/service/productsService";

const ProductCarousel = () => {
    const [products, setProducts] = useState([]);
    const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("API Error:", error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (products.length === 0) return;

        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % products.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [products]);

    const goToPage = (path) => {
        navigate(path);
    };

    const product = products[current];

    if (loading) {
        return (
            <Box sx={{ py: 8, textAlign: "center" }}>
                <CircularProgress />
            </Box>
        );
    }



    return (
        <>
            <Container sx={{ py: 6 }}>
                <Box
                    sx={{
                        bgcolor: "#1e1e1e",
                        borderRadius: 4,
                        p: 4,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 4,
                        flexDirection: { xs: "column", md: "row" },
                    }}
                >
                    <Box sx={{ width: "100%", overflow: "hidden" }}>
                        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
                            Discover Amazing Products
                        </Typography>

                        <Typography variant="h6" sx={{ color: "#ccc", mb: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {product.title}
                        </Typography>

                        <Typography variant="h5" sx={{ color: "#90caf9", mb: 3 }}>
                            ${product.price}
                        </Typography>

                        <Button variant="contained" size="large" onClick={() => goToPage("/products")}>
                            Shop Now
                        </Button>
                    </Box>

                    <div>
                        <Box
                            component="img"
                            src={product.image}
                            alt={product.title}
                            sx={{
                                width: 280,
                                height: 280,
                                objectFit: "contain",
                                bgcolor: "white",
                                borderRadius: 3,
                                p: 3,
                            }}
                        />

                    </div>
                </Box>
            </Container>

        </>
    );
}

export default ProductCarousel;
