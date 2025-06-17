import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
import Pricing from './pages/Pricing';
import CreditPayments from './pages/CreditPayments';
import Invoices from './pages/Invoices';
import Support from './pages/Support';
import WhatsApp from './pages/WhatsApp';
import Reports from './pages/Reports';

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
    id: 'CUST-002',
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

const mockInventory: InventoryItem[] = [
  {
    id: 'INV-001',
    name: 'iPhone 12 LCD',
    model: 'IP12-LCD',
    quantity: 50,
    price: 5000,
    supplier: 'Tech Parts Inc',
    lastRestockDate: '2024-03-01',
    warranty: '6 months',
    technicalSpecs: '6.1 inch, 2532 x 1170 pixels',
    compatibility: ['iPhone 12', 'iPhone 12 Pro'],
    stockStatus: 'In Stock',
  },
  {
    id: 'INV-002',
    name: 'Samsung S21 LCD',
    model: 'S21-LCD',
    quantity: 30,
    price: 6500,
    supplier: 'Mobile Parts Co',
    lastRestockDate: '2024-02-15',
    warranty: '1 year',
    technicalSpecs: '6.2 inch, 2400 x 1080 pixels',
    compatibility: ['Samsung S21', 'Samsung S21 Plus'],
    stockStatus: 'Low Stock',
  },
];

function App() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
            width: { sm: `calc(100% - 220px)` },
          }}
        >
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<Customers customers={customers} setCustomers={setCustomers} />} />
            <Route path="/inventory" element={<Inventory inventory={inventory} setInventory={setInventory} />} />
            <Route path="/sales" element={<Sales customers={customers} inventory={inventory} />} />
            <Route path="/pricing" element={<Pricing inventory={inventory} />} />
            <Route path="/credit-payments" element={<CreditPayments customers={customers} />} />
            <Route path="/invoices" element={<Invoices customers={customers} inventory={inventory} />} />
            <Route path="/support" element={<Support />} />
            <Route path="/whatsapp" element={<WhatsApp />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
