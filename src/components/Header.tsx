import React from 'react';
import { Box, Typography, InputBase, IconButton, Avatar, Button, Badge, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Header = () => {
  return (
    <Paper elevation={0} sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      px: 3,
      py: 1.5,
      borderBottom: '1px solid #eee',
      borderRadius: 0,
      background: '#fff',
      minHeight: 64,
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* Left: Search */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: 2, px: 1 }}>
          <SearchIcon sx={{ color: '#bdbdbd' }} />
          <InputBase placeholder="Search..." sx={{ ml: 1, fontSize: 15, width: 180 }} />
        </Box>
      </Box>
      {/* Center: Welcome */}
      <Typography variant="h6" sx={{ fontWeight: 500, color: '#222', letterSpacing: 0.5 }}>
        Welcome, Admin
      </Typography>
      {/* Right: Actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Button variant="contained" startIcon={<AddIcon />} sx={{ background: '#1976d2', color: '#fff', textTransform: 'none', fontWeight: 500, borderRadius: 2, boxShadow: 'none', '&:hover': { background: '#1565c0' } }}>
          Add New
        </Button>
        <Button variant="outlined" startIcon={<PointOfSaleIcon />} sx={{ borderColor: '#1976d2', color: '#1976d2', textTransform: 'none', fontWeight: 500, borderRadius: 2, boxShadow: 'none', '&:hover': { borderColor: '#1565c0', background: '#e3f2fd' } }}>
          POS
        </Button>
        <IconButton>
          <Badge badgeContent={1} color="error">
            <NotificationsIcon sx={{ color: '#757575' }} />
          </Badge>
        </IconButton>
        <IconButton>
          <MailIcon sx={{ color: '#757575' }} />
        </IconButton>
        <IconButton>
          <CalendarMonthIcon sx={{ color: '#757575' }} />
        </IconButton>
        <Avatar sx={{ width: 36, height: 36, ml: 1 }} src="https://randomuser.me/api/portraits/men/32.jpg" />
      </Box>
    </Paper>
  );
};

export default Header; 