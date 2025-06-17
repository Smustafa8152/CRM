import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
export default function OrderStatistics() {
    const theme = useTheme();
    const chartData = {
        series: [38, 25, 15, 22],
        options: {
            chart: {
                type: 'donut',
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
                                formatter: function (val) {
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
        },
    };
    const statistics = [
        { label: 'LCD Screen', value: '38%', color: theme.palette.primary.main },
        { label: 'Touch Panel', value: '25%', color: theme.palette.info.main },
        { label: 'Battery', value: '15%', color: theme.palette.success.main },
        { label: 'Other Parts', value: '22%', color: theme.palette.warning.main },
    ];
    return (_jsxs(Paper, { sx: {
            p: 3,
            height: '100%',
            borderRadius: 2,
            boxShadow: 'none',
            border: '1px solid',
            borderColor: 'divider',
        }, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Order Statistics" }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 4 }, children: [_jsx(Box, { sx: { width: '60%', minHeight: 300 }, children: _jsx(ReactApexChart, { options: chartData.options, series: chartData.series, type: "donut", height: 300 }) }), _jsx(Box, { sx: { width: '40%' }, children: statistics.map((stat, index) => (_jsxs(Box, { sx: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                mb: 2,
                            }, children: [_jsx(Box, { sx: {
                                        width: 12,
                                        height: 12,
                                        borderRadius: '50%',
                                        bgcolor: stat.color,
                                    } }), _jsxs(Box, { children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: stat.label }), _jsx(Typography, { variant: "subtitle2", fontWeight: 600, children: stat.value })] })] }, index))) })] })] }));
}
