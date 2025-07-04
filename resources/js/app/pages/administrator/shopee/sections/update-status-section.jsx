import Button from "@/app/_components/button";
import Modal from "@/app/_components/modal";
import { get_shopee_thunk, update_status_thunk } from "@/app/redux/cart-thunk";
import store from "@/app/store/store";
import { Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { FaCheckToSlot } from "react-icons/fa6";
import Swal from "sweetalert2";

export default function UpdateStatusSection({ data }) {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setForm(data);
    }, [open]);
    async function update_status() {
        try {
            setLoading(true);
            await store.dispatch(
                update_status_thunk({
                    ...data,
                    ...form,
                })
            );
            await store.dispatch(get_shopee_thunk());
            await Swal.fire({
                icon: "success",
                title: "Your Shopee has been updated",
                showConfirmButton: false,
                timer: 1500,
            });
            setLoading(false);
            setOpen(false);
        } catch (error) {
            setLoading(false);
        }
    }
    return (
        <div>
            <Tooltip title="Update Status">
                <button
                    onClick={() => setOpen(true)}
                    className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-yellow-300 hover:bg-yellow-400 p-3 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset"
                >
                    <FaCheckToSlot className="text-gray-500 " />
                </button>
            </Tooltip>

            <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                title="Update Status"
                width="max-w-lg"
            >
                <div className="text-red-500">
                    Selecting "Return" will return all items/products.
                </div>
                <div className="flex  flex-col w-full gap-3 items-end justify-end">
                    <select
                        onChange={(e) =>
                            setForm({
                                ...form,
                                status: e.target.value,
                            })
                        }
                        value={form.status}
                        className="rounded-md w-full text-gray-500"
                        label="Mode of Payment"
                    >
                        <option disabled selected>
                            Mode of Payment:
                        </option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                        <option value="Refunded">Refunded</option>
                        <option value="Returned">Returned</option>
                    </select>
                    <Button
                        className="bg-pink-500 "
                        loading={loading}
                        onClick={update_status}
                    >
                        UPDATE
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
