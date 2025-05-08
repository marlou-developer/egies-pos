import React from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
    ArchiveBoxIcon,
    ArrowRightCircleIcon,
    ChevronDownIcon,
    DocumentDuplicateIcon,
    HeartIcon,
    PencilSquareIcon,
    TrashIcon,
    UserPlusIcon,
} from '@heroicons/react/20/solid'
import { FaBook, FaPercent } from 'react-icons/fa6'


export default function CustomerMenuSection() {
    return (
        <div>
            <Menu
                as="div"
                className="relative inline-block text-left"
            >
                <div>
                    <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
                        Options
                        <ChevronDownIcon
                            aria-hidden="true"
                            className="-mr-1 size-5 text-gray-400"
                        />
                    </MenuButton>
                </div>

                <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                    <div className="py-1">
                        <MenuItem className="group">
                            <a
                                href="#"
                                className="group flex items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                            >
                                <PencilSquareIcon
                                    aria-hidden="true"
                                    className="mr-3 size-5 text-gray-400 group-data-focus:text-gray-500"
                                />
                                Edit Customer
                            </a>
                        </MenuItem>
                        <MenuItem className="group">
                            <a
                                href="#"
                                className="group flex items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                            >
                                <FaBook
                                    aria-hidden="true"
                                    className="mr-3 size-5 text-gray-400 group-data-focus:text-gray-500"
                                />
                                View Credits
                            </a>
                        </MenuItem>
                        <MenuItem className="group">
                            <a
                                href="#"
                                className="group flex items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                            >
                                <FaPercent
                                    aria-hidden="true"
                                    className="mr-3 size-5 text-gray-400 group-data-focus:text-gray-500"
                                />
                                Product Discounts
                            </a>
                        </MenuItem>
                    </div>

                </MenuItems>
            </Menu>
        </div>
    )
}
