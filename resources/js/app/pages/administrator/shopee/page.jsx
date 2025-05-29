import React, { useEffect } from "react";
import AdminLayout from "../layout";
import store from "@/app/store/store";
import { get_shopee_thunk } from "@/app/redux/cart-thunk";
import ShopeeSection from "./sections/shopee-section";

export default function CreditsPage() {
    useEffect(() => {
        store.dispatch(get_shopee_thunk());
    }, []);
    return (
        <AdminLayout>
            < ShopeeSection />
        </AdminLayout>
    );
}
