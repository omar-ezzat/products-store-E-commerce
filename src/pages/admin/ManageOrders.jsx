import { Box, Container, Typography, Paper } from "@mui/material";

function ManageOrders() {
  return (
    <Box sx={{ minHeight: "100vh", py: 6, backgroundColor: "#0b0b0b" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ color: "white", mb: 4, fontWeight: "bold" }}>
          Manage Orders
        </Typography>

        <Paper sx={{ p: 4, backgroundColor: "#161616", color: "white" }}>
          <Typography>
            Orders table will be here.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default ManageOrders;
