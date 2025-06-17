import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Button, Tooltip, Menu, MenuItem, TextField, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions, Select, FormControl, InputLabel, FormControlLabel, Switch, } from '@mui/material';
import { WhatsApp as WhatsAppIcon, Receipt as ReceiptIcon, History as HistoryIcon, Download as DownloadIcon, Search as SearchIcon, FilterList as FilterIcon, Add as AddIcon, Delete as DeleteIcon, Payment as PaymentIcon, } from '@mui/icons-material';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
const mockInvoices = [
    {
        id: 'INV-001',
        date: '2024-03-15',
        customerName: 'Mobile Zone',
        customerId: 'CUST-001',
        amount: 45000,
        status: 'partial',
        paymentMethod: 'credit',
        items: [
            {
                name: 'iPhone 12 LCD',
                quantity: 2,
                price: 12000,
                warranty: '6 months',
            },
            {
                name: 'Samsung S21 LCD',
                quantity: 1,
                price: 15000,
                warranty: '6 months',
            },
        ],
        paymentHistory: [
            { date: '2024-03-20', amount: 20000, method: 'Bank Transfer' },
        ],
        outstandingAmount: 25000,
    },
    {
        id: 'INV-002',
        date: '2024-03-14',
        customerName: 'Phone Paradise',
        customerId: 'CUST-002',
        amount: 32000,
        status: 'paid',
        paymentMethod: 'cash',
        items: [
            {
                name: 'iPhone 13 LCD',
                quantity: 2,
                price: 16000,
                warranty: '6 months',
            },
        ],
    },
];
const handleDownloadPDF = (invoice) => {
    const doc = new jsPDF();
    // Add company header
    doc.setFontSize(20);
    doc.text('Mobile Spare Parts', 105, 15, { align: 'center' });
    doc.setFontSize(12);
    doc.text('Invoice', 105, 25, { align: 'center' });
    // Add invoice details
    doc.setFontSize(10);
    doc.text(`Invoice ID: ${invoice.id}`, 20, 35);
    doc.text(`Date: ${new Date(invoice.date).toLocaleDateString()}`, 20, 40);
    doc.text(`Customer: ${invoice.customerName}`, 20, 45);
    doc.text(`Status: ${invoice.status.toUpperCase()}`, 20, 50);
    doc.text(`Payment Method: ${invoice.paymentMethod.toUpperCase()}`, 20, 55);
    if (invoice.creditSale) {
        doc.text(`Due Date: ${new Date(invoice.dueDate || '').toLocaleDateString()}`, 20, 60);
        doc.text(`Outstanding Amount: ₹${(invoice.outstandingAmount || 0).toLocaleString()}`, 20, 65);
    }
    // Add items table
    const tableColumn = ['Item', 'Quantity', 'Price', 'Warranty', 'Total'];
    const tableRows = invoice.items.map(item => [
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
    doc.text(`Total Amount: ₹${invoice.amount.toLocaleString()}`, 20, finalY + 10);
    // Add payment history if exists
    if (invoice.paymentHistory && invoice.paymentHistory.length > 0) {
        doc.text('Payment History:', 20, finalY + 20);
        const paymentTableColumn = ['Date', 'Amount', 'Method'];
        const paymentTableRows = invoice.paymentHistory.map(payment => [
            new Date(payment.date).toLocaleDateString(),
            `₹${payment.amount.toLocaleString()}`,
            payment.method
        ]);
        autoTable(doc, {
            head: [paymentTableColumn],
            body: paymentTableRows,
            startY: finalY + 25,
            theme: 'grid',
            styles: { fontSize: 8 },
            headStyles: { fillColor: [41, 128, 185] }
        });
    }
    // Add notes if exists
    if (invoice.notes) {
        const notesY = doc.lastAutoTable.finalY || finalY + 25;
        doc.text('Notes:', 20, notesY + 10);
        doc.text(invoice.notes, 20, notesY + 15);
    }
    // Add footer
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(8);
    doc.text('Thank you for your business!', 105, pageHeight - 20, { align: 'center' });
    doc.text('For any queries, please contact us at support@mobilespareparts.com', 105, pageHeight - 15, { align: 'center' });
    // Save the PDF
    doc.save(`Invoice_${invoice.id}.pdf`);
};
export default function Invoices({ customers = [], inventory = [] }) {
    const [invoices, setInvoices] = useState(mockInvoices);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [openNewInvoiceDialog, setOpenNewInvoiceDialog] = useState(false);
    const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
    const [newInvoice, setNewInvoice] = useState({
        date: new Date().toISOString().split('T')[0],
        items: [],
        paymentMethod: 'cash',
        status: 'pending',
        creditSale: false,
        amount: 0,
    });
    const [paymentAmount, setPaymentAmount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('Cash');
    const handleMenuOpen = (event, invoice) => {
        setAnchorEl(event.currentTarget);
        setSelectedInvoice(invoice);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedInvoice(null);
    };
    const getStatusChip = (status) => {
        const statusConfig = {
            paid: { color: 'success', label: 'Paid' },
            pending: { color: 'warning', label: 'Pending' },
            overdue: { color: 'error', label: 'Overdue' },
            partial: { color: 'info', label: 'Partial' },
        };
        const config = statusConfig[status];
        return _jsx(Chip, { label: config.label, color: config.color, size: "small" });
    };
    const handleWhatsAppShare = (invoice) => {
        // TODO: Implement WhatsApp sharing
        console.log('Sharing invoice via WhatsApp:', invoice.id);
    };
    const handleAddItem = () => {
        setNewInvoice({
            ...newInvoice,
            items: [...(newInvoice.items || []), { name: '', quantity: 1, price: 0, warranty: '6 months' }],
        });
    };
    const handleRemoveItem = (index) => {
        const updatedItems = [...(newInvoice.items || [])];
        updatedItems.splice(index, 1);
        setNewInvoice({ ...newInvoice, items: updatedItems });
    };
    const handleItemChange = (index, field, value) => {
        const updatedItems = [...(newInvoice.items || [])];
        updatedItems[index] = { ...updatedItems[index], [field]: value };
        if (field === 'name') {
            const selectedItem = inventory.find(item => item.name === value);
            if (selectedItem) {
                updatedItems[index].price = selectedItem.price;
                updatedItems[index].warranty = selectedItem.warranty;
            }
        }
        setNewInvoice({ ...newInvoice, items: updatedItems });
    };
    const calculateInvoiceTotal = () => {
        return (newInvoice.items || []).reduce((total, item) => total + (item.price * item.quantity), 0);
    };
    const handleAddInvoice = () => {
        if (newInvoice.customerName && newInvoice.items && newInvoice.items.length > 0) {
            const customer = customers.find(c => c.name === newInvoice.customerName);
            const totalAmount = calculateInvoiceTotal();
            if (newInvoice.creditSale && customer) {
                const newOutstanding = (customer.outstandingAmount || 0) + totalAmount;
                if (newOutstanding > customer.creditLimit) {
                    alert('Credit limit exceeded for this customer');
                    return;
                }
            }
            const invoice = {
                id: `INV-${invoices.length + 1}`,
                date: newInvoice.date || new Date().toISOString().split('T')[0],
                customerName: newInvoice.customerName,
                customerId: customer?.id || '',
                amount: totalAmount,
                status: newInvoice.creditSale && totalAmount > 0 ? 'partial' : 'paid',
                paymentMethod: newInvoice.paymentMethod || 'cash',
                items: newInvoice.items.map(item => ({ ...item, warranty: item.warranty || '6 months' })),
                notes: newInvoice.notes || '',
                outstandingAmount: newInvoice.creditSale ? totalAmount : 0,
                paymentHistory: newInvoice.creditSale ? [] : [{ date: new Date().toISOString().split('T')[0], amount: totalAmount, method: newInvoice.paymentMethod || 'Cash' }],
                creditSale: newInvoice.creditSale,
                dueDate: newInvoice.creditSale ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined,
                riskLevel: newInvoice.creditSale ? 'Low' : undefined,
            };
            if (customer && newInvoice.creditSale) {
                const updatedCustomer = {
                    ...customer,
                    outstandingAmount: (customer.outstandingAmount || 0) + totalAmount,
                    lastPaymentDate: new Date().toISOString().split('T')[0],
                };
                // TODO: Update customer in App.tsx state
            }
            newInvoice.items.forEach(item => {
                const inventoryItem = inventory.find(inv => inv.name === item.name);
                if (inventoryItem) {
                    const updatedItem = {
                        ...inventoryItem,
                        quantity: inventoryItem.quantity - item.quantity,
                        stockStatus: inventoryItem.quantity - item.quantity <= 10 ? 'Low Stock' : 'In Stock',
                    };
                    // TODO: Update inventory in App.tsx state
                }
            });
            setInvoices([...invoices, invoice]);
            setOpenNewInvoiceDialog(false);
            setNewInvoice({
                date: new Date().toISOString().split('T')[0],
                items: [],
                paymentMethod: 'cash',
                status: 'pending',
                creditSale: false,
                amount: 0,
            });
        }
    };
    const handleRecordPayment = () => {
        if (selectedInvoice && paymentAmount > 0) {
            const updatedInvoices = invoices.map(inv => {
                if (inv.id === selectedInvoice.id) {
                    const newOutstanding = (inv.outstandingAmount || 0) - paymentAmount;
                    const newStatus = newOutstanding <= 0 ? 'paid' : 'partial';
                    const updatedInvoice = {
                        ...inv,
                        outstandingAmount: newOutstanding,
                        status: newStatus,
                        paymentHistory: [...(inv.paymentHistory || []), { date: new Date().toISOString().split('T')[0], amount: paymentAmount, method: paymentMethod }],
                    };
                    const customer = customers.find(c => c.id === inv.customerId);
                    if (customer) {
                        const updatedCustomer = {
                            ...customer,
                            outstandingAmount: (customer.outstandingAmount || 0) - paymentAmount,
                            lastPaymentDate: new Date().toISOString().split('T')[0],
                        };
                        // TODO: Update customer in App.tsx state
                    }
                    return updatedInvoice;
                }
                return inv;
            });
            setInvoices(updatedInvoices);
            setOpenPaymentDialog(false);
            setPaymentAmount(0);
            setPaymentMethod('Cash');
        }
    };
    return (_jsxs(Box, { children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', mb: 3 }, children: [_jsx(Typography, { variant: "h4", children: "Invoices" }), _jsxs(Box, { sx: { display: 'flex', gap: 2 }, children: [_jsx(TextField, { size: "small", placeholder: "Search invoices...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), InputProps: {
                                    startAdornment: (_jsx(InputAdornment, { position: "start", children: _jsx(SearchIcon, {}) })),
                                } }), _jsx(Button, { variant: "outlined", startIcon: _jsx(FilterIcon, {}), onClick: () => {
                                    // TODO: Implement filtering
                                }, children: "Filter" }), _jsx(Button, { variant: "contained", startIcon: _jsx(AddIcon, {}), onClick: () => setOpenNewInvoiceDialog(true), children: "Create Invoice" })] })] }), _jsx(TableContainer, { component: Paper, children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Invoice ID" }), _jsx(TableCell, { children: "Date" }), _jsx(TableCell, { children: "Customer" }), _jsx(TableCell, { children: "Payment Method" }), _jsx(TableCell, { align: "right", children: "Amount" }), _jsx(TableCell, { align: "right", children: "Outstanding" }), _jsx(TableCell, { align: "center", children: "Status" }), _jsx(TableCell, { align: "center", children: "Items" }), _jsx(TableCell, { align: "center", children: "Actions" })] }) }), _jsx(TableBody, { children: invoices.map((invoice) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: invoice.id }), _jsx(TableCell, { children: new Date(invoice.date).toLocaleDateString() }), _jsx(TableCell, { children: invoice.customerName }), _jsx(TableCell, { children: _jsx(Chip, { label: invoice.paymentMethod.toUpperCase(), color: invoice.paymentMethod === 'credit' ? 'warning' : 'success', size: "small" }) }), _jsxs(TableCell, { align: "right", children: ["\u20B9", invoice.amount.toLocaleString()] }), _jsxs(TableCell, { align: "right", children: ["\u20B9", (invoice.outstandingAmount || 0).toLocaleString()] }), _jsx(TableCell, { align: "center", children: getStatusChip(invoice.status) }), _jsxs(TableCell, { align: "center", children: [invoice.items.length, " items"] }), _jsxs(TableCell, { align: "center", children: [_jsx(Tooltip, { title: "More Actions", children: _jsx(IconButton, { onClick: (e) => handleMenuOpen(e, invoice), children: _jsx(HistoryIcon, {}) }) }), _jsx(IconButton, { color: "primary", onClick: () => {
                                                    setSelectedInvoice(invoice);
                                                    setOpenPaymentDialog(true);
                                                }, disabled: invoice.status === 'paid', children: _jsx(PaymentIcon, {}) }), _jsxs(Menu, { anchorEl: anchorEl, open: Boolean(anchorEl), onClose: handleMenuClose, children: [_jsxs(MenuItem, { onClick: handleMenuClose, children: [_jsx(ReceiptIcon, { sx: { mr: 1 } }), " View Details"] }), _jsxs(MenuItem, { onClick: () => {
                                                            handleMenuClose();
                                                            handleDownloadPDF(selectedInvoice);
                                                        }, children: [_jsx(DownloadIcon, { sx: { mr: 1 } }), " Download PDF"] }), _jsxs(MenuItem, { onClick: () => handleWhatsAppShare(selectedInvoice), children: [_jsx(WhatsAppIcon, { sx: { mr: 1 } }), " Share via WhatsApp"] })] })] })] }, invoice.id))) })] }) }), _jsxs(Dialog, { open: openNewInvoiceDialog, onClose: () => setOpenNewInvoiceDialog(false), maxWidth: "md", fullWidth: true, children: [_jsx(DialogTitle, { children: "Create New Invoice" }), _jsx(DialogContent, { children: _jsxs(Box, { sx: { display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mt: 2 }, children: [_jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: "Customer" }), _jsx(Select, { value: newInvoice.customerName || '', label: "Customer", onChange: (e) => {
                                                const selectedCustomer = customers.find(c => c.name === e.target.value);
                                                setNewInvoice({
                                                    ...newInvoice,
                                                    customerName: e.target.value,
                                                    customerId: selectedCustomer?.id || '',
                                                    creditSale: selectedCustomer?.creditRating === 'A' || selectedCustomer?.creditRating === 'B',
                                                    outstandingAmount: selectedCustomer?.outstandingAmount || 0,
                                                });
                                            }, children: customers.map((customer) => (_jsxs(MenuItem, { value: customer.name, children: [customer.name, " (Credit: \u20B9", customer.creditLimit.toLocaleString(), ")"] }, customer.id))) })] }), _jsx(TextField, { fullWidth: true, type: "date", label: "Invoice Date", value: newInvoice.date, onChange: (e) => setNewInvoice({ ...newInvoice, date: e.target.value }), InputLabelProps: { shrink: true } }), _jsxs(Box, { sx: { gridColumn: '1 / -1', mt: 2 }, children: [_jsx(Typography, { variant: "h6", sx: { mb: 1 }, children: "Invoice Items" }), (newInvoice.items || []).map((item, index) => (_jsxs(Box, { sx: { display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr 1fr 0.2fr' }, gap: 2, mb: 2, alignItems: 'center' }, children: [_jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: "Item Name" }), _jsx(Select, { value: item.name, label: "Item Name", onChange: (e) => handleItemChange(index, 'name', e.target.value), children: inventory.map((invItem) => (_jsxs(MenuItem, { value: invItem.name, children: [invItem.name, " (Stock: ", invItem.quantity, ")"] }, invItem.id))) })] }), _jsx(TextField, { fullWidth: true, label: "Quantity", type: "number", value: item.quantity, onChange: (e) => handleItemChange(index, 'quantity', Number(e.target.value)), InputProps: { inputProps: { min: 1 } } }), _jsx(TextField, { fullWidth: true, label: "Price", type: "number", value: item.price, onChange: (e) => handleItemChange(index, 'price', Number(e.target.value)), InputProps: { readOnly: true,
                                                        startAdornment: _jsx(InputAdornment, { position: "start", children: "\u20B9" })
                                                    } }), _jsx(IconButton, { color: "error", onClick: () => handleRemoveItem(index), children: _jsx(DeleteIcon, {}) })] }, index))), _jsx(Button, { startIcon: _jsx(AddIcon, {}), onClick: handleAddItem, children: "Add Another Item" })] }), _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: "Payment Method" }), _jsxs(Select, { value: newInvoice.paymentMethod, label: "Payment Method", onChange: (e) => setNewInvoice({ ...newInvoice, paymentMethod: e.target.value }), children: [_jsx(MenuItem, { value: "cash", children: "Cash" }), _jsx(MenuItem, { value: "card", children: "Card" }), _jsx(MenuItem, { value: "upi", children: "UPI" }), _jsx(MenuItem, { value: "credit", children: "Credit" })] })] }), _jsx(FormControlLabel, { control: _jsx(Switch, { checked: newInvoice.creditSale || false, onChange: (e) => setNewInvoice({ ...newInvoice, creditSale: e.target.checked }) }), label: "Credit Sale" }), newInvoice.creditSale && (_jsxs(_Fragment, { children: [_jsx(TextField, { fullWidth: true, label: "Customer Credit Limit", type: "number", value: customers.find(c => c.name === newInvoice.customerName)?.creditLimit || 0, InputProps: { readOnly: true, startAdornment: _jsx(InputAdornment, { position: "start", children: "\u20B9" }) } }), _jsx(TextField, { fullWidth: true, label: "Customer Outstanding Amount", type: "number", value: customers.find(c => c.name === newInvoice.customerName)?.outstandingAmount || 0, InputProps: { readOnly: true, startAdornment: _jsx(InputAdornment, { position: "start", children: "\u20B9" }) } })] })), _jsx(TextField, { fullWidth: true, label: "Notes", multiline: true, rows: 2, value: newInvoice.notes, onChange: (e) => setNewInvoice({ ...newInvoice, notes: e.target.value }), sx: { gridColumn: '1 / -1' } }), _jsxs(Typography, { variant: "h6", sx: { gridColumn: '1 / -1', textAlign: 'right', mt: 2 }, children: ["Total Amount: \u20B9", calculateInvoiceTotal().toLocaleString()] })] }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: () => setOpenNewInvoiceDialog(false), children: "Cancel" }), _jsx(Button, { onClick: handleAddInvoice, variant: "contained", children: "Create Invoice" })] })] }), _jsxs(Dialog, { open: openPaymentDialog, onClose: () => setOpenPaymentDialog(false), maxWidth: "xs", fullWidth: true, children: [_jsxs(DialogTitle, { children: ["Record Payment for ", selectedInvoice?.id] }), _jsx(DialogContent, { children: _jsxs(Box, { sx: { mt: 2 }, children: [_jsxs(Typography, { variant: "body1", sx: { mb: 1 }, children: ["Outstanding Amount: \u20B9", (selectedInvoice?.outstandingAmount || 0).toLocaleString()] }), _jsx(TextField, { fullWidth: true, label: "Payment Amount", type: "number", value: paymentAmount, onChange: (e) => setPaymentAmount(Number(e.target.value)), InputProps: { startAdornment: _jsx(InputAdornment, { position: "start", children: "\u20B9" }) }, sx: { mb: 2 } }), _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: "Payment Method" }), _jsxs(Select, { value: paymentMethod, label: "Payment Method", onChange: (e) => setPaymentMethod(e.target.value), children: [_jsx(MenuItem, { value: "Cash", children: "Cash" }), _jsx(MenuItem, { value: "Card", children: "Card" }), _jsx(MenuItem, { value: "UPI", children: "UPI" })] })] })] }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: () => setOpenPaymentDialog(false), children: "Cancel" }), _jsx(Button, { onClick: handleRecordPayment, variant: "contained", disabled: paymentAmount <= 0 || paymentAmount > (selectedInvoice?.outstandingAmount || 0), children: "Record Payment" })] })] })] }));
}
