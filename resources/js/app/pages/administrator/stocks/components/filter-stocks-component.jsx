import React, { useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { router } from "@inertiajs/react";

export default function FilterStocksComponent() {
    const [stockStatus, setStockStatus] = useState("");

    function search_products() {
        // If "All Stock" is selected (empty value), just visit the base URL
        if (!stockStatus) {
            router.visit(window.location.pathname); // Refresh without any filter
        } else {
            router.visit(`?quantity=${stockStatus}`);
        }
    }

    return (
        <div className="flex items-center space-x-4 rounded-md shadow-sm">
            <select
                id="quantity"
                name="quantity"
                value={stockStatus}
                onChange={(e) => setStockStatus(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white py-2  text-sm text-gray-900 focus:border-pink-400 focus:ring-pink-300"
            >
                <option value=""><b>All Stock</b></option>
                <option value="11">In Stock</option>
                <option value="10">Low Stock</option>
                <option value="0">Out of Stock</option>
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
