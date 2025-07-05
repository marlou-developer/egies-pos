import Input from "@/app/_components/input";
import { edit_discount_service } from "@/app/pages/services/cart-service";
import {
    delete_cart_item_thunk,
    delete_cart_thunk,
    get_cart_by_id_thunk,
} from "@/app/redux/cart-thunk";
import {
    delete_product_thunk,
    get_product_thunk,
} from "@/app/redux/product-thunk";
import {
    delete_supplier_thunk,
    get_supplier_thunk,
} from "@/app/redux/supplier-thunk";
import { delete_user_thunk, get_users_thunk } from "@/app/redux/user-thunk";
import store from "@/app/store/store";
import Modal from "@/Components/Modal";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import { message, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { FaPercent, FaTrashCan } from "react-icons/fa6";

export default function EditDIscountSection({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const [loading, setLoading] = useState(false);
    const cart_id = window.location.pathname.split("/")[4] ?? window.location.pathname.split("/")[3];
    const [form, setForm] = useState({});

    useEffect(() => {
        setForm(data)
    }, [isModalOpen])

    const deleteUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await edit_discount_service(form)
            // await store.dispatch(delete_cart_item_thunk(data.id));
            await store.dispatch(get_cart_by_id_thunk(cart_id));
            message.success("Edit Successfully!");
            setIsModalOpen(false);
        } catch (error) {
            message.error("Failed to Edit Item. Please try again."); // Show error message
        } finally {
            setLoading(false); // Always reset loading state
        }
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Tooltip title="Remove Product on Sales">
                <button
                    // className="inline-flex items-center justify-center gap-x-1.5 text-white rounded-md bg-blue-500 hover:bg-blue-600 p-3 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset"
                    className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-blue-100 hover:bg-blue-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset"
                    onClick={openModal}
                >
                    <FaPercent />
                    EDIT DISCOUNT
                </button>
            </Tooltip>
            <Modal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                onClose={() => setIsModalOpen(false)}
                width="w-1/4"
            >
                <h2 className="text-xl font-semibold mb-4">
                    Are you sure you want to remove {data?.product?.name}?
                </h2>
                <form action="" onSubmit={deleteUser}>
                    <div className="flex flex-col w-full gap-5">
                        <Input
                            label="Discount Per Order"
                            name="discount_per_order"
                            type="number"
                            value={form?.discount_per_order ?? 0}
                            onChange={(e) =>
                                setForm({
                                    ...data,
                                    discount_per_order: e.target.value,
                                })
                            }
                        />
                        <button
                            disabled={loading}
                            type="submit"
                            className="bg-blue-400 p-2 w-full rounded-md text-white hover:bg-blue-300"
                        >
                            {loading ? "Loading..." : "Confirm"}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
