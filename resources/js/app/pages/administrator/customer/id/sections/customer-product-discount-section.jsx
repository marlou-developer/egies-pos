import React, { useState } from "react";
import { FaPercent, FaProductHunt } from "react-icons/fa6";
import AddProductDiscountSection from "./add-product-discount-section";
import { useSelector } from "react-redux";
import UpdateProductDiscountSection from "./update-product-discount-section";
import DeleteProductDiscountSection from "./delete-product-discount-section";

export default function CustomerProductDiscountSection() {
    const [openCustomerProductDiscount, setOpenCustomerProductDiscount] =
        useState(false);
    const { customer } = useSelector((state) => state.customers);

    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center justify-between">
                <div>
                    <div className="flex items-center text-pink-500">
                        <FaPercent className="mr-2" />
                        <h1 className="text-base font-semibold">
                            Customer Product Discount Section
                        </h1>
                    </div>
                    {/* <p className="mt-2 text-sm text-gray-700">
                        A list of all the customer in your account including
                        their name, address, due dates and discounts.
                    </p> */}
                </div>
                <div className="mt-4 sm:mt-0">
                    <button
                        type="button"
                        onClick={() => setOpenCustomerProductDiscount(true)}
                        className="inline-flex items-center rounded-md bg-pink-100 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 hover:bg-pink-200 focus:outline-none"
                    >
                        <FaProductHunt className="mr-1 text-pink-500" />
                        Add Product Discount
                    </button>
                    <AddProductDiscountSection
                        open={openCustomerProductDiscount}
                        setOpenCustomer={setOpenCustomerProductDiscount}
                    />
                </div>
            </div>

            <div className="mt-8 overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-0">
                    <thead>
                        <tr>
                            <th className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5 px-4 text-sm font-semibold text-gray-900 backdrop-blur-sm text-left sm:pl-6 lg:pl-8">
                                Product Name
                            </th>
                            <th className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white/75 px-4 py-3.5 text-sm font-semibold text-gray-900 backdrop-blur-sm text-left sm:table-cell">
                                Discount
                            </th>
                            <th
                                scope="col"
                                className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5 pr-4 pl-3 backdrop-blur-sm backdrop-filter sm:pr-6 lg:pr-8"
                            >
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white text-sm">
                        {customer?.discounts?.map((res, i) => (
                            <tr key={i}>
                                <td
                                    className={classNames(
                                        i !== customer.discounts.length - 1
                                            ? "border-b border-gray-200"
                                            : "",
                                        "px-4 py-4 font-medium text-gray-900 whitespace-nowrap sm:pl-6 lg:pl-8"
                                    )}
                                >
                                    {res?.product?.name ??
                                        "No Available Discount"}
                                </td>
                                <td
                                    className={classNames(
                                        i !== customer.discounts.length - 1
                                            ? "border-b border-gray-200"
                                            : "",
                                        "hidden px-4 py-4 text-gray-500 whitespace-nowrap sm:table-cell"
                                    )}
                                >
                                    ₱{Number(res?.customer_discount).toFixed(2)}
                                </td>
                                <td
                                    className={classNames(
                                        i !== customer.discounts.length - 1
                                            ? "border-b border-gray-200"
                                            : "",
                                        "hidden px-4 py-4 text-gray-500 whitespace-nowrap sm:table-cell"
                                    )}
                                >
                                    <div className="inline-flex items-center font-bold px-2 py-1 gap-2 ">
                                        <UpdateProductDiscountSection
                                            data={res}
                                        />
                                        <DeleteProductDiscountSection
                                            data={res}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
