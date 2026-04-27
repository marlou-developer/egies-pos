
import VerifyPinModal from "@/app/_components/verify-pin-modal";
import { delete_customer_thunk, get_customer_thunk } from "@/app/redux/customer-thunk";
import store from "@/app/store/store";
import Modal from "@/Components/Modal";
import { message, Tooltip } from "antd";
import React, { useState, useEffect } from "react";
import { FaTrashCan } from "react-icons/fa6";

export default function DeleteCustomerSection({ data, isOpen, setIsOpen }) {
    const [pinOpen, setPinOpen] = useState(false);
    const [reallyOpen, setReallyOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsOpen(false);
            setPinOpen(true);
        }
    }, [isOpen]);

    const deleteCustomer = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await store.dispatch(
                delete_customer_thunk(data.id)
            );
            store.dispatch(get_customer_thunk())
            message.success("Removed Successfully!");
            setReallyOpen(false);
        } catch (error) {
            message.error("Failed to Removed Customer. Please try again."); // Show error message
        } finally {
            setLoading(false); // Always reset loading state
        }
    };

    const handleClose = () => {
        setReallyOpen(false);
    };

    return (
        <>
            <VerifyPinModal
                isOpen={pinOpen}
                onClose={() => setPinOpen(false)}
                onVerified={() => {
                    setPinOpen(false);
                    setReallyOpen(true);
                }}
                actionLabel="delete this customer"
            />
            <Modal open={reallyOpen} setOpen={setReallyOpen} onClose={() => setReallyOpen(false)} width="w-1/4">
                <h2 className="text-xl font-semibold mb-4">
                    Are you sure you want to remove this Customer?
                </h2>
                <form action="" onSubmit={deleteCustomer}>
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
