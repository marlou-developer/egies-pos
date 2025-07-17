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
    console.log("stocksstocks", stocks);
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold text-gray-900">
                        Edit Stock
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the Stock in your account.
                    </p>
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
                                        Remaining Stocks Before Delivery
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Added At
                                    </th>

                                    <th
                                        scope="col"
                                        className="relative py-3.5 pr-4 pl-3 sm:pr-0"
                                    >
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {[...stocks]
                                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                                    .map((res, index) => (
                                        <tr key={res.email}>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                                                {res.products.name}
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
                                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                                {res.remaining}
                                            </td>
                                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                                {moment(res.date).format('LL')}
                                            </td>
                                            <td className="relative flex gap-2 py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                                                {/* {index === 0 && ( */}
                                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                    <EditQuantitySection data={res} />
                                                </a>
                                                <RemoveStockAddedSection data={res} />
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
