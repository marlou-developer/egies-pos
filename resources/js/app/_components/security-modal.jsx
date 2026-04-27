import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
    LockClosedIcon,
    XMarkIcon,
    ShieldCheckIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";

export default function SecurityModal({ isOpen, onClose }) {
    const [hasPin, setHasPin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [removing, setRemoving] = useState(false);
    const [showRemoveForm, setShowRemoveForm] = useState(false);

    const [form, setForm] = useState({
        current_pin: "",
        pin: "",
        confirm_pin: "",
    });
    const [removePin, setRemovePin] = useState("");
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (isOpen) {
            fetchStatus();
            setErrors({});
            setSuccess("");
            setShowRemoveForm(false);
            setForm({ current_pin: "", pin: "", confirm_pin: "" });
            setRemovePin("");
        }
    }, [isOpen]);

    const fetchStatus = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/security");
            setHasPin(res.data.has_pin);
        } catch (_) {
            /* ignore */
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors((prev) => ({ ...prev, [e.target.name]: null }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccess("");
        setSaving(true);
        try {
            const res = await axios.post("/api/security", form);
            setSuccess(res.data.message);
            setHasPin(true);
            setForm({ current_pin: "", pin: "", confirm_pin: "" });
        } catch (err) {
            if (err.response?.status === 422) {
                const data = err.response.data;
                if (data.errors) {
                    setErrors(data.errors);
                } else if (data.message) {
                    setErrors({ current_pin: data.message });
                }
            }
        } finally {
            setSaving(false);
        }
    };

    const handleRemove = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccess("");
        setRemoving(true);
        try {
            const res = await axios.delete("/api/security", {
                data: { current_pin: removePin },
            });
            setSuccess(res.data.message);
            setHasPin(false);
            setRemovePin("");
            setShowRemoveForm(false);
        } catch (err) {
            if (err.response?.status === 422) {
                const data = err.response.data;
                setErrors({ remove_pin: data.message || "Incorrect PIN." });
            }
        } finally {
            setRemoving(false);
        }
    };

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                {/* Overlay */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                </Transition.Child>

                {/* Panel */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95 translate-y-2"
                        enterTo="opacity-100 scale-100 translate-y-0"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100 translate-y-0"
                        leaveTo="opacity-0 scale-95 translate-y-2"
                    >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left shadow-xl transition-all">
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-5">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                                    <LockClosedIcon className="h-5 w-5 text-indigo-600" />
                                </div>
                                <div>
                                    <Dialog.Title className="text-base font-semibold text-gray-900">
                                        Security PIN
                                    </Dialog.Title>
                                    <p className="text-xs text-gray-500">
                                        Required before editing or deleting records
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <XMarkIcon className="h-5 w-5" />
                                </button>
                            </div>

                            {loading ? (
                                <div className="flex justify-center py-8">
                                    <svg
                                        className="h-6 w-6 animate-spin text-indigo-500"
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
                            ) : (
                                <>
                                    {/* Status Badge */}
                                    <div className="mb-4 flex items-center gap-2">
                                        {hasPin ? (
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                                <ShieldCheckIcon className="h-3.5 w-3.5" />
                                                PIN is active
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                                                <LockClosedIcon className="h-3.5 w-3.5" />
                                                No PIN set
                                            </span>
                                        )}
                                    </div>

                                    {/* Success message */}
                                    {success && (
                                        <div className="mb-4 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
                                            {success}
                                        </div>
                                    )}

                                    {/* Set / Change PIN Form */}
                                    {!showRemoveForm && (
                                        <form onSubmit={handleSave} className="space-y-3">
                                            {hasPin && (
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                                        Current PIN
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="current_pin"
                                                        value={form.current_pin}
                                                        onChange={handleChange}
                                                        inputMode="numeric"
                                                        maxLength={8}
                                                        placeholder="Enter current PIN"
                                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                                    />
                                                    {errors.current_pin && (
                                                        <p className="mt-1 text-xs text-red-500">
                                                            {errors.current_pin}
                                                        </p>
                                                    )}
                                                </div>
                                            )}

                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                    {hasPin ? "New PIN" : "Set PIN"}{" "}
                                                    <span className="text-gray-400 font-normal">
                                                        (4-8 digits)
                                                    </span>
                                                </label>
                                                <input
                                                    type="password"
                                                    name="pin"
                                                    value={form.pin}
                                                    onChange={handleChange}
                                                    inputMode="numeric"
                                                    maxLength={8}
                                                    placeholder="e.g. 1234"
                                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                                />
                                                {errors.pin && (
                                                    <p className="mt-1 text-xs text-red-500">
                                                        {Array.isArray(errors.pin)
                                                            ? errors.pin[0]
                                                            : errors.pin}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                    Confirm PIN
                                                </label>
                                                <input
                                                    type="password"
                                                    name="confirm_pin"
                                                    value={form.confirm_pin}
                                                    onChange={handleChange}
                                                    inputMode="numeric"
                                                    maxLength={8}
                                                    placeholder="Re-enter PIN"
                                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                                />
                                                {errors.confirm_pin && (
                                                    <p className="mt-1 text-xs text-red-500">
                                                        {Array.isArray(errors.confirm_pin)
                                                            ? errors.confirm_pin[0]
                                                            : errors.confirm_pin}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex items-center justify-between pt-2 gap-2">
                                                {hasPin && (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setShowRemoveForm(true);
                                                            setErrors({});
                                                            setSuccess("");
                                                        }}
                                                        className="inline-flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 transition-colors"
                                                    >
                                                        <TrashIcon className="h-3.5 w-3.5" />
                                                        Remove PIN
                                                    </button>
                                                )}
                                                <button
                                                    type="submit"
                                                    disabled={saving}
                                                    className="ml-auto inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60 transition-colors"
                                                >
                                                    {saving ? (
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
                                                            Saving…
                                                        </>
                                                    ) : hasPin ? (
                                                        "Update PIN"
                                                    ) : (
                                                        "Set PIN"
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    )}

                                    {/* Remove PIN Form */}
                                    {showRemoveForm && (
                                        <form onSubmit={handleRemove} className="space-y-3">
                                            <p className="text-sm text-gray-600">
                                                Enter your current PIN to remove it.
                                            </p>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                    Current PIN
                                                </label>
                                                <input
                                                    type="password"
                                                    value={removePin}
                                                    onChange={(e) => {
                                                        setRemovePin(e.target.value);
                                                        setErrors({});
                                                    }}
                                                    inputMode="numeric"
                                                    maxLength={8}
                                                    placeholder="Enter current PIN"
                                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                                />
                                                {errors.remove_pin && (
                                                    <p className="mt-1 text-xs text-red-500">
                                                        {errors.remove_pin}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex items-center justify-between pt-2 gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setShowRemoveForm(false);
                                                        setErrors({});
                                                        setRemovePin("");
                                                    }}
                                                    className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                                                >
                                                    ← Back
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={removing}
                                                    className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60 transition-colors"
                                                >
                                                    {removing ? "Removing…" : "Remove PIN"}
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </>
                            )}
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}
