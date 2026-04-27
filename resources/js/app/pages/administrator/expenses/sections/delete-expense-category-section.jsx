import { delete_category_thunk, get_category_thunk } from "@/app/redux/category-thunk";
import { delete_expense_category_thunk, get_expense_category_thunk } from "@/app/redux/expense-category-thunk";
import store from "@/app/store/store";
import Modal from "@/Components/Modal";
import VerifyPinModal from "@/app/_components/verify-pin-modal";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { message, Tooltip } from "antd";
import React, { useState } from "react";

export default function DeleteExpenseCategorySection({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pinOpen, setPinOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const deleteExpenseCategory = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await store.dispatch(
                delete_expense_category_thunk(data.id)
            );
            store.dispatch(get_expense_category_thunk())
            message.success("Deleted Successfully!");
            setIsModalOpen(false);
        } catch (error) {
            message.error("Failed to Delete Expense Category. Please try again."); // Show error message
        } finally {
            setLoading(false); // Always reset loading state
        }
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Tooltip title="Remove Category">
                <button
                    className="text-white font-bold ml-1 rounded"
                    onClick={() => setPinOpen(true)}
                >
                    <TrashIcon className="h-3.5 w-3 inline-block text-red-600" />
                </button>
            </Tooltip>
            <VerifyPinModal
                isOpen={pinOpen}
                onClose={() => setPinOpen(false)}
                onVerified={() => {
                    setPinOpen(false);
                    setIsModalOpen(true);
                }}
                actionLabel="delete this expense category"
            />
            <Modal open={isModalOpen} setOpen={setIsModalOpen} width="w-1/4">
                <h2 className="text-xl font-semibold mb-4">
                    Are you sure you want to delete this expense category?
                </h2>
                <form action="" onSubmit={deleteExpenseCategory}>
                    <div className="flex w-full gap-5">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="bg-blue-400 p-2 w-full rounded-md text-white hover:bg-blue-300"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={loading}
                            type="submit"
                            className="bg-green-400 p-2 w-full rounded-md text-white hover:bg-green-300"
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
