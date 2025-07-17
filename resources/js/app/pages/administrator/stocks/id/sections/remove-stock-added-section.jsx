
import { delete_cart_item_thunk, delete_cart_thunk, get_cart_by_id_thunk } from "@/app/redux/cart-thunk";
import { delete_product_thunk, get_product_thunk } from "@/app/redux/product-thunk";
import { delete_stock_thunk, get_stock_by_products_id_thunk } from "@/app/redux/stock-thunk";
import { delete_supplier_thunk, get_supplier_thunk } from "@/app/redux/supplier-thunk";
import { delete_user_thunk, get_users_thunk } from "@/app/redux/user-thunk";
import store from "@/app/store/store";
import Modal from "@/Components/Modal";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import { message, Tooltip } from "antd";
import React, { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";

export default function RemoveStockAddedSection({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const [loading, setLoading] = useState(false);
    const product_id = window.location.pathname.split("/")[3];


    const deleteStock = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Delete the stock record (this will also update the product quantity on the backend)
            await store.dispatch(
                delete_stock_thunk({
                    id: data.id,
                    quantity: data.quantity,
                    product_id: data.product_id
                })
            );
            
            // Refresh the stock list for this product
            await store.dispatch(get_stock_by_products_id_thunk(product_id));
            
            // Refresh the product data to show updated quantity
            await store.dispatch(get_product_thunk());
            
            message.success("Stock removed successfully! Product quantity has been updated.");
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error removing stock:", error);
            message.error("Failed to remove stock. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Tooltip title="Remove Added Stock">
                <button
                    className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-red-400 hover:bg-red-500 p-3 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset"
                    onClick={openModal}
                >
                    <FaTrashCan className="size-3.5 text-white" />
                </button>
            </Tooltip>
            <Modal open={isModalOpen} setOpen={setIsModalOpen} onClose={() => setIsModalOpen(false)} width="w-1/3">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-4">
                        Remove Stock Entry
                    </h2>
                    <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                        <p className="text-sm text-gray-700 mb-2">
                            Are you sure you want to remove this stock entry?
                        </p>
                        <p className="text-sm text-gray-600">
                            <strong>Quantity to remove:</strong> {data.quantity}
                        </p>
                        <p className="text-sm text-yellow-700 mt-2">
                            <strong>Note:</strong> This will also decrease the product's total quantity by {data.quantity} units.
                        </p>
                    </div>
                </div>
                <form action="" onSubmit={deleteStock}>
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
                            className="bg-red-500 p-2 w-full rounded-md text-white hover:bg-red-600 disabled:opacity-50"
                        >
                            {loading ? 'Removing...' : 'Remove Stock'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
