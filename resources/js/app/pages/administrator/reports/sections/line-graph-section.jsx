// LineGraphSection.js
import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js modules
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

const LineGraphSection = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales",
        data: [400, 300, 500, 200, 700],
        borderColor: "#6366f1", // Tailwind indigo-500
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: "Profits",
        data: [250, 180, 350, 120, 500],
        borderColor: "#10b981", // Tailwind green-500
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#e5e7eb", // Tailwind gray-200
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-full h-64">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineGraphSection;
