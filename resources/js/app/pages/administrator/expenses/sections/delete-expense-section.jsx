
import { delete_expense_thunk, get_expense_thunk } from "@/app/redux/expense-thunk";
import { delete_product_thunk, get_product_thunk } from "@/app/redux/product-thunk";
import { delete_user_thunk, get_users_thunk } from "@/app/redux/user-thunk";
import store from "@/app/store/store";
import Modal from "@/Components/Modal";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import { message, Tooltip } from "antd";
import React, { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";

export default function DeleteExpenseSection({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const [loading, setLoading] = useState(false);

    const deleteUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await store.dispatch(
                delete_expense_thunk(data.id)
            );
            store.dispatch(get_expense_thunk())
            message.success("Removed Successfully!");
            setIsModalOpen(false);
        } catch (error) {
            message.error("Failed to Delete Expense. Please try again."); // Show error message
        } finally {
            setLoading(false); // Always reset loading state
        }
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Tooltip title="Remove Expense">
                <button
                    className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-red-400 hover:bg-red-500 p-3 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset"
                    onClick={openModal}
                >
                    <FaTrashCan className="size-3.5 text-white" />
                </button>
            </Tooltip>
            <Modal open={isModalOpen} setOpen={setIsModalOpen} onClose={() => setIsModalOpen(false)} width="w-1/4">
                <h2 className="text-xl font-semibold mb-4">
                    Are you sure you want to remove this expense?
                </h2>
                <form action="" onSubmit={deleteUser}>
                    <div className="flex w-full gap-5">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="bg-red-400 p-2 w-full rounded-md text-white hover:bg-red-300"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={loading}
                            type="submit"
                            className="bg-blue-400 p-2 w-full rounded-md text-white hover:bg-blue-300"
                        >

                            {
                                loading ? 'Loading...' : 'Confirm'
                            }
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
