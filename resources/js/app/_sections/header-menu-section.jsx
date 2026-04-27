import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from "@headlessui/react";
import { ChevronDownIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store from "../store/store";
import { get_user_login_thunk } from "../redux/app-thunk";
import SecurityModal from "../_components/security-modal";

export default function HeaderMenuSection({ userNavigation }) {
    const { user } = useSelector((state) => state.app);
    const [securityOpen, setSecurityOpen] = useState(false);

    useEffect(() => {
        store.dispatch(get_user_login_thunk());
    }, []);

    return (
        <>
            <Menu as="div" className="relative">
                <MenuButton className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                        alt=""
                        src="/images/user.png"
                        className="size-8 rounded-full bg-gray-50"
                    />
                    <span className="hidden lg:flex lg:items-center">
                        <span
                            aria-hidden="true"
                            className="ml-4 text-sm/6 font-semibold text-gray-900"
                        >
                            {user?.name}
                        </span>
                        <ChevronDownIcon
                            aria-hidden="true"
                            className="ml-2 size-5 text-gray-400"
                        />
                    </span>
                </MenuButton>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-300"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-300"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <MenuItems className="absolute right-0 z-10 mt-2.5 w-44 origin-top-right rounded-lg bg-white py-1 shadow-lg ring-1 ring-gray-900/10 focus:outline-none">
                        {user?.user_type === "Super Admin" && (
                            <MenuItem>
                                <button
                                    onClick={() => setSecurityOpen(true)}
                                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 data-[focus]:bg-gray-100 transition-colors"
                                >
                                    <LockClosedIcon className="size-5 text-gray-400 mb-1" />{" "}
                                    Security
                                </button>
                            </MenuItem>
                        )}
                        <div className="my-1 h-px bg-gray-100" />
                        <MenuItem>
                            <Link
                                method="post"
                                as="button"
                                href={route("logout")}
                                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 data-[focus]:bg-red-50 transition-colors"
                            >
                                Logout
                            </Link>
                        </MenuItem>
                    </MenuItems>
                </Transition>
            </Menu>

            <SecurityModal
                isOpen={securityOpen}
                onClose={() => setSecurityOpen(false)}
            />
        </>
    );
}
