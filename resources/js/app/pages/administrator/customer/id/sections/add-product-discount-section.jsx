import React, { useState } from "react";
import {
    ChevronDownIcon,
    PhotoIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import {
    FaCalendarDays,
    FaMoneyBill,
    FaPercent,
    FaProductHunt,
    FaUser,
    FaUserPlus,
} from "react-icons/fa6";
import DrawerSection from "@/app/_sections/drawer-section";
import Input from "@/app/_components/input";
import { useDispatch, useSelector } from "react-redux";
import {
    create_customer_thunk,
    get_customer_thunk,
} from "@/app/redux/customer-thunk";
import { message } from "antd";
import { setCustomer } from "@/app/redux/customer-slice";
import store from "@/app/store/store";
import {
    create_product_discount_thunk,
    get_product_discount_by_id_thunk,
} from "@/app/redux/product-thunk";
import { stringify } from "postcss";

export default function AddProductDiscountSection({ open, setOpenCustomer }) {
    const [loading, setLoading] = useState(false);
    const [uploadedFile1, setUploadedFile1] = useState(null);
    const { customer } = useSelector((state) => state.customers);
    const { products } = useSelector((state) => state.products);
    const [form, setForm] = useState({});
    const customer_id = window.location.pathname.split("/")[3];

    console.log("form", form);
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        const fd = new FormData();
        fd.append("customer_id", customer_id ?? "");
        fd.append("discount", form.discount ?? "");
        fd.append("product_id", form.product.id ?? "");

        try {
            await store.dispatch(create_product_discount_thunk(fd));
            store.dispatch(get_product_discount_by_id_thunk(customer_id));
            message.success("Customer successfully saved!");
            setOpenCustomer(false);
            setLoading(false);
            setForm({});
        } catch (error) {
            setLoading(false);
            message.error("Product is already exist in the customer.");
        }
    }
    return (
        <>
            <DrawerSection open={open} setOpen={setOpenCustomer}>
                <form
                    onSubmit={handleSubmit}
                    className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
                >
                    <div className="h-0 flex-1 overflow-y-auto">
                        <div className="bg-pink-200 px-4 py-6 sm:px-6">
                            <div className="flex items-center justify-between">
                                <div className="text-base font-semibold text-pink-600">
                                    <FaProductHunt className="float-left mr-1 mt-1" />
                                    New Customer Product Discount
                                </div>
                                <div className="ml-3 flex h-7 items-center">
                                    <button
                                        type="button"
                                        onClick={() => setOpenCustomer(false)}
                                        className="relative rounded-md bg-pink-200 text-gray-400 hover:text-gray-600 focus:ring-2 focus:ring-white focus:outline-hidden"
                                    >
                                        <span className="absolute -inset-2.5" />
                                        <span className="sr-only">
                                            Close panel
                                        </span>
                                        <XMarkIcon
                                            aria-hidden="true"
                                            className="size-6"
                                        />
                                    </button>
                                </div>
                            </div>
                            <div className="mt-1">
                                <p className="text-sm text-gray-600">
                                    Get started by filling in the information
                                    below to create your new Customer Product
                                    Discount.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                            <div className="divide-y divide-gray-200 px-4 sm:px-6">
                                <div className="space-y-6 pt-6 pb-5">
                                    <div className="sm:col-span-12">
                                        <FaPercent className="float-left size-5 mr-1 mt-3 text-pink-500" />
                                        <h3 className="text-base font-medium text-gray-600 pt-3">
                                            Product Discount Information
                                        </h3>
                                        <hr />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <div className="mb-4">
                                            Product Name:{" "}
                                            <b>{form?.product?.name}</b>
                                        </div>
                                        <div className="flex items-center justify justify-between">
                                            Shopee Price:{" "}
                                            <span className="text-xl font-bold">
                                                ₱
                                                {parseFloat(
                                                    form?.product?.shopee || 0
                                                ).toLocaleString("en-PH", {
                                                    minimumFractionDigits: 2,
                                                })}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify justify-between">
                                            SRP Price:{" "}
                                            <span className="text-xl font-bold">
                                                ₱
                                                {parseFloat(
                                                    form?.product?.srp || 0
                                                ).toLocaleString("en-PH", {
                                                    minimumFractionDigits: 2,
                                                })}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify justify-between">
                                            City Distributor Price:{" "}
                                            <span className="text-xl font-bold">
                                                ₱
                                                {parseFloat(
                                                    form?.product
                                                        ?.city_distributor || 0
                                                ).toLocaleString("en-PH", {
                                                    minimumFractionDigits: 2,
                                                })}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify justify-between">
                                            District Distributor Price:{" "}
                                            <span className="text-xl font-bold">
                                                ₱
                                                {parseFloat(
                                                    form?.product
                                                        ?.district_distributor ||
                                                        0
                                                ).toLocaleString("en-PH", {
                                                    minimumFractionDigits: 2,
                                                })}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify justify-between">
                                            Provincial Distributor Price:{" "}
                                            <span className="text-xl font-bold">
                                                ₱
                                                {parseFloat(
                                                    form?.product
                                                        ?.provincial_distributor ||
                                                        0
                                                ).toLocaleString("en-PH", {
                                                    minimumFractionDigits: 2,
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="product_id"
                                            className="block text-sm/6 font-medium text-gray-900"
                                        >
                                            Product
                                        </label>
                                        <div className="mt-2 grid grid-cols-1">
                                            <select
                                                id="product"
                                                name="product"
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        [e.target.name]:
                                                            JSON.parse(
                                                                e.target.value
                                                            ),
                                                    })
                                                }
                                                className="col-start-1 py-2.5 row-start-1 w-full appearance-none rounded-md bg-white pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            >
                                                <option selected disabled>
                                                    Select Product
                                                </option>
                                                {products.data?.map(
                                                    (res, i) => {
                                                        return (
                                                            <option
                                                                value={JSON.stringify(
                                                                    res
                                                                )}
                                                                key={i}
                                                            >
                                                                {res.name}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <Input
                                            value={form?.discount ?? ""}
                                            name="discount"
                                            label="Discount Amount"
                                            type="number"
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    [e.target.name]:
                                                        e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex shrink-0 justify-end px-4 py-4">
                        <button
                            type="button"
                            onClick={() => setOpenCustomer(false)}
                            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="ml-4 inline-flex justify-center rounded-md bg-pink-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-pink-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </DrawerSection>
        </>
    );
}
