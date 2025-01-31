import React from "react";
import { Card, CardContent, CardMedia, Typography, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ id, name, price, image, route = "/print" }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345, cursor: "pointer", borderRadius: 5 }} onClick={() => navigate(route)}>
      <CardActionArea>
        <CardMedia component="img" height="300" image={image} alt={name} />
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

export default ServiceCard;
