
import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Container,
    Typography,
    CircularProgress,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductCarousel = () => {
    const navigate = useNavigate();

    const { products, loading, error } = useSelector(
        (state) => state.products
    );

    const [current, setCurrent] = useState(0);

    const carouselProducts = products.slice(0, 5);

    useEffect(() => {
        if (carouselProducts.length === 0) return;

        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % carouselProducts.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [carouselProducts]);

    const goToPage = (path) => {
        navigate(path);
    };

    const product = carouselProducts[current];

    if (loading) {
        return (
            <Box sx={{ py: 8, textAlign: "center" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ py: 8, textAlign: "center" }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    if (!product) {
        return null;
    }

    return (
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
                    <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2, fontSize: 44 }}>
                        Discover Amazing Products
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            color: "#ccc",
                            mb: 2,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {product.title}
                    </Typography>

                    <Typography variant="h5" sx={{ color: "#90caf9", mb: 3 }}>
                        ${Number(product.price).toFixed(2)}
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => goToPage("/products")}
                    >
                        Shop Now
                    </Button>
                </Box>

                <div>
                    <Box
                        sx={{
                            backgroundColor: "white",
                            borderRadius: 3,
                            p: 3,
                            width: 320,
                            height: 320,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            overflow: "hidden",
                        }}
                    >

                        <Box
                            component="img"
                            src={product.image}
                            alt={product.title}
                            sx={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain",
                                transition: "transform 0.3s ease",
                                "&:hover": {
                                    transform: "scale(1.08)",
                                },
                            }}
                        />
                    </Box>

                </div>
            </Box>
        </Container>
    );
};

export default ProductCarousel;

