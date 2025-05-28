import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    FaBoxesStacked,
    FaClipboardList,
    FaSquarePlus,
} from "react-icons/fa6";
import store from "@/app/store/store";
import AddStocksSection from "./add-stocks-section";
import StocksHistorySection from "./stocks-history-section";
import { peso_value } from "@/app/lib/peso";
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
    const [current, setCurrent] = useState(1);
    const [pageSize] = useState(10);

    const { products } = useSelector((state) => state.products) || {
        products: { data: [], total: 0, last_page: 1 },
    };

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

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <FaBoxesStacked className="float-left mr-1 mt-1 text-pink-500" />
                    <h1 className="text-base font-semibold text-pink-500">
                        Stocks Section
                    </h1>
                </div>
            </div>

            {/* Product Table */}
            <div className="mt-8 flow-root">
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
                                        Product
                                    </th>
                                    {/* <th
                                        scope="col"
                                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-600 backdrop-blur-sm backdrop-filter sm:table-cell"
                                    >
                                        Delivery Receipt
                                    </th> */}
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-600 backdrop-blur-sm backdrop-filter sm:table-cell"
                                    >
                                        Stocks
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-600 backdrop-blur-sm backdrop-filter sm:table-cell"
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-600 backdrop-blur-sm backdrop-filter sm:table-cell"
                                    >
                                        Total Inventory Retail Price
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-600 backdrop-blur-sm backdrop-filter sm:table-cell"
                                    >
                                        Total Inventory Capital
                                    </th>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white/75 px-3 py-3.5 text-left text-sm font-semibold text-gray-600 backdrop-blur-sm backdrop-filter sm:table-cell"
                                    >
                                        <span className="sr-only">Action</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {products?.data?.map((product, productIdx) => {
                                    let quantityy = product?.quantity; // Default status
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
                                        <tr key={product.id || product.name}>
                                            <td
                                                className={classNames(
                                                    productIdx !==
                                                        products.length - 1
                                                        ? "border-b border-gray-200"
                                                        : "",
                                                    "py-4 px-3 pl-4 text-sm font-bold text-pink-500"
                                                )}
                                            >
                                                {product.name}
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
                                                <span className="inline-flex items-center font-bold px-2 py-1">
                                                    {product.quantity}
                                                </span>
                                            </td>
                                            <td
                                                className={classNames(
                                                    productIdx !== product.length - 1
                                                        ? "border-b border-gray-200"
                                                        : "",
                                                    "hidden px-3 py-4 text-sm font-bold whitespace-nowrap text-gray-500 sm:table-cell"
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
                                                    productIdx !==
                                                        product.length - 1
                                                        ? "border-b border-gray-200"
                                                        : "",
                                                    "hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 lg:table-cell"
                                                )}
                                            >
                                                <span className="inline-flex items-center font-bold px-2 py-1">
                                                   {peso_value((Number(product.quantity) * Number(product.cost)))}
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
                                                <span className="inline-flex items-center font-bold px-2 py-1">
                                                   {peso_value(((Number(product.srp) - Number(product.cost)) * Number(product.quantity)))}
                                                </span>
                                            </td>
                                            <td
                                                className={classNames(
                                                    productIdx !==
                                                        product.length - 1
                                                        ? "border-b border-gray-200"
                                                        : "",
                                                    "text-sm text-gray-700 "
                                                )}
                                            >
                                                <div className="inline-flex items-center font-bold px-2 py-1 gap-4 ">
                                                    <AddStocksSection data={product} />
                                                    <StocksHistorySection data={product} />
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="w-full mt-4">
                            {products?.last_page > 1 && (
                                <div className="flex justify-between items-center">
                                    <div>
                                        Showing {(current - 1) * pageSize + 1}{" "}
                                        to{" "}
                                        {Math.min(
                                            current * pageSize,
                                            products.total
                                        )}{" "}
                                        of {products.total} entries
                                    </div>
                                    <div className="flex space-x-2">
                                        {Array.from(
                                            { length: products.last_page },
                                            (_, i) => i + 1
                                        ).map((pageNum) => (
                                            <button
                                                key={pageNum}
                                                onClick={() =>
                                                    setCurrent(pageNum)
                                                }
                                                className={`px-3 py-1 border rounded ${pageNum === current
                                                    ? "bg-pink-500 text-white"
                                                    : "bg-white text-pink-500 border-pink-500"
                                                    }`}
                                            >
                                                {pageNum}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
