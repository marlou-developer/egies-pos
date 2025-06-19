import Button from "@/app/_components/button";
import Input from "@/app/_components/input";
import Modal from "@/app/_components/modal";
import { peso_value } from "@/app/lib/peso";
import { edit_payment_service } from "@/app/pages/services/cart-service";
import { get_cart_credit_thunk } from "@/app/redux/app-thunk";
import store from "@/app/store/store";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import Swal from "sweetalert2";

export default function EditPaymentSection({ data }) {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    const [isPartial, setIsPartial] = useState(false);
    console.log("datadata", data);

    useEffect(() => {
        setForm({
            cart_id: data?.cart_id,
            due_date: data?.due_date,
        });
    }, [open]);
    async function edit_payment(params) {
        try {
            setLoading(true);
            await edit_payment_service(form);
            await store.dispatch(get_cart_credit_thunk());
            await Swal.fire({
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500,
            });
            setOpen(false);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }
    console.log("data0", data);

    function isDisabled(params) {
        // if (isPartial && form.due_date) {
        //     return true;
        // }if (form.amount < Number(data.balance)) {
        //         return true;
        // }else{
        //     return true
        // }
        if (
            // isPartial &&
            form.due_date
            // &&
            // form.payment_type &&
            // form.amount &&
            // form.amount <= Number(data.balance)
        ) {
            return false;
        }
        if (
            !isPartial &&
            form.payment_type &&
            form.amount &&
            form.amount <= Number(data.balance)
        ) {
            return false;
        } else {
            return true;
        }
    }
    // alert(form.due_date)
    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-blue-100 hover:bg-blue-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset"
            >
                <FaMoneyBillTransfer className=" text-blue-500" />
                Edit Due Date
            </button>

            <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                title="EDIT DUE DATE"
                width="max-w-lg"
            >
                <div className=" flex flex-col gap-3">
                    <div>
                        <div className="font-xl font-bold">
                            Customer Name: {data.customer.name}
                        </div>
                        <div className="font-xl font-bold">
                            Balance: {peso_value(Number(data.balance))}
                        </div>
                        <div className="font-xl font-bold">
                            Current Balance:{" "}
                            {peso_value(
                                Number(data.balance) - Number(form.amount ?? 0)
                            )}
                        </div>
                    </div>

                    <Input
                        onChange={(e) =>
                            setForm({
                                ...form,
                                due_date: e.target.value,
                            })
                        }
                        value={form.due_date}
                        type="date"
                        label="Date"
                    />

                    {/* <div>
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
                    </div> */}
                    {/* <select
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
                    </select> */}
                    <Button
                        disabled={isDisabled()}
                        loading={loading}
                        onClick={edit_payment}
                    >
                        EDIT DUE DATE
                    </Button>
                </div>
            </Modal>
        </>
    );
}
