import React, { useMemo, useState, useContext, useEffect } from 'react';
import { Box, Typography, Paper, Grid, LinearProgress } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DonutChart from './DonutChart';
import './Vendordashboard.css';
import UserContext from './UserContext';
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const NavigationHeader = ({ title, subtitle, user, selectedRole }) => (
    <Box display="flex" alignItems="center" padding={{ xs: '8px', sm: '16px' }} flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
        {selectedRole?.designation === "Admin" && <NavLink to="/adminFunctionalities" style={{ textDecoration: 'none', color: '#1A73E8', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="create-ticket-card">
                <div className="create-ticket-body">Admin Functionalities</div>
            </div>
        </NavLink>}

        <NavLink to="/createTicket" style={{ textDecoration: 'none', color: '#1A73E8', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="create-ticket-card">
                <CiCirclePlus className="create-ticket-icon" />
                <div className="create-ticket-body">Create Ticket</div>
            </div>
        </NavLink>
    </Box>
);

const SummaryBoxes = ({ summaryData, onCardClick }) => (
    <Grid container spacing={2} justifyContent="center" padding={{ xs: '8px', sm: '16px' }}>
        {summaryData.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={2}>
                <Paper
                    elevation={3}
                    style={{ padding: '16px', textAlign: 'center', cursor: 'pointer' }}
                    onClick={() => onCardClick(item.label)}
                >
                    <Typography variant="h5" style={{ color: '#1A73E8', fontWeight: 'bold' }}>
                        {item.value}
                    </Typography>
                    <Typography variant="body2" style={{ color: '#757575' }}>
                        {item.label}
                    </Typography>
                </Paper>
            </Grid>
        ))}
    </Grid>
);

const TicketStatus = ({ statusData }) => (
    <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="body1" gutterBottom style={{ color: '#757575', fontWeight: 'bold' }}>
                Unresolved tickets by status
            </Typography>
            <AccessTimeIcon style={{ color: '#757575' }} />
        </Box>
        {statusData.map((status, index) => (
            <Box key={index} display="flex" flexDirection="column" mb={2}>
                <Box display="flex" alignItems="center" mb={1}>
                    <Typography variant="body2" style={{ flexGrow: 1 }}>
                        {status.label}
                    </Typography>
                    <Typography variant="body2">{status.percentage}%</Typography>
                    <Typography variant="body2" style={{ marginLeft: 8 }}>
                        {status.count}
                    </Typography>
                </Box>
                <LinearProgress variant="determinate" value={status.percentage} />
            </Box>
        ))}
    </Box>
);

const CategoryWiseTickets = ({ categories }) => (
    <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="body1" gutterBottom style={{ color: '#757575', fontWeight: 'bold' }}>
                Best Selling Products
            </Typography>
            <AccessTimeIcon style={{ color: '#757575' }} />
        </Box>
        {categories.map((category, index) => (
            <Box key={index} mb={2}>
                <Box display="flex" alignItems="center" mb={1}>
                    <Typography variant="body2" style={{ flexGrow: 1 }}>
                        {category.label}
                    </Typography>
                    <Typography variant="body2">{category.percentage}%</Typography>
                    <Typography variant="body2" style={{ marginLeft: 8 }}>
                        {category.count}
                    </Typography>
                </Box>
                <LinearProgress
                    variant="determinate"
                    value={category.percentage}
                    style={{
                        backgroundColor: index % 2 === 0 ? '#e0f7fa' : '#e3f2fd',
                        color: '#0288d1',
                    }}
                />
            </Box>
        ))}
    </Box>
);




function App() {

    const [tickets, setTickets] = useState([]);
    const [departmentTickets, setDepartmentTickets] = useState([]);
    const [ticketSummary, setTicketSummary] = useState({});


    const navigate = useNavigate(); // Initialize useNavigate

    const handleCardClick = (label) => { }

    // Calculate summary data
    const summaryData = useMemo(() => {

        return [
            { label: 'Total Sales', value: '₹12,500' },       // Total revenue generated
            { label: 'Orders Today', value: '120 orders' },   // Number of orders placed today
            { label: 'Pending Orders', value: '15 orders' },  // Orders yet to be completed
            { label: 'Completed Orders', value: '100 orders' }, // Successfully delivered orders
            { label: 'Cancelled Orders', value: '5 orders' }, // Orders canceled today
            { label: 'All Orders', value: '3,500 orders' }    // Total orders since canteen opened
        ];

    }, [tickets, ticketSummary]);



    // Calculate category-wise data
    const categories = useMemo(() => {
        const total = 3500; // Total number of orders (example value)

        return [
            { label: 'Burger', count: 80, percentage: ((800 / total) * 100).toFixed(2) },
            { label: 'Sandwich', count: 72, percentage: ((700 / total) * 100).toFixed(2) },
            { label: 'Pizza', count: 25, percentage: ((600 / total) * 100).toFixed(2) },
            { label: 'Samosa', count: 153, percentage: ((500 / total) * 100).toFixed(2) },
            { label: 'Vada Pav', count: 233, percentage: ((400 / total) * 100).toFixed(2) },
            { label: 'Tea', count: 323, percentage: ((300 / total) * 100).toFixed(2) },
            { label: 'Coffee', count: 207, percentage: ((200 / total) * 100).toFixed(2) },
        ];
    }, []);

    return (

        <div>
            <Sidebar />
            <div>  {/* Use the "content" class here */}
                <Navbar />
                <div className="content2">

                <Box p={{ xs: '8px', sm: '16px' }}>
                    {console.log("rendering dashboard")}

                    <div className="topline">
                    </div>

                    <SummaryBoxes summaryData={summaryData} onCardClick={handleCardClick} />

                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} md={4}>
                            <DonutChart priorityCount={ticketSummary.priority} />
                            {/* <Paper elevation={3} style={{ padding: '16px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          </Paper> */}
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper elevation={3} style={{ padding: '16px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <CategoryWiseTickets categories={categories} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>

                </div>
                


            </div>
        </div>



    );
}

export default App;

{/* <SummaryBoxes summaryData={summaryData} onCardClick={handleCardClick} />  */ }
