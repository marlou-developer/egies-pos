import React, { useEffect } from "react";
import AdminLayout from "../layout";
import NotificationsSection from "./sections/notifications-section";
import store from "@/app/store/store";
import { get_over_due_thunk } from "@/app/redux/cart-thunk";

export default function NotificationsPage() {
    useEffect(() => {
        store.dispatch(get_over_due_thunk());
    }, []);

    return (
        <AdminLayout>
            <NotificationsSection />
        </AdminLayout>
    );
}
