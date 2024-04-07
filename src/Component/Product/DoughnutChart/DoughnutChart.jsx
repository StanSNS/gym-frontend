import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DoughnutChart = ({ data }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        if (chartRef && chartRef.current && data) {
            const myChartRef = chartRef.current.getContext("2d");

            chartInstance.current = new Chart(myChartRef, {
                type: 'doughnut',
                data: {
                    labels: data.labels,
                    datasets: [{
                        data: data.values,
                        borderColor: '#fff',
                        backgroundColor: data.colors,
                    }]
                },
                options: {
                    responsive: true,
                    indexAxis: 'y',
                    elements: {
                        bar: {
                            borderWidth: 0,
                        }
                    },
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                }
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data]);

    return <canvas ref={chartRef}/>;
};

export default DoughnutChart;
