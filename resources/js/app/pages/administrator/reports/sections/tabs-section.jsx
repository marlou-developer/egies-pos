import { get_dashboard_thunk } from "@/app/redux/app-thunk";
import store from "@/app/store/store";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export default function TabsSection() {
    const [active, setActive] = useState("Daily");
    const tabs = [
        { name: "Daily", href: "#", current: active == "Daily" },
        { name: "Weekly", href: "#", current: active == "Weekly" },
        { name: "Monthly", href: "#", current: active == "Monthly" },
        { name: "Quarterly", href: "#", current: active == "Quarterly" },
        { name: "Annually", href: "#", current: active == "Annually" },
    ];

    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }

    function change_date(value) {
        setActive(value);
        store.dispatch(get_dashboard_thunk(value));
    }

    return (
        <div>
            <div className="grid grid-cols-1 sm:hidden">
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                    defaultValue={tabs.find((tab) => tab.current).name}
                    aria-label="Select a tab"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                >
                    {tabs.map((tab) => (
                        <option key={tab.name}>{tab.name}</option>
                    ))}
                </select>
                <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
                />
            </div>
            <div className="hidden sm:block">
                <nav
                    aria-label="Tabs"
                    className="flex space-x-4 border p-2 rounded-md border-pink-600"
                >
                    {tabs.map((tab) => (
                        <button
                            onClick={(e) => change_date(tab.name)}
                            key={tab.name}
                            href={tab.href}
                            aria-current={tab.current ? "page" : undefined}
                            className={classNames(
                                tab.current
                                    ? "bg-pink-600 text-white"
                                    : "text-gray-800 hover:text-gray-900",
                                "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                        >
                            {tab.name}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
}
