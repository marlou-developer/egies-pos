import React, { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaCircleInfo, FaClipboard, FaMoneyBill1Wave } from "react-icons/fa6";
import UploadProductSection from "../sections/upload-product-section";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "@/app/redux/product-slice";
import {
    create_product_thunk,
    get_product_thunk,
} from "@/app/redux/product-thunk";
import { message } from "antd";
import store from "@/app/store/store";
import Input from "@/app/_components/input";
import DrawerSection from "@/app/_sections/drawer-section";

export default function AddProductComponent({ open, setOpenProduct }) {
    const { categories } = useSelector((state) => state.categories);
    const [loading, setLoading] = useState(false);
    const [uploadedFile1, setUploadedFile1] = useState(null);
    const { product } = useSelector((state) => state.products);
    const { suppliers } = useSelector((state) => state.suppliers);
    
    const dispatch = useDispatch();

    console.log("categories", product);

    function data_handler(eOrKey, value) {
        if (typeof eOrKey === "string") {
            // Called manually with key and value (like for WYSIWYG)
            dispatch(
                setProduct({
                    ...product,
                    [eOrKey]: value,
                })
            );
        } else {
            // Regular input onChange event
            dispatch(
                setProduct({
                    ...product,
                    [eOrKey.target.name]: eOrKey.target.value,
                })
            );
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        const fd = new FormData();
        fd.append("product_id", product.id ?? "");
        fd.append("file_name", product.file_name ?? "");
        fd.append("name", product.name ?? "");
        fd.append("category_id", product.category_id ?? "");
        fd.append("quantity", product.quantity ?? "");
        fd.append("status", product.status ?? "");
        fd.append("cost", product.cost ?? "");
        fd.append("srp", product.srp ?? "");
        fd.append("shopee", product.shopee ?? "");
        // fd.append("customer", product.customer ?? "");
        fd.append("reseller", product.reseller ?? "");
        fd.append("brand", product.brand ?? "");
        // fd.append("barcode", product.barcode ?? "");
        fd.append("delivery_receipt_no", product.delivery_receipt_no ?? "");
        fd.append("city_distributor", product.city_distributor ?? "");
        fd.append("district_distributor", product.district_distributor ?? "");
        fd.append("supplier_id", product.supplier_id ?? "");
        
        fd.append(
            "provincial_distributor",
            product.provincial_distributor ?? ""
        );

        if (uploadedFile1 && uploadedFile1.length > 0) {
            Array.from(uploadedFile1).forEach((file) => {
                fd.append("uploads[]", file);
            });
        }

        try {
            await store.dispatch(create_product_thunk(fd));
            await store.dispatch(get_product_thunk());
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
            <DrawerSection open={open} setOpen={setOpenProduct}>
                <form
                    onSubmit={handleSubmit}
                    className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
                >
                    <div className="h-0 flex-1 overflow-y-auto">
                        <div className="bg-pink-200 px-4 py-6 sm:px-6">
                            <div className="flex items-center justify-between">
                                <div className="text-base font-semibold text-pink-600">
                                    <FaClipboard className="float-left mr-1 mt-1" />
                                    New Product
                                </div>
                                <div className="ml-3 flex h-7 items-center">
                                    <button
                                        type="button"
                                        onClick={() => setOpenProduct(false)}
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
                                    below to create your new product.
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
                                        <Input
                                            onChange={data_handler}
                                            value={
                                                product?.delivery_receipt_no ??
                                                ""
                                            }
                                            name="delivery_receipt_no"
                                            label="Delivery Receipt #"
                                            type="text"
                                        />
                                    </div>
                                    {/* <div>
                                                        <Input
                                                            onChange={
                                                                data_handler
                                                            }
                                                            value={
                                                                product?.barcode ??
                                                                ""
                                                            }
                                                            name="barcode"
                                                            label="Barcode"
                                                            type="text"
                                                        />
                                                    </div> */}
                                    <div>
                                        <Input
                                            onChange={data_handler}
                                            value={product?.brand ?? ""}
                                            name="brand"
                                            label="Brand"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            onChange={data_handler}
                                            value={product?.name ?? ""}
                                            name="name"
                                            label="Product Name"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <div className="mt-2">
                                            <select
                                                onChange={data_handler}
                                                value={
                                                    product?.category_id ?? ""
                                                }
                                                name="category_id"
                                                type="text"
                                                className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-pink-300 focus:border-pink-300 sm:text-sm/6"
                                            >
                                                <option value="">
                                                    Select a category
                                                </option>
                                                {categories?.map((category) => (
                                                    <option
                                                        key={category.id}
                                                        value={category.id}
                                                    >
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <Input
                                            onChange={data_handler}
                                            value={product?.quantity ?? ""}
                                            name="quantity"
                                            label="Quantity"
                                            type="number"
                                        />
                                    </div>
                                    <div>
                                        <select
                                            value={product?.supplier_id}
                                            onChange={data_handler}
                                            name="supplier_id"
                                            className="w-full rounded-md border-gray-500 text-sm h-11"
                                        >
                                            <option disabled selected>
                                                Select Supplier
                                            </option>
                                            {suppliers.map((res, i) => {
                                                return (
                                                    <option
                                                        key={i}
                                                        value={res.id}
                                                    >
                                                        {res.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
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
                                        <Input
                                            onChange={data_handler}
                                            value={product?.cost ?? ""}
                                            name="cost"
                                            label="Cost Per Unit"
                                            type="number"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            onChange={data_handler}
                                            value={product?.srp ?? ""}
                                            name="srp"
                                            label="SRP Price"
                                            type="number"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            onChange={data_handler}
                                            value={product?.shopee ?? ""}
                                            name="shopee"
                                            label="Shopee Price (optional)"
                                            type="number"
                                        />
                                    </div>
                                    {/* <div>
                                        <Input
                                            onChange={data_handler}
                                            value={product?.customer ?? ""}
                                            name="customer"
                                            label="Customer Price (optional)"
                                            type="number"
                                        />
                                    </div> */}
                                    <div>
                                        <Input
                                            onChange={data_handler}
                                            value={product?.reseller ?? ""}
                                            name="reseller"
                                            label="Reseller Price"
                                            type="number"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            onChange={data_handler}
                                            value={
                                                product?.city_distributor ?? ""
                                            }
                                            name="city_distributor"
                                            label="Distributor Price"
                                            type="number"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            onChange={data_handler}
                                            value={
                                                product?.district_distributor ??
                                                ""
                                            }
                                            name="district_distributor"
                                            label="District Distributor Price"
                                            type="number"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            onChange={data_handler}
                                            value={
                                                product?.provincial_distributor ??
                                                ""
                                            }
                                            name="provincial_distributor"
                                            label="Provincial Distributor Price"
                                            type="number"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex shrink-0 justify-end px-4 py-4">
                        <button
                            type="button"
                            onClick={() => setOpenProduct(false)}
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
