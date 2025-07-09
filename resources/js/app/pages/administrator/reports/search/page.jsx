import React, { useEffect, useState } from "react";
import AdminLayout from "../../layout";
import store from "@/app/store/store";
import {
    get_report_items_thunk,
    get_report_thunk,
} from "@/app/redux/cart-thunk";
import FastStockMovementReportSection from "./sections/stock-movement-report-section";
import SalesByCustomerReportSection from "./sections/sales-by-customer-report-section";
import DailySalesReportSection from "./sections/daily-sales-report-section";
import InvoiceReportSection from "./sections/invoices-report-section";
import PaymentTypesByUserReportSection from "./sections/payment-types-by-user-report-section";
import ProfitReportSection from "./sections/profit-report-section";

export default function Page() {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // store.dispatch(get_dashboard_thunk("Daily"));
        // store.dispatch(get_product_thunk());
        async function get_data(params) {
            await store.dispatch(get_report_thunk());

            setLoading(false);
        }
        get_data();
    }, []);
    return (
        <>
            {!loading && (
                <>
                    {type == "Stock Movement" && (
                        <FastStockMovementReportSection />
                    )}
                    {type == "Sales By Customer" && (
                        <SalesByCustomerReportSection />
                    )}
                    {type == "Daily Sales" && <DailySalesReportSection />}

                    {type == "Invoices" && <InvoiceReportSection />}
                    {type == "Payment Types by User" && (
                        <PaymentTypesByUserReportSection />
                    )}
                    {type == "Profit and Margin" && <ProfitReportSection />}
                </>
            )}
        </>
    );
}
