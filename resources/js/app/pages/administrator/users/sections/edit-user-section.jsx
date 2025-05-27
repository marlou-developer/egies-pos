import Input from '@/app/_components/input'
import DrawerSection from '@/app/_sections/drawer-section'
import { get_users_thunk, update_user_thunk } from '@/app/redux/user-thunk'
import store from '@/app/store/store'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { message, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaUser, FaUserPen, FaUserPlus } from 'react-icons/fa6'
import { useSelector } from 'react-redux'

export default function EditUserSection({ data }) {
    const { users } = useSelector((state) => state.users);
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
            const fullName = [
                form.fname,
                form.mname ? form.mname[0] + "." : null,
                form.lname,
                form.suffix,
            ]
                .filter(Boolean)
                .join(" ");

            await store.dispatch(
                update_user_thunk({
                    ...form,
                    name: fullName,
                })
            );
            message.success("Successfully updated!");
            await store.dispatch(get_users_thunk());
            setOpen(false);
        } catch (error) {
            message.error("Failed to update User. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <Tooltip title="Edit User">
                <button type='button' onClick={() => setOpen(true)} className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-blue-100 hover:bg-blue-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset">
                    <FaUserPen className="size-5 text-gray-400" />
                    Edit User
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
                                        <FaUserPen className="inline-block mr-1" />
                                        Edit User
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
                                        <FaUser className="inline-block mr-1 text-pink-500" />
                                        <h3 className="text-base font-medium text-gray-600">
                                            User Information
                                        </h3>
                                        <hr className="my-2" />
                                    </div>

                                    <form onSubmit={editUser} >
                                        <div className="flex flex-col gap-4">
                                            <div>
                                                <Input
                                                    onChange={(e) =>
                                                        setForm({
                                                            ...form,
                                                            fname: e.target.value,
                                                        })
                                                    }
                                                    value={form?.fname}
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
                                                    <option value="Staff">Staff</option>
                                                </select>
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
