import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  styled,
  InputBase,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
  ShoppingCart as SalesIcon,
  PriceChange as PricingIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Search as SearchIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  PointOfSale as PointOfSaleIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  ArrowDropDown as ArrowDropDownIcon,
  Receipt as ReceiptIcon,
  Support as SupportIcon,
  WhatsApp as WhatsAppIcon,
  Assessment as AssessmentIcon,
  CreditCard as CreditCardIcon,
} from '@mui/icons-material';

const drawerWidth = 260;
const collapsedDrawerWidth = 73;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}));

interface LayoutProps {
  children: ReactNode;
}

interface MenuItem {
  text: string;
  path: string;
  icon: ReactNode;
}

const menuItems: MenuItem[] = [
  { text: 'Dashboard', path: '/', icon: <DashboardIcon /> },
  { text: 'Customers', path: '/customers', icon: <PeopleIcon /> },
  { text: 'Credit & Payments', path: '/credit-payments', icon: <CreditCardIcon /> },
  { text: 'Inventory', path: '/inventory', icon: <InventoryIcon /> },
  { text: 'Sales & Orders', path: '/sales', icon: <SalesIcon /> },
  { text: 'Pricing', path: '/pricing', icon: <PricingIcon /> },
  { text: 'Invoices', path: '/invoices', icon: <ReceiptIcon /> },
  { text: 'Support', path: '/support', icon: <SupportIcon /> },
  { text: 'WhatsApp', path: '/whatsapp', icon: <WhatsAppIcon /> },
  { text: 'Reports', path: '/reports', icon: <AssessmentIcon /> },
];

export default function Layout({ children }: LayoutProps) {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedStore, setSelectedStore] = useState('Freshmart');

  const handleDrawerToggle = () => {
    if (window.innerWidth < theme.breakpoints.values.sm) {
      setMobileOpen(!mobileOpen);
    } else {
      setOpen(!open);
    }
  };

  const handleStoreMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleStoreSelect = (store: string) => {
    setSelectedStore(store);
    setAnchorEl(null);
  };
  const handleStoreMenuClose = () => setAnchorEl(null);

  const drawer = (
    <>
      <DrawerHeader>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            color: 'secondary.main',
            fontWeight: 600,
            ml: 2,
            opacity: open ? 1 : 0,
            transition: 'opacity 0.2s',
          }}
        >
          Mobile Parts CRM
        </Typography>
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'secondary.main' }}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <List sx={{ mt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                mx: 1,
                borderRadius: 1,
                position: 'relative',
                '&.Mui-selected': {
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: -8,
                    width: 4,
                    height: '80%',
                    backgroundColor: 'secondary.main',
                    borderRadius: '0 4px 4px 0',
                  },
                },
              }}
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  opacity: open ? 1 : 0,
                  transition: 'opacity 0.2s',
                  '& .MuiTypography-root': {
                    color: 'secondary.main',
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${open ? drawerWidth : collapsedDrawerWidth}px)` },
          ml: { sm: `${open ? drawerWidth : collapsedDrawerWidth}px` },
          bgcolor: 'background.paper',
          boxShadow: 'none',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar
          sx={{
            bgcolor: 'white',
            borderRadius: 3,
            minHeight: 56,
            px: 2,
            boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          {/* Search Bar */}
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, maxWidth: 350, bgcolor: '#F4F5FA', borderRadius: 2, px: 1 }}>
            <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
            <InputBase placeholder="Search" sx={{ flex: 1, fontSize: 15 }} />
            <Button size="small" sx={{ minWidth: 0, p: 0.5, color: 'text.secondary' }}>
              &#10005;
            </Button>
            <Button size="small" sx={{ minWidth: 0, p: 0.5, color: 'text.secondary' }}>
              K
            </Button>
          </Box>

          {/* Store Dropdown */}
          <Button
            variant="outlined"
            startIcon={<Avatar src="/store-icon.png" sx={{ width: 24, height: 24 }} />}
            endIcon={<ArrowDropDownIcon />}
            onClick={handleStoreMenu}
            sx={{ ml: 2, color: 'text.primary', borderColor: 'divider', bgcolor: 'white', borderRadius: 2, fontWeight: 500 }}
          >
            {selectedStore}
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleStoreMenuClose}>
            <MenuItem onClick={() => handleStoreSelect('Freshmart')}>Freshmart</MenuItem>
            <MenuItem onClick={() => handleStoreSelect('Supermart')}>Supermart</MenuItem>
          </Menu>

          {/* Add New Button */}
          <Button variant="contained" startIcon={<AddCircleOutlineIcon />} sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: 2, ml: 2 }}>
            Add New
          </Button>

          {/* POS Button */}
          <Button variant="contained" startIcon={<PointOfSaleIcon />} sx={{ bgcolor: 'secondary.main', color: 'white', borderRadius: 2, ml: 2 }}>
            POS
          </Button>

          {/* Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
            <NotificationsIcon sx={{ color: 'text.secondary' }} />
            <SettingsIcon sx={{ color: 'text.secondary' }} />
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            <Avatar src="/avatars/avatar1.jpg" sx={{ width: 32, height: 32 }} />
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: open ? drawerWidth : collapsedDrawerWidth },
          flexShrink: { sm: 0 },
          transition: 'width 0.2s',
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: 'none',
              transition: 'width 0.2s',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: open ? drawerWidth : collapsedDrawerWidth,
              borderRight: 'none',
              transition: 'width 0.2s',
              overflowX: 'hidden',
            },
          }}
          open={open}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${open ? drawerWidth : collapsedDrawerWidth}px)` },
          transition: 'width 0.2s',
          bgcolor: 'background.default',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
} 