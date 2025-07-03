import React, { useEffect } from "react";
import store from "@/app/store/store";
import { useSelector } from "react-redux";
import SalesIdTableSection from "./sections/sales-id-table-section";
import AdminLayout from "../../../layout";
import { get_category_thunk } from "@/app/redux/category-thunk";
import { get_cart_by_id_thunk } from "@/app/redux/cart-thunk";

export default function SalesByPage() {
    const cart_id = window.location.pathname.split("/")[4];
    useEffect(() => {
        store.dispatch(get_category_thunk());
        store.dispatch(get_cart_by_id_thunk(cart_id));
    }, []);
    return (
        <AdminLayout>
            <SalesIdTableSection />
        </AdminLayout>
    );
}
