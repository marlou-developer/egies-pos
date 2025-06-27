import Modal from "@/app/_components/modal";
import { Tooltip } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { FaClockRotateLeft } from "react-icons/fa6";

export default function StocksHistorySection({ data }) {
    const [open, setOpen] = useState(false);
    console.log('datass', data)
    return (
        <>
            <Tooltip title="View Stock History">
                <button
                    onClick={() => setOpen(true)}
                    className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-green-500 hover:bg-green-700 p-3 text-sm font-semibold text-white shadow-xs ring-1 ring-gray-300 ring-inset"
                >
                    <FaClockRotateLeft />
                    {/* Stock History */}
                </button>
            </Tooltip>

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
                                    <th class="px-4 py-2 border-b">Supplier</th>
                                    <th class="px-4 py-2 border-b">Quantity</th>
                                    <th class="px-4 py-2 border-b">Remaining Stocks Before Delivery</th>
                                    <th class="px-4 py-2 border-b">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.stocks
                                    ?.slice()
                                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                                    .map((res) => {
                                        return (
                                            <tr className="hover:bg-gray-50" key={res.delivery_id}>
                                                <td className="px-4 py-2 border-b">{res.delivery_id}</td>
                                                <td className="px-4 py-2 border-b">{res?.supplier?.name}</td>
                                                <td className="px-4 py-2 border-b">{res.quantity}</td>
                                                <td className="px-4 py-2 border-b">{res.remaining}</td>
                                                <td className="px-4 py-2 border-b">{res.date}</td>
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
