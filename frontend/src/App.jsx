import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, Paper, IconButton } from "@mui/material";
import FoodCard from "./Card";
import DeleteIcon from "@mui/icons-material/Delete";
import "./App.css";
import axios from "axios";
import Product from "./Products";

// Sample food items
const foodItems = [
  { id: 1, name: "Pizza", price: 250, image: "./assets/pizza.jpg" },
  { id: 2, name: "Burger", price: 120, image: "./assets/burger.jpg" },
  { id: 3, name: "Pasta", price: 180, image: "./assets/pasta.jpg" },
  { id: 4, name: "Salad", price: 100, image: "./assets/salad.jpg" },
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
    <Product />
  );
}

export default App;