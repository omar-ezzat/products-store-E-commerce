import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  Divider,
  CircularProgress,
  Chip,
} from "@mui/material";
import { useSelector } from "react-redux";

import { getUserOrders } from "../firebase/service/orderService";

function Profile() {
  const { user } = useSelector((state) => state.auth);

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      if (!user?.uid) return;

      try {
        setLoadingOrders(true);
        const data = await getUserOrders(user.uid);
        setOrders(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoadingOrders(false);
      }
    };

    loadOrders();
  }, [user?.uid]);

  return (
    <Box sx={{ minHeight: "100vh", py: 6, backgroundColor: "#0b0b0b" }}>
      <Container maxWidth="md">
        <Typography
          variant="h4"
          sx={{ color: "white", mb: 4, fontWeight: "bold" }}
        >
          My Profile
        </Typography>

        <Paper
          sx={{
            p: 4,
            backgroundColor: "#161616",
            color: "white",
            borderRadius: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
            <Avatar
              src={user?.photoURL}
              alt={user?.name}
              sx={{
                width: 90,
                height: 90,
                bgcolor: "#333",
                fontSize: 32,
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </Avatar>

            <Box>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {user?.name || "User"}
              </Typography>

              <Typography sx={{ color: "#aaa" }}>{user?.email}</Typography>

              <Typography sx={{ color: "#90caf9", mt: 1 }}>
                Role: {user?.role}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ backgroundColor: "#333", my: 3 }} />

          <Typography variant="h6" sx={{ mb: 2 }}>
            My Orders
          </Typography>

          {loadingOrders ? (
            <CircularProgress />
          ) : orders.length === 0 ? (
            <Typography sx={{ color: "#aaa" }}>
              You have no orders yet.
            </Typography>
          ) : (
            orders.map((order) => (
              <Paper
                key={order.id}
                sx={{
                  p: 2,
                  mb: 2,
                  backgroundColor: "#0b0b0b",
                  color: "white",
                  border: "1px solid #333",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2,
                    flexWrap: "wrap",
                    mb: 1,
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    Order ID: {order.id}
                  </Typography>

                  <Chip
                    label={order.status}
                    color={
                      order.status === "delivered"
                        ? "success"
                        : order.status === "cancelled"
                        ? "error"
                        : "warning"
                    }
                    size="small"
                  />
                </Box>

                <Typography sx={{ color: "#aaa", mb: 1 }}>
                  Payment: {order.paymentStatus}
                </Typography>

                <Typography sx={{ color: "#aaa", mb: 1 }}>
                  Items: {order.items?.length}
                </Typography>

                <Typography sx={{ color: "#90caf9", fontWeight: "bold" }}>
                  Total: ${Number(order.totalPrice).toFixed(2)}
                </Typography>
              </Paper>
            ))
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default Profile;
