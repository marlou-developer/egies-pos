import React from "react";
import {
    FaCashRegister,
    FaFilter,
    FaMoneyBill,
    FaPenToSquare,
    FaReceipt,
    FaUserPlus,
    FaUsers,
} from "react-icons/fa6";
import UpdateStatusSection from "./update-status-section";
import { useSelector } from "react-redux";
import moment from "moment";
import AddPaymentSection from "./add-payment-section";
import HistorySection from "./history-section";
import SearchSection from "./search-section";
import { peso_value } from "@/app/lib/peso";
import PaginationSection from "./pagination-section";
import EditPaymentSection from "./edit-payment-section";
import { Tooltip } from "antd";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function CreditsSection() {
    const { carts } = useSelector((store) => store.carts);
    console.log("carts", carts);
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <FaMoneyBill className="float-left mt-1 mr-1 text-pink-500" />
                    <h1 className="text-base font-semibold text-pink-500">
                        Credits Section
                    </h1>
                </div>
                {/* <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <span className="isolate inline-flex rounded-md shadow-sm">
                        <button
                            type="button"
                            className="relative inline-flex items-center rounded-md bg-pink-100 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-pink-50 focus:z-10"
                        >
                            <FaFilter className="mr-1 text-pink-500" />
                            Filter Customer Credits
                        </button>
                    </span>
                </div> */}
            </div>

            <div className="mt-4 flex items-start justify-start">
                <SearchSection />
            </div>

            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle">
                        <table className="min-w-full border-separate border-spacing-0">
                            <thead>
                                <tr>
                                    {[
                                        "Customer Name",
                                        "Invoice",
                                        "Total",
                                        "Balance",
                                        "Due Date",
                                        "Status",
                                        "",
                                    ].map((header, idx) => (
                                        <th
                                            key={idx}
                                            scope="col"
                                            className={classNames(
                                                "sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5 px-3 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter",
                                                idx === 0 &&
                                                "pl-4 sm:pl-6 lg:pl-8",
                                                idx === 6 &&
                                                "pr-4 sm:pr-6 lg:pr-8"
                                            )}
                                        >
                                            {header || (
                                                <span className="sr-only">
                                                    Actions
                                                </span>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {(carts?.data ?? [])
                                    .slice()
                                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                                    .map((res, idx) => (
                                        <tr key={idx}>
                                            <td className="whitespace-nowrap border-b border-gray-200 py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                                                {res.customer?.name}
                                            </td>
                                            <td className="whitespace-nowrap border-b border-gray-200 px-3 py-4 text-sm text-gray-500">
                                                {res.cart_id}
                                            </td>
                                            <td className="whitespace-nowrap border-b border-gray-200 px-3 py-4 text-sm text-gray-500">
                                                <b>
                                                    {peso_value(Number(
                                                        res.total_price
                                                    ))}
                                                </b>
                                            </td>
                                            <td className="whitespace-nowrap border-b border-gray-200 px-3 py-4 text-sm text-gray-500">
                                                <b>
                                                    {peso_value(Number(res.balance))}
                                                </b>
                                            </td>
                                            <td className="whitespace-nowrap border-b border-gray-200 px-3 py-4 text-sm text-gray-500">
                                                {res.due_date
                                                    ? moment(res.due_date).format(
                                                        "LL"
                                                    )
                                                    : "No due date"}
                                            </td>
                                            <td className="whitespace-nowrap border-b border-gray-200 px-3 py-4 text-sm text-gray-500">
                                                {res.status}
                                            </td>
                                            <td className="border-b border-gray-200 px-3 py-4 text-sm text-gray-700">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Tooltip title="Invoice Details">
                                                        <a
                                                            href={`/administrator/credits/${res.cart_id}`}
                                                            target="_blank"
                                                            className="inline-flex items-center gap-x-1.5 rounded-md bg-pink-400 hover:bg-pink-600 p-3 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300"
                                                        >
                                                            <FaReceipt className=" text-white" />
                                                        </a>
                                                    </Tooltip>
                                                    {res.status !== "Paid" && (
                                                        <AddPaymentSection
                                                            data={res}
                                                        />
                                                    )}
                                                    <HistorySection data={res} />
                                                    <EditPaymentSection data={res} />
                                                    <Tooltip title="Edit Credit Invoice">
                                                        <a
                                                            href={`/administrator/credits/id/${res.cart_id}`}
                                                            target="_blank"
                                                            className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-400 hover:bg-blue-500 p-3 font-semibold text-gray-900 ring-1 ring-inset ring-gray-300"
                                                        >
                                                            <FaPenToSquare className=" text-white" />
                                                        </a>
                                                    </Tooltip>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        <PaginationSection />
                    </div>
                </div>
            </div>
        </div>
    );
}
