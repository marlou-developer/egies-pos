import React, { useState, useRef, useEffect } from "react";
import {
    BellIcon,
    CalendarDateRangeIcon,
    ExclamationCircleIcon,
    NoSymbolIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { Link, router } from "@inertiajs/react";
import { update_is_read_service } from "../pages/services/cart-service";
import store from "../store/store";
import { get_over_due_thunk } from "../redux/cart-thunk";

export default function NotificationSection() {
    const { over_dues } = useSelector((store) => store.carts);
    const { user } = useSelector((store) => store.app);
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

    async function route_page(item, routing) {
        await update_is_read_service({
            id: item.id,
        });
        await store.dispatch(get_over_due_thunk());
        router.visit(routing);
    }

    console.log(
        " over_dues?.notification",
        over_dues?.notification?.filter((res) => res.type == "cart")
    );

    const filteredNotifications = over_dues?.notification?.filter((res) => {
        if (
            user?.user_type === "Inventory" ||
            user?.user_type === "Encoder" ||
            user?.user_type === "Shopee"
        ) {
            return (
                (res.status === "low_stock" || res.status === "out_stocks") &&
                res.is_read === "false"
            );
        }
        return res.is_read === "false";
    }) || [];

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                className="relative -m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                aria-label="View notifications"
                onClick={() => setOpen((prev) => !prev)}
            >
                {filteredNotifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-white text-xs font-semibold">
                        {filteredNotifications.length}
                    </span>
                )}
                <BellIcon aria-hidden="true" className="size-6" />
            </button>

            {open && (
                <div className="absolute right-0 z-10 mt-2 w-64 rounded-lg bg-pink-100 shadow-lg ring-1 ring-gray-200">
                    <div className="text-sm flex flex-col items-start justify-start max-h-60 overflow-y-auto">
                        {(!over_dues?.notification || over_dues?.notification.length === 0) && (
                            <div className="px-4 py-2 text-center text-gray-500">
                                No notification.
                            </div>
                        )}

                        {over_dues?.notification
                            ?.filter((item) => {
                                // Filter notifications based on user type
                                if (
                                    user?.user_type === "Inventory" ||
                                    user?.user_type === "Encoder" ||
                                    user?.user_type === "Shopee"
                                ) {
                                    return item.status === "low_stock" || item.status === "out_stocks";
                                }
                                return (
                                    item.type === "cart" ||
                                    item.status === "low_stock" ||
                                    item.status === "out_stocks"
                                );
                            })
                            ?.map((item, index) => {
                                const isRead = item?.is_read === "true";
                                const today = new Date().toISOString().split("T")[0];
                                const dueDate = item?.cart?.due_date?.split(" ")[0];
                                const isToday = dueDate === today;
                                console.log('itemitemitem', item)

                                let content = null;
                                let icon = null;
                                let onClickUrl = "#";

                                if (item.type === "cart") {
                                    icon = <CalendarDateRangeIcon className="h-6 mr-1" />;
                                    content = (
                                        <span>
                                            <b>{item?.cart?.customer?.name}</b>{" "}
                                            has {isToday ? "due today" : "over due payment"}.
                                        </span>
                                    );
                                    onClickUrl = `/administrator/credits?search=${item?.cart?.cart_id}`;
                                } else if (item.status === "low_stock") {
                                    icon = <ExclamationCircleIcon className="h-6 mr-1" />;
                                    content = (
                                        <span>
                                            <b>{item?.product?.name}</b> has low stocks.
                                        </span>
                                    );
                                    onClickUrl = `/administrator/stocks?search=${item?.product?.name}`;
                                } else if (item.status === "out_stocks") {
                                    icon = <NoSymbolIcon className="h-6 mr-1" />;
                                    content = (
                                        <span>
                                            <b>{item?.product?.name}</b> is out of stocks.
                                        </span>
                                    );
                                    onClickUrl = `/administrator/stocks?search=${item?.product?.name}`;
                                }
                                let color = ''
                                if (isRead && item.status == "over_due" && (item.cart.status == 'Pending' || item.cart.status == 'Partial')) {
                                    color = 'bg-gray-200'
                                } else if (isRead && item.status == "over_due" && item.cart.status == 'Paid') {
                                    color = 'bg-white'
                                } else if (!isRead) {
                                    color = 'bg-pink-200'
                                } else {
                                    color = 'bg-white'
                                }

                                return (
                                    <div key={index} className={` w-full  underline`}>
                                        <button
                                            onClick={() => route_page(item, onClickUrl)}
                                            className={`flex text-left  w-full py-2 px-1 border-b ${color}`}
                                        >
                                            {icon}
                                            {content}
                                        </button>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            )}

        </div>
    );
}
