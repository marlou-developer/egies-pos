import Input from '@/app/_components/input'
import DrawerSection from '@/app/_sections/drawer-section'
import { get_supplier_thunk, update_supplier_thunk } from '@/app/redux/supplier-thunk'
import { get_users_thunk, update_user_thunk } from '@/app/redux/user-thunk'
import store from '@/app/store/store'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { message, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaPen, FaPenClip, FaPenToSquare, FaSquarePen, FaTruck, FaTruckDroplet, FaUser, FaUserPen, FaUserPlus } from 'react-icons/fa6'
import { useSelector } from 'react-redux'

export default function EditSupplierSection({ data }) {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({});
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setForm(data)
    }, [])

    const editUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await store.dispatch(
                update_supplier_thunk({
                    ...form,
                })
            );
            message.success("Successfully updated!");
            await store.dispatch(get_supplier_thunk());
            setOpen(false);
        } catch (error) {
            message.error("Failed to update Supplier. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <Tooltip title="Edit Supplier">
                <button type='button' onClick={() => setOpen(true)} className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-blue-400 hover:bg-blue-500 p-3 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset">
                    <FaPenToSquare className="size-3.5 text-white" />
                </button>
            </Tooltip>
            <DrawerSection
                open={open}
                setOpen={setOpen}
                className="relative z-50"
            >
                <div className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out sm:duration-700">
                    <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                        <div className="h-0 flex-1 overflow-y-auto">
                            <div className="bg-pink-200 px-4 py-6 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <div className="text-base font-semibold text-pink-600">
                                        <FaTruckDroplet className="inline-block mr-1 " />
                                        Edit Supplier
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                    >
                                        <XMarkIcon className="w-6 h-6" />
                                    </button>
                                </div>
                                <p className="mt-1 text-sm text-gray-600 flex">Edit the information below to update the user.
                                </p>
                            </div>

                            <div className="px-4 sm:px-6">
                                <div className="space-y-6 pt-6 pb-5">
                                    <div className="flex items-center">
                                        <FaTruck className="inline-block mr-1 text-pink-500" />
                                        <h3 className="text-base font-medium text-gray-600">
                                            Supplier Information
                                        </h3>
                                        <hr className="my-2" />
                                    </div>

                                    <form onSubmit={editUser} >
                                        <div className="flex flex-col gap-5">
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
                                                    label="Name"
                                                    type="text"
                                                />
                                            </div>
                                            <div>
                                                <Input
                                                    onChange={(e) =>
                                                        setForm({
                                                            ...form,
                                                            address: e.target.value,
                                                        })
                                                    }
                                                    value={form.address || ""}
                                                    name="address"
                                                    label="Address"
                                                    type="text"
                                                />
                                            </div>
                                            <div>
                                                <Input
                                                    onChange={(e) =>
                                                        setForm({
                                                            ...form,
                                                            contact_person: e.target.value,
                                                        })
                                                    }
                                                    value={form.contact_person || ""}
                                                    name="contact_person"
                                                    label="Contact Person"
                                                    type="text"
                                                />
                                            </div>
                                            <div>
                                                <Input
                                                    onChange={(e) =>
                                                        setForm({
                                                            ...form,
                                                            contact_no: e.target.value,
                                                        })
                                                    }
                                                    value={form.contact_no || ""}
                                                    name="contact_no"
                                                    label="Contact No."
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
                                        </div>

                                        <div className="flex justify-end mt-6">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setOpen(false)
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
        </>

    )
}
