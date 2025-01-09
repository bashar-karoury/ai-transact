'use client';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: number[];
  labels: string[];
}

const PieChart: React.FC<PieChartProps> = ({ data, labels }) => {
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

  return <Pie data={chartData} />;
};

export default PieChart;
