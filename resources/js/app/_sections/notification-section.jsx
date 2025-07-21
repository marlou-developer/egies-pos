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

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                className="relative -m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                aria-label="View notifications"
                onClick={() => setOpen((prev) => !prev)}
            >
                {over_dues?.notification?.length > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-white text-xs font-semibold">
                        {
                            over_dues?.notification?.filter((res) => {
                                // For Inventory and Cashier users, only count stock-related notifications
                                if (user?.user_type === "Inventory" || user?.user_type === "Cashier") {
                                    return (res.status === "low_stock" || res.status === "out_stocks") && res.is_read === "false";
                                }
                                // For other users, count all notifications
                                return res.is_read === "false";
                            })?.length
                        }
                    </span>
                )}
                <BellIcon aria-hidden="true" className="size-6" />
            </button>

            {open && (
                <div className="absolute right-0 z-10 mt-2 w-64 rounded-lg bg-white shadow-lg ring-1 ring-gray-200">
                    <div className="py-2 text-sm flex flex-col items-start justify-start text-gray-700 max-h-60 overflow-y-auto">
                        {over_dues?.notification?.length == 0 && (
                            <div className="px-4 py-2 text-center text-gray-500">
                                No notification?.
                            </div>
                        )}

                        {/* Cart notifications - only show for users who are not Inventory or Cashier */}
                        {user?.user_type !== "Inventory" && user?.user_type !== "Cashier" &&
                            over_dues?.notification?.length != 0 &&
                            over_dues?.notification
                                ?.filter((res) => res.type == "cart")
                                ?.map((item, index) => {
                                    const today = new Date()
                                        .toISOString()
                                        .split("T")[0];
                                    const dueDate =
                                        item?.cart?.due_date?.split(" ")[0]; // Extract date part if datetime
                                    const isToday = dueDate === today;

                                    return (
                                        <div
                                            key={index}
                                            className={`${item?.is_read == "true"
                                                ? "bg-gray-100"
                                                : ""
                                                } my-1.5 px-4 py-2 underline `}
                                        >
                                            <button
                                                onClick={() =>
                                                    route_page(
                                                        item,
                                                        `/administrator/credits?search=${item?.cart?.cart_id}`
                                                    )
                                                }
                                                className="flex  text-left  w-full"
                                            >
                                                <CalendarDateRangeIcon className="h-6 mr-1" />
                                                <span>
                                                    <b>
                                                        {
                                                            item?.cart?.customer
                                                                ?.name
                                                        }
                                                    </b>{" "}
                                                    has{" "}
                                                    {isToday
                                                        ? "due today"
                                                        : "over due payment"}{" "}
                                                    .
                                                </span>
                                            </button>
                                        </div>
                                    );
                                })}

                        {/* Low stock notifications - show for all users */}
                        {over_dues?.notification?.length != 0 &&
                            over_dues?.notification
                                ?.filter((res) => res.status == "low_stock")
                                ?.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`${item?.is_read == "true"
                                            ? "bg-gray-100"
                                            : ""
                                            } my-1.5 px-4 py-2 underline `}
                                    >
                                        <button
                                            onClick={() =>
                                                route_page(
                                                    item,
                                                    `/administrator/stocks?search=${item?.product?.id}`
                                                )
                                            }
                                            className="flex text-left"
                                        >
                                            <ExclamationCircleIcon className="h-6 mr-1" />
                                            <span>
                                                <b>{item?.product?.name}</b> has
                                                low stocks.
                                            </span>
                                        </button>
                                    </div>
                                ))}

                        {/* Out of stock notifications - show for all users */}
                        {over_dues?.notification?.length != 0 &&
                            over_dues?.notification
                                ?.filter((res) => res.status == "out_stocks")
                                ?.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`${item?.is_read == "true"
                                            ? "bg-gray-100"
                                            : ""
                                            } my-1.5 px-4 py-2 underline `}
                                    >
                                        <button
                                            onClick={() =>
                                                route_page(
                                                    item,
                                                    `/administrator/stocks?search=${item?.product?.id}`
                                                )
                                            }
                                            className="flex text-left"
                                        >
                                            <NoSymbolIcon className="h-6 mr-1" />
                                            <span>
                                                <b>{item?.product?.name}</b> is
                                                out stocks.
                                            </span>
                                        </button>
                                    </div>
                                ))}
                    </div>
                </div>
            )}
        </div>
    );
}
