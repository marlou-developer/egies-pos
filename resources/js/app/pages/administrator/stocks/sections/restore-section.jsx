import React, { useState } from "react";
// import { FaSquarePlus, FaTrashRestore } from "react-icons/fa6";
import Modal from "@/Components/Modal";
import store from "@/app/store/store";
import { restore_thunk } from "@/app/redux/stock-thunk";
import { message, Tooltip } from "antd";
import { get_product_thunk } from "@/app/redux/product-thunk";
import { get_over_due_thunk } from "@/app/redux/cart-thunk";
import { peso_value } from "@/app/lib/peso";

export default function RestoreSection({ data }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRestore = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await store.dispatch(
                restore_thunk({
                    product_id: String(data?.id),
                    products: { id: String(data?.id) },
                })
            );
            await store.dispatch(get_over_due_thunk());
            await store.dispatch(get_product_thunk());
            message.success("Successfully restored!");
            setModalOpen(false);
        } catch (error) {
            message.error("Failed to restore. Please try again.");
            console.error('Restore error:', error);
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
                    className="relative inline-flex items-center rounded-md bg-green-400 w-full p-3 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-green-600 "
                >
                    {/* <FaTrashRestore className="text-green-100" /> */}
                    Restore
                </button>
            </Tooltip>

            <Modal open={modalOpen} setOpen={setModalOpen}>
                <form onSubmit={handleRestore}>
                    <div className="mt-6 flex flex-col gap-5">
                        <h1 className="text-xl">
                            Are you sure you want to restore <b>{data?.name}</b> with <b>{peso_value(Number(data.cost))}</b> cost price?
                        </h1>
                    </div>
                    <div className="flex gap-3 mt-5">
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
