import React, { useState } from "react";
import Button from "@/app/_components/button";
import Input from "@/app/_components/input";
import {
    ComputerDesktopIcon,
    H1Icon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";
import TextArea from "@/app/_components/textarea";
import Radio from "@/app/_components/radio";
import Modal from "@/Components/Modal";
import AdminLayout from "../layout";
import DashboardCardSections from "./sections/dashboard-card-sections";
import { useSelector } from "react-redux";

export default function Page() {
    const { over_dues } = useSelector((store) => store.carts);
    const [open, setOpen] = useState(false);
    console.log('over_duesssss',over_dues.dashboard)
    return (
        <AdminLayout>
            <div className="p-1 text-2xl font-black">Sales Section</div>
            <div className="flex gap-6 mb-3">
                <DashboardCardSections
                    title="Current Sales"
                    icon={
                        <ComputerDesktopIcon className="h-14 text-pink-600" />
                    }
                    count={<>₱ {Number(over_dues?.dashboard?.current_sales).toFixed(2)}</>}
                />
                <DashboardCardSections
                    title="Current Profit"
                    icon={
                        <ComputerDesktopIcon className="h-14 text-pink-600" />
                    }
                    count={<>₱ {Number(over_dues?.dashboard?.current_profit).toFixed(2)}</>}
                />
                <DashboardCardSections
                    title="Total Sales"
                    icon={
                        <ComputerDesktopIcon className="h-14 text-pink-600" />
                    }
                    count={<>₱ {Number(over_dues?.dashboard?.total_sales).toFixed(2)}</>}
                />
                <DashboardCardSections
                    title="Total Profit"
                    icon={
                        <ComputerDesktopIcon className="h-14 text-pink-600" />
                    }
                    count={<>₱ {Number(over_dues?.dashboard?.total_profit).toFixed(2)}</>}
                />
            </div>
            <div className="p-1 text-2xl font-black">Credit Section</div>
            <div className="flex gap-6 mb-3">
                <DashboardCardSections
                    title="Current Credits"
                    icon={
                        <ComputerDesktopIcon className="h-14 text-pink-600" />
                    }
                    
                    count={<>₱ {Number(over_dues?.dashboard?.current_credit).toFixed(2)}</>}
                />
                <DashboardCardSections
                    title="Total Amount Credits"
                    icon={
                        <ComputerDesktopIcon className="h-14 text-pink-600" />
                    }
                    count={<>₱ {Number(over_dues?.dashboard?.total_credit).toFixed(2)}</>}
                />
                <DashboardCardSections
                    title="No. of Due Date"
                    icon={
                        <ComputerDesktopIcon className="h-14 text-pink-600" />
                    }
                    count={<> {Number(over_dues?.dashboard?.due_date_today)}</>}
                />
                <DashboardCardSections
                    title="No. Of Over Due"
                    icon={
                        <ComputerDesktopIcon className="h-14 text-pink-600" />
                    }
                    count={<>{Number(over_dues?.dashboard?.over_due)}</>}
                />
            </div>
            <div className="p-1 text-2xl font-black">Stocks Section</div>
            <div className="flex gap-6 mb-3">
                <DashboardCardSections
                    title="No. Of Low Stock Product"
                    icon={
                        <ComputerDesktopIcon className="h-14 text-pink-600" />
                    }
                    count={<>{Number(over_dues?.dashboard?.low_stock)}</>}
                />
                <DashboardCardSections
                    title="No. Of Out of Stock Product"
                    icon={
                        <ComputerDesktopIcon className="h-14 text-pink-600" />
                    }
                    count={<>{Number(over_dues?.dashboard?.out_of_stock)}</>}
                />
                {/* <DashboardCardSections
                    title="Total Stocks in Capital"
                    icon={
                        <ComputerDesktopIcon className="h-14 text-pink-600" />
                    }
                />
                <DashboardCardSections
                    title="Total Stocks in Profit"
                    icon={
                        <ComputerDesktopIcon className="h-14 text-pink-600" />
                    }
                /> */}
            </div>
        </AdminLayout>
    );
}
