import Input from "@/app/_components/input";
import DrawerSection from "@/app/_sections/drawer-section";
import {
    get_category_thunk,
    update_category_thunk,
} from "@/app/redux/category-thunk";
import { setProduct } from "@/app/redux/product-slice";
import store from "@/app/store/store";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { message, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { FaCircleInfo, FaClipboard, FaMoneyBill1Wave } from "react-icons/fa6";
import { useSelector } from "react-redux";
import UploadProductSection from "./upload-product-section";
import {
    get_product_thunk,
    update_product_thunk,
} from "@/app/redux/product-thunk";
import ProductImageSection from "./product-image-section";

export default function EditProductSection({ data, isOpen, setIsOpen }) {
    const { product } = useSelector((state) => state.products);
    const { categories } = useSelector((state) => state.categories);
    const [uploadedFile1, setUploadedFile1] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({});

    useEffect(() => {
        setForm(data);
    }, [isOpen]);

    // const editProduct = async (e) => {
    //     e.preventDefault()
    //     setLoading(true);
    //     try {
    //         await store.dispatch(
    //             update_product_thunk(form)
    //         );
    //         store.dispatch(get_product_thunk())
    //         message.success("Updated Successfully!");
    //         setIsOpen(false);
    //     } catch (error) {
    //         message.error("Failed to edit Product. Please try again.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    async function editProduct(e) {
        e.preventDefault();
        setLoading(true);
        const fd = new FormData();
        fd.append("product_id", form.id ?? "");
        fd.append("file_name", form.file_name ?? "");
        fd.append("name", form.name ?? "");
        fd.append("category_id", form.category_id ?? "");
        fd.append("quantity", form.quantity ?? "");
        fd.append("status", form.status ?? "");
        fd.append("cost", form.cost ?? "");
        fd.append("srp", form.srp ?? "");
        fd.append("shopee", form.shopee ?? "");
        fd.append("reseller", form.reseller ?? "");
        fd.append("brand", form.brand ?? "");
        fd.append("delivery_receipt_no", form.delivery_receipt_no ?? "");
        fd.append("city_distributor", form.city_distributor ?? "");
        fd.append("district_distributor", form.district_distributor ?? "");
        fd.append("provincial_distributor", form.provincial_distributor ?? "");

        if (uploadedFile1 && uploadedFile1.length > 0) {
            Array.from(uploadedFile1).forEach((file) => {
                fd.append("uploads[]", file);
            });
        }

        try {
            await store.dispatch(update_product_thunk(form.id, fd));
            store.dispatch(get_product_thunk());
            message.success("Updated Successfully!");
            setIsOpen(false);
        } catch (error) {
            message.error("Failed to edit Product. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    console.log("uploadedFile1", uploadedFile1);

    return (
        <>
            <Tooltip title="Edit Product">
                <button
                    className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    onClick={openModal}
                >
                    <PencilSquareIcon className="mr-3 size-5 text-gray-400" />
                    <b>Edit Product</b>
                </button>
            </Tooltip>
            <div></div>
            <DrawerSection open={isOpen} setOpen={setIsOpen}>
                <form
                    onSubmit={editProduct}
                    className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
                >
                    <div className="h-0 flex-1 overflow-y-auto">
                        <div className="bg-pink-200 px-4 py-6 sm:px-6">
                            <div className="flex items-center justify-between">
                                <div className="text-base font-semibold text-pink-600">
                                    <FaClipboard className="float-left mr-1 mt-1" />
                                    Edit Product
                                </div>
                                <div className="ml-3 flex h-7 items-center">
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
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
                                    Get started by updating the information
                                    below to modify your product.
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
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    delivery_receipt_no:
                                                        e.target.value,
                                                })
                                            }
                                            value={form?.delivery_receipt_no}
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
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    brand: e.target.value,
                                                })
                                            }
                                            value={form?.brand}
                                            name="brand"
                                            label="Brand"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    name: e.target.value,
                                                })
                                            }
                                            value={form?.name}
                                            name="name"
                                            label="Product Name"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <div className="mt-2">
                                            <select
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        category_id:
                                                            e.target.value,
                                                    })
                                                }
                                                value={form?.category_id ?? ""}
                                                name="category_id"
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
                                    {/* <div>
                                        <Input
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    quantity: e.target.value,
                                                })
                                            }
                                            value={form?.quantity}
                                            name="quantity"
                                            label="Quantity"
                                            type="number"
                                        />
                                    </div> */}

                                    <div className="sm:col-span-12">
                                        <hr />
                                        <h3 className="text-base font-medium text-white pt-3">
                                            Upload Room Images
                                        </h3>
                                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-pink-300 px-6 py-10">
                                            <div className="text-center">
                                                <ProductImageSection
                                                    files={uploadedFile1}
                                                    setFiles={setUploadedFile1}
                                                    data={data}
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
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*\.?\d*$/.test(value)) {
                                                    setForm({
                                                        ...form,
                                                        cost: value,
                                                    });
                                                }
                                            }}
                                            value={form?.cost}
                                            name="cost"
                                            label="Cost Per Unit"
                                            type="text"
                                            inputMode="decimal"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*\.?\d*$/.test(value)) {
                                                    setForm({
                                                        ...form,
                                                        srp: value,
                                                    });
                                                }
                                            }}
                                            value={form?.srp}
                                            name="srp"
                                            label="SRP Price"
                                            type="text"
                                            inputMode="decimal"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*\.?\d*$/.test(value)) {
                                                    setForm({
                                                        ...form,
                                                        shopee: value,
                                                    });
                                                }
                                            }}
                                            value={form?.shopee}
                                            name="shopee"
                                            label="Shopee Price"
                                            type="text"
                                            inputMode="decimal"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*\.?\d*$/.test(value)) {
                                                    setForm({
                                                        ...form,
                                                        reseller: value,
                                                    });
                                                }
                                            }}
                                            value={form?.reseller}
                                            name="reseller"
                                            label="Reseller Price"
                                            type="text"
                                            inputMode="decimal"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*\.?\d*$/.test(value)) {
                                                    setForm({
                                                        ...form,
                                                        city_distributor: value,
                                                    });
                                                }
                                            }}
                                            value={form?.city_distributor || ""}
                                            name="city_distributor"
                                            label="Distributor Price"
                                            type="text"
                                            inputMode="decimal"
                                        />
                                    </div>

                                    <div>
                                        <Input
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*\.?\d*$/.test(value)) {
                                                    setForm({
                                                        ...form,
                                                        district_distributor: value,
                                                    });
                                                }
                                            }}
                                            value={form?.district_distributor}
                                            name="district_distributor"
                                            label="District Distributor Price"
                                            type="text"
                                            inputMode="decimal"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*\.?\d*$/.test(value)) {
                                                    setForm({
                                                        ...form,
                                                        provincial_distributor: value,
                                                    });
                                                }
                                            }}
                                            value={form?.provincial_distributor}
                                            name="provincial_distributor"
                                            label="Provincial Distributor Price"
                                            type="text"
                                            inputMode="decimal"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex shrink-0 justify-end px-4 py-4">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
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
            {/* <DrawerSection open={isModalOpen} setOpen={setIsModalOpen} width='w-1/4'>
                <h2 className="text-xl font-semibold mb-4">Edit Category</h2>
                <form action="" onSubmit={editCategory}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Category Name</label>
                        <input
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    name: e.target.value,
                                })
                            }
                            value={form?.name}
                            type="text"
                            name="name"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div>
                        <button onSubmit={editCategory} disabled={loading} className='bg-pink-400 p-2 w-full rounded-md text-white hover:bg-pink-300'>
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </DrawerSection> */}
        </>
    );
}
