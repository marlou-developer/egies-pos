import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FaCircleInfo, FaList } from "react-icons/fa6";
import classNames from "classnames";
import store from "@/app/store/store";
import {
    create_category_thunk,
    get_category_thunk
} from "@/app/redux/category-thunk";
import { message } from "antd";
import { useSelector } from "react-redux";
import EditCategorySection from "../sections/edit-category-section";
import DeleteCategorySection from "../sections/delete-category-section";
import Input from "@/app/_components/input";

export default function AddCategoryComponent({ open, setOpenCategory }) {
    const { categories } = useSelector((state) => state.categories);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({});

    const createCategory = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await store.dispatch(create_category_thunk({
                ...form
            })
            );
            message.success("Successfully added!");
            await store.dispatch(get_category_thunk());
            setOpenCategory(false)
        } catch (error) {
            message.error("Failed to add category. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={setOpenCategory} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                        <DialogPanel className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out sm:duration-700">
                            <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                                <div className="h-0 flex-1 overflow-y-auto">
                                    <div className="bg-pink-200 px-4 py-6 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <DialogTitle className="text-base font-semibold text-pink-600">
                                                <FaList className="inline-block mr-1" />
                                                New Category
                                            </DialogTitle>
                                            <button
                                                type="button"
                                                onClick={() => setOpenCategory(false)}
                                                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                            >
                                                <XMarkIcon className="w-6 h-6" />
                                            </button>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-600">
                                            Fill in the information below to create a new category.
                                        </p>
                                    </div>

                                    <div className="px-4 sm:px-6">
                                        <div className="space-y-6 pt-6 pb-5">
                                            <div className="flex items-center">
                                                <FaCircleInfo className="inline-block mr-1 text-pink-500" />
                                                <h3 className="text-base font-medium text-gray-600">
                                                    Category Information
                                                </h3>
                                                <hr className="my-2" />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-pink-600">
                                                    Existing Categories
                                                </label>
                                                <div className="mt-2 flex flex-wrap gap-1">
                                                    {categories?.map((category, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 mr-1 mb-2 text-xs font-medium text-yellow-800 ring-1 ring-yellow-600/20"
                                                        >
                                                            {category.name}
                                                            <EditCategorySection data={category} />
                                                            <DeleteCategorySection data={category} />
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <form onSubmit={createCategory}>
                                                <Input
                                                    onChange={(e) =>
                                                        setForm({ ...form, name: e.target.value })
                                                    }
                                                    value={form.name || ""}
                                                    name="name"
                                                    label="New Category Name"
                                                    type="text"
                                                />

                                                <div className="flex justify-end mt-6">
                                                    <button
                                                        type="button"
                                                        onClick={() => setOpenCategory(false)}
                                                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        disabled={loading}
                                                        className="ml-4 inline-flex justify-center rounded-md bg-pink-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-600"
                                                    >
                                                        {loading ? "Saving..." : "Save"}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}
