import { edit_quantity_service } from "@/app/pages/services/cart-service";
import { get_cart_by_id_thunk } from "@/app/redux/cart-thunk";
import store from "@/app/store/store";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function SalesEditQuantitySection({ data }) {
    const [isEdit, setIsEdit] = useState(false);
    const [value, setValue] = useState(data?.quantity || 0);
    const cart_id = window.location.pathname.split("/")[3];

    useEffect(() => {
        setValue(data?.quantity);
    }, [data?.quantity]);

    const handleKeyDown = async (e) => {
        if (e.key === "Enter") {
            await edit_quantity_service({
                ...data,
                quantity: value,
            });
            await store.dispatch(get_cart_by_id_thunk(cart_id));
            await Swal.fire({
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500,
            });
            setIsEdit(false);
        }
    };

    return (
        <div className="w-36">
            {!isEdit && (
                <button className="w-full flex" onClick={() => setIsEdit(true)}>
                    {value}
                </button>
            )}
            {isEdit && (
                <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="border px-2 py-1 w-full"
                />
            )}
        </div>
    );
}
