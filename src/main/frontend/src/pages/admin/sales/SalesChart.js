import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Chart.js에 필요한 요소를 등록
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const SalesChart = ({ data }) => { // props로 받은 data 구조 수정
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!data || !Array.isArray(data)) {
            console.error('Invalid data format. Expected an array of objects.');
            return;
        }

        const transformedData = data.map((entry) => ({
            orderDate: entry.orderDate, // 날짜
            totalRevenue: entry.totalRevenue, // 매출
        }));

        setChartData({
            labels: transformedData.map((entry) =>
                new Date(entry.orderDate).toLocaleDateString()
            ), // x축 날짜
            datasets: [
                {
                    label: 'Revenue (USD)',
                    data: transformedData.map((entry) => entry.totalRevenue), // y축 매출 데이터
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                },
            ],
        });
        setLoading(false);
    }, [data]); // data를 의존성 배열에 추가

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: 'Sales Over Time',
                font: {
                    size: 20,
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `$${context.raw.toLocaleString()}`;
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
                grid: {
                    display: false,
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Revenue (USD)',
                },
                ticks: {
                    callback: (value) => `$${value.toLocaleString()}`,
                },
                grid: {
                    color: 'rgba(200, 200, 200, 0.2)',
                },
            },
        },
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div style={{ height: '400px', marginTop: '20px' }}>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default SalesChart;
