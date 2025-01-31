import React, { useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import FoodCard from "./Card";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Cart from "./Cart";
import vegthaliImg from "./assets/vegthali.jpg";
import minithaliImg from "./assets/minithali.jpg";
import dosaImg from "./assets/dosa.jpg";
import uttapamImg from "./assets/uttapam.jpg";

// Sample food items
const foodItems = [
    { id: 1, name: "Veg Thali", price: 70, image: vegthaliImg },
    { id: 2, name: "Mini Thali", price: 50, image: minithaliImg },
    { id: 3, name: "Dosa", price: 80, image: dosaImg },
    { id: 4, name: "Uttapam", price: 80, image: uttapamImg },
];

function Product() {
    const [cart, setCart] = useState([]);

    const handleAddToCart = (item) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
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
                        Canteen Menu
                    </Typography>

                    <Grid container spacing={3} justifyContent="center">
                        {foodItems.map((food) => (
                            <Grid item key={food.id}>
                                <FoodCard id={food.id} image={food.image} name={food.name} price={food.price} onAdd={handleAddToCart} />
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
