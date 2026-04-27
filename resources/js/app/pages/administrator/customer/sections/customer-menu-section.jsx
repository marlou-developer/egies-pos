import React, { useState, useRef } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
    ChevronDownIcon,
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/20/solid";
import { FaBook, FaPercent } from "react-icons/fa6";
import EditCustomerSection from "./edit-customer-section";
import { router } from "@inertiajs/react";
import DeleteCustomerSection from "./delete-customer-section";

export default function CustomerMenuSection({ data }) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [openUp, setOpenUp] = useState(false);
    const buttonRef = useRef(null);

    const handleMenuClick = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            // If less than 180px space below, open upward
            setOpenUp(spaceBelow < 180);
        }
    };

    return (
        <>
            <div>
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <MenuButton
                            ref={buttonRef}
                            onClick={handleMenuClick}
                            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-pink-100 hover:bg-pink-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset"
                        >
                            Options
                            <ChevronDownIcon
                                aria-hidden="true"
                                className="-mr-1 size-5 text-gray-400"
                            />
                        </MenuButton>
                    </div>

                    <MenuItems
                        className={`
                            absolute z-50 w-56 sm:w-64 md:w-72
                            rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none right-0
                            max-h-[80vh] overflow-y-auto transition-all duration-200 ease-in-out
                            ${
                                openUp
                                    ? "bottom-full mb-2 origin-bottom-right"
                                    : "top-full mt-2 origin-top-right"
                            }
                        `}
                    >
                        <div className="py-1">
                            <MenuItem>
                                {({ active }) => (
                                    <button
                                        onClick={() => setIsEditOpen(true)}
                                        className={`${
                                            active
                                                ? "bg-gray-100 text-gray-900"
                                                : "text-gray-700"
                                        } group flex items-center px-4 py-2 text-sm w-full`}
                                    >
                                        <PencilSquareIcon
                                            className="mr-3 size-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                        Edit Customer
                                    </button>
                                )}
                            </MenuItem>

                            <MenuItem>
                                {({ active }) => (
                                    <button
                                        onClick={() => setIsDeleteOpen(true)}
                                        className={`${
                                            active
                                                ? "bg-gray-100 text-gray-900"
                                                : "text-gray-700"
                                        } group flex items-center px-4 py-2 text-sm w-full`}
                                    >
                                        <TrashIcon
                                            className="mr-3 size-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                        Remove Customer
                                    </button>
                                )}
                            </MenuItem>

                            <MenuItem>
                                {({ active }) => (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            router.visit(
                                                `/administrator/credits?search=${data.name}`,
                                            )
                                        }
                                        className={`${
                                            active
                                                ? "bg-gray-100 text-gray-900"
                                                : "text-gray-700"
                                        } group flex items-center px-4 py-2 text-sm w-full`}
                                    >
                                        <FaBook
                                            className="mr-3 size-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                        View Credits
                                    </button>
                                )}
                            </MenuItem>

                            <MenuItem>
                                {({ active }) => (
                                    <a
                                        href={`customer/${data.id}`}
                                        className={`${
                                            active
                                                ? "bg-gray-100 text-gray-900"
                                                : "text-gray-700"
                                        } group flex items-center px-4 py-2 text-sm w-full`}
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
                </Menu>
            </div>

            <EditCustomerSection
                data={data}
                isOpen={isEditOpen}
                setIsOpen={setIsEditOpen}
            />
            <DeleteCustomerSection
                data={data}
                isOpen={isDeleteOpen}
                setIsOpen={setIsDeleteOpen}
            />
        </>
    );
}
