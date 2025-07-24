import { useEffect, useState } from "react";
import SidebarSection from "@/app/_sections/sidebar-section";
import TopbarSection from "@/app/_sections/topbar-section";
import {
    BanknotesIcon,
    CalculatorIcon,
    ChartPieIcon,
    CurrencyDollarIcon,
    HomeIcon,
    InboxStackIcon,
    PresentationChartBarIcon,
    ShoppingBagIcon,
    ShoppingCartIcon,
    TruckIcon,
    UserGroupIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";
import { FaBook } from "react-icons/fa6";
import store from "@/app/store/store";
import { get_over_due_thunk } from "@/app/redux/cart-thunk";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPesetaSign, faPesoSign } from "@fortawesome/free-solid-svg-icons";

export default function AdminLayout({ children }) {
    const { collapsed } = useSelector((store) => store.app)
    const { user } = useSelector((store) => store.app);
    useEffect(() => {
        store.dispatch(get_over_due_thunk());
    }, []);
    console.log("User Data:", user);
    const PesoIcon = (props) => <FontAwesomeIcon icon={faPesetaSign} {...props} />;

    const path = window.location.pathname.split("/")[2];
    const navigation = [
        ...(user?.user_type === "Admin"
            ? [{
                name: "Dashboard",
                href: "/administrator/dashboard",
                icon: HomeIcon,
                current: path === "dashboard",
            }]
            : []),
        ...(user?.user_type === "Admin" || user?.user_type === "Cashier" || user?.user_type === "Encoder" || user?.user_type === "Shopee"
            ? [{
                name: "POS",
                href: "/administrator/pos",
                icon: CalculatorIcon,
                current: path == "pos",
            }]
            : []),
        ...(user?.user_type === "Admin" || user?.user_type === "Inventory" || user?.user_type === "Encoder"
            ? [{
                name: "Products",
                href: "/administrator/products",
                icon: ShoppingBagIcon,
                current: path == "products",
            }]
            : []),
        ...(user?.user_type === "Admin" || user?.user_type === "Inventory"
            ? [{
                name: "Stocks",
                href: "/administrator/stocks",
                icon: InboxStackIcon,
                current: path == "stocks",
            }]
            : []),
        ...(user?.user_type === "Admin" || user?.user_type === "Shopee"
            ? [{
                name: "Shopee",
                href: "/administrator/shopee",
                icon: ShoppingCartIcon,
                current: path == "shopee",
            }]
            : []),
        ...(user?.user_type === "Admin" || user?.user_type === "Cashier"
            ? [{
                name: "Credits",
                href: "/administrator/credits",
                icon: BanknotesIcon,
                current: path == "credits",
            }]
            : []),
        ...(user?.user_type === "Admin"
            ? [{
                name: "Expenses",
                href: "/administrator/expenses",
                icon: PesoIcon,
                current: path == "expenses",
            }]
            : []),
        ...(user?.user_type === "Admin" || user?.user_type === "Cashier"
            ? [{
                name: "Sales",
                href: "/administrator/sales",
                icon: PresentationChartBarIcon,
                current: path == "sales",
            }]
            : []),
        ...(user?.user_type === "Admin"
            ? [{
                name: "Report",
                href: "/administrator/reports",
                icon: ChartPieIcon,
                current: path == "reports",
            }]
            : []),
        ...(user?.user_type === "Admin"
            ? [{
                name: "Supplier",
                href: "/administrator/supplier",
                icon: TruckIcon,
                current: path == "supplier",
            }]
            : []),
        ...(user?.user_type === "Admin"
            ? [{
                name: "Customer",
                href: "/administrator/customer",
                icon: UserGroupIcon,
                current: path == "customer",
            }]
            : []),
        ...(user?.user_type === "Admin"
            ? [{
                name: "User Management",
                href: "/administrator/users",
                icon: UsersIcon,
                current: path == "users",
            }]
            : []),
    ];

    const userNavigation = [
        { name: "Your profile", href: "#" },
        { name: "Sign out", href: "#" },
    ];

    return (
        <div className="flex">
            {/* Sidebar */}
            <SidebarSection
                navigation={navigation}
                collapsed={collapsed}
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
