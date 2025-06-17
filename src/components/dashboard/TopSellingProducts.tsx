import React from 'react';
import { Box, Typography, Avatar, LinearProgress, Paper } from '@mui/material';

interface Product {
  name: string;
  price: string;
  sold: number;
  image: string;
}

const products: Product[] = [
  {
    name: "Samsung Galaxy S21 LCD",
    price: "₹12,999",
    sold: 85,
    image: "/products/s21-lcd.jpg"
  },
  {
    name: "iPhone 13 Pro Display",
    price: "₹24,999",
    sold: 75,
    image: "/products/iphone13-display.jpg"
  },
  {
    name: "OnePlus 9 Pro Screen",
    price: "₹15,999",
    sold: 65,
    image: "/products/oneplus9-screen.jpg"
  },
  {
    name: "Xiaomi Mi 11 LCD",
    price: "₹9,999",
    sold: 60,
    image: "/products/mi11-lcd.jpg"
  },
  {
    name: "Vivo X60 Display",
    price: "₹11,999",
    sold: 55,
    image: "/products/vivo-display.jpg"
  }
];

export default function TopSellingProducts() {
  return (
    <Paper
      sx={{
        p: 3,
        height: '100%',
        borderRadius: 2,
        boxShadow: 'none',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">Top Selling Products</Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'primary.main',
            cursor: 'pointer',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          View All
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {products.map((product, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 1,
              '&:hover': { bgcolor: 'action.hover' },
              borderRadius: 1,
            }}
          >
            <Avatar
              src={product.image}
              variant="rounded"
              sx={{ width: 42, height: 42 }}
            />
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography variant="body2" noWrap fontWeight={600}>
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.price}
              </Typography>
            </Box>
            <Box sx={{ width: 100 }}>
              <LinearProgress
                variant="determinate"
                value={product.sold}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: 'action.hover',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 3,
                    bgcolor: 'primary.main',
                  },
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
} 