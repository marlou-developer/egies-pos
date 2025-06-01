import React, { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
    ChevronDownIcon,
    PencilSquareIcon,
} from '@heroicons/react/20/solid';
import { FaBook, FaPercent } from 'react-icons/fa6';
import EditCustomerSection from './edit-supplier-section';

export default function SupplierMenuSection({ data }) {
    const [isEditOpen, setIsEditOpen] = useState(false);

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
                                    >
                                        <PencilSquareIcon
                                            className="mr-3 size-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                        Edit Supplier
                                    </button>
                                )}
                            </MenuItem>
                            <MenuItem>
                                {({ active }) => (
                                    <a
                                        href={`customer/${data.id}`}
                                        className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                            } group flex items-center px-4 py-2 text-sm`}
                                    >
                                        <FaPercent
                                            className="mr-3 size-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                        Product Discounts
                                    </a>
                                )}
                            </MenuItem>
                        </div>
                    </MenuItems>
                    <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-pink-100 hover:bg-pink-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset">
                        Options
                        <ChevronDownIcon
                            aria-hidden="true"
                            className="-mr-1 size-5 text-gray-400"
                        />
                    </MenuButton>
                </Menu>
            </div>

            {isEditOpen && (
                <EditCustomerSection
                    data={data}
                    isOpen={isEditOpen}
                    setIsOpen={setIsEditOpen}
                />
            )}
        </>
    );
}
