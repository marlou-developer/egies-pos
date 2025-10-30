import Input from "@/app/_components/input";
import Modal from "@/app/_components/modal";
import { peso_value } from "@/app/lib/peso";
import { get_cart_credit_thunk } from "@/app/redux/app-thunk";
import { get_over_due_thunk } from "@/app/redux/cart-thunk";
import {
    edit_payment_service,
    update_payment_service,
} from "@/app/pages/services/cart-service";
import store from "@/app/store/store";
import {
    PencilIcon,
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import { Tooltip } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaClockRotateLeft } from "react-icons/fa6";
import Swal from "sweetalert2";

export default function UpdatePaymentSection({ data }) {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setForm({
            cart_id: data?.cart_id,
            date: data?.created_at
                ? moment(data.created_at).format("YYYY-MM-DDTHH:mm")
                : "",
            amount: data?.amount || "",
            payment_type: data?.payment_type || "",
        });
    }, [open, data]);

    async function update_payment(e) {
        e.preventDefault();
        try {
            setLoading(true);
            await update_payment_service(form);
            await store.dispatch(get_cart_credit_thunk());
            await store.dispatch(get_over_due_thunk());
            await Swal.fire({
                icon: "success",
                title: "Payment updated successfully",
                showConfirmButton: false,
                timer: 1500,
            });
            setOpen(false);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            await Swal.fire({
                icon: "error",
                title: "Error updating payment",
                text: error.message || "Something went wrong",
                showConfirmButton: true,
            });
        }
    }

    console.log("datadata", data);

    return (
        <>
            <Tooltip title="Edit Payment">
                <button onClick={() => setOpen(true)}>
                    <PencilSquareIcon className="w-5 h-5 inline-block ml-2 text-blue-500 cursor-pointer" />
                </button>
            </Tooltip>
            <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                title={
                    <h2 class="text-2xl font-semibold mb-4">Edit Payment</h2>
                }
                width="max-w-xl"
            >
                <div>
                    <div className="font-bold mb-2">
                        Invoice #: {data.cart_id}
                    </div>
                    <form action="" onSubmit={update_payment}>
                        <div className="mb-4">
                            <Input
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        date: e.target.value,
                                    })
                                }
                                isNotDateBack={true}
                                value={form.date}
                                type="datetime-local"
                                label="Date & Time"
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                name="amount"
                                value={form.amount}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        amount: e.target.value,
                                    })
                                }
                                type="number"
                                label="Amount"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <select
                                value={form.payment_type}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        payment_type: e.target.value,
                                    })
                                }
                                className="rounded-md py-2.5 w-full"
                                required
                            >
                                <option value="" disabled>
                                    Select Mode of Payment
                                </option>
                                <option value="Cash">Cash</option>
                                <option value="E-Wallet">E-Wallet</option>
                                <option value="Bank Transfer">
                                    Bank Transfer
                                </option>
                                <option value="Credit/Debit Card">
                                    Credit/Debit Card
                                </option>
                            </select>
                        </div>
                        <div className="flex justify-end gap-x-2">
                            <button
                                type="button"
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                            >
                                {loading ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}
