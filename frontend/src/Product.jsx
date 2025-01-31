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
import axios from 'axios';

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
        // Prepare the summary from the cart
        const summary = cart.reduce((acc, item) => {
            const existingItem = acc.find(entry => entry.name === item.name);
            if (existingItem) {
                existingItem.quantity += item.quantity; // Increment quantity if item already exists
            } else {
                acc.push({ id: item.id, name: item.name, quantity: item.quantity }); // Add new item to summary
            }
            return acc;
        }, []);

        // Prepare the order data for the POST request
        const orderData = {
            listOfProducts: summary.map(item => ({
                service: item.name, // service refers to the ID of the product/service
                quantity: item.quantity
            })),
            studentId: 1, // Replace with the actual student ID
            serviceProviderId: 1, // Replace with the actual service provider ID
            amount: calculateTotalAmount(summary), // Function to calculate the total amount from summary
        };

        axios
            .post("http://localhost:5000/api/orders", orderData)
            .then((response) => {
                alert("Order Confirmed!");
                setCart([]); // Clear cart after order
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Error confirming order.");
            });
    };

    // Example function to calculate total amount from the summary
    const calculateTotalAmount = (summary) => {
        return summary.reduce((total, item) => {
            const itemPrice = getPriceForItem(item.id); // Function to get price based on item ID
            return total + itemPrice * item.quantity;
        }, 0);
    };

    // Function to fetch price for an item based on its ID
    const getPriceForItem = (itemId) => {
        const item = cart.find(item => item.id === itemId);
        return item ? item.price : 0;
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
