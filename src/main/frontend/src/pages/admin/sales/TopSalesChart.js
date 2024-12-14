import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Chart.js에 필요한 요소를 등록
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const TopSalesChart = ({ data }) => { // props로 받은 data 구조 수정
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!data || typeof data !== 'object') {
            console.error('Invalid data format. Expected a Map<String, Integer> object.');
            return;
        }

        // Map<String, Integer> 데이터를 객체 배열로 변환
        const transformedData = Object.entries(data).map(([key, value]) => ({
            productName: key,
            salesCount: value,
        }));

        setChartData({
            labels: transformedData.map((entry) => entry.productName), // x축 제품명
            datasets: [
                {
                    label: 'Sales Count',
                    data: transformedData.map((entry) => entry.salesCount), // y축 판매 수
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
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
                text: 'Top Product Sales',
                font: {
                    size: 20,
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.raw.toLocaleString()} units sold`;
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Product',
                },
                grid: {
                    display: false,
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Sales Count',
                },
                ticks: {
                    callback: (value) => value.toLocaleString(),
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
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default TopSalesChart;
