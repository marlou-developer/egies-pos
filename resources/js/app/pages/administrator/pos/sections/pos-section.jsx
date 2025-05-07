import React, { useRef } from "react";
import ProductsSection from "./products-section";
import { useDispatch, useSelector } from "react-redux";
import { setCarts } from "@/app/redux/product-slice";
import PrintReceiptSection from "./print-receipt-section";

export default function PosSection() {
    const { carts } = useSelector((store) => store.products);
    const dispatch = useDispatch();

    const total_price = carts.reduce(
        (sum, product) =>
            (sum + parseFloat(product.sub_price)) * parseInt(product.pcs),
        0
    );

    const addPCS = (value) => {
        const data = carts.map((item) =>
            item.id === value.id ? { ...item, pcs: item.pcs + 1 } : item
        );
        dispatch(setCarts(data));
    };
    console.log("sdfdadwad", carts);

    const subtractPCS = (value) => {
        const updated = carts
            .map((item) =>
                item.id === value.id ? { ...item, pcs: item.pcs - 1 } : item
            )
            .filter((item) => item.pcs > 0); // ⬅️ Remove items with 0 pcs

        dispatch(setCarts(updated));
    };

    function add_sub_price(result, value) {
        const updated = carts.map((item) =>
            item.id === result.id
                ? { ...item, sub_price: result[value], type_item_discount: value }
                : item
        );
        dispatch(setCarts(updated));
    }

    return (
        <div class="w-full ">
            <div class="flex lg:flex-row flex-col-reverse shadow-lg">
                <ProductsSection />
                <div class="w-full lg:w-2/5">
                    <div class="flex flex-row items-center justify-between px-5 mt-5">
                        <div class="font-bold text-xl">Current Order</div>
                        {/* <div class="font-semibold">
                            <span class="px-4 py-2 rounded-md bg-red-100 text-red-500">Clear All</span>
                            <span class="px-4 py-2 rounded-md bg-gray-100 text-gray-800">Setting</span>
                        </div> */}
                    </div>
                    <div class="px-5 py-4 overflow-y-auto h-72">
                        {carts.map((res) => {
                            return (
                                <div class="flex flex-row gap-3 border-pink-300 border  p-2 rounded-lg shadow-md justify-between items-center mb-4">
                                    <div class="flex flex-row gap-3 items-center w-2/5">
                                        <img
                                            src={res?.uploads[0]?.file}
                                            class="w-10 h-10 object-cover rounded-md"
                                            alt=""
                                        />
                                        <span class="font-semibold text-sm">
                                            {res?.name}
                                        </span>
                                    </div>

                                    <div class="w-[115px] flex flex-col gap-3 justify-between">
                                        <div className="flex w-full">
                                            <button
                                                onClick={() => subtractPCS(res)}
                                                class="px-3 py-1 rounded-md bg-gray-300 "
                                            >
                                                -
                                            </button>
                                            <span class="font-semibold mx-1">
                                                <input
                                                    id="pcs"
                                                    name="pcs"
                                                    type="text"
                                                    value={res?.pcs}
                                                    className="block text-center w-full rounded-md bg-white py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:ring-pink-300 focus:border-pink-300 sm:text-sm"
                                                />
                                            </span>
                                            <button
                                                onClick={() => addPCS(res)}
                                                class="px-3 py-1 rounded-md bg-gray-300 "
                                            >
                                                +
                                            </button>
                                        </div>

                                        <span class=" font-semibold text-sm">
                                            <select
                                                onChange={(e) =>
                                                    add_sub_price(
                                                        res,
                                                        e.target.value
                                                    )
                                                }
                                                id="pricing"
                                                name="pricing"
                                                autoComplete="pricing"
                                                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1 pl-3 pr-1 text-base text-gray-900 outline-none focus:ring-pink-300 focus:border-pink-300 sm:text-sm/6"
                                            >
                                                <option disabled selected>
                                                    Select Price
                                                </option>
                                                <option value="srp">
                                                    SRP Price
                                                </option>
                                                <option value="reseller">
                                                    Reseller Price
                                                </option>
                                                <option value="city_distributor">
                                                    City Distributor Price
                                                </option>
                                                <option value="district_distributor">
                                                    District Distributor Price
                                                </option>
                                                <option value="provincial_distributor">
                                                    Provincial Distributor Price
                                                </option>
                                            </select>
                                        </span>
                                    </div>
                                    <div class="font-semibold text-lg  text-left">
                                        ₱ {parseInt(res?.sub_price).toFixed(2)}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div class="px-5 mt-5">
                        <div class="py-4 rounded-md shadow-lg">
                            <div class=" px-4 flex justify-between ">
                                <span class="font-semibold text-sm">
                                    Subtotal
                                </span>
                                <span class="font-bold">₱35.25</span>
                            </div>
                            <div class=" px-4 flex justify-between ">
                                <span class="font-semibold text-sm">
                                    Discount
                                </span>
                                <span class="font-bold">- ₱5.00</span>
                            </div>
                            <div class=" px-4 flex justify-between ">
                                <span class="font-semibold text-sm">
                                    Sales Tax
                                </span>
                                <span class="font-bold">₱2.25</span>
                            </div>
                            <div class="border-t-2 mt-3 py-2 px-4 flex items-center justify-between">
                                <span class="font-semibold text-2xl">
                                    Total
                                </span>
                                <span class="font-bold text-2xl">
                                    ₱{total_price.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* <div class="px-5 mt-5">
                        <div class="rounded-md shadow-lg px-4 py-4">
                            <div class="flex flex-row justify-between items-center">
                                <div class="flex flex-col">
                                    <span class="uppercase text-xs font-semibold">
                                        cashless credit
                                    </span>
                                    <span class="text-xl font-bold text-pink-300">
                                        ₱32.50
                                    </span>
                                    <span class=" text-xs text-gray-400 ">
                                        Available
                                    </span>
                                </div>
                                <div class="px-4 py-3 bg-gray-300 text-gray-800 rounded-md font-bold">
                                    {" "}
                                    Cancel
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div class="px-5 mt-5">
                        <PrintReceiptSection />
                    </div>
                </div>
            </div>
        </div>
    );
}
