import React, { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import { FaCirclePlus, FaSquarePlus } from 'react-icons/fa6';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

export default function StocksMenuSection({ data }) {
    const [isEditOpen, setIsEditOpen] = useState(false);

    return (
        <>
            <div>
                <button
                    type="button"
                    // onClick={() => setOpenAddStocks(true)}
                    className="relative inline-flex items-center rounded-lg bg-pink-100 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-pink-200 "
                >
                    <FaSquarePlus className="mr-1 text-pink-500" />
                    Add New Stocks
                </button>
            </div>
        </>
    );
}
