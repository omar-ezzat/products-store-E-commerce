import React from 'react';
import { Box, Typography } from "@mui/material";

const Footer = () => {
    return (
        <>
            <Box sx={{ bgcolor: "#111", textAlign: "center", py: 3 }}>
                <Typography sx={{ color: "#aaa" }}>
                    © 2026 Dark Store. All Rights Reserved.
                </Typography>
            </Box>

        </>
    );
}

export default Footer;
