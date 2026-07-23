import { useState } from "react";
import { useSelector } from "react-redux";
import EditQuantitySection from "./edit-quantity-section";
import moment from "moment";
import RemoveStockAddedSection from "./remove-stock-added-section";

const people = [
    {
        name: "Lindsay Walton",
        title: "Front-end Developer",
        email: "lindsay.walton@example.com",
        role: "Member",
    },
    // More people...
];

export default function TableSection() {
    const { stocks } = useSelector((store) => store.stocks);
    const { user } = useSelector((store) => store.app);
    console.log("stocksstocks", stocks);
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto flex justify-between">
                    <div>
                        <h1 className="text-base font-semibold text-gray-900">
                            Edit Stock Entries
                        </h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all the Stock Entries in your account.
                        </p>
                    </div>
                    <div className="mr-7">
                        <p className="mt-2 text-sm text-gray-700">🟩-Added</p>
                        <p className="mt-2 text-sm text-gray-700">
                            🟥-Deducted
                        </p>
                    </div>
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
                                        className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Product Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Receipt / Statement
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Supplier
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
                                        <th class="px-4 py-2 border-b">
                                            Remaining Stocks Before
                                            <br />
                                            Delivery/Deduction
                                        </th>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Added Date
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {[...stocks]
                                    .sort(
                                        (a, b) =>
                                            new Date(b.date) - new Date(a.date),
                                    )
                                    .map((res, index) => (
                                        <tr
                                            className={
                                                res.status === "deducted"
                                                    ? "bg-red-100"
                                                    : "bg-green-100"
                                            }
                                            key={res.email}
                                        >
                                            <td className="py-4 pr-3 pl-5 text-sm font-medium whitespace-nowrap text-gray-900">
                                                {res.products.name}
                                            </td>
                                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                                {res?.delivery_id}
                                            </td>
                                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                                {res?.supplier?.name}
                                            </td>
                                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                                {res.quantity}
                                            </td>
                                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                                ₱{Number(res.price).toFixed(2)}
                                            </td>
                                            <td className="px-8 py-4 text-sm whitespace-nowrap text-gray-500">
                                                {res.remaining}
                                            </td>
                                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                                {moment(res.date).format("LL")}
                                            </td>
                                            <td className="relative flex gap-2 py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                                                {/* {index === 0 && ( */}
                                                <a
                                                    href="#"
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    <EditQuantitySection
                                                        data={res}
                                                    />
                                                </a>
                                                {(user?.user_type === "Admin" ||
                                                    user?.user_type ===
                                                        "Super Admin") && (
                                                    <RemoveStockAddedSection
                                                        data={res}
                                                    />
                                                )}

                                                {/* )} */}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
