import React, { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import DeleteProductSection from './delete-product-section';
import EditProductSection from './edit-product-section';
import { FaCirclePlus } from 'react-icons/fa6';
import { useSelector } from 'react-redux';

export default function ProductOptionMenuSection({ data }) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const { user } = useSelector((store) => store.app);

    return (
        <>
            <div>
                <Menu as="div" className="relative inline-block text-left">
                    <MenuItems className="absolute z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none right-0">
                        <div className="py-1">
                            <MenuItem>
                                {({ active }) => (
                                    <button
                                        onClick={() => setIsEditOpen(true)}
                                        className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                            } group flex items-center px-4 py-2 text-sm w-full`}
                                        type="button"
                                    >
                                        <PencilSquareIcon className="mr-3 size-5 text-gray-400" />
                                        <b>Edit Product</b>
                                    </button>
                                )}
                            </MenuItem>
                            {/* <MenuItem as="a" href="#" className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                            <FaCirclePlus className="mr-3 size-5 text-gray-400" />
                            <b>Add Stock</b>
                        </MenuItem> */}
                            {(user?.user_type === "Admin") && (
                                <DeleteProductSection data={data} />
                            )}

                        </div>
                    </MenuItems>
                    <MenuButton className="inline-flex justify-center gap-x-1.5 rounded-md bg-pink-100 px-3 py-2 text-sm font-semibold text-gray-600 ring-1 ring-gray-300 hover:bg-pink-200 hover:text-gray-700">
                        Options
                        <ChevronDownIcon className="-mr-1 size-5 text-gray-400" />
                    </MenuButton>
                </Menu>
            </div>

            {isEditOpen && (
                <EditProductSection data={data} isOpen={isEditOpen} setIsOpen={setIsEditOpen} />
            )}
        </>
    );
}
