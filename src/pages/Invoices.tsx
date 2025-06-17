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
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  FormControl,
  InputLabel,
  FormControlLabel,
  Switch,
} from '@mui/material';
import {
  WhatsApp as WhatsAppIcon,
  Receipt as ReceiptIcon,
  History as HistoryIcon,
  Print as PrintIcon,
  Download as DownloadIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

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

interface InventoryItem {
  id: string;
  name: string;
  model: string;
  quantity: number;
  price: number;
  supplier: string;
  lastRestockDate: string;
  warranty: string;
  technicalSpecs: string;
  compatibility: string[];
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
  warranty: string;
}

interface Invoice {
  id: string;
  date: string;
  customerName: string;
  customerId: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'partial';
  paymentMethod: 'credit' | 'cash' | 'card' | 'upi';
  items: InvoiceItem[];
  paymentHistory?: {
    date: string;
    amount: number;
    method: string;
  }[];
  notes?: string;
  outstandingAmount?: number;
  creditSale?: boolean;
  saleId?: string;
  creditPaymentId?: string;
  dueDate?: string;
  riskLevel?: 'Low' | 'Medium' | 'High';
}

interface InvoicesProps {
  customers: Customer[];
  inventory: InventoryItem[];
}

const mockInvoices: Invoice[] = [
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

const handleDownloadPDF = (invoice: Invoice) => {
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
  const finalY = (doc as any).lastAutoTable.finalY || 70;
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
    const notesY = (doc as any).lastAutoTable.finalY || finalY + 25;
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

export default function Invoices({ customers = [], inventory = [] }: InvoicesProps) {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [openNewInvoiceDialog, setOpenNewInvoiceDialog] = useState(false);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [newInvoice, setNewInvoice] = useState<Partial<Invoice>>({
    date: new Date().toISOString().split('T')[0],
    items: [],
    paymentMethod: 'cash',
    status: 'pending',
    creditSale: false,
    amount: 0,
  });
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>('Cash');

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, invoice: Invoice) => {
    setAnchorEl(event.currentTarget);
    setSelectedInvoice(invoice);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedInvoice(null);
  };

  const getStatusChip = (status: Invoice['status']) => {
    const statusConfig = {
      paid: { color: 'success' as const, label: 'Paid' },
      pending: { color: 'warning' as const, label: 'Pending' },
      overdue: { color: 'error' as const, label: 'Overdue' },
      partial: { color: 'info' as const, label: 'Partial' },
    };

    const config = statusConfig[status];
    return <Chip label={config.label} color={config.color} size="small" />;
  };

  const handleWhatsAppShare = (invoice: Invoice) => {
    // TODO: Implement WhatsApp sharing
    console.log('Sharing invoice via WhatsApp:', invoice.id);
  };

  const handleAddItem = () => {
    setNewInvoice({
      ...newInvoice,
      items: [...(newInvoice.items || []), { name: '', quantity: 1, price: 0, warranty: '6 months' }],
    });
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = [...(newInvoice.items || [])];
    updatedItems.splice(index, 1);
    setNewInvoice({ ...newInvoice, items: updatedItems });
  };

  const handleItemChange = (index: number, field: string, value: any) => {
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

      const invoice: Invoice = {
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
            status: newStatus as Invoice['status'],
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

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Invoices</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search invoices..."
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
            variant="outlined"
            startIcon={<FilterIcon />}
            onClick={() => {
              // TODO: Implement filtering
            }}
          >
            Filter
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenNewInvoiceDialog(true)}
          >
            Create Invoice
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Outstanding</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Items</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                <TableCell>{invoice.customerName}</TableCell>
                <TableCell>
                  <Chip
                    label={invoice.paymentMethod.toUpperCase()}
                    color={invoice.paymentMethod === 'credit' ? 'warning' : 'success'}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  ₹{invoice.amount.toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  ₹{(invoice.outstandingAmount || 0).toLocaleString()}
                </TableCell>
                <TableCell align="center">
                  {getStatusChip(invoice.status)}
                </TableCell>
                <TableCell align="center">
                  {invoice.items.length} items
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="More Actions">
                    <IconButton
                      onClick={(e) => handleMenuOpen(e, invoice)}
                    >
                      <HistoryIcon />
                    </IconButton>
                  </Tooltip>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setSelectedInvoice(invoice);
                      setOpenPaymentDialog(true);
                    }}
                    disabled={invoice.status === 'paid'}
                  >
                    <PaymentIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleMenuClose}>
                      <ReceiptIcon sx={{ mr: 1 }} /> View Details
                    </MenuItem>
                    <MenuItem onClick={() => {
                      handleMenuClose();
                      handleDownloadPDF(selectedInvoice!);
                    }}>
                      <DownloadIcon sx={{ mr: 1 }} /> Download PDF
                    </MenuItem>
                    <MenuItem onClick={() => handleWhatsAppShare(selectedInvoice!)}>
                      <WhatsAppIcon sx={{ mr: 1 }} /> Share via WhatsApp
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* New Invoice Dialog */}
      <Dialog open={openNewInvoiceDialog} onClose={() => setOpenNewInvoiceDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New Invoice</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Customer</InputLabel>
              <Select
                value={newInvoice.customerName || ''}
                label="Customer"
                onChange={(e) => {
                  const selectedCustomer = customers.find(c => c.name === e.target.value);
                  setNewInvoice({
                    ...newInvoice,
                    customerName: e.target.value,
                    customerId: selectedCustomer?.id || '',
                    creditSale: selectedCustomer?.creditRating === 'A' || selectedCustomer?.creditRating === 'B',
                    outstandingAmount: selectedCustomer?.outstandingAmount || 0,
                  });
                }}
              >
                {customers.map((customer) => (
                  <MenuItem key={customer.id} value={customer.name}>
                    {customer.name} (Credit: ₹{customer.creditLimit.toLocaleString()})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              type="date"
              label="Invoice Date"
              value={newInvoice.date}
              onChange={(e) => setNewInvoice({ ...newInvoice, date: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />

            <Box sx={{ gridColumn: '1 / -1', mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>Invoice Items</Typography>
              {(newInvoice.items || []).map((item, index) => (
                <Box key={index} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr 1fr 0.2fr' }, gap: 2, mb: 2, alignItems: 'center' }}>
                  <FormControl fullWidth>
                    <InputLabel>Item Name</InputLabel>
                    <Select
                      value={item.name}
                      label="Item Name"
                      onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                    >
                      {inventory.map((invItem) => (
                        <MenuItem key={invItem.id} value={invItem.name}>
                          {invItem.name} (Stock: {invItem.quantity})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Quantity"
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                    InputProps={{ inputProps: { min: 1 } }}
                  />
                  <TextField
                    fullWidth
                    label="Price"
                    type="number"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, 'price', Number(e.target.value))}
                    InputProps={{ readOnly: true,
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>
                    }}
                  />
                  <IconButton color="error" onClick={() => handleRemoveItem(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button startIcon={<AddIcon />} onClick={handleAddItem}>Add Another Item</Button>
            </Box>

            <FormControl fullWidth>
              <InputLabel>Payment Method</InputLabel>
              <Select
                value={newInvoice.paymentMethod}
                label="Payment Method"
                onChange={(e) => setNewInvoice({ ...newInvoice, paymentMethod: e.target.value as 'credit' | 'cash' | 'card' | 'upi' })}
              >
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="card">Card</MenuItem>
                <MenuItem value="upi">UPI</MenuItem>
                <MenuItem value="credit">Credit</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Switch
                  checked={newInvoice.creditSale || false}
                  onChange={(e) => setNewInvoice({ ...newInvoice, creditSale: e.target.checked })}
                />
              }
              label="Credit Sale"
            />
            {newInvoice.creditSale && (
              <>
                <TextField
                  fullWidth
                  label="Customer Credit Limit"
                  type="number"
                  value={customers.find(c => c.name === newInvoice.customerName)?.creditLimit || 0}
                  InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                />
                <TextField
                  fullWidth
                  label="Customer Outstanding Amount"
                  type="number"
                  value={customers.find(c => c.name === newInvoice.customerName)?.outstandingAmount || 0}
                  InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                />
              </>
            )}
            <TextField
              fullWidth
              label="Notes"
              multiline
              rows={2}
              value={newInvoice.notes}
              onChange={(e) => setNewInvoice({ ...newInvoice, notes: e.target.value })}
              sx={{ gridColumn: '1 / -1' }}
            />
            <Typography variant="h6" sx={{ gridColumn: '1 / -1', textAlign: 'right', mt: 2 }}>
              Total Amount: ₹{calculateInvoiceTotal().toLocaleString()}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewInvoiceDialog(false)}>Cancel</Button>
          <Button onClick={handleAddInvoice} variant="contained">Create Invoice</Button>
        </DialogActions>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={openPaymentDialog} onClose={() => setOpenPaymentDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Record Payment for {selectedInvoice?.id}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Outstanding Amount: ₹{(selectedInvoice?.outstandingAmount || 0).toLocaleString()}
            </Typography>
            <TextField
              fullWidth
              label="Payment Amount"
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(Number(e.target.value))}
              InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth>
              <InputLabel>Payment Method</InputLabel>
              <Select
                value={paymentMethod}
                label="Payment Method"
                onChange={(e) => setPaymentMethod(e.target.value as string)}
              >
                <MenuItem value="Cash">Cash</MenuItem>
                <MenuItem value="Card">Card</MenuItem>
                <MenuItem value="UPI">UPI</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPaymentDialog(false)}>Cancel</Button>
          <Button onClick={handleRecordPayment} variant="contained" disabled={paymentAmount <= 0 || paymentAmount > (selectedInvoice?.outstandingAmount || 0)}>
            Record Payment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 