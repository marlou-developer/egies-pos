import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_soft_deleted_product_thunk } from '@/app/redux/product-thunk';
import RestoreSection from '../../sections/restore-section';
import { peso_value } from '@/app/lib/peso';

function SoftDeletedTablesSection() {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const [showRestoreModal, setShowRestoreModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Fetch soft deleted products on component mount
    useEffect(() => {
        dispatch(get_soft_deleted_product_thunk({ page: 1, search: '' }));
    }, [dispatch]);

    // Handle different API response structures
    const productsData = products?.products || products?.data || products;
    const productList = productsData?.data || [];

    const handleRestoreClick = (product) => {
        setSelectedProduct(product);
        setShowRestoreModal(true);
    };

    const handleRestoreSuccess = () => {
        setShowRestoreModal(false);
        setSelectedProduct(null);
        // Refresh the soft deleted products list
        dispatch(get_soft_deleted_product_thunk({ page: 1, search: '' }));
    };

    const handleRestoreCancel = () => {
        setShowRestoreModal(false);
        setSelectedProduct(null);
    };


    console.log('Soft Deleted Products:', productList);
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading soft deleted products...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                    <div className="text-red-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-2">
                        <h3 className="text-sm font-medium text-red-800">Error loading soft deleted products</h3>
                        <p className="text-sm text-red-700 mt-1">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!productList || productList.length === 0) {
        return (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                <div className="text-gray-500">
                    <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No soft deleted products</h3>
                    <p className="text-gray-600">There are no soft deleted products to display.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Desktop Table */}
            <div className="hidden md:block">
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Stocks
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Price
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Deleted At
                                </th> */}
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {productList.map((product) => {
                                let statusClass =
                                    "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20";

                                if (product.quantity == 0) {
                                    statusClass =
                                        "inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20";
                                } else if (product.quantity >= 1 && product.quantity <= 10) {
                                    statusClass =
                                        "inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20";
                                }

                                return (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="">
                                                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-gray-900">
                                                {product.categories?.name || 'No Category'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-gray-900">
                                                {product.quantity || '0'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-gray-900">
                                                {peso_value(
                                                    Number(product.cost)
                                                )}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={statusClass}>
                                                {product.quantity == 0
                                                    ? "Out of Stock"
                                                    : product.quantity <= 10
                                                        ? "Low Stock"
                                                        : "In Stock"}
                                            </span>
                                        </td>
                                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {product.deleted_at ? new Date(product.deleted_at).toLocaleDateString() : 'N/A'}
                                        </td> */}
                                        <td className="inline-flex items-center gap-2 px-6 py-4 whitespace-nowrap">
                                            <RestoreSection data={product} />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>

                    </table>
                </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
                {productList.map((product) => (
                    <div key={product.id} className="bg-white shadow-sm rounded-lg p-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <img
                                    className="h-12 w-12 rounded-full object-cover"
                                    src={product.image || '/images/default-product.png'}
                                    alt={product.name}
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-gray-900 truncate">{product.name}</div>
                                <div className="text-sm text-gray-500">{product.sku}</div>
                                <div className="text-sm text-gray-500">
                                    {product.category?.name || 'No Category'} • ${product.price}
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                    Soft Deleted
                                </span>
                                <span className="text-xs text-gray-500">
                                    {product.deleted_at ? new Date(product.deleted_at).toLocaleDateString() : 'N/A'}
                                </span>
                            </div>
                            <RestoreSection data={product} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SoftDeletedTablesSection;
