import { return_per_item_service } from "@/app/pages/services/cart-service";
import { get_cart_by_id_thunk } from "@/app/redux/cart-thunk";

import store from "@/app/store/store";
import Modal from "@/Components/Modal";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { message, Tooltip } from "antd";
import React, { useEffect, useState } from "react";

export default function ReturnItemSection({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const [loading, setLoading] = useState(false);
    const cart_id = window.location.pathname.split("/")[4];
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        setQuantity(data.quantity);
    }, []);
    const deleteUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await return_per_item_service({
                ...data,
                quantity: quantity,
            });
            await store.dispatch(get_cart_by_id_thunk(cart_id));
            message.success("Return Successfully!");
            setIsModalOpen(false);
        } catch (error) {
            message.error("Failed to Return Item. Please try again."); // Show error message
        } finally {
            setLoading(false); // Always reset loading state
        }
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };
    const isExceeded = Number(data.quantity) < quantity;
    console.log("datadata", Number(data.quantity));
    return (
        <>
            <Tooltip title="Return Product on Sales">
                <button
                    className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-green-400 hover:bg-green-500 p-3 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset"
                    onClick={openModal}
                >
                    <ArrowPathIcon className="size-3.5 text-white" />
                </button>
            </Tooltip>
            <Modal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                onClose={() => setIsModalOpen(false)}
                width="w-1/4"
            >
                <h2 className="text-xl font-semibold mb-4">
                    Are you sure you want to return the {data?.product?.name}?
                </h2>

                {isExceeded && (
                    <div className="text-red-500">
                        The quantity of {data?.product?.name} is exceeded.
                    </div>
                )}

                <form className="flex flex-col gap-5" onSubmit={deleteUser}>
                    <input
                        type="number"
                        defaultValue={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        // onKeyDown={handleKeyDown}
                        autoFocus
                        placeholder="Quantity"
                        className="border px-2 py-1 w-full"
                    />
                    <div className="flex w-full gap-5">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="bg-blue-400 p-2 w-full rounded-md text-white hover:bg-blue-300"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={loading || isExceeded}
                            type="submit"
                            className="bg-green-400 p-2 w-full rounded-md text-white hover:bg-green-300"
                        >
                            {loading ? "Loading..." : "Confirm"}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
