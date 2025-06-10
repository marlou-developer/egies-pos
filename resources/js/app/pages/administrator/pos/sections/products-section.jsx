import React, { useEffect, useState } from "react";
import ProductComponent from "../components/product-component";
import { useSelector } from "react-redux";

export default function ProductsSection({ storeName }) {
    const { categories } = useSelector((store) => store.categories);
    const [activeCategory, setActiveCategory] = useState("");

    const activeProducts = categories.find(
        (category) => category.name === activeCategory
    )?.products;

    useEffect(() => {
        if (categories.length > 0) {
            setActiveCategory(categories[0].name);
        }
    }, [categories]);

    return (
        <div className="w-full flex-col">
            <div className="flex flex-row justify-between items-center px-5 mt-5">
                <div className="text-gray-800">
                    <div className="font-bold text-xl">
                        Egie's Beauty Products
                    </div>
                </div>
            </div>

            <div className="mt-5 lg:w-full px-3  overflow-auto mb-2 pb-4">
                <div className="flex overflow-auto  gap-1.5 space-x-2">
                    {categories
                        .slice()
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((category) => (
                            <div
                                key={category.name}
                                onClick={() => setActiveCategory(category.name)}
                                className={`cursor-pointer flex-shrink-0 bg-pink-400 justify-center px-5 py-2 rounded-lg text-sm mb-4 
                    ${activeCategory === category.name
                                        ? "bg-pink-600 text-white"
                                        : "font-semibold text-white hover:bg-pink-200 hover:text-gray-500"
                                    }`}
                            >
                                {category.name}
                            </div>
                        ))}
                </div>
            </div>

            <div className="px-5 mt-4 h-[62vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                    {activeProducts && activeProducts.length > 0 ? (
                        activeProducts.map((product, index) => (
                            <ProductComponent
                                storeName={storeName}
                                key={index}
                                product={product}
                            />
                        ))
                    ) : (
                        <div className="text-center text-gray-500 mt-4 col-span-full">
                            No product available
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
