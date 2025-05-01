import { delete_category_thunk, get_category_thunk } from "@/app/redux/category-thunk";
import store from "@/app/store/store";
import Modal from "@/Components/Modal";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { message, Tooltip } from "antd";
import React, { useState } from "react";

export default function DeleteCategorySection({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const [loading, setLoading] = useState(false);

    const deleteCategory = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await store.dispatch(
                delete_category_thunk(data.id)
            );
            store.dispatch(get_category_thunk())
            message.success("Deleted Successfully!");
            setIsModalOpen(false);
        } catch (error) {
            message.error("Failed to Delete Category. Please try again."); // Show error message
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
                    onClick={openModal}
                >
                    <TrashIcon className="h-3.5 w-3 inline-block text-red-600" />
                </button>
            </Tooltip>
            <Modal open={isModalOpen} setOpen={setIsModalOpen} width="w-1/4">
                <h2 className="text-xl font-semibold mb-4">
                    Are you sure you want to delete this category?
                </h2>
                <form action="" onSubmit={deleteCategory}>
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
                            className="bg-pink-400 p-2 w-full rounded-md text-white hover:bg-pink-300"
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
