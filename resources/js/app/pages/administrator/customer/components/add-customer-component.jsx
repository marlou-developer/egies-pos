import React, { useState } from "react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaCalendarDays, FaUser, FaUserPlus } from "react-icons/fa6";
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

export default function AddCustomerComponent({ open, setOpenCustomer }) {
    const [loading, setLoading] = useState(false);
    const [uploadedFile1, setUploadedFile1] = useState(null);
    const { customer } = useSelector((state) => state.customers);
    const dispatch = useDispatch();

    function data_handler(eOrKey, value) {
        if (typeof eOrKey === "string") {
            // Called manually with key and value (like for WYSIWYG)
            dispatch(
                setCustomer({
                    ...customer,
                    [eOrKey]: value,
                })
            );
        } else {
            // Regular input onChange event
            dispatch(
                setCustomer({
                    ...customer,
                    [eOrKey.target.name]: eOrKey.target.value,
                })
            );
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        const fd = new FormData();
        fd.append("customer_id", customer.id ?? "");
        fd.append("file_name", customer.file_name ?? "");
        fd.append("name", customer.name ?? "");
        fd.append("street", customer.street ?? "");
        fd.append("brgy", customer.brgy ?? "");
        fd.append("city", customer.city ?? "");
        fd.append("province", customer.province ?? "");
        fd.append("postal", customer.postal ?? "");
        fd.append("mobile_no", customer.mobile_no ?? "");
        fd.append("email", customer.email ?? "");
        // fd.append("due_period", customer.due_period ?? "");

        if (uploadedFile1 && uploadedFile1.length > 0) {
            Array.from(uploadedFile1).forEach((file) => {
                fd.append("uploads[]", file);
            });
        }

        try {
            await store.dispatch(create_customer_thunk(fd));
            await store.dispatch(get_customer_thunk());
            message.success("Customer successfully saved!");
            setOpenCustomer(false);
            dispatch(setCustomer({}));
        } catch (error) {
            message.error("Failed to add Customer. Please try again.");
        } finally {
            setLoading(false);
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
                                    <FaUserPlus className="float-left mr-1 mt-1" />
                                    New Customer
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
                                    below to create your new Customer.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                            <div className="divide-y divide-gray-200 px-4 sm:px-6">
                                <div className="space-y-6 pt-6 pb-5">
                                    <div className="sm:col-span-12">
                                        <FaUser className="float-left size-5 mr-1 mt-3 text-pink-500" />
                                        <h3 className="text-base font-medium text-gray-600 pt-3">
                                            Customer Information
                                        </h3>
                                        <hr />
                                    </div>

                                    <div>
                                        <Input
                                            onChange={data_handler}
                                            value={customer?.name ?? ""}
                                            name="name"
                                            label="Customer Name"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            onChange={data_handler}
                                            value={customer?.street ?? ""}
                                            name="street"
                                            label=" Street Address"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            onChange={data_handler}
                                            value={customer?.brgy ?? ""}
                                            name="brgy"
                                            label="Barangay"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            onChange={data_handler}
                                            value={customer?.city ?? ""}
                                            name="city"
                                            label="City"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            onChange={data_handler}
                                            value={customer?.province ?? ""}
                                            name="province"
                                            label="Province"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            onChange={data_handler}
                                            value={customer?.postal ?? ""}
                                            name="postal"
                                            label="Postal Code"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            onChange={data_handler}
                                            value={customer?.mobile_no ?? ""}
                                            name="mobile_no"
                                            label="Mobile No."
                                            type="number"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            onChange={data_handler}
                                            value={customer?.email ?? ""}
                                            name="email"
                                            label="Email Address"
                                            type="email"
                                        />
                                    </div>
                                    {/* 
                                    <div className="sm:col-span-12">
                                        <FaCalendarDays className="float-left size-5 mr-1 mt-3 text-pink-500" />
                                        <h3 className="text-base font-medium text-gray-600 pt-3">
                                            Payment Terms Information
                                        </h3>
                                        <hr />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="due_days"
                                            className="block text-sm font-medium text-pink-600"
                                        >
                                            Due Date Period
                                        </label>
                                        <div className="mt-1">
                                            <div class="w-[180px] flex flex-col gap-3 justify-between">
                                                <div className="flex w-full">
                                                    <button
                                                        class="px-3 py-1 rounded-md bg-gray-300 "
                                                    >
                                                        -
                                                    </button>
                                                    <span class="font-semibold mx-2">
                                                        <input
                                                            id="due_days"
                                                            name="due_days"
                                                            type="number"
                                                            className="block text-center w-full rounded-md bg-white py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-pink-300 focus:border-pink-300 sm:text-sm"
                                                        />
                                                    </span>
                                                    <button
                                                        class="px-3 py-1 rounded-md bg-gray-300 "
                                                    >
                                                        +
                                                    </button>
                                                    <span class="font-semibold mx-1 mt-2">
                                                        <label
                                                            htmlFor="due_days"
                                                            className="block text-sm font-medium text-gray-600"
                                                        >
                                                            Days
                                                        </label>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
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
