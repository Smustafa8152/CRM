import React from 'react';
import { Box, Typography, Paper, Avatar } from '@mui/material';
import { Person as PersonIcon, ShoppingCart as CartIcon, Inventory as InventoryIcon } from '@mui/icons-material';

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  iconColor: string;
}

const InfoCard = ({ icon, title, value, iconColor }: InfoCardProps) => (
  <Box sx={{ textAlign: 'center', flex: 1 }}>
    <Avatar
      sx={{
        width: 42,
        height: 42,
        bgcolor: `${iconColor}15`,
        color: iconColor,
        margin: '0 auto',
        mb: 1,
      }}
    >
      {icon}
    </Avatar>
    <Typography variant="h6" sx={{ mb: 0.5 }}>
      {value}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {title}
    </Typography>
  </Box>
);

export default function OverallInformation() {
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
      <Typography variant="h6" gutterBottom>
        Overall Information
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          mt: 3,
        }}
      >
        <InfoCard
          icon={<PersonIcon />}
          title="Suppliers"
          value="6,987"
          iconColor="#FF9F43"
        />
        <InfoCard
          icon={<CartIcon />}
          title="Customer"
          value="4,896"
          iconColor="#28C76F"
        />
        <InfoCard
          icon={<InventoryIcon />}
          title="Orders"
          value="487"
          iconColor="#00CFE8"
        />
      </Box>
    </Paper>
  );
} 