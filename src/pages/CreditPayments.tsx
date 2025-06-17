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
  Tooltip,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import {
  WhatsApp as WhatsAppIcon,
  Payment as PaymentIcon,
  History as HistoryIcon,
  Warning as WarningIcon,
  Receipt as ReceiptIcon,
  Add as AddIcon,
} from '@mui/icons-material';

interface Customer {
  id: string;
  name: string;
  contact: string;
  address: string;
  creditLimit: number;
  outstandingAmount: number;
  creditRating: 'A' | 'B' | 'C';
  lastPaymentDate: string;
  preferredCommunication: 'WhatsApp' | 'Email' | 'SMS';
  businessRegistration: string;
  warrantyClaims: number;
}

interface CreditPayment {
  id: string;
  customerName: string;
  amount: number;
  date: string;
  status: 'active' | 'overdue' | 'suspended';
  paymentMethod: string;
  dueDate: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  notes: string;
  paymentHistory: {
    date: string;
    amount: number;
    method: string;
  }[];
}

const mockPayments: CreditPayment[] = [
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

interface CreditPaymentsProps {
  customers: Customer[];
}

export default function CreditPayments({ customers }: CreditPaymentsProps) {
  const [payments, setPayments] = useState<CreditPayment[]>(mockPayments);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPayment, setSelectedPayment] = useState<CreditPayment | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newPayment, setNewPayment] = useState<Partial<CreditPayment>>({
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

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, payment: CreditPayment) => {
    setAnchorEl(event.currentTarget);
    setSelectedPayment(payment);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPayment(null);
  };

  const getStatusChip = (status: CreditPayment['status']) => {
    const statusConfig = {
      active: { color: 'success' as const, label: 'Active' },
      overdue: { color: 'error' as const, label: 'Overdue' },
      suspended: { color: 'warning' as const, label: 'Suspended' },
    };

    const config = statusConfig[status];
    return <Chip label={config.label} color={config.color} size="small" />;
  };

  const getRiskLevel = (outstanding: number, limit: number) => {
    const percentage = (outstanding / limit) * 100;
    if (percentage >= 80) {
      return <Chip icon={<WarningIcon />} label="High Risk" color="error" size="small" />;
    } else if (percentage >= 50) {
      return <Chip label="Medium Risk" color="warning" size="small" />;
    }
    return <Chip label="Low Risk" color="success" size="small" />;
  };

  const handleAddPayment = () => {
    if (newPayment.customerName && newPayment.amount) {
      const payment: CreditPayment = {
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

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Credit & Payments</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Record Payment
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Risk Level</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.customerName}</TableCell>
                <TableCell align="right">
                  ₹{payment.amount.toLocaleString()}
                </TableCell>
                <TableCell align="center">
                  {getStatusChip(payment.status)}
                </TableCell>
                <TableCell align="center">
                  {getRiskLevel(payment.amount, 50000)}
                </TableCell>
                <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                <TableCell>{payment.paymentMethod}</TableCell>
                <TableCell>{new Date(payment.dueDate).toLocaleDateString()}</TableCell>
                <TableCell align="center">
                  <Tooltip title="More Actions">
                    <IconButton
                      onClick={(e) => handleMenuOpen(e, payment)}
                    >
                      <HistoryIcon />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleMenuClose}>
                      <PaymentIcon sx={{ mr: 1 }} /> Record Payment
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                      <ReceiptIcon sx={{ mr: 1 }} /> View Payment History
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                      <WhatsAppIcon sx={{ mr: 1 }} /> Send Reminder
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Record New Payment</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              <Box>
                <FormControl fullWidth>
                  <InputLabel>Customer</InputLabel>
                  <Select
                    value={newPayment.customerName}
                    label="Customer"
                    onChange={(e) => setNewPayment({ ...newPayment, customerName: e.target.value })}
                  >
                    {customers.map((customer) => (
                      <MenuItem key={customer.id} value={customer.name}>
                        {customer.name} ({customer.contact})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <TextField
                  fullWidth
                  type="number"
                  label="Amount"
                  value={newPayment.amount}
                  onChange={(e) => setNewPayment({ ...newPayment, amount: Number(e.target.value) })}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  type="date"
                  label="Payment Date"
                  value={newPayment.date}
                  onChange={(e) => setNewPayment({ ...newPayment, date: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  type="date"
                  label="Due Date"
                  value={newPayment.dueDate}
                  onChange={(e) => setNewPayment({ ...newPayment, dueDate: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              <Box>
                <FormControl fullWidth>
                  <InputLabel>Payment Method</InputLabel>
                  <Select
                    value={newPayment.paymentMethod}
                    label="Payment Method"
                    onChange={(e) => setNewPayment({ ...newPayment, paymentMethod: e.target.value })}
                  >
                    <MenuItem value="Cash">Cash</MenuItem>
                    <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                    <MenuItem value="UPI">UPI</MenuItem>
                    <MenuItem value="Cheque">Cheque</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <FormControl fullWidth>
                  <InputLabel>Risk Level</InputLabel>
                  <Select
                    value={newPayment.riskLevel}
                    label="Risk Level"
                    onChange={(e) => setNewPayment({ ...newPayment, riskLevel: e.target.value as CreditPayment['riskLevel'] })}
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ gridColumn: { xs: '1', md: '1 / span 2' } }}>
                <TextField
                  fullWidth
                  label="Notes"
                  multiline
                  rows={2}
                  value={newPayment.notes}
                  onChange={(e) => setNewPayment({ ...newPayment, notes: e.target.value })}
                />
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAddPayment}
            disabled={!newPayment.customerName || !newPayment.amount || !newPayment.dueDate}
          >
            Record Payment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 