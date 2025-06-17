import React from 'react';
import { Box, Typography, Paper, Avatar, Chip } from '@mui/material';

interface Transaction {
  date: string;
  customer: {
    name: string;
    avatar: string;
  };
  amount: string;
  status: 'completed' | 'pending' | 'cancelled';
}

const transactions: Transaction[] = [
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

const getStatusColor = (status: Transaction['status']) => {
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
        <Typography variant="h6">Recent Transactions</Typography>
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
        {transactions.map((transaction, index) => {
          const statusColor = getStatusColor(transaction.status);
          return (
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
              <Box sx={{ width: 100 }}>
                <Typography variant="body2" color="text.secondary">
                  {transaction.date}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                <Avatar src={transaction.customer.avatar} />
                <Typography variant="body2" fontWeight={600}>
                  {transaction.customer.name}
                </Typography>
              </Box>
              <Typography variant="body2" fontWeight={600}>
                {transaction.amount}
              </Typography>
              <Chip
                label={transaction.status}
                size="small"
                sx={{
                  color: statusColor.color,
                  bgcolor: statusColor.bgcolor,
                  textTransform: 'capitalize',
                  minWidth: 85,
                }}
              />
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
} 