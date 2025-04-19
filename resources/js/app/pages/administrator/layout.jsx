import {
    CalculatorIcon,
    CalendarIcon,
    ChartPieIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    PresentationChartBarIcon,
    ShoppingBagIcon,
    ShoppingCartIcon,
    UserGroupIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";
import SidebarSection from "@/app/_sections/sidebar-section";
import TopbarSection from "@/app/_sections/topbar-section";

const navigation = [
    { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
    { name: "POS", href: "#", icon: CalculatorIcon, current: false },
    { name: "Products Section", href: "#", icon: ShoppingBagIcon, current: false },
    // {
    //     name: "Team",
    //     href: "#",
    //     icon: UsersIcon,
    //     current: false,
    //     children: [
    //         { name: "Agent", href: "#", icon: HomeIcon, current: true },
    //         { name: "Register", href: "#", icon: HomeIcon, current: false },
    //     ],
    // },
    // {
    //     name: "Projects",
    //     href: "#",
    //     icon: FolderIcon,
    //     current: false,
    //     children: [
    //         { name: "Agent", href: "#", icon: HomeIcon, current: true },
    //         { name: "Register", href: "#", icon: HomeIcon, current: false },
    //     ],
    // },
    { name: "Shopee Section", href: "#", icon: ShoppingCartIcon, current: false },
    {
        name: "Sales Section",
        href: "#",
        icon: PresentationChartBarIcon,
        current: false,
    },
    { name: "Report Section", href: "#", icon: ChartPieIcon, current: false },
    { name: "User Management", href: "#", icon: UsersIcon, current: false },
];

const userNavigation = [
    { name: "Your profile", href: "#" },
    { name: "Sign out", href: "#" },
];

export default function Layout({ children }) {
    return (
        <>
            <div>
                <SidebarSection navigation={navigation} />
                <div className="lg:pl-72">
                    <TopbarSection userNavigation={userNavigation} />

                    <main className="py-4 w-full">
                        <div className="mx-auto px-4 sm:px-6 lg:px-8">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
