import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSidebarOpen } from "../redux/app-slice";
import {
    Bars3Icon,
    ArrowsPointingOutIcon,
    ArrowsPointingInIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import NotificationSection from "./notification-section";
import SearchSection from "./search-section";
import HeaderMenuSection from "./header-menu-section";
import store from "../store/store";

export default function TopbarSection({ userNavigation }) {
    const dispatch = useDispatch();
    const [isFullscreen, setIsFullscreen] = React.useState(false);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };


    return (
        <div className="sticky top-0 z-40 lg:mx-auto w-full lg:px-0">
            <div className="flex h-16 items-center gap-x-4 border-b shadow-md border-gray-300 bg-white px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
                {/* Open Sidebar (for small screens) */}
                <button
                    type="button"
                    onClick={() => dispatch(setSidebarOpen(true))}
                    className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                >
                    <span className="sr-only">Open sidebar</span>
                    <Bars3Icon aria-hidden="true" className="size-6" />
                </button>

                {/* Separator */}
                <div aria-hidden="true" className="h-6 w-px bg-gray-200 lg:hidden" />

                <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 px-8">
                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end">
                        {/* <SearchSection /> */}
                        <div className="flex items-center gap-x-4 lg:gap-x-6">
                            {/* Separator */}
                            <div
                                aria-hidden="true"
                                className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
                            />

                            {/* Fullscreen Toggle */}
                            <button
                                type="button"
                                onClick={toggleFullscreen}
                                className="p-2 text-gray-700 hover:text-black"
                            >
                                {isFullscreen ? (
                                    <ArrowsPointingInIcon className="size-6" />
                                ) : (
                                    <ArrowsPointingOutIcon className="size-6" />
                                )}
                                <span className="sr-only">Toggle fullscreen</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-x-4 lg:gap-x-6">
                        <NotificationSection />
                        <HeaderMenuSection userNavigation={userNavigation} />
                    </div>
                </div>
            </div>
        </div>
    );
}
