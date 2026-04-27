import { get_cart_credit_thunk } from "@/app/redux/app-thunk";
import {
    delete_credit_payment_thunk,
    get_over_due_thunk,
} from "@/app/redux/cart-thunk";
import store from "@/app/store/store";
import Modal from "@/Components/Modal";
import { TrashIcon } from "@heroicons/react/24/outline";
import { message, Tooltip } from "antd";
import React, { useState } from "react";
import VerifyPinModal from "@/app/_components/verify-pin-modal";

export default function DeletePaymentSection({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pinOpen, setPinOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const deletePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await store.dispatch(delete_credit_payment_thunk(data.id));
            await store.dispatch(get_cart_credit_thunk());
            await store.dispatch(get_over_due_thunk());
            message.success("Removed Successfully!");
            setIsModalOpen(false);
        } catch (error) {
            message.error("Failed to Delete Payment. Please try again."); // Show error message
        } finally {
            setLoading(false); // Always reset loading state
        }
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Tooltip title="Delete Payment">
                <button type="button" onClick={() => setPinOpen(true)}>
                    <TrashIcon className="w-5 h-5 inline-block ml-2 text-red-500 cursor-pointer" />
                </button>
            </Tooltip>
            <VerifyPinModal
                isOpen={pinOpen}
                onClose={() => setPinOpen(false)}
                onVerified={() => {
                    setPinOpen(false);
                    setIsModalOpen(true);
                }}
                actionLabel="delete this payment"
            />
            <Modal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                onClose={() => setIsModalOpen(false)}
                width="w-1/4"
            >
                <h2 className="text-xl font-semibold mb-4">
                    Are you sure you want to remove this payment?
                </h2>
                <form action="" onSubmit={deletePayment}>
                    <div className="flex w-full gap-5">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="bg-red-400 p-2 w-full rounded-md text-white hover:bg-red-300"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={loading}
                            type="submit"
                            className="bg-blue-400 p-2 w-full rounded-md text-white hover:bg-blue-300"
                        >
                            {loading ? "Loading..." : "Confirm"}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
