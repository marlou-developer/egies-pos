import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaBoxesStacked, FaClipboardList, FaFilter, FaSquarePlus } from "react-icons/fa6";
import store from "@/app/store/store";
import AddStocksSection from "./add-stocks-section";
import StocksHistorySection from "./stocks-history-section";
import { peso_value } from "@/app/lib/peso";
import SearchSection from "./search-section";
import { Link, router } from "@inertiajs/react";
import PaginationSection from "./pagination-section";
import { setSelectAllStock, setSelectedStocks } from "@/app/redux/product-slice";
import PrintSection from "./print-section";
import { ArrowRightIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "antd";
import FilterStocksComponent from "../components/filter-stocks-component";
import SoftDeleteSection from "./soft-delete-section";
function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

// function getStatusLabelAndClass(quantity) {
//     if (quantity === 0) {
//         return {
//             label: "Out of Stock",
//             className: "bg-red-50 text-red-700 ring-red-600/20",
//         };
//     } else if (quantity <= 10) {
//         return {
//             label: "Low Stock",
//             className: "bg-yellow-50 text-yellow-700 ring-yellow-600/20",
//         };
//     }
//     return {
//         label: "In Stock",
//         className: "bg-green-50 text-green-700 ring-green-600/20",
//     };
// }

export default function StocksSection() {

    const { products, selectedStocks, selectAllStock } = useSelector(
        (state) => state.products
    ) || {
        products: { data: [], total: 0, last_page: 1 },
    };

    const dispatch = useDispatch();

    const [openProduct, setOpenProduct] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);

    const handlePrint = () => {
        const printContent = document.getElementById("product-table"); // Get the table by its ID

        if (!printContent) {
            console.error("Table content not found.");
            return;
        }

        const printWindow = window.open("", "", "height=600,width=800");

        printWindow.document.write(`
          <html>
            <head>
              <title>Products</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { padding: 8px; text-align: left; border: 1px solid #000; }
                th { background-color: #f4f4f4; }
                
                th:nth-child(10), td:nth-child(10) {
                  display: none;
                }
    
                /* Adjust icon sizes */
                img, svg, i, .icon { 
                  width: 16px !important;
                  height: 16px !important;
                }
              </style>
            </head>
            <body>
              <h2>Report</h2>
              ${printContent.outerHTML} 
            </body>
          </html>
        `);

        printWindow.document.close();
        printWindow.print();
    };
    console.log('products', products.data)

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto flex justify-between">
                    <h1 className="text-base font-semibold text-pink-500">
                        <FaBoxesStacked className="float-left mr-1 mt-1 text-pink-500" />
                        Stocks Section
                    </h1>ss
                    <div>
                        <button type="button" onClick={() => (router.visit('stocks/soft_deleted'))} className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-pink-500 hover:bg-pink-600 p-3 text-sm font-semibold text-white shadow-xs ring-1 ring-gray-300 ring-inset">
                            View Removed Products<ArrowRightIcon className="h-5" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-4 flex items-start justify-between">
                <SearchSection />
                <div className="flex gap-3">
                    <PrintSection />
                    <FilterStocksComponent
                        open={openFilter}
                        setOpenFilter={setOpenFilter}
                    />
                </div>
            </div>


            {/* Mobile Card Layout */}
            <div className="mt-8 block md:hidden">
                <div className="space-y-4">
                    {/* Select All for Mobile */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={selectAllStock}
                                onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    dispatch(setSelectAllStock(isChecked));
                                    dispatch(
                                        setSelectedStocks(
                                            isChecked ? [...products.all] : []
                                        )
                                    );
                                }}
                                className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                            />
                            <span className="text-sm font-medium text-gray-700">
                                Select All
                            </span>
                        </label>
                    </div>

                    {products?.data?.data?.map((product, productIdx) => {
                        let statusClass =
                            "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20";

                        if (product.quantity == 0) {
                            statusClass =
                                "inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20";
                        } else if (
                            product.quantity >= 1 &&
                            product.quantity <= 10
                        ) {
                            statusClass =
                                "inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20";
                        }

                        const lastStockDate = product.stocks?.length > 0
                            ? new Date(
                                [...product.stocks].sort(
                                    (a, b) => new Date(b.date) - new Date(a.date)
                                )[0].date
                            ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })
                            : "No Stocks Added";

                        return (
                            <div key={productIdx} className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedStocks.some(
                                                (p) => p.id === product.id
                                            )}
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                const updatedSelected = isChecked
                                                    ? [...selectedStocks, product]
                                                    : selectedStocks.filter(
                                                        (p) => p.id !== product.id
                                                    );
                                                dispatch(setSelectedStocks(updatedSelected));
                                            }}
                                            className="mt-1 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-sm font-bold text-pink-500 mb-2">
                                                {product.name}
                                            </h3>

                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-gray-500">Cost Price:</span>
                                                    <span className="text-sm font-bold text-gray-900">
                                                        {peso_value(
                                                            Number(product.cost)
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-gray-500">Stock:</span>
                                                    <span className="text-sm font-bold text-gray-900">
                                                        {product.quantity}
                                                    </span>
                                                </div>

                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-gray-500">Status:</span>
                                                    <span className={statusClass}>
                                                        {product.quantity == 0
                                                            ? "Out of Stock"
                                                            : product.quantity <= 10
                                                                ? "Low Stock"
                                                                : "In Stock"}
                                                    </span>
                                                </div>

                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-gray-500">Last Added:</span>
                                                    <span className="text-xs font-medium text-gray-700">
                                                        {lastStockDate}
                                                    </span>
                                                </div>

                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-gray-500">Retail Value:</span>
                                                    <span className="text-sm font-bold text-green-600">
                                                        {peso_value(
                                                            Number(product.quantity) * Number(product.srp)
                                                        )}
                                                    </span>
                                                </div>

                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-gray-500">Capital:</span>
                                                    <span className="text-sm font-bold text-blue-600">
                                                        {peso_value(
                                                            Number(product.quantity) * Number(product.cost)
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-end space-x-2">
                                        <AddStocksSection data={product} />
                                        <StocksHistorySection data={product} />
                                        <button
                                            className="bg-yellow-300 hover:bg-yellow-400 rounded-md p-2.5"
                                            onClick={() => router.visit(`/administrator/stocks/${product.id}`)}
                                        >
                                            <Tooltip title="Edit Added Stock(s)">
                                                <PencilSquareIcon className="h-4" />
                                            </Tooltip>
                                        </button>
                                        <SoftDeleteSection data={product} />
                                    </div>
                                </div>


                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Desktop Table Layout */}
            <div className="mt-8 hidden md:block">
                <div className="flow-root">
                    <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle">
                            <table
                                id="product-table"
                                className="min-w-full border-separate border-spacing-0"
                            >
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-600 backdrop-blur-sm backdrop-filter sm:pl-6 lg:pl-8"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectAllStock}
                                                onChange={(e) => {
                                                    const isChecked = e.target.checked;
                                                    dispatch(setSelectAllStock(isChecked));
                                                    dispatch(
                                                        setSelectedStocks(
                                                            isChecked ? [...products.all] : []
                                                        )
                                                    );
                                                }}
                                            />
                                        </th>
                                        <th
                                            scope="col"
                                            className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-600 backdrop-blur-sm backdrop-filter sm:pl-6 lg:pl-8"
                                        >
                                            Product
                                        </th>
                                        <th
                                            scope="col"
                                            className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-600 backdrop-blur-sm backdrop-filter"
                                        >
                                            Stocks
                                        </th>
                                        <th
                                            scope="col"
                                            className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-600 backdrop-blur-sm backdrop-filter"
                                        >
                                            Cost Price
                                        </th>
                                        <th
                                            scope="col"
                                            className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-600 backdrop-blur-sm backdrop-filter"
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-600 backdrop-blur-sm backdrop-filter"
                                        >
                                            Date last stock(s) added
                                        </th>
                                        <th
                                            scope="col"
                                            className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-600 backdrop-blur-sm backdrop-filter"
                                        >
                                            Total Inventory Retail Price
                                        </th>
                                        <th
                                            scope="col"
                                            className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-600 backdrop-blur-sm backdrop-filter"
                                        >
                                            Total Inventory Capital
                                        </th>
                                        <th
                                            scope="col"
                                            className="sticky top-0 z-10 border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-600 backdrop-blur-sm backdrop-filter"
                                        >
                                            <span className="sr-only">Action</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products?.data?.data?.map((product, productIdx) => {
                                        let statusClass =
                                            "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20";

                                        if (product.quantity == 0) {
                                            statusClass =
                                                "inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20";
                                        } else if (
                                            product.quantity >= 1 &&
                                            product.quantity <= 10
                                        ) {
                                            statusClass =
                                                "inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20";
                                        }

                                        return (
                                            <tr key={productIdx}>
                                                <td
                                                    className={classNames(
                                                        productIdx !== products.data.data.length - 1
                                                            ? "border-b border-gray-200"
                                                            : "",
                                                        "py-4 pl-4 pr-3 text-sm sm:pl-6 lg:pl-8"
                                                    )}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedStocks.some(
                                                            (p) => p.id === product.id
                                                        )}
                                                        onChange={(e) => {
                                                            const isChecked = e.target.checked;
                                                            const updatedSelected = isChecked
                                                                ? [...selectedStocks, product]
                                                                : selectedStocks.filter(
                                                                    (p) => p.id !== product.id
                                                                );
                                                            dispatch(setSelectedStocks(updatedSelected));
                                                        }}
                                                    />
                                                </td>
                                                <td
                                                    className={classNames(
                                                        productIdx !== products.data.data.length - 1
                                                            ? "border-b border-gray-200"
                                                            : "",
                                                        "py-4 px-3 pl-4 text-sm font-bold text-pink-500"
                                                    )}
                                                >
                                                    {product.name}
                                                </td>
                                                <td
                                                    className={classNames(
                                                        productIdx !== products.data.data.length - 1
                                                            ? "border-b border-gray-200"
                                                            : "",
                                                        "px-3 py-4 text-sm whitespace-nowrap text-gray-500"
                                                    )}
                                                >
                                                    <span className="inline-flex items-center font-bold px-2 py-1">
                                                        {product.quantity}
                                                    </span>
                                                </td>
                                                <td
                                                    className={classNames(
                                                        productIdx !== products.data.data.length - 1
                                                            ? "border-b border-gray-200"
                                                            : "",
                                                        "px-3 py-4 text-sm font-bold whitespace-nowrap text-gray-500"
                                                    )}
                                                >
                                                    {product.cost == null || Number(product.cost) === 0
                                                        ? "₱None"
                                                        : `₱${Number(product.cost).toFixed(2)}`}
                                                </td>
                                                <td
                                                    className={classNames(
                                                        productIdx !== products.data.data.length - 1
                                                            ? "border-b border-gray-200"
                                                            : "",
                                                        "px-3 py-4 text-sm font-bold whitespace-nowrap text-gray-500"
                                                    )}
                                                >
                                                    <span className={statusClass}>
                                                        {product.quantity == 0
                                                            ? "Out of Stock"
                                                            : product.quantity <= 10
                                                                ? "Low Stock"
                                                                : "In Stock"}
                                                    </span>
                                                </td>
                                                <td
                                                    className={classNames(
                                                        productIdx !== products.data.data.length - 1
                                                            ? "border-b border-gray-200"
                                                            : "",
                                                        "px-3 py-4 text-sm whitespace-nowrap text-gray-500"
                                                    )}
                                                >
                                                    <span className="inline-flex items-center font-bold px-2 py-1">
                                                        {product.stocks?.length > 0
                                                            ? new Date(
                                                                [...product.stocks].sort(
                                                                    (a, b) =>
                                                                        new Date(b.date) - new Date(a.date)
                                                                )[0].date
                                                            ).toLocaleDateString("en-US", {
                                                                year: "numeric",
                                                                month: "short",
                                                                day: "numeric",
                                                            })
                                                            : "No Stocks Added"}
                                                    </span>
                                                </td>
                                                <td
                                                    className={classNames(
                                                        productIdx !== products.data.data.length - 1
                                                            ? "border-b border-gray-200"
                                                            : "",
                                                        "px-3 py-4 text-sm whitespace-nowrap text-gray-500"
                                                    )}
                                                >
                                                    <span className="inline-flex items-center font-bold px-2 py-1">
                                                        {peso_value(
                                                            Number(product.quantity) * Number(product.srp)
                                                        )}
                                                    </span>
                                                </td>
                                                <td
                                                    className={classNames(
                                                        productIdx !== products.data.data.length - 1
                                                            ? "border-b border-gray-200"
                                                            : "",
                                                        "px-3 py-4 text-sm whitespace-nowrap text-gray-500"
                                                    )}
                                                >
                                                    <span className="inline-flex items-center font-bold px-2 py-1">
                                                        {peso_value(
                                                            Number(product.quantity) * Number(product.cost)
                                                        )}
                                                    </span>
                                                </td>
                                                <td
                                                    className={classNames(
                                                        productIdx !== products.data.data.length - 1
                                                            ? "border-b border-gray-200"
                                                            : "",
                                                        "px-3 py-4 text-sm text-gray-700"
                                                    )}
                                                >
                                                    <div className="inline-flex items-center gap-2">
                                                        <AddStocksSection data={product} />
                                                        <StocksHistorySection data={product} />
                                                        <button
                                                            className="bg-yellow-300 hover:bg-yellow-400 rounded-md p-2.5"
                                                            onClick={() => router.visit(`/administrator/stocks/${product.id}`)}
                                                        >
                                                            <Tooltip title="Edit Added Stock(s)">
                                                                <PencilSquareIcon className="h-4" />
                                                            </Tooltip>
                                                        </button>
                                                        <SoftDeleteSection data={product} />
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pagination */}
            <div className="mt-8">
                <PaginationSection />
            </div>
        </div>
    );
}
