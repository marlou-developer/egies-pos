import React, { useState } from "react";
import { FaSquarePlus, FaTrashArrowUp } from "react-icons/fa6";
import Modal from "@/Components/Modal";
import Input from "@/app/_components/input";
import store from "@/app/store/store";
import { create_stock_thunk, soft_delete_thunk } from "@/app/redux/stock-thunk";
import { message, Tooltip } from "antd";
import { get_product_thunk } from "@/app/redux/product-thunk";
import { get_over_due_thunk } from "@/app/redux/cart-thunk";
import { useSelector } from "react-redux";
import { peso_value } from "@/app/lib/peso";

export default function SoftDeleteSection({ data }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [costOption, setCostOption] = useState("same");
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({});
    const { suppliers } = useSelector((store) => store.suppliers)
    const softDelete = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await store.dispatch(
                soft_delete_thunk({
                    ...form,
                    product_id: String(data?.id),
                    products: { id: String(data?.id) },
                    price: costOption === "same" ? data?.cost : null,
                    remaining: String(data?.quantity),
                })
            );
            await store.dispatch(get_over_due_thunk());
            await store.dispatch(get_product_thunk());
            message.success("Product Removed Successfully!");
            setModalOpen(false);
            setForm({});
            setCostOption("same");
        } catch (error) {
            message.error("Failed to soft delete. Please try again.");
            console.error('Soft delete error:', error);
        } finally {
            setLoading(false);
        }
    };

    console.log('suppliers', suppliers)
    return (
        <div>
            <Tooltip title="Removed Product">
                <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="relative inline-flex items-center rounded-md bg-red-400 w-full p-3 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-red-600 "
                >
                    <FaTrashArrowUp className=" text-red-100" />
                    {/* Add Stocks */}
                </button>
            </Tooltip>


            <Modal open={modalOpen} setOpen={setModalOpen}>
                <form onSubmit={softDelete}>
                    <div className="mt-6 flex flex-col gap-5">
                        <h1 className="text-xl">
                            Are you sure to remove <b>{data?.name}</b> with <b>{peso_value(Number(data.cost))}</b> cost price to soft delete?
                        </h1>

                    </div>
                    <div className="flex gap-2 mt-5 justify-end">
                        <button
                            type="button"
                            onClick={() => setModalOpen(false)}
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
        </div>
    );
}
