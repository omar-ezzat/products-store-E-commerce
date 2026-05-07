
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  Divider,
} from "@mui/material";
import { useSelector } from "react-redux";

function Profile() {
  const { user } = useSelector((state) => state.auth);

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

          <Typography sx={{ color: "#aaa" }}>
            Orders will appear here after checkout.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default Profile;
