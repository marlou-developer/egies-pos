import { update_cart_created_at_service } from "@/app/pages/services/cart-service";
import { get_cart_by_id_thunk } from "@/app/redux/cart-thunk";
import { get_all_customers_thunk } from "@/app/redux/customer-thunk";
import store from "@/app/store/store";
import Modal from "@/Components/Modal";
import VerifyPinModal from "@/app/_components/verify-pin-modal";
import { PencilIcon } from "@heroicons/react/24/outline";
import { message, Tooltip } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function UpdateCreatedAt({ data }) {
    const { customers } = useSelector((state) => state.customers);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pinOpen, setPinOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        date: "",
        time: "",
    });

    const cart_id = window.location.pathname.split("/")[4];

    useEffect(() => {
        store.dispatch(get_all_customers_thunk());
    }, []);

    useEffect(() => {
        // Split existing created_at into date & time parts
        const formattedDate = moment(data.created_at).format("YYYY-MM-DD");
        const formattedTime = moment(data.created_at).format("HH:mm:ss");

        setForm({
            ...data,
            date: formattedDate,
            time: formattedTime,
        });
    }, [data]);

    const openModal = () => setPinOpen(true);

    const editCustomer = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Combine date and time into a full datetime string
            const combinedDateTime = moment(
                `${form.date} ${form.time}`,
                "YYYY-MM-DD HH:mm:ss"
            ).format("YYYY-MM-DD HH:mm:ss");

            await update_cart_created_at_service({
                id: data.id,
                created_at: combinedDateTime,
            });

            await store.dispatch(get_cart_by_id_thunk(cart_id));
            message.success("Updated Successfully!");
            setIsModalOpen(false);
        } catch (error) {
            console.error(error);
            message.error("Failed to update invoice date & time.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Tooltip title="Edit Invoice Date & Time">
                <button
                    className="text-blue-500 font-bold"
                    type="button"
                    onClick={openModal}
                >
                    <PencilIcon className="h-4 w-4 mb-1 inline-block" />
                </button>
            </Tooltip>

            <VerifyPinModal
                isOpen={pinOpen}
                onClose={() => setPinOpen(false)}
                onVerified={() => {
                    setPinOpen(false);
                    setIsModalOpen(true);
                }}
                actionLabel="update invoice date & time"
            />
            <Modal open={isModalOpen} setOpen={setIsModalOpen} width="w-1/4">
                <h2 className="text-xl font-semibold mb-4">
                    Edit Invoice Date & Time
                </h2>

                <form onSubmit={editCustomer}>
                    <div className="flex w-full gap-2">
                        {/* Date */}
                        <div className="mb-4 w-full">
                            <label className="block text-sm font-medium text-gray-700">
                                Invoice Date
                            </label>
                            <input
                                type="date"
                                value={form.date || ""}
                                onChange={(e) =>
                                    setForm({ ...form, date: e.target.value })
                                }
                                className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 focus:ring-pink-300 focus:border-pink-300 sm:text-sm"
                            />
                        </div>

                        {/* Time */}
                        <div className="mb-4 w-full">
                            <label className="block text-sm font-medium text-gray-700">
                                Invoice Time
                            </label>
                            <input
                                type="time"
                                value={form.time || ""}
                                onChange={(e) =>
                                    setForm({ ...form, time: e.target.value })
                                }
                                className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 focus:ring-pink-300 focus:border-pink-300 sm:text-sm"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-pink-400 p-2 w-full rounded-md text-white hover:bg-pink-300"
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </form>
            </Modal>
        </>
    );
}
