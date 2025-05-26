import React, { useEffect } from "react";
import AdminLayout from "../layout";
import CreditsSection from "./sections/credits-section";
import store from "@/app/store/store";
import { get_shopee_thunk } from "@/app/redux/cart-thunk";

export default function CreditsPage() {
    useEffect(() => {
        store.dispatch(get_shopee_thunk());
    }, []);
    return (
        <AdminLayout>
            <CreditsSection />
        </AdminLayout>
    );
}
