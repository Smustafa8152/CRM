import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Button, TextField, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem, } from '@mui/material';
import { WhatsApp as WhatsAppIcon, Send as SendIcon, Search as SearchIcon, History as HistoryIcon, Schedule as ScheduleIcon, } from '@mui/icons-material';
const mockMessages = [
    {
        id: 'MSG-001',
        date: '2024-03-15',
        customerName: 'Mobile Zone',
        type: 'invoice',
        status: 'read',
        content: 'Your invoice #INV-001 for ₹45,000 has been generated. Please check your email for details.',
    },
    {
        id: 'MSG-002',
        date: '2024-03-14',
        customerName: 'Phone Paradise',
        type: 'payment',
        status: 'delivered',
        content: 'Payment reminder: ₹20,000 is due for invoice #INV-002. Please process the payment at your earliest convenience.',
    },
    {
        id: 'MSG-003',
        date: '2024-03-13',
        customerName: 'Tech Solutions',
        type: 'warranty',
        status: 'sent',
        content: 'Your warranty claim #TKT-001 has been approved. Our technician will visit your store tomorrow between 10 AM - 12 PM.',
        scheduledFor: '2024-03-14T10:00:00',
    },
];
export default function WhatsApp() {
    const [messages] = useState(mockMessages);
    const [searchQuery, setSearchQuery] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [newMessage, setNewMessage] = useState({
        customerName: '',
        type: 'custom',
        content: '',
        scheduledFor: '',
    });
    const getStatusChip = (status) => {
        const statusConfig = {
            sent: { color: 'info', label: 'Sent' },
            delivered: { color: 'primary', label: 'Delivered' },
            read: { color: 'success', label: 'Read' },
            failed: { color: 'error', label: 'Failed' },
        };
        const config = statusConfig[status];
        return _jsx(Chip, { label: config.label, color: config.color, size: "small" });
    };
    const getTypeChip = (type) => {
        const typeConfig = {
            invoice: { color: 'primary', label: 'Invoice' },
            payment: { color: 'warning', label: 'Payment' },
            warranty: { color: 'success', label: 'Warranty' },
            support: { color: 'info', label: 'Support' },
            custom: { color: 'default', label: 'Custom' },
        };
        const config = typeConfig[type];
        return _jsx(Chip, { label: config.label, color: config.color, size: "small" });
    };
    const handleSendMessage = () => {
        // TODO: Implement message sending
        console.log('Sending message:', newMessage);
        setOpenDialog(false);
        setNewMessage({
            customerName: '',
            type: 'custom',
            content: '',
            scheduledFor: '',
        });
    };
    return (_jsxs(Box, { children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', mb: 3 }, children: [_jsx(Typography, { variant: "h4", children: "WhatsApp Messages" }), _jsxs(Box, { sx: { display: 'flex', gap: 2 }, children: [_jsx(TextField, { size: "small", placeholder: "Search messages...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), InputProps: {
                                    startAdornment: (_jsx(InputAdornment, { position: "start", children: _jsx(SearchIcon, {}) })),
                                } }), _jsx(Button, { variant: "contained", startIcon: _jsx(WhatsAppIcon, {}), onClick: () => setOpenDialog(true), children: "New Message" })] })] }), _jsx(TableContainer, { component: Paper, children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Date" }), _jsx(TableCell, { children: "Customer" }), _jsx(TableCell, { children: "Type" }), _jsx(TableCell, { children: "Content" }), _jsx(TableCell, { align: "center", children: "Status" }), _jsx(TableCell, { align: "center", children: "Scheduled" }), _jsx(TableCell, { align: "center", children: "Actions" })] }) }), _jsx(TableBody, { children: messages.map((message) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: new Date(message.date).toLocaleDateString() }), _jsx(TableCell, { children: message.customerName }), _jsx(TableCell, { children: getTypeChip(message.type) }), _jsx(TableCell, { sx: { maxWidth: 300 }, children: _jsx(Typography, { noWrap: true, children: message.content }) }), _jsx(TableCell, { align: "center", children: getStatusChip(message.status) }), _jsx(TableCell, { align: "center", children: message.scheduledFor ? (_jsx(Chip, { icon: _jsx(ScheduleIcon, {}), label: new Date(message.scheduledFor).toLocaleString(), size: "small" })) : ('-') }), _jsx(TableCell, { align: "center", children: _jsx(IconButton, { size: "small", onClick: () => {
                                                setSelectedMessage(message);
                                                setOpenDialog(true);
                                            }, children: _jsx(HistoryIcon, {}) }) })] }, message.id))) })] }) }), _jsxs(Dialog, { open: openDialog, onClose: () => {
                    setOpenDialog(false);
                    setSelectedMessage(null);
                }, maxWidth: "md", fullWidth: true, children: [_jsx(DialogTitle, { children: selectedMessage ? 'Message Details' : 'New Message' }), _jsx(DialogContent, { children: _jsxs(Box, { sx: { mt: 2 }, children: [_jsx(Box, { sx: { mb: 2 }, children: _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: "Customer" }), _jsxs(Select, { value: selectedMessage?.customerName || newMessage.customerName, label: "Customer", onChange: (e) => {
                                                    if (selectedMessage) {
                                                        // Handle view mode
                                                    }
                                                    else {
                                                        setNewMessage({ ...newMessage, customerName: e.target.value });
                                                    }
                                                }, disabled: !!selectedMessage, children: [_jsx(MenuItem, { value: "Mobile Zone", children: "Mobile Zone" }), _jsx(MenuItem, { value: "Phone Paradise", children: "Phone Paradise" }), _jsx(MenuItem, { value: "Tech Solutions", children: "Tech Solutions" })] })] }) }), _jsx(Box, { sx: { mb: 2 }, children: _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: "Message Type" }), _jsxs(Select, { value: selectedMessage?.type || newMessage.type, label: "Message Type", onChange: (e) => {
                                                    if (selectedMessage) {
                                                        // Handle view mode
                                                    }
                                                    else {
                                                        setNewMessage({ ...newMessage, type: e.target.value });
                                                    }
                                                }, disabled: !!selectedMessage, children: [_jsx(MenuItem, { value: "invoice", children: "Invoice" }), _jsx(MenuItem, { value: "payment", children: "Payment" }), _jsx(MenuItem, { value: "warranty", children: "Warranty" }), _jsx(MenuItem, { value: "support", children: "Support" }), _jsx(MenuItem, { value: "custom", children: "Custom" })] })] }) }), _jsx(Box, { sx: { mb: 2 }, children: _jsx(TextField, { fullWidth: true, multiline: true, rows: 4, label: "Message Content", value: selectedMessage?.content || newMessage.content, onChange: (e) => {
                                            if (selectedMessage) {
                                                // Handle view mode
                                            }
                                            else {
                                                setNewMessage({ ...newMessage, content: e.target.value });
                                            }
                                        }, disabled: !!selectedMessage }) }), _jsx(Box, { sx: { mb: 2 }, children: _jsx(TextField, { fullWidth: true, type: "datetime-local", label: "Schedule Message", value: selectedMessage?.scheduledFor || newMessage.scheduledFor, onChange: (e) => {
                                            if (selectedMessage) {
                                                // Handle view mode
                                            }
                                            else {
                                                setNewMessage({ ...newMessage, scheduledFor: e.target.value });
                                            }
                                        }, disabled: !!selectedMessage, InputLabelProps: {
                                            shrink: true,
                                        } }) })] }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: () => {
                                    setOpenDialog(false);
                                    setSelectedMessage(null);
                                }, children: selectedMessage ? 'Close' : 'Cancel' }), !selectedMessage && (_jsx(Button, { variant: "contained", startIcon: _jsx(SendIcon, {}), onClick: handleSendMessage, children: "Send Message" }))] })] })] }));
}
