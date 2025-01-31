import React, { useMemo } from 'react';

import { Box, Typography, Paper, IconButton } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import MenuIcon from '@mui/icons-material/Menu';



const DonutChart = ({priorityCount=[]}) => {
  
  

    const data = [
        { name: 'Breakfast', value: 233, color: '#ffcc80' },   // Light Orange
        { name: 'Lunch', value: 176, color: '#ff9800' },       // Deep Orange
        { name: 'Snacks', value: 322, color: '#f44336' },      // Red
        { name: 'Beverages', value: 274, color: '#4caf50' },   // Green
    ];
    

  

  return (
    <Paper elevation={3} style={{ padding: '16px', textAlign: 'center' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="body1" style={{color: '#757575', fontWeight: 'bold' }}>
          Sells By Category
        </Typography>
        <IconButton>
          <MenuIcon fontSize="small" />
        </IconButton>
      </Box>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            paddingAngle={5}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <Box mt={2}>
        {data.map((entry, index) => (
          <Box key={index} display="flex" justifyContent="center" alignItems="center" mb={0.5}>
            <Typography variant="body2" style={{ fontWeight: 'bold', marginRight: '4px' }}>
              {entry.value}
            </Typography>
            <Typography variant="body2" style={{ color: '#757575', marginRight: '8px' }}>
              {entry.name}
            </Typography>
            <Typography variant="body2" style={{ color: '#757575' }}>
            {((entry.value / data.reduce((acc, curr) => acc + curr.value, 0)) * 100).toFixed(0)}%
            </Typography>
          </Box>
        ))}
      </Box>
      <Box mt={2} display="flex" justifyContent="center" alignItems="center">
        {data.map((entry, index) => (
          <Box key={index} display="flex" alignItems="center" mr={2}>
            <Box
              width={12}
              height={12}
              style={{ backgroundColor: entry.color, borderRadius: '50%', marginRight: '8px' }}
            />
            <Typography variant="body2" style={{ color: '#757575' }}>
              {entry.name} priority
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default DonutChart;
