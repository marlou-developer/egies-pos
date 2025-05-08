import React from "react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {

    FaCalendarDays,
    FaUser,
    FaUserPlus,
} from "react-icons/fa6";
import DrawerSection from "@/app/_sections/drawer-section";
import Input from "@/app/_components/input";

export default function AddCustomerComponent({ open, setOpenCustomer }) {
    return (
        <>
            <DrawerSection
                open={open}
                onClose={setOpenCustomer}
                className="relative z-50"
            >
                <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
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
                                        onClick={() =>
                                            setOpenCustomer(false)
                                        }
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
                                    Get started by filling in
                                    the information below to
                                    create your new Customer.
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
                                            // onChange={data_handler}
                                            // value={
                                            //     product?.name ??
                                            //     ""
                                            // }
                                            name="name"
                                            label="Customer Name"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            // onChange={data_handler}
                                            // value={
                                            //     product?.Address ??
                                            //     ""
                                            // }
                                            name="street_address"
                                            label=" Street Address"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            // onChange={data_handler}
                                            // value={
                                            //     product?.brgy ??
                                            //     ""
                                            // }
                                            name="brgy"
                                            label="Barangay"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            // onChange={data_handler}
                                            // value={
                                            //     product?.city ??
                                            //     ""
                                            // }
                                            name="city"
                                            label="City"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            // onChange={data_handler}
                                            // value={
                                            //     product?.province ??
                                            //     ""
                                            // }
                                            name="province"
                                            label="Province"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            // onChange={data_handler}
                                            // value={
                                            //     product?.postal ??
                                            //     ""
                                            // }
                                            name="postal"
                                            label="Postal Code"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            // onChange={data_handler}
                                            // value={
                                            //     product?.mobile_no ??
                                            //     ""
                                            // }
                                            name="mobile_no"
                                            label="Mobile No."
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            // onChange={data_handler}
                                            // value={
                                            //     product?.email ??
                                            //     ""
                                            // }
                                            name="email"
                                            label="Email Address"
                                            type="text"
                                        />
                                    </div>

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
                            className="ml-4 inline-flex justify-center rounded-md bg-pink-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-pink-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </DrawerSection>
        </>
    );
}
