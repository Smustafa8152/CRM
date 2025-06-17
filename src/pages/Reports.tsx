import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Download as DownloadIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';

interface SalesData {
  period: string;
  revenue: number;
  units: number;
  profit: number;
  growth: number;
}

interface TopProduct {
  name: string;
  units: number;
  revenue: number;
  growth: number;
}

interface TopCustomer {
  name: string;
  purchases: number;
  revenue: number;
  creditRating: string;
}

const mockSalesData: SalesData[] = [
  {
    period: 'Jan 2024',
    revenue: 450000,
    units: 45,
    profit: 135000,
    growth: 12.5,
  },
  {
    period: 'Feb 2024',
    revenue: 520000,
    units: 52,
    profit: 156000,
    growth: 15.6,
  },
  {
    period: 'Mar 2024',
    revenue: 480000,
    units: 48,
    profit: 144000,
    growth: -7.7,
  },
];

const mockTopProducts: TopProduct[] = [
  {
    name: 'iPhone 12 LCD + Touch',
    units: 25,
    revenue: 300000,
    growth: 15.2,
  },
  {
    name: 'Samsung S21 LCD + Touch',
    units: 20,
    revenue: 300000,
    growth: 8.5,
  },
  {
    name: 'iPhone 13 LCD + Touch',
    units: 15,
    revenue: 240000,
    growth: -5.2,
  },
];

const mockTopCustomers: TopCustomer[] = [
  {
    name: 'Mobile Zone',
    purchases: 35,
    revenue: 420000,
    creditRating: 'A',
  },
  {
    name: 'Phone Paradise',
    purchases: 28,
    revenue: 336000,
    creditRating: 'B',
  },
  {
    name: 'Tech Solutions',
    purchases: 22,
    revenue: 264000,
    creditRating: 'A',
  },
];

export default function Reports() {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedPeriod, setSelectedPeriod] = useState('Mar 2024');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const getGrowthColor = (value: number) => {
    return value >= 0 ? 'success.main' : 'error.main';
  };

  const getGrowthIcon = (value: number) => {
    return value >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />;
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Reports & Analytics</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              label="Time Range"
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <MenuItem value="week">This Week</MenuItem>
              <MenuItem value="month">This Month</MenuItem>
              <MenuItem value="quarter">This Quarter</MenuItem>
              <MenuItem value="year">This Year</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => {
              // TODO: Implement report download
            }}
          >
            Export Report
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Sales Overview */}
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Card>
              <CardHeader
                title="Sales Overview"
                action={
                  <IconButton>
                    <CalendarIcon />
                  </IconButton>
                }
              />
              <CardContent>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Period</TableCell>
                        <TableCell align="right">Revenue</TableCell>
                        <TableCell align="right">Units</TableCell>
                        <TableCell align="right">Profit</TableCell>
                        <TableCell align="right">Growth</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mockSalesData.map((data) => (
                        <TableRow key={data.period}>
                          <TableCell>{data.period}</TableCell>
                          <TableCell align="right">
                            {formatCurrency(data.revenue)}
                          </TableCell>
                          <TableCell align="right">{data.units}</TableCell>
                          <TableCell align="right">
                            {formatCurrency(data.profit)}
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{ color: getGrowthColor(data.growth) }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                              {getGrowthIcon(data.growth)}
                              {formatPercentage(data.growth)}
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Box>

          {/* Top Products */}
          <Box sx={{ flex: 1 }}>
            <Card>
              <CardHeader title="Top Products" />
              <CardContent>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Units</TableCell>
                        <TableCell align="right">Revenue</TableCell>
                        <TableCell align="right">Growth</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mockTopProducts.map((product) => (
                        <TableRow key={product.name}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell align="right">{product.units}</TableCell>
                          <TableCell align="right">
                            {formatCurrency(product.revenue)}
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{ color: getGrowthColor(product.growth) }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                              {getGrowthIcon(product.growth)}
                              {formatPercentage(product.growth)}
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Top Customers */}
        <Box>
          <Card>
            <CardHeader title="Top Customers" />
            <CardContent>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Customer</TableCell>
                      <TableCell align="right">Purchases</TableCell>
                      <TableCell align="right">Revenue</TableCell>
                      <TableCell align="center">Credit Rating</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockTopCustomers.map((customer) => (
                      <TableRow key={customer.name}>
                        <TableCell>{customer.name}</TableCell>
                        <TableCell align="right">{customer.purchases}</TableCell>
                        <TableCell align="right">
                          {formatCurrency(customer.revenue)}
                        </TableCell>
                        <TableCell align="center">
                          <Typography
                            sx={{
                              color: customer.creditRating === 'A' ? 'success.main' : 'warning.main',
                              fontWeight: 'bold',
                            }}
                          >
                            {customer.creditRating}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
} 