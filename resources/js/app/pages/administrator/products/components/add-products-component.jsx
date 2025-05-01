import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
    FaCircleInfo,
    FaClipboard,
    FaMoneyBill1Wave,
} from "react-icons/fa6";
import UploadProductSection from "../sections/upload-product-section";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "@/app/redux/product-slice";
import { create_product_thunk } from "@/app/redux/product-thunk";
import { message } from "antd";
import store from "@/app/store/store";

export default function AddProductComponent({ open, setOpenProduct }) {

    const [loading, setLoading] = useState(false);
    const [uploadedFile1, setUploadedFile1] = useState(null);
    const { product } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    function data_handler(eOrKey, value) {
        if (typeof eOrKey === 'string') {
            // Called manually with key and value (like for WYSIWYG)
            dispatch(setProduct({
                ...product,
                [eOrKey]: value,
            }));
        } else {
            // Regular input onChange event
            dispatch(setProduct({
                ...product,
                [eOrKey.target.name]: eOrKey.target.value,
            }));
        }
    }


    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        const fd = new FormData();
        fd.append('product_id', product.id ?? '');
        fd.append('file_name', product.file_name ?? '');
        fd.append('name', product.name ?? '');
        fd.append('category_id', product.category_id ?? '');
        fd.append('quantity', product.quantity ?? '');
        fd.append('status', product.status ?? '');
        fd.append('cost', product.cost ?? '');
        fd.append('srp', product.srp ?? '');
        fd.append('reseller', product.reseller ?? '');
        fd.append('city_distributor', product.city_distributor ?? '');
        fd.append('district_distributor', product.district_distributor ?? '');
        fd.append('provincial_distributor', product.provincial_distributor ?? '');

        if (uploadedFile1 && uploadedFile1.length > 0) {
            Array.from(uploadedFile1).forEach((file) => {
                fd.append('uploads[]', file);
            });
        }

        try {
            await store.dispatch(create_product_thunk(fd));
            // await store.dispatch(get_rent_thunk());
            message.success("Product successfully saved!");
            setOpenProduct(false);
        } catch (error) {
            message.error("Failed to add Product. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={setOpenProduct}
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
                                <form onSubmit={handleSubmit} className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                                    <div className="h-0 flex-1 overflow-y-auto">
                                        <div className="bg-pink-200 px-4 py-6 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <DialogTitle className="text-base font-semibold text-pink-600">
                                                    <FaClipboard className="float-left mr-1 mt-1" />
                                                    New Product
                                                </DialogTitle>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setOpenProduct(
                                                                false
                                                            )
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
                                                    create your new product.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-1 flex-col justify-between">
                                            <div className="divide-y divide-gray-200 px-4 sm:px-6">
                                                <div className="space-y-6 pt-6 pb-5">
                                                    <div className="sm:col-span-12">
                                                        <FaCircleInfo className="float-left size-5 mr-1 mt-3 text-pink-500" />
                                                        <h3 className="text-base font-medium text-gray-600 pt-3">
                                                            Product Information
                                                        </h3>
                                                        <hr />
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="product_name"
                                                            className="block text-sm/6 font-medium text-pink-600"
                                                        >
                                                            Product Name
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                onChange={data_handler}
                                                                value={product?.name ?? ""}
                                                                name="name"
                                                                type="text"
                                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-pink-300 focus:border-pink-300 sm:text-sm/6"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="product_name"
                                                            className="block text-sm/6 font-medium text-pink-600"
                                                        >
                                                            Category
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                id="product_name"
                                                                name="product_name"
                                                                type="text"
                                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-pink-300 focus:border-pink-300 sm:text-sm/6"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="product_name"
                                                            className="block text-sm/6 font-medium text-pink-600"
                                                        >
                                                            Quantity
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                onChange={data_handler}
                                                                value={product?.quantity ?? ""}
                                                                name="quantity"
                                                                type="text"
                                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-pink-300 focus:border-pink-300 sm:text-sm/6"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-12">
                                                        <hr />
                                                        <h3 className="text-base font-medium text-white pt-3">
                                                            Upload Room Images
                                                        </h3>
                                                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-pink-300 px-6 py-10">
                                                            <div className="text-center">
                                                                <UploadProductSection
                                                                    files={uploadedFile1}
                                                                    setFiles={setUploadedFile1}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-12">
                                                        <FaMoneyBill1Wave className="float-left size-5 mr-1 mt-3 text-pink-500" />
                                                        <h3 className="text-base font-medium text-gray-600 pt-3">
                                                            Pricing Information
                                                        </h3>
                                                        <hr />
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="cost_price"
                                                            className="block text-sm/6 font-medium text-pink-600"
                                                        >
                                                            Cost Per Unit
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                onChange={data_handler}
                                                                value={product?.cost ?? ""}
                                                                name="cost"
                                                                type="number"
                                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-pink-300 focus:border-pink-300 sm:text-sm/6"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="product_name"
                                                            className="block text-sm/6 font-medium text-pink-600"
                                                        >
                                                            SRP Price
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                onChange={data_handler}
                                                                value={product?.srp ?? ""}
                                                                name="srp"
                                                                type="number"
                                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-pink-300 focus:border-pink-300 sm:text-sm/6"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="product_name"
                                                            className="block text-sm/6 font-medium text-pink-600"
                                                        >
                                                            Reseller Price
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                onChange={data_handler}
                                                                value={product?.reseller ?? ""}
                                                                name="reseller"
                                                                type="number"
                                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-pink-300 focus:border-pink-300 sm:text-sm/6"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="product_name"
                                                            className="block text-sm/6 font-medium text-pink-600"
                                                        >
                                                            Distributor Price
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                onChange={data_handler}
                                                                value={product?.city_distributor ?? ""}
                                                                name="city_distributor"
                                                                type="number"
                                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-pink-300 focus:border-pink-300 sm:text-sm/6"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="product_name"
                                                            className="block text-sm/6 font-medium text-pink-600"
                                                        >
                                                            District Distributor
                                                            Price
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                onChange={data_handler}
                                                                value={product?.district_distributor ?? ""}
                                                                name="district_distributor"
                                                                type="number"
                                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-pink-300 focus:border-pink-300 sm:text-sm/6"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="product_name"
                                                            className="block text-sm/6 font-medium text-pink-600"
                                                        >
                                                            Provincial
                                                            Distributor Price
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                onChange={data_handler}
                                                                value={product?.provincial_distributor ?? ""}
                                                                name="provincial_distributor"
                                                                type="number"
                                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-pink-300 focus:border-pink-300 sm:text-sm/6"
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
                                            onClick={() =>
                                                setOpenProduct(false)
                                            }
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
