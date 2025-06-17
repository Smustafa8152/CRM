import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography, Paper, Avatar, Chip } from '@mui/material';
const sales = [
    {
        customer: {
            name: "John Smith",
            avatar: "/avatars/avatar1.jpg"
        },
        product: "iPhone 13 Pro Display",
        amount: "₹24,999",
        status: "completed"
    },
    {
        customer: {
            name: "Sarah Johnson",
            avatar: "/avatars/avatar2.jpg"
        },
        product: "Samsung S21 LCD",
        amount: "₹12,999",
        status: "pending"
    },
    {
        customer: {
            name: "Michael Brown",
            avatar: "/avatars/avatar3.jpg"
        },
        product: "OnePlus 9 Screen",
        amount: "₹15,999",
        status: "completed"
    },
    {
        customer: {
            name: "Emily Davis",
            avatar: "/avatars/avatar4.jpg"
        },
        product: "Xiaomi Mi 11 LCD",
        amount: "₹9,999",
        status: "cancelled"
    }
];
const getStatusColor = (status) => {
    switch (status) {
        case 'completed':
            return {
                color: '#28C76F',
                bgcolor: '#28C76F15',
            };
        case 'pending':
            return {
                color: '#FF9F43',
                bgcolor: '#FF9F4315',
            };
        case 'cancelled':
            return {
                color: '#EA5455',
                bgcolor: '#EA545515',
            };
    }
};
export default function RecentSales() {
    return (_jsxs(Paper, { sx: {
            p: 3,
            height: '100%',
            borderRadius: 2,
            boxShadow: 'none',
            border: '1px solid',
            borderColor: 'divider',
        }, children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', mb: 3 }, children: [_jsx(Typography, { variant: "h6", children: "Recent Sales" }), _jsx(Typography, { variant: "body2", sx: {
                            color: 'primary.main',
                            cursor: 'pointer',
                            '&:hover': { textDecoration: 'underline' },
                        }, children: "View All" })] }), _jsx(Box, { sx: { display: 'flex', flexDirection: 'column', gap: 2 }, children: sales.map((sale, index) => {
                    const statusColor = getStatusColor(sale.status);
                    return (_jsxs(Box, { sx: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            p: 1,
                            '&:hover': { bgcolor: 'action.hover' },
                            borderRadius: 1,
                        }, children: [_jsx(Avatar, { src: sale.customer.avatar }), _jsxs(Box, { sx: { flexGrow: 1, minWidth: 0 }, children: [_jsx(Typography, { variant: "body2", noWrap: true, fontWeight: 600, children: sale.customer.name }), _jsx(Typography, { variant: "body2", color: "text.secondary", noWrap: true, children: sale.product })] }), _jsxs(Box, { sx: { textAlign: 'right' }, children: [_jsx(Typography, { variant: "body2", fontWeight: 600, children: sale.amount }), _jsx(Chip, { label: sale.status, size: "small", sx: {
                                            color: statusColor.color,
                                            bgcolor: statusColor.bgcolor,
                                            textTransform: 'capitalize',
                                        } })] })] }, index));
                }) })] }));
}
