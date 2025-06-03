import Button from "@/app/_components/button";
import Modal from "@/app/_components/modal";
import { update_all_status_service } from "@/app/pages/services/cart-service";
import { setSelectedProducts } from "@/app/redux/cart-slice";
import { get_shopee_thunk, update_status_thunk } from "@/app/redux/cart-thunk";
import store from "@/app/store/store";
import React, { useEffect, useState } from "react";
import { FaCheckToSlot } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function MultiUpdateSection() {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { selectedProducts } = useSelector((store) => store.carts);

    async function update_status() {
        try {
            setLoading(true);
            await update_all_status_service({
                ...form,
                data: selectedProducts,
            });
            await store.dispatch(get_shopee_thunk());
            await Swal.fire({
                icon: "success",
                title: "Your Shopee has been updated",
                showConfirmButton: false,
                timer: 1500,
            });
            dispatch(setSelectedProducts([]));
            setLoading(false);
            setOpen(false);
        } catch (error) {
            setLoading(false);
        }
    }
    console.log("selectedProducts", selectedProducts);
    return (
        <div>
            {selectedProducts.length != 0 && (
                <button
                    onClick={() => setOpen(true)}
                    className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-yellow-100 hover:bg-yellow-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset"
                >
                    <FaCheckToSlot className=" text-yellow-500" />
                    {selectedProducts.length} Update
                </button>
            )}

            <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                title="Update Status"
                width="max-w-lg"
            >
                <table className="min-w-full border-separate border-spacing-0">
                    <thead>
                        <tr>
                            {["Customer", "Invoice No."].map((header, idx) => (
                                <th
                                    key={idx}
                                    className={classNames(
                                        "sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5 px-3 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter",
                                        idx === 5 && "pr-4 sm:pr-6 lg:pr-8"
                                    )}
                                >
                                    {header || (
                                        <span className="sr-only">Actions</span>
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {selectedProducts?.map((res, idx) => {
                            return (
                                <tr key={idx}>
                                    <td className="whitespace-nowrap border-b border-gray-200 px-3 py-4 text-sm font-medium text-gray-900">
                                        {res.customer}
                                    </td>
                                    <td className="whitespace-nowrap border-b border-gray-200 px-3 py-4 text-sm font-medium text-gray-900">
                                        {res.cart_id}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
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
                        label="Status"
                    >
                        <option disabled selected>
                            Status:
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
                        UPDATE ALL
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
