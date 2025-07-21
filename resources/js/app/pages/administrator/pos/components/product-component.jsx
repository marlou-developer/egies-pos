import { setCarts } from "@/app/redux/product-slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProductComponent({ product, storeName }) {
    const dispatch = useDispatch();
    const { carts } = useSelector((store) => store.products);

    function add_to_cart(value) {
        const result = carts.find((res) => res.id == value.id);
        console.log("result", value);
        if (!result) {
            dispatch(
                setCarts([
                    ...carts,
                    {
                        ...value,
                        sub_price: 0,
                        pcs: 1,
                    },
                ])
            );
        } else {
            const new_data = carts.map((item) => {
                if (item.id === value.id) {
                    if (item.quantity >= item.pcs + 1) {
                        return {
                            ...item,
                            pcs: item.pcs + 1,
                        };
                    } else {
                        alert("Insufficient Supply");
                        return item; // return item without changing pcs
                    }
                }
                return item;
            });
            dispatch(setCarts(new_data));
        }
    }

    useEffect(() => {
        if (carts) {
            dispatch(
                setCarts(
                    carts.map((res) => ({
                        ...res,
                        sub_price: storeName == "Store" ? res.srp : res.shopee,
                    }))
                )
            );
        }
    }, [carts.length, storeName]);
    return (
        <>
            <button
                onClick={() => add_to_cart(product)}
                className={`relative px-2 sm:px-3 py-2 sm:py-3 flex flex-col border rounded-md min-h-[6rem] sm:min-h-[8rem] justify-between shadow-lg transition bg-pink-100 border-pink-300 w-full
                    ${product.quantity == 0
                        ? "border-gray-300 cursor-not-allowed"
                        : "border-gray-200"
                    }`}
                disabled={product.quantity == 0}
            >
                {product.quantity == 0 && (
                    <div
                        className="absolute inset-0 z-10 flex items-center justify-center rounded-md"
                        style={{ backgroundColor: "rgba(204,204,204,0.6)" }}
                    >
                        <h1 className="text-red-600 font-bold text-xl">
                            Out of Stock
                        </h1>
                    </div>
                )}
                <div className="w-full">
                    <div className="font-bold flex text-gray-800 text-sm sm:text-base leading-tight">
                        {product.name}
                    </div>
                    <span className="font-light text-xs sm:text-sm text-gray-400 line-clamp-2">
                        {product.description}
                    </span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 sm:gap-0 w-full">
                    <div className="flex flex-col flex-1">
                        <span className="text-gray-800 text-xs sm:text-sm flex items-start">
                            SRP:&nbsp;
                            <span className="text-pink-500 font-semibold">
                                ₱
                                {parseFloat(product.srp).toLocaleString(
                                    "en-PH",
                                    {
                                        minimumFractionDigits: 2,
                                    }
                                )}
                            </span>
                        </span>
                        <div className="text-gray-800 text-xs sm:text-sm flex items-start">
                            Stock(s): {product.quantity}
                        </div>
                    </div>
                    <img
                        src={product?.uploads[0]?.file}
                        className="h-12 w-16 sm:h-16 sm:w-20 md:h-20 md:w-24 object-cover rounded-md flex-shrink-0"
                        alt=""
                    />
                </div>
            </button>
        </>
    );
}
