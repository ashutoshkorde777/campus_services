import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, CardActionArea } from "@mui/material";
import canteen from "../assets/canteen.png";

export default function CanteenCard() {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 3, // Rounded corners
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": {
          boxShadow: 6, // Elevate card on hover
          transform: "scale(1.03)", // Slight zoom effect
        },
        cursor: "pointer",
      }}
      onClick={() => navigate("/canteenProduct")}
    >
      <CardActionArea>
        {/* Image */}
        <CardMedia
          component="img"
          height="250"
          image={canteen}
          alt="Cafeteria"
          sx={{
            objectFit: "cover", // Ensures proper image fitting
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        />
        
        {/* Card Content */}
        <CardContent sx={{ textAlign: "center", p: 2 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ color: "#1976D2" }}>
            Cafeteria
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Get your food and refreshments
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
