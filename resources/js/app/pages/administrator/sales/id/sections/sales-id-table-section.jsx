import { useState } from "react";
import { useSelector } from "react-redux";
// import EditQuantitySection from "./edit-quantity-section";
import moment from "moment";
import { peso_value } from "@/app/lib/peso";
import SalesEditQuantitySection from "./sales-edit-quantity-section";
import AddProductSection from "./add-product-section";
import RemoveProductSection from "./remove-product-section";
import EditDIscountSection from "../../../credits/id/ids/sections/edit-discount-section";
import ReturnItemSection from "./return-item-section";

const people = [
    {
        name: "Lindsay Walton",
        title: "Front-end Developer",
        email: "lindsay.walton@example.com",
        role: "Member",
    },
    // More people...
];

export default function SalesIdTableSection() {
    const { cart } = useSelector((store) => store.carts);
    console.log("cartscarts", cart);
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold text-gray-900">
                        Edit Carts
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the Carts in your account.
                    </p>
                </div>
                <div className="flex gap-3">
                    <EditDIscountSection data={cart} />
                    <AddProductSection />
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300 border-b-4 mb-5">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                    >
                                        Product Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Quantity
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Price
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {cart?.cart_items?.map((res, index) => (
                                    <tr key={res?.email}>
                                        <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                                            {res.product?.name}
                                        </td>
                                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                            <SalesEditQuantitySection
                                                data={res}
                                            />
                                        </td>
                                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                            {peso_value(Number(res?.price ?? 0))}
                                        </td>
                                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                            {peso_value(Number(res?.total ?? 0))}
                                        </td>
                                        <td className="px-3 py-4 gap-2 flex  text-sm whitespace-nowrap text-gray-500">
                                            {Number(res.quantity) != 0 && (
                                                <>
                                                    <RemoveProductSection
                                                        data={res}
                                                    />
                                                    <ReturnItemSection
                                                        data={res}
                                                    />
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex flex-col items-end justify-end">
                            <div className="w-1/4">
                                <div className="flex justify-between">
                                    Payment Status: <div>{cart?.status ?? "Loading..."}</div>
                                </div>

                                <div className="flex justify-between">
                                    Subtotal Price:{" "}
                                    <div>{peso_value(Number(cart?.sub_total ?? 0))}</div>
                                </div>

                                <div className="flex justify-between">
                                    Customer Total Discount:{" "}
                                    <div>{peso_value(Number(cart?.customer_total_discount ?? 0))}</div>
                                </div>

                                <div className="flex justify-between">
                                    Total Discount Per Item:{" "}
                                    <div>{peso_value(Number(cart?.discount_per_item ?? 0))}</div>
                                </div>

                                <div className="flex justify-between">
                                    Total Discount Per Order:{" "}
                                    <div>{peso_value(Number(cart?.discount_per_order ?? 0))}</div>
                                </div>

                                <div className="flex justify-between">
                                    Overall Total Discount Price:
                                    <div>
                                        {peso_value(
                                            Number(cart?.customer_total_discount ?? 0) +
                                            Number(cart?.discount_per_item ?? 0) +
                                            Number(cart?.discount_per_order ?? 0)
                                        )}
                                    </div>
                                </div>

                                <hr className="my-4 border-t border-gray-300 lg:my-3" />

                                <div className="flex justify-between">
                                    Total: <div>{peso_value(Number(cart?.total_price ?? 0))}</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
