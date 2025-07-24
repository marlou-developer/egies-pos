import { Link } from "@inertiajs/react";
import React from "react";

export default function DashboardCardSections({
    icon,
    title,
    href,
    link,
    count,
}) {
    return (
        <div class="flex flex-1">
            <div class="group relative overflow-hidden bg-white px-6 pt-10 pb-8 shadow-2xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:rounded-lg sm:px-10 w-full">
                <span class="absolute top-10  h-20 w-20 rounded-full bg-pink-300 transition-all duration-300 group-hover:scale-[10]"></span>
                <div class="relative  mx-auto w-full flex flex-col justify-between">
                    <span class="grid h-20 w-20 place-items-center rounded-full bg-pink-300 transition-all duration-300 group-hover:bg-pink-200">
                        {icon}
                    </span>
                    <div class="space-y-6 flex flex-col items-start justify-between pt-5 text-base leading-7 text-gray-800 transition-all duration-300 group-hover:text-white/90">
                        <p>{title}:</p>
                        <div className="text-xl sm:text-2xl md:text-3xl font-semibold whitespace-nowrap">{count ?? 0}</div>
                    </div>
                    <div class="pt-5 text-base font-semibold leading-7">
                        {/* <p>
                            <Link
                                href={link}
                                class="text-pink-300 transition-all duration-300 group-hover:text-white"
                            >
                                Visit {href}
                                &rarr;
                            </Link>
                        </p> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
