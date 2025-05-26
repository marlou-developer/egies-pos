import React, { useState, useRef, useEffect } from "react";
import {
    BellIcon,
    CalendarDateRangeIcon,
    NoSymbolIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { Link } from "@inertiajs/react";

export default function NotificationSection() {
    const { over_dues } = useSelector((store) => store.carts);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                className="relative -m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                aria-label="View notifications"
                onClick={() => setOpen((prev) => !prev)}
            >
                {over_dues?.over_due?.length > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-white text-xs font-semibold">
                        {Number(over_dues?.over_due?.length??0) + Number(over_dues?.stocks?.length??0)}{}
                    </span>
                )}
                <BellIcon aria-hidden="true" className="size-6" />
            </button>

            {open && (
                <div className="absolute right-0 z-10 mt-2 w-64 rounded-lg bg-white shadow-lg ring-1 ring-gray-200">
                    <div className="py-2 text-sm text-gray-700 max-h-60 overflow-y-auto">
                        {over_dues?.stocks?.length == 0 &&
                            over_dues?.over_due?.length == 0 && (
                                <div className="px-4 py-2 text-center text-gray-500">
                                    No notification.
                                </div>
                            )}

                        {over_dues?.over_due?.length != 0 &&
                            over_dues?.over_due?.map((item, index) => (
                                <div
                                    key={index}
                                    className="px-4 py-2 underline hover:bg-gray-50"
                                >
                                    <Link
                                        href={`/administrator/credits?search=${item.cart_id}`}
                                        className="flex"
                                    >
                                        <CalendarDateRangeIcon className="h-6 mr-1" />
                                        {item?.customer?.name} has over due
                                        payment.
                                    </Link>
                                </div>
                            ))}
                        {over_dues?.stocks?.length != 0 &&
                            over_dues?.stocks?.map((item, index) => (
                                <div
                                    key={index}
                                    className="px-4 py-2 underline hover:bg-gray-50"
                                >
                                    <Link
                                        href={`/administrator/stocks?search=${item.id}`}
                                        className="flex"
                                    >
                                        <NoSymbolIcon className="h-6 mr-1" />
                                        {item?.name} has low stocks.
                                    </Link>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}
