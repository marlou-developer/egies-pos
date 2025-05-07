import { setCarts } from "@/app/redux/product-slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProductComponent({ product }) {
    const dispatch = useDispatch();
    const { carts } = useSelector((store) => store.products);

    function add_to_cart(value) {
        const result = carts.find((res) => res.id == value.id);

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
        }
    }

    useEffect(() => {
        if (carts) {
            dispatch(
                setCarts(
                    carts.map((res) => ({
                        ...res,
                        sub_price: res.srp,
                    }))
                )
            );
        }
    }, [carts.length]);
    return (
        <button
            onClick={() => add_to_cart(product)}
            class="px-3 py-3 flex flex-col border border-gray-200 rounded-md h-32 justify-between"
        >
            <div>
                <div class="font-bold flex text-gray-800">{product.name}</div>
                <span class="font-light text-sm text-gray-400">
                    {product.description}
                </span>
            </div>
            <div class="flex flex-row justify-between items-end ">

                <span class="text-lg text-pink-500">
                    <span className="text-gray-800 text-sm">
                        SRP:&nbsp;
                    </span>
                    ₱
                    {parseFloat(
                        product.srp
                    ).toLocaleString("en-PH", {
                        minimumFractionDigits: 2,
                    })}
                </span>
                <img
                    src={product?.uploads[0]?.file}
                    className="h-20 w-24 object-cover rounded-md"
                    alt=""
                />
            </div>
        </button>
    );
}
