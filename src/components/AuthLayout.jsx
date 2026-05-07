
import { Box, Paper, Typography } from "@mui/material";

function AuthLayout({ title, subtitle, children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#0b0b0b",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 450,
          backgroundColor: "#161616",
          color: "white",
          p: 4,
          borderRadius: 4,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 1,
            textAlign: "center",
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            color: "#aaa",
            textAlign: "center",
            mb: 4,
          }}
        >
          {subtitle}
        </Typography>

        {children}
      </Paper>
    </Box>
  );
}

export default AuthLayout;

