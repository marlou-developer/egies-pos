import { FaBook, FaFilter, FaPercent, FaPlus, FaTruck, FaUserPlus, FaUsers } from "react-icons/fa6";
import { useState } from "react";
import { useSelector } from "react-redux";
import SearchSection from "./search-section";
import AddSupplierComponent from "../components/add-supplier-component";
import SupplierMenuSection from "./supplier-menu-section";
import EditSupplierSection from "./edit-supplier-section";
import DeleteSupplierSection from "./delete-supplier-section";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function SupplierSection() {
    const { suppliers } = useSelector((state) => state.suppliers)

    const [openSupplier, setOpenSupplier] = useState(false);
    const [openSFilter, setOpenSFilter] = useState(false);


    console.log('suppliers', suppliers)

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <FaTruck className="float-left mt-1 mr-1 text-pink-500" />
                    <h1 className="text-base font-semibold text-pink-500">
                        Supplier Section
                    </h1>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <span className="isolate inline-flex rounded-md shadow-xs">
                            <button
                                type="button"
                                onClick={() => setOpenSupplier(true)}
                                className="relative inline-flex items-center rounded-l-md bg-pink-100 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-pink-200 focus:z-10"
                            >
                                <FaPlus className="mr-1 text-pink-500" />
                                ADD NEW SUPPLIER
                            </button>
                            {/* <button
                                type="button"
                                onClick={() => setOpenSFilter(true)}
                                className="relative -ml-px inline-flex items-center rounded-r-md bg-pink-100 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-pink-50 focus:z-10"
                            >
                                <FaFilter className="mr-1 text-pink-500" />
                                Filter Supplier
                            </button> */}
                        </span>
                        <AddSupplierComponent
                            open={openSupplier}
                            setOpenSupplier={setOpenSupplier}
                        />
                        {/* <FilterCustomersComponent
                            open={openSFilter}
                            setOpenSFilter={setOpenSFilter}
                        /> */}
                    </div>
                </div>
            </div>
            <div className="mt-4 flex items-start justify-start">
                <SearchSection />
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle">
                        <table className="min-w-full border-separate border-spacing-0">
                            <thead>
                                <tr>
                                    {[
                                        "Supplier Name",
                                        "Address",
                                        "Contact Person",
                                        "Contact No.",
                                        "Email",
                                        "",
                                    ].map((header, idx) => (
                                        <th
                                            key={idx}
                                            scope="col"
                                            className={classNames(
                                                "sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5 px-3 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter",
                                                idx === 0 &&
                                                "pl-4 sm:pl-6 lg:pl-8",
                                                idx === 6 &&
                                                "pr-4 sm:pr-6 lg:pr-8"
                                            )}
                                        >
                                            {header || (
                                                <span className="sr-only">
                                                    Actions
                                                </span>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                                {/* <tr>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter sm:pl-6 lg:pl-8"
                                    >
                                        Supplier Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter sm:table-cell"
                                    >
                                        Address
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter lg:table-cell"
                                    >
                                        Contact Person
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter lg:table-cell"
                                    >
                                        Contact No.
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur-sm backdrop-filter lg:table-cell"
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5 pr-4 pl-3 backdrop-blur-sm backdrop-filter sm:pr-6 lg:pr-8"
                                    >
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr> */}
                            </thead>
                            <tbody>
                                {Array.isArray(suppliers) && suppliers.length > 0 ? (
                                    suppliers.map((supplier, supplierIdx) => (
                                        <tr key={supplierIdx}>
                                            <td
                                                className={classNames(
                                                    supplierIdx !== suppliers.length - 1 ? "border-b border-gray-200" : "",
                                                    "whitespace-nowrap border-b border-gray-200 py-4 pr-3 text-sm text-gray-900 sm:pl-8"
                                                )}
                                            >
                                                {supplier.name}
                                            </td>
                                            <td
                                                className={classNames(
                                                    supplierIdx !== suppliers.length - 1 ? "border-b border-gray-200" : "",
                                                    "whitespace-nowrap border-b border-gray-200 py-4 pr-3 text-sm text-gray-900 sm:pl-3"
                                                )}
                                            >
                                                {supplier.address}
                                            </td>
                                            <td
                                                className={classNames(
                                                    supplierIdx !== suppliers.length - 1 ? "border-b border-gray-200" : "",
                                                    "whitespace-nowrap border-b border-gray-200 py-4 pr-3 text-sm text-gray-900 sm:pl-3"
                                                )}
                                            >
                                                {supplier.contact_person}
                                            </td>
                                            <td
                                                className={classNames(
                                                    supplierIdx !== suppliers.length - 1 ? "border-b border-gray-200" : "",
                                                    "whitespace-nowrap border-b border-gray-200 py-4 pr-3 text-sm text-gray-900 sm:pl-3"
                                                )}
                                            >
                                                {supplier.contact_no}
                                            </td>
                                            <td
                                                className={classNames(
                                                    supplierIdx !== suppliers.length - 1 ? "border-b border-gray-200" : "",
                                                    "whitespace-nowrap border-b border-gray-200 py-4 pr-3 text-sm text-gray-900 sm:pl-3"
                                                )}
                                            >
                                                {supplier.email}
                                            </td>
                                            <td
                                                className={classNames(
                                                    supplierIdx !== suppliers.length - 1 ? "border-b border-gray-200" : "",
                                                    "px-3 py-4 text-sm text-gray-700"
                                                )}
                                            >
                                                <div className="inline-flex items-center font-bold px-2 py-1 gap-2">
                                                    <EditSupplierSection data={supplier} />
                                                    <DeleteSupplierSection data={supplier} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4 text-sm text-gray-500">
                                            No data available
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
