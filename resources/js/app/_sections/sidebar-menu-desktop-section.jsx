import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import React from "react";
import DisclosureComponent from "../_components/disclosure";
import { Link } from "@inertiajs/react";
import { useSelector } from "react-redux";

export default function SidebarDesktopSection({
    navigation,
    setOpenIndex,
    openIndex,
    collapsed,
}) {
    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }

    
    const { over_dues } = useSelector((store) => store.carts);

    console.log('over_dues',over_dues)
    return (
        <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                    <ul role="list" className="space-y-1">
                        {navigation.map((item, i) =>
                            !item.children ? (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={classNames(
                                            item.current
                                                ? "bg-pink-300 text-white"
                                                : "text-gray-700 hover:bg-pink-100 hover:text-pink-400",
                                            "group flex items-center gap-x-3 rounded-md p-2 py-3 text-sm font-semibold"
                                        )}
                                    >
                                        <item.icon
                                            aria-hidden="true"
                                            className={classNames(
                                                item.current
                                                    ? "text-white"
                                                    : "text-gray-700 group-hover:text-pink-400",
                                                "h-6 w-6 shrink-0"
                                            )}
                                        />
                                        <div className="flex gap-3 items-start justify-between w-full">
                                            <div>{!collapsed && item.name}</div>
                                            <div>
                                                {(over_dues?.stocks?.length != 0 && item.notification) && (
                                                    <button className="bg-red-600 px-2 rounded-md p-1 text-white">
                                                       LS {over_dues?.stocks?.length}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ) : (
                                <li key={i}>
                                    <DisclosureComponent
                                        setOpenIndex={setOpenIndex}
                                        openIndex={openIndex}
                                        item={item}
                                        i={i}
                                        collapsed={collapsed} // Optional: support for Disclosure collapse
                                    />
                                </li>
                            )
                        )}
                    </ul>
                </li>
                <li className="mt-auto px-2">
                    <a
                        href="#"
                        className="group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold text-black hover:text-pink-500"
                    >
                        <Cog6ToothIcon
                            aria-hidden="true"
                            className="h-6 w-6 shrink-0"
                        />
                        {!collapsed && "Settings"}
                    </a>
                </li>
            </ul>
        </nav>
    );
}
