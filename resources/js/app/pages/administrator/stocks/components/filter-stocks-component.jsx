import React, { useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { router } from "@inertiajs/react";

export default function FilterStocksComponent() {
    // Get current search parameter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const currentSearch = urlParams.get('search') || 'all';
    
    const [stockStatus, setStockStatus] = useState(currentSearch);

    function search_products() {
        // If "All Stock" is selected or no value, just visit the base URL
        if (!stockStatus || stockStatus === "all") {
            router.visit(window.location.pathname); // Refresh without any filter
        } else {
            router.visit(`?search=${stockStatus}`);
        }
    }

    return (
        <div className="flex items-center space-x-4 rounded-md shadow-sm">
            <select
                id="quantity"
                name="quantity"
                value={stockStatus}
                onChange={(e) => setStockStatus(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white py-3 text-sm text-gray-900 focus:border-pink-400 focus:ring-pink-300"
            >
                <option value="" disabled>Select Stock Status</option>
                <option value="all">All Stock</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
            </select>

            <button
                onClick={search_products}
                className="rounded-md bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600"
            >
                Apply
            </button>
        </div>
    );
}
