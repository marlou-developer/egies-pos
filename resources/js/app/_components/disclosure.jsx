import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { Transition } from "@headlessui/react"; // Import Transition component
import { useState } from "react";
import { Link } from "@inertiajs/react";
import { useDispatch } from "react-redux";
import { setSidebarOpen } from "../redux/app-slice";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function DisclosureComponent({
    item,
    i,
    openIndex,
    setOpenIndex,
}) {
    const dispatch = useDispatch();
    const isOpen = openIndex === i;

    const handleSubLinkClick = () => {
        dispatch(setSidebarOpen(false));
    };

    return (
        <div>
            <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className={classNames(
                    item.current ? "bg-gray-50" : "hover:bg-gray-50",
                    "group flex w-full items-center gap-x-3 rounded-md p-2 py-3 text-left text-sm/6 font-semibold text-gray-700"
                )}
            >
                <div className="flex w-full items-center justify-between">
                    <div className="flex gap-3">
                        <item.icon
                            aria-hidden="true"
                            className={classNames(
                                item.current
                                    ? "text-white"
                                    : "text-gray-700 group-hover:text-blue-600",
                                "size-6 shrink-0"
                            )}
                        />
                        {item.name}
                    </div>
                    <ChevronRightIcon
                        aria-hidden="true"
                        className={classNames(
                            "size-5 shrink-0 font-black transition-transform",
                            isOpen ? "rotate-90 text-gray-500" : "text-gray-700"
                        )}
                    />
                </div>
            </button>

            <Transition
                show={isOpen}
                enter="transition-all duration-700 ease-in-out"
                enterFrom="max-h-0 opacity-0"
                enterTo="max-h-screen opacity-100"
                leave="transition-all duration-700 ease-in-out"
                leaveFrom="max-h-screen opacity-100"
                leaveTo="max-h-0 opacity-0"
            >
                <ul className="mt-1 px-2">
                    {item.children.map((subItem) => (
                        <li key={subItem.name}>
                            <Link
                                href={subItem.href}
                                onClick={handleSubLinkClick}
                                className={classNames(
                                    subItem.current
                                        ? "bg-gray-50"
                                        : "hover:bg-gray-50",
                                    "block rounded-md py-2 pr-2 pl-4 text-sm/6 text-gray-700"
                                )}
                            >
                                <div className="flex gap-3">
                                    <subItem.icon
                                        aria-hidden="true"
                                        className={classNames(
                                            subItem.current
                                                ? "text-gray-700"
                                                : "text-gray-700 group-hover:text-blue-600",
                                            "size-6 shrink-0"
                                        )}
                                    />
                                    {subItem.name}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Transition>
        </div>
    );
}
