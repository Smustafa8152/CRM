import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Visibility as ViewIcon,
  WhatsApp as WhatsAppIcon,
  History as HistoryIcon,
} from '@mui/icons-material';

interface SupportTicket {
  id: string;
  date: string;
  customerName: string;
  issueType: 'warranty' | 'technical' | 'installation' | 'other';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  description: string;
  assignedTo?: string;
  resolution?: string;
  history?: {
    date: string;
    action: string;
    notes: string;
  }[];
}

const mockTickets: SupportTicket[] = [
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
  const [tickets] = useState<SupportTicket[]>(mockTickets);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  const getStatusChip = (status: SupportTicket['status']) => {
    const statusConfig = {
      open: { color: 'info' as const, label: 'Open' },
      'in-progress': { color: 'warning' as const, label: 'In Progress' },
      resolved: { color: 'success' as const, label: 'Resolved' },
      closed: { color: 'default' as const, label: 'Closed' },
    };

    const config = statusConfig[status];
    return <Chip label={config.label} color={config.color} size="small" />;
  };

  const getPriorityChip = (priority: SupportTicket['priority']) => {
    const priorityConfig = {
      low: { color: 'success' as const, label: 'Low' },
      medium: { color: 'warning' as const, label: 'Medium' },
      high: { color: 'error' as const, label: 'High' },
    };

    const config = priorityConfig[priority];
    return <Chip label={config.label} color={config.color} size="small" />;
  };

  const handleViewTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTicket(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Support Tickets</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              // TODO: Implement new ticket creation
            }}
          >
            New Ticket
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ticket ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Issue Type</TableCell>
              <TableCell align="center">Priority</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>{ticket.id}</TableCell>
                <TableCell>{new Date(ticket.date).toLocaleDateString()}</TableCell>
                <TableCell>{ticket.customerName}</TableCell>
                <TableCell>
                  <Chip
                    label={ticket.issueType.charAt(0).toUpperCase() + ticket.issueType.slice(1)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  {getPriorityChip(ticket.priority)}
                </TableCell>
                <TableCell align="center">
                  {getStatusChip(ticket.status)}
                </TableCell>
                <TableCell>{ticket.assignedTo || '-'}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => handleViewTicket(ticket)}
                    size="small"
                  >
                    <ViewIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedTicket && (
          <>
            <DialogTitle>
              Ticket Details - {selectedTicket.id}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 1 }}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Description
                  </Typography>
                  <Typography variant="body1">
                    {selectedTicket.description}
                  </Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Ticket History
                  </Typography>
                  {selectedTicket.history?.map((entry, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(entry.date).toLocaleDateString()} - {entry.action}
                      </Typography>
                      <Typography variant="body1">
                        {entry.notes}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                {selectedTicket.resolution && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Resolution
                    </Typography>
                    <Typography variant="body1">
                      {selectedTicket.resolution}
                    </Typography>
                  </Box>
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                startIcon={<WhatsAppIcon />}
                onClick={() => {
                  // TODO: Implement WhatsApp notification
                }}
              >
                Notify Customer
              </Button>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
} 