import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, CardActionArea, Box } from "@mui/material";
import cc from "../assets/cc.png";

export default function ActionAreaCard() {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 3, // Smooth rounded corners
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": {
          boxShadow: 6, // Elevate card on hover
          transform: "scale(1.03)", // Slight zoom effect
        },
        cursor: "pointer",
      }}
      onClick={() => navigate("/ccproducts")}
    >
      <CardActionArea>
        {/* Image */}
        <CardMedia
          component="img"
          height="250"
          image={cc}
          alt="Xerox"
          sx={{
            objectFit: "cover", // Ensures the image is well-fitted
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        />
        
        {/* Card Content */}
        <CardContent sx={{ textAlign: "center", p: 2 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ color: "#1976D2" }}>
            CC
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Get Your Stationary
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
