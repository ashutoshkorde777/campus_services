import React, { useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import FoodCard from "./Card";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Cart from "./cart";
import Pen from "./assets/pen.png";
import Pencil from "./assets/pencil.jpeg";
import notebook from "./assets/notebooks.jpg";
import paper from "./assets/projectpaper.jpeg";
import ServiceCard from "./Servicecard";

// Sample stationery items
const foodItems = [
    { id: 1, name: "Pencil", price: 5, image: Pencil },
    { id: 2, name: "Pen", price: 10, image: Pen },
    { id: 3, name: "Notebook", price: 50, image: notebook },
    { id: 4, name: "Project Papers", price: 80, image: paper },
];

// Sample services
const services = [
    { id: 1, name: "Xerox", price: 250, image: Pen },
    { id: 2, name: "Print", price: 120, image: Pen },
    { id: 3, name: "Color Print", price: 180, image: Pen },
    { id: 4, name: "Binding", price: 100, image: Pen },
];

function Ccproducts() {
    const [cart, setCart] = useState([]);

    const handleAddToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
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

                <Box sx={{ padding: 4, marginTop: 7, marginBottom: 7 }}>
                    <Typography variant="h3" align="center" gutterBottom sx={{ color: "#4CAF50", fontWeight: "bold" }}>
                        Services
                    </Typography>

                    <Grid container spacing={3} justifyContent="center">
                        {services.map((service) => (
                            <Grid item key={service.id}>
                                <ServiceCard id={service.id} image={service.image} name={service.name} price={service.price} onAdd={handleAddToCart} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box sx={{ padding: 4, minHeight: "100vh" }}>
                    <Typography variant="h3" align="center" gutterBottom sx={{ color: "#4CAF50", fontWeight: "bold" }}>
                        Stationery
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

export default Ccproducts;
