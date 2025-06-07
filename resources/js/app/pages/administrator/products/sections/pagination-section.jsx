import { Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function PaginationSection() {
    const [current, setCurrent] = useState(1);
    const [pageSize] = useState(10);

    const { products } = useSelector((state) => state.products) || {
        products: { data: [], total: 0, last_page: 1 },
    };

    const params = new URLSearchParams(window.location.search);
    const current_page = params.get("page");

    useEffect(() => {
        setCurrent(current_page);
    }, []);
    return (
        <div className="w-full mt-4">
            {products?.data.last_page > 1 && (
                <div className="flex justify-between items-center">
                    <div>Total: {products.data.total} entries</div>
                    <div className="flex space-x-2">
                        {Array.from(
                            { length: products.data.last_page },
                            (_, i) => i + 1
                        ).map((pageNum) => (
                            <Link
                                key={pageNum}
                                // onClick={() =>
                                //     setCurrent(pageNum)
                                // }
                                href={`?page=${pageNum}`}
                                className={`px-3 py-1 border rounded ${
                                    pageNum == current
                                        ? "bg-pink-500 text-white"
                                        : "bg-white text-pink-500 border-pink-500"
                                }`}
                            >
                                {pageNum}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
