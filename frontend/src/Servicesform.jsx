import React, { useState, useContext } from 'react';
import axios from 'axios';
import { TextField, Button, Checkbox, FormControlLabel, Select, MenuItem, InputLabel, FormControl, Input, CircularProgress, Box, Typography } from '@mui/material';
import UserContext from './UserContext';

const ServiceForm = () => {
  const [formData, setFormData] = useState({
    customId: '',
    name: '',
    description: '',
    price: '',
    stock: '',
    requiresFiles: false,
    category: 'Service', // Default to 'Service'
  });

  const { user } = useContext(UserContext); // Access context values

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('customId', formData.customId);
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('stock', formData.stock);
    formDataToSend.append('requiresFiles', formData.requiresFiles);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('image', image);
    formDataToSend.append('providerId', user._id||''); // Add user ID to form data
    console.log('User ID:', user._id);
    try {
      const response = await axios.post('http://localhost:5000/api/serviceprovider/services', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        },
      });
      setMessage('Service added successfully');
    } catch (error) {
      console.error('Error adding service:', error.response ? error.response.data : error.message);
      setMessage('Error adding service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h4">Add Service</Typography>
      <TextField label="Custom ID" name="customId" value={formData.customId} onChange={handleInputChange} fullWidth margin="normal" />
      <TextField label="Name" name="name" value={formData.name} onChange={handleInputChange} fullWidth margin="normal" />
      <TextField label="Description" name="description" value={formData.description} onChange={handleInputChange} fullWidth margin="normal" />
      <TextField label="Price" name="price" value={formData.price} onChange={handleInputChange} fullWidth margin="normal" />
      <TextField label="Stock" name="stock" value={formData.stock} onChange={handleInputChange} fullWidth margin="normal" />
      <FormControlLabel control={<Checkbox checked={formData.requiresFiles} onChange={handleInputChange} name="requiresFiles" />} label="Requires Files" />
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select name="category" value={formData.category} onChange={handleInputChange}>
          <MenuItem value="Service">Service</MenuItem>
          <MenuItem value="Item">Product</MenuItem>
        </Select>
      </FormControl>
      <Input type="file" onChange={handleImageChange} fullWidth margin="normal" />
      {loading ? <CircularProgress /> : <Button type="submit" variant="contained" color="primary">Add Service</Button>}
      {message && <Typography>{message}</Typography>}
    </Box>
  );
};

export default ServiceForm;
