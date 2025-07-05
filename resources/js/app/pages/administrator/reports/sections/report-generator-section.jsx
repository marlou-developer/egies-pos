// ReportGeneratorSection.jsx
import React from 'react';
import SelectReportSection from './select-report-section';
import FilteringSection from './filtering-section';

export default function ReportGeneratorSection() {
    return (
        <div className="flex w-full h-screen bg-pink-900 text-white">
            <div className="w-2/3 border-r border-pink-700 p-6 overflow-auto">
                <SelectReportSection />
            </div>
            <div className="w-1/3 p-6 overflow-auto">
                <FilteringSection />
            </div>
        </div>
    );
}
