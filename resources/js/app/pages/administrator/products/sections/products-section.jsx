import AddProductComponent from "../components/add-products-component";
import { FaCirclePlus, FaClipboardList, FaFilter, FaList, FaPrint } from "react-icons/fa6";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
    ChevronDownIcon,
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import AddCategoryComponent from "../components/add-category-component";
import FilterProductsComponent from "../components/filter-products-component";

const product = [
    {
        product_name: "Brilliant Soap",
        category: "Soap",
        quantity: "200",
        cost_price: "100.00",
        srp_price: "250.00",
        reseller_price: "220.00",
        city_price: "200.00",
        district_price: "180.00",
        provincial_price: "150.00",
    },
    {
        product_name: "Lip Stick A",
        category: "Make-Up",
        quantity: "20",
        cost_price: "280.00",
        srp_price: "450.00",
        reseller_price: "430.00",
        city_price: "410.00",
        district_price: "390.00",
        provincial_price: "360.00",
    },
    {
        product_name: "Make-Up Kit B",
        category: "Make-Up",
        quantity: "30",
        cost_price: "400.00",
        srp_price: "550.00",
        reseller_price: "530.00",
        city_price: "510.00",
        district_price: "590.00",
        provincial_price: "560.00",
    },
    // More product...
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function ProductsSection() {
    const [openProduct, setOpenProduct] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <FaClipboardList className="float-left mr-1 mt-1 text-pink-500" />
                    <h1 className="text-base font-semibold text-pink-500">
                        Products Section
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the products in your account including
                        their product name, quantity, category and price.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                     {/* Button Group */}
            <span className="isolate inline-flex rounded-md shadow-xs">
                <button
                    type="button"
                    onClick={() => setOpenProduct(true)} // Set openProduct state to true when clicked
                    className="relative inline-flex items-center rounded-l-md bg-pink-100 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-pink-200 focus:z-10"
                >
                    <FaClipboardList className="float-left mr-1 text-pink-500" />
                    Add New Product
                </button>
                <button
                    type="button"
                    onClick={() => setOpenCategory(true)}
                    className="relative -ml-px inline-flex items-center bg-pink-100 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-pink-200 focus:z-10"
                >
                    <FaList className="float-left mr-1 text-pink-500" />
                    Add Category
                </button>
                <button
                    type="button" // Set openProduct state to true when clicked
                    className="relative -ml-px inline-flex items-center bg-pink-100 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-pink-200 focus:z-10"
                >
                    <FaPrint className="float-left mr-1 text-pink-500" />
                    Print
                </button>
                <button
                    type="button"
                    onClick={() => setOpenFilter(true)}
                    className="relative -ml-px inline-flex items-center rounded-r-md bg-pink-100 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-pink-50 focus:z-10"
                >
                    <FaFilter className="float-left mr-1 text-pink-500" />
                    Filter Products
                </button>
            </span>

            <AddProductComponent open={openProduct} setOpenProduct={setOpenProduct} />
            <AddCategoryComponent open={openCategory} setOpenCategory={setOpenCategory} />
            <FilterProductsComponent open={openFilter} setOpenFilter={setOpenFilter} />
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
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-600 backdrop-blur-sm backdrop-filter sm:pl-6 lg:pl-8"
                                    >
                                        Product
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-600 backdrop-blur-sm backdrop-filter sm:table-cell"
                                    >
                                        Category
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-600 backdrop-blur-sm backdrop-filter lg:table-cell"
                                    >
                                        Quantity
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-600 backdrop-blur-sm backdrop-filter"
                                    >
                                        Cost Per Unit
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-600 backdrop-blur-sm backdrop-filter"
                                    >
                                        SRP
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-600 backdrop-blur-sm backdrop-filter"
                                    >
                                        Reseller
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-600 backdrop-blur-sm backdrop-filter"
                                    >
                                        City Distributor
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-600 backdrop-blur-sm backdrop-filter"
                                    >
                                        District Distributor
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-600 backdrop-blur-sm backdrop-filter"
                                    >
                                        Provincial Distributor
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
                                {product.map((product, productIdx) => (
                                    <tr key={product.product_name}>
                                        <td
                                            className={classNames(
                                                productIdx !==
                                                    product.length - 1
                                                    ? "border-b border-gray-200"
                                                    : "",
                                                "py-4 pr-3 pl-4 text-sm font-bold whitespace-nowrap text-pink-500 sm:pl-6 lg:pl-8"
                                            )}
                                        >
                                            {product.product_name}
                                        </td>
                                        <td
                                            className={classNames(
                                                productIdx !==
                                                    product.length - 1
                                                    ? "border-b border-gray-200"
                                                    : "",
                                                "hidden px-3 py-4 text-sm font-bold whitespace-nowrap text-gray-500 sm:table-cell"
                                            )}
                                        >
                                            <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 mr-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-600/20 ring-inset">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td
                                            className={classNames(
                                                productIdx !==
                                                    product.length - 1
                                                    ? "border-b border-gray-200"
                                                    : "",
                                                "hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 lg:table-cell"
                                            )}
                                        >
                                            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                                                {product.quantity}
                                            </span>
                                            <span className="inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 mx-1 text-xs font-medium text-yellow-500 ring-1 ring-yellow-400/20 ring-inset">
                                                In Stock
                                            </span>
                                        </td>
                                        <td
                                            className={classNames(
                                                productIdx !==
                                                    product.length - 1
                                                    ? "border-b border-gray-200"
                                                    : "",
                                                "px-3 py-4 text-sm whitespace-nowrap text-gray-700 font-bold"
                                            )}
                                        >
                                            ₱{product.cost_price}
                                        </td>
                                        <td
                                            className={classNames(
                                                productIdx !==
                                                    product.length - 1
                                                    ? "border-b border-gray-200"
                                                    : "",
                                                "px-3 py-4 text-sm whitespace-nowrap text-gray-700 font-bold"
                                            )}
                                        >
                                            ₱{product.srp_price}
                                        </td>
                                        <td
                                            className={classNames(
                                                productIdx !==
                                                    product.length - 1
                                                    ? "border-b border-gray-200"
                                                    : "",
                                                "px-3 py-4 text-sm whitespace-nowrap text-gray-700 font-bold"
                                            )}
                                        >
                                            ₱{product.reseller_price}
                                        </td>
                                        <td
                                            className={classNames(
                                                productIdx !==
                                                    product.length - 1
                                                    ? "border-b border-gray-200"
                                                    : "",
                                                "px-3 py-4 text-sm whitespace-nowrap text-gray-700 font-bold"
                                            )}
                                        >
                                            ₱{product.city_price}
                                        </td>
                                        <td
                                            className={classNames(
                                                productIdx !==
                                                    product.length - 1
                                                    ? "border-b border-gray-200"
                                                    : "",
                                                "px-3 py-4 text-sm whitespace-nowrap text-gray-700 font-bold"
                                            )}
                                        >
                                            ₱{product.district_price}
                                        </td>
                                        <td
                                            className={classNames(
                                                productIdx !==
                                                    product.length - 1
                                                    ? "border-b border-gray-200"
                                                    : "",
                                                "px-3 py-4 text-sm whitespace-nowrap text-gray-700 font-bold"
                                            )}
                                        >
                                            ₱{product.provincial_price}
                                        </td>
                                        <td
                                            className={classNames(
                                                productIdx !==
                                                    product.length - 1
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
                                                    <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-pink-100 px-3 py-2 text-sm font-semibold text-gray-600 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-pink-200 hover:text-gray-700">
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
                                                                Edit Product
                                                            </a>
                                                        </MenuItem>
                                                        <MenuItem className="group">
                                                            <a
                                                                href="#"
                                                                className="group flex items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                                            >
                                                                <FaCirclePlus
                                                                    aria-hidden="true"
                                                                    className="mr-3 size-5 text-gray-400 group-data-focus:text-gray-500"
                                                                />
                                                                Add Stock
                                                            </a>
                                                        </MenuItem>
                                                    </div>
                                                    <div className="py-1">
                                                        <MenuItem className="group">
                                                            <a
                                                                href="#"
                                                                className="group flex items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                                            >
                                                                <TrashIcon
                                                                    aria-hidden="true"
                                                                    className="mr-3 size-5 text-gray-400 group-data-focus:text-gray-500"
                                                                />
                                                                Remove Product
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
