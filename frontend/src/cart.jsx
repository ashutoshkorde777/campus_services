import React from "react";
import { Box, Typography, Paper, IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = ({ cart, onRemove, onConfirm }) => {
  if (cart.length === 0) return null; // Cart only appears if there are items

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <Paper
      sx={{
        padding: 2,
        width: 300,
        position: "fixed",
        bottom: 20,
        right: 20,
        backgroundColor: "#fff",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center" }}>
        🛒 Cart
      </Typography>

      {cart.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 1,
            borderBottom: "1px solid #ddd",
          }}
        >
          <Typography variant="body2">{item.name}</Typography>
          <Typography variant="caption">₹{item.price}</Typography>
          <IconButton size="small" color="error" onClick={() => onRemove(index)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ))}

      <Typography variant="h6" sx={{ textAlign: "center", marginTop: 1, color: "#d32f2f" }}>
        Total: ₹{totalPrice}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 1, backgroundColor: "#4CAF50" }}
        onClick={onConfirm}
      >
        Confirm Order
      </Button>
    </Paper>
  );
};

export default Cart;
