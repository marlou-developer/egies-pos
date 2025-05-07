import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FunnelIcon, PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  
    FaCalendarDays,
    FaFilter,
    FaUser,
    FaUserPlus,
} from "react-icons/fa6";

export default function FilterCustomersComponent({ open, setOpenCFilter }) {
    return (
        <>
           <Dialog
                open={open}
                onClose={setOpenCFilter}
                className="relative z-50"
            >
                <div className="fixed inset-0" />

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                            <DialogPanel
                                transition
                                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
                            >
                                <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                                    <div className="h-0 flex-1 overflow-y-auto">
                                        <div className="bg-pink-200 px-4 py-6 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <DialogTitle className="text-base font-semibold text-pink-600">
                                                    <FaFilter className="float-left mr-1 mt-1" />
                                                    Filter Customer
                                                </DialogTitle>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setOpenCFilter(false)
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
                                                        <label
                                                            htmlFor="Customer_name"
                                                            className="block text-sm font-medium text-pink-600"
                                                        >
                                                            Customer Name
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                id="Customer_name"
                                                                name="Customer_name"
                                                                type="text"
                                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-pink-300 focus:border-pink-300 sm:text-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                   
                                                    <div>
                                                        <label
                                                            htmlFor="barangay"
                                                            className="block text-sm font-medium text-pink-600"
                                                        >
                                                            Barangay
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                id="barangay"
                                                                name="barangay"
                                                                type="text"

                                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-pink-300 focus:border-pink-300 sm:text-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="City"
                                                            className="block text-sm font-medium text-pink-600"
                                                        >
                                                            City
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                id="City"
                                                                name="City"
                                                                type="text"
                                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-pink-300 focus:border-pink-300 sm:text-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="street_address"
                                                            className="block text-sm font-medium text-pink-600"
                                                        >
                                                            Province
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                id="street_address"
                                                                name="street_address"
                                                                type="text"
                                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-pink-300 focus:border-pink-300 sm:text-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                    
                                                    <div>
                                                        <label
                                                            htmlFor="email"
                                                            className="block text-sm font-medium text-pink-600"
                                                        >
                                                            Email Address
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                id="email"
                                                                name="email"
                                                                type="email"
                                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-pink-300 focus:border-pink-300 sm:text-sm"
                                                            />
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex shrink-0 justify-end px-4 py-4">
                                        <button
                                            type="button"
                                            onClick={() => setOpenCFilter(false)}
                                            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="ml-4 inline-flex justify-center rounded-md bg-pink-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-pink-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                                        >
                                            Filter
                                        </button>
                                    </div>
                                </form>
                            </DialogPanel>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
