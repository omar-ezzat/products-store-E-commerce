
import { useEffect, useState } from "react";
import {
    Box,
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard"
import { useSelector } from "react-redux";

function Products() {
    const navigate = useNavigate();
    const { products, loading, error } = useSelector((state) => state.products);

    if (loading) {
        return (
            <Box sx={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }


    return (
        <Box sx={{ minHeight: "100vh", py: 6, backgroundColor: "#0b0b0b" }}>
            <Container maxWidth="lg">
                <Typography variant="h4" sx={{ color: "white", mb: 4, fontWeight: "bold" }}>
                    All Products
                </Typography>

                <Grid container spacing={3}>
                    {products.map((product) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}

export default Products;
