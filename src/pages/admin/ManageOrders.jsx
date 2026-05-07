import { useEffect, useState } from "react";

import {
    Box,
    Container,
    Typography,
    Paper,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Select,
    MenuItem,
    Alert,
} from "@mui/material";

import {
    getAllOrders,
    updateOrderStatus,
} from "../../firebase/service/orderService";

function ManageOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const loadOrders = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getAllOrders();
            setOrders(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const handleStatusChange = async (orderId, status) => {
        try {
            setMessage("");
            setError("");

            await updateOrderStatus(orderId, status);

            setOrders((prev) =>
                prev.map((order) =>
                    order.id === orderId
                        ? { ...order, status }
                        : order
                )
            );

            setMessage("Order status updated.");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Box sx={{ minHeight: "100vh", py: 6, backgroundColor: "#0b0b0b" }}>
            <Container maxWidth="xl">
                <Typography
                    variant="h4"
                    sx={{
                        color: "white",
                        mb: 4,
                        fontWeight: "bold",
                    }}
                >
                    Manage Orders
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

                <Paper
                    sx={{
                        p: 3,
                        backgroundColor: "#161616",
                        color: "white",
                    }}
                >
                    {loading ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                py: 5,
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : (
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ color: "white" }}>
                                            Customer
                                        </TableCell>

                                        <TableCell sx={{ color: "white" }}>
                                            Email
                                        </TableCell>

                                        <TableCell sx={{ color: "white" }}>
                                            Items
                                        </TableCell>

                                        <TableCell sx={{ color: "white" }}>
                                            Total
                                        </TableCell>

                                        <TableCell sx={{ color: "white" }}>
                                            Payment
                                        </TableCell>

                                        <TableCell sx={{ color: "white" }}>
                                            Status
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {orders.map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell sx={{ color: "white" }}>
                                                {order.customerName}
                                            </TableCell>

                                            <TableCell sx={{ color: "#aaa" }}>
                                                {order.customerEmail}
                                            </TableCell>

                                            <TableCell sx={{ color: "white" }}>
                                                {order.items?.length}
                                            </TableCell>

                                            <TableCell sx={{ color: "#90caf9" }}>
                                                ${Number(order.totalPrice).toFixed(2)}
                                            </TableCell>

                                            <TableCell sx={{ color: "white" }}>
                                                {order.paymentStatus}
                                            </TableCell>

                                            <TableCell>
                                                <Select
                                                    size="small"
                                                    value={order.status}
                                                    onChange={(e) =>
                                                        handleStatusChange(
                                                            order.id,
                                                            e.target.value
                                                        )
                                                    }
                                                    sx={{
                                                        color: "white",
                                                        minWidth: 140,
                                                        ".MuiOutlinedInput-notchedOutline": {
                                                            borderColor: "#555",
                                                        },
                                                        "& .MuiSvgIcon-root": {
                                                            color: "white",
                                                        },
                                                    }}
                                                >
                                                    <MenuItem value="pending">
                                                        Pending
                                                    </MenuItem>

                                                    <MenuItem value="processing">
                                                        Processing
                                                    </MenuItem>

                                                    <MenuItem value="delivered">
                                                        Delivered
                                                    </MenuItem>

                                                    <MenuItem value="cancelled">
                                                        Cancelled
                                                    </MenuItem>
                                                </Select>
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

export default ManageOrders;
