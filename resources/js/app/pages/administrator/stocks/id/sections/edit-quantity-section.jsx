import Button from "@/app/_components/button";
import Input from "@/app/_components/input";
import Modal from "@/app/_components/modal";
import {
    get_stock_by_products_id_thunk,
    get_update_stock_thunk,
} from "@/app/redux/stock-thunk";
import store from "@/app/store/store";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function EditQuantitySection({ data }) {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (open) {
            setForm({
                ...data,
                new_quantity: data.quantity,
                date: data.date?.split('T')[0],
            });
        }
    }, [open]);

    async function update_quantity(params) {
        try {
            setLoading(true);
            await store.dispatch(
                get_update_stock_thunk({
                    ...form,
                    new_quantity: Number(form.new_quantity),
                    quantity: Number(form.quantity),
                    return: Number(form.quantity) - Number(form.new_quantity),
                })
            );

            await store.dispatch(get_stock_by_products_id_thunk());
            await Swal.fire({
                icon: "success",
                title: "Added Stock(s) has been updated",
                showConfirmButton: false,
                timer: 1500,
            });
            setOpen(false);
            setLoading(false);
        } catch (error) { }
    }
    console.log("waaaa", data);
    return (
        <div>
            <button onClick={() => setOpen(true)}>Edit</button>
            <Modal
                isOpen={open}
                width="max-w-xl"
                onClose={() => setOpen(false)}
                title="Edit Quantity"
            >
                <div className="flex gap-5 flex-col w-full">
                    <Input
                        label="Quantity"
                        name="new_quantity"
                        value={form?.new_quantity}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                new_quantity: e.target.value,
                            })
                        }
                    />
                    <Input
                        type="date"
                        label="Date"
                        name="date"
                        value={form?.date}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                date: e.target.value,
                            })
                        }
                    />
                    <Button loading={loading} onClick={update_quantity}>
                        UPDATE
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
