import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
export default function TopCategories() {
    const theme = useTheme();
    const chartData = {
        series: [44, 55, 13, 33],
        options: {
            chart: {
                type: 'donut',
            },
            labels: ['LCD Screen', 'Touch Panel', 'Battery', 'Other Parts'],
            colors: [
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.success.main,
                theme.palette.warning.main,
            ],
            plotOptions: {
                pie: {
                    donut: {
                        size: '70%',
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
                                    return parseFloat(val) + '%';
                                },
                            },
                            total: {
                                show: true,
                                label: 'Total',
                                color: theme.palette.text.secondary,
                                formatter: function () {
                                    return '145';
                                },
                            },
                        },
                    },
                },
            },
            legend: {
                show: true,
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '14px',
                fontFamily: theme.typography.fontFamily,
                markers: {
                    width: 10,
                    height: 10,
                    radius: 5,
                },
                itemMargin: {
                    horizontal: 15,
                    vertical: 5,
                },
            },
            dataLabels: {
                enabled: false,
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            ],
        },
    };
    return (_jsxs(Paper, { sx: {
            p: 3,
            height: '100%',
            borderRadius: 2,
            boxShadow: 'none',
            border: '1px solid',
            borderColor: 'divider',
        }, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Top Categories" }), _jsx(Box, { sx: { height: 350, display: 'flex', alignItems: 'center' }, children: _jsx(ReactApexChart, { options: chartData.options, series: chartData.series, type: "donut", height: "100%", width: "100%" }) })] }));
}
