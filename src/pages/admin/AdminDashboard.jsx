
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", py: 6, backgroundColor: "#0b0b0b" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ color: "white", mb: 4, fontWeight: "bold" }}>
          Admin Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 4, backgroundColor: "#161616", color: "white" }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                Products Management
              </Typography>

              <Typography sx={{ color: "#aaa", mb: 3 }}>
                Add, update, delete, and control store products.
              </Typography>

              <Button variant="contained" onClick={() => navigate("/admin/products")}>
                Manage Products
              </Button>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 4, backgroundColor: "#161616", color: "white" }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                Orders Management
              </Typography>

              <Typography sx={{ color: "#aaa", mb: 3 }}>
                View customer purchases and change order status.
              </Typography>

              <Button variant="contained" onClick={() => navigate("/admin/orders")}>
                Manage Orders
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AdminDashboard;
