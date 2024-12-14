import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Card, Grid, Typography, Box, CircularProgress } from '@mui/material';
import SalesSummary from "./SalesSummary";
import SalesChart from "./SalesChart";
import TopSalesChart from "./TopSalesChart";

const Sales = () => {
    const [summary, setSummary] = useState({});
    const [salesData, setSalesData] = useState([]);
    const [topSalesData, setTopSalesData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const summaryResponse = await axios.get('/admin/sales/summary');
                const salesResponse = await axios.get('/admin/sales/data');
                const topSalesData = await axios.get('/admin/sales/topSalesData');
                setSummary(summaryResponse.data);
                setSalesData(salesResponse.data);
                setTopSalesData(topSalesData.data);
            } catch (error) {
                console.error('Failed to fetch sales data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <CircularProgress sx={{ display: 'block', margin: 'auto', marginTop: 5 }} />;

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom align="center">
                Sales Dashboard
            </Typography>

            <Grid container spacing={3}>
                {/* Sales Summary Card */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ padding: 3, backgroundColor: '#f5f5f5', boxShadow: 3 }}>
                        <SalesSummary summary={summary} />
                    </Card>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                {/* Sales Chart */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ padding: 3, backgroundColor: '#f5f5f5', boxShadow: 3 }}>
                        <SalesChart data={salesData} />
                    </Card>
                </Grid>
                {/* Sales Summary Card */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ padding: 3, backgroundColor: '#f5f5f5', boxShadow: 3 }}>
                        <TopSalesChart data={topSalesData} />
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Sales;
