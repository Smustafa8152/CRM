import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Box, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Chip, Tooltip, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Warning as WarningIcon, Build as BuildIcon, } from '@mui/icons-material';
const mockProducts = [
    {
        id: '1',
        model: 'iPhone 12',
        type: 'LCD + Touch',
        compatibility: ['iPhone 12', 'iPhone 12 Pro'],
        price: 12000,
        stock: 5,
        minStock: 10,
        warranty: 6,
        supplier: 'TechParts Inc',
        lastRestockDate: '2024-03-01',
        expectedArrival: '2024-03-25',
        technicalSpecs: {
            resolution: '2532 x 1170',
            size: '6.1 inch',
            connector: 'Type-C',
        },
    },
    {
        id: '2',
        model: 'Samsung S21',
        type: 'LCD + Touch',
        compatibility: ['Galaxy S21', 'Galaxy S21+'],
        price: 15000,
        stock: 15,
        minStock: 8,
        warranty: 6,
        supplier: 'MobileParts Co',
        lastRestockDate: '2024-03-10',
        technicalSpecs: {
            resolution: '2400 x 1080',
            size: '6.2 inch',
            connector: 'Type-C',
        },
    },
];
export default function Inventory({ inventory, setInventory }) {
    const [products] = useState(mockProducts);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [newItem, setNewItem] = useState({
        name: '',
        model: '',
        quantity: 0,
        price: 0,
        supplier: '',
        lastRestockDate: new Date().toISOString().split('T')[0],
        warranty: '6 months',
        technicalSpecs: '',
        compatibility: [],
        stockStatus: 'In Stock',
    });
    const handleMenuOpen = (event, product) => {
        setAnchorEl(event.currentTarget);
        setSelectedProduct(product);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedProduct(null);
    };
    const getStockStatus = (stock, minStock) => {
        if (stock <= 0) {
            return _jsx(Chip, { label: "Out of Stock", color: "error", size: "small" });
        }
        if (stock < minStock) {
            return (_jsx(Chip, { icon: _jsx(WarningIcon, {}), label: "Low Stock", color: "warning", size: "small" }));
        }
        return _jsx(Chip, { label: "In Stock", color: "success", size: "small" });
    };
    const handleAddItem = () => {
        if (newItem.name && newItem.model) {
            const item = {
                id: `INV-${inventory.length + 1}`,
                name: newItem.name,
                model: newItem.model,
                quantity: Number(newItem.quantity),
                price: Number(newItem.price),
                supplier: newItem.supplier || '',
                lastRestockDate: newItem.lastRestockDate || new Date().toISOString(),
                warranty: newItem.warranty || '6 months',
                technicalSpecs: newItem.technicalSpecs || '',
                compatibility: newItem.compatibility || [],
                stockStatus: 'In Stock',
            };
            setInventory([...inventory, item]);
            setOpenDialog(false);
            setNewItem({
                name: '',
                model: '',
                quantity: 0,
                price: 0,
                supplier: '',
                lastRestockDate: new Date().toISOString().split('T')[0],
                warranty: '6 months',
                technicalSpecs: '',
                compatibility: [],
                stockStatus: 'In Stock',
            });
        }
    };
    return (_jsxs(Box, { children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', mb: 3 }, children: [_jsx(Typography, { variant: "h4", children: "Inventory" }), _jsx(Button, { variant: "contained", startIcon: _jsx(AddIcon, {}), onClick: () => setOpenDialog(true), children: "Add Item" })] }), _jsx(TableContainer, { component: Paper, children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Name" }), _jsx(TableCell, { children: "Model" }), _jsx(TableCell, { children: "Compatibility" }), _jsx(TableCell, { children: "Technical Specs" }), _jsx(TableCell, { align: "right", children: "Price" }), _jsx(TableCell, { align: "right", children: "Quantity" }), _jsx(TableCell, { align: "center", children: "Status" }), _jsx(TableCell, { align: "center", children: "Warranty" }), _jsx(TableCell, { align: "center", children: "Supplier" }), _jsx(TableCell, { align: "center", children: "Actions" })] }) }), _jsx(TableBody, { children: inventory.map((item) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: item.name }), _jsx(TableCell, { children: item.model }), _jsx(TableCell, { children: item.compatibility.map((comp, index) => (_jsx(Chip, { label: comp, size: "small", sx: { mr: 0.5, mb: 0.5 } }, index))) }), _jsx(TableCell, { children: _jsx(Tooltip, { title: item.technicalSpecs, children: _jsx(IconButton, { size: "small", children: _jsx(BuildIcon, {}) }) }) }), _jsxs(TableCell, { align: "right", children: ["\u20B9", item.price.toLocaleString()] }), _jsx(TableCell, { align: "right", children: item.quantity }), _jsx(TableCell, { align: "center", children: _jsx(Chip, { label: item.stockStatus, color: item.stockStatus === 'In Stock'
                                                ? 'success'
                                                : item.stockStatus === 'Low Stock'
                                                    ? 'warning'
                                                    : 'error', size: "small" }) }), _jsx(TableCell, { align: "center", children: item.warranty }), _jsx(TableCell, { align: "center", children: item.supplier }), _jsxs(TableCell, { align: "center", children: [_jsx(Tooltip, { title: "Edit", children: _jsx(IconButton, { size: "small", onClick: (e) => handleMenuOpen(e, item), children: _jsx(EditIcon, {}) }) }), _jsx(Tooltip, { title: "Delete", children: _jsx(IconButton, { size: "small", children: _jsx(DeleteIcon, {}) }) })] })] }, item.id))) })] }) }), _jsxs(Dialog, { open: openDialog, onClose: () => setOpenDialog(false), maxWidth: "md", fullWidth: true, children: [_jsx(DialogTitle, { children: "Add New Inventory Item" }), _jsx(DialogContent, { children: _jsx(Box, { sx: { mt: 2 }, children: _jsxs(Box, { sx: { display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }, children: [_jsx(Box, { children: _jsx(TextField, { fullWidth: true, label: "Item Name", value: newItem.name, onChange: (e) => setNewItem({ ...newItem, name: e.target.value }) }) }), _jsx(Box, { children: _jsx(TextField, { fullWidth: true, label: "Model Number", value: newItem.model, onChange: (e) => setNewItem({ ...newItem, model: e.target.value }) }) }), _jsx(Box, { children: _jsx(TextField, { fullWidth: true, type: "number", label: "Quantity", value: newItem.quantity, onChange: (e) => setNewItem({ ...newItem, quantity: Number(e.target.value) }) }) }), _jsx(Box, { children: _jsx(TextField, { fullWidth: true, type: "number", label: "Price", value: newItem.price, onChange: (e) => setNewItem({ ...newItem, price: Number(e.target.value) }) }) }), _jsx(Box, { children: _jsx(TextField, { fullWidth: true, label: "Supplier", value: newItem.supplier, onChange: (e) => setNewItem({ ...newItem, supplier: e.target.value }) }) }), _jsx(Box, { children: _jsx(TextField, { fullWidth: true, type: "date", label: "Last Restock Date", value: newItem.lastRestockDate, onChange: (e) => setNewItem({ ...newItem, lastRestockDate: e.target.value }), InputLabelProps: { shrink: true } }) }), _jsx(Box, { children: _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: "Warranty Period" }), _jsxs(Select, { value: newItem.warranty, label: "Warranty Period", onChange: (e) => setNewItem({ ...newItem, warranty: e.target.value }), children: [_jsx(MenuItem, { value: "3 months", children: "3 months" }), _jsx(MenuItem, { value: "6 months", children: "6 months" }), _jsx(MenuItem, { value: "1 year", children: "1 year" })] })] }) }), _jsx(Box, { children: _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: "Stock Status" }), _jsxs(Select, { value: newItem.stockStatus, label: "Stock Status", onChange: (e) => setNewItem({ ...newItem, stockStatus: e.target.value }), children: [_jsx(MenuItem, { value: "In Stock", children: "In Stock" }), _jsx(MenuItem, { value: "Low Stock", children: "Low Stock" }), _jsx(MenuItem, { value: "Out of Stock", children: "Out of Stock" })] })] }) }), _jsx(Box, { sx: { gridColumn: { xs: '1', md: '1 / span 2' } }, children: _jsx(TextField, { fullWidth: true, label: "Technical Specifications", multiline: true, rows: 2, value: newItem.technicalSpecs, onChange: (e) => setNewItem({ ...newItem, technicalSpecs: e.target.value }) }) }), _jsx(Box, { sx: { gridColumn: { xs: '1', md: '1 / span 2' } }, children: _jsx(TextField, { fullWidth: true, label: "Compatibility (comma-separated)", value: newItem.compatibility?.join(', '), onChange: (e) => setNewItem({ ...newItem, compatibility: e.target.value.split(',').map(s => s.trim()) }), helperText: "Enter compatible models separated by commas" }) })] }) }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: () => setOpenDialog(false), children: "Cancel" }), _jsx(Button, { variant: "contained", onClick: handleAddItem, disabled: !newItem.name || !newItem.model || !newItem.supplier, children: "Add Item" })] })] })] }));
}
