import React, { useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import FoodCard from "./Card";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import vegthaliImg from "./assets/vegthali.jpg";
import minithaliImg from "./assets/minithali.jpg";
import dosaImg from "./assets/dosa.jpg";
import uttapamImg from "./assets/uttapam.jpg";
// import samosaImg from "../assets/samosa.jpg";
// import pattiesImg from "../assets/patties.jpg";
// import pohaImg from "../assets/poha.jpg";
// import noodlesImg from "../assets/noodles.jpg";

// Sample food items with correct images
const foodItems = [
    { id: 1, name: "Veg Thali", price: 70, image: vegthaliImg },
    { id: 2, name: "Mini Thali", price: 50, image: minithaliImg},
    { id: 3, name: "Dosa", price: 80, image: dosaImg },
    { id: 4, name: "Uttapam", price: 80, image: uttapamImg },
    // { id: 5, name: "Samosa", price: 20, image: samosaImg },
    // { id: 6, name: "Patties", price: 20, image: pattiesImg },
    // { id: 7, name: "Poha", price: 20, image: pohaImg },
    // { id: 8, name: "Noodles", price: 80, image: noodlesImg },
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

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="content">
                <Navbar />
                <Box sx={{ padding: 4, backgroundColor: "#d7f0fc", minHeight: "100vh" }}>
                    <Typography variant="h3" align="center" gutterBottom sx={{ color: "#4CAF50", fontWeight: "bold" }}>
                        Canteen Menu
                    </Typography>

                    {/* Food Menu Grid */}
                    <Grid container spacing={3} justifyContent="center">
                        {foodItems.map((food) => (
                            <Grid item key={food.id}>
                                <FoodCard id={food.id} image={food.image} name={food.name} price={food.price} onAdd={handleAddToCart} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </div>
        </div>
    );
}

export default Product;
