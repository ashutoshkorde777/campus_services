import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Grid, Typography, Box } from "@mui/material";
import FoodCard from "./Card";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Cart from "./Cart";

function Product() {
  const { providerId } = useParams();
  const [cart, setCart] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/serviceprovider/services/${providerId}`);
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, [providerId]);

  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(cartItem => cartItem._id === item._id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const handleConfirmOrder = () => {
    alert("Order Confirmed!"); 
    setCart([]); // Clear cart after order
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        <Navbar />
        <Box sx={{ padding: 4, backgroundColor: "#d7f0fc", minHeight: "100vh" }}>
          <Typography variant="h3" align="center" gutterBottom sx={{ color: "#4CAF50", fontWeight: "bold" }}>
            Services by {providerId}
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {services.map((service) => (
              <Grid item key={service._id}>
                <FoodCard id={service._id} image={`http://localhost:5000/${service.image}`} name={service.name} price={service.price} onAdd={handleAddToCart} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Cart Component (Only appears when cart has items) */}
        <Cart cart={cart} onRemove={handleRemoveFromCart} onConfirm={handleConfirmOrder} />
      </div>
    </div>
  );
}

export default Product;