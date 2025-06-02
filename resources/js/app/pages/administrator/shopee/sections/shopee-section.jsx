import React, { useEffect, useState } from "react";
import { FaFilter, FaMoneyBill, FaReceipt } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import SearchSection from "./search-section";
import UpdateStatusSection from "./update-status-section";
import moment from "moment";
import { peso_value } from "@/app/lib/peso";
import { setSelectedProducts } from "@/app/redux/cart-slice";
import MultiUpdateSection from "./multi-update-section";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function ShopeeSection() {
    const dispatch = useDispatch();
    const { shopees, selectedProducts } = useSelector((store) => store.carts);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        if (shopees?.data?.length > 0) {
            const allSelected =
                selectedProducts.length === shopees.data.length &&
                selectedProducts.every((sp) =>
                    shopees.data.some((p) => p.cart_id === sp.cart_id)
                );
            setSelectAll(allSelected);
        } else {
            setSelectAll(false);
        }
    }, [selectedProducts, shopees.data]);

    const toggleSelect = (product, isChecked) => {
        const updatedSelected = isChecked
            ? [...selectedProducts, product]
            : selectedProducts.filter((p) => p.cart_id !== product.cart_id);

        dispatch(setSelectedProducts(updatedSelected));
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto flex items-center gap-2">
                    <img src="/images/shopee.png" className="h-6" alt="" />
                    <h1 className="text-base font-semibold text-orange-500">
                        Shopee Section
                    </h1>
                </div>
            </div>

            <div className="mt-4 flex items-start justify-between">
                <SearchSection />
                <MultiUpdateSection />
            </div>

            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle">
                        <table className="min-w-full border-separate border-spacing-0">
                            <thead>
                                <tr>
                                    <th className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5 px-3 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter pl-4 sm:pl-6 lg:pl-8">
                                        {/* <input
                                            type="checkbox"
                                            checked={selectAll}
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                setSelectAll(isChecked);
                                                dispatch(
                                                    setSelectedProducts(
                                                        isChecked ? [...shopees.data] : []
                                                    )
                                                );
                                            }}
                                        /> */}
                                    </th>
                                    {[
                                        "Invoice No.",
                                        "Order ID",
                                        "Total",
                                        "Status",
                                        "Date",
                                        "",
                                    ].map((header, idx) => (
                                        <th
                                            key={idx}
                                            className={classNames(
                                                "sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5 px-3 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter",
                                                idx === 5 &&
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
                                {shopees?.data?.map((res, idx) => {
                                    const isChecked = selectedProducts.some(
                                        (item) => item.cart_id === res.cart_id
                                    );
                                    return (
                                        <tr key={idx}>
                                            <td className="whitespace-nowrap border-b border-gray-200 py-4 pr-3 pl-4 sm:pl-6 lg:pl-8">
                                                {res.status === "Pending" && (
                                                    <input
                                                        type="checkbox"
                                                        checked={isChecked}
                                                        onChange={(e) =>
                                                            toggleSelect(
                                                                res,
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                )}
                                            </td>
                                            <td className="whitespace-nowrap border-b border-gray-200 px-3 py-4 text-sm font-medium text-gray-900">
                                                {res.cart_id}
                                            </td>
                                            <td className="whitespace-nowrap border-b border-gray-200 px-3 py-4 text-sm text-gray-500">
                                                {res.order_id}
                                            </td>
                                            <td className="whitespace-nowrap border-b border-gray-200 px-3 py-4 text-sm text-gray-500">
                                                <b>
                                                    {peso_value(
                                                        Number(res.total_price)
                                                    )}
                                                </b>
                                            </td>
                                            <td className="whitespace-nowrap border-b border-gray-200 px-3 py-4 text-sm text-gray-500">
                                                {res.status}
                                            </td>
                                            <td className="whitespace-nowrap border-b border-gray-200 px-3 py-4 text-sm text-gray-500">
                                                {moment(res.created_at).format(
                                                    "LL"
                                                )}
                                            </td>
                                            <td className="border-b border-gray-200 px-3 py-4 text-sm text-gray-700">
                                                <div className="flex items-center justify-center gap-3">
                                                    <a
                                                        href={`/administrator/credits/${res.cart_id}`}
                                                        target="_blank"
                                                        className="inline-flex items-center gap-x-1.5 rounded-md bg-pink-100 hover:bg-pink-200 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300"
                                                    >
                                                        <FaReceipt className=" text-pink-500" />
                                                        Invoice
                                                    </a>
                                                    {res.status ===
                                                        "Pending" && (
                                                        <UpdateStatusSection
                                                            data={res}
                                                        />
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
