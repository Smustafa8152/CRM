import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  WhatsApp as WhatsAppIcon,
  Receipt as ReceiptIcon,
  Warning as WarningIcon,
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

interface CustomersProps {
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
}

const mockCustomers: Customer[] = [
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

export default function Customers({ customers, setCustomers }: CustomersProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({
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
      const customer: Customer = {
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

  const getCreditRatingColor = (rating: string) => {
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

  const getPaymentStatus = (outstanding: number, limit: number) => {
    const percentage = (outstanding / limit) * 100;
    if (percentage >= 80) {
      return <Chip label="High Risk" color="error" size="small" />;
    } else if (percentage >= 50) {
      return <Chip label="Medium Risk" color="warning" size="small" />;
    }
    return <Chip label="Low Risk" color="success" size="small" />;
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Customers</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Add Customer
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Business Reg.</TableCell>
              <TableCell>Credit Rating</TableCell>
              <TableCell align="right">Credit Limit</TableCell>
              <TableCell align="right">Outstanding</TableCell>
              <TableCell align="center">Risk Level</TableCell>
              <TableCell align="center">Last Payment</TableCell>
              <TableCell align="center">Warranty Claims</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.contact}</TableCell>
                <TableCell>{customer.businessRegistration}</TableCell>
                <TableCell>
                  <Chip
                    label={customer.creditRating}
                    color={getCreditRatingColor(customer.creditRating)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  ₹{customer.creditLimit.toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  ₹{customer.outstandingAmount.toLocaleString()}
                </TableCell>
                <TableCell align="center">
                  {getPaymentStatus(customer.outstandingAmount, customer.creditLimit)}
                </TableCell>
                <TableCell align="center">{customer.lastPaymentDate}</TableCell>
                <TableCell align="center">{customer.warrantyClaims}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Send WhatsApp">
                    <IconButton
                      color="primary"
                      onClick={() => {
                        // TODO: Implement WhatsApp communication
                      }}
                    >
                      <WhatsAppIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="View Invoices">
                    <IconButton
                      color="info"
                      onClick={() => {
                        // TODO: Implement invoice view
                      }}
                    >
                      <ReceiptIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton
                      color="primary"
                      onClick={() => {
                        // TODO: Implement edit functionality
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      onClick={() => {
                        // TODO: Implement delete functionality
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
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
        <DialogTitle>Add New Customer</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              <Box>
                <TextField
                  fullWidth
                  label="Customer Name"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label="Contact Number"
                  value={newCustomer.contact}
                  onChange={(e) => setNewCustomer({ ...newCustomer, contact: e.target.value })}
                />
              </Box>
              <Box sx={{ gridColumn: { xs: '1', md: '1 / span 2' } }}>
                <TextField
                  fullWidth
                  label="Address"
                  multiline
                  rows={2}
                  value={newCustomer.address}
                  onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label="Business Registration (GST)"
                  value={newCustomer.businessRegistration}
                  onChange={(e) => setNewCustomer({ ...newCustomer, businessRegistration: e.target.value })}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  type="number"
                  label="Credit Limit"
                  value={newCustomer.creditLimit}
                  onChange={(e) => setNewCustomer({ ...newCustomer, creditLimit: Number(e.target.value) })}
                />
              </Box>
              <Box>
                <FormControl fullWidth>
                  <InputLabel>Credit Rating</InputLabel>
                  <Select
                    value={newCustomer.creditRating}
                    label="Credit Rating"
                    onChange={(e) => setNewCustomer({ ...newCustomer, creditRating: e.target.value as Customer['creditRating'] })}
                  >
                    <MenuItem value="A">A - Excellent</MenuItem>
                    <MenuItem value="B">B - Good</MenuItem>
                    <MenuItem value="C">C - Fair</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <FormControl fullWidth>
                  <InputLabel>Preferred Communication</InputLabel>
                  <Select
                    value={newCustomer.preferredCommunication}
                    label="Preferred Communication"
                    onChange={(e) => setNewCustomer({ ...newCustomer, preferredCommunication: e.target.value as Customer['preferredCommunication'] })}
                  >
                    <MenuItem value="WhatsApp">WhatsApp</MenuItem>
                    <MenuItem value="Email">Email</MenuItem>
                    <MenuItem value="SMS">SMS</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAddCustomer}
            disabled={!newCustomer.name || !newCustomer.contact}
          >
            Add Customer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 