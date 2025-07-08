// ReportGeneratorSection.jsx
import React, { useState } from "react";
import SelectReportSection from "./select-report-section";
import FilteringSection from "./filtering-section";

export default function ReportGeneratorSection() {
    const [form, setForm] = useState({
        customer: "all",
        supplier: "all",
        user: "all",
        product: null,
        category: null,
    });

    console.log("formform", form);
    return (
        <div className="flex w-full h-screen bg-pink-900 text-white">
            <div className="w-2/3 border-r border-pink-700 p-6 overflow-auto">
                <SelectReportSection setForm={setForm} form={form} />
            </div>
            <div className="w-1/3 p-6 overflow-auto">
                <FilteringSection form={form} setForm={setForm} />
            </div>
        </div>
    );
}
