import React, { useEffect } from "react";
import AdminLayout from "../layout";
import CreditsSection from "./sections/credits-section";
import store from "@/app/store/store";
import { get_cart_credit_thunk } from "@/app/redux/app-thunk";

export default function CreditsPage() {
    useEffect(() => {
        store.dispatch(get_cart_credit_thunk());
    }, []);
    return (
        <AdminLayout>
            <CreditsSection />
        </AdminLayout>
    );
}
