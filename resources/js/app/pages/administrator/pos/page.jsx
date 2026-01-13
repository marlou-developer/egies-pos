import React, { useEffect } from "react";
import PosSection from "./sections/pos-section";
import AdminLayout from "../layout";
import store from "@/app/store/store";
import { get_category_thunk } from "@/app/redux/category-thunk";
import { get_customer_thunk } from "@/app/redux/customer-thunk";
import { useSelector } from "react-redux";

export default function PosPage() {
    const { reload } = useSelector((store) => store.app);
    useEffect(() => {
        store.dispatch(get_category_thunk());
        store.dispatch(get_customer_thunk());
    }, [reload]);
    return (
        <AdminLayout>
            <PosSection />
        </AdminLayout>
    );
}
