import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Drawer, AppBar, Toolbar, List, Typography, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme, styled, InputBase, Menu, MenuItem, Button, Avatar, Divider, } from '@mui/material';
import { Dashboard as DashboardIcon, People as PeopleIcon, Inventory as InventoryIcon, ShoppingCart as SalesIcon, PriceChange as PricingIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Search as SearchIcon, AddCircleOutline as AddCircleOutlineIcon, PointOfSale as PointOfSaleIcon, Notifications as NotificationsIcon, Settings as SettingsIcon, ArrowDropDown as ArrowDropDownIcon, Receipt as ReceiptIcon, Support as SupportIcon, WhatsApp as WhatsAppIcon, Assessment as AssessmentIcon, CreditCard as CreditCardIcon, } from '@mui/icons-material';
const drawerWidth = 260;
const collapsedDrawerWidth = 73;
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
}));
const menuItems = [
    { text: 'Dashboard', path: '/', icon: _jsx(DashboardIcon, {}) },
    { text: 'Customers', path: '/customers', icon: _jsx(PeopleIcon, {}) },
    { text: 'Credit & Payments', path: '/credit-payments', icon: _jsx(CreditCardIcon, {}) },
    { text: 'Inventory', path: '/inventory', icon: _jsx(InventoryIcon, {}) },
    { text: 'Sales & Orders', path: '/sales', icon: _jsx(SalesIcon, {}) },
    { text: 'Pricing', path: '/pricing', icon: _jsx(PricingIcon, {}) },
    { text: 'Invoices', path: '/invoices', icon: _jsx(ReceiptIcon, {}) },
    { text: 'Support', path: '/support', icon: _jsx(SupportIcon, {}) },
    { text: 'WhatsApp', path: '/whatsapp', icon: _jsx(WhatsAppIcon, {}) },
    { text: 'Reports', path: '/reports', icon: _jsx(AssessmentIcon, {}) },
];
export default function Layout({ children }) {
    const [open, setOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedStore, setSelectedStore] = useState('Freshmart');
    const handleDrawerToggle = () => {
        if (window.innerWidth < theme.breakpoints.values.sm) {
            setMobileOpen(!mobileOpen);
        }
        else {
            setOpen(!open);
        }
    };
    const handleStoreMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleStoreSelect = (store) => {
        setSelectedStore(store);
        setAnchorEl(null);
    };
    const handleStoreMenuClose = () => setAnchorEl(null);
    const drawer = (_jsxs(_Fragment, { children: [_jsxs(DrawerHeader, { children: [_jsx(Typography, { variant: "h6", noWrap: true, component: "div", sx: {
                            color: 'secondary.main',
                            fontWeight: 600,
                            ml: 2,
                            opacity: open ? 1 : 0,
                            transition: 'opacity 0.2s',
                        }, children: "Mobile Parts CRM" }), _jsx(IconButton, { onClick: handleDrawerToggle, sx: { color: 'secondary.main' }, children: open ? _jsx(ChevronLeftIcon, {}) : _jsx(ChevronRightIcon, {}) })] }), _jsx(List, { sx: { mt: 2 }, children: menuItems.map((item) => (_jsx(ListItem, { disablePadding: true, sx: { display: 'block' }, children: _jsxs(ListItemButton, { sx: {
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                            mx: 1,
                            borderRadius: 1,
                            position: 'relative',
                            '&.Mui-selected': {
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    left: -8,
                                    width: 4,
                                    height: '80%',
                                    backgroundColor: 'secondary.main',
                                    borderRadius: '0 4px 4px 0',
                                },
                            },
                        }, selected: location.pathname === item.path, onClick: () => navigate(item.path), children: [_jsx(ListItemIcon, { sx: {
                                    minWidth: 0,
                                    mr: open ? 2 : 'auto',
                                    justifyContent: 'center',
                                }, children: item.icon }), _jsx(ListItemText, { primary: item.text, sx: {
                                    opacity: open ? 1 : 0,
                                    transition: 'opacity 0.2s',
                                    '& .MuiTypography-root': {
                                        color: 'secondary.main',
                                    },
                                } })] }) }, item.text))) })] }));
    return (_jsxs(Box, { sx: { display: 'flex' }, children: [_jsx(AppBar, { position: "fixed", elevation: 0, sx: {
                    width: { sm: `calc(100% - ${open ? drawerWidth : collapsedDrawerWidth}px)` },
                    ml: { sm: `${open ? drawerWidth : collapsedDrawerWidth}px` },
                    bgcolor: 'background.paper',
                    boxShadow: 'none',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }, children: _jsxs(Toolbar, { sx: {
                        bgcolor: 'white',
                        borderRadius: 3,
                        minHeight: 56,
                        px: 2,
                        boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 2,
                    }, children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', flex: 1, maxWidth: 350, bgcolor: '#F4F5FA', borderRadius: 2, px: 1 }, children: [_jsx(SearchIcon, { sx: { color: 'text.secondary', mr: 1 } }), _jsx(InputBase, { placeholder: "Search", sx: { flex: 1, fontSize: 15 } }), _jsx(Button, { size: "small", sx: { minWidth: 0, p: 0.5, color: 'text.secondary' }, children: "\u2715" }), _jsx(Button, { size: "small", sx: { minWidth: 0, p: 0.5, color: 'text.secondary' }, children: "K" })] }), _jsx(Button, { variant: "outlined", startIcon: _jsx(Avatar, { src: "/store-icon.png", sx: { width: 24, height: 24 } }), endIcon: _jsx(ArrowDropDownIcon, {}), onClick: handleStoreMenu, sx: { ml: 2, color: 'text.primary', borderColor: 'divider', bgcolor: 'white', borderRadius: 2, fontWeight: 500 }, children: selectedStore }), _jsxs(Menu, { anchorEl: anchorEl, open: Boolean(anchorEl), onClose: handleStoreMenuClose, children: [_jsx(MenuItem, { onClick: () => handleStoreSelect('Freshmart'), children: "Freshmart" }), _jsx(MenuItem, { onClick: () => handleStoreSelect('Supermart'), children: "Supermart" })] }), _jsx(Button, { variant: "contained", startIcon: _jsx(AddCircleOutlineIcon, {}), sx: { bgcolor: 'primary.main', color: 'white', borderRadius: 2, ml: 2 }, children: "Add New" }), _jsx(Button, { variant: "contained", startIcon: _jsx(PointOfSaleIcon, {}), sx: { bgcolor: 'secondary.main', color: 'white', borderRadius: 2, ml: 2 }, children: "POS" }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1, ml: 2 }, children: [_jsx(NotificationsIcon, { sx: { color: 'text.secondary' } }), _jsx(SettingsIcon, { sx: { color: 'text.secondary' } }), _jsx(Divider, { orientation: "vertical", flexItem: true, sx: { mx: 1 } }), _jsx(Avatar, { src: "/avatars/avatar1.jpg", sx: { width: 32, height: 32 } })] })] }) }), _jsxs(Box, { component: "nav", sx: {
                    width: { sm: open ? drawerWidth : collapsedDrawerWidth },
                    flexShrink: { sm: 0 },
                    transition: 'width 0.2s',
                }, children: [_jsx(Drawer, { variant: "temporary", open: mobileOpen, onClose: handleDrawerToggle, ModalProps: {
                            keepMounted: true,
                        }, sx: {
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                width: drawerWidth,
                                borderRight: 'none',
                                transition: 'width 0.2s',
                            },
                        }, children: drawer }), _jsx(Drawer, { variant: "permanent", sx: {
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                width: open ? drawerWidth : collapsedDrawerWidth,
                                borderRight: 'none',
                                transition: 'width 0.2s',
                                overflowX: 'hidden',
                            },
                        }, open: open, children: drawer })] }), _jsxs(Box, { component: "main", sx: {
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${open ? drawerWidth : collapsedDrawerWidth}px)` },
                    transition: 'width 0.2s',
                    bgcolor: 'background.default',
                    minHeight: '100vh',
                }, children: [_jsx(Toolbar, {}), children] })] }));
}
