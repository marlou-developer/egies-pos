import { FaBook, FaFilter, FaPercent, FaUserPlus, FaUsers } from "react-icons/fa6";
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
import { useState } from "react";
import AddCustomerComponent from "../components/add-customer-component";
import FilterCustomersComponent from "../components/filter-customers-component";

const people = [
    {
        name: "Lindsay Walton",
        title: "Front-end Developer",
        email: "lindsay.walton@example.com",
        role: "Member",
    },
    // More people...
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function CustomerSection() {
    const [openCustomer, setOpenCustomer] = useState(false);
    const [openCFilter, setOpenCFilter] = useState(false);
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <FaUsers className="float-left mt-1 mr-1 text-pink-500" />
                    <h1 className="text-base font-semibold text-pink-500">
                        Customer Section
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the customer in your account including
                        their name, address, due dates and discounts.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                        <span className="isolate inline-flex rounded-md shadow-xs">
                                            <button
                                                type="button"
                                                onClick={() => setOpenCustomer(true)}
                                                className="relative inline-flex items-center rounded-l-md bg-pink-100 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-pink-200 focus:z-10"
                                            >
                                                <FaUserPlus className="mr-1 text-pink-500" />
                                                Add New Customer
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setOpenCFilter(true)}
                                                className="relative -ml-px inline-flex items-center rounded-r-md bg-pink-100 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-pink-50 focus:z-10"
                                            >
                                                <FaFilter className="mr-1 text-pink-500" />
                                                Filter Customers
                                            </button>
                                        </span>
                                        <AddCustomerComponent
                                            open={openCustomer}
                                            setOpenCustomer={setOpenCustomer}
                                        />
                                        <FilterCustomersComponent
                                            open={openCFilter}
                                            setOpenCFilter={setOpenCFilter}
                                        />
                                    </div>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle">
                        <table className="min-w-full border-separate border-spacing-0">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter sm:pl-6 lg:pl-8"
                                    >
                                        Customer Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter sm:table-cell"
                                    >
                                        Customer Address
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter lg:table-cell"
                                    >
                                        Customer Type
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter"
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5 pr-4 pl-3 backdrop-blur-sm backdrop-filter sm:pr-6 lg:pr-8"
                                    >
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {people.map((person, personIdx) => (
                                    <tr key={person.email}>
                                        <td
                                            className={classNames(
                                                personIdx !== people.length - 1
                                                    ? "border-b border-gray-200"
                                                    : "",
                                                "py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 lg:pl-8"
                                            )}
                                        >
                                            {person.name}
                                        </td>
                                        <td
                                            className={classNames(
                                                personIdx !== people.length - 1
                                                    ? "border-b border-gray-200"
                                                    : "",
                                                "hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 sm:table-cell"
                                            )}
                                        >
                                            {person.title}
                                        </td>
                                        <td
                                            className={classNames(
                                                personIdx !== people.length - 1
                                                    ? "border-b border-gray-200"
                                                    : "",
                                                "hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 lg:table-cell"
                                            )}
                                        >
                                            {person.email}
                                        </td>
                                        <td
                                            className={classNames(
                                                personIdx !== people.length - 1
                                                    ? "border-b border-gray-200"
                                                    : "",
                                                "px-3 py-4 text-sm whitespace-nowrap text-gray-500"
                                            )}
                                        >
                                            {person.role}
                                        </td>
                                        <td
                                            className={classNames(
                                                personIdx !== people.length - 1
                                                    ? "border-b border-gray-200"
                                                    : "",
                                                "relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-8 lg:pr-8"
                                            )}
                                        >
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
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
