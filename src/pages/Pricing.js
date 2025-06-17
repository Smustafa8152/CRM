import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { Box, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, TextField, InputAdornment, Chip, Tooltip, MenuItem, Select, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions, } from '@mui/material';
import { Edit as EditIcon, WhatsApp as WhatsAppIcon, LocalOffer as OfferIcon, Add as AddIcon, Delete as DeleteIcon, } from '@mui/icons-material';
const mockPriceItems = [
    {
        id: '1',
        name: 'iPhone 12 LCD',
        basePrice: 5000,
        bulkPrice: 4500,
        customerPrice: 4800,
        minQuantity: 5,
        lastUpdated: '2024-03-15',
    },
    // ... existing mock data ...
];
const mockPriceRules = [
    {
        id: 'PRICE-001',
        itemName: 'iPhone 12 LCD',
        basePrice: 5000,
        customerType: 'Regular',
        discount: 0,
        minQuantity: 1,
        validFrom: '2024-01-01',
        validTo: '2024-12-31',
        notes: 'Standard retail price',
    },
    // ... existing mock data ...
];
export default function Pricing({ inventory = [] }) {
    const [priceItems] = useState(mockPriceItems);
    const [priceRules, setPriceRules] = useState(mockPriceRules);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [viewMode, setViewMode] = useState('standard');
    const [openDialog, setOpenDialog] = useState(false);
    const [newPrice, setNewPrice] = useState({
        itemName: '',
        basePrice: 0,
        customerType: 'Regular',
        discount: 0,
        minQuantity: 1,
        validFrom: new Date().toISOString().split('T')[0],
        validTo: '',
        notes: '',
    });
    const handleEdit = (price) => {
        // TODO: Implement edit functionality
        console.log('Editing price:', price);
    };
    const handleSave = (price) => {
        // TODO: Implement save functionality
        console.log('Saving price:', price);
    };
    const handleCancel = () => {
        // TODO: Implement cancel functionality
        console.log('Canceling edit');
    };
    const handleMenuOpen = (event, price) => {
        setAnchorEl(event.currentTarget);
        setSelectedPrice(price);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedPrice(null);
    };
    const handleNotifyPriceChange = (price) => {
        // TODO: Implement WhatsApp notification for price changes
        console.log('Notifying price change for:', price.name);
    };
    const getPriceChange = (current, previous) => {
        const change = ((current - previous) / previous) * 100;
        const color = change > 0 ? 'error.main' : change < 0 ? 'success.main' : 'text.primary';
        return (_jsxs(Typography, { color: color, children: [change > 0 ? '+' : '', change.toFixed(1), "%"] }));
    };
    const handleAddPrice = () => {
        if (newPrice.itemName && newPrice.basePrice) {
            const price = {
                id: `PRICE-${priceRules.length + 1}`,
                itemName: newPrice.itemName,
                basePrice: Number(newPrice.basePrice),
                customerType: newPrice.customerType || 'Regular',
                discount: Number(newPrice.discount),
                minQuantity: Number(newPrice.minQuantity),
                validFrom: newPrice.validFrom || new Date().toISOString(),
                validTo: newPrice.validTo || '',
                notes: newPrice.notes || '',
            };
            setPriceRules([...priceRules, price]);
            setOpenDialog(false);
            setNewPrice({
                itemName: '',
                basePrice: 0,
                customerType: 'Regular',
                discount: 0,
                minQuantity: 1,
                validFrom: new Date().toISOString().split('T')[0],
                validTo: '',
                notes: '',
            });
        }
    };
    const calculateFinalPrice = (basePrice, discount) => {
        return basePrice * (1 - discount / 100);
    };
    return (_jsxs(Box, { children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', mb: 3 }, children: [_jsx(Typography, { variant: "h4", children: "Price Management" }), _jsxs(Box, { sx: { display: 'flex', gap: 2 }, children: [_jsxs(FormControl, { size: "small", children: [_jsx(InputLabel, { children: "View Mode" }), _jsxs(Select, { value: viewMode, label: "View Mode", onChange: (e) => setViewMode(e.target.value), sx: { minWidth: 120 }, children: [_jsx(MenuItem, { value: "standard", children: "Standard" }), _jsx(MenuItem, { value: "bulk", children: "Bulk Discounts" }), _jsx(MenuItem, { value: "customer", children: "Customer Specific" })] })] }), _jsx(Button, { variant: "contained", startIcon: _jsx(OfferIcon, {}), onClick: () => {
                                    // TODO: Implement bulk price update
                                }, children: "Bulk Update" }), _jsx(Button, { variant: "contained", startIcon: _jsx(AddIcon, {}), onClick: () => setOpenDialog(true), children: "Add Price" })] })] }), _jsx(TableContainer, { component: Paper, children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Item Name" }), _jsx(TableCell, { children: "Customer Type" }), _jsx(TableCell, { align: "right", children: "Base Price" }), _jsx(TableCell, { align: "right", children: "Discount" }), _jsx(TableCell, { align: "right", children: "Final Price" }), _jsx(TableCell, { align: "center", children: "Min Quantity" }), _jsx(TableCell, { children: "Valid From" }), _jsx(TableCell, { children: "Valid To" }), _jsx(TableCell, { children: "Notes" }), _jsx(TableCell, { align: "center", children: "Actions" })] }) }), _jsx(TableBody, { children: priceRules.map((rule) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: rule.itemName }), _jsx(TableCell, { children: _jsx(Chip, { label: rule.customerType, color: rule.customerType === 'VIP'
                                                ? 'error'
                                                : rule.customerType === 'Wholesale'
                                                    ? 'warning'
                                                    : 'default', size: "small" }) }), _jsxs(TableCell, { align: "right", children: ["\u20B9", rule.basePrice.toLocaleString()] }), _jsxs(TableCell, { align: "right", children: [rule.discount, "%"] }), _jsxs(TableCell, { align: "right", children: ["\u20B9", calculateFinalPrice(rule.basePrice, rule.discount).toLocaleString()] }), _jsx(TableCell, { align: "center", children: rule.minQuantity }), _jsx(TableCell, { children: rule.validFrom }), _jsx(TableCell, { children: rule.validTo }), _jsx(TableCell, { children: rule.notes }), _jsxs(TableCell, { align: "center", children: [_jsx(IconButton, { size: "small", children: _jsx(EditIcon, {}) }), _jsx(IconButton, { size: "small", color: "error", children: _jsx(DeleteIcon, {}) }), _jsx(Tooltip, { title: "Notify via WhatsApp", children: _jsx(IconButton, { size: "small", onClick: () => handleNotifyPriceChange(rule), children: _jsx(WhatsAppIcon, {}) }) })] })] }, rule.id))) })] }) }), _jsxs(Dialog, { open: openDialog, onClose: () => setOpenDialog(false), maxWidth: "sm", fullWidth: true, children: [_jsx(DialogTitle, { children: "Add New Price Rule" }), _jsx(DialogContent, { children: _jsxs(Box, { sx: { display: 'grid', gap: 2, mt: 2 }, children: [_jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: "Item Name" }), _jsx(Select, { value: newPrice.itemName, label: "Item Name", onChange: (e) => {
                                                const selectedItem = inventory.find(item => item.name === e.target.value);
                                                setNewPrice({
                                                    ...newPrice,
                                                    itemName: e.target.value,
                                                    basePrice: selectedItem?.price || 0,
                                                });
                                            }, children: inventory.map((item) => (_jsxs(MenuItem, { value: item.name, children: [item.name, " (Current Price: \u20B9", item.price.toLocaleString(), ")"] }, item.id))) })] }), _jsx(TextField, { fullWidth: true, label: "Base Price", type: "number", value: newPrice.basePrice, onChange: (e) => setNewPrice({ ...newPrice, basePrice: Number(e.target.value) }), InputProps: {
                                        startAdornment: _jsx(InputAdornment, { position: "start", children: "\u20B9" }),
                                    } }), _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: "Customer Type" }), _jsxs(Select, { value: newPrice.customerType, label: "Customer Type", onChange: (e) => setNewPrice({ ...newPrice, customerType: e.target.value }), children: [_jsx(MenuItem, { value: "Regular", children: "Regular" }), _jsx(MenuItem, { value: "Wholesale", children: "Wholesale" }), _jsx(MenuItem, { value: "VIP", children: "VIP" })] })] }), _jsx(TextField, { fullWidth: true, label: "Discount (%)", type: "number", value: newPrice.discount, onChange: (e) => setNewPrice({ ...newPrice, discount: Number(e.target.value) }), InputProps: {
                                        endAdornment: _jsx(InputAdornment, { position: "end", children: "%" }),
                                        inputProps: { min: 0, max: 100 }
                                    } }), _jsx(TextField, { fullWidth: true, label: "Minimum Quantity", type: "number", value: newPrice.minQuantity, onChange: (e) => setNewPrice({ ...newPrice, minQuantity: Number(e.target.value) }), InputProps: {
                                        inputProps: { min: 1 }
                                    } }), _jsx(TextField, { fullWidth: true, label: "Valid From", type: "date", value: newPrice.validFrom, onChange: (e) => setNewPrice({ ...newPrice, validFrom: e.target.value }), InputLabelProps: { shrink: true } }), _jsx(TextField, { fullWidth: true, label: "Valid To", type: "date", value: newPrice.validTo, onChange: (e) => setNewPrice({ ...newPrice, validTo: e.target.value }), InputLabelProps: { shrink: true } }), _jsx(TextField, { fullWidth: true, label: "Notes", multiline: true, rows: 2, value: newPrice.notes, onChange: (e) => setNewPrice({ ...newPrice, notes: e.target.value }) }), _jsxs(Typography, { variant: "h6", sx: { textAlign: 'right', mt: 2 }, children: ["Final Price: \u20B9", calculateFinalPrice(newPrice.basePrice || 0, newPrice.discount || 0).toLocaleString()] })] }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: () => setOpenDialog(false), children: "Cancel" }), _jsx(Button, { onClick: handleAddPrice, variant: "contained", children: "Add Price Rule" })] })] })] }));
}
