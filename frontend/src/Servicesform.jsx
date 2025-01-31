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
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('customId', formData.customId);
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('stock', formData.stock);
    data.append('requiresFiles', formData.requiresFiles);
    data.append('category', formData.category);
    if (image) {
      data.append('image', image);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/serviceprovider/services', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Service added successfully!');
      setFormData({
        customId: '',
        name: '',
        description: '',
        price: '',
        stock: '',
        requiresFiles: false,
        category: 'Service',
      });
      setImage(null);
    } catch (error) {
      setMessage('Error adding service: ' + error.response?.data?.message || error.message);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3, border: '1px solid #ddd', borderRadius: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Add Service
      </Typography>
      {message && <Typography color="error" variant="body2" align="center" gutterBottom>{message}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Custom ID"
          name="customId"
          value={formData.customId}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
        />
        
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
        />
        
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
          multiline
          rows={4}
        />
        
        <TextField
          label="Price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
          type="number"
        />
        
        <TextField
          label="Stock"
          name="stock"
          value={formData.stock}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
        />
        
        <FormControlLabel
          control={<Checkbox checked={formData.requiresFiles} onChange={handleInputChange} name="requiresFiles" />}
          label="Requires Files"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <MenuItem value="Service">Service</MenuItem>
            <MenuItem value="Item">Item</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          component="label"
          fullWidth
          margin="normal"
          sx={{ marginBottom: 2 }}
        >
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            hidden
            required
          />
        </Button>
        
        {image && (
          <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
            <Typography variant="body2">{image.name}</Typography>
          </Box>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Add Service'}
        </Button>
      </form>
    </Box>
  );
};

export default ServiceForm;
