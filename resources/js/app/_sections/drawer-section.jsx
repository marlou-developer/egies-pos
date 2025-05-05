import React, { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function DrawerSection({ open, setOpen, children }) {
    return (
        <>
            <Transition show={open} as={Fragment}>
                <div onClick={() => setOpen(false)} className="relative z-50">
                    {/* Backdrop */}
                    <div>
                        <div className="fixed inset-0 bg-gray-900/80" />
                    </div>

                    {/* Sidebar panel */}
                    <div className="fixed inset-0 flex w justify-end w-full">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition duration-500 ease-out"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition duration-500 ease-in"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="relative flex w-full max-w-md flex-1"
                            >
                                {/* Close button */}
                                <div className="absolute top-0 left-full flex w-16 justify-center pt-5">
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="-m-2.5 p-2.5"
                                    >
                                        <span className="sr-only">
                                            Close sidebar
                                        </span>
                                        <XMarkIcon
                                            className="size-6 text-white"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                                {children}
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Transition>
        </>
    );
}
