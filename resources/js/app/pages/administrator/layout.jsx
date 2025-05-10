import { useState } from "react";
import SidebarSection from "@/app/_sections/sidebar-section";
import TopbarSection from "@/app/_sections/topbar-section";
import { BookOpenIcon, CalculatorIcon, ChartPieIcon, HomeIcon, PresentationChartBarIcon, ShoppingBagIcon, ShoppingCartIcon, UsersIcon } from "@heroicons/react/24/outline";
import { FaBook } from "react-icons/fa6";

const navigation = [
    { name: "Dashboard", href: "/administrator/dashboard", icon: HomeIcon, current: false },
    { name: "POS", href: "/administrator/pos", icon: CalculatorIcon, current: false },
    { name: "Customer Section", href: "/administrator/customer", icon: UsersIcon, current: false },
    { name: "Products Section", href: "/administrator/products", icon: ShoppingBagIcon, current: false },
    { name: "Shopee Section", href: "/administrator/shopee", icon: ShoppingCartIcon, current: false },
    {
        name: "Sales Section",
        href: "/administrator/sales",
        icon: PresentationChartBarIcon,
        current: false,
    },
    { name: "Credits Section", href: "/administrator/credits", icon: BookOpenIcon, current: false },
    { name: "Report Section", href: "/administrator/reports", icon: ChartPieIcon, current: false },
    { name: "User Management", href: "/administrator/users", icon: UsersIcon, current: false },
];

const userNavigation = [
    { name: "Your profile", href: "#" },
    { name: "Sign out", href: "#" },
];

export default function AdminLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false); // manage collapsed state here

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

                <main className="py-4 w-full">
                    <div className="mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
                </main>
            </div>
        </div>
    );
}
