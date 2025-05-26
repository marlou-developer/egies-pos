import React from "react";
import DisclosureComponent from "../_components/disclosure";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { useSelector } from "react-redux";

export default function SidebarMobileSection({
    navigation,
    setOpenIndex,
    openIndex,
}) {
    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }

    const { over_dues } = useSelector((store) => store.carts);
    return (
        <>
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-3 pb-4">
                <div className="flex justify-center h-16 shrink-0 items-center">
                    <img
                        className="h-8 w-auto"
                        src="/images/logo.png"
                        alt="Your Company"
                    />
                </div>
                <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                            <ul role="list">
                                {navigation.map((item, i) =>
                                    !item.children ? (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? "bg-pink-300 text-white"
                                                        : "text-gray-700 hover:bg-gray-50 hover:text-pink-400",
                                                    "group flex gap-x-3 rounded-md p-2 py-3 text-sm/6 font-semibold"
                                                )}
                                            >
                                                <item.icon
                                                    aria-hidden="true"
                                                    className={classNames(
                                                        item.current
                                                            ? "text-white"
                                                            : "text-gray-700 group-hover:text-pink-400",
                                                        "size-6 shrink-0"
                                                    )}
                                                />
                                                <div className="flex gap-3 items-start justify-between w-full">
                                                    <div>{item.name}</div>
                                                    <div>
                                                        {item.notification && (
                                                            <button className="bg-red-600 px-2 rounded-md p-1 text-white">
                                                                LS{" "}
                                                                {
                                                                    over_dues
                                                                        ?.stocks
                                                                        ?.length
                                                                }
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
                                            />
                                        </li>
                                    )
                                )}
                            </ul>
                        </li>
                        <li className="mt-auto">
                            <Link
                                href="/administrator/settings"
                                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-black"
                            >
                                <Cog6ToothIcon
                                    aria-hidden="true"
                                    className="size-6 shrink-0 text-white  hover:bg-blue-700"
                                />
                                Settings
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}
