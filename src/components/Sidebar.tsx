import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SupportIcon from '@mui/icons-material/Support';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AssessmentIcon from '@mui/icons-material/Assessment';

const mainMenu = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
];
const crmMenu = [
  { text: 'Customers', icon: <PeopleIcon />, path: '/customers' },
  { text: 'Credit & Payments', icon: <CreditCardIcon />, path: '/credit-payments' },
  { text: 'Invoices', icon: <ReceiptIcon />, path: '/invoices' },
  { text: 'Support', icon: <SupportIcon />, path: '/support' },
  { text: 'WhatsApp', icon: <WhatsAppIcon />, path: '/whatsapp' },
];
const inventoryMenu = [
  { text: 'Inventory', icon: <InventoryIcon />, path: '/inventory' },
  { text: 'Sales', icon: <ShoppingCartIcon />, path: '/sales' },
  { text: 'Pricing', icon: <AttachMoneyIcon />, path: '/pricing' },
];
const reportsMenu = [
  { text: 'Reports', icon: <AssessmentIcon />, path: '/reports' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 220,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 220,
          boxSizing: 'border-box',
          backgroundColor: '#fff',
          borderRight: '1px solid #e0e0e0',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1976d2 60%, #42a5f5 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: 20,
            color: '#fff',
          }}
        >
          M
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#222', letterSpacing: 1 }}>
          CRM
        </Typography>
      </Box>
      <Divider sx={{ mb: 1 }} />
      <List sx={{ pt: 0 }}>
        <Typography variant="caption" sx={{ pl: 2, color: '#888', fontWeight: 600, mb: 0.5 }}>
          Main
        </Typography>
        {mainMenu.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                py: 1,
                '&.Mui-selected': {
                  backgroundColor: '#e0e0e0',
                  '&:hover': { backgroundColor: '#ececec' },
                },
                '&:hover': { backgroundColor: '#f9f9f9' },
              }}
            >
              <ListItemIcon sx={{ color: '#1976d2', minWidth: 36 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '0.95rem', color: '#222' }} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider sx={{ my: 1 }} />
        <Typography variant="caption" sx={{ pl: 2, color: '#888', fontWeight: 600, mb: 0.5 }}>
          CRM
        </Typography>
        {crmMenu.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                py: 1,
                '&.Mui-selected': {
                  backgroundColor: '#f5f5f5',
                  '&:hover': { backgroundColor: '#ececec' },
                },
                '&:hover': { backgroundColor: '#f9f9f9' },
              }}
            >
              <ListItemIcon sx={{ color: '#1976d2', minWidth: 36 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '0.95rem', color: '#222' }} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider sx={{ my: 1 }} />
        <Typography variant="caption" sx={{ pl: 2, color: '#888', fontWeight: 600, mb: 0.5 }}>
          Inventory
        </Typography>
        {inventoryMenu.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                py: 1,
                '&.Mui-selected': {
                  backgroundColor: '#f5f5f5',
                  '&:hover': { backgroundColor: '#ececec' },
                },
                '&:hover': { backgroundColor: '#f9f9f9' },
              }}
            >
              <ListItemIcon sx={{ color: '#1976d2', minWidth: 36 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '0.95rem', color: '#222' }} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider sx={{ my: 1 }} />
        <Typography variant="caption" sx={{ pl: 2, color: '#888', fontWeight: 600, mb: 0.5 }}>
          Reports
        </Typography>
        {reportsMenu.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                py: 1,
                '&.Mui-selected': {
                  backgroundColor: '#f5f5f5',
                  '&:hover': { backgroundColor: '#ececec' },
                },
                '&:hover': { backgroundColor: '#f9f9f9' },
              }}
            >
              <ListItemIcon sx={{ color: '#1976d2', minWidth: 36 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '0.95rem', color: '#222' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar; 