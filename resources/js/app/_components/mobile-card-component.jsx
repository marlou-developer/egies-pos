import React from 'react'

export default function MobileCardComponent({ products, selectedProducts, dispatch, setSelectedProducts }) {
    return (
        <div>
            <div className="block md:hidden">
                <div className="space-y-4">
                    {products?.data?.data?.map((product, productIdx) => (
                        <div key={product.id || product.name} className="bg-white p-4 rounded-lg shadow ring-1 ring-black ring-opacity-5">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3">
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
                                            className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-sm font-bold text-pink-500">{product.name}</h3>
                                            <div className="mt-1 flex flex-wrap gap-2">
                                                {product?.categories?.name && (
                                                    <span className="inline-flex items-center rounded-full bg-pink-50 px-2 py-1 text-xs font-medium text-pink-800 ring-1 ring-pink-600/20 ring-inset">
                                                        {product.categories.name}
                                                    </span>
                                                )}
                                                {product?.brand && (
                                                    <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-600/20 ring-inset">
                                                        {product.brand}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Product Details Grid */}
                                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <dt className="font-medium text-gray-500">Cost Per Unit</dt>
                                            <dd className="mt-1 font-bold text-gray-900">
                                                {(product.cost == null || Number(product.cost) === 0)
                                                    ? "₱None"
                                                    : `₱${Number(product.cost).toFixed(2)}`}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="font-medium text-gray-500">SRP</dt>
                                            <dd className="mt-1 font-bold text-gray-900">
                                                {(product.srp == null || Number(product.srp) === 0)
                                                    ? "₱None"
                                                    : `₱${Number(product.srp).toFixed(2)}`}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="font-medium text-gray-500">Shopee Price</dt>
                                            <dd className="mt-1 font-bold text-gray-900">
                                                {(product.shopee == null || Number(product.shopee) === 0)
                                                    ? "₱None"
                                                    : `₱${Number(product.shopee).toFixed(2)}`}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="font-medium text-gray-500">Reseller</dt>
                                            <dd className="mt-1 font-bold text-gray-900">
                                                {(product.reseller == null || Number(product.reseller) === 0)
                                                    ? "₱None"
                                                    : `₱${Number(product.reseller).toFixed(2)}`}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="font-medium text-gray-500">City Distributor</dt>
                                            <dd className="mt-1 font-bold text-gray-900">
                                                {(product.city_distributor == null || Number(product.city_distributor) === 0)
                                                    ? "₱None"
                                                    : `₱${Number(product.city_distributor).toFixed(2)}`}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="font-medium text-gray-500">District Distributor</dt>
                                            <dd className="mt-1 font-bold text-gray-900">
                                                {(product.district_distributor == null || Number(product.district_distributor) === 0)
                                                    ? "₱None"
                                                    : `₱${Number(product.district_distributor).toFixed(2)}`}
                                            </dd>
                                        </div>
                                        <div className="col-span-2">
                                            <dt className="font-medium text-gray-500">Provincial Distributor</dt>
                                            <dd className="mt-1 font-bold text-gray-900">
                                                {(product.provincial_distributor == null || Number(product.provincial_distributor) === 0)
                                                    ? "₱None"
                                                    : `₱${Number(product.provincial_distributor).toFixed(2)}`}
                                            </dd>
                                        </div>
                                        {product?.delivery_receipt_no && (
                                            <div className="col-span-2">
                                                <dt className="font-medium text-gray-500">Delivery Receipt</dt>
                                                <dd className="mt-1">
                                                    <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-600/20 ring-inset">
                                                        {product.delivery_receipt_no}
                                                    </span>
                                                </dd>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* <div className="ml-4 flex-shrink-0">
                                    <ProductOptionMenuSection data={product} />
                                </div> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
