import { get_product_discount_by_id_thunk, update_product_discount_thunk } from '@/app/redux/product-thunk';
import store from '@/app/store/store';
import Modal from '@/Components/Modal';
import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline'
import { message, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react'
import { FaPen, FaPenToSquare } from 'react-icons/fa6';

export default function UpdateProductDiscountSection({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({});


    const customer_id = window.location.pathname.split('/')[3]

    useEffect(() => {
        setForm(data)
    }, [])

    const updateProductDiscount = async (e) => {
        e.preventDefault()
        setLoading(true);
        try {
            await store.dispatch(
                update_product_discount_thunk(form)
            );
            store.dispatch(get_product_discount_by_id_thunk(customer_id))
            message.success("Updated Successfully!");
            setIsModalOpen(false);
        } catch (error) {
            message.error("Failed to update discount. Please try again."); // Show error message
        } finally {
            setLoading(false); // Always reset loading state
        }
    };

    return (
        <>
            <Tooltip title="Update Discount">
                <button type='button' onClick={() => setIsModalOpen(true)} className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-blue-100 hover:bg-blue-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset">
                    <FaPenToSquare className="size-5 text-blue-500" />
                </button>
            </Tooltip>
            <Modal open={isModalOpen} setOpen={setIsModalOpen} width='w-1/4'>
                <h2 className="text-xl font-semibold mb-4">Update Discount</h2>
                <form action="" onSubmit={updateProductDiscount}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    name: e.target.value,
                                })
                            }
                            value={form?.product?.name}
                            type="text"
                            name="name"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Discount</label>
                        <input
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    customer_discount: e.target.value,
                                })
                            }
                            value={form?.customer_discount}
                            type="number"
                            name="customer_discount"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <button type='submit' disabled={loading} className='bg-blue-400 p-2 w-full rounded-md text-white hover:bg-blue-300'>
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    )
}
