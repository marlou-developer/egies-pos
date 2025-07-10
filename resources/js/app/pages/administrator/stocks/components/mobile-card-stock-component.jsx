import { peso_value } from '@/app/lib/peso';
import React from 'react'
import AddStocksSection from '../sections/add-stocks-section';
import StocksHistorySection from '../sections/stocks-history-section';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { Tooltip } from 'antd';

export default function MobileCardStockComponent({ data, selectedData, dispatch, setSelectedData }) {
    return (
        <div>
            <div className="block md:hidden">
                <div className="space-y-4">
                    {data?.data?.data?.map((data, dataIdx) => {
                        let statusClass =
                            "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20";

                        if (data.quantity == 0) {
                            statusClass =
                                "inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20";
                        } else if (
                            data.quantity >= 1 &&
                            data.quantity <= 10
                        ) {
                            statusClass =
                                "inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20";
                        }

                        const lastStockDate = data.stocks?.length > 0
                            ? new Date(
                                [...data.stocks].sort(
                                    (a, b) => new Date(b.date) - new Date(a.date)
                                )[0].date
                            ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })
                            : "No Stocks Added";

                        return (
                            <div key={dataIdx} className="bg-white p-4 rounded-lg shadow ring-1 ring-black ring-opacity-5">
                                <div className="flex items-start justify-between">
                                    <div className='flex-1'>
                                        <div className="flex items-start space-x-3">
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
                                                <h3 className="text-sm font-bold text-pink-500">
                                                    {data.name}
                                                </h3>

                                                <div className="space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xs text-gray-500">Stock:</span>
                                                        <span className="text-sm font-bold text-gray-900">
                                                            {data.quantity}
                                                        </span>
                                                    </div>

                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xs text-gray-500">Status:</span>
                                                        <span className={statusClass}>
                                                            {data.quantity == 0
                                                                ? "Out of Stock"
                                                                : data.quantity <= 10
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
                                                                Number(data.quantity) * Number(data.srp)
                                                            )}
                                                        </span>
                                                    </div>

                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xs text-gray-500">Capital:</span>
                                                        <span className="text-sm font-bold text-blue-600">
                                                            {peso_value(
                                                                Number(data.quantity) * Number(data.cost)
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="ml-4 flex-shrink-0">
                                    <AddStocksSection data={data} />
                                    <StocksHistorySection data={data} />
                                    <button
                                        className="bg-yellow-300 hover:bg-yellow-400 rounded-md p-2.5"
                                        onClick={() => router.visit(`/administrator/stocks/${data.id}`)}
                                    >
                                        <Tooltip title="Edit Added Stock(s)">
                                            <PencilSquareIcon className="h-4" />
                                        </Tooltip>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
