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
  TextField,
  InputAdornment,
  Chip,
  Tooltip,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  WhatsApp as WhatsAppIcon,
  History as HistoryIcon,
  Group as GroupIcon,
  LocalOffer as OfferIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

interface PriceItem {
  id: string;
  name: string;
  basePrice: number;
  bulkPrice: number;
  customerPrice: number;
  minQuantity: number;
  lastUpdated: string;
}

interface PriceRule {
  id: string;
  itemName: string;
  basePrice: number;
  customerType: 'Regular' | 'Wholesale' | 'VIP';
  discount: number;
  minQuantity: number;
  validFrom: string;
  validTo: string;
  notes: string;
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

interface PricingProps {
  inventory: InventoryItem[];
}

const mockPriceItems: PriceItem[] = [
  {
    id: '1',
    name: 'iPhone 12 LCD',
    basePrice: 5000,
    bulkPrice: 4500,
    customerPrice: 4800,
    minQuantity: 5,
    lastUpdated: '2024-03-15',
  },
  // ... existing mock data ...
];

const mockPriceRules: PriceRule[] = [
  {
    id: 'PRICE-001',
    itemName: 'iPhone 12 LCD',
    basePrice: 5000,
    customerType: 'Regular',
    discount: 0,
    minQuantity: 1,
    validFrom: '2024-01-01',
    validTo: '2024-12-31',
    notes: 'Standard retail price',
  },
  // ... existing mock data ...
];

export default function Pricing({ inventory = [] }: PricingProps) {
  const [priceItems] = useState<PriceItem[]>(mockPriceItems);
  const [priceRules, setPriceRules] = useState<PriceRule[]>(mockPriceRules);
  const [selectedPrice, setSelectedPrice] = useState<PriceItem | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [viewMode, setViewMode] = useState<'standard' | 'bulk' | 'customer'>('standard');
  const [openDialog, setOpenDialog] = useState(false);
  const [newPrice, setNewPrice] = useState<Partial<PriceRule>>({
    itemName: '',
    basePrice: 0,
    customerType: 'Regular',
    discount: 0,
    minQuantity: 1,
    validFrom: new Date().toISOString().split('T')[0],
    validTo: '',
    notes: '',
  });

  const handleEdit = (price: PriceItem) => {
    // TODO: Implement edit functionality
    console.log('Editing price:', price);
  };

  const handleSave = (price: PriceItem) => {
    // TODO: Implement save functionality
    console.log('Saving price:', price);
  };

  const handleCancel = () => {
    // TODO: Implement cancel functionality
    console.log('Canceling edit');
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, price: PriceItem) => {
    setAnchorEl(event.currentTarget);
    setSelectedPrice(price);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPrice(null);
  };

  const handleNotifyPriceChange = (price: PriceItem) => {
    // TODO: Implement WhatsApp notification for price changes
    console.log('Notifying price change for:', price.name);
  };

  const getPriceChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    const color = change > 0 ? 'error.main' : change < 0 ? 'success.main' : 'text.primary';
    return (
      <Typography color={color}>
        {change > 0 ? '+' : ''}{change.toFixed(1)}%
      </Typography>
    );
  };

  const handleAddPrice = () => {
    if (newPrice.itemName && newPrice.basePrice) {
      const price: PriceRule = {
        id: `PRICE-${priceRules.length + 1}`,
        itemName: newPrice.itemName,
        basePrice: Number(newPrice.basePrice),
        customerType: newPrice.customerType || 'Regular',
        discount: Number(newPrice.discount),
        minQuantity: Number(newPrice.minQuantity),
        validFrom: newPrice.validFrom || new Date().toISOString(),
        validTo: newPrice.validTo || '',
        notes: newPrice.notes || '',
      };
      setPriceRules([...priceRules, price]);
      setOpenDialog(false);
      setNewPrice({
        itemName: '',
        basePrice: 0,
        customerType: 'Regular',
        discount: 0,
        minQuantity: 1,
        validFrom: new Date().toISOString().split('T')[0],
        validTo: '',
        notes: '',
      });
    }
  };

  const calculateFinalPrice = (basePrice: number, discount: number) => {
    return basePrice * (1 - discount / 100);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Price Management</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small">
            <InputLabel>View Mode</InputLabel>
            <Select
              value={viewMode}
              label="View Mode"
              onChange={(e) => setViewMode(e.target.value as any)}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="standard">Standard</MenuItem>
              <MenuItem value="bulk">Bulk Discounts</MenuItem>
              <MenuItem value="customer">Customer Specific</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            startIcon={<OfferIcon />}
            onClick={() => {
              // TODO: Implement bulk price update
            }}
          >
            Bulk Update
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Add Price
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Customer Type</TableCell>
              <TableCell align="right">Base Price</TableCell>
              <TableCell align="right">Discount</TableCell>
              <TableCell align="right">Final Price</TableCell>
              <TableCell align="center">Min Quantity</TableCell>
              <TableCell>Valid From</TableCell>
              <TableCell>Valid To</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {priceRules.map((rule) => (
              <TableRow key={rule.id}>
                <TableCell>{rule.itemName}</TableCell>
                <TableCell>
                  <Chip
                    label={rule.customerType}
                    color={
                      rule.customerType === 'VIP'
                        ? 'error'
                        : rule.customerType === 'Wholesale'
                        ? 'warning'
                        : 'default'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">₹{rule.basePrice.toLocaleString()}</TableCell>
                <TableCell align="right">{rule.discount}%</TableCell>
                <TableCell align="right">₹{calculateFinalPrice(rule.basePrice, rule.discount).toLocaleString()}</TableCell>
                <TableCell align="center">{rule.minQuantity}</TableCell>
                <TableCell>{rule.validFrom}</TableCell>
                <TableCell>{rule.validTo}</TableCell>
                <TableCell>{rule.notes}</TableCell>
                <TableCell align="center">
                  <IconButton size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                  <Tooltip title="Notify via WhatsApp">
                    <IconButton size="small" onClick={() => handleNotifyPriceChange(rule as unknown as PriceItem)}>
                      <WhatsAppIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Price Rule</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gap: 2, mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Item Name</InputLabel>
              <Select
                value={newPrice.itemName}
                label="Item Name"
                onChange={(e) => {
                  const selectedItem = inventory.find(item => item.name === e.target.value);
                  setNewPrice({
                    ...newPrice,
                    itemName: e.target.value,
                    basePrice: selectedItem?.price || 0,
                  });
                }}
              >
                {inventory.map((item) => (
                  <MenuItem key={item.id} value={item.name}>
                    {item.name} (Current Price: ₹{item.price.toLocaleString()})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Base Price"
              type="number"
              value={newPrice.basePrice}
              onChange={(e) => setNewPrice({ ...newPrice, basePrice: Number(e.target.value) })}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
            />
            <FormControl fullWidth>
              <InputLabel>Customer Type</InputLabel>
              <Select
                value={newPrice.customerType}
                label="Customer Type"
                onChange={(e) => setNewPrice({ ...newPrice, customerType: e.target.value as 'Regular' | 'Wholesale' | 'VIP' })}
              >
                <MenuItem value="Regular">Regular</MenuItem>
                <MenuItem value="Wholesale">Wholesale</MenuItem>
                <MenuItem value="VIP">VIP</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Discount (%)"
              type="number"
              value={newPrice.discount}
              onChange={(e) => setNewPrice({ ...newPrice, discount: Number(e.target.value) })}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                inputProps: { min: 0, max: 100 }
              }}
            />
            <TextField
              fullWidth
              label="Minimum Quantity"
              type="number"
              value={newPrice.minQuantity}
              onChange={(e) => setNewPrice({ ...newPrice, minQuantity: Number(e.target.value) })}
              InputProps={{
                inputProps: { min: 1 }
              }}
            />
            <TextField
              fullWidth
              label="Valid From"
              type="date"
              value={newPrice.validFrom}
              onChange={(e) => setNewPrice({ ...newPrice, validFrom: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Valid To"
              type="date"
              value={newPrice.validTo}
              onChange={(e) => setNewPrice({ ...newPrice, validTo: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Notes"
              multiline
              rows={2}
              value={newPrice.notes}
              onChange={(e) => setNewPrice({ ...newPrice, notes: e.target.value })}
            />
            <Typography variant="h6" sx={{ textAlign: 'right', mt: 2 }}>
              Final Price: ₹{calculateFinalPrice(newPrice.basePrice || 0, newPrice.discount || 0).toLocaleString()}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddPrice} variant="contained">Add Price Rule</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 