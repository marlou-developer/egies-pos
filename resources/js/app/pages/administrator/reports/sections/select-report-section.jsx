import React, { useState } from "react";

const reports = [
    "Daily Sales",
    "Expenses",
    "Invoices",
    "Payment Types by Customer",
    "Payment Types by User",
    "Profit and Margin",
    "Purchase by Product",
    "Purchase by Supplier",
    "Purchase Invoices",
    "Refunds",
    "Sales By Customer",
    "Sales By Payment Types",
    "Sales By Product",
    "Stock Movement",
    "Unpaid Sales",
];

export default function SelectReportSection({ setForm, form }) {
    const [selectedReport, setSelectedReport] = useState("");

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">
                Select report to view or print
            </h2>
            <ul className="space-y-1">
                {reports.map((report) => (
                    <li key={report}>
                        <label
                            className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-blue-700 ${selectedReport === report
                                ? "bg-blue-600 text-white"
                                : "text-gray-300"
                                }`}
                        >
                            <input
                                type="radio"
                                name="report"
                                // value={report}
                                checked={selectedReport === report}
                                onChange={() => {
                                    setForm({
                                        ...form,
                                        type: report,
                                    });
                                    setSelectedReport(report);
                                }}
                                className="form-radio text-blue-500"
                            />
                            <span>{report}</span>
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}
