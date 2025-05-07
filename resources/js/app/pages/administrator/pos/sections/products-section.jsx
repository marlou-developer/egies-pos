import React, { useEffect, useState } from "react";
import ProductComponent from "../components/product-component";
import { useSelector } from "react-redux";

export default function ProductsSection() {
    const { categories } = useSelector((store) => store.categories); // ⬅️ This must come before using `categories`
    const [activeCategory, setActiveCategory] = useState("");

    const activeProducts = categories.find((category) => category.name === activeCategory)?.products;

    useEffect(() => {
        if (categories.length > 0) {
            setActiveCategory(categories[0].name);
        }
    }, [categories]);

    return (
        <div className="w-full lg:w-3/5 min-h-screen shadow-lg">
            <div className="flex flex-row justify-between items-center px-5 mt-5">
                <div className="text-gray-800">
                    <div className="font-bold text-xl">
                        Synergy's Beauty Products
                    </div>
                </div>
            </div>

            {/* TABS */}
            <div className="mt-5 px-5 max-h-36 overflow-y-auto mb-2">
                <div className="gap-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4">
                    {categories
                        .slice()
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((category) => (
                            <span
                                key={category.name}
                                onClick={() => setActiveCategory(category.name)}
                                className={`cursor-pointer flex flex-1 w-full bg-pink-300 justify-center px-5 py-2 rounded-lg text-sm mr-4 mb-2 
                                ${activeCategory === category.name
                                        ? "bg-pink-400 text-white"
                                        : "font-semibold text-gray-700 hover:bg-pink-200"
                                    }`}
                            >
                                {category.name}
                            </span>
                        ))}
                </div>
            </div>

            <hr />

            {/* PRODUCT GRID */}
            <div className="px-5 mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {activeProducts && activeProducts.length > 0 ? (
                    activeProducts.map((product, index) => (
                        <ProductComponent key={index} product={product} />
                    ))
                ) : (
                    <div className="text-center text-gray-500 mt-4 col-span-full">
                        No product available
                    </div>
                )}
            </div>
        </div>
    );
}
