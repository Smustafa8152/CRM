import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Box, Typography, Card, CardContent, CardHeader, IconButton, Button, FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';
import { TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon, Download as DownloadIcon, CalendarToday as CalendarIcon, } from '@mui/icons-material';
const mockSalesData = [
    {
        period: 'Jan 2024',
        revenue: 450000,
        units: 45,
        profit: 135000,
        growth: 12.5,
    },
    {
        period: 'Feb 2024',
        revenue: 520000,
        units: 52,
        profit: 156000,
        growth: 15.6,
    },
    {
        period: 'Mar 2024',
        revenue: 480000,
        units: 48,
        profit: 144000,
        growth: -7.7,
    },
];
const mockTopProducts = [
    {
        name: 'iPhone 12 LCD + Touch',
        units: 25,
        revenue: 300000,
        growth: 15.2,
    },
    {
        name: 'Samsung S21 LCD + Touch',
        units: 20,
        revenue: 300000,
        growth: 8.5,
    },
    {
        name: 'iPhone 13 LCD + Touch',
        units: 15,
        revenue: 240000,
        growth: -5.2,
    },
];
const mockTopCustomers = [
    {
        name: 'Mobile Zone',
        purchases: 35,
        revenue: 420000,
        creditRating: 'A',
    },
    {
        name: 'Phone Paradise',
        purchases: 28,
        revenue: 336000,
        creditRating: 'B',
    },
    {
        name: 'Tech Solutions',
        purchases: 22,
        revenue: 264000,
        creditRating: 'A',
    },
];
export default function Reports() {
    const [timeRange, setTimeRange] = useState('month');
    const [selectedPeriod, setSelectedPeriod] = useState('Mar 2024');
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };
    const formatPercentage = (value) => {
        return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
    };
    const getGrowthColor = (value) => {
        return value >= 0 ? 'success.main' : 'error.main';
    };
    const getGrowthIcon = (value) => {
        return value >= 0 ? _jsx(TrendingUpIcon, {}) : _jsx(TrendingDownIcon, {});
    };
    return (_jsxs(Box, { children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', mb: 3 }, children: [_jsx(Typography, { variant: "h4", children: "Reports & Analytics" }), _jsxs(Box, { sx: { display: 'flex', gap: 2 }, children: [_jsxs(FormControl, { size: "small", sx: { minWidth: 120 }, children: [_jsx(InputLabel, { children: "Time Range" }), _jsxs(Select, { value: timeRange, label: "Time Range", onChange: (e) => setTimeRange(e.target.value), children: [_jsx(MenuItem, { value: "week", children: "This Week" }), _jsx(MenuItem, { value: "month", children: "This Month" }), _jsx(MenuItem, { value: "quarter", children: "This Quarter" }), _jsx(MenuItem, { value: "year", children: "This Year" })] })] }), _jsx(Button, { variant: "outlined", startIcon: _jsx(DownloadIcon, {}), onClick: () => {
                                    // TODO: Implement report download
                                }, children: "Export Report" })] })] }), _jsxs(Box, { sx: { display: 'flex', flexDirection: 'column', gap: 3 }, children: [_jsxs(Box, { sx: { display: 'flex', gap: 3 }, children: [_jsx(Box, { sx: { flex: 1 }, children: _jsxs(Card, { children: [_jsx(CardHeader, { title: "Sales Overview", action: _jsx(IconButton, { children: _jsx(CalendarIcon, {}) }) }), _jsx(CardContent, { children: _jsx(TableContainer, { children: _jsxs(Table, { size: "small", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Period" }), _jsx(TableCell, { align: "right", children: "Revenue" }), _jsx(TableCell, { align: "right", children: "Units" }), _jsx(TableCell, { align: "right", children: "Profit" }), _jsx(TableCell, { align: "right", children: "Growth" })] }) }), _jsx(TableBody, { children: mockSalesData.map((data) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: data.period }), _jsx(TableCell, { align: "right", children: formatCurrency(data.revenue) }), _jsx(TableCell, { align: "right", children: data.units }), _jsx(TableCell, { align: "right", children: formatCurrency(data.profit) }), _jsx(TableCell, { align: "right", sx: { color: getGrowthColor(data.growth) }, children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }, children: [getGrowthIcon(data.growth), formatPercentage(data.growth)] }) })] }, data.period))) })] }) }) })] }) }), _jsx(Box, { sx: { flex: 1 }, children: _jsxs(Card, { children: [_jsx(CardHeader, { title: "Top Products" }), _jsx(CardContent, { children: _jsx(TableContainer, { children: _jsxs(Table, { size: "small", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Product" }), _jsx(TableCell, { align: "right", children: "Units" }), _jsx(TableCell, { align: "right", children: "Revenue" }), _jsx(TableCell, { align: "right", children: "Growth" })] }) }), _jsx(TableBody, { children: mockTopProducts.map((product) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: product.name }), _jsx(TableCell, { align: "right", children: product.units }), _jsx(TableCell, { align: "right", children: formatCurrency(product.revenue) }), _jsx(TableCell, { align: "right", sx: { color: getGrowthColor(product.growth) }, children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }, children: [getGrowthIcon(product.growth), formatPercentage(product.growth)] }) })] }, product.name))) })] }) }) })] }) })] }), _jsx(Box, { children: _jsxs(Card, { children: [_jsx(CardHeader, { title: "Top Customers" }), _jsx(CardContent, { children: _jsx(TableContainer, { children: _jsxs(Table, { size: "small", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Customer" }), _jsx(TableCell, { align: "right", children: "Purchases" }), _jsx(TableCell, { align: "right", children: "Revenue" }), _jsx(TableCell, { align: "center", children: "Credit Rating" })] }) }), _jsx(TableBody, { children: mockTopCustomers.map((customer) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: customer.name }), _jsx(TableCell, { align: "right", children: customer.purchases }), _jsx(TableCell, { align: "right", children: formatCurrency(customer.revenue) }), _jsx(TableCell, { align: "center", children: _jsx(Typography, { sx: {
                                                                        color: customer.creditRating === 'A' ? 'success.main' : 'warning.main',
                                                                        fontWeight: 'bold',
                                                                    }, children: customer.creditRating }) })] }, customer.name))) })] }) }) })] }) })] })] }));
}
