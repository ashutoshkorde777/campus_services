import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, Paper, IconButton } from "@mui/material";
import FoodCard from "./Card";
import DeleteIcon from "@mui/icons-material/Delete";
import "./App.css";
import axios from "axios";

// Sample food items
const foodItems = [
  { id: 1, name: "Pizza", price: 250, image: "./assets/pizza.jpg" },
  { id: 2, name: "Burger", price: 120, image: "./assets/burger.jpg" },
  { id: 3, name: "Pasta", price: 180, image: "./assets/pasta.jpg" },
  { id: 4, name: "Salad", price: 100, image: "./assets/salad.jpg" },
];

function App() {
  const [cart, setCart] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Fetch services from the backend
    axios.get("http://localhost:5000/api/service-provider/services", {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Adjust this line based on your authentication method
      }
    })
    .then(response => {
      console.log("Services fetched successfully!", response.data);
      setServices(response.data);
    })
    .catch(error => {
      console.error("There was an error fetching the services!", error);
    });
  }, []);

  // Function to handle adding items to cart
  const handleAddToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  // Function to remove item from cart
  const handleRemoveFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
    
      {/* Cart Section */}
      <Paper sx={{ padding: 2, marginBottom: 3, maxWidth: 600, margin: "auto", backgroundColor: "#fff" }} elevation={3}>
        <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center" }}>🛒 Cart</Typography>
        {cart.length > 0 ? (
          <Box sx={{ display: "flex", overflowX: "auto", padding: 1, gap: 2 }}>
            {cart.map((item, index) => (
              <Box key={index} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    
                <Typography variant="body2">{item.name}</Typography>
                <Typography variant="caption">₹{item.price}</Typography>
                <IconButton size="small" color="error" onClick={() => handleRemoveFromCart(index)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography align="center" color="textSecondary">Cart is empty</Typography>
        )}
        <Typography variant="h6" sx={{ textAlign: "center", marginTop: 1, color: "#d32f2f" }}>Total: ₹{totalPrice}</Typography>
      </Paper>

      {/* Food Menu Grid */}
      <Grid container spacing={3} justifyContent="center">
        {foodItems.map((food) => (
          <Grid item key={food.id}>
            <FoodCard id={food.id} image={food.image} name={food.name} price={food.price} onAdd={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default App;