import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography, InputBase, IconButton, Avatar, Button, Badge, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
const Header = () => {
    return (_jsxs(Paper, { elevation: 0, sx: {
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
        }, children: [_jsx(Box, { sx: { display: 'flex', alignItems: 'center', gap: 2 }, children: _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: 2, px: 1 }, children: [_jsx(SearchIcon, { sx: { color: '#bdbdbd' } }), _jsx(InputBase, { placeholder: "Search...", sx: { ml: 1, fontSize: 15, width: 180 } })] }) }), _jsx(Typography, { variant: "h6", sx: { fontWeight: 500, color: '#222', letterSpacing: 0.5 }, children: "Welcome, Admin" }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1.5 }, children: [_jsx(Button, { variant: "contained", startIcon: _jsx(AddIcon, {}), sx: { background: '#1976d2', color: '#fff', textTransform: 'none', fontWeight: 500, borderRadius: 2, boxShadow: 'none', '&:hover': { background: '#1565c0' } }, children: "Add New" }), _jsx(Button, { variant: "outlined", startIcon: _jsx(PointOfSaleIcon, {}), sx: { borderColor: '#1976d2', color: '#1976d2', textTransform: 'none', fontWeight: 500, borderRadius: 2, boxShadow: 'none', '&:hover': { borderColor: '#1565c0', background: '#e3f2fd' } }, children: "POS" }), _jsx(IconButton, { children: _jsx(Badge, { badgeContent: 1, color: "error", children: _jsx(NotificationsIcon, { sx: { color: '#757575' } }) }) }), _jsx(IconButton, { children: _jsx(MailIcon, { sx: { color: '#757575' } }) }), _jsx(IconButton, { children: _jsx(CalendarMonthIcon, { sx: { color: '#757575' } }) }), _jsx(Avatar, { sx: { width: 36, height: 36, ml: 1 }, src: "https://randomuser.me/api/portraits/men/32.jpg" })] })] }));
};
export default Header;
