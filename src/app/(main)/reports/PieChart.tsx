'use client';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: number[];
  labels: string[];
  width?: number;
  height?: number;
}

const PieChart: React.FC<PieChartProps> = ({ data, labels, width = 200, height = 200 }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#A1C298', '#8E44AD'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#A1C298', '#8E44AD'],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width, height }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
