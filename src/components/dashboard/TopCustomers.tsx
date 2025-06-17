import React from 'react';
import { Box, Typography, Paper, Avatar } from '@mui/material';

interface Customer {
  name: string;
  avatar: string;
  amount: string;
  orders: number;
}

const customers: Customer[] = [
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
  return (
    <Paper
      sx={{
        p: 3,
        height: '100%',
        borderRadius: 2,
        boxShadow: 'none',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">Top Customers</Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'primary.main',
            cursor: 'pointer',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          View All
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {customers.map((customer, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 1,
              '&:hover': { bgcolor: 'action.hover' },
              borderRadius: 1,
            }}
          >
            <Avatar src={customer.avatar} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" fontWeight={600}>
                {customer.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {customer.orders} Orders
              </Typography>
            </Box>
            <Typography variant="body2" fontWeight={600}>
              {customer.amount}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
} 