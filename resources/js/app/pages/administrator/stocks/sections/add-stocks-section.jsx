import React, { useState } from "react";
import { FaSquarePlus } from "react-icons/fa6";
import Modal from "@/Components/Modal";
import Input from "@/app/_components/input";
import store from "@/app/store/store";
import { create_stock_thunk } from "@/app/redux/stock-thunk";
import { message } from "antd";
import { get_product_thunk } from "@/app/redux/product-thunk";
import { get_over_due_thunk } from "@/app/redux/cart-thunk";
import { useSelector } from "react-redux";

export default function AddStocksSection({ data }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [costOption, setCostOption] = useState("same");
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({});
    const { suppliers } = useSelector((store) => store.suppliers)
    const addStock = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await store.dispatch(
                create_stock_thunk({
                    ...form,
                    product_id: String(data?.id),
                    price: costOption === "same" ? data?.cost : null,
                    remaining: String(data?.quantity),
                })
            );
            await store.dispatch(get_over_due_thunk());
            await store.dispatch(get_product_thunk());
            message.success("Successfully added!");
            setModalOpen(false);
            setForm({});
            setCostOption("same");
        } catch (error) {
            message.error("Failed to add stock. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    console.log('suppliers', suppliers)
    return (
        <div>
            <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="relative inline-flex items-center rounded-md bg-pink-100 w-full px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-pink-200 "
            >
                <FaSquarePlus className="mr-1 text-pink-500" />
                Add Stocks
            </button>

            <Modal open={modalOpen} setOpen={setModalOpen}>
                <form onSubmit={addStock}>
                    <div className="mt-6 flex flex-col gap-5">
                        <h1 className="font-bold text-xl text-pink-500">
                            Add Stock(s)
                        </h1>
                        <div>
                            <Input
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        date: e.target.value,
                                    })
                                }
                                value={form.date || ""}
                                name="date"
                                label="Delivery Date"
                                type="date"
                                required
                            />
                        </div>
                        <div>
                            <Input
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        delivery_id: e.target.value,
                                    })
                                }
                                value={form.delivery_id || ""}
                                name="delivery_id"
                                label="Delivery ID"
                                type="text"
                                required
                            />
                        </div>
                        <div>
                            <Input
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        quantity: e.target.value,
                                    })
                                }
                                value={form.quantity || ""}
                                name="quantity"
                                label="Quantity"
                                type="number"
                                required
                            />
                        </div>

                        <div>
                            <select
                                value={form?.supplier_id}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        supplier_id: e.target.value,
                                    })
                                }
                                className="w-full rounded-md border-gray-500 text-sm h-11"
                            >
                                <option disabled selected>
                                    Select Supplier
                                </option>
                                {
                                    suppliers.map((res, i) => {
                                        return <option key={i} value={res.id}>
                                            {res.name}
                                        </option>
                                    })
                                }

                            </select>
                        </div>
                        <div>
                            <select
                                value={costOption}
                                onChange={(e) => setCostOption(e.target.value)}
                                className="w-full rounded-md border-gray-500 text-sm h-11"
                            >
                                <option disabled selected>
                                    Pricing
                                </option>
                                <option value="same">
                                    Same cost price = ₱
                                    {parseFloat(data?.cost).toLocaleString(
                                        "en-PH",
                                        { minimumFractionDigits: 2 }
                                    )}
                                </option>
                                <option value="different">
                                    Different cost price
                                </option>
                            </select>
                        </div>

                        {costOption === "different" && (
                            <p className="text-sm text-gray-600">
                                If cost price is different from the current cost
                                price,&nbsp;
                                <a
                                    href="/administrator/products"
                                    className="text-pink-500 underline"
                                >
                                    Add Product
                                </a>{" "}
                                instead.
                            </p>
                        )}
                    </div>
                    <div className="mt-3 w-full">
                        <div className="flex items-center justify-end">
                            <button
                                type="submit"
                                disabled={costOption === "different"}
                                className={`rounded-md p-2 text-white transition 
        ${costOption === "different"
                                        ? "bg-gray-300 cursor-not-allowed"
                                        : "bg-pink-400 hover:bg-pink-500"
                                    }
    `}
                            >
                                Add Stock
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
