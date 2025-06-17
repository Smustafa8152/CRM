import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
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
const mockCustomers = [
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
const mockInventory = [
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
    const [customers, setCustomers] = useState(mockCustomers);
    const [inventory, setInventory] = useState(mockInventory);
    return (_jsx(Router, { children: _jsxs(Box, { sx: { display: 'flex' }, children: [_jsx(CssBaseline, {}), _jsx(Sidebar, {}), _jsxs(Box, { component: "main", sx: {
                        flexGrow: 1,
                        p: 2,
                        width: { sm: `calc(100% - 220px)` },
                    }, children: [_jsx(Header, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/customers", element: _jsx(Customers, { customers: customers, setCustomers: setCustomers }) }), _jsx(Route, { path: "/inventory", element: _jsx(Inventory, { inventory: inventory, setInventory: setInventory }) }), _jsx(Route, { path: "/sales", element: _jsx(Sales, { customers: customers, inventory: inventory }) }), _jsx(Route, { path: "/pricing", element: _jsx(Pricing, { inventory: inventory }) }), _jsx(Route, { path: "/credit-payments", element: _jsx(CreditPayments, { customers: customers }) }), _jsx(Route, { path: "/invoices", element: _jsx(Invoices, { customers: customers, inventory: inventory }) }), _jsx(Route, { path: "/support", element: _jsx(Support, {}) }), _jsx(Route, { path: "/whatsapp", element: _jsx(WhatsApp, {}) }), _jsx(Route, { path: "/reports", element: _jsx(Reports, {}) })] })] })] }) }));
}
export default App;
