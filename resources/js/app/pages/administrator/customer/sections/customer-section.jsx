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
import CustomerMenuSection from "./customer-menu-section";
import { useSelector } from "react-redux";

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
    const { customers } = useSelector((state) => state.customers)
    const [openCustomer, setOpenCustomer] = useState(false);
    const [openCFilter, setOpenCFilter] = useState(false);

    console.log('customers', customers)
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
                                        Mobile No.
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter lg:table-cell"
                                    >
                                        Email
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
                                {customers?.result?.map((customer, customerIdx) => (
                                    <tr key={customer.email}>
                                        <td
                                            className={classNames(
                                                customerIdx !== customers.length - 1
                                                    ? "border-b border-gray-200"
                                                    : "",
                                                "py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 lg:pl-8"
                                            )}
                                        >
                                            {customer.name}
                                        </td>
                                        <td
                                            className={classNames(
                                                customerIdx !== customers.length - 1
                                                    ? "border-b border-gray-200"
                                                    : "",
                                                "hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 sm:table-cell"
                                            )}
                                        >
                                            {customer.street}, {customer.postal}, {customer.brgy}, {customer.city}, {customer.province}
                                        </td>
                                        <td
                                            className={classNames(
                                                customerIdx !== customers.length - 1
                                                    ? "border-b border-gray-200"
                                                    : "",
                                                "hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 lg:table-cell"
                                            )}
                                        >
                                            {customer.mobile_no}
                                        </td>
                                        <td
                                            className={classNames(
                                                customerIdx !== customers.length - 1
                                                    ? "border-b border-gray-200"
                                                    : "",
                                                "hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 lg:table-cell"
                                            )}
                                        >
                                            {customer.email}
                                        </td>
                                        <td
                                            className={classNames(
                                                customerIdx !== customers.length - 1
                                                    ? "border-b border-gray-200"
                                                    : "",
                                                "px-3 py-4 text-sm whitespace-nowrap text-gray-500"
                                            )}
                                        >
                                            {customer.role}
                                        </td>
                                        <td
                                            className={classNames(
                                                customerIdx !== customers.length - 1
                                                    ? "border-b border-gray-200"
                                                    : "",
                                                "px-3 py-4 text-sm whitespace-nowrap text-gray-500"
                                            )}
                                        >
                                            {customer.role}
                                        </td>
                                        <td
                                            className={classNames(
                                                customerIdx !== customers.length - 1
                                                    ? "border-b border-gray-200"
                                                    : "",
                                                "relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-8 lg:pr-8"
                                            )}
                                        >
                                            <CustomerMenuSection />
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
