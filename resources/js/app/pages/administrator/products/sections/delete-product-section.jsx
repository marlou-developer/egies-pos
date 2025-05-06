
import { delete_product_thunk, get_product_thunk } from "@/app/redux/product-thunk";
import store from "@/app/store/store";
import Modal from "@/Components/Modal";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import { message, Tooltip } from "antd";
import React, { useState } from "react";

export default function DeleteProductSection({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const [loading, setLoading] = useState(false);

    const deleteProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await store.dispatch(
                delete_product_thunk(data.id)
            );
            store.dispatch(get_product_thunk())
            message.success("Deleted Successfully!");
            setIsModalOpen(false);
        } catch (error) {
            message.error("Failed to Delete Product. Please try again."); // Show error message
        } finally {
            setLoading(false); // Always reset loading state
        }
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Tooltip title="Remove Product">
                <button
                    className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    onClick={openModal}
                >
                    <TrashIcon className="mr-3 size-5 text-gray-400" />
                    Remove Product
                </button>
            </Tooltip>
            <Modal open={isModalOpen} setOpen={setIsModalOpen} width="w-1/4">
                <h2 className="text-xl font-semibold mb-4">
                    Are you sure you want to remove this product?
                </h2>
                <form action="" onSubmit={deleteProduct}>
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
