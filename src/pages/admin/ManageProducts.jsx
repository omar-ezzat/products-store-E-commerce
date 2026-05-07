import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit"
import {
    Box,
    Container,
    Typography,
    Paper,
    Button,
    Alert,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import ProductForm from "../../components/ProductsFrom";
import { getProducts, seedProductsFromFakeApi, deleteProduct, addProduct, updateProduct } from "../../firebase/service/productsService";

function ManageProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [importing, setImporting] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [saving, setSaving] = useState(false)

    const loadProducts = async () => {
        try {
            setLoading(true);
            setError("");

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

    const handleDeleteProduct = async (productId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {
            setDeletingId(productId);
            setError("");
            setMessage("");

            await deleteProduct(productId);

            setProducts((prev) => prev.filter((product) => product.id !== productId));
            setMessage("Product deleted successfully.");
        } catch (err) {
            setError(err.message);
        } finally {
            setDeletingId(null);
        }
    };

    const handleSubmitProduct = async (productData) => {
        try {
            setSaving(true);
            setError("");
            setMessage("");

            if (selectedProduct) {
                await updateProduct(selectedProduct.id, productData);
                setMessage("Product updated successfully.");
            } else {
                await addProduct(productData);
                setMessage("Product added successfully.");
            }

            setSelectedProduct(null);
            await loadProducts();
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
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

                <Paper sx={{ p: 3, backgroundColor: "#161616", color: "white" }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 3,
                            gap: 2,
                            flexWrap: "wrap",
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            Products List
                        </Typography>

                        <Button
                            variant="contained"
                            onClick={handleImportProducts}
                            disabled={importing || products.length > 0}
                        >
                            {importing ? "Importing..." : "Import Products"}
                        </Button>
                    </Box>

                    {loading ? (
                        <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
                            <CircularProgress />
                        </Box>
                    ) : (

                        <TableContainer>
                            <ProductForm
                                selectedProduct={selectedProduct}
                                onSubmit={handleSubmitProduct}
                                onCancel={() => setSelectedProduct(null)}
                                loading={saving}
                            />

                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ color: "white" }}>Image</TableCell>
                                        <TableCell sx={{ color: "white" }}>Title</TableCell>
                                        <TableCell sx={{ color: "white" }}>Category</TableCell>
                                        <TableCell sx={{ color: "white" }}>Price</TableCell>
                                        <TableCell sx={{ color: "white" }} align="right">
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {products.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell>
                                                <Avatar
                                                    src={product.image}
                                                    alt={product.title}
                                                    variant="rounded"
                                                    sx={{
                                                        width: 56,
                                                        height: 56,
                                                        backgroundColor: "white",
                                                        p: 1,
                                                    }}
                                                />
                                            </TableCell>

                                            <TableCell sx={{ color: "white", maxWidth: 350 }}>
                                                {product.title}
                                            </TableCell>

                                            <TableCell sx={{ color: "#aaa" }}>
                                                {product.category}
                                            </TableCell>

                                            <TableCell sx={{ color: "white" }}>
                                                ${Number(product.price).toFixed(2)}
                                            </TableCell>

                                            <TableCell align="right">
                                                <IconButton
                                                    sx={{ color: "white" }}
                                                    onClick={() => setSelectedProduct(product)}
                                                >
                                                    <EditIcon />
                                                </IconButton>

                                                <IconButton
                                                    color="error"
                                                    disabled={deletingId === product.id}
                                                    onClick={() => handleDeleteProduct(product.id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Paper>
            </Container>
        </Box>
    );
}

export default ManageProducts;

