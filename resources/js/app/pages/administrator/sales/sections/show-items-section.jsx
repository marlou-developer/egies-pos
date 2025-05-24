import Modal from "@/app/_components/modal";
import moment from "moment";
import React, { useState } from "react";

export default function ShowItemSection({ data }) {
    console.log("datadata", data);
    const [open, setOpen] = useState(false);
    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-green-100 hover:bg-green-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset"
            >
                Show Item
            </button>
            <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                title={<h2 class="text-2xl font-semibold mb-4">Show Items</h2>}
                width="max-w-3xl"
            >
                <div>
                    <div className="font-bold">Invoice #: {data.cart_id}</div>
                    <div class="overflow-x-auto">
                        <table class="min-w-full text-sm text-left border border-gray-200 rounded-lg">
                            <thead class="bg-gray-100 text-gray-700">
                                <tr>
                                    <th class="px-4 py-2 border-b">
                                        Product Name
                                    </th>
                                    <th class="px-4 py-2 border-b">Price</th>
                                    <th class="px-4 py-2 border-b">Quantity</th>
                                    <th class="px-4 py-2 border-b">Status</th>
                                    <th class="px-4 py-2 border-b">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.cart_items?.map((res) => {
                                    return (
                                        <tr class="hover:bg-gray-50">
                                            <td class="px-4 py-2 border-b">
                                                {res?.product?.name}
                                            </td>
                                            <td class="px-4 py-2 border-b">
                                                {res.price}
                                            </td>
                                            <td class="px-4 py-2 border-b">
                                                {res.quantity}
                                            </td>
                                            <td class="px-4 py-2 border-b text-green-600">
                                                Paid
                                            </td>
                                            <td class="px-4 py-2 border-b">
                                                {res.total}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-2 py-3">
                      <div className="w-full flex items-center justify-end">
                          <div className="text-xl font-black">
                            Total: {Number(data.total_price).toFixed(2)}
                          </div>
                      </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}
