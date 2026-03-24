import React, { useState } from "react";
import {
    BellIcon,
    CalendarDateRangeIcon,
    ExclamationCircleIcon,
    NoSymbolIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { router } from "@inertiajs/react";
import store from "@/app/store/store";
import { get_over_due_thunk } from "@/app/redux/cart-thunk";
import { update_is_read_service } from "@/app/pages/services/cart-service";

export default function NotificationsSection() {
    const { over_dues } = useSelector((store) => store.carts);
    const { user } = useSelector((store) => store.app);
    const [isMarkingAsRead, setIsMarkingAsRead] = useState(false);
    const [navigatingItems, setNavigatingItems] = useState(new Set());
    const [filter, setFilter] = useState("all"); // "all" | "unread" | "read"

    async function handleNotificationClick(item, url) {
        const itemKey = `${item.id || item.type}_${item.cart?.id || item.product?.id}`;
        try {
            setNavigatingItems((prev) => new Set(prev).add(itemKey));
            await update_is_read_service({ notifications: [item] });
            await store.dispatch(get_over_due_thunk());
            router.visit(url);
        } catch (error) {
            console.error("Error marking notification as read:", error);
            router.visit(url);
        } finally {
            setNavigatingItems((prev) => {
                const next = new Set(prev);
                next.delete(itemKey);
                return next;
            });
        }
    }

    async function markAllAsRead() {
        setIsMarkingAsRead(true);
        try {
            const unread = allNotifications.filter((n) => n.is_read === "false");
            await update_is_read_service({ notifications: unread });
            await store.dispatch(get_over_due_thunk());
        } catch (error) {
            console.error("Error marking notifications as read:", error);
        } finally {
            setIsMarkingAsRead(false);
        }
    }

    const allNotifications =
        over_dues?.notification?.filter((item) => {
            if (item.user_id && user?.id && item.user_id !== user.id) return false;
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
        }) || [];

    const displayed = allNotifications.filter((item) => {
        if (filter === "unread") return item.is_read === "false";
        if (filter === "read") return item.is_read === "true";
        return true;
    });

    const unreadCount = allNotifications.filter((n) => n.is_read === "false").length;

    return (
        <div className="w-full py-8 px-4">
            {/* Page header */}
            <div className="flex items-center gap-3 mb-6">
                <BellIcon className="h-7 w-7 text-pink-500" />
                <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
                {unreadCount > 0 && (
                    <span className="inline-flex items-center justify-center h-6 px-2 rounded-full bg-red-500 text-white text-xs font-semibold">
                        {unreadCount} unread
                    </span>
                )}
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                {/* Filter tabs */}
                <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                    {["all", "unread", "read"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${
                                filter === tab
                                    ? "bg-white shadow text-pink-600"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Mark all as read */}
                {unreadCount > 0 && (
                    <button
                        onClick={markAllAsRead}
                        disabled={isMarkingAsRead}
                        className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 underline disabled:text-gray-400 disabled:no-underline disabled:cursor-not-allowed"
                    >
                        {isMarkingAsRead && (
                            <svg
                                className="animate-spin h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                />
                            </svg>
                        )}
                        {isMarkingAsRead ? "Marking..." : "Mark all as read"}
                    </button>
                )}
            </div>

            {/* Notification list */}
            <div className="rounded-xl overflow-hidden shadow ring-1 ring-gray-200 bg-white divide-y divide-gray-100">
                {displayed.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-2">
                        <BellIcon className="h-10 w-10 opacity-40" />
                        <p className="text-sm">No notifications found.</p>
                    </div>
                ) : (
                    displayed.map((item, index) => {
                        const itemKey = `${item.id || item.type}_${item.cart?.id || item.product?.id}`;
                        const isUnread = item.is_read === "false";
                        const today = new Date().toISOString().split("T")[0];
                        const dueDate = item?.cart?.due_date?.split(" ")[0];
                        const isToday = dueDate === today;

                        let icon = null;
                        let title = "";
                        let subtitle = "";
                        let onClickUrl = "#";

                        if (item.type === "cart") {
                            icon = (
                                <CalendarDateRangeIcon className="h-6 w-6 text-blue-500 shrink-0" />
                            );
                            title = item?.cart?.customer?.name || "Unknown customer";
                            subtitle = isToday
                                ? "Payment due today"
                                : "Overdue payment";
                            onClickUrl = `/administrator/credits?search=${item?.cart?.cart_id}`;
                        } else if (item.status === "low_stock") {
                            icon = (
                                <ExclamationCircleIcon className="h-6 w-6 text-yellow-500 shrink-0" />
                            );
                            title = item?.product?.name || "Unknown product";
                            subtitle = "Low stock";
                            onClickUrl = `/administrator/stocks?search=${item?.product?.name}`;
                        } else if (item.status === "out_stocks") {
                            icon = (
                                <NoSymbolIcon className="h-6 w-6 text-red-500 shrink-0" />
                            );
                            title = item?.product?.name || "Unknown product";
                            subtitle = "Out of stock";
                            onClickUrl = `/administrator/stocks?search=${item?.product?.name}`;
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleNotificationClick(item, onClickUrl)}
                                disabled={navigatingItems.has(itemKey)}
                                className={`w-full flex items-start gap-4 px-5 py-4 text-left transition-colors hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed relative ${
                                    isUnread ? "bg-pink-50" : "bg-white"
                                }`}
                            >
                                {navigatingItems.has(itemKey) && (
                                    <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
                                        <svg
                                            className="animate-spin h-5 w-5 text-blue-600"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v8H4z"
                                            />
                                        </svg>
                                    </div>
                                )}

                                {/* Icon */}
                                <div className="mt-0.5">{icon}</div>

                                {/* Text */}
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-medium text-gray-900 truncate`}>
                                        {title}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
                                </div>

                                {/* Unread dot */}
                                {isUnread && (
                                    <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-pink-500 shrink-0" />
                                )}
                            </button>
                        );
                    })
                )}
            </div>
        </div>
    );
}
