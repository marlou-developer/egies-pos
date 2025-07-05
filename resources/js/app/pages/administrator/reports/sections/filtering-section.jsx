// FilteringSection.jsx
import React from 'react';

export default function FilteringSection() {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Filter</h2>

            <div className="space-y-4">
                {[
                    { label: 'Customers & suppliers', id: 'customer', options: ['All'] },
                    { label: 'User', id: 'user', options: ['All'] },
                    { label: 'Cash register', id: 'cash', options: ['All'] },
                    { label: 'Product', id: 'product', options: ['A Bonne Collagen Lotion'] },
                    { label: 'Product group', id: 'group', options: ['Products'] }
                ].map(({ label, id, options }) => (
                    <div key={id}>
                        <label className="block mb-1 text-sm">{label}</label>
                        <select className="w-full p-2 bg-gray-800 border border-gray-600 rounded">
                            {options.map(opt => (
                                <option key={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                ))}

                <div>
                    <label className="block mb-1 text-sm">Date range</label>
                    <input type="text" defaultValue="4/1/2025 - 5/1/2025" className="w-full p-2 bg-gray-800 border border-gray-600 rounded" />
                </div>

                <div className="flex gap-2 pt-4">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 p-2 rounded text-white">Show report</button>
                    <button className="flex-1 bg-gray-700 hover:bg-gray-600 p-2 rounded text-white">Print</button>
                </div>

                <div className="flex gap-2">
                    <button className="flex-1 bg-green-600 hover:bg-green-700 p-2 rounded text-white">Excel</button>
                    <button className="flex-1 bg-red-600 hover:bg-red-700 p-2 rounded text-white">PDF</button>
                </div>
            </div>
        </div>
    );
}
