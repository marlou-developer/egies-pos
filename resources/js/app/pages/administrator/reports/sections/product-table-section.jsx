import React from "react";
import { useSelector } from "react-redux";

export default function ProductTableSection() {
     const { products } = useSelector((state) => state.products) || {
        products: { data: [], total: 0, last_page: 1 },
    };
   

    return (
        <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
                <tr>
                    <th
                        scope="col"
                        className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                        Name
                    </th>
                    <th
                        scope="col"
                        className="relative py-3.5 pr-4 pl-3 sm:pr-6"
                    >
                        <span className="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
                {products?.data?.map((res, i) => (
                    <tr key={i}>
                        <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                            {res.name}
                        </td>

                        <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-6">
                            <a
                                href="#"
                                className="text-indigo-600 hover:text-indigo-900"
                            >
                                Show Data
                                <span className="sr-only">, {res.name}</span>
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
