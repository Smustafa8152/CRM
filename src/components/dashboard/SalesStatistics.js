import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
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
                type: 'bar',
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
                    formatter: function (val) {
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
        },
    };
    const stats = [
        { label: 'Total Income', value: '₹25,578', trend: '+5.2%' },
        { label: 'Total Expenses', value: '₹12,478', trend: '-2.4%' },
    ];
    return (_jsxs(Paper, { sx: {
            p: 3,
            height: '100%',
            borderRadius: 2,
            boxShadow: 'none',
            border: '1px solid',
            borderColor: 'divider',
        }, children: [_jsx(Box, { sx: { display: 'flex', justifyContent: 'space-between', mb: 3 }, children: _jsxs(Box, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Sales Statistics" }), _jsx(Box, { sx: { display: 'flex', gap: 4 }, children: stats.map((stat, index) => (_jsxs(Box, { children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: stat.label }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'baseline', gap: 1 }, children: [_jsx(Typography, { variant: "h6", children: stat.value }), _jsx(Typography, { variant: "caption", sx: {
                                                    color: stat.trend.startsWith('+')
                                                        ? 'success.main'
                                                        : 'error.main',
                                                }, children: stat.trend })] })] }, index))) })] }) }), _jsx(Box, { sx: { height: 350 }, children: _jsx(ReactApexChart, { options: chartData.options, series: chartData.series, type: "bar", height: "100%" }) })] }));
}
