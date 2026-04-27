import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "@/app/_components/modal";
import { peso_value } from "@/app/lib/peso";
import { TrashIcon } from "@heroicons/react/24/outline";
import { soft_delete_thunk } from "@/app/redux/stock-thunk";
import { get_product_thunk } from "@/app/redux/product-thunk";
import { get_over_due_thunk } from "@/app/redux/cart-thunk";
import { setSelectedProducts } from "@/app/redux/product-slice";
import store from "@/app/store/store";
import { message } from "antd";
import VerifyPinModal from "@/app/_components/verify-pin-modal";

export default function DeleteSelectedSection() {
    const [isOpen, setIsOpen] = useState(false);
    const [pinOpen, setPinOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { products, selectedProducts } = useSelector(
        (state) => state.products
    ) || {
        products: { data: [], total: 0, last_page: 1 },
        selectedProducts: [],
    };

    const deleteSelectedProducts = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Delete each selected product using soft delete
            for (const product of selectedProducts) {
                await store.dispatch(
                    soft_delete_thunk({
                        product_id: String(product?.id),
                        products: { id: String(product?.id) },
                        price: product?.cost,
                        remaining: String(product?.quantity || 0),
                        date: new Date().toISOString().split("T")[0],
                        delivery_id: new Date()
                            .toISOString()
                            .replaceAll("-", "")
                            .replaceAll(":", "")
                            .replaceAll("T", "")
                            .replaceAll(".", "")
                            .slice(0, 12),
                        quantity: String(product?.quantity || 0),
                        supplier_id: product?.supplier_id || null,
                    })
                );
            }

            // Refresh data and clear selections
            await store.dispatch(get_over_due_thunk());
            await store.dispatch(get_product_thunk());
            dispatch(setSelectedProducts([]));

            message.success(
                `${selectedProducts.length} product(s) removed successfully!`
            );
            setIsOpen(false);
        } catch (error) {
            message.error("Failed to remove products. Please try again.");
            console.error("Delete products error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {selectedProducts.length != 0 && (
                <button
                    onClick={() => setPinOpen(true)}
                    className="p-2 flex bg-red-700 rounded-lg hover:bg-red-600 text-white"
                >
                    {selectedProducts.length} <TrashIcon className="h-5 ml-2" />{" "}
                    Remove
                </button>
            )}

            <VerifyPinModal
                isOpen={pinOpen}
                onClose={() => setPinOpen(false)}
                onVerified={() => {
                    setPinOpen(false);
                    setIsOpen(true);
                }}
                actionLabel="remove selected products"
            />

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className="p-6">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Confirm Removal
                        </h2>
                        <p className="text-gray-600">
                            Are you sure you want to remove the following{" "}
                            {selectedProducts.length} product(s)?
                        </p>
                    </div>

                    {/* Product List */}
                    <div className="max-h-64 overflow-y-auto mb-6 border rounded-lg">
                        <div className="bg-gray-50 px-4 py-2 border-b">
                            <h3 className="font-semibold text-gray-700">
                                Selected Products:
                            </h3>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {selectedProducts.map((product, index) => (
                                <div
                                    key={product.id || index}
                                    className="px-4 py-3 flex items-center justify-between"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3">
                                            {product.uploads &&
                                                product.uploads.length > 0 && (
                                                    <img
                                                        src={
                                                            product.uploads[0]
                                                                .file
                                                        }
                                                        alt={product.name}
                                                        className="w-10 h-10 object-cover rounded"
                                                    />
                                                )}
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {product.name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    ID: {product.id}
                                                </p>
                                                {product.brand && (
                                                    <p className="text-sm text-gray-500">
                                                        Brand: {product.brand}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">
                                            Status: {
                                                product.quantity == 0 ? (
                                                    <span className="text-red-600 font-medium">Out of Stock</span>
                                                ) : product.quantity >= 1 && product.quantity <= 10 ? (
                                                    <span className="text-yellow-600 font-medium">Low Stock</span>
                                                ) : (
                                                    <span className="text-green-600 font-medium">In Stock</span>
                                                )
                                            }
                                        </p>
                                        <p className="text-sm font-medium text-gray-900">
                                            Qty: {product.quantity || 0}
                                        </p>
                                        {product.cost && (
                                            <p className="text-sm text-gray-500">
                                                {peso_value(product.cost)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={deleteSelectedProducts}
                            disabled={loading}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Removing..." : "Yes, Remove"}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
