import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

export default function OrderStatistics() {
  const theme = useTheme();

  const chartData = {
    series: [38, 25, 15, 22],
    options: {
      chart: {
        type: 'donut' as const,
      },
      labels: ['LCD Screen', 'Touch Panel', 'Battery', 'Other Parts'],
      colors: [theme.palette.primary.main, theme.palette.info.main, theme.palette.success.main, theme.palette.warning.main],
      legend: {
        show: false,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '75%',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '14px',
                fontFamily: theme.typography.fontFamily,
                color: theme.palette.text.secondary,
              },
              value: {
                show: true,
                fontSize: '24px',
                fontFamily: theme.typography.fontFamily,
                color: theme.palette.text.primary,
                formatter: function (val: string) {
                  return val + '%';
                },
              },
              total: {
                show: true,
                label: 'Total',
                color: theme.palette.text.secondary,
                formatter: function () {
                  return '38%';
                },
              },
            },
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 0,
      },
      states: {
        hover: {
          filter: {
            type: 'none',
          },
        },
      },
    } as ApexOptions,
  };

  const statistics = [
    { label: 'LCD Screen', value: '38%', color: theme.palette.primary.main },
    { label: 'Touch Panel', value: '25%', color: theme.palette.info.main },
    { label: 'Battery', value: '15%', color: theme.palette.success.main },
    { label: 'Other Parts', value: '22%', color: theme.palette.warning.main },
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
      <Typography variant="h6" gutterBottom>
        Order Statistics
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Box sx={{ width: '60%', minHeight: 300 }}>
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="donut"
            height={300}
          />
        </Box>
        <Box sx={{ width: '40%' }}>
          {statistics.map((stat, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 2,
              }}
            >
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: stat.color,
                }}
              />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
                <Typography variant="subtitle2" fontWeight={600}>
                  {stat.value}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
} 