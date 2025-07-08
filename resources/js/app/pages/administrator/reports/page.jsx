import React, { useEffect, useState } from "react";
import AdminLayout from "../layout";
import LineGraphSection from "./sections/line-graph-section";
import BarGraphSection from "./sections/bar-graph-section";
import TabsSection from "./sections/tabs-section";
import store from "@/app/store/store";
import { get_dashboard_thunk } from "@/app/redux/app-thunk";
import ProductTableSection from "./sections/product-table-section";
import { get_product_thunk } from "@/app/redux/product-thunk";
import GenerateReportSection from "./sections/generate-report-section";
import ProfitReportSection from "./sections/profit-report-section";
import InvoiceReportSection from "./sections/invoices-report-section";
import RefundsReportSection from "./sections/refunds-report-section";
import PurchaseInvoiceReportSection from "./sections/purchase-invoice-report-section";
import PaymentTypesByCustomerReportSection from "./sections/payment-types-by-customer-report-section";
import PurchaseBySupplierReportSection from "./sections/purchase-by-supplier-report-section";
import PaymentTypesByUserReportSection from "./sections/payment-types-by-user-report-section";
import PurchaseByProductReportSection from "./sections/purchase-by-product-report-section";
import UnpaidSalesReportSection from "./sections/unpaid-sales-report-section";
import SalesByPaymentTypeReportSection from "./sections/sales-by-payment-type-report-section";
import SalesByCustomerReportSection from "./sections/sales-by-customer-report-section";
import DailySalesReportSection from "./sections/daily-sales-report-section";
import SalesByProductReportSection from "./sections/sales-by-product-report-section";
import {
    get_report_items_thunk,
    get_report_thunk,
} from "@/app/redux/cart-thunk";
// import FastStockMovementReportSection from "./sections/fast-stock-movement-report-section";
import SlowStockMovementReportSection from "./sections/slow-stock-movement-report-section";
import ReportGeneratorSection from "./sections/report-generator-section";

export default function ReportsPage() {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
       
        async function get_data(params) {
            await store.dispatch(get_report_items_thunk());
            setLoading(false);
        }
        get_data();
    }, []);
    return (
        <AdminLayout>
            {/* <div className="flex flex-col gap-3 h-[88vh]">
                <GenerateReportSection />
                <TabsSection />
                <BarGraphSection />
                <div className="flex gap-3">
                    <div className="w-1/3">
                        <ProductTableSection />
                    </div>
                    <div className=" w-2/3">
                        <LineGraphSection />
                    </div>
                </div>
                {!loading && (
                    <div>
                        {type == "Profit" && <ProfitReportSection />}
                        {type == "Invoices" && <InvoiceReportSection />}
                        {type == "Refunds" && <RefundsReportSection />}
                        {type == "Purchase Invoices" && (
                            <PurchaseInvoiceReportSection />
                        )}
                        {type == "Payment Types by Customer" && (
                            <PaymentTypesByCustomerReportSection />
                        )}
                        {type == "Payment Types by User" && (
                            <PaymentTypesByUserReportSection />
                        )}
                        {type == "Purchase by Supplier" && (
                            <PurchaseBySupplierReportSection />
                        )}

                        {
                    type == 'Payment Types by User' && <PaymentTypesByUserReportSection />
                }
                        {type == "Purchase by Product" && (
                            <PurchaseByProductReportSection />
                        )}

                        {type == "Unpaid Sales" && <UnpaidSalesReportSection />}
                        {type == "Sales By Payment Types" && (
                            <SalesByPaymentTypeReportSection />
                        )}

                        {type == "Sales By Product" && (
                            <SalesByProductReportSection />
                        )}
                        {type == "Sales By Customer" && (
                            <SalesByCustomerReportSection />
                        )}
                        {type == "Daily Sales" && <DailySalesReportSection />}
                        {type == "Fast Stock Movement" && (
                            <FastStockMovementReportSection />
                        )}
                        {type == "Slow Stock Movement" && (
                            <SlowStockMovementReportSection />
                        )}
                    </div>
                )}
            </div> */}
            <ReportGeneratorSection />
        </AdminLayout>
    );
}
