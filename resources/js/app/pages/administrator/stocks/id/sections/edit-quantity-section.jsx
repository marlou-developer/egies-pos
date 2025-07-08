import Button from "@/app/_components/button";
import Input from "@/app/_components/input";
import Modal from "@/app/_components/modal";
import {
    get_stock_by_products_id_thunk,
    get_update_stock_thunk,
} from "@/app/redux/stock-thunk";
import store from "@/app/store/store";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { FaPenToSquare } from "react-icons/fa6";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function EditQuantitySection({ data }) {
    const { suppliers } = useSelector((store) => store.suppliers);
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
            <Tooltip title="Edit Added Stock(s)">
                <button
                    className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-orange-400 hover:bg-orange-500 p-3 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset"
                    onClick={() => setOpen(true)}>
                    <FaPenToSquare className="size-3.5 text-white" />
                </button>
            </Tooltip>
            <Modal
                isOpen={open}
                width="max-w-xl"
                onClose={() => setOpen(false)}
                title="Edit Added Stock(s)"
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
                    <select
                        onChange={(e) =>
                            setForm({
                                ...form,
                                supplier_id: e.target.value,
                            })
                        }
                        value={form?.supplier_id ?? ""}
                        name="supplier_id"
                        className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-pink-300 focus:border-pink-300 sm:text-sm/6"
                    >
                        <option value="">
                            Select Supplier
                        </option>
                        <option value="">
                            N/A
                        </option>
                        {suppliers.map((supplier) => (
                            <option
                                key={supplier.id}
                                value={supplier.id}
                            >
                                {supplier.name}
                            </option>
                        ))}
                    </select>
                    <Button loading={loading} onClick={update_quantity}>
                        UPDATE
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
