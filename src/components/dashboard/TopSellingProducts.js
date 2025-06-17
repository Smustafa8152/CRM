import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography, Avatar, LinearProgress, Paper } from '@mui/material';
const products = [
    {
        name: "Samsung Galaxy S21 LCD",
        price: "₹12,999",
        sold: 85,
        image: "/products/s21-lcd.jpg"
    },
    {
        name: "iPhone 13 Pro Display",
        price: "₹24,999",
        sold: 75,
        image: "/products/iphone13-display.jpg"
    },
    {
        name: "OnePlus 9 Pro Screen",
        price: "₹15,999",
        sold: 65,
        image: "/products/oneplus9-screen.jpg"
    },
    {
        name: "Xiaomi Mi 11 LCD",
        price: "₹9,999",
        sold: 60,
        image: "/products/mi11-lcd.jpg"
    },
    {
        name: "Vivo X60 Display",
        price: "₹11,999",
        sold: 55,
        image: "/products/vivo-display.jpg"
    }
];
export default function TopSellingProducts() {
    return (_jsxs(Paper, { sx: {
            p: 3,
            height: '100%',
            borderRadius: 2,
            boxShadow: 'none',
            border: '1px solid',
            borderColor: 'divider',
        }, children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', mb: 3 }, children: [_jsx(Typography, { variant: "h6", children: "Top Selling Products" }), _jsx(Typography, { variant: "body2", sx: {
                            color: 'primary.main',
                            cursor: 'pointer',
                            '&:hover': { textDecoration: 'underline' },
                        }, children: "View All" })] }), _jsx(Box, { sx: { display: 'flex', flexDirection: 'column', gap: 2 }, children: products.map((product, index) => (_jsxs(Box, { sx: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 1,
                        '&:hover': { bgcolor: 'action.hover' },
                        borderRadius: 1,
                    }, children: [_jsx(Avatar, { src: product.image, variant: "rounded", sx: { width: 42, height: 42 } }), _jsxs(Box, { sx: { flexGrow: 1, minWidth: 0 }, children: [_jsx(Typography, { variant: "body2", noWrap: true, fontWeight: 600, children: product.name }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: product.price })] }), _jsx(Box, { sx: { width: 100 }, children: _jsx(LinearProgress, { variant: "determinate", value: product.sold, sx: {
                                    height: 6,
                                    borderRadius: 3,
                                    bgcolor: 'action.hover',
                                    '& .MuiLinearProgress-bar': {
                                        borderRadius: 3,
                                        bgcolor: 'primary.main',
                                    },
                                } }) })] }, index))) })] }));
}
