import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Box, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Chip, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, FormControlLabel, Switch, } from '@mui/material';
import { Visibility as ViewIcon, WhatsApp as WhatsAppIcon, Add as AddIcon, Receipt as ReceiptIcon, Delete as DeleteIcon, Download as DownloadIcon, } from '@mui/icons-material';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
const mockSales = [
    {
        id: 'SALE-001',
        date: '2024-03-15',
        customerName: 'Mobile Zone',
        items: [
            {
                name: 'iPhone 12 LCD',
                quantity: 2,
                price: 5000,
                warranty: '6 months',
            },
        ],
        totalAmount: 10000,
        paymentStatus: 'Completed',
        paymentMethod: 'Cash',
        creditSale: false,
        creditLimit: 0,
        outstandingAmount: 0,
        notes: 'Regular sale',
    },
    {
        id: '2',
        date: '2024-03-14',
        customerName: 'Phone Paradise',
        items: [
            {
                name: 'Samsung Galaxy S20',
                quantity: 1,
                price: 32000,
                warranty: '1 year',
            },
        ],
        totalAmount: 32000,
        paymentStatus: 'Completed',
        paymentMethod: 'Cash',
        creditSale: false,
        creditLimit: 0,
        outstandingAmount: 0,
        notes: 'Regular sale',
    },
    {
        id: '3',
        date: '2024-03-10',
        customerName: 'Mobile Zone',
        items: [
            {
                name: 'iPhone 12 Pro Max',
                quantity: 2,
                price: 28000,
                warranty: '6 months',
            },
        ],
        totalAmount: 28000,
        paymentStatus: 'Completed',
        paymentMethod: 'Cash',
        creditSale: false,
        creditLimit: 0,
        outstandingAmount: 0,
        notes: 'Regular sale',
    },
];
const getStatusChip = (status) => {
    const statusConfig = {
        Pending: { color: 'warning', label: 'Pending' },
        Partial: { color: 'info', label: 'Partial' },
        Completed: { color: 'success', label: 'Completed' },
    };
    const config = statusConfig[status];
    return _jsx(Chip, { label: config.label, color: config.color, size: "small" });
};
const handleDownloadPDF = (sale) => {
    const doc = new jsPDF();
    // Add company header
    doc.setFontSize(20);
    doc.text('Mobile Spare Parts', 105, 15, { align: 'center' });
    doc.setFontSize(12);
    doc.text('Sales Receipt', 105, 25, { align: 'center' });
    // Add sale details
    doc.setFontSize(10);
    doc.text(`Sale ID: ${sale.id}`, 20, 35);
    doc.text(`Date: ${new Date(sale.date).toLocaleDateString()}`, 20, 40);
    doc.text(`Customer: ${sale.customerName}`, 20, 45);
    doc.text(`Status: ${sale.paymentStatus}`, 20, 50);
    doc.text(`Payment Method: ${sale.paymentMethod}`, 20, 55);
    if (sale.creditSale) {
        doc.text(`Credit Limit: ₹${sale.creditLimit.toLocaleString()}`, 20, 60);
        doc.text(`Outstanding Amount: ₹${sale.outstandingAmount.toLocaleString()}`, 20, 65);
    }
    // Add items table
    const tableColumn = ['Item', 'Quantity', 'Price', 'Warranty', 'Total'];
    const tableRows = sale.items.map(item => [
        item.name,
        item.quantity.toString(),
        `₹${item.price.toLocaleString()}`,
        item.warranty,
        `₹${(item.price * item.quantity).toLocaleString()}`
    ]);
    autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 70,
        theme: 'grid',
        styles: { fontSize: 8 },
        headStyles: { fillColor: [41, 128, 185] }
    });
    // Add total amount
    const finalY = doc.lastAutoTable.finalY || 70;
    doc.text(`Total Amount: ₹${sale.totalAmount.toLocaleString()}`, 20, finalY + 10);
    // Add notes if exists
    if (sale.notes) {
        doc.text('Notes:', 20, finalY + 20);
        doc.text(sale.notes, 20, finalY + 25);
    }
    // Add footer
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(8);
    doc.text('Thank you for your business!', 105, pageHeight - 20, { align: 'center' });
    doc.text('For any queries, please contact us at support@mobilespareparts.com', 105, pageHeight - 15, { align: 'center' });
    // Save the PDF
    doc.save(`Sale_${sale.id}.pdf`);
};
const Sales = ({ customers = [], inventory = [] }) => {
    const [sales, setSales] = useState(mockSales);
    const [openDialog, setOpenDialog] = useState(false);
    const [newSale, setNewSale] = useState({
        date: new Date().toISOString().split('T')[0],
        items: [{ name: '', quantity: 1, price: 0, warranty: '6 months' }],
        paymentStatus: 'Pending',
        paymentMethod: 'Cash',
        creditSale: false,
        creditLimit: 0,
        outstandingAmount: 0,
        notes: '',
    });
    const handleAddItem = () => {
        setNewSale({
            ...newSale,
            items: [...(newSale.items || []), { name: '', quantity: 1, price: 0, warranty: '6 months' }],
        });
    };
    const handleRemoveItem = (index) => {
        const updatedItems = [...(newSale.items || [])];
        updatedItems.splice(index, 1);
        setNewSale({ ...newSale, items: updatedItems });
    };
    const handleItemChange = (index, field, value) => {
        const updatedItems = [...(newSale.items || [])];
        updatedItems[index] = { ...updatedItems[index], [field]: value };
        if (field === 'name') {
            const selectedItem = (inventory || []).find(item => item.name === value);
            if (selectedItem) {
                updatedItems[index].price = selectedItem.price;
                updatedItems[index].warranty = selectedItem.warranty;
            }
        }
        setNewSale({ ...newSale, items: updatedItems });
    };
    const calculateTotal = () => {
        return (newSale.items || []).reduce((total, item) => total + (item.price * item.quantity), 0);
    };
    const handleAddSale = () => {
        if (newSale.customerName && newSale.items?.length) {
            const sale = {
                id: `SALE-${sales.length + 1}`,
                date: newSale.date || new Date().toISOString().split('T')[0],
                customerName: newSale.customerName,
                items: newSale.items.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    warranty: item.warranty || '6 months',
                })),
                totalAmount: newSale.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
                paymentStatus: newSale.paymentStatus || 'Pending',
                paymentMethod: newSale.paymentMethod || 'Cash',
                creditSale: newSale.creditSale || false,
                creditLimit: newSale.creditLimit || 0,
                outstandingAmount: newSale.outstandingAmount || 0,
                notes: '',
            };
            setSales([...sales, sale]);
            setOpenDialog(false);
            setNewSale({
                date: new Date().toISOString().split('T')[0],
                items: [{ name: '', quantity: 1, price: 0, warranty: '6 months' }],
                paymentStatus: 'Pending',
                paymentMethod: 'Cash',
                creditSale: false,
                creditLimit: 0,
                outstandingAmount: 0,
                notes: '',
            });
        }
    };
    return (_jsxs(Box, { children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', mb: 3 }, children: [_jsx(Typography, { variant: "h4", children: "Sales & Orders" }), _jsx(Button, { variant: "contained", color: "primary", startIcon: _jsx(AddIcon, {}), onClick: () => setOpenDialog(true), sx: { mb: 2 }, children: "New Sale" })] }), _jsx(TableContainer, { component: Paper, children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Date" }), _jsx(TableCell, { children: "Invoice ID" }), _jsx(TableCell, { children: "Customer" }), _jsx(TableCell, { children: "Payment Method" }), _jsx(TableCell, { align: "right", children: "Items" }), _jsx(TableCell, { align: "right", children: "Amount" }), _jsx(TableCell, { align: "right", children: "Outstanding" }), _jsx(TableCell, { align: "center", children: "Status" }), _jsx(TableCell, { align: "center", children: "Risk Level" }), _jsx(TableCell, { align: "center", children: "Actions" })] }) }), _jsx(TableBody, { children: sales.map((sale) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: sale.date }), _jsx(TableCell, { children: sale.id }), _jsx(TableCell, { children: sale.customerName }), _jsx(TableCell, { children: sale.paymentMethod }), _jsx(TableCell, { align: "right", children: (sale.items || []).map((item, index) => (_jsxs(Typography, { variant: "body2", children: [item.name, " (", item.quantity, ")"] }, index))) }), _jsxs(TableCell, { align: "right", children: ["\u20B9", sale.totalAmount.toLocaleString()] }), _jsxs(TableCell, { align: "right", children: ["\u20B9", sale.outstandingAmount.toLocaleString()] }), _jsx(TableCell, { align: "center", children: getStatusChip(sale.paymentStatus) }), _jsx(TableCell, { align: "center", children: _jsx(Chip, { label: sale.creditSale ? 'High' : 'Low', color: sale.creditSale ? 'error' : 'success', size: "small" }) }), _jsxs(TableCell, { align: "center", children: [_jsx(IconButton, { size: "small", children: _jsx(ViewIcon, {}) }), _jsx(IconButton, { size: "small", children: _jsx(WhatsAppIcon, {}) }), _jsx(IconButton, { size: "small", children: _jsx(ReceiptIcon, {}) }), _jsx(IconButton, { size: "small", children: _jsx(DownloadIcon, {}) })] })] }, sale.id))) })] }) }), _jsxs(Dialog, { open: openDialog, onClose: () => setOpenDialog(false), maxWidth: "md", fullWidth: true, children: [_jsx(DialogTitle, { children: "New Sale" }), _jsx(DialogContent, { children: _jsxs(Box, { sx: { display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mt: 2 }, children: [_jsx(Box, { children: _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: "Customer" }), _jsx(Select, { value: newSale.customerName || '', label: "Customer", onChange: (e) => {
                                                    const selectedCustomer = (customers || []).find(c => c.name === e.target.value);
                                                    setNewSale({
                                                        ...newSale,
                                                        customerName: e.target.value,
                                                        creditLimit: selectedCustomer?.creditLimit || 0,
                                                        outstandingAmount: selectedCustomer?.outstandingAmount || 0,
                                                    });
                                                }, children: (customers || []).map((customer) => (_jsxs(MenuItem, { value: customer.name, children: [customer.name, " (", customer.contact, ")"] }, customer.id))) })] }) }), _jsx(Box, { children: _jsx(TextField, { fullWidth: true, type: "date", label: "Sale Date", value: newSale.date, onChange: (e) => setNewSale({ ...newSale, date: e.target.value }), InputLabelProps: { shrink: true } }) }), _jsxs(Box, { sx: { gridColumn: '1 / -1', mt: 2 }, children: [_jsx(Typography, { variant: "h6", sx: { mb: 1 }, children: "Sale Items" }), (newSale.items || []).map((item, index) => (_jsxs(Box, { sx: { display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr 1fr 0.2fr' }, gap: 2, mb: 2, alignItems: 'center' }, children: [_jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: "Item Name" }), _jsx(Select, { value: item.name, label: "Item Name", onChange: (e) => handleItemChange(index, 'name', e.target.value), children: (inventory || []).map((invItem) => (_jsxs(MenuItem, { value: invItem.name, children: [invItem.name, " (Stock: ", invItem.quantity, ")"] }, invItem.id))) })] }), _jsx(TextField, { fullWidth: true, label: "Quantity", type: "number", value: item.quantity, onChange: (e) => handleItemChange(index, 'quantity', Number(e.target.value)), InputProps: { inputProps: { min: 1 } } }), _jsx(TextField, { fullWidth: true, label: "Price", type: "number", value: item.price, onChange: (e) => handleItemChange(index, 'price', Number(e.target.value)), InputProps: { readOnly: true } }), _jsx(IconButton, { color: "error", onClick: () => handleRemoveItem(index), children: _jsx(DeleteIcon, {}) })] }, index))), _jsx(Button, { startIcon: _jsx(AddIcon, {}), onClick: handleAddItem, children: "Add Another Item" })] }), _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: "Payment Method" }), _jsxs(Select, { value: newSale.paymentMethod, label: "Payment Method", onChange: (e) => setNewSale({ ...newSale, paymentMethod: e.target.value }), children: [_jsx(MenuItem, { value: "Cash", children: "Cash" }), _jsx(MenuItem, { value: "Card", children: "Card" }), _jsx(MenuItem, { value: "UPI", children: "UPI" }), _jsx(MenuItem, { value: "Credit", children: "Credit" })] })] }), _jsx(FormControlLabel, { control: _jsx(Switch, { checked: newSale.creditSale, onChange: (e) => setNewSale({ ...newSale, creditSale: e.target.checked }) }), label: "Credit Sale" }), newSale.creditSale && (_jsxs(_Fragment, { children: [_jsx(TextField, { fullWidth: true, label: "Credit Limit", type: "number", value: newSale.creditLimit, onChange: (e) => setNewSale({ ...newSale, creditLimit: Number(e.target.value) }), InputProps: { readOnly: true } }), _jsx(TextField, { fullWidth: true, label: "Outstanding Amount", type: "number", value: newSale.outstandingAmount, onChange: (e) => setNewSale({ ...newSale, outstandingAmount: Number(e.target.value) }), InputProps: { readOnly: true } })] })), _jsx(TextField, { fullWidth: true, label: "Notes", multiline: true, rows: 2, value: newSale.notes, onChange: (e) => setNewSale({ ...newSale, notes: e.target.value }), sx: { gridColumn: '1 / -1' } }), _jsxs(Typography, { variant: "h6", sx: { gridColumn: '1 / -1', textAlign: 'right', mt: 2 }, children: ["Total Amount: \u20B9", calculateTotal().toLocaleString()] })] }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: () => setOpenDialog(false), children: "Cancel" }), _jsx(Button, { onClick: handleAddSale, variant: "contained", children: "Add Sale" })] })] })] }));
};
export default Sales;
