import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FaCircleInfo, FaClipboard, FaFilter } from "react-icons/fa6";
import classNames from "classnames";

const category = [
    {
        category_name: "Soap",
    },
    {
        category_name: "Make-Up",
    },
    {
        category_name: "Cream",
    },
    // More product...
];

export default function FilterProductsComponent({ open, setOpenFilter }) {
    return (
        <>
            <Dialog
                open={open}
                onClose={setOpenFilter}
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
                                                    Filter Product Search
                                                </DialogTitle>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setOpenFilter(false)
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
                                                    filter products.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-1 flex-col justify-between">
                                            <div className="divide-y divide-gray-200 px-4 sm:px-6">
                                                <div className="space-y-6 pt-6 pb-5">
                                                   
                                                    <div>
                                                        <label
                                                            htmlFor="product_name"
                                                            className="block text-sm font-medium text-pink-600"
                                                        >
                                                            Product Name
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                id="product_name"
                                                                name="product_name"
                                                                type="text"
                                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-pink-300 focus:border-pink-300 sm:text-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="category_name"
                                                            className="block text-sm font-medium text-pink-600"
                                                        >
                                                            Category Name
                                                        </label>
                                                        <div className="mt-2">
                                                            <select
                                                                id="category_name"
                                                                name="category_name"
                                                                autoComplete="category_name"
                                                                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline-none focus:ring-pink-300 focus:border-pink-300 sm:text-sm/6"
                                                            >
                                                                <option
                                                                    value=""
                                                                    disabled
                                                                    selected
                                                                >
                                                                    -- Category
                                                                    --
                                                                </option>
                                                                <option>
                                                                    Soap
                                                                </option>
                                                                <option>
                                                                    Make-Up
                                                                </option>
                                                                <option>
                                                                    Cream
                                                                </option>
                                                                <option>
                                                                    Lotion
                                                                </option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex shrink-0 justify-end px-4 py-4">
                                        <button
                                            type="button"
                                            onClick={() => setOpenFilter(false)}
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
                            </DialogPanel>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
