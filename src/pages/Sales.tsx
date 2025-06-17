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
  FormControlLabel,
  Switch,
} from '@mui/material';
import {
  Visibility as ViewIcon,
  WhatsApp as WhatsAppIcon,
  Add as AddIcon,
  Receipt as ReceiptIcon,
  Payment as PaymentIcon,
  History as HistoryIcon,
  Warning as WarningIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Sale {
  id: string;
  date: string;
  customerName: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    warranty: string;
  }[];
  totalAmount: number;
  paymentStatus: 'Pending' | 'Partial' | 'Completed';
  paymentMethod: string;
  creditSale: boolean;
  creditLimit: number;
  outstandingAmount: number;
  notes: string;
}

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

interface SalesProps {
  customers: Customer[];
  inventory: InventoryItem[];
}

const mockSales: Sale[] = [
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

const getStatusChip = (status: Sale['paymentStatus']) => {
  const statusConfig = {
    Pending: { color: 'warning' as const, label: 'Pending' },
    Partial: { color: 'info' as const, label: 'Partial' },
    Completed: { color: 'success' as const, label: 'Completed' },
  };

  const config = statusConfig[status];
  return <Chip label={config.label} color={config.color} size="small" />;
};

const handleDownloadPDF = (sale: Sale) => {
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
  const finalY = (doc as any).lastAutoTable.finalY || 70;
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

const Sales: React.FC<SalesProps> = ({ customers = [], inventory = [] }) => {
  const [sales, setSales] = useState<Sale[]>(mockSales);
  const [openDialog, setOpenDialog] = useState(false);
  const [newSale, setNewSale] = useState<Partial<Sale>>({
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

  const handleRemoveItem = (index: number) => {
    const updatedItems = [...(newSale.items || [])];
    updatedItems.splice(index, 1);
    setNewSale({ ...newSale, items: updatedItems });
  };

  const handleItemChange = (index: number, field: string, value: any) => {
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
      const sale: Sale = {
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

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Sales & Orders</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{ mb: 2 }}
        >
          New Sale
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Invoice ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell align="right">Items</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Outstanding</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Risk Level</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.date}</TableCell>
                <TableCell>{sale.id}</TableCell>
                <TableCell>{sale.customerName}</TableCell>
                <TableCell>{sale.paymentMethod}</TableCell>
                <TableCell align="right">
                  {(sale.items || []).map((item, index) => (
                    <Typography key={index} variant="body2">
                      {item.name} ({item.quantity})
                    </Typography>
                  ))}
                </TableCell>
                <TableCell align="right">₹{sale.totalAmount.toLocaleString()}</TableCell>
                <TableCell align="right">₹{sale.outstandingAmount.toLocaleString()}</TableCell>
                <TableCell align="center">{getStatusChip(sale.paymentStatus as Sale['paymentStatus'])}</TableCell>
                <TableCell align="center">
                  <Chip label={sale.creditSale ? 'High' : 'Low'} color={sale.creditSale ? 'error' : 'success'} size="small" />
                </TableCell>
                <TableCell align="center">
                  <IconButton size="small">
                    <ViewIcon />
                  </IconButton>
                  <IconButton size="small">
                    <WhatsAppIcon />
                  </IconButton>
                  <IconButton size="small">
                    <ReceiptIcon />
                  </IconButton>
                  <IconButton size="small">
                    <DownloadIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>New Sale</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mt: 2 }}>
            <Box>
              <FormControl fullWidth>
                <InputLabel>Customer</InputLabel>
                <Select
                  value={newSale.customerName || ''}
                  label="Customer"
                  onChange={(e) => {
                    const selectedCustomer = (customers || []).find(c => c.name === e.target.value);
                    setNewSale({
                      ...newSale,
                      customerName: e.target.value,
                      creditLimit: selectedCustomer?.creditLimit || 0,
                      outstandingAmount: selectedCustomer?.outstandingAmount || 0,
                    });
                  }}
                >
                  {(customers || []).map((customer) => (
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
                type="date"
                label="Sale Date"
                value={newSale.date}
                onChange={(e) => setNewSale({ ...newSale, date: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Box>

            {/* Sale Items Section */}
            <Box sx={{ gridColumn: '1 / -1', mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>Sale Items</Typography>
              {(newSale.items || []).map((item, index) => (
                <Box key={index} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr 1fr 0.2fr' }, gap: 2, mb: 2, alignItems: 'center' }}>
                  <FormControl fullWidth>
                    <InputLabel>Item Name</InputLabel>
                    <Select
                      value={item.name}
                      label="Item Name"
                      onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                    >
                      {(inventory || []).map((invItem) => (
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
                    InputProps={{ readOnly: true }}
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
                value={newSale.paymentMethod}
                label="Payment Method"
                onChange={(e) => setNewSale({ ...newSale, paymentMethod: e.target.value as string })}
              >
                <MenuItem value="Cash">Cash</MenuItem>
                <MenuItem value="Card">Card</MenuItem>
                <MenuItem value="UPI">UPI</MenuItem>
                <MenuItem value="Credit">Credit</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Switch
                  checked={newSale.creditSale}
                  onChange={(e) => setNewSale({ ...newSale, creditSale: e.target.checked })}
                />
              }
              label="Credit Sale"
            />
            {newSale.creditSale && (
              <>
                <TextField
                  fullWidth
                  label="Credit Limit"
                  type="number"
                  value={newSale.creditLimit}
                  onChange={(e) => setNewSale({ ...newSale, creditLimit: Number(e.target.value) })}
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  fullWidth
                  label="Outstanding Amount"
                  type="number"
                  value={newSale.outstandingAmount}
                  onChange={(e) => setNewSale({ ...newSale, outstandingAmount: Number(e.target.value) })}
                  InputProps={{ readOnly: true }}
                />
              </>
            )}
            <TextField
              fullWidth
              label="Notes"
              multiline
              rows={2}
              value={newSale.notes}
              onChange={(e) => setNewSale({ ...newSale, notes: e.target.value })}
              sx={{ gridColumn: '1 / -1' }}
            />
            <Typography variant="h6" sx={{ gridColumn: '1 / -1', textAlign: 'right', mt: 2 }}>
              Total Amount: ₹{calculateTotal().toLocaleString()}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddSale} variant="contained">Add Sale</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Sales; 