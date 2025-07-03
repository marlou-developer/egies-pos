import { useState } from "react";
import { useSelector } from "react-redux";
// import EditQuantitySection from "./edit-quantity-section";
import moment from "moment";
import { peso_value } from "@/app/lib/peso";
import SalesEditQuantitySection from "./sales-edit-quantity-section";
import AddProductSection from "./add-product-section";
import RemoveProductSection from "./remove-product-section";
import EditDIscountSection from "./edit-discount-section";

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
                        <table className="min-w-full divide-y divide-gray-300">
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
                                            {res.product.name}
                                        </td>
                                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                            <SalesEditQuantitySection
                                                data={res}
                                            />
                                        </td>
                                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                            {res?.price}
                                        </td>
                                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                            {res?.total}
                                        </td>
                                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                            <RemoveProductSection data={res} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex flex-col items-end justify-end">
                            <div>Payment Status: &nbsp;{cart?.status}</div>
                            <div>
                                Subtotal Price:{" "}
                                {peso_value(Number(cart?.sub_total))}
                            </div>
                            <div>
                                Customer Total Discount:{" "}
                                {peso_value(
                                    Number(cart?.customer_total_discount)
                                )}
                            </div>
                            <div>
                                Total Discount Per Item:{" "}
                                {peso_value(Number(cart?.discount_per_item))}
                            </div>
                            <div>
                                Total Discount Per Order:{" "}
                                {peso_value(Number(cart?.discount_per_order))}
                            </div>
                            <div>
                                Total Discount Price:
                                {peso_value(
                                    Number(cart?.customer_total_discount ?? 0) +
                                        Number(cart?.discount_per_item ?? 0) +
                                        Number(cart?.discount_per_order ?? 0)
                                )}{" "}
                            </div>

                            <hr />
                            <div>
                                Total: {peso_value(Number(cart?.total_price))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
