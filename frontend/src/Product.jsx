import React, { useState } from "react";
import { Grid, Typography, Box, Paper, IconButton, Button } from "@mui/material";
import FoodCard from "./Card";
import DeleteIcon from "@mui/icons-material/Delete";
import "./App.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

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

    const handleConfirmOrder = () => {};

    return (

        <div className="dashboard-container">
            <Sidebar />
            <div className="content">  {/* Use the "content" class here */}
                <Navbar />

                {/* Container for desktop cards */}

                <Box sx={{ padding: 4, backgroundColor: "#d7f0fc", minHeight: "100vh" }}>
                    <Typography variant="h3" align="center" gutterBottom sx={{ color: "#4CAF50", fontWeight: "bold" }}>
                        Canteen Menu
                    </Typography>

                    {/* Cart Section */}


                    {/* Food Menu Grid */}
                    <Grid container spacing={3} justifyContent="center">
                        {foodItems.map((food) => (
                            <Grid item key={food.id}>
                                <FoodCard id={food.id} image={food.image} name={food.name} price={food.price} onAdd={handleAddToCart} />
                            </Grid>
                        ))}
                    </Grid>

                    <Paper sx={{ padding: 2, width: 300, margin: "auto", backgroundColor: "#fff", position: "absolute", right: 5, bottom: 5, borderRadius: 20 }}>
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
                        <div style={{ display: "flex", justifyContent: "center" }}>
                        {cart.length > 0 && (
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ marginTop: 1 , width:100 , alignSelf:"center" , backgroundColor: "#4CAF50", align:"center" }}
                                onClick={handleConfirmOrder}
                            >
                                Confirm
                            </Button>
                        )}

                        </div>
                        
                    </Paper>
                </Box>

            </div>
        </div>
    );
}

export default App;
