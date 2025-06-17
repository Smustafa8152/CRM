import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Button, TextField, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions, } from '@mui/material';
import { Search as SearchIcon, Add as AddIcon, Visibility as ViewIcon, WhatsApp as WhatsAppIcon, } from '@mui/icons-material';
const mockTickets = [
    {
        id: 'TKT-001',
        date: '2024-03-15',
        customerName: 'Mobile Zone',
        issueType: 'warranty',
        status: 'in-progress',
        priority: 'high',
        description: 'iPhone 12 LCD display showing flickering issues after 2 months of installation',
        assignedTo: 'John Doe',
        history: [
            {
                date: '2024-03-15',
                action: 'Ticket Created',
                notes: 'Customer reported display flickering issues',
            },
            {
                date: '2024-03-16',
                action: 'Assigned',
                notes: 'Assigned to technical team for inspection',
            },
        ],
    },
    {
        id: 'TKT-002',
        date: '2024-03-14',
        customerName: 'Phone Paradise',
        issueType: 'technical',
        status: 'resolved',
        priority: 'medium',
        description: 'Touch sensitivity issues with Samsung S21 display',
        assignedTo: 'Jane Smith',
        resolution: 'Replaced touch controller and recalibrated',
        history: [
            {
                date: '2024-03-14',
                action: 'Ticket Created',
                notes: 'Customer reported touch sensitivity issues',
            },
            {
                date: '2024-03-15',
                action: 'Resolved',
                notes: 'Fixed by replacing touch controller',
            },
        ],
    },
];
export default function Support() {
    const [tickets] = useState(mockTickets);
    const [searchQuery, setSearchQuery] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const getStatusChip = (status) => {
        const statusConfig = {
            open: { color: 'info', label: 'Open' },
            'in-progress': { color: 'warning', label: 'In Progress' },
            resolved: { color: 'success', label: 'Resolved' },
            closed: { color: 'default', label: 'Closed' },
        };
        const config = statusConfig[status];
        return _jsx(Chip, { label: config.label, color: config.color, size: "small" });
    };
    const getPriorityChip = (priority) => {
        const priorityConfig = {
            low: { color: 'success', label: 'Low' },
            medium: { color: 'warning', label: 'Medium' },
            high: { color: 'error', label: 'High' },
        };
        const config = priorityConfig[priority];
        return _jsx(Chip, { label: config.label, color: config.color, size: "small" });
    };
    const handleViewTicket = (ticket) => {
        setSelectedTicket(ticket);
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedTicket(null);
    };
    return (_jsxs(Box, { children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', mb: 3 }, children: [_jsx(Typography, { variant: "h4", children: "Support Tickets" }), _jsxs(Box, { sx: { display: 'flex', gap: 2 }, children: [_jsx(TextField, { size: "small", placeholder: "Search tickets...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), InputProps: {
                                    startAdornment: (_jsx(InputAdornment, { position: "start", children: _jsx(SearchIcon, {}) })),
                                } }), _jsx(Button, { variant: "contained", startIcon: _jsx(AddIcon, {}), onClick: () => {
                                    // TODO: Implement new ticket creation
                                }, children: "New Ticket" })] })] }), _jsx(TableContainer, { component: Paper, children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Ticket ID" }), _jsx(TableCell, { children: "Date" }), _jsx(TableCell, { children: "Customer" }), _jsx(TableCell, { children: "Issue Type" }), _jsx(TableCell, { align: "center", children: "Priority" }), _jsx(TableCell, { align: "center", children: "Status" }), _jsx(TableCell, { children: "Assigned To" }), _jsx(TableCell, { align: "center", children: "Actions" })] }) }), _jsx(TableBody, { children: tickets.map((ticket) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: ticket.id }), _jsx(TableCell, { children: new Date(ticket.date).toLocaleDateString() }), _jsx(TableCell, { children: ticket.customerName }), _jsx(TableCell, { children: _jsx(Chip, { label: ticket.issueType.charAt(0).toUpperCase() + ticket.issueType.slice(1), size: "small" }) }), _jsx(TableCell, { align: "center", children: getPriorityChip(ticket.priority) }), _jsx(TableCell, { align: "center", children: getStatusChip(ticket.status) }), _jsx(TableCell, { children: ticket.assignedTo || '-' }), _jsx(TableCell, { align: "center", children: _jsx(IconButton, { onClick: () => handleViewTicket(ticket), size: "small", children: _jsx(ViewIcon, {}) }) })] }, ticket.id))) })] }) }), _jsx(Dialog, { open: openDialog, onClose: handleCloseDialog, maxWidth: "md", fullWidth: true, children: selectedTicket && (_jsxs(_Fragment, { children: [_jsxs(DialogTitle, { children: ["Ticket Details - ", selectedTicket.id] }), _jsx(DialogContent, { children: _jsxs(Box, { sx: { mt: 1 }, children: [_jsxs(Box, { sx: { mb: 3 }, children: [_jsx(Typography, { variant: "subtitle1", gutterBottom: true, children: "Description" }), _jsx(Typography, { variant: "body1", children: selectedTicket.description })] }), _jsxs(Box, { sx: { mb: 3 }, children: [_jsx(Typography, { variant: "subtitle1", gutterBottom: true, children: "Ticket History" }), selectedTicket.history?.map((entry, index) => (_jsxs(Box, { sx: { mb: 2 }, children: [_jsxs(Typography, { variant: "body2", color: "text.secondary", children: [new Date(entry.date).toLocaleDateString(), " - ", entry.action] }), _jsx(Typography, { variant: "body1", children: entry.notes })] }, index)))] }), selectedTicket.resolution && (_jsxs(Box, { sx: { mb: 3 }, children: [_jsx(Typography, { variant: "subtitle1", gutterBottom: true, children: "Resolution" }), _jsx(Typography, { variant: "body1", children: selectedTicket.resolution })] }))] }) }), _jsxs(DialogActions, { children: [_jsx(Button, { startIcon: _jsx(WhatsAppIcon, {}), onClick: () => {
                                        // TODO: Implement WhatsApp notification
                                    }, children: "Notify Customer" }), _jsx(Button, { onClick: handleCloseDialog, children: "Close" })] })] })) })] }));
}
