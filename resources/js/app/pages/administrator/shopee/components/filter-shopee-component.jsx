import React, { useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { router } from "@inertiajs/react";

export default function FilterShopeeComponent() {
    // Get current search parameter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const currentSearch = urlParams.get('search') || 'all';
    
    const [shopeeStatus, setShopeeStatus] = useState(currentSearch);

    function search_shopee_sales() {
        // If "All" is selected or no value, just visit the base URL
        if (!shopeeStatus || shopeeStatus === "all") {
            router.visit(window.location.pathname); // Refresh without any filter
        } else {
            router.visit(`?search=${shopeeStatus}`);
        }
    }

    return (
        <div className="flex items-center space-x-4 rounded-md shadow-sm">
            <select
                id="quantity"
                name="quantity"
                value={shopeeStatus}
                onChange={(e) => setShopeeStatus(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white py-3  text-sm text-gray-900 focus:border-pink-400 focus:ring-pink-300"
            >
                <option value="all">All</option>
                <option value="Pending">Pending</option>
                <option value="Returned">Returned</option>
                <option value="Refunded">Refunded</option>
                <option value="Paid">Paid</option>
            </select>
            <button
                onClick={search_shopee_sales}
                className="rounded-md bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600"
            >
                Apply
            </button>
        </div>
    );
}
