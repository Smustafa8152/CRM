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
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Warning as WarningIcon,
  WhatsApp as WhatsAppIcon,
  History as HistoryIcon,
  LocalShipping as ShippingIcon,
  Build as BuildIcon,
} from '@mui/icons-material';

interface Product {
  id: string;
  model: string;
  type: string;
  compatibility: string[];
  price: number;
  stock: number;
  minStock: number;
  warranty: number;
  supplier: string;
  lastRestockDate: string;
  expectedArrival?: string;
  technicalSpecs: {
    resolution: string;
    size: string;
    connector: string;
  };
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

interface InventoryProps {
  inventory: InventoryItem[];
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
}

const mockProducts: Product[] = [
  {
    id: '1',
    model: 'iPhone 12',
    type: 'LCD + Touch',
    compatibility: ['iPhone 12', 'iPhone 12 Pro'],
    price: 12000,
    stock: 5,
    minStock: 10,
    warranty: 6,
    supplier: 'TechParts Inc',
    lastRestockDate: '2024-03-01',
    expectedArrival: '2024-03-25',
    technicalSpecs: {
      resolution: '2532 x 1170',
      size: '6.1 inch',
      connector: 'Type-C',
    },
  },
  {
    id: '2',
    model: 'Samsung S21',
    type: 'LCD + Touch',
    compatibility: ['Galaxy S21', 'Galaxy S21+'],
    price: 15000,
    stock: 15,
    minStock: 8,
    warranty: 6,
    supplier: 'MobileParts Co',
    lastRestockDate: '2024-03-10',
    technicalSpecs: {
      resolution: '2400 x 1080',
      size: '6.2 inch',
      connector: 'Type-C',
    },
  },
];

export default function Inventory({ inventory, setInventory }: InventoryProps) {
  const [products] = useState<Product[]>(mockProducts);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
    name: '',
    model: '',
    quantity: 0,
    price: 0,
    supplier: '',
    lastRestockDate: new Date().toISOString().split('T')[0],
    warranty: '6 months',
    technicalSpecs: '',
    compatibility: [],
    stockStatus: 'In Stock',
  });

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, product: Product) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProduct(null);
  };

  const getStockStatus = (stock: number, minStock: number) => {
    if (stock <= 0) {
      return <Chip label="Out of Stock" color="error" size="small" />;
    }
    if (stock < minStock) {
      return (
        <Chip
          icon={<WarningIcon />}
          label="Low Stock"
          color="warning"
          size="small"
        />
      );
    }
    return <Chip label="In Stock" color="success" size="small" />;
  };

  const handleAddItem = () => {
    if (newItem.name && newItem.model) {
      const item: InventoryItem = {
        id: `INV-${inventory.length + 1}`,
        name: newItem.name,
        model: newItem.model,
        quantity: Number(newItem.quantity),
        price: Number(newItem.price),
        supplier: newItem.supplier || '',
        lastRestockDate: newItem.lastRestockDate || new Date().toISOString(),
        warranty: newItem.warranty || '6 months',
        technicalSpecs: newItem.technicalSpecs || '',
        compatibility: newItem.compatibility || [],
        stockStatus: 'In Stock',
      };
      setInventory([...inventory, item]);
      setOpenDialog(false);
      setNewItem({
        name: '',
        model: '',
        quantity: 0,
        price: 0,
        supplier: '',
        lastRestockDate: new Date().toISOString().split('T')[0],
        warranty: '6 months',
        technicalSpecs: '',
        compatibility: [],
        stockStatus: 'In Stock',
      });
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Inventory</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Add Item
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Compatibility</TableCell>
              <TableCell>Technical Specs</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Warranty</TableCell>
              <TableCell align="center">Supplier</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.model}</TableCell>
                <TableCell>
                  {item.compatibility.map((comp, index) => (
                    <Chip
                      key={index}
                      label={comp}
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </TableCell>
                <TableCell>
                  <Tooltip title={item.technicalSpecs}>
                    <IconButton size="small">
                      <BuildIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell align="right">₹{item.price.toLocaleString()}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={item.stockStatus}
                    color={
                      item.stockStatus === 'In Stock'
                        ? 'success'
                        : item.stockStatus === 'Low Stock'
                        ? 'warning'
                        : 'error'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">{item.warranty}</TableCell>
                <TableCell align="center">{item.supplier}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit">
                    <IconButton size="small" onClick={(e) => handleMenuOpen(e, item as any)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small">
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
        <DialogTitle>Add New Inventory Item</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              <Box>
                <TextField
                  fullWidth
                  label="Item Name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label="Model Number"
                  value={newItem.model}
                  onChange={(e) => setNewItem({ ...newItem, model: e.target.value })}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  type="number"
                  label="Quantity"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  type="number"
                  label="Price"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label="Supplier"
                  value={newItem.supplier}
                  onChange={(e) => setNewItem({ ...newItem, supplier: e.target.value })}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  type="date"
                  label="Last Restock Date"
                  value={newItem.lastRestockDate}
                  onChange={(e) => setNewItem({ ...newItem, lastRestockDate: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              <Box>
                <FormControl fullWidth>
                  <InputLabel>Warranty Period</InputLabel>
                  <Select
                    value={newItem.warranty}
                    label="Warranty Period"
                    onChange={(e) => setNewItem({ ...newItem, warranty: e.target.value })}
                  >
                    <MenuItem value="3 months">3 months</MenuItem>
                    <MenuItem value="6 months">6 months</MenuItem>
                    <MenuItem value="1 year">1 year</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <FormControl fullWidth>
                  <InputLabel>Stock Status</InputLabel>
                  <Select
                    value={newItem.stockStatus}
                    label="Stock Status"
                    onChange={(e) => setNewItem({ ...newItem, stockStatus: e.target.value as InventoryItem['stockStatus'] })}
                  >
                    <MenuItem value="In Stock">In Stock</MenuItem>
                    <MenuItem value="Low Stock">Low Stock</MenuItem>
                    <MenuItem value="Out of Stock">Out of Stock</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ gridColumn: { xs: '1', md: '1 / span 2' } }}>
                <TextField
                  fullWidth
                  label="Technical Specifications"
                  multiline
                  rows={2}
                  value={newItem.technicalSpecs}
                  onChange={(e) => setNewItem({ ...newItem, technicalSpecs: e.target.value })}
                />
              </Box>
              <Box sx={{ gridColumn: { xs: '1', md: '1 / span 2' } }}>
                <TextField
                  fullWidth
                  label="Compatibility (comma-separated)"
                  value={newItem.compatibility?.join(', ')}
                  onChange={(e) => setNewItem({ ...newItem, compatibility: e.target.value.split(',').map(s => s.trim()) })}
                  helperText="Enter compatible models separated by commas"
                />
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAddItem}
            disabled={!newItem.name || !newItem.model || !newItem.supplier}
          >
            Add Item
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 