import React from 'react';
import { Typography, Box } from '@mui/material';

const SalesSummary = ({ summary }) => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Sales Summary
            </Typography>
            <Typography variant="body1" color="text.secondary">
                전체 주문량: <strong>{summary.totalRevenue}원</strong>
            </Typography>
            <Typography variant="body1" color="text.secondary">
                주문 수: <strong>{summary.totalOrders}건</strong>
            </Typography>
        </Box>
    );
};

export default SalesSummary;
