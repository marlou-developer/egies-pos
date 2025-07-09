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
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "antd";
import FilterStocksComponent from "../components/filter-stocks-component";
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
    console.log('products', products.data.data)

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto flex justify-between">
                    <h1 className="text-base font-semibold text-pink-500">
                        <FaBoxesStacked className="float-left mr-1 mt-1 text-pink-500" />
                        Stocks Section
                    </h1>

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
                                        <input
                                            type="checkbox"
                                            checked={selectAllStock}
                                            onChange={(e) => {
                                                const isChecked =
                                                    e.target.checked;
                                                dispatch(setSelectAllStock(isChecked));

                                                dispatch(
                                                    setSelectedStocks(
                                                        isChecked
                                                            ? [...products.all]
                                                            : []
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
                                        Date last stock(s) added
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
                                {products?.data?.data?.map((product, productIdx) => {
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
                                        <tr key={productIdx}>
                                            <td
                                                className={classNames(
                                                    productIdx !==
                                                        products.length - 1
                                                        ? "border-b border-gray-200"
                                                        : "",
                                                    "py-4 pl-4 pr-3 text-sm sm:pl-6 lg:pl-8"
                                                )}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedStocks.some(
                                                        (p) =>
                                                            p.id === product.id
                                                    )}
                                                    onChange={(e) => {
                                                        const isChecked =
                                                            e.target.checked;

                                                        const updatedSelected =
                                                            isChecked
                                                                ? [
                                                                    ...selectedStocks,
                                                                    product,
                                                                ]
                                                                : selectedStocks.filter(
                                                                    (p) =>
                                                                        p.id !==
                                                                        product.id
                                                                ); // Correctly compare by object.id

                                                        dispatch(
                                                            setSelectedStocks(
                                                                updatedSelected
                                                            )
                                                        );
                                                    }}
                                                />
                                            </td>

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
                                                    productIdx !==
                                                        product.length - 1
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
                                                        products.data.data.length - 1
                                                        ? "border-b border-gray-200"
                                                        : "",
                                                    "hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 lg:table-cell"
                                                )}
                                            >
                                                <span className="inline-flex items-center font-bold px-2 py-1">
                                                    {product.stocks?.length > 0
                                                        ? new Date(
                                                            [
                                                                ...product.stocks,
                                                            ].sort(
                                                                (a, b) =>
                                                                    new Date(
                                                                        b.date
                                                                    ) -
                                                                    new Date(
                                                                        a.date
                                                                    )
                                                            )[0].date
                                                        ).toLocaleDateString(
                                                            "en-US",
                                                            {
                                                                year: "numeric",
                                                                month: "short",
                                                                day: "numeric",
                                                            }
                                                        )
                                                        : "No Stocks Added"}
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
                                                    {peso_value(
                                                        Number(
                                                            product.quantity
                                                        ) * Number(product.srp)
                                                    )}
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
                                                    {peso_value(
                                                        Number(
                                                            product.quantity
                                                        ) * Number(product.cost)
                                                    )}
                                                    {/* {peso_value(((Number(product.srp) - Number(product.cost)) * Number(product.quantity)))} */}
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
                                                <div className="inline-flex items-center font-bold px-2 py-1 gap-2 ">
                                                    <AddStocksSection
                                                        data={product}
                                                    />
                                                    <StocksHistorySection
                                                        data={product}
                                                    />
                                                    <button className="bg-yellow-300 hover:bg-yellow-400 rounded-md p-2.5"
                                                        onClick={() => router.visit(`/administrator/stocks/${product.id}`)}
                                                    // onClick={() => window.open(`/administrator/stocks/${product.id}`, '_blank')}
                                                    >
                                                        <Tooltip title="Edit Added Stock(s)">
                                                            <PencilSquareIcon className="h-4" />
                                                        </Tooltip>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <PaginationSection />
                    </div>
                </div>
            </div>
        </div>
    );
}
