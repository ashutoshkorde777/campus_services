import React from "react";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";

const FoodCard = ({ id, image, name, price, onAdd }) => {
  return (
    <Card sx={{ maxWidth: 300, margin: "auto", padding: 1, boxShadow: 3, height: 350 }}>
      <CardMedia
        component="img"
        sx={{ height: 180, width: "100%", objectFit: "cover" }} // Standardized image size
        image={image}
        alt={name}
      />
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>{name}</Typography>
        <Typography variant="body1" color="text.secondary">
          Price: ₹{price}
        </Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{ marginTop: 1, backgroundColor: "#4CAF50" }}
          onClick={() => onAdd({ id, name, price })}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default FoodCard;
