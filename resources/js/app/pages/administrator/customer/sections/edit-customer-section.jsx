import Input from '@/app/_components/input';
import DrawerSection from '@/app/_sections/drawer-section';
import { get_customer_thunk, update_customer_thunk } from '@/app/redux/customer-thunk';
import store from '@/app/store/store';
import { PencilSquareIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { message, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react'
import { FaClipboard, FaMoneyBill1Wave, FaUser } from 'react-icons/fa6';
import { useSelector } from 'react-redux';

export default function EditCustomerSection({ data, isOpen, setIsOpen }) {
    const { customer } = useSelector((state) => state.customers)
    const { categories } = useSelector((state) => state.categories)
    const [uploadedFile1, setUploadedFile1] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({});

    useEffect(() => {
        setForm(data)
    }, [])


    async function editCustomer(e) {
        e.preventDefault();
        setLoading(true);

        const fd = new FormData();
        fd.append("product_id", customer.id ?? "");
        fd.append("file_name", customer.file_name ?? "");
        fd.append("name", customer.name ?? "");
        fd.append("category_id", customer.category_id ?? "");
        fd.append("quantity", customer.quantity ?? "");
        fd.append("status", customer.status ?? "");
        fd.append("cost", customer.cost ?? "");
        fd.append("srp", customer.srp ?? "");
        fd.append("reseller", customer.reseller ?? "");
        fd.append("brand", customer.brand ?? "");
        fd.append("delivery_receipt_no", customer.delivery_receipt_no ?? "");
        fd.append("city_distributor", customer.city_distributor ?? "");
        fd.append("district_distributor", customer.district_distributor ?? "");

        if (uploadedFile1 && uploadedFile1.length > 0) {
            Array.from(uploadedFile1).forEach((file) => {
                fd.append("uploads[]", file);
            });
        }

        try {
            await store.dispatch(
                update_customer_thunk(form)
            );
            // Refresh the customer list while preserving current page and search
            const params = new URLSearchParams(window.location.search);
            const page = params.get('page') || 1;
            const search = params.get('search') || '';
            store.dispatch(get_customer_thunk({ page, search, per_page: 10 }));
            message.success("Updated Successfully!");
            setIsOpen(false);
        } catch (error) {
            message.error("Failed to update Customer. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    console.log('foaaaarmm', form)

    return (
        <>
            <Tooltip title="Edit Customer">
                <button
                    className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    onClick={openModal}
                >
                    <PencilSquareIcon className="mr-3 size-5 text-gray-400" />
                    <b>Edit Customer</b>
                </button>
            </Tooltip>
            <div>

            </div>
            <DrawerSection open={isOpen} setOpen={setIsOpen} >
                <form
                    onSubmit={editCustomer}
                    className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
                >
                    <div className="h-0 flex-1 overflow-y-auto">
                        <div className="bg-pink-200 px-4 py-6 sm:px-6">
                            <div className="flex items-center justify-between">
                                <div className="text-base font-semibold text-pink-600">
                                    <FaClipboard className="float-left mr-1 mt-1" />
                                    Edit Customer
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
                                    Get started by updating the information below to modify customer.
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
                                                setForm({
                                                    ...form,
                                                    name: e.target.value,
                                                })
                                            }
                                            value={form?.name}
                                            name="name"
                                            label="Customer Name"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    street: e.target.value,
                                                })
                                            }
                                            value={form?.street}
                                            name="street"
                                            label="Street Address"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    brgy: e.target.value,
                                                })
                                            }
                                            value={form?.brgy}
                                            name="brgy"
                                            label="Barangay"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    city: e.target.value,
                                                })
                                            }
                                            value={form?.city}
                                            name="city"
                                            label="City"
                                            type="text"
                                        />
                                    </div> <div>
                                        <Input
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    province: e.target.value,
                                                })
                                            }
                                            value={form?.province}
                                            name="province"
                                            label="Province"
                                            type="text"
                                        />
                                    </div> 
                                    <div>
                                        <Input
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    postal: e.target.value,
                                                })
                                            }
                                            value={form?.postal}
                                            name="postal"
                                            label="Postal Code"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    mobile_no: e.target.value,
                                                })
                                            }
                                            value={form?.mobile_no}
                                            name="mobile_no"
                                            label="Mobile No."
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
                                            value={form?.email}
                                            name="email"
                                            label="Email Address"
                                            type="email"
                                        />
                                    </div>
                                    {/* 
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
                                    </div> */}

                                    {/* <div className="sm:col-span-12">
                                        <FaMoneyBill1Wave className="float-left size-5 mr-1 mt-3 text-pink-500" />
                                        <h3 className="text-base font-medium text-gray-600 pt-3">
                                            Pricing Information
                                        </h3>
                                        <hr />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="due_days"
                                            className="block text-sm font-medium text-pink-600"
                                        >
                                            Due Date Period
                                        </label>
                                        <div className="mt-1">
                                            <div class="w-[180px] flex flex-col gap-3 justify-between">
                                                <div className="flex w-full">
                                                    <button
                                                        class="px-3 py-1 rounded-md bg-gray-300 "
                                                    >
                                                        -
                                                    </button>
                                                    <span class="font-semibold mx-2">
                                                        <input
                                                            id="due_days"
                                                            name="due_days"
                                                            type="number"
                                                            className="block text-center w-full rounded-md bg-white py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-pink-300 focus:border-pink-300 sm:text-sm"
                                                        />
                                                    </span>
                                                    <button
                                                        class="px-3 py-1 rounded-md bg-gray-300 "
                                                    >
                                                        +
                                                    </button>
                                                    <span class="font-semibold mx-1 mt-2">
                                                        <label
                                                            htmlFor="due_days"
                                                            className="block text-sm font-medium text-gray-600"
                                                        >
                                                            Days
                                                        </label>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
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
