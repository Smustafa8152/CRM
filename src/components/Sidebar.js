import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Box, Typography, Divider, } from '@mui/material';
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
    { text: 'Dashboard', icon: _jsx(DashboardIcon, {}), path: '/' },
];
const crmMenu = [
    { text: 'Customers', icon: _jsx(PeopleIcon, {}), path: '/customers' },
    { text: 'Credit & Payments', icon: _jsx(CreditCardIcon, {}), path: '/credit-payments' },
    { text: 'Invoices', icon: _jsx(ReceiptIcon, {}), path: '/invoices' },
    { text: 'Support', icon: _jsx(SupportIcon, {}), path: '/support' },
    { text: 'WhatsApp', icon: _jsx(WhatsAppIcon, {}), path: '/whatsapp' },
];
const inventoryMenu = [
    { text: 'Inventory', icon: _jsx(InventoryIcon, {}), path: '/inventory' },
    { text: 'Sales', icon: _jsx(ShoppingCartIcon, {}), path: '/sales' },
    { text: 'Pricing', icon: _jsx(AttachMoneyIcon, {}), path: '/pricing' },
];
const reportsMenu = [
    { text: 'Reports', icon: _jsx(AssessmentIcon, {}), path: '/reports' },
];
const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (_jsxs(Drawer, { variant: "permanent", sx: {
            width: 220,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: 220,
                boxSizing: 'border-box',
                backgroundColor: '#fff',
                borderRight: '1px solid #e0e0e0',
            },
        }, children: [_jsxs(Box, { sx: { p: 2, display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(Box, { sx: {
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
                        }, children: "M" }), _jsx(Typography, { variant: "h6", sx: { fontWeight: 700, color: '#222', letterSpacing: 1 }, children: "CRM" })] }), _jsx(Divider, { sx: { mb: 1 } }), _jsxs(List, { sx: { pt: 0 }, children: [_jsx(Typography, { variant: "caption", sx: { pl: 2, color: '#888', fontWeight: 600, mb: 0.5 }, children: "Main" }), mainMenu.map((item) => (_jsx(ListItem, { disablePadding: true, children: _jsxs(ListItemButton, { onClick: () => navigate(item.path), selected: location.pathname === item.path, sx: {
                                py: 1,
                                '&.Mui-selected': {
                                    backgroundColor: '#e0e0e0',
                                    '&:hover': { backgroundColor: '#ececec' },
                                },
                                '&:hover': { backgroundColor: '#f9f9f9' },
                            }, children: [_jsx(ListItemIcon, { sx: { color: '#1976d2', minWidth: 36 }, children: item.icon }), _jsx(ListItemText, { primary: item.text, primaryTypographyProps: { fontSize: '0.95rem', color: '#222' } })] }) }, item.text))), _jsx(Divider, { sx: { my: 1 } }), _jsx(Typography, { variant: "caption", sx: { pl: 2, color: '#888', fontWeight: 600, mb: 0.5 }, children: "CRM" }), crmMenu.map((item) => (_jsx(ListItem, { disablePadding: true, children: _jsxs(ListItemButton, { onClick: () => navigate(item.path), selected: location.pathname === item.path, sx: {
                                py: 1,
                                '&.Mui-selected': {
                                    backgroundColor: '#f5f5f5',
                                    '&:hover': { backgroundColor: '#ececec' },
                                },
                                '&:hover': { backgroundColor: '#f9f9f9' },
                            }, children: [_jsx(ListItemIcon, { sx: { color: '#1976d2', minWidth: 36 }, children: item.icon }), _jsx(ListItemText, { primary: item.text, primaryTypographyProps: { fontSize: '0.95rem', color: '#222' } })] }) }, item.text))), _jsx(Divider, { sx: { my: 1 } }), _jsx(Typography, { variant: "caption", sx: { pl: 2, color: '#888', fontWeight: 600, mb: 0.5 }, children: "Inventory" }), inventoryMenu.map((item) => (_jsx(ListItem, { disablePadding: true, children: _jsxs(ListItemButton, { onClick: () => navigate(item.path), selected: location.pathname === item.path, sx: {
                                py: 1,
                                '&.Mui-selected': {
                                    backgroundColor: '#f5f5f5',
                                    '&:hover': { backgroundColor: '#ececec' },
                                },
                                '&:hover': { backgroundColor: '#f9f9f9' },
                            }, children: [_jsx(ListItemIcon, { sx: { color: '#1976d2', minWidth: 36 }, children: item.icon }), _jsx(ListItemText, { primary: item.text, primaryTypographyProps: { fontSize: '0.95rem', color: '#222' } })] }) }, item.text))), _jsx(Divider, { sx: { my: 1 } }), _jsx(Typography, { variant: "caption", sx: { pl: 2, color: '#888', fontWeight: 600, mb: 0.5 }, children: "Reports" }), reportsMenu.map((item) => (_jsx(ListItem, { disablePadding: true, children: _jsxs(ListItemButton, { onClick: () => navigate(item.path), selected: location.pathname === item.path, sx: {
                                py: 1,
                                '&.Mui-selected': {
                                    backgroundColor: '#f5f5f5',
                                    '&:hover': { backgroundColor: '#ececec' },
                                },
                                '&:hover': { backgroundColor: '#f9f9f9' },
                            }, children: [_jsx(ListItemIcon, { sx: { color: '#1976d2', minWidth: 36 }, children: item.icon }), _jsx(ListItemText, { primary: item.text, primaryTypographyProps: { fontSize: '0.95rem', color: '#222' } })] }) }, item.text)))] })] }));
};
export default Sidebar;
