import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Box, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Chip, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, WhatsApp as WhatsAppIcon, Receipt as ReceiptIcon, } from '@mui/icons-material';
const mockCustomers = [
    {
        id: 'CUST-001',
        name: 'Mobile Zone',
        contact: '+91 9876543210',
        address: '123 Main St, City',
        creditLimit: 100000,
        outstandingAmount: 25000,
        creditRating: 'A',
        lastPaymentDate: '2024-03-15',
        preferredCommunication: 'WhatsApp',
        businessRegistration: 'GST123456789',
        warrantyClaims: 2,
    },
    {
        id: '2',
        name: 'Phone Paradise',
        contact: '+91 98765 43211',
        address: '456 Market Rd, Delhi',
        creditLimit: 75000,
        outstandingAmount: 25000,
        creditRating: 'B',
        lastPaymentDate: '2024-03-10',
        preferredCommunication: 'Email',
        businessRegistration: 'GST789012',
        warrantyClaims: 1,
    },
];
export default function Customers({ customers, setCustomers }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [newCustomer, setNewCustomer] = useState({
        name: '',
        contact: '',
        address: '',
        creditLimit: 0,
        creditRating: 'B',
        preferredCommunication: 'WhatsApp',
        businessRegistration: '',
    });
    const handleAddCustomer = () => {
        if (newCustomer.name && newCustomer.contact) {
            const customer = {
                id: `CUST-${customers.length + 1}`,
                name: newCustomer.name,
                contact: newCustomer.contact,
                address: newCustomer.address || '',
                creditLimit: Number(newCustomer.creditLimit),
                outstandingAmount: 0,
                creditRating: newCustomer.creditRating || 'B',
                lastPaymentDate: new Date().toISOString().split('T')[0],
                preferredCommunication: newCustomer.preferredCommunication || 'WhatsApp',
                businessRegistration: newCustomer.businessRegistration || '',
                warrantyClaims: 0,
            };
            setCustomers([...customers, customer]);
            setOpenDialog(false);
            setNewCustomer({
                name: '',
                contact: '',
                address: '',
                creditLimit: 0,
                creditRating: 'B',
                preferredCommunication: 'WhatsApp',
                businessRegistration: '',
            });
        }
    };
    const getCreditRatingColor = (rating) => {
        switch (rating) {
            case 'A':
                return 'success';
            case 'B':
                return 'warning';
            case 'C':
                return 'error';
            default:
                return 'default';
        }
    };
    const getPaymentStatus = (outstanding, limit) => {
        const percentage = (outstanding / limit) * 100;
        if (percentage >= 80) {
            return _jsx(Chip, { label: "High Risk", color: "error", size: "small" });
        }
        else if (percentage >= 50) {
            return _jsx(Chip, { label: "Medium Risk", color: "warning", size: "small" });
        }
        return _jsx(Chip, { label: "Low Risk", color: "success", size: "small" });
    };
    return (_jsxs(Box, { children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', mb: 3 }, children: [_jsx(Typography, { variant: "h4", children: "Customers" }), _jsx(Button, { variant: "contained", startIcon: _jsx(AddIcon, {}), onClick: () => setOpenDialog(true), children: "Add Customer" })] }), _jsx(TableContainer, { component: Paper, children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Name" }), _jsx(TableCell, { children: "Contact" }), _jsx(TableCell, { children: "Business Reg." }), _jsx(TableCell, { children: "Credit Rating" }), _jsx(TableCell, { align: "right", children: "Credit Limit" }), _jsx(TableCell, { align: "right", children: "Outstanding" }), _jsx(TableCell, { align: "center", children: "Risk Level" }), _jsx(TableCell, { align: "center", children: "Last Payment" }), _jsx(TableCell, { align: "center", children: "Warranty Claims" }), _jsx(TableCell, { align: "center", children: "Actions" })] }) }), _jsx(TableBody, { children: customers.map((customer) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: customer.name }), _jsx(TableCell, { children: customer.contact }), _jsx(TableCell, { children: customer.businessRegistration }), _jsx(TableCell, { children: _jsx(Chip, { label: customer.creditRating, color: getCreditRatingColor(customer.creditRating), size: "small" }) }), _jsxs(TableCell, { align: "right", children: ["\u20B9", customer.creditLimit.toLocaleString()] }), _jsxs(TableCell, { align: "right", children: ["\u20B9", customer.outstandingAmount.toLocaleString()] }), _jsx(TableCell, { align: "center", children: getPaymentStatus(customer.outstandingAmount, customer.creditLimit) }), _jsx(TableCell, { align: "center", children: customer.lastPaymentDate }), _jsx(TableCell, { align: "center", children: customer.warrantyClaims }), _jsxs(TableCell, { align: "center", children: [_jsx(Tooltip, { title: "Send WhatsApp", children: _jsx(IconButton, { color: "primary", onClick: () => {
                                                        // TODO: Implement WhatsApp communication
                                                    }, children: _jsx(WhatsAppIcon, {}) }) }), _jsx(Tooltip, { title: "View Invoices", children: _jsx(IconButton, { color: "info", onClick: () => {
                                                        // TODO: Implement invoice view
                                                    }, children: _jsx(ReceiptIcon, {}) }) }), _jsx(Tooltip, { title: "Edit", children: _jsx(IconButton, { color: "primary", onClick: () => {
                                                        // TODO: Implement edit functionality
                                                    }, children: _jsx(EditIcon, {}) }) }), _jsx(Tooltip, { title: "Delete", children: _jsx(IconButton, { color: "error", onClick: () => {
                                                        // TODO: Implement delete functionality
                                                    }, children: _jsx(DeleteIcon, {}) }) })] })] }, customer.id))) })] }) }), _jsxs(Dialog, { open: openDialog, onClose: () => setOpenDialog(false), maxWidth: "md", fullWidth: true, children: [_jsx(DialogTitle, { children: "Add New Customer" }), _jsx(DialogContent, { children: _jsx(Box, { sx: { mt: 2 }, children: _jsxs(Box, { sx: { display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }, children: [_jsx(Box, { children: _jsx(TextField, { fullWidth: true, label: "Customer Name", value: newCustomer.name, onChange: (e) => setNewCustomer({ ...newCustomer, name: e.target.value }) }) }), _jsx(Box, { children: _jsx(TextField, { fullWidth: true, label: "Contact Number", value: newCustomer.contact, onChange: (e) => setNewCustomer({ ...newCustomer, contact: e.target.value }) }) }), _jsx(Box, { sx: { gridColumn: { xs: '1', md: '1 / span 2' } }, children: _jsx(TextField, { fullWidth: true, label: "Address", multiline: true, rows: 2, value: newCustomer.address, onChange: (e) => setNewCustomer({ ...newCustomer, address: e.target.value }) }) }), _jsx(Box, { children: _jsx(TextField, { fullWidth: true, label: "Business Registration (GST)", value: newCustomer.businessRegistration, onChange: (e) => setNewCustomer({ ...newCustomer, businessRegistration: e.target.value }) }) }), _jsx(Box, { children: _jsx(TextField, { fullWidth: true, type: "number", label: "Credit Limit", value: newCustomer.creditLimit, onChange: (e) => setNewCustomer({ ...newCustomer, creditLimit: Number(e.target.value) }) }) }), _jsx(Box, { children: _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: "Credit Rating" }), _jsxs(Select, { value: newCustomer.creditRating, label: "Credit Rating", onChange: (e) => setNewCustomer({ ...newCustomer, creditRating: e.target.value }), children: [_jsx(MenuItem, { value: "A", children: "A - Excellent" }), _jsx(MenuItem, { value: "B", children: "B - Good" }), _jsx(MenuItem, { value: "C", children: "C - Fair" })] })] }) }), _jsx(Box, { children: _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: "Preferred Communication" }), _jsxs(Select, { value: newCustomer.preferredCommunication, label: "Preferred Communication", onChange: (e) => setNewCustomer({ ...newCustomer, preferredCommunication: e.target.value }), children: [_jsx(MenuItem, { value: "WhatsApp", children: "WhatsApp" }), _jsx(MenuItem, { value: "Email", children: "Email" }), _jsx(MenuItem, { value: "SMS", children: "SMS" })] })] }) })] }) }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: () => setOpenDialog(false), children: "Cancel" }), _jsx(Button, { variant: "contained", onClick: handleAddCustomer, disabled: !newCustomer.name || !newCustomer.contact, children: "Add Customer" })] })] })] }));
}
