import Modal from "@/app/_components/modal";
import moment from "moment";
import React, { useState } from "react";
import { FaClockRotateLeft } from "react-icons/fa6";

export default function StocksHistorySection({ data }) {
    const [open, setOpen] = useState(false);
    console.log('datass', data)
    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-green-100 hover:bg-green-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset"
            >
                <FaClockRotateLeft />
                Stock History
            </button>
            <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                title={
                    <h2 class="text-2xl font-semibold mb-4">Stock History</h2>
                }
                width="max-w-5xl"
            >
                <div>
                    <div class="overflow-x-auto">
                        <table class="min-w-full text-sm text-left border border-gray-200 rounded-lg">
                            <thead class="bg-gray-100 text-gray-700">
                                <tr>
                                    <th class="px-4 py-2 border-b">Delivery Receipt</th>
                                    <th class="px-4 py-2 border-b">Quantity</th>
                                    <th class="px-4 py-2 border-b">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.stocks?.map((res) => {
                                    return (
                                        <tr class="hover:bg-gray-50">
                                            <td class="px-4 py-2 border-b">
                                                {res.delivery_id}
                                            </td>
                                            <td class="px-4 py-2 border-b">
                                                {res.quantity}
                                            </td>
                                            <td class="px-4 py-2 border-b">
                                                {res.date}
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
