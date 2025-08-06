
import { delete_product_thunk, get_product_thunk } from "@/app/redux/product-thunk";
import { soft_delete_thunk } from "@/app/redux/stock-thunk";
import { get_over_due_thunk } from "@/app/redux/cart-thunk";
import store from "@/app/store/store";
import Modal from "@/Components/Modal";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import { message, Tooltip } from "antd";
import { peso_value } from "@/app/lib/peso";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function DeleteProductSection({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({});
    const { suppliers } = useSelector((store) => store.suppliers);

    const deleteProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await store.dispatch(
                soft_delete_thunk({
                    ...form,
                    product_id: String(data?.id),
                    products: { id: String(data?.id) },
                    price: data?.cost,
                    remaining: String(data?.quantity || 0),
                })
            );
            await store.dispatch(get_over_due_thunk());
            await store.dispatch(get_product_thunk());
            message.success("Product Removed Successfully!");
            setIsModalOpen(false);
            setForm({});
        } catch (error) {
            message.error("Failed to soft delete. Please try again.");
            console.error('Soft delete error:', error);
        } finally {
            setLoading(false);
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
                    <b>Remove Product</b>
                </button>
            </Tooltip>
            <Modal open={isModalOpen} setOpen={setIsModalOpen} onClose={() => setIsModalOpen(false)} width="w-1/4">
                <form onSubmit={deleteProduct}>
                    <div className="mt-6 flex flex-col gap-5">
                        <h1 className="text-xl">
                            Are you sure you want to remove <b>{data?.name}</b> with <b>{peso_value(Number(data?.cost || 0))}</b> cost price?
                        </h1>
                    </div>
                    <div className="flex gap-2 mt-5 justify-end">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-gray-400 hover:bg-gray-500 p-3 text-sm font-semibold text-white shadow-xs ring-1 ring-gray-300 ring-inset"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-red-400 hover:bg-red-500 disabled:bg-gray-400 p-3 text-sm font-semibold text-white shadow-xs ring-1 ring-gray-300 ring-inset"
                        >
                            {loading ? 'Removing...' : 'Remove'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
