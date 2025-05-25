import { useEffect, useState } from "react";
import SidebarSection from "@/app/_sections/sidebar-section";
import TopbarSection from "@/app/_sections/topbar-section";
import {
    BanknotesIcon,
    BookOpenIcon,
    CalculatorIcon,
    ChartPieIcon,
    HomeIcon,
    InboxStackIcon,
    PresentationChartBarIcon,
    ShoppingBagIcon,
    ShoppingCartIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";
import { FaBook } from "react-icons/fa6";
import store from "@/app/store/store";
import { get_over_due_thunk } from "@/app/redux/cart-thunk";

const navigation = [
    {
        name: "Dashboard",
        href: "/administrator/dashboard",
        icon: HomeIcon,
        current: false,
    },
    {
        name: "POS",
        href: "/administrator/pos",
        icon: CalculatorIcon,
        current: false,
    },
    {
        name: "Customer Section",
        href: "/administrator/customer",
        icon: UsersIcon,
        current: false,
    },
    {
        name: "Products Section",
        href: "/administrator/products",
        icon: ShoppingBagIcon,
        current: false,
    },
    {
        name: "Stocks Section",
        href: "/administrator/stocks",
        icon: InboxStackIcon,
        current: false,
    },
    {
        name: "Shopee Section",
        href: "/administrator/shopee",
        icon: ShoppingCartIcon,
        current: false,
    },
    {
        name: "Credits Section",
        href: "/administrator/credits",
        icon: BanknotesIcon,
        current: false,
    },

    {
        name: "Sales Section",
        href: "/administrator/sales",
        icon: PresentationChartBarIcon,
        current: false,
    },
    {
        name: "Report Section",
        href: "/administrator/reports",
        icon: ChartPieIcon,
        current: false,
    },
    {
        name: "User Management",
        href: "/administrator/users",
        icon: UsersIcon,
        current: false,
    },
];

const userNavigation = [
    { name: "Your profile", href: "#" },
    { name: "Sign out", href: "#" },
];

export default function AdminLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false); // manage collapsed state here

    useEffect(() => {
        store.dispatch(get_over_due_thunk());
    }, []);
    return (
        <div className="flex">
            {/* Sidebar */}
            <SidebarSection
                navigation={navigation}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            {/* Content area */}
            <div
                className={`flex flex-col flex-1  transition-all duration-300 ease-in-out ${collapsed ? "lg:pl-20" : "lg:pl-72"
                    }`}
            >
                <TopbarSection userNavigation={userNavigation} />

                <main className="p-4 w-full">{children}</main>
            </div>
        </div>
    );
}
