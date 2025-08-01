import Modal from "@/app/_components/modal";
import { peso_value } from "@/app/lib/peso";
import { Tooltip } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { FaClockRotateLeft } from "react-icons/fa6";

export default function HistorySection({ data }) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Tooltip title="View Payment History">
                <button
                    onClick={() => setOpen(true)}
                    className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-green-500 hover:bg-green-700 p-3 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset"
                >
                    <FaClockRotateLeft className=" text-white" />
                    {/* Payments */}
                </button>
            </Tooltip>

            <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                title={
                    <h2 class="text-2xl font-semibold mb-4">Payment History</h2>
                }
                width="max-w-xl"
            >
                <div>
                    <div className="font-bold">Invoice #: {data.cart_id}</div>
                    <div class="overflow-x-auto">
                        <table class="min-w-full text-sm text-left border border-gray-200 rounded-lg">
                            <thead class="bg-gray-100 text-gray-700">
                                <tr>
                                    <th class="px-4 py-2 border-b">Date</th>
                                    <th class="px-4 py-2 border-b">Amount</th>
                                    <th class="px-4 py-2 border-b">Status</th>
                                    <th class="px-4 py-2 border-b">Method</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.credit_payments?.map((res) => {
                                    return (
                                        <tr class="hover:bg-gray-50">
                                            <td class="px-4 py-2 border-b">
                                                {moment(res.created_at).format(
                                                    "LLL"
                                                )}
                                            </td>
                                            <td class="px-4 py-2 border-b">
                                                {peso_value(Number(res.amount))}
                                            </td>
                                            <td class="px-4 py-2 border-b text-green-600">
                                                Paid
                                            </td>
                                            <td class="px-4 py-2 border-b">
                                                {res.payment_type}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal>
        </>
    );
}
