"use client";
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: number[];
  labels: string[];
  width?: number;
  height?: number;
}

const PieChart: React.FC<PieChartProps> = ({
  data,
  labels,
  width = 550,
  height = 400,
}) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#A1C298",
          "#8E44AD",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#A1C298",
          "#8E44AD",
        ],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 20, // Adjust font size for legend labels
          },
          // color: "#000", // Optionally set label color
        },
        position: "right", // Position of the legend
      },
    },
  };

  return (
    <div style={{ width, height }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
