import React from "react";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import pizza from "./assets/pizza.png";

const FoodCard = ({ id, image, name, price, onAdd }) => {
  return (
    <Card key={id} sx={{ maxWidth: 300, margin: "auto", padding: 1, boxShadow: 3, height:300 }}>
      <CardMedia component="img" height="150" image={pizza}alt={name} />
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>{name}</Typography>
        <Typography variant="body1" color="text.secondary">
          Price: ₹{price}
        </Typography>
        <Button
          variant="contained"
          color="primary"
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
