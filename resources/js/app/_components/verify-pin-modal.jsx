import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { LockClosedIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";

/**
 * Reusable PIN verification modal.
 *
 * Usage:
 *   <VerifyPinModal
 *       isOpen={showPin}
 *       onClose={() => setShowPin(false)}
 *       onVerified={() => { setShowPin(false); proceedWithDelete(); }}
 *       actionLabel="delete this record"
 *   />
 *
 * If no PIN is configured by the Super Admin, onVerified() is called immediately.
 */
export default function VerifyPinModal({ isOpen, onClose, onVerified, actionLabel = "perform this action" }) {
    const [pin, setPin] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    const reset = () => {
        setPin("");
        setError("");
        setLoading(false);
    };

    const handleAfterEnter = () => {
        inputRef.current?.focus();
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!pin.trim()) {
            setError("Please enter the PIN.");
            return;
        }
        setError("");
        setLoading(true);
        try {
            const res = await axios.post("/api/security/verify", { pin });
            if (res.data.verified) {
                reset();
                onVerified();
            } else {
                setError("Incorrect PIN. Please try again.");
            }
        } catch (err) {
            if (err.response?.status === 401) {
                setError(err.response.data?.message || "Incorrect PIN. Please try again.");
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Transition show={isOpen} as={Fragment} afterEnter={handleAfterEnter}>
            <Dialog as="div" className="relative z-50" onClose={handleClose}>
                {/* Overlay */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                </Transition.Child>

                {/* Panel */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100">
                                    <LockClosedIcon className="h-5 w-5 text-indigo-600" />
                                </div>
                                <div className="flex-1">
                                    <Dialog.Title className="text-sm font-semibold text-gray-900">
                                        Security PIN Required
                                    </Dialog.Title>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        Enter the PIN to {actionLabel}.
                                    </p>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <XMarkIcon className="h-5 w-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <input
                                        ref={inputRef}
                                        type="password"
                                        value={pin}
                                        onChange={(e) => {
                                            setPin(e.target.value);
                                            setError("");
                                        }}
                                        inputMode="numeric"
                                        maxLength={8}
                                        placeholder="Enter PIN"
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-center text-lg tracking-widest focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    />
                                    {error && (
                                        <p className="mt-1.5 text-xs text-red-500 text-center">
                                            {error}
                                        </p>
                                    )}
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={handleClose}
                                        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60 transition-colors"
                                    >
                                        {loading ? (
                                            <>
                                                <svg
                                                    className="h-4 w-4 animate-spin"
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
                                                Verifying…
                                            </>
                                        ) : (
                                            "Confirm"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}
