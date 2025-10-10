
import { delete_customer_thunk, get_customer_thunk } from "@/app/redux/customer-thunk";
import store from "@/app/store/store";
import Modal from "@/Components/Modal";
import { message, Tooltip } from "antd";
import React, { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";

export default function DeleteCustomerSection({ data, isOpen, setIsOpen }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const [loading, setLoading] = useState(false);

    const deleteCustomer = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await store.dispatch(
                delete_customer_thunk(data.id)
            );
            store.dispatch(get_customer_thunk())
            message.success("Removed Successfully!");
            setIsOpen(false);
        } catch (error) {
            message.error("Failed to Removed Customer. Please try again."); // Show error message
        } finally {
            setLoading(false); // Always reset loading state
        }
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Modal open={isOpen} setOpen={setIsOpen} onClose={() => setIsOpen(false)} width="w-1/4">
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
