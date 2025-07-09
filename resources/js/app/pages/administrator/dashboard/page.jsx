import React, { useState } from "react";
import {
    BanknotesIcon,
    CalendarDaysIcon,
    CalendarIcon,
    CircleStackIcon,
    ComputerDesktopIcon,
    CreditCardIcon,
    CurrencyDollarIcon,
    DocumentCurrencyDollarIcon,
    ExclamationCircleIcon,
    NoSymbolIcon,
    PresentationChartBarIcon,
    PresentationChartLineIcon,
} from "@heroicons/react/24/outline";
import AdminLayout from "../layout";
import DashboardCardSections from "./sections/dashboard-card-sections";
import { useSelector } from "react-redux";
import { peso_value } from "@/app/lib/peso";
import { FaCircleDollarToSlot, FaDollarSign } from "react-icons/fa6";

export default function Page() {
    const { over_dues } = useSelector((store) => store.carts);
    const dashboard = over_dues?.dashboard;

    const formatValue = (value, isCurrency = true) => {
        if (value == null || isNaN(value)) {
            return isCurrency ? peso_value(0) : "0";
        }
        return isCurrency ? peso_value(Number(value)) : Number(value).toString();
    };

    console.log("Dashboard Data:", dashboard);


    return (
        <AdminLayout>
            <div className="flex flex-col gap-5">
                <div>
                    <div className="p-1 mb-2 text-2xl font-black">Sales Section</div>
                    <div className="flex gap-6 mb-3">
                        <DashboardCardSections
                            title="Current Sales"
                            icon={<PresentationChartLineIcon className="h-14 text-pink-600" />}
                            count={<>{formatValue(dashboard?.current_sales)}</>}
                        />
                        <DashboardCardSections
                            title="Current Profit"
                            icon={<PresentationChartBarIcon className="h-14 text-pink-600" />}
                            count={<>{formatValue(dashboard?.current_profit)}</>}
                        />
                        <DashboardCardSections
                            title="Total Sales"
                            icon={<PresentationChartLineIcon className="h-14 text-pink-600" />}
                            count={<>{formatValue(dashboard?.total_sales)}</>}
                        />
                        <DashboardCardSections
                            title="Total Profit"
                            icon={<PresentationChartBarIcon className="h-14 text-pink-600" />}
                            count={<>{formatValue(dashboard?.total_profit)}</>}
                        />
                    </div>
                </div>
                <div>
                    <div className="p-1 mb-2  text-2xl font-black">Credit Section</div>
                    <div className="flex gap-6 mb-3">
                        <DashboardCardSections
                            title="Current Credits"
                            icon={<CreditCardIcon className="h-14 text-pink-600" />}
                            count={<>{formatValue(dashboard?.current_credit)}</>}
                        />
                        <DashboardCardSections
                            title="Total Amount Credits"
                            icon={<CreditCardIcon className="h-14 text-pink-600" />}
                            count={<>{formatValue(dashboard?.total_credit)}</>}
                        />
                        <DashboardCardSections
                            title="No. of Due Date"
                            icon={<CalendarDaysIcon className="h-14 text-pink-600" />}
                            count={<>{formatValue(dashboard?.due_date_today, false)}</>}
                        />
                        <DashboardCardSections
                            title="No. Of Over Due"
                            icon={<CalendarIcon className="h-14 text-pink-600" />}
                            count={<>{formatValue(dashboard?.over_due, false)}</>}
                        />
                    </div>
                </div>
                <div>
                    <div className="p-1 mb-2  text-2xl font-black">Stocks Section</div>
                    <div className="flex gap-6 mb-3">
                        <DashboardCardSections
                            title="No. Of Low Stock Product"
                            icon={<ExclamationCircleIcon className="h-14 text-pink-600" />}
                            count={<>{formatValue(dashboard?.low_stock, false)}</>}
                        />
                        <DashboardCardSections
                            title="No. Of Out of Stock Product"
                            icon={<NoSymbolIcon className="h-14 text-pink-600" />}
                            count={<>{formatValue(dashboard?.out_of_stock, false)}</>}
                        />
                        <DashboardCardSections
                            title="Total Overall Inventory Retail Price"
                            icon={<BanknotesIcon className="h-14 text-pink-600" />}
                            count={<>{formatValue(dashboard?.total_overall_inventory_retail_price)}</>}
                        />
                        <DashboardCardSections
                            title="Total Overall Inventory Capital"
                            icon={<CircleStackIcon className="h-14 text-pink-600" />}
                            count={<>{formatValue(dashboard?.total_overall_inventory_capital)}</>}
                        />
                    </div>
                </div>
                <div>
                    <div className="p-1 mb-2  text-2xl font-black">Expenses Section</div>
                    <div className="flex gap-6 mb-3">
                        <DashboardCardSections
                            title="Current Expenses"
                            icon={<CurrencyDollarIcon className="h-14 text-pink-600" />}
                            count={<>{formatValue(dashboard?.current_expenses)}</>}
                        />
                        {/* <DashboardCardSections
                            title="No. Of Out of Stock Product"
                            icon={<ComputerDesktopIcon className="h-14 text-pink-600" />}
                            count={<>{formatValue(dashboard?.out_of_stock, false)}</>}
                        />
                        <DashboardCardSections
                            title="Total Overall Inventory Retail Price"
                            icon={<ComputerDesktopIcon className="h-14 text-pink-600" />}
                            count={<>{formatValue(dashboard?.total_overall_inventory_retail_price)}</>}
                        /> */}
                        <DashboardCardSections
                            title="Total Expenses"
                            icon={<DocumentCurrencyDollarIcon className="h-14 text-pink-600" />}
                            count={<>{formatValue(dashboard?.total_expenses)}</>}
                        />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
