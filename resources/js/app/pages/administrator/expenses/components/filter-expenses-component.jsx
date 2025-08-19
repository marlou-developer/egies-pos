import React, { useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { router } from "@inertiajs/react";
import { useSelector } from "react-redux";

export default function FilterExpensesComponent({ expense_categories }) {
    // Get current search parameter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const currentSearch = urlParams.get('search') || 'all';

    const [expenseStatus, setExpensesStatus] = useState(currentSearch);

    function search_expenses_status() {
        // If "All Categories" is selected or no value, just visit the base URL
        if (!expenseStatus || expenseStatus === "all") {
            router.visit(window.location.pathname); // Refresh without any filter
        } else {
            router.visit(`?search=${expenseStatus}`);
        }
    }

    console.log("Expense Cateasdasdgories:", expense_categories);
    return (
        <div className="flex items-center space-x-4 rounded-md shadow-sm">
            <select
                id="quantity"
                name="quantity"
                value={expenseStatus}
                onChange={(e) => setExpensesStatus(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white py-3  text-sm text-gray-900 focus:border-pink-400 focus:ring-pink-300"
            >
                <option value="all">All Categories</option>
                <option value="N/A">N/A</option>
                {expense_categories?.map((category, index) => (
                    <option key={index} value={category.category}>
                        {category.category}
                    </option>
                ))}
            </select>
            <button
                onClick={search_expenses_status}
                className="rounded-md bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600"
            >
                Apply
            </button>
        </div>
    );
}
