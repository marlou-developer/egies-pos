import Input from '@/app/_components/input'
import DrawerSection from '@/app/_sections/drawer-section'
import { get_expense_thunk, update_expense_thunk } from '@/app/redux/expense-thunk'
import { get_supplier_thunk, update_supplier_thunk } from '@/app/redux/supplier-thunk'
import { get_users_thunk, update_user_thunk } from '@/app/redux/user-thunk'
import store from '@/app/store/store'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { message, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaDollarSign, FaPen, FaPenClip, FaSquarePen, FaTruck, FaTruckDroplet, FaUser, FaUserPen, FaUserPlus } from 'react-icons/fa6'
import { useSelector } from 'react-redux'

export default function EditExpenseSection({ data }) {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({});
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setForm(data)
    }, [])

    const editUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await store.dispatch(
                update_expense_thunk({
                    ...form,
                })
            );
            message.success("Successfully updated!");
            await store.dispatch(get_expense_thunk());
            setOpen(false);
        } catch (error) {
            message.error("Failed to update Expense. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <Tooltip title="Edit Expense">
                <button type='button' onClick={() => setOpen(true)} className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-blue-100 hover:bg-blue-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset">
                    <FaPen className="size-3 text-blue-500" />
                    Edit Expense
                </button>
            </Tooltip>
            <DrawerSection
                open={open}
                setOpen={setOpen}
                className="relative z-50"
            >
                <div className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out sm:duration-700">
                    <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                        <div className="h-0 flex-1 overflow-y-auto">
                            <div className="bg-pink-200 px-4 py-6 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <div className="text-base font-semibold text-pink-600">
                                        <FaPen className="inline-block mr-1 " />
                                        Edit Expense
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                    >
                                        <XMarkIcon className="w-6 h-6" />
                                    </button>
                                </div>
                                <p className="mt-1 text-sm text-gray-600 flex">Edit the information below to update the expense.
                                </p>
                            </div>

                            <div className="px-4 sm:px-6">
                                <div className="space-y-6 pt-6 pb-5">
                                    <div className="flex items-center">
                                        <FaDollarSign className="inline-block mr-1 text-pink-500" />
                                        <h3 className="text-base font-medium text-gray-600">
                                            Expense Information
                                        </h3>
                                        <hr className="my-2" />
                                    </div>

                                    <form onSubmit={editUser} >
                                        <div className="flex flex-col gap-5">
                                            <div>
                                                <Input
                                                    onChange={(e) =>
                                                        setForm({
                                                            ...form,
                                                            item: e.target.value,
                                                        })
                                                    }
                                                    value={form?.item || ""}
                                                    name="item"
                                                    label="Purchased Item"
                                                    type="text"
                                                />
                                            </div>
                                            <div>
                                                <Input
                                                    onChange={(e) =>
                                                        setForm({
                                                            ...form,
                                                            cost: e.target.value,
                                                        })
                                                    }
                                                    value={form.cost || ""}
                                                    name="cost"
                                                    label="Cost"
                                                    type="text"
                                                />
                                            </div>
                                            <div>
                                                <Input
                                                    onChange={(e) =>
                                                        setForm({
                                                            ...form,
                                                            qty: e.target.value,
                                                        })
                                                    }
                                                    value={form.qty || ""}
                                                    name="qty"
                                                    label="Quantity"
                                                    type="number"
                                                />
                                            </div>
                                            <div>
                                                <Input
                                                    onChange={(e) =>
                                                        setForm({
                                                            ...form,
                                                            date: e.target.value,
                                                        })
                                                    }
                                                    value={form.date || ""}
                                                    name="date"
                                                    label="Purchased Date"
                                                    type="date"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-end mt-6">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setOpen(false)
                                                }
                                                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="ml-4 inline-flex justify-center rounded-md bg-pink-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-600"
                                            >
                                                {loading ? "Saving..." : "Save"}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DrawerSection>
        </>

    )
}
