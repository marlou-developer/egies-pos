import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FaCircleInfo, FaList, FaUser, FaUserPlus } from "react-icons/fa6";
import classNames from "classnames";
import store from "@/app/store/store";
import { message } from "antd";
import { useSelector } from "react-redux";
import Input from "@/app/_components/input";
import DrawerSection from "@/app/_sections/drawer-section";
import { create_user_thunk, get_users_thunk } from "@/app/redux/user-thunk";

export default function AddUserSection({ open, setOpenUser }) {
    const { users } = useSelector((state) => state.users);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({});

    const createUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await store.dispatch(
                create_user_thunk({
                    ...form,
                })
            );
            message.success("Successfully added!");
            await store.dispatch(get_users_thunk());
            setOpenUser(false);
        } catch (error) {
            message.error("Failed to add User. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <DrawerSection
            open={open}
            setOpen={setOpenUser}
            className="relative z-50"
        >
            <div className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out sm:duration-700">
                <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                    <div className="h-0 flex-1 overflow-y-auto">
                        <div className="bg-pink-200 px-4 py-6 sm:px-6">
                            <div className="flex items-center justify-between">
                                <div className="text-base font-semibold text-pink-600">
                                    <FaUserPlus className="inline-block mr-1" />
                                    New User
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setOpenUser(false)}
                                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
                                    <XMarkIcon className="w-6 h-6" />
                                </button>
                            </div>
                            <p className="mt-1 text-sm text-gray-600">
                                Fill in the information below to create a new
                                user.
                            </p>
                        </div>

                        <div className="px-4 sm:px-6">
                            <div className="space-y-6 pt-6 pb-5">
                                <div className="flex items-center">
                                    <FaUser className="inline-block mr-1 text-pink-500" />
                                    <h3 className="text-base font-medium text-gray-600">
                                        User Information
                                    </h3>
                                    <hr className="my-2" />
                                </div>

                                <form onSubmit={createUser} >
                                    <div className="flex flex-col gap-4">
                                        <div>
                                            <Input
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        fname: e.target.value,
                                                    })
                                                }
                                                value={form.fname || ""}
                                                name="fname"
                                                label="First name"
                                                type="text"
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        mname: e.target.value,
                                                    })
                                                }
                                                value={form.mname || ""}
                                                name="mname"
                                                label="Middle name"
                                                type="text"
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        lname: e.target.value,
                                                    })
                                                }
                                                value={form.lname || ""}
                                                name="lname"
                                                label="Last name"
                                                type="text"
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        suffix: e.target.value,
                                                    })
                                                }
                                                value={form.suffix || ""}
                                                name="suffix"
                                                label="Suffix"
                                                type="text"
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        title: e.target.value,
                                                    })
                                                }
                                                value={form.title || ""}
                                                name="title"
                                                label="Position"
                                                type="text"
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        email: e.target.value,
                                                    })
                                                }
                                                value={form.email || ""}
                                                name="email"
                                                label="Email"
                                                type="email"
                                            />
                                        </div>
                                        {/* <div>
                                            <Input
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        password: e.target.value,
                                                    })
                                                }
                                                value={form.password || ""}
                                                name="password"
                                                label="Password"
                                                type="password"
                                            />
                                        </div> */}
                                        <div>
                                            <select
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        user_type: e.target.value,
                                                    })
                                                }
                                                value={form.user_type || ""}
                                                name="user_type"
                                                type="text"
                                                className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-pink-300 focus:border-pink-300 sm:text-sm/6">
                                                <option value="">Select User Type</option>
                                                <option value="Admin">Admin</option>
                                                <option value="Inventory">Inventory</option>
                                                <option value="Shopee">Shopee</option>
                                                <option value="Cashier">Cashier</option>
                                            </select>
                                        </div>

                                    </div>

                                    <div className="flex justify-end mt-6">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setOpenUser(false)
                                            }
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
            </div>
        </DrawerSection>
    );
}
