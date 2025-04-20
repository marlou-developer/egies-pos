import { Transition } from "@headlessui/react";
import { Cog6ToothIcon, XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React, { useState, Fragment } from "react";
import { setSidebarOpen } from "../redux/app-slice";
import { useDispatch, useSelector } from "react-redux";
import DisclosureComponent from "./../_components/disclosure";
import SidebarDesktopSection from "./sidebar-menu-desktop-section";
import SidebarMobileSection from "./sidebar-menu-mobile-section";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function SidebarSection({ navigation, collapsed, setCollapsed }) {
    const { sidebarOpen } = useSelector((store) => store.app);
    const dispatch = useDispatch();
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <>
            {/* Mobile sidebar */}
            <Transition show={sidebarOpen} as={Fragment}>
                <div
                    onClick={() => dispatch(setSidebarOpen(false))}
                    className="relative z-50 lg:hidden"
                >
                    {/* Backdrop */}
                    <div>
                        <div className="fixed inset-0 bg-gray-900/80" />
                    </div>

                    {/* Sidebar panel */}
                    <div className="fixed inset-0 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition duration-500 ease-out"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition duration-500 ease-in"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="relative mr-16 flex w-full max-w-xs flex-1"
                            >
                                {/* Close button */}
                                <div className="absolute top-0 left-full flex w-16 justify-center pt-5">
                                    <button
                                        type="button"
                                        onClick={() => dispatch(setSidebarOpen(false))}
                                        className="-m-2.5 p-2.5"
                                    >
                                        <span className="sr-only">Close sidebar</span>
                                        <XMarkIcon className="size-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Sidebar content */}
                                <SidebarMobileSection
                                    setOpenIndex={setOpenIndex}
                                    openIndex={openIndex}
                                    navigation={navigation}
                                />
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Transition>

            {/* Desktop sidebar */}
            <div className={classNames(
                "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col transition-all duration-300 ease-in-out",
                collapsed ? "lg:w-20" : "lg:w-72"
            )}>
                <div className="flex grow flex-col gap-y-5 border-r border-gray-300 bg-gradient-to-br from-pink-100 via-pink-200 to-pink-200 px-1.5 pb-4 shadow-md relative">
                    {/* Collapse toggle button */}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="absolute -right-3 top-4 z-10 bg-white border border-gray-300 rounded-full p-1 shadow"
                    >
                        {collapsed ? (
                            <ChevronRightIcon className="h-4 w-4" />
                        ) : (
                            <ChevronLeftIcon className="h-4 w-4" />
                        )}
                    </button>

                    {/* Logo */}
                    <div className="flex h-16 shrink-0 items-center justify-center">
                        {!collapsed && (
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=blue&shade=600"
                                alt="Your Company"
                            />
                        )}
                    </div>

                    {/* Sidebar content */}
                    <SidebarDesktopSection
                        setOpenIndex={setOpenIndex}
                        openIndex={openIndex}
                        navigation={navigation}
                        collapsed={collapsed} // optional: pass to render minimized icons
                    />
                </div>
            </div>
        </>
    );
}
