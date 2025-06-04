import { delete_product_discount_thunk, get_product_discount_by_id_thunk } from "@/app/redux/product-thunk";
import store from "@/app/store/store";
import Modal from "@/Components/Modal";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import { message, Tooltip } from "antd";
import React, { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";

export default function DeleteProductDiscountSection({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const [loading, setLoading] = useState(false);
    const customer_id = window.location.pathname.split('/')[3]

    const deleteProductDiscount = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await store.dispatch(
                delete_product_discount_thunk(data.id)
            );
            store.dispatch(get_product_discount_by_id_thunk(customer_id))
            message.success("Removed Successfully!");
            setIsModalOpen(false);
        } catch (error) {
            message.error("Failed to Delete Product Discount. Please try again."); // Show error message
        } finally {
            setLoading(false); // Always reset loading state
        }
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Tooltip title="Remove Discount">
                <button type='button' onClick={() => setIsModalOpen(true)} className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-red-100 hover:bg-blue-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset">
                    <FaTrashCan className="size-5 text-red-500" />
                </button>
            </Tooltip>
            <Modal open={isModalOpen} setOpen={setIsModalOpen} onClose={() => setIsModalOpen(false)} width="w-1/4">
                <h2 className="text-xl font-semibold mb-4">
                    Are you sure you want to remove this discount?
                </h2>
                <form action="" onSubmit={deleteProductDiscount}>
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
