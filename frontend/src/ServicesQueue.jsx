import React, { useState } from "react";
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
  Button,
} from "@mui/material";
import { MonetizationOn, Cancel, CloudDownload } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const PrintQueue = () => {
  const [orders, setOrders] = useState([
    {
      _id: "1",
      studentId: "student1",
      printType: "One Side",
      colorMode: "Color",
      attachment: "file1.pdf",
      orderDate: new Date("2024-08-25T10:00:00"),
      status: "pending",
      paymentStatus: "notpaid",
      amount: 65,
    },
    {
      _id: "2",
      studentId: "student2",
      printType: "Two Side",
      colorMode: "Black & White",
      attachment: "file2.pdf",
      orderDate: new Date("2024-08-24T12:00:00"),
      status: "completed",
      paymentStatus: "paid",
      amount: 150,
    },
    {
      _id: "3",
      studentId: "student3",
      printType: "One Side",
      colorMode: "Black & White",
      attachment: "file3.pdf",
      orderDate: new Date("2024-08-23T14:30:00"),
      status: "pending",
      paymentStatus: "paid",
      amount: 90,
    },
  ]);

  const [filterPayment, setFilterPayment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Update Order Status
  const handleStatusChange = (id, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  // Apply Filters
  const filteredOrders = orders.filter((order) => {
    if (filterPayment !== "all" && order.paymentStatus !== filterPayment) {
      return false;
    }
    if (filterStatus !== "all" && order.status !== filterStatus) {
      return false;
    }
    return true;
  });

  return (
    <div className="dashboard-container" style={{ display: "flex" }}>
      <Sidebar />
      <div className="content" style={{ flexGrow: 1, padding: "20px" }}>
        <Navbar />
        <Container maxWidth="lg" align="center">
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mb: 3,
              color: "#333",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              marginTop: 5,
            }}
          >
            🖨️ Print Order Queue
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

          {/* Table */}
          <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 4, overflow: "hidden" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1976D2" }}>
                  {["Order ID", "Student ID", "Print Type", "Color Mode", "Attachment", "Order Date", "Status", "Payment", "Amount"].map(
                    (header) => (
                      <TableCell key={header} sx={{ color: "white", fontWeight: "bold" }}>
                        {header}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order._id} hover>
                    <TableCell sx={{ fontWeight: "bold", color: "#333" }}>{order._id}</TableCell>
                    <TableCell>{order.studentId}</TableCell>
                    <TableCell>{order.printType}</TableCell>
                    <TableCell>{order.colorMode}</TableCell>
                    {/* Attachment Column */}
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<CloudDownload />}
                        onClick={() => window.open(order.attachment, "_blank")}
                      >
                        Download
                      </Button>
                    </TableCell>
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

export default PrintQueue;
