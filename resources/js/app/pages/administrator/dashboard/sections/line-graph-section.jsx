// LineChart.jsx
import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import moment from "moment";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function LineGraphSection() {
    const { over_dues } = useSelector((store) => store.carts);
    const dashboard = over_dues?.dashboard;
    console.log(
        "waaass",
        dashboard?.monthly_sales?.map((res) => res.total_sales)
    );

    const labels = dashboard?.monthly_profits?.map((res) => res.month);
    const total_profits = dashboard?.monthly_profits?.map(
        (res) => res.total_profit
    );
    const total_sales = dashboard?.monthly_sales?.map((res) => res.total_sales);

    const data = {
        labels,
        datasets: [
            {
                label: "Profit",
                data: total_profits,
                borderColor: "#4f46e5",
                backgroundColor: "rgba(79, 70, 229, 0.4)",
                tension: 0.4,
            },
            {
                label: "Sales",
                data: total_sales,
                borderColor: "#008000",
                backgroundColor: "rgb(144, 238, 144)",
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: "top" },
            title: {
                display: true,
                text: `Sales Overview ${moment().format("Y")}`,
            },
        },
        scales: {
            y: { beginAtZero: true },
        },
    };
    return (
        <div className="flex flex-col gap-3">
            <div className="w-full  h-96">
                <Line data={data} options={options} />
            </div>
        </div>
    );
}
