import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Button, Tooltip, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, } from '@mui/material';
import { WhatsApp as WhatsAppIcon, Payment as PaymentIcon, History as HistoryIcon, Warning as WarningIcon, Receipt as ReceiptIcon, Add as AddIcon, } from '@mui/icons-material';
const mockPayments = [
    {
        id: 'PAY-001',
        customerName: 'Mobile Zone',
        amount: 25000,
        date: '2024-03-15',
        status: 'active',
        paymentMethod: 'Bank Transfer',
        dueDate: '2024-03-15',
        riskLevel: 'Low',
        notes: 'Payment received on time',
        paymentHistory: [
            { date: '2024-03-15', amount: 25000, method: 'Bank Transfer' },
        ],
    },
    {
        id: '2',
        customerName: 'Phone Paradise',
        amount: 20000,
        date: '2024-03-01',
        status: 'overdue',
        paymentMethod: 'Bank Transfer',
        dueDate: '2024-03-31',
        riskLevel: 'Medium',
        notes: '',
        paymentHistory: [
            { date: '2024-03-01', amount: 20000, method: 'Bank Transfer' },
        ],
    },
];
export default function CreditPayments({ customers }) {
    const [payments, setPayments] = useState(mockPayments);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [newPayment, setNewPayment] = useState({
        customerName: '',
        amount: 0,
        date: new Date().toISOString().split('T')[0],
        status: 'active',
        paymentMethod: 'Cash',
        dueDate: '',
        riskLevel: 'Low',
        notes: '',
        paymentHistory: [],
    });
    const handleMenuOpen = (event, payment) => {
        setAnchorEl(event.currentTarget);
        setSelectedPayment(payment);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedPayment(null);
    };
    const getStatusChip = (status) => {
        const statusConfig = {
            active: { color: 'success', label: 'Active' },
            overdue: { color: 'error', label: 'Overdue' },
            suspended: { color: 'warning', label: 'Suspended' },
        };
        const config = statusConfig[status];
        return _jsx(Chip, { label: config.label, color: config.color, size: "small" });
    };
    const getRiskLevel = (outstanding, limit) => {
        const percentage = (outstanding / limit) * 100;
        if (percentage >= 80) {
            return _jsx(Chip, { icon: _jsx(WarningIcon, {}), label: "High Risk", color: "error", size: "small" });
        }
        else if (percentage >= 50) {
            return _jsx(Chip, { label: "Medium Risk", color: "warning", size: "small" });
        }
        return _jsx(Chip, { label: "Low Risk", color: "success", size: "small" });
    };
    const handleAddPayment = () => {
        if (newPayment.customerName && newPayment.amount) {
            const payment = {
                id: `PAY-${payments.length + 1}`,
                customerName: newPayment.customerName,
                amount: Number(newPayment.amount),
                date: newPayment.date || new Date().toISOString(),
                status: 'active',
                paymentMethod: newPayment.paymentMethod || 'Cash',
                dueDate: newPayment.dueDate || new Date().toISOString(),
                riskLevel: newPayment.riskLevel || 'Low',
                notes: newPayment.notes || '',
                paymentHistory: [
                    {
                        date: new Date().toISOString(),
                        amount: Number(newPayment.amount),
                        method: newPayment.paymentMethod || 'Cash',
                    },
                ],
            };
            setPayments([...payments, payment]);
            setOpenDialog(false);
            setNewPayment({
                customerName: '',
                amount: 0,
                date: new Date().toISOString().split('T')[0],
                status: 'active',
                paymentMethod: 'Cash',
                dueDate: '',
                riskLevel: 'Low',
                notes: '',
                paymentHistory: [],
            });
        }
    };
    return (_jsxs(Box, { children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', mb: 3 }, children: [_jsx(Typography, { variant: "h4", children: "Credit & Payments" }), _jsx(Button, { variant: "contained", startIcon: _jsx(AddIcon, {}), onClick: () => setOpenDialog(true), children: "Record Payment" })] }), _jsx(TableContainer, { component: Paper, children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Customer" }), _jsx(TableCell, { align: "right", children: "Amount" }), _jsx(TableCell, { align: "center", children: "Status" }), _jsx(TableCell, { align: "center", children: "Risk Level" }), _jsx(TableCell, { children: "Date" }), _jsx(TableCell, { children: "Payment Method" }), _jsx(TableCell, { children: "Due Date" }), _jsx(TableCell, { align: "center", children: "Actions" })] }) }), _jsx(TableBody, { children: payments.map((payment) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: payment.customerName }), _jsxs(TableCell, { align: "right", children: ["\u20B9", payment.amount.toLocaleString()] }), _jsx(TableCell, { align: "center", children: getStatusChip(payment.status) }), _jsx(TableCell, { align: "center", children: getRiskLevel(payment.amount, 50000) }), _jsx(TableCell, { children: new Date(payment.date).toLocaleDateString() }), _jsx(TableCell, { children: payment.paymentMethod }), _jsx(TableCell, { children: new Date(payment.dueDate).toLocaleDateString() }), _jsxs(TableCell, { align: "center", children: [_jsx(Tooltip, { title: "More Actions", children: _jsx(IconButton, { onClick: (e) => handleMenuOpen(e, payment), children: _jsx(HistoryIcon, {}) }) }), _jsxs(Menu, { anchorEl: anchorEl, open: Boolean(anchorEl), onClose: handleMenuClose, children: [_jsxs(MenuItem, { onClick: handleMenuClose, children: [_jsx(PaymentIcon, { sx: { mr: 1 } }), " Record Payment"] }), _jsxs(MenuItem, { onClick: handleMenuClose, children: [_jsx(ReceiptIcon, { sx: { mr: 1 } }), " View Payment History"] }), _jsxs(MenuItem, { onClick: handleMenuClose, children: [_jsx(WhatsAppIcon, { sx: { mr: 1 } }), " Send Reminder"] })] })] })] }, payment.id))) })] }) }), _jsxs(Dialog, { open: openDialog, onClose: () => setOpenDialog(false), maxWidth: "md", fullWidth: true, children: [_jsx(DialogTitle, { children: "Record New Payment" }), _jsx(DialogContent, { children: _jsx(Box, { sx: { mt: 2 }, children: _jsxs(Box, { sx: { display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }, children: [_jsx(Box, { children: _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: "Customer" }), _jsx(Select, { value: newPayment.customerName, label: "Customer", onChange: (e) => setNewPayment({ ...newPayment, customerName: e.target.value }), children: customers.map((customer) => (_jsxs(MenuItem, { value: customer.name, children: [customer.name, " (", customer.contact, ")"] }, customer.id))) })] }) }), _jsx(Box, { children: _jsx(TextField, { fullWidth: true, type: "number", label: "Amount", value: newPayment.amount, onChange: (e) => setNewPayment({ ...newPayment, amount: Number(e.target.value) }) }) }), _jsx(Box, { children: _jsx(TextField, { fullWidth: true, type: "date", label: "Payment Date", value: newPayment.date, onChange: (e) => setNewPayment({ ...newPayment, date: e.target.value }), InputLabelProps: { shrink: true } }) }), _jsx(Box, { children: _jsx(TextField, { fullWidth: true, type: "date", label: "Due Date", value: newPayment.dueDate, onChange: (e) => setNewPayment({ ...newPayment, dueDate: e.target.value }), InputLabelProps: { shrink: true } }) }), _jsx(Box, { children: _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: "Payment Method" }), _jsxs(Select, { value: newPayment.paymentMethod, label: "Payment Method", onChange: (e) => setNewPayment({ ...newPayment, paymentMethod: e.target.value }), children: [_jsx(MenuItem, { value: "Cash", children: "Cash" }), _jsx(MenuItem, { value: "Bank Transfer", children: "Bank Transfer" }), _jsx(MenuItem, { value: "UPI", children: "UPI" }), _jsx(MenuItem, { value: "Cheque", children: "Cheque" })] })] }) }), _jsx(Box, { children: _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: "Risk Level" }), _jsxs(Select, { value: newPayment.riskLevel, label: "Risk Level", onChange: (e) => setNewPayment({ ...newPayment, riskLevel: e.target.value }), children: [_jsx(MenuItem, { value: "Low", children: "Low" }), _jsx(MenuItem, { value: "Medium", children: "Medium" }), _jsx(MenuItem, { value: "High", children: "High" })] })] }) }), _jsx(Box, { sx: { gridColumn: { xs: '1', md: '1 / span 2' } }, children: _jsx(TextField, { fullWidth: true, label: "Notes", multiline: true, rows: 2, value: newPayment.notes, onChange: (e) => setNewPayment({ ...newPayment, notes: e.target.value }) }) })] }) }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: () => setOpenDialog(false), children: "Cancel" }), _jsx(Button, { variant: "contained", onClick: handleAddPayment, disabled: !newPayment.customerName || !newPayment.amount || !newPayment.dueDate, children: "Record Payment" })] })] })] }));
}
