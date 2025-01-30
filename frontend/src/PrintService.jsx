import React, { useState } from 'react';
import { Container, Typography, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UploadFile, Print } from '@mui/icons-material';
import axios from 'axios';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import Sidebar from './Sidebar';
import Navbar from './Navbar';


const PrintService = () => {
    const [file, setFile] = useState(null);
    const [numPages, setNumPages] = useState(0);
    const [printOption, setPrintOption] = useState('single');
    const [price, setPrice] = useState(0);
    const navigate = useNavigate();

    const basePricePerPage = 5; // Set your price per page

    const handleFileChange = async (e) => {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);

        if (uploadedFile && uploadedFile.type === "application/pdf") {
            const reader = new FileReader();
            reader.onload = async function () {
                const arrayBuffer = reader.result;
                const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                setNumPages(pdf.numPages);
                calculatePrice(pdf.numPages, printOption);
            };
            reader.readAsArrayBuffer(uploadedFile);
        } else {
            alert("Please upload a PDF file.");
        }
    };

    const handleOptionChange = (e) => {
        setPrintOption(e.target.value);
        calculatePrice(numPages, e.target.value);
    };

    const calculatePrice = (pages, option) => {
        if (pages > 0) {
            const multiplier = option === 'single' ? 1 : 1.5;
            setPrice(pages * basePricePerPage * multiplier);
        } else {
            setPrice(0);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please upload a file first.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('printOption', printOption);
        formData.append('numPages', numPages);

        try {
            const response = await axios.post('http://localhost:5000/api/print', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('File uploaded successfully:', response.data);
            navigate('/payment', { state: { price } });
        } catch (error) {
            console.error('Error uploading file:', error.response ? error.response.data : error.message);
        }
    };

    return (

        <div className="dashboard-container">
      <Sidebar />
      <div className="content">  {/* Use the "content" class here */}
        <Navbar />
        <Container maxWidth="md" sx={{ mt: 5}}>
            <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, backgroundColor: '#f9f9f9' }}>
                <Typography variant="h4" gutterBottom fontWeight="bold" textAlign="center" color="primary">
                    Print Service
                </Typography>

                <form onSubmit={handleSubmit}>
                    {/* File Upload */}
                    <Box textAlign="center" mb={3}>
                        <input type="file" id="file-upload" style={{ display: 'none' }} onChange={handleFileChange} required />
                        <label htmlFor="file-upload">
                            <Button variant="contained" component="span" startIcon={<UploadFile />} sx={{ textTransform: 'none', backgroundColor: '#4CAF50' }}>
                                {file ? file.name : "Upload File"}
                            </Button>
                        </label>
                    </Box>

                    {/* Show Number of Pages */}
                    {numPages > 0 && (
                        <Typography textAlign="center" color="secondary">
                            Pages: {numPages}
                        </Typography>
                    )}

                    {/* Print Options */}
                    <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
                        <FormLabel component="legend" sx={{ fontWeight: 'bold', color: '#333' }}>Print Options</FormLabel>
                        <RadioGroup row value={printOption} onChange={handleOptionChange}>
                            <FormControlLabel value="single" control={<Radio />} label="Single-sided" />
                            <FormControlLabel value="double" control={<Radio />} label="Double-sided" />
                        </RadioGroup>
                    </FormControl>

                    {/* Price Section */}
                    <Typography variant="h6" textAlign="center" sx={{ color: 'green', fontWeight: 'bold', mb: 3 }}>
                        Price: ₹{price}
                    </Typography>

                    {/* Submit Button */}
                    <Grid container justifyContent="center">
                        <Button type="submit" variant="contained" color="primary" startIcon={<Print />} sx={{ textTransform: 'none', padding: '10px 20px', fontSize: '16px', borderRadius: 3 }}>
                            Proceed to Payment
                        </Button>
                    </Grid>
                </form>
            </Paper>
        </Container>
      </div>
    </div>










        
    );
};

export default PrintService;
