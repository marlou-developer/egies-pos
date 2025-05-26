// BarGraphSection.js
import React from "react";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarGraphSection = () => {
    const { dashboard } = useSelector((store) => store.app);
    console.log(
        "dashboard",
        dashboard?.result.map((res) => res.date)
    );
    const labels = dashboard?.result?.map((res) => res.date);
    const profits = dashboard?.result.map((res) => res.profits);
    const sales = dashboard?.result.map((res) => res.sales);
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Sales",
                data: sales,
                backgroundColor: "#3b82f6", // Tailwind blue-500
                borderRadius: 6,
            },
            {
                label: "Profits",
                data: profits,
                backgroundColor: "#10b981", // Tailwind green-500
                borderRadius: 6,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 100,
                },
            },
        },
        plugins: {
            legend: {
                position: "top",
            },
        },
    };

    return (
        <div className="w-full h-64">
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarGraphSection;
