import React, { useEffect } from "react";
import AdminLayout from "../layout";
import LineGraphSection from "./sections/line-graph-section";
import BarGraphSection from "./sections/bar-graph-section";
import TabsSection from "./sections/tabs-section";
import store from "@/app/store/store";
import { get_dashboard_thunk } from "@/app/redux/app-thunk";
import ProductTableSection from "./sections/product-table-section";
import { get_product_thunk } from "@/app/redux/product-thunk";
import GenerateReportSection from "./sections/generate-report-section";

export default function ReportsPage() {
    useEffect(() => {
        store.dispatch(get_dashboard_thunk("Daily"));
        store.dispatch(get_product_thunk());
    }, []);
    return (
        <AdminLayout>
            <div className="flex flex-col gap-3">
                <GenerateReportSection />
                <TabsSection />
                <BarGraphSection />
                {/* <div className="flex gap-3">
                    <div className="w-1/3">
                        <ProductTableSection />
                    </div>
                    <div className=" w-2/3">
                        <LineGraphSection />
                    </div>
                </div> */}
            </div>
        </AdminLayout>
    );
}
