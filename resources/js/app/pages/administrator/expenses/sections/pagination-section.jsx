import { Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function PaginationSection() {
    const [current, setCurrent] = useState(1);
    const [pageSize] = useState(10);

    const { expenses } = useSelector((state) => state.expenses) || {
        expenses: { data: [], total: 0, last_page: 1 },
    };

    const params = new URLSearchParams(window.location.search);
    const current_page = parseInt(params.get("page")) || 1;
    const search = params.get("search");

    useEffect(() => {
        setCurrent(current_page);
    }, [current_page]);

    const generatePageNumbers = (totalPages, currentPage) => {
        const pageNumbers = [];

        if (totalPages <= 9) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            pageNumbers.push(1); // Always show the first page

            if (currentPage > 4) {
                pageNumbers.push("left-ellipsis");
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pageNumbers.push(i);
            }

            if (currentPage < totalPages - 3) {
                pageNumbers.push("right-ellipsis");
            }

            pageNumbers.push(totalPages); // Always show the last page
        }

        return pageNumbers;
    };

    const pageNumbers = generatePageNumbers(expenses?.last_page || 1, current);

    const createLink = (pageNum) => `?page=${pageNum}&search=${search ?? ""}`;

    return (
        <div className="w-full mt-4">
            {expenses?.last_page > 1 && (
                <div className="flex justify-between items-center flex-wrap gap-y-2">
                    <div>Total: {expenses?.total} entries</div>
                    <div className="flex space-x-1 items-center">
                        {/* Previous Button */}
                        <Link
                            href={createLink(current - 1)}
                            className={`px-3 py-1 border rounded ${current === 1
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "bg-white text-pink-500 border-pink-500"
                                }`}
                            aria-disabled={current === 1}
                        >
                            Previous
                        </Link>

                        {/* Page Numbers */}
                        {pageNumbers.map((pageNum, index) => {
                            if (pageNum === "left-ellipsis" || pageNum === "right-ellipsis") {
                                return (
                                    <span key={index} className="px-3 py-1">
                                        ...
                                    </span>
                                );
                            }
                            return (
                                <Link
                                    key={pageNum}
                                    href={createLink(pageNum)}
                                    className={`px-3 py-1 border rounded ${pageNum === current
                                        ? "bg-pink-500 text-white"
                                        : "bg-white text-pink-500 border-pink-500"
                                        }`}
                                >
                                    {pageNum}
                                </Link>
                            );
                        })}

                        {/* Next Button */}
                        <Link
                            href={createLink(current + 1)}
                            className={`px-3 py-1 border rounded ${current === expenses?.last_page
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "bg-white text-pink-500 border-pink-500"
                                }`}
                            aria-disabled={current === expenses?.last_page}
                        >
                            Next
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
