// SelectReportSection.jsx
import React from 'react';

const reports = [
    "Fast Stock Movement", "Slow Stock Movement", "Sales By Customer", "Daily Sales", "Sales By Product", "Sales By Payment Types",
    "Unpaid Sales", " Purchase by Product", "Payment Types by User", "Purchase by Supplier",
    "Payment Types by Customer", "Purchase Invoices", "Refunds", "Invoices", "Profit & margin"
];

export default function SelectReportSection() {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Select report to view or print</h2>
            <ul className="space-y-1">
                {reports.map((report) => (
                    <li
                        key={report}
                        className={`p-2 rounded cursor-pointer hover:bg-gray-700 ${report === "Profit & margin" ? "bg-blue-600 text-white" : "text-gray-300"
                            }`}
                    >
                        {report}
                    </li>
                ))}
            </ul>
        </div>
    );
}
