import React from 'react';
import { Box, Container, Typography } from "@mui/material";

const About = () => {
    return (
        <>
            <Box sx={{ bgcolor: "#181818", py: 6 }}>
                <Container>
                    <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                        About Our Store
                    </Typography>

                    <Typography sx={{ color: "#ccc", fontSize: "18px", lineHeight: 1.8 }}>
                        Dark Store is an online shopping platform that offers high-quality
                        products with fast and secure delivery. We deliver to any part of the
                        world, making shopping simple and comfortable for everyone. Our goal
                        is to provide trusted products, quick service, easy checkout, and a
                        smooth shopping experience.
                    </Typography>
                </Container>
            </Box>

        </>
    );
}

export default About;
