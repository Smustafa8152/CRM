import React, { useState } from 'react';
import { Box, Paper, Typography, useTheme, IconButton, Menu, MenuItem } from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  ShoppingCart as ShoppingCartIcon,
  LocalShipping as ShippingIcon,
  SwapHoriz as ReturnIcon,
  Inventory as InventoryIcon,
} from '@mui/icons-material';
import TopSellingProducts from '../components/dashboard/TopSellingProducts';
import OrderStatistics from '../components/dashboard/OrderStatistics';
import OverallInformation from '../components/dashboard/OverallInformation';
import RecentSales from '../components/dashboard/RecentSales';
import SalesStatistics from '../components/dashboard/SalesStatistics';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import TopCustomers from '../components/dashboard/TopCustomers';
import TopCategories from '../components/dashboard/TopCategories';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  trendValue: string;
  icon: React.ReactNode;
  iconColor: string;
}

const StatCard = ({ title, value, trend, trendValue, icon, iconColor }: StatCardProps) => {
  const theme = useTheme();
  
  return (
          <Paper
      sx={{
        p: 3,
        height: '100%',
        bgcolor: ({ palette }) => iconColor === palette.primary.main ? '#FF9F4315' :
                                iconColor === palette.info.main ? '#1B285015' :
                                iconColor === palette.success.main ? '#28C76F15' :
                                iconColor === palette.error.main ? '#00CFE815' : 'background.paper',
        borderRadius: 2,
        boxShadow: 'none',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography color="text.secondary" variant="body2" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
            {value}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="body2"
              color={trend === 'up' ? 'success.main' : 'error.main'}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <TrendingUpIcon
                sx={{
                  fontSize: '1rem',
                  mr: 0.5,
                  transform: trend === 'down' ? 'rotate(180deg)' : 'none',
                }}
              />
              {trendValue}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              vs last month
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            p: 1,
            borderRadius: 2,
            bgcolor: `${iconColor}15`,
            color: iconColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
      </Box>
    </Paper>
  );
};

export default function Dashboard() {
  const theme = useTheme();
  const [inventoryMenuAnchor, setInventoryMenuAnchor] = useState<null | HTMLElement>(null);

  const handleInventoryMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setInventoryMenuAnchor(event.currentTarget);
  };
  const handleInventoryMenuClose = () => setInventoryMenuAnchor(null);
  const handleInventoryMenuSelect = (option: string) => {
    // You can route or open the relevant CRM screen here
    alert(`Selected: ${option}`);
    setInventoryMenuAnchor(null);
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            lg: 'repeat(4, 1fr)',
          },
          mb: 3,
        }}
      >
        <StatCard
          title="Total Sales"
          value="₹45,87,078"
          trend="up"
          trendValue="+22%"
          icon={<TrendingUpIcon />}
          iconColor={theme.palette.primary.main}
        />
        <StatCard
          title="Total Sales Return"
          value="₹16,478,145"
          trend="down"
          trendValue="-22%"
          icon={<ReturnIcon />}
          iconColor={theme.palette.info.main}
        />
        <StatCard
          title="Total Purchase"
          value="₹24,145,789"
          trend="up"
          trendValue="+22%"
          icon={<ShoppingCartIcon />}
          iconColor={theme.palette.success.main}
        />
        <Paper
          sx={{
            p: 3,
            height: '100%',
            bgcolor: '#F4F5FA',
            borderRadius: 2,
            boxShadow: 'none',
            border: '1px solid',
            borderColor: 'divider',
            position: 'relative',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography color="text.secondary" variant="body2" gutterBottom>
              Inventory
            </Typography>
            <IconButton size="small" onClick={handleInventoryMenuOpen}>
              <ArrowDropDownIcon />
            </IconButton>
            <Menu
              anchorEl={inventoryMenuAnchor}
              open={Boolean(inventoryMenuAnchor)}
              onClose={handleInventoryMenuClose}
            >
              <MenuItem onClick={() => handleInventoryMenuSelect('Products')}>Products</MenuItem>
              <MenuItem onClick={() => handleInventoryMenuSelect('Low Stocks')}>Low Stocks</MenuItem>
              <MenuItem onClick={() => handleInventoryMenuSelect('Category')}>Category</MenuItem>
              <MenuItem onClick={() => handleInventoryMenuSelect('Brands')}>Brands</MenuItem>
            </Menu>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
              1,245
            </Typography>
            <Box
              sx={{
                p: 1,
                borderRadius: 2,
                bgcolor: '#1B285015',
                color: '#1B2850',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <InventoryIcon />
            </Box>
          </Box>
          <Typography variant="body2" color="success.main">
            +5% this month
          </Typography>
        </Paper>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: '1fr',
            lg: '2fr 1fr',
          },
          mb: 3,
        }}
      >
        <SalesStatistics />
        <TopCategories />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: '1fr',
            lg: '2fr 1fr',
          },
          mb: 3,
        }}
      >
        <TopSellingProducts />
        <OrderStatistics />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: '1fr',
            lg: '1fr 1fr',
          },
          mb: 3,
        }}
      >
        <RecentTransactions />
        <TopCustomers />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: '1fr',
            lg: '1fr 1fr',
          },
        }}
      >
        <OverallInformation />
        <RecentSales />
      </Box>
    </Box>
  );
} 