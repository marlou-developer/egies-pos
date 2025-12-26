import React, { useEffect, useState } from "react";
import { FaSquareMinus } from "react-icons/fa6";
import { Tooltip, message } from "antd";
import { useSelector } from "react-redux";

import Modal from "@/Components/Modal";
import Input from "@/app/_components/input";
import store from "@/app/store/store";
import { get_product_thunk } from "@/app/redux/product-thunk";
import { get_over_due_thunk } from "@/app/redux/cart-thunk";
import { minus_stock_service } from "@/app/pages/services/stock-service";

export default function MinusStockSection({ data }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({});

    // Keep if you will use suppliers later, otherwise safe to remove
    useSelector((state) => state.suppliers);

    useEffect(() => {
        if (!data) return;

        setForm({
            ...data,
            product_id: String(data.id),
            quantity: data.quantity,
        });
    }, [data]);

    const minusStock = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await minus_stock_service(form);
            await store.dispatch(get_over_due_thunk());
            await store.dispatch(get_product_thunk());

            message.success("Successfully deducted!");
            setModalOpen(false);
            setForm({});
        } catch (error) {
            message.error("Failed to deduct stock. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const isDisabled = () => {
        if (loading) return true;
        if (!form.quantity) return true;
        if (Number(form.quantity) > Number(data?.quantity)) return true;
        return false;
    };

    return (
        <div>
            <Tooltip title="Minus Stock">
                <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="relative inline-flex items-center justify-center w-full rounded-md bg-red-400 p-3 text-sm font-semibold text-white ring-1 ring-inset ring-gray-300 hover:bg-red-600"
                >
                    <FaSquareMinus />
                </button>
            </Tooltip>

            <Modal open={modalOpen} setOpen={setModalOpen}>
                <form onSubmit={minusStock}>
                    <div className="mt-6 flex flex-col gap-5">
                        <h1 className="font-bold text-xl text-pink-500">
                            Minus Stock(s)
                        </h1>

                        <Input
                            label="Quantity"
                            type="number"
                            name="quantity"
                            required
                            value={form.quantity ?? ""}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    quantity: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="mt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={isDisabled()}
                            className={`rounded-md px-4 py-2 text-white transition
                                ${
                                    isDisabled()
                                        ? "bg-gray-300 cursor-not-allowed"
                                        : "bg-pink-400 hover:bg-pink-500"
                                }
                            `}
                        >
                            {loading ? "Processing..." : "Minus Stock"}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
