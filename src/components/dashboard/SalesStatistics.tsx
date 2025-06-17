import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

export default function SalesStatistics() {
  const theme = useTheme();

  const chartData = {
    series: [
      {
        name: 'Income',
        data: [28, 45, 35, 50, 32, 55, 23, 30, 45, 40, 35, 42],
      },
      {
        name: 'Expenses',
        data: [15, 30, 20, 35, 20, 40, 15, 20, 30, 25, 20, 30],
      },
    ],
    options: {
      chart: {
        type: 'bar' as const,
        height: 350,
        stacked: false,
        toolbar: {
          show: false,
        },
      },
      colors: [theme.palette.success.main, theme.palette.error.main],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 4,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      yaxis: {
        title: {
          text: '₹ (thousands)',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return "₹ " + val + " thousands";
          },
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
      },
      grid: {
        borderColor: theme.palette.divider,
      },
    } as ApexOptions,
  };

  const stats = [
    { label: 'Total Income', value: '₹25,578', trend: '+5.2%' },
    { label: 'Total Expenses', value: '₹12,478', trend: '-2.4%' },
  ];

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
        <Box>
          <Typography variant="h6" gutterBottom>
            Sales Statistics
          </Typography>
          <Box sx={{ display: 'flex', gap: 4 }}>
            {stats.map((stat, index) => (
              <Box key={index}>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                  <Typography variant="h6">{stat.value}</Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: stat.trend.startsWith('+')
                        ? 'success.main'
                        : 'error.main',
                    }}
                  >
                    {stat.trend}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box sx={{ height: 350 }}>
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height="100%"
        />
      </Box>
    </Paper>
  );
} 