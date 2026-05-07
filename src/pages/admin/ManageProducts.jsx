
import { useEffect, useState } from "react";
import {
    Box,
    Container,
    Typography,
    Paper,
    Button,
    Alert,
    CircularProgress,
} from "@mui/material";

import { getProducts, seedProductsFromFakeApi } from "../../firebase/service/productsService";

function ManageProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [importing, setImporting] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await getProducts();
            setProducts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleImportProducts = async () => {
        try {
            setImporting(true);
            setError("");
            setMessage("");

            await seedProductsFromFakeApi();

            setMessage("Products imported successfully.");
            await loadProducts();
        } catch (err) {
            setError(err.message);
        } finally {
            setImporting(false);
        }
    };

    return (
        <Box sx={{ minHeight: "100vh", py: 6, backgroundColor: "#0b0b0b" }}>
            <Container maxWidth="lg">
                <Typography
                    variant="h4"
                    sx={{ color: "white", mb: 4, fontWeight: "bold" }}
                >
                    Manage Products
                </Typography>

                {message && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                        {message}
                    </Alert>
                )}

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Paper sx={{ p: 4, backgroundColor: "#161616", color: "white" }}>
                    <Button
                        variant="contained"
                        onClick={handleImportProducts}
                        disabled={importing || products.length > 0}
                        sx={{ mb: 3 }}
                    >
                        {importing ? "Importing..." : "Import Products from Fake API"}
                    </Button>

                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <Typography>
                            Total Products in Firestore: {products.length}
                        </Typography>
                    )}
                </Paper>
            </Container>
        </Box>
    );
}

export default ManageProducts;
