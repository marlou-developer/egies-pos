import { get_category_thunk, update_category_thunk } from '@/app/redux/category-thunk';
import store from '@/app/store/store';
import Modal from '@/Components/Modal';
import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline'
import { message, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react'

export default function EditCategorySection({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({});

    useEffect(() => {
        setForm(data)
    }, [])

    const editCategory = async (e) => {
        e.preventDefault()
        setLoading(true);
        try {
            await store.dispatch(
                update_category_thunk(form)
            );
            store.dispatch(get_category_thunk())
            message.success("Updated Successfully!");
            setIsModalOpen(false);
        } catch (error) {
            message.error("Failed to edit category. Please try again."); // Show error message
        } finally {
            setLoading(false); // Always reset loading state
        }
    };

    return (
        <>
            <Tooltip title="Edit Category">
                <button className=" text-blue-500 font-bold " type='button' onClick={openModal}><PencilIcon className="h-3.5 w-3 ml-1 inline-block" /></button>
            </Tooltip>
            <Modal open={isModalOpen} setOpen={setIsModalOpen} width='w-1/4'>
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
            </Modal>
        </>
    )
}
