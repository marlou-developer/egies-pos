import { edit_quantity_service } from "@/app/pages/services/cart-service";
import { get_cart_by_id_thunk } from "@/app/redux/cart-thunk";
import VerifyPinModal from "@/app/_components/verify-pin-modal";
import store from "@/app/store/store";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function SalesEditQuantitySection({ data }) {
    const [isEdit, setIsEdit] = useState(false);
    const [pinOpen, setPinOpen] = useState(false);
    const [value, setValue] = useState(data?.quantity || 0);
    const cart_id = window.location.pathname.split("/")[3];

    const handleKeyDown = async (e) => {
        if (e.key === "Enter") {
            await edit_quantity_service({
                ...data,
                quantity: value,
            });
            await store.dispatch(get_cart_by_id_thunk(data?.cart_id));
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
            <VerifyPinModal
                isOpen={pinOpen}
                onClose={() => setPinOpen(false)}
                onVerified={() => {
                    setPinOpen(false);
                    setIsEdit(true);
                }}
                actionLabel="edit this quantity"
            />
            {!isEdit && (
                <button className="w-full flex" onClick={() => setPinOpen(true)}>
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
