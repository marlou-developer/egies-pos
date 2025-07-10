import React from 'react'
import ProductOptionMenuSection from '../sections/product-option-menu-section';

export default function MobileCardProductComponent({ data, selectedData, dispatch, setSelectedData }) {
    return (
        <div>
            <div className="block md:hidden">
                <div className="space-y-4">
                    {data?.data?.data?.map((data, dataIdx) => (
                        <div key={data.id || data.name} className="bg-white p-4 rounded-lg shadow ring-1 ring-black ring-opacity-5">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedData.some(
                                                (p) => p.id === data.id
                                            )}
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                const updatedSelected = isChecked
                                                    ? [...selectedData, data]
                                                    : selectedData.filter(
                                                        (p) => p.id !== data.id
                                                    );
                                                dispatch(setSelectedData(updatedSelected));
                                            }}
                                            className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-sm font-bold text-pink-500">{data.name}</h3>
                                            <div className="mt-1 flex flex-wrap gap-2">
                                                {data?.categories?.name && (
                                                    <span className="inline-flex items-center rounded-full bg-pink-50 px-2 py-1 text-xs font-medium text-pink-800 ring-1 ring-pink-600/20 ring-inset">
                                                        {data.categories.name}
                                                    </span>
                                                )}
                                                {data?.brand && (
                                                    <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-600/20 ring-inset">
                                                        {data.brand}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* data Details Grid */}
                                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <dt className="font-medium text-gray-500">Cost Per Unit</dt>
                                            <dd className="mt-1 font-bold text-gray-900">
                                                {(data.cost == null || Number(data.cost) === 0)
                                                    ? "₱None"
                                                    : `₱${Number(data.cost).toFixed(2)}`}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="font-medium text-gray-500">SRP</dt>
                                            <dd className="mt-1 font-bold text-gray-900">
                                                {(data.srp == null || Number(data.srp) === 0)
                                                    ? "₱None"
                                                    : `₱${Number(data.srp).toFixed(2)}`}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="font-medium text-gray-500">Shopee Price</dt>
                                            <dd className="mt-1 font-bold text-gray-900">
                                                {(data.shopee == null || Number(data.shopee) === 0)
                                                    ? "₱None"
                                                    : `₱${Number(data.shopee).toFixed(2)}`}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="font-medium text-gray-500">Reseller</dt>
                                            <dd className="mt-1 font-bold text-gray-900">
                                                {(data.reseller == null || Number(data.reseller) === 0)
                                                    ? "₱None"
                                                    : `₱${Number(data.reseller).toFixed(2)}`}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="font-medium text-gray-500">City Distributor</dt>
                                            <dd className="mt-1 font-bold text-gray-900">
                                                {(data.city_distributor == null || Number(data.city_distributor) === 0)
                                                    ? "₱None"
                                                    : `₱${Number(data.city_distributor).toFixed(2)}`}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="font-medium text-gray-500">District Distributor</dt>
                                            <dd className="mt-1 font-bold text-gray-900">
                                                {(data.district_distributor == null || Number(data.district_distributor) === 0)
                                                    ? "₱None"
                                                    : `₱${Number(data.district_distributor).toFixed(2)}`}
                                            </dd>
                                        </div>
                                        <div className="col-span-2">
                                            <dt className="font-medium text-gray-500">Provincial Distributor</dt>
                                            <dd className="mt-1 font-bold text-gray-900">
                                                {(data.provincial_distributor == null || Number(data.provincial_distributor) === 0)
                                                    ? "₱None"
                                                    : `₱${Number(data.provincial_distributor).toFixed(2)}`}
                                            </dd>
                                        </div>
                                        {data?.delivery_receipt_no && (
                                            <div className="col-span-2">
                                                <dt className="font-medium text-gray-500">Delivery Receipt</dt>
                                                <dd className="mt-1">
                                                    <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-600/20 ring-inset">
                                                        {data.delivery_receipt_no}
                                                    </span>
                                                </dd>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                    <ProductOptionMenuSection data={data} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
