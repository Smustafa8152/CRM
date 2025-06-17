import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Box, Paper, Typography, useTheme, IconButton, Menu, MenuItem } from '@mui/material';
import { TrendingUp as TrendingUpIcon, ShoppingCart as ShoppingCartIcon, SwapHoriz as ReturnIcon, Inventory as InventoryIcon, } from '@mui/icons-material';
import TopSellingProducts from '../components/dashboard/TopSellingProducts';
import OrderStatistics from '../components/dashboard/OrderStatistics';
import OverallInformation from '../components/dashboard/OverallInformation';
import RecentSales from '../components/dashboard/RecentSales';
import SalesStatistics from '../components/dashboard/SalesStatistics';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import TopCustomers from '../components/dashboard/TopCustomers';
import TopCategories from '../components/dashboard/TopCategories';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
const StatCard = ({ title, value, trend, trendValue, icon, iconColor }) => {
    const theme = useTheme();
    return (_jsx(Paper, { sx: {
            p: 3,
            height: '100%',
            bgcolor: ({ palette }) => iconColor === palette.primary.main ? '#FF9F4315' :
                iconColor === palette.info.main ? '#1B285015' :
                    iconColor === palette.success.main ? '#28C76F15' :
                        iconColor === palette.error.main ? '#00CFE815' : 'background.paper',
            borderRadius: 2,
            boxShadow: 'none',
            border: '1px solid',
            borderColor: 'divider',
        }, children: _jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }, children: [_jsxs(Box, { children: [_jsx(Typography, { color: "text.secondary", variant: "body2", gutterBottom: true, children: title }), _jsx(Typography, { variant: "h4", sx: { mb: 2, fontWeight: 'bold' }, children: value }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center' }, children: [_jsxs(Typography, { variant: "body2", color: trend === 'up' ? 'success.main' : 'error.main', sx: { display: 'flex', alignItems: 'center' }, children: [_jsx(TrendingUpIcon, { sx: {
                                                fontSize: '1rem',
                                                mr: 0.5,
                                                transform: trend === 'down' ? 'rotate(180deg)' : 'none',
                                            } }), trendValue] }), _jsx(Typography, { variant: "body2", color: "text.secondary", sx: { ml: 1 }, children: "vs last month" })] })] }), _jsx(Box, { sx: {
                        p: 1,
                        borderRadius: 2,
                        bgcolor: `${iconColor}15`,
                        color: iconColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }, children: icon })] }) }));
};
export default function Dashboard() {
    const theme = useTheme();
    const [inventoryMenuAnchor, setInventoryMenuAnchor] = useState(null);
    const handleInventoryMenuOpen = (event) => {
        setInventoryMenuAnchor(event.currentTarget);
    };
    const handleInventoryMenuClose = () => setInventoryMenuAnchor(null);
    const handleInventoryMenuSelect = (option) => {
        // You can route or open the relevant CRM screen here
        alert(`Selected: ${option}`);
        setInventoryMenuAnchor(null);
    };
    return (_jsxs(Box, { children: [_jsxs(Box, { sx: {
                    display: 'grid',
                    gap: 3,
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: '1fr 1fr',
                        lg: 'repeat(4, 1fr)',
                    },
                    mb: 3,
                }, children: [_jsx(StatCard, { title: "Total Sales", value: "\u20B945,87,078", trend: "up", trendValue: "+22%", icon: _jsx(TrendingUpIcon, {}), iconColor: theme.palette.primary.main }), _jsx(StatCard, { title: "Total Sales Return", value: "\u20B916,478,145", trend: "down", trendValue: "-22%", icon: _jsx(ReturnIcon, {}), iconColor: theme.palette.info.main }), _jsx(StatCard, { title: "Total Purchase", value: "\u20B924,145,789", trend: "up", trendValue: "+22%", icon: _jsx(ShoppingCartIcon, {}), iconColor: theme.palette.success.main }), _jsxs(Paper, { sx: {
                            p: 3,
                            height: '100%',
                            bgcolor: '#F4F5FA',
                            borderRadius: 2,
                            boxShadow: 'none',
                            border: '1px solid',
                            borderColor: 'divider',
                            position: 'relative',
                        }, children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }, children: [_jsx(Typography, { color: "text.secondary", variant: "body2", gutterBottom: true, children: "Inventory" }), _jsx(IconButton, { size: "small", onClick: handleInventoryMenuOpen, children: _jsx(ArrowDropDownIcon, {}) }), _jsxs(Menu, { anchorEl: inventoryMenuAnchor, open: Boolean(inventoryMenuAnchor), onClose: handleInventoryMenuClose, children: [_jsx(MenuItem, { onClick: () => handleInventoryMenuSelect('Products'), children: "Products" }), _jsx(MenuItem, { onClick: () => handleInventoryMenuSelect('Low Stocks'), children: "Low Stocks" }), _jsx(MenuItem, { onClick: () => handleInventoryMenuSelect('Category'), children: "Category" }), _jsx(MenuItem, { onClick: () => handleInventoryMenuSelect('Brands'), children: "Brands" })] })] }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }, children: [_jsx(Typography, { variant: "h4", sx: { mb: 2, fontWeight: 'bold' }, children: "1,245" }), _jsx(Box, { sx: {
                                            p: 1,
                                            borderRadius: 2,
                                            bgcolor: '#1B285015',
                                            color: '#1B2850',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }, children: _jsx(InventoryIcon, {}) })] }), _jsx(Typography, { variant: "body2", color: "success.main", children: "+5% this month" })] })] }), _jsxs(Box, { sx: {
                    display: 'grid',
                    gap: 3,
                    gridTemplateColumns: {
                        xs: '1fr',
                        lg: '2fr 1fr',
                    },
                    mb: 3,
                }, children: [_jsx(SalesStatistics, {}), _jsx(TopCategories, {})] }), _jsxs(Box, { sx: {
                    display: 'grid',
                    gap: 3,
                    gridTemplateColumns: {
                        xs: '1fr',
                        lg: '2fr 1fr',
                    },
                    mb: 3,
                }, children: [_jsx(TopSellingProducts, {}), _jsx(OrderStatistics, {})] }), _jsxs(Box, { sx: {
                    display: 'grid',
                    gap: 3,
                    gridTemplateColumns: {
                        xs: '1fr',
                        lg: '1fr 1fr',
                    },
                    mb: 3,
                }, children: [_jsx(RecentTransactions, {}), _jsx(TopCustomers, {})] }), _jsxs(Box, { sx: {
                    display: 'grid',
                    gap: 3,
                    gridTemplateColumns: {
                        xs: '1fr',
                        lg: '1fr 1fr',
                    },
                }, children: [_jsx(OverallInformation, {}), _jsx(RecentSales, {})] })] }));
}
