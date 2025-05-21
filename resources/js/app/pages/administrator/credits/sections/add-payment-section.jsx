import Button from "@/app/_components/button";
import Input from "@/app/_components/input";
import Modal from "@/app/_components/modal";
import { get_cart_credit_thunk } from "@/app/redux/app-thunk";
import { add_payment_thunk } from "@/app/redux/cart-thunk";
import store from "@/app/store/store";
import React, { useState } from "react";

export default function AddPaymentSection({ data }) {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);

    async function add_payment(params) {
        try {
            setLoading(true);
            await store.dispatch(
                add_payment_thunk({
                    ...data,
                    ...form,
                })
            );
            await store.dispatch(get_cart_credit_thunk());
            setOpen(false)
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }
    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-yellow-100 hover:bg-yellow-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset"
            >
                Pay Credit
            </button>

            <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                title="Add Payment"
                width="max-w-lg"
            >
                <div className=" flex flex-col gap-3">
                    <div>
                        <Input
                            label="Amount"
                            name=""
                            value={form.amount}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    amount: e.target.value,
                                })
                            }
                            type="number"
                        />
                    </div>
                    <select
                        onChange={(e) =>
                            setForm({
                                ...form,
                                payment_type: e.target.value,
                            })
                        }
                        className="rounded-md py-2.5 text-gray-500"
                        label="Mode of Payment"
                    >
                        <option disabled selected>
                            Mode of Payment:
                        </option>
                        <option value="Cash">Cash</option>
                        <option value="E-Wallet">E-Wallet</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Credit/Debit Card">
                            Credit/Debit Card
                        </option>
                    </select>
                    <Button loading={loading} onClick={add_payment}>
                        ADD PAYMENT
                    </Button>
                </div>
            </Modal>
        </>
    );
}
