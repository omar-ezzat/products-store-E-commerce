import { Container, Typography, Grid, Box, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

import ProductCard from "./ProductCard";

const ProductsSection = () => {
    const { products, loading, error } = useSelector((state) => state.products);

    const featuredProducts = products.slice(0, 8);

    if (loading) {
        return (
            <Box sx={{ py: 6, textAlign: "center" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ py: 6, textAlign: "center" }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Container sx={{ py: 5 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
                Clothes & Products
            </Typography>

            <Grid container spacing={3}>
                {featuredProducts.map((product) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ProductsSection;
