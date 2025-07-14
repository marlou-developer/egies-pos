import React, { useState } from "react";
// import { FaSquarePlus, FaTrashRestore } from "react-icons/fa6";
import Modal from "@/Components/Modal";
import store from "@/app/store/store";
import { restore_thunk } from "@/app/redux/stock-thunk";
import { message, Tooltip } from "antd";
import { get_product_thunk, get_soft_deleted_product_thunk } from "@/app/redux/product-thunk";
import { get_over_due_thunk } from "@/app/redux/cart-thunk";
import { peso_value } from "@/app/lib/peso";
import { FaRepeat } from "react-icons/fa6";

export default function RestoreSection({ data, onRestoreSuccess }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRestore = async (e) => {
        e.preventDefault();

        // Validate data before proceeding
        if (!data?.id) {
            message.error("Invalid product data. Please try again.");
            return;
        }

        setLoading(true);
        try {
            const result = await store.dispatch(
                restore_thunk({
                    product_id: String(data.id),
                    products: { id: String(data.id) },
                })
            );

            // Check if the restore was successful
            if (result && result.data) {
                // Refresh the soft deleted products list
                await store.dispatch(get_soft_deleted_product_thunk());

                message.success("Product successfully restored!");
                setModalOpen(false);

                // Call the callback if provided
                if (onRestoreSuccess) {
                    onRestoreSuccess();
                }
            } else {
                message.error("Failed to restore product. Please try again.");
            }
        } catch (error) {
            console.error('Restore error:', error);

            // More specific error handling
            if (error.response?.data?.message) {
                message.error(error.response.data.message);
            } else if (error.message) {
                message.error(error.message);
            } else {
                message.error("Failed to restore product. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Tooltip title="Restore Product">
                <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    disabled={loading}
                    className="relative inline-flex items-center rounded-md bg-green-400 w-full p-3 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    <FaRepeat className={`text-green-100 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </Tooltip>

            <Modal open={modalOpen} setOpen={setModalOpen}>
                <form onSubmit={handleRestore}>
                    <div className="mt-6 flex flex-col gap-5">
                        <h1 className="text-xl">
                            Are you sure you want to restore <b>{data?.name || 'this product'}</b>
                            {data?.cost && (
                                <span> with <b>{peso_value(Number(data.cost))}</b> cost price</span>
                            )}?
                        </h1>
                        {data?.deleted_at && (
                            <p className="text-sm text-gray-600">
                                This product was deleted on: {new Date(data.deleted_at).toLocaleDateString()}
                            </p>
                        )}
                    </div>
                    <div className="flex gap-3 mt-5 justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-green-400 hover:bg-green-500 disabled:bg-gray-400 p-3 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset"
                        >
                            {loading ? 'Restoring...' : 'Restore'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setModalOpen(false)}
                            className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-gray-400 hover:bg-gray-500 p-3 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
