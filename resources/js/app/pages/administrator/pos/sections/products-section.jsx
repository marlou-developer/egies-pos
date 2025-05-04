import React, { useEffect, useState } from "react";
import ProductComponent from "../components/product-component";
import { useSelector } from "react-redux";

export default function ProductsSection() {
    const [activeCategory, setActiveCategory] = useState("");

    const { categories } = useSelector((store) => store.categories);
    console.log("activeCategory", activeCategory);

    useEffect(()=>{
        setActiveCategory(categories[0]?.name)
    },[categories.length])
    return (
        <div className="w-full lg:w-3/5 min-h-screen shadow-lg">
            <div className="flex flex-row justify-between items-center px-5 mt-5">
                <div className="text-gray-800">
                    <div className="font-bold text-xl">
                        Synergy's Beauty Products
                    </div>
                    {/* <span className="text-xs">Location ID#SIMON123</span> */}
                </div>
            </div>

            {/* TABS */}
            <div className="mt-5 px-5 flex flex-wrap">
                {categories.map((category) => (
                    <span
                        key={category.name}
                        onClick={() => setActiveCategory(category.name)}
                        className={`cursor-pointer px-5 py-1 rounded-2xl text-sm mr-4 mb-2 
                            ${
                                activeCategory === category.name
                                    ? "bg-pink-300 text-white"
                                    : "font-semibold text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        {category.name}
                    </span>
                ))}
            </div>

            {/* PRODUCT GRID */}
            <div className="px-5 mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {categories
                    .find((category) => category.name === activeCategory)
                    ?.products?.map((product, index) => {
                        return (
                            <ProductComponent key={index} product={product} />
                        );
                    })}
            </div>
        </div>
    );
}
