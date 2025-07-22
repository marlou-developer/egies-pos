import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_product_thunk } from "@/app/redux/product-thunk";
import { peso_value } from "@/app/lib/peso";
import {
    FaCirclePlus,
    FaClipboardList,
    FaFilter,
    FaList,
    FaMagnifyingGlass,
    FaPrint,
    FaSearchengin,
    FaXmark,
} from "react-icons/fa6";
import AddProductComponent from "../components/add-products-component";
import AddCategoryComponent from "../components/add-category-component";
import FilterProductsComponent from "../components/filter-products-component";
import store from "@/app/store/store";
import { get_category_thunk } from "@/app/redux/category-thunk";
import { search_product_by_code_service } from "@/app/pages/services/product-service";
import ProductOptionMenuSection from "./product-option-menu-section";
import SearchSection from "./search-section";
import PrintSection from "./print-section";
import { setSelectAll, setSelectedProducts } from "@/app/redux/product-slice";
import PaginationSection from "./pagination-section";
import MobileCardProductComponent from "../components/mobile-card-product-component";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

function getStatusLabelAndClass(quantity) {
    if (quantity === 0) {
        return {
            label: "Out of Stock",
            className: "bg-red-50 text-red-700 ring-red-600/20",
        };
    } else if (quantity <= 10) {
        return {
            label: "Low Stock",
            className: "bg-yellow-50 text-yellow-700 ring-yellow-600/20",
        };
    }
    return {
        label: "In Stock",
        className: "bg-green-50 text-green-700 ring-green-600/20",
    };
}

export default function ProductsSection() {
    const [current, setCurrent] = useState(1);
    const [pageSize] = useState(10);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [searchCode, setSearchCode] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const dispatch = useDispatch();
    const { products, selectedProducts, selectAll, loading, error } = useSelector(
        (state) => state.products
    ) || {
        products: { data: [], total: 0, last_page: 1 },
    };

    const [openProduct, setOpenProduct] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);

    // Initialize search code from URL parameters
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const searchValue = params.get("search");
        if (searchValue) {
            setSearchCode(searchValue);
            // setShowSearchModal(true);
        }
    }, []);

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
                
                /* Show all columns in print */
                .hidden { display: table-cell !important; }
                
                /* Hide mobile-specific content in print */
                .sm\\:hidden { display: none !important; }
                
                /* Adjust icon sizes */
                img, svg, i, .icon { 
                  width: 16px !important;
                  height: 16px !important;
                }
                
                /* Ensure proper spacing */
                .flex { display: inline !important; }
                .flex-col { display: inline !important; }
                .mt-1 { margin-top: 0 !important; }
              </style>
            </head>
            <body>
              <h2>Products Report</h2>
              ${printContent.outerHTML} 
            </body>
          </html>
        `);

        printWindow.document.close();
        printWindow.print();
    };

    const handleCodeSearch = async () => {
        if (!searchCode.trim()) return;

        setIsSearching(true);
        try {
            // Call the specific product code search API
            const response = await search_product_by_code_service(searchCode.trim());
            setSearchResults(response.data.data || []);
        } catch (error) {
            console.error("Error searching by product code:", error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    const handleSelectProduct = (product) => {
        // Close modal and optionally highlight the selected product
        setShowSearchModal(false);
        setSearchCode("");
        setSearchResults([]);

        // You can add logic here to highlight or scroll to the selected product
        console.log("Selected product:", product);
    };

    const clearSearch = () => {
        setSearchCode("");
        setSearchResults([]);
        setShowSearchModal(false);
    };

    console.log("products", products);

    // Loading component function
    const LoadingComponent = ({ message = "Loading products..." }) => {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">{message}</span>
            </div>
        );
    };

    if (loading) {
        return <LoadingComponent />;
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <FaClipboardList className="float-left mr-1 mt-1 text-pink-500" />
                    <h1 className="text-base font-semibold text-pink-500">
                        Products Section
                    </h1>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() => setOpenProduct(true)}
                            className="inline-flex items-center rounded-md bg-pink-100 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-pink-200 focus:z-10"
                        >
                            <FaClipboardList className="mr-1 text-pink-500" />
                            <span className="hidden sm:inline">ADD NEW PRODUCT</span>
                            <span className="sm:hidden">ADD PRODUCT</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setOpenCategory(true)}
                            className="inline-flex items-center rounded-md bg-pink-100 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-pink-200 focus:z-10"
                        >
                            <FaList className="mr-1 text-pink-500" />
                            <span className="hidden sm:inline">ADD CATEGORY</span>
                            <span className="sm:hidden">CATEGORY</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setOpenFilter(true)}
                            className="inline-flex items-center rounded-md bg-pink-100 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-pink-50 focus:z-10"
                        >
                            <FaFilter className="mr-1 text-pink-500" />
                            <span className="hidden sm:inline">FILTER PRODUCTS</span>
                            <span className="sm:hidden">FILTER</span>
                        </button>
                    </div>
                    <AddProductComponent
                        open={openProduct}
                        setOpenProduct={setOpenProduct}
                    />
                    <AddCategoryComponent
                        open={openCategory}
                        setOpenCategory={setOpenCategory}
                    />
                    <FilterProductsComponent
                        open={openFilter}
                        setOpenFilter={setOpenFilter}
                    />
                </div>
            </div>
            <div className="mt-4 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <div className="flex-1 max-w-md">
                    <SearchSection />
                </div>
                <div className="flex-shrink-0">
                    <PrintSection />
                </div>
            </div>



            {/* Product Table */}
            <div className="mt-8 flow-root">

                <MobileCardProductComponent
                    data={products}
                    selectedData={selectedProducts}
                    dispatch={dispatch}
                    setSelectedData={setSelectedProducts}
                />

                {/* Desktop Table Layout */}
                <div className="hidden md:block">
                    <div className="relative  overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle">
                            <div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <table
                                    id="product-table"
                                    className="min-w-full divide-y divide-gray-300"
                                >
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectAll}
                                                    onChange={(e) => {
                                                        const isChecked = e.target.checked;
                                                        dispatch(setSelectAll(isChecked));
                                                        dispatch(
                                                            setSelectedProducts(
                                                                isChecked ? [...products.all] : []
                                                            )
                                                        );
                                                    }}
                                                />
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                            >
                                                <div className="flex gap-1 items-center">
                                                    ID/Code
                                                    <button
                                                        onClick={() => setShowSearchModal(true)}
                                                        className="text-gray-500 hover:text-pink-500 transition-colors"
                                                        title="Search by Product Code/ID"
                                                    >
                                                        <FaMagnifyingGlass className="h-4" />
                                                    </button>
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                            >
                                                Product
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                Brand
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                Delivery Receipt
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                Category
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                Cost Per Unit
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                Shopee Price
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                SRP
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                Reseller
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                City Distributor
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                District Distributor
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                Provincial Distributor
                                            </th>
                                            <th
                                                scope="col"
                                                className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                            >
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
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
                                                <tr key={product.id || product.name} className="hover:bg-gray-50">
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedProducts.some(
                                                                (p) => p.id === product.id
                                                            )}
                                                            onChange={(e) => {
                                                                const isChecked = e.target.checked;
                                                                const updatedSelected = isChecked
                                                                    ? [...selectedProducts, product]
                                                                    : selectedProducts.filter(
                                                                        (p) => p.id !== product.id
                                                                    );
                                                                dispatch(setSelectedProducts(updatedSelected));
                                                            }}
                                                        />
                                                    </td>
                                                    <td className="whitespace-nowrap py-4 pl-3 pr-3 text-center text-sm font-bold text-gray-700 bg-slate-100">
                                                        {product.id}
                                                    </td>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-bold text-pink-500 sm:pl-6">
                                                        {product.name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-600/20 ring-inset">
                                                            {product?.brand}
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-600/20 ring-inset">
                                                            {product?.delivery_receipt_no}
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        <span className="inline-flex items-center rounded-full bg-pink-50 px-2 py-1 text-xs font-medium text-pink-800 ring-1 ring-pink-600/20 ring-inset">
                                                            {product?.categories?.name}
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 font-bold">
                                                        {(product.cost == null || Number(product.cost) === 0)
                                                            ? "₱None"
                                                            : `₱${Number(product.cost).toFixed(2)}`}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 font-bold">
                                                        {(product.shopee == null || Number(product.shopee) === 0)
                                                            ? "₱None"
                                                            : `₱${Number(product.shopee).toFixed(2)}`}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 font-bold">
                                                        {(product.srp == null || Number(product.srp) === 0)
                                                            ? "₱None"
                                                            : `₱${Number(product.srp).toFixed(2)}`}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 font-bold">
                                                        {(product.reseller == null || Number(product.reseller) === 0)
                                                            ? "₱None"
                                                            : `₱${Number(product.reseller).toFixed(2)}`}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 font-bold">
                                                        {(product.city_distributor == null || Number(product.city_distributor) === 0)
                                                            ? "₱None"
                                                            : `₱${Number(product.city_distributor).toFixed(2)}`}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 font-bold">
                                                        {(product.district_distributor == null || Number(product.district_distributor) === 0)
                                                            ? "₱None"
                                                            : `₱${Number(product.district_distributor).toFixed(2)}`}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 font-bold">
                                                        {(product.provincial_distributor == null || Number(product.provincial_distributor) === 0)
                                                            ? "₱None"
                                                            : `₱${Number(product.provincial_distributor).toFixed(2)}`}
                                                    </td>
                                                    <td className="relative py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                                                        <ProductOptionMenuSection data={product} />
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
                <PaginationSection />
            </div>

            {/* Search Modal */}
            {showSearchModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowSearchModal(false)}></div>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="w-full">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                                Search by Product Code/ID
                                            </h3>
                                            <button
                                                onClick={() => setShowSearchModal(false)}
                                                className="text-gray-400 hover:text-gray-600"
                                            >
                                                <FaXmark className="h-5 w-5" />
                                            </button>
                                        </div>

                                        <div className="mb-4">
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    placeholder="Enter product code or ID..."
                                                    value={searchCode}
                                                    onChange={(e) => setSearchCode(e.target.value)}
                                                    onKeyPress={(e) => e.key === 'Enter' && handleCodeSearch()}
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                                    autoFocus
                                                />
                                                <button
                                                    onClick={handleCodeSearch}
                                                    disabled={isSearching || !searchCode.trim()}
                                                    className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                                >
                                                    {isSearching ? "Searching..." : "Search"}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Search Results */}
                                        <div className="max-h-64 overflow-y-auto">
                                            {isSearching && (
                                                <div className="flex justify-center items-center py-8">
                                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pink-500"></div>
                                                    <span className="ml-2 text-gray-600">Searching...</span>
                                                </div>
                                            )}

                                            {!isSearching && searchResults.length === 0 && searchCode && (
                                                <div className="text-center py-8 text-gray-500">
                                                    No products found with code "{searchCode}"
                                                </div>
                                            )}

                                            {!isSearching && searchResults.length > 0 && (
                                                <div className="space-y-2">
                                                    <h4 className="font-medium text-gray-900 mb-2">Results:</h4>
                                                    {searchResults.map((product) => (
                                                        <div
                                                            key={product.id}
                                                            onClick={() => handleSelectProduct(product)}
                                                            className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
                                                        >
                                                            <div className="flex justify-between items-start">
                                                                <div>
                                                                    <div className="font-medium text-gray-900">
                                                                        ID: {product.id}
                                                                    </div>
                                                                    <div className="text-sm text-pink-600 font-medium">
                                                                        {product.name}
                                                                    </div>
                                                                    <div className="text-xs text-gray-500">
                                                                        {product.categories?.name} • {product.brand}
                                                                    </div>
                                                                </div>
                                                                <div className="text-right text-sm">
                                                                    <div className="font-medium text-gray-900">
                                                                        ₱{Number(product.srp || 0).toFixed(2)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    onClick={clearSearch}
                                    className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Clear & Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
