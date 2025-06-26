import React, { useEffect } from "react";
import store from "@/app/store/store";
import { get_cart_by_id_thunk } from "@/app/redux/cart-thunk";
import AdminLayout from "../../layout";
import { useSelector } from "react-redux";
import SalesIdTableSection from "./sections/sales-id-table-section";
import { get_category_thunk } from "@/app/redux/category-thunk";

export default function SalesByPage() {
    const cart_id = window.location.pathname.split("/")[3];
    useEffect(() => {
        store.dispatch(get_category_thunk());
        store.dispatch(get_cart_by_id_thunk(cart_id));
    }, []);
    return <AdminLayout>
        <SalesIdTableSection />
    </AdminLayout>;
}
