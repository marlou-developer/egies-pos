import { get_cart_by_id_thunk, update_customer_thunk } from '@/app/redux/cart-thunk';
import { get_category_thunk, update_category_thunk } from '@/app/redux/category-thunk';
import { get_all_customers_thunk } from '@/app/redux/customer-thunk';
import store from '@/app/store/store';
import Modal from '@/Components/Modal';
import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline'
import { message, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function UpdateBillToSection({ data }) {
    const { customers } = useSelector((state) => state.customers);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({});

    const cart_id = window.location.pathname.split("/")[4];

    // Load customers when component mounts
    useEffect(() => {
        store.dispatch(get_all_customers_thunk());
    }, []);

    useEffect(() => {
        setForm({
            ...data,
            // id: data?.id,
            customer_id: data?.customer_id || ""
        })
    }, [data])

    const editCustomer = async (e) => {
        e.preventDefault()
        setLoading(true);
        try {
            await store.dispatch(
                update_customer_thunk({
                    ...form,
                    id: data?.id,
                    customer_id: form?.customer_id || ""
                })
            );
            store.dispatch(get_cart_by_id_thunk(cart_id))
            message.success("Updated Successfully!");
            setIsModalOpen(false);
        } catch (error) {
            message.error("Failed to update Customer. Please try again."); // Show error message
        } finally {
            setLoading(false); // Always reset loading state
        }
    };

    console.log("customers", customers);
    console.log("customers.data", customers?.data);
    
    // Handle both possible data structures
    const customersList = customers?.data || customers || [];
    const customersArray = Array.isArray(customersList) ? customersList : customersList?.data || [];

    return (
        <>
            <Tooltip title="Edit Customer">
                <button className=" text-blue-500 font-bold " type='button' onClick={openModal}><PencilIcon className="h-4 w-4 mb-1 inline-block" /></button>
            </Tooltip>
            <Modal open={isModalOpen} setOpen={setIsModalOpen} width='w-1/4'>
                <h2 className="text-xl font-semibold mb-4">Edit Customer</h2>
                <form action="" onSubmit={editCustomer}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Customer Name</label>
                        <select
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    customer_id: e.target.value,
                                })
                            }
                            value={form?.customer_id ?? ""}
                            name="customer_id"
                            className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-pink-300 focus:border-pink-300 sm:text-sm/6"
                        >
                            <option value="">
                                Select Customer
                            </option>
                            <option value="">
                                N/A
                            </option>
                            {customersArray?.map((customer) => (
                                <option
                                    key={customer.id}
                                    value={customer.id}
                                >
                                    {customer.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <button onSubmit={editCustomer} disabled={loading} className='bg-pink-400 p-2 w-full rounded-md text-white hover:bg-pink-300'>
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    )
}
