// src/ActionAreaCard.jsx
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function ActionAreaCard() {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345 }} onClick={() => navigate('/cc')} style={{ cursor: 'pointer' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image="/xerox.jpeg"  // Ensure the image path is correct (use relative path based on public folder)
          alt="Xerox"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            CC
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            You can order your xerox here.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
