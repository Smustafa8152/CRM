import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography, Paper, Avatar } from '@mui/material';
const customers = [
    {
        name: "Jacob Smith",
        avatar: "/avatars/avatar1.jpg",
        amount: "₹85,400",
        orders: 125
    },
    {
        name: "Robert Johnson",
        avatar: "/avatars/avatar2.jpg",
        amount: "₹52,300",
        orders: 98
    },
    {
        name: "Emily Davis",
        avatar: "/avatars/avatar3.jpg",
        amount: "₹45,200",
        orders: 85
    },
    {
        name: "Sarah Wilson",
        avatar: "/avatars/avatar4.jpg",
        amount: "₹34,500",
        orders: 75
    },
    {
        name: "David Anderson",
        avatar: "/avatars/avatar5.jpg",
        amount: "₹25,000",
        orders: 65
    }
];
export default function TopCustomers() {
    return (_jsxs(Paper, { sx: {
            p: 3,
            height: '100%',
            borderRadius: 2,
            boxShadow: 'none',
            border: '1px solid',
            borderColor: 'divider',
        }, children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', mb: 3 }, children: [_jsx(Typography, { variant: "h6", children: "Top Customers" }), _jsx(Typography, { variant: "body2", sx: {
                            color: 'primary.main',
                            cursor: 'pointer',
                            '&:hover': { textDecoration: 'underline' },
                        }, children: "View All" })] }), _jsx(Box, { sx: { display: 'flex', flexDirection: 'column', gap: 2 }, children: customers.map((customer, index) => (_jsxs(Box, { sx: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 1,
                        '&:hover': { bgcolor: 'action.hover' },
                        borderRadius: 1,
                    }, children: [_jsx(Avatar, { src: customer.avatar }), _jsxs(Box, { sx: { flexGrow: 1 }, children: [_jsx(Typography, { variant: "body2", fontWeight: 600, children: customer.name }), _jsxs(Typography, { variant: "caption", color: "text.secondary", children: [customer.orders, " Orders"] })] }), _jsx(Typography, { variant: "body2", fontWeight: 600, children: customer.amount })] }, index))) })] }));
}
