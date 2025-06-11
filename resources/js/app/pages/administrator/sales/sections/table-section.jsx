import React from "react";
import {
    FaCashRegister,
    FaFilter,
    FaMoneyBill,
    FaReceipt,
    FaUserPlus,
    FaUsers,
} from "react-icons/fa6";
import { useSelector } from "react-redux";
import moment from "moment";
import ShowItemSection from "./show-items-section";
import SearchSection from "./search-section";
import { peso_value } from "@/app/lib/peso";
// import AddPaymentSection from "./add-payment-section";
// import HistorySection from "./history-section";

const customers = [
    {
        name: "Lindsay Walton",
        title: "Front-end Developer",
        email: "2000",
        role: "Member",
        due: "10/20/2025",
        status: "Paid",
    },
    // More people...
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function TableSection() {
    const { sales } = useSelector((store) => store.carts);
    console.log("cartscarts", sales);
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto mb-4">
                    <FaMoneyBill className="float-left mt-1 mr-1 text-pink-500" />
                    <h1 className="text-base font-semibold text-pink-500">
                        Sales Section
                    </h1>
                </div>
                {/* <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <span className="isolate inline-flex rounded-md shadow-xs">
                            <button
                                type="button"
                                // onClick={() => setOpenCFilter(true)}
                                className="relative -ml-px inline-flex items-center rounded-r-md bg-pink-100 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-pink-50 focus:z-10"
                            >
                                <FaFilter className="mr-1 text-pink-500" />
                                Filter Customer Credits
                            </button>
                        </span>
                    </div>
                </div> */}
            </div>

            <div className="flex items-start justify-start">
                <SearchSection />
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle">
                        <table className="min-w-full border-separate border-spacing-0 text-sm text-left">
                            <thead>
                                <tr>
                                    {[
                                        "Invoice",
                                        "Total",
                                        "Customer Name",
                                        "Customer Discount",
                                        "Product Discount",
                                        "Order Discount",
                                        "Total Profit",
                                        "Status",
                                        "",
                                    ].map((title, idx) => (
                                        <th
                                            key={idx}
                                            scope="col"
                                            className={classNames(
                                                "sticky top-0 z-10 bg-white/75 backdrop-blur-sm backdrop-filter border-b border-gray-300 px-3 py-3.5 font-semibold text-gray-900",
                                                idx === 0
                                                    ? "pl-4 sm:pl-6 lg:pl-8 text-left"
                                                    : "",
                                                idx === 8
                                                    ? "pr-4 sm:pr-6 lg:pr-8 text-right"
                                                    : "text-left"
                                            )}
                                        >
                                            {title || (
                                                <span className="sr-only">
                                                    Actions
                                                </span>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {(sales?.data ?? [])
                                    .slice()
                                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                                    .map((res, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50">
                                            <td className="border-b border-gray-200 px-3 py-4 text-gray-500 whitespace-nowrap">
                                                {res.cart_id}
                                            </td>
                                            <td className="border-b border-gray-200 px-3 py-4 text-gray-500 whitespace-nowrap lg:table-cell">
                                                <b>
                                                    {peso_value(Number(
                                                        res.total_price
                                                    ))}
                                                </b>
                                            </td>
                                            <td className="border-b border-gray-200 px-3 py-4 text-gray-500 whitespace-nowrap">
                                                {res?.customer?.name}
                                            </td>
                                            <td className="border-b border-gray-200 px-3 py-4 text-gray-500 whitespace-nowrap">
                                                {peso_value(Number(
                                                    res?.customer_total_discount
                                                ))}
                                            </td>
                                            <td className="border-b border-gray-200 px-3 py-4 text-gray-500 whitespace-nowrap">
                                                {peso_value(Number(
                                                    res?.discount_per_item
                                                ))}
                                            </td>
                                            <td className="border-b border-gray-200 px-3 py-4 text-gray-500 whitespace-nowrap">
                                                {peso_value(Number(
                                                    res?.discount_per_order
                                                ))}
                                            </td>
                                            <td className="border-b border-gray-200 px-3 py-4 text-gray-500 whitespace-nowrap">
                                                {peso_value(
                                                    res?.cart_items?.reduce((acc, item) => acc + Number(item.profit || 0) - Number(item.discount || 0), 0)
                                                )}
                                            </td>
                                            <td className="border-b border-gray-200 px-3 py-4 text-gray-500 whitespace-nowrap">
                                                {res.status}
                                            </td>
                                            <td className="border-b border-gray-200 px-3 py-4 text-gray-700 whitespace-nowrap text-right">
                                                <div className="flex items-center justify-center gap-3">
                                                    {/* <ShowItemSection data={res} /> */}
                                                    <a
                                                        href={`/administrator/credits/${res.cart_id}`}
                                                        target="_blank"
                                                        className="inline-flex items-center gap-x-1.5 rounded-md bg-pink-100 hover:bg-pink-200 px-3 py-2 font-semibold text-gray-900 ring-1 ring-inset ring-gray-300"
                                                    >
                                                        <FaReceipt className=" text-pink-500" />
                                                        Invoice
                                                    </a>
                                                </div>
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
