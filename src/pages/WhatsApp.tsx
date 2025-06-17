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
  WhatsApp as WhatsAppIcon,
  Send as SendIcon,
  Search as SearchIcon,
  History as HistoryIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';

interface Message {
  id: string;
  date: string;
  customerName: string;
  type: 'invoice' | 'payment' | 'warranty' | 'support' | 'custom';
  status: 'sent' | 'delivered' | 'read' | 'failed';
  content: string;
  scheduledFor?: string;
}

const mockMessages: Message[] = [
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
  const [messages] = useState<Message[]>(mockMessages);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [newMessage, setNewMessage] = useState({
    customerName: '',
    type: 'custom',
    content: '',
    scheduledFor: '',
  });

  const getStatusChip = (status: Message['status']) => {
    const statusConfig = {
      sent: { color: 'info' as const, label: 'Sent' },
      delivered: { color: 'primary' as const, label: 'Delivered' },
      read: { color: 'success' as const, label: 'Read' },
      failed: { color: 'error' as const, label: 'Failed' },
    };

    const config = statusConfig[status];
    return <Chip label={config.label} color={config.color} size="small" />;
  };

  const getTypeChip = (type: Message['type']) => {
    const typeConfig = {
      invoice: { color: 'primary' as const, label: 'Invoice' },
      payment: { color: 'warning' as const, label: 'Payment' },
      warranty: { color: 'success' as const, label: 'Warranty' },
      support: { color: 'info' as const, label: 'Support' },
      custom: { color: 'default' as const, label: 'Custom' },
    };

    const config = typeConfig[type];
    return <Chip label={config.label} color={config.color} size="small" />;
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

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">WhatsApp Messages</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search messages..."
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
            startIcon={<WhatsAppIcon />}
            onClick={() => setOpenDialog(true)}
          >
            New Message
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Content</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Scheduled</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message.id}>
                <TableCell>{new Date(message.date).toLocaleDateString()}</TableCell>
                <TableCell>{message.customerName}</TableCell>
                <TableCell>{getTypeChip(message.type)}</TableCell>
                <TableCell sx={{ maxWidth: 300 }}>
                  <Typography noWrap>
                    {message.content}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  {getStatusChip(message.status)}
                </TableCell>
                <TableCell align="center">
                  {message.scheduledFor ? (
                    <Chip
                      icon={<ScheduleIcon />}
                      label={new Date(message.scheduledFor).toLocaleString()}
                      size="small"
                    />
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={() => {
                      setSelectedMessage(message);
                      setOpenDialog(true);
                    }}
                  >
                    <HistoryIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setSelectedMessage(null);
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedMessage ? 'Message Details' : 'New Message'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Customer</InputLabel>
                <Select
                  value={selectedMessage?.customerName || newMessage.customerName}
                  label="Customer"
                  onChange={(e) => {
                    if (selectedMessage) {
                      // Handle view mode
                    } else {
                      setNewMessage({ ...newMessage, customerName: e.target.value });
                    }
                  }}
                  disabled={!!selectedMessage}
                >
                  <MenuItem value="Mobile Zone">Mobile Zone</MenuItem>
                  <MenuItem value="Phone Paradise">Phone Paradise</MenuItem>
                  <MenuItem value="Tech Solutions">Tech Solutions</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Message Type</InputLabel>
                <Select
                  value={selectedMessage?.type || newMessage.type}
                  label="Message Type"
                  onChange={(e) => {
                    if (selectedMessage) {
                      // Handle view mode
                    } else {
                      setNewMessage({ ...newMessage, type: e.target.value as Message['type'] });
                    }
                  }}
                  disabled={!!selectedMessage}
                >
                  <MenuItem value="invoice">Invoice</MenuItem>
                  <MenuItem value="payment">Payment</MenuItem>
                  <MenuItem value="warranty">Warranty</MenuItem>
                  <MenuItem value="support">Support</MenuItem>
                  <MenuItem value="custom">Custom</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Message Content"
                value={selectedMessage?.content || newMessage.content}
                onChange={(e) => {
                  if (selectedMessage) {
                    // Handle view mode
                  } else {
                    setNewMessage({ ...newMessage, content: e.target.value });
                  }
                }}
                disabled={!!selectedMessage}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                type="datetime-local"
                label="Schedule Message"
                value={selectedMessage?.scheduledFor || newMessage.scheduledFor}
                onChange={(e) => {
                  if (selectedMessage) {
                    // Handle view mode
                  } else {
                    setNewMessage({ ...newMessage, scheduledFor: e.target.value });
                  }
                }}
                disabled={!!selectedMessage}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false);
              setSelectedMessage(null);
            }}
          >
            {selectedMessage ? 'Close' : 'Cancel'}
          </Button>
          {!selectedMessage && (
            <Button
              variant="contained"
              startIcon={<SendIcon />}
              onClick={handleSendMessage}
            >
              Send Message
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
} 