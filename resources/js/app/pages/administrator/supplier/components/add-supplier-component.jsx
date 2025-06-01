import React, { useState } from "react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaCalendarDays, FaTruck, FaTruckArrowRight, FaUser, FaUserPlus } from "react-icons/fa6";
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
import { setSupplier } from "@/app/redux/supplier-slice";
import { create_supplier_thunk } from "@/app/redux/supplier-thunk";

export default function AddSupplierComponent({ open, setOpenSupplier }) {
    const [loading, setLoading] = useState(false);
    const [uploadedFile1, setUploadedFile1] = useState(null);
    const { supplier } = useSelector((state) => state.suppliers);
    const dispatch = useDispatch();

    function data_handler(eOrKey, value) {
        if (typeof eOrKey === "string") {
            // Called manually with key and value (like for WYSIWYG)
            dispatch(
                setSupplier({
                    ...supplier,
                    [eOrKey]: value,
                })
            );
        } else {
            // Regular input onChange event
            dispatch(
                setSupplier({
                    ...supplier,
                    [eOrKey.target.name]: eOrKey.target.value,
                })
            );
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        const fd = new FormData();
        fd.append("file_name", supplier.file_name ?? "");
        fd.append("name", supplier.name ?? "");
        fd.append("address", supplier.address ?? "");
        fd.append("contact_person", supplier.contact_person ?? "");
        fd.append("contact_no", supplier.contact_no ?? "");
        fd.append("email", supplier.email ?? "");

        if (uploadedFile1 && uploadedFile1.length > 0) {
            Array.from(uploadedFile1).forEach((file) => {
                fd.append("uploads[]", file);
            });
        }

        try {
            await store.dispatch(create_supplier_thunk(fd));
            // await store.dispatch(get_customer_thunk());
            message.success("Supplier successfully saved!");
            setOpenSupplier(false);
            dispatch(setCustomer({}));
        } catch (error) {
            message.error("Failed to add Supplier. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <DrawerSection open={open} setOpen={setOpenSupplier}>
                <form
                    onSubmit={handleSubmit}
                    className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
                >
                    <div className="h-0 flex-1 overflow-y-auto">
                        <div className="bg-pink-200 px-4 py-6 sm:px-6">
                            <div className="flex items-center justify-between">
                                <div className="text-base font-semibold text-pink-600">
                                    <FaTruckArrowRight className="float-left mr-1 mt-1" />
                                    New Supplier
                                </div>
                                <div className="ml-3 flex h-7 items-center">
                                    <button
                                        type="button"
                                        onClick={() => setOpenSupplier(false)}
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
                                    below to create your new Supplier.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                            <div className="divide-y divide-gray-200 px-4 sm:px-6">
                                <div className="space-y-6 pt-6 pb-5">
                                    <div className="sm:col-span-12">
                                        <FaTruck className="float-left size-5 mr-1 mt-3 text-pink-500" />
                                        <h3 className="text-base font-medium text-gray-600 pt-3">
                                            Supplier Information
                                        </h3>
                                        <hr />
                                    </div>

                                    <div>
                                        <Input
                                            onChange={data_handler}
                                            value={supplier?.name ?? ""}
                                            name="name"
                                            label="Supplier Name"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            onChange={data_handler}
                                            value={supplier?.address ?? ""}
                                            name="address"
                                            label="Address"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            onChange={data_handler}
                                            value={supplier?.contact_person ?? ""}
                                            name="contact_person"
                                            label="Contact Person"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            onChange={data_handler}
                                            value={supplier?.contact_no ?? ""}
                                            name="contact_no"
                                            label="Contact No."
                                            type="number"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            onChange={data_handler}
                                            value={supplier?.email ?? ""}
                                            name="email"
                                            label="Email Address"
                                            type="email"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex shrink-0 justify-end px-4 py-4">
                        <button
                            type="button"
                            onClick={() => setOpenSupplier(false)}
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
