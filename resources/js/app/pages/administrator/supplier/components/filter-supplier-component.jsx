import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FunnelIcon, PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {

    FaCalendarDays,
    FaFilter,
    FaUser,
    FaUserPlus,
} from "react-icons/fa6";
import DrawerSection from "@/app/_sections/drawer-section";
import { router } from "@inertiajs/react";
import { useSelector } from "react-redux";
import Input from "@/app/_components/input";

export default function FilterSupplierComponent({ open, setOpenCFilter }) {

    const [search, setSearch] = useState({});
    const { categories } = useSelector((state) => state.categories);

    console.log("categories", categories);

    function search_customers() {
        router.visit(
            `?name=${search?.name}&brgy=${search?.brgy}&city=${search?.city}&province=${search?.province}&email=${search?.email}`
        );
    }
    return (
        <>
            <DrawerSection
                open={open}
                setOpen={setOpenCFilter}
            >

                <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                    <div className="h-0 flex-1 overflow-y-auto">
                        <div className="bg-pink-200 px-4 py-6 sm:px-6">
                            <div className="flex items-center justify-between">
                                <div className="text-base font-semibold text-pink-600">
                                    <FaFilter className="float-left mr-1 mt-1" />
                                    Filter Customer
                                </div>
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
                                        <Input
                                            onChange={(e) =>
                                                setSearch({
                                                    ...search,
                                                    [e.target.name]:
                                                        e.target.value,
                                                })
                                            }
                                            id="name"
                                            name="name"
                                            label=" Customer Name"
                                            type="text"
                                        />
                                    </div>

                                    <div>
                                        <Input
                                            onChange={(e) =>
                                                setSearch({
                                                    ...search,
                                                    [e.target.name]:
                                                        e.target.value,
                                                })
                                            }
                                            id="brgy"
                                            name="brgy"
                                            label=" Barangay"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            onChange={(e) =>
                                                setSearch({
                                                    ...search,
                                                    [e.target.name]:
                                                        e.target.value,
                                                })
                                            }
                                            id="city"
                                            name="city"
                                            label=" City"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            onChange={(e) =>
                                                setSearch({
                                                    ...search,
                                                    [e.target.name]:
                                                        e.target.value,
                                                })
                                            }
                                            id="province"
                                            name="province"
                                            label=" Province"
                                            type="text"
                                        />
                                    </div>

                                    <div>
                                        <Input
                                            onChange={(e) =>
                                                setSearch({
                                                    ...search,
                                                    [e.target.name]:
                                                        e.target.value,
                                                })
                                            }
                                            id="email"
                                            name="email"
                                            label="Email Address"
                                            type="text"
                                        />
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
                            onClick={search_customers}
                            className="ml-4 inline-flex justify-center rounded-md bg-pink-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-pink-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                        >
                            Filter
                        </button>
                    </div>
                </form>
            </DrawerSection>
        </>
    );
}
