import React from "react";

export default function PaginationSection({
    currentPage,
    totalPages,
    totalEntries,
    onPageChange,
}) {
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

    const pageNumbers = generatePageNumbers(totalPages, currentPage);

    return (
        <div className="w-full mt-4">
            {totalPages > 1 && (
                <div className="flex justify-between items-center flex-wrap gap-y-2">
                    <div>Total: {totalEntries} entries</div>
                    <div className="flex space-x-1 items-center">
                        {/* Previous Button */}
                        <button
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 border rounded ${currentPage === 1
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "bg-white text-pink-500 border-pink-500"
                                }`}
                        >
                            Previous
                        </button>

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
                                <button
                                    key={pageNum}
                                    onClick={() => onPageChange(pageNum)}
                                    className={`px-3 py-1 border rounded ${pageNum === currentPage
                                        ? "bg-pink-500 text-white"
                                        : "bg-white text-pink-500 border-pink-500"
                                        }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}

                        {/* Next Button */}
                        <button
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-1 border rounded ${currentPage === totalPages
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "bg-white text-pink-500 border-pink-500"
                                }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
