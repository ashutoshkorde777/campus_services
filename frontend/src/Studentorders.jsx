import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Select,
  MenuItem,
  Chip,
  Box,
  Toolbar,
} from "@mui/material";
import { MonetizationOn, Cancel } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import axios from 'axios'

const Queue = () => {
  const [orders, setOrders] = useState([
    {
      _id: "1",
      studentId: "student1",
      serviceIds: ["2 Samosa", "1 Tea"],
      orderDate: new Date("2024-08-25T10:00:00"),
      status: "pending",
      paymentStatus: "notpaid",
      amount: 65,
    },
    {
      _id: "2",
      studentId: "student2",
      serviceIds: ["2 Burger"],
      orderDate: new Date("2024-08-24T12:00:00"),
      status: "completed",
      paymentStatus: "paid",
      amount: 150,
    },
    {
      _id: "3",
      studentId: "student3",
      serviceIds: ["1 Pizza"],
      orderDate: new Date("2024-08-23T14:30:00"),
      status: "pending",
      paymentStatus: "paid",
      amount: 150,
    },
  ]);

  const [filterPayment, setFilterPayment] = useState("all");
  const [filterTime, setFilterTime] = useState("latest");
  const [filterStatus, setFilterStatus] = useState("all"); // New state for status filter


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/provider/${1}`); // Adjust the URL to your API endpoint
        console.log(response.data);

        const transformedOrders = response.data.map(order => {
          // Extract service names and quantities from the listOfProducts array
          const serviceIds = order.listOfProducts.map(product => `${product.quantity} ${product.service}`);
        
          return {
            _id: order.studentId.toString(), // Assuming the studentId is unique as _id
            studentId: `student${order.studentId}`, // Transform studentId to the desired format
            serviceIds: serviceIds, // Array of service names with quantities
            orderDate: new Date(order.orderDate), // Convert string to Date object
            status: order.status, // Order status
            paymentStatus: order.paymentStatus, // Payment status
            amount: order.amount, // Amount
            otp: order.otp
          };
        });

        setOrders(transformedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Function to update order status
  const handleStatusChange = (id, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  // Apply filters
  const filteredOrders = orders
    .filter((order) => {
      if (filterPayment !== "all" && order.paymentStatus !== filterPayment) {
        return false;
      }
      if (filterStatus !== "all" && order.status !== filterStatus) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      return filterTime === "latest"
        ? new Date(b.orderDate) - new Date(a.orderDate)
        : new Date(a.orderDate) - new Date(b.orderDate);
    });

  return (
    <div className="dashboard-container" style={{ display: "flex" }}>
      <Sidebar />
      <div className="content" style={{ flexGrow: 1, padding: "20px" }}>
        <Navbar />
        <Container maxWidth="lg" align="center">
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, color: "#333", alignContent:"center"}}>
            📋 My Orders
          </Typography>

          {/* Filter Section */}
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mr: 1 }}>
                Filter by Payment:
              </Typography>
              <Select
                value={filterPayment}
                onChange={(e) => setFilterPayment(e.target.value)}
                size="small"
                sx={{ width: 150 }}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="notpaid">Not Paid</MenuItem>
              </Select>
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mr: 1 }}>
                Sort by Time:
              </Typography>
              <Select
                value={filterTime}
                onChange={(e) => setFilterTime(e.target.value)}
                size="small"
                sx={{ width: 150 }}
              >
                <MenuItem value="latest">Latest First</MenuItem>
                <MenuItem value="oldest">Oldest First</MenuItem>
              </Select>
            </Box>

            {/* New Status Filter */}
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mr: 1 }}>
                Filter by Status:
              </Typography>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                size="small"
                sx={{ width: 150 }}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="canceled">Cancelled</MenuItem>
              </Select>
            </Box>
          </Toolbar>

          <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 4, overflow: "hidden" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1976D2" }}>
                  {["Order ID", "Student ID", "Orders", "Order Date", "Status", "Payment", "Amount","OTP"].map((header) => (
                    <TableCell key={header} sx={{ color: "white", fontWeight: "bold" }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order._id} hover>
                    <TableCell sx={{ fontWeight: "bold", color: "#333" }}>{order._id}</TableCell>
                    <TableCell>{order.studentId}</TableCell>
                    <TableCell>{order.serviceIds.join(", ")}</TableCell>
                    <TableCell>{new Date(order.orderDate).toLocaleString()}</TableCell>
                    {/* Status Dropdown */}
                    <TableCell>
                      <Select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        size="small"
                        sx={{
                          fontWeight: "bold",
                          width: 150,
                          height: 35,
                          borderRadius: 2,
                          bgcolor:
                            order.status === "pending"
                              ? "#FFEB3B"
                              : order.status === "completed"
                              ? "#4CAF50"
                              : "#F44336",
                          color: "#fff",
                          p: 1,
                          "& .MuiSelect-icon": { color: "#fff" },
                        }}
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                        <MenuItem value="canceled">Cancelled</MenuItem>
                      </Select>
                    </TableCell>
                    {/* Payment Status */}
                    <TableCell>
                      <Chip
                        label={order.paymentStatus === "paid" ? "Paid" : "Not Paid"}
                        color={order.paymentStatus === "paid" ? "success" : "error"}
                        icon={order.paymentStatus === "paid" ? <MonetizationOn /> : <Cancel />}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#1976D2" }}>
                      ₹{order.amount}
                    </TableCell>
                    <TableCell >
                      {order.otp}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
    </div>
  );
};

export default Queue;
