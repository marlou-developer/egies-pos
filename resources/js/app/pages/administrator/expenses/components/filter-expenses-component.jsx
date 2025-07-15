import React, { useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { router } from "@inertiajs/react";

export default function FilterExpensesComponent() {
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
                <option value="Maintenance">Maintenance & Repair Expense</option>
                <option value="Miscellaneous Expense">Miscellaneous Expense</option>
                <option value="Operating Expenses">Operating Expenses</option>
                <option value="Permits & Licenses Expense">Permits & Licenses Expense</option>
                <option value="Rent Expense">Rent Expense</option>
                <option value="Salary Expenses">Salary Expenses</option>
                <option value="Supplies Expense">Supplies Expense</option>
                <option value="Utilities Expenses">Utilities Expenses</option>
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
