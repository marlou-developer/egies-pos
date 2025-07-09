import React, { useState } from "react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaCalendarDays, FaDollarSign, FaTruck, FaTruckArrowRight, FaUser, FaUserPlus } from "react-icons/fa6";
import DrawerSection from "@/app/_sections/drawer-section";
import Input from "@/app/_components/input";
import { useDispatch, useSelector } from "react-redux";
import {
    create_customer_thunk,
    get_customer_thunk,
} from "@/app/redux/customer-thunk";
import { message } from "antd";
import store from "@/app/store/store";
import { setExpense } from "@/app/redux/expense-slice";
import { create_expense_thunk, get_expense_thunk } from "@/app/redux/expense-thunk";

export default function AddExpensesComponent({ open, setOpenExpenses }) {
    const [loading, setLoading] = useState(false);
    const { expense } = useSelector((state) => state.expenses);
    const dispatch = useDispatch();

    function data_handler(eOrKey, value) {
        if (typeof eOrKey === "string") {
            // Called manually with key and value (like for WYSIWYG)
            dispatch(
                setExpense({
                    ...expense,
                    [eOrKey]: value,
                })
            );
        } else {
            // Regular input onChange event
            dispatch(
                setExpense({
                    ...expense,
                    [eOrKey.target.name]: eOrKey.target.value,
                })
            );
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        const fd = new FormData();
        fd.append("category", expense.category ?? "");
        fd.append("item", expense.item ?? "");
        fd.append("cost", expense.cost ?? "");
        fd.append("qty", expense.qty ?? "");
        fd.append("date", expense.date ?? "");


        try {
            await store.dispatch(create_expense_thunk(fd));
            await store.dispatch(get_expense_thunk());
            message.success("Expense successfully saved!");
            setOpenExpenses(false);
            dispatch(setExpense({}));
        } catch (error) {
            message.error("Failed to add Expense. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <DrawerSection open={open} setOpen={setOpenExpenses}>
                <form
                    onSubmit={handleSubmit}
                    className="flex h-full flex-col divide-gray-200 bg-white shadow-xl"
                >
                    <div className="h-0 flex-1 overflow-y-auto">
                        <div className="bg-pink-200 px-4 py-6 sm:px-6">
                            <div className="flex items-center justify-between">
                                <div className="text-base font-semibold text-pink-600">
                                    <FaDollarSign className="float-left mr-1 mt-1" />
                                    New Expense
                                </div>
                                <div className="ml-3 flex h-7 items-center">
                                    <button
                                        type="button"
                                        onClick={() => setOpenExpenses(false)}
                                        className="relative rounded-md bg-pink-200 text-gray-400 hover:text-gray-600 focus:ring-2 focus:ring-white focus:outline-hidden"
                                    >
                                        <span className="absolute -inset-2.5" />
                                        <span className="sr-only">
                                            Close panel
                                        </span>
                                        <XMarkIcon
                                            aria-hidden="true"
                                            className="size-6"
                                        />
                                    </button>
                                </div>
                            </div>
                            <div className="mt-1">
                                <p className="text-sm text-gray-600">
                                    Get started by filling in the information
                                    below to add new expense.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                            <div className="divide-y divide-gray-200 px-4 sm:px-6">
                                <div className="space-y-6 pt-6 pb-5">
                                    <div className="sm:col-span-12">
                                        <FaDollarSign className="float-left size-5 mr-1 mt-3 text-pink-500" />
                                        <h3 className="text-base font-medium text-gray-600 pt-3">
                                            Expense Information
                                        </h3>
                                        <hr />
                                    </div>
                                    <div>
                                        <select
                                            id="category"
                                            name="category"
                                            onChange={data_handler}
                                            value={expense?.category ?? ""}
                                            className="w-full rounded-md border border-gray-500 bg-white py-3 text-gray-900 focus:border-pink-400 focus:ring-pink-300"
                                        >
                                            <option disabled selected>Select Expense Category</option>
                                            <option value="N/A">N/A</option>
                                            <option value="Maintenance & Repair Expense">Maintenance & Repair Expense</option>
                                            <option value="Miscellaneous Expense">Miscellaneous Expense</option>
                                            <option value="Operating Expenses">Operating Expenses</option>
                                            <option value="Permits & Licenses Expense">Permits & Licenses Expense</option>
                                            <option value="Rent Expense">Rent Expense</option>
                                            <option value="Salary Expenses">Salary Expenses</option>
                                            <option value="Supplies Expense">Supplies Expense</option>
                                            <option value="Utilities Expenses">Utilities Expenses</option>
                                        </select>
                                    </div>
                                    <div>
                                        <Input
                                            onChange={data_handler}
                                            value={expense?.item ?? ""}
                                            name="item"
                                            label="Purchased Item/Name"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            onChange={data_handler}
                                            value={expense?.cost ?? ""}
                                            name="cost"
                                            label="Cost"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            onChange={data_handler}
                                            value={expense?.qty ?? ""}
                                            name="qty"
                                            label="Quantity"
                                            type="number"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            onChange={data_handler}
                                            value={expense?.date ?? ""}
                                            name="date"
                                            label="Purcased Date"
                                            type="date"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex shrink-0 justify-end px-4 py-4">
                        <button
                            type="button"
                            onClick={() => setOpenExpenses(false)}
                            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="ml-4 inline-flex justify-center rounded-md bg-pink-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-pink-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                        >
                            {loading ? "Loading..." : "Submit"}
                        </button>
                    </div>
                </form>
            </DrawerSection>
        </>
    );
}
