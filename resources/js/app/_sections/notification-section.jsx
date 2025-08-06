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
    const [isMarkingAsRead, setIsMarkingAsRead] = useState(false);
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
        try {
            // Send notification in the same format as markAllAsRead
            await update_is_read_service({
                notifications: [item],
            });
            await store.dispatch(get_over_due_thunk());
            router.visit(routing);
        } catch (error) {
            console.error('Error marking notification as read:', error);
            // Still navigate even if marking as read fails
            router.visit(routing);
        }
    }

    async function markAllAsRead() {
        setIsMarkingAsRead(true);
        try {
            // Get all unread notifications for current user
            const unreadNotifications = over_dues?.notification?.filter((res) => {
                // First check if notification belongs to current user
                if (res.user_id && user?.id && res.user_id !== user.id) {
                    return false;
                }
                
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

            // Mark all unread notifications as read
            await update_is_read_service({
                notifications: unreadNotifications,
            });

            // Refresh the notifications
            await store.dispatch(get_over_due_thunk());
            setOpen(false);
        } catch (error) {
            console.error('Error marking notifications as read:', error);
        } finally {
            setIsMarkingAsRead(false);
        }
    }

    const filteredNotifications = over_dues?.notification?.filter((res) => {
        // First check if notification belongs to current user
        if (res.user_id && user?.id && res.user_id !== user.id) {
            return false;
        }
        
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
                        {/* Header with Mark All as Read button */}
                        {filteredNotifications.length > 0 && (
                            <div className="w-full px-4 py-2 border-b border-gray-300 bg-pink-50 flex justify-between items-center">
                                <span className="font-semibold text-gray-700">Notifications</span>
                                <button
                                    onClick={markAllAsRead}
                                    disabled={isMarkingAsRead}
                                    className="text-xs text-blue-600 hover:text-blue-800 underline disabled:text-gray-400 disabled:no-underline disabled:cursor-not-allowed flex items-center gap-1"
                                >
                                    {isMarkingAsRead && (
                                        <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                        </svg>
                                    )}
                                    {isMarkingAsRead ? 'Marking...' : 'Mark all as read'}
                                </button>
                            </div>
                        )}

                        {(!over_dues?.notification || over_dues?.notification.length === 0) && (
                            <div className="px-4 py-2 text-center text-gray-500">
                                No notification.
                            </div>
                        )}

                        {over_dues?.notification
                            ?.filter((item) => {
                                // First check if notification belongs to current user
                                if (item.user_id && user?.id && item.user_id !== user.id) {
                                    return false;
                                }
                                
                                // Filter notifications based on user type (show both read and unread)
                                if (
                                    user?.user_type === "Inventory" ||
                                    user?.user_type === "Encoder" ||
                                    user?.user_type === "Shopee"
                                ) {
                                    return (
                                        item.status === "low_stock" || item.status === "out_stocks"
                                    );
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
                                if (item.is_read === "false") {
                                    color = 'bg-pink-200'  // Pink background for unread notifications
                                } else if (item.type === "cart" && item?.cart?.status !== "Paid") {
                                    color = 'bg-gray-200'  // Gray background for unpaid cart notifications
                                } else {
                                    color = 'bg-white'     // White background for read notifications
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
