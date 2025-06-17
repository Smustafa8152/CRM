import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography, Paper, Avatar, Chip } from '@mui/material';
const transactions = [
    {
        date: "14 Aug 2023",
        customer: {
            name: "Darrell Steward",
            avatar: "/avatars/avatar1.jpg"
        },
        amount: "₹2,500",
        status: "completed"
    },
    {
        date: "12 Aug 2023",
        customer: {
            name: "Savannah Nguyen",
            avatar: "/avatars/avatar2.jpg"
        },
        amount: "₹1,800",
        status: "pending"
    },
    {
        date: "11 Aug 2023",
        customer: {
            name: "Ralph Edwards",
            avatar: "/avatars/avatar3.jpg"
        },
        amount: "₹3,200",
        status: "completed"
    },
    {
        date: "10 Aug 2023",
        customer: {
            name: "Leslie Alexander",
            avatar: "/avatars/avatar4.jpg"
        },
        amount: "₹1,500",
        status: "completed"
    },
    {
        date: "09 Aug 2023",
        customer: {
            name: "Jacob Jones",
            avatar: "/avatars/avatar5.jpg"
        },
        amount: "₹2,000",
        status: "pending"
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
export default function RecentTransactions() {
    return (_jsxs(Paper, { sx: {
            p: 3,
            height: '100%',
            borderRadius: 2,
            boxShadow: 'none',
            border: '1px solid',
            borderColor: 'divider',
        }, children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', mb: 3 }, children: [_jsx(Typography, { variant: "h6", children: "Recent Transactions" }), _jsx(Typography, { variant: "body2", sx: {
                            color: 'primary.main',
                            cursor: 'pointer',
                            '&:hover': { textDecoration: 'underline' },
                        }, children: "View All" })] }), _jsx(Box, { sx: { display: 'flex', flexDirection: 'column', gap: 2 }, children: transactions.map((transaction, index) => {
                    const statusColor = getStatusColor(transaction.status);
                    return (_jsxs(Box, { sx: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            p: 1,
                            '&:hover': { bgcolor: 'action.hover' },
                            borderRadius: 1,
                        }, children: [_jsx(Box, { sx: { width: 100 }, children: _jsx(Typography, { variant: "body2", color: "text.secondary", children: transaction.date }) }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 2, flex: 1 }, children: [_jsx(Avatar, { src: transaction.customer.avatar }), _jsx(Typography, { variant: "body2", fontWeight: 600, children: transaction.customer.name })] }), _jsx(Typography, { variant: "body2", fontWeight: 600, children: transaction.amount }), _jsx(Chip, { label: transaction.status, size: "small", sx: {
                                    color: statusColor.color,
                                    bgcolor: statusColor.bgcolor,
                                    textTransform: 'capitalize',
                                    minWidth: 85,
                                } })] }, index));
                }) })] }));
}
