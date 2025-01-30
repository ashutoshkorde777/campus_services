import React from "react";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";

const FoodCard = ({ id, image, name, price, onAdd }) => {
  return (
    <Card key={id} sx={{ width: 300, height: 300, margin: 2, padding: 2 }}>
      <CardMedia component="img" height="150" image={image} alt={name} />
      <CardContent>
        <Typography variant="h6" component="div">
          {name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Price: ₹{price}
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ marginTop: 1 }} 
          onClick={() => onAdd({ id, name, price })}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default FoodCard;