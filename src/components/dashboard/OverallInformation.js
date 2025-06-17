import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography, Paper, Avatar } from '@mui/material';
import { Person as PersonIcon, ShoppingCart as CartIcon, Inventory as InventoryIcon } from '@mui/icons-material';
const InfoCard = ({ icon, title, value, iconColor }) => (_jsxs(Box, { sx: { textAlign: 'center', flex: 1 }, children: [_jsx(Avatar, { sx: {
                width: 42,
                height: 42,
                bgcolor: `${iconColor}15`,
                color: iconColor,
                margin: '0 auto',
                mb: 1,
            }, children: icon }), _jsx(Typography, { variant: "h6", sx: { mb: 0.5 }, children: value }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: title })] }));
export default function OverallInformation() {
    return (_jsxs(Paper, { sx: {
            p: 3,
            height: '100%',
            borderRadius: 2,
            boxShadow: 'none',
            border: '1px solid',
            borderColor: 'divider',
        }, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Overall Information" }), _jsxs(Box, { sx: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                    mt: 3,
                }, children: [_jsx(InfoCard, { icon: _jsx(PersonIcon, {}), title: "Suppliers", value: "6,987", iconColor: "#FF9F43" }), _jsx(InfoCard, { icon: _jsx(CartIcon, {}), title: "Customer", value: "4,896", iconColor: "#28C76F" }), _jsx(InfoCard, { icon: _jsx(InventoryIcon, {}), title: "Orders", value: "487", iconColor: "#00CFE8" })] })] }));
}
