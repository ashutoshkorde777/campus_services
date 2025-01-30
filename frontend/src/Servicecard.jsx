import React from "react";
import { Card, CardContent, CardMedia, Typography, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import foodImage from "./assets/printing.png"; // Ensure correct path

const FoodCard = ({ id, name, price }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345, cursor: "pointer", borderRadius:5 }} onClick={() => navigate(`/print`)}>
      <CardActionArea>
        <CardMedia component="img" height="300" image={foodImage} alt={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Price: ₹{price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default FoodCard;
