import React, { useState } from "react";

const reports = [
    "Stock Movement",
    "Sales By Customer",
    "Daily Sales",
    "Sales By Product",
    "Sales By Payment Types",
    "Unpaid Sales",
    "Purchase by Product",
    "Payment Types by User",
    "Purchase by Supplier",
    "Payment Types by Customer",
    "Purchase Invoices",
    "Refunds",
    "Invoices",
    "Profit & margin",
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
                            className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-blue-700 ${
                                selectedReport === report
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
