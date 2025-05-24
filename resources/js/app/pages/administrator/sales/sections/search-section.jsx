import { router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function SearchSection() {
    const params = new URLSearchParams(window.location.search);
    const searchValue = params.get("search");
    const [search, setSearch] = useState("");

    useEffect(() => {
        setSearch(searchValue);
    }, []);

    function search_data(e) {
        e.preventDefault();
        router.visit("?search=" + search);
    }
    return (
        <form onSubmit={search_data} className="max-w-md w-96">
            <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only"
            >
                Search
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Search Mockups, Logos..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button
                    type="submit"
                    className="text-white absolute end-2.5 bottom-2.5 bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-4 py-2"
                >
                    Search
                </button>
            </div>
        </form>
    );
}
