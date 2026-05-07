import React from 'react';
import { Card, CardMedia, CardContent, Typography, Rating, Button, Box } from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {

    const navigate = useNavigate();
    return (
        <>
            <Card
                sx={{
                    bgcolor: "#212121",
                    color: "white",
                    borderRadius: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",

                }}>
                <Box
                    sx={{
                        height: 220,
                        bgcolor: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 2,
                    }}>
                    <Box
                        component="img"
                        src={product.image}
                        alt={product.title}
                        sx={{
                            maxHeight: "100%",
                            maxWidth: "100%",
                            objectFit: "contain",
                        }}
                    />
                </Box>


                <CardContent >
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontWeight: "bold",
                            minHeight: 55,
                        }}
                    >
                        {product.title}
                    </Typography>

                    <Rating
                        value={product.rating.rate}
                        precision={0.5}
                        readOnly
                        sx={{ mt: 1 }}
                        emptyIcon={<StarBorderIcon style={{ opacity: 1, color: "#b7b7b7" }} fontSize="inherit" />}
                    />

                    <Typography sx={{ mt: 1, color: "#90caf9" }}>
                        ${product.price}
                    </Typography>
                    <Button sx={{ mt: 2 }}
                        fullWidth
                        variant="contained"
                        onClick={() => navigate(`/products/${product.id}`)}
                    >
                        View Details
                    </Button>
                </CardContent>
            </Card>

        </>
    );
}

export default ProductCard;
