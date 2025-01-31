import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';

const ServiceProviderCard = ({ provider }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/products/${provider._id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 3,
        boxShadow: 3,
        transition: '0.3s',
        '&:hover': {
          boxShadow: 6,
          transform: 'scale(1.03)',
        },
        cursor: 'pointer',
      }}
      onClick={handleCardClick}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={`http://localhost:5000/${provider.photo}`} // Adjust the path as needed
          alt={provider.name}
          sx={{
            objectFit: 'cover',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        />
        <CardContent sx={{ textAlign: 'center', p: 2 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ color: '#1976D2' }}>
            {provider.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {provider.businessDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ServiceProviderCard;