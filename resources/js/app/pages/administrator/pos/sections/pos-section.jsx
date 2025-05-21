import React, { useRef, useState } from "react";
import ProductsSection from "./products-section";
import { useDispatch, useSelector } from "react-redux";
import { setCarts } from "@/app/redux/product-slice";
import PrintReceiptSection from "./print-receipt-section";
import CreditPurchaseSection from "./credit-purchase-section";
import { UserIcon } from "@heroicons/react/24/outline";

export default function PosSection() {
    const { carts } = useSelector((store) => store.products);
    const dispatch = useDispatch();
    const [overallDiscount, setOverallDiscount] = useState(null);
    const [store, setStore] = useState("Store");

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
                ? {
                      ...item,
                      sub_price: result[value],
                      type_item_discount: value,
                  }
                : item
        );
        dispatch(setCarts(updated));
    }

    const updateDiscount = (value, discountValue) => {
        const updated = carts.map((item) =>
            item.id === value.id
                ? { ...item, discount: parseFloat(discountValue) || 0 }
                : item
        );
        dispatch(setCarts(updated));
    };

    const subtotal = carts.reduce(
        (sum, product) =>
            sum + parseFloat(product.sub_price) * parseInt(product.pcs),
        0
    );

    const totalItemDiscount = carts.reduce(
        (sum, product) => sum + (parseFloat(product.discount) || 0),
        0
    );

    const totalDiscount = totalItemDiscount + parseFloat(overallDiscount || 0);

    const total_price =
        carts.reduce(
            (sum, product) =>
                sum +
                (parseFloat(product.sub_price) * parseInt(product.pcs) -
                    (parseFloat(product.discount) || 0)),
            0
        ) - parseFloat(overallDiscount || 0);

    return (
        <div class="w-full ">
            <div class="flex lg:flex-row flex-col-reverse">
                <div className="w-3/5 border-r border-pink-500">
                    <ProductsSection storeName={store} />
                </div>
                <div class="w-full lg:w-2/5">
                    <div className="px-5 flex w-full gap-3">
                        {/* <div className="w-full">
                            <button className="flex border bg-pink-500 hover:bg-pink-400 text-white border-gray-500 rounded-md p-2 w-full items-center justify-center">
                                <UserIcon className="h-5" />
                                Select Customer
                            </button>
                        </div> */}
                        <div className="w-full">
                            <select
                                value={store}
                                onChange={(e) => setStore(e.target.value)}
                                className="w-full rounded-md"
                                name=""
                            >
                                <option value="Store">Store</option>
                                <option value="Shopee">Shopee</option>
                            </select>
                        </div>
                    </div>
                    <div class="flex flex-row items-center justify-between px-5 mt-5">
                        <div class="font-bold text-xl">Current Order</div>
                        {/* <div class="font-semibold">
                            <span class="px-4 py-2 rounded-md bg-red-100 text-red-500">Clear All</span>
                            <span class="px-4 py-2 rounded-md bg-gray-100 text-gray-800">Setting</span>
                        </div> */}
                    </div>
                    <div class="px-5 py-4 overflow-y-auto h-96">
                        {carts.map((res) => {
                            return (
                                <div class="flex flex-row gap-3 border-pink-300 border  p-2 rounded-lg shadow-md justify-between items-center mb-4">
                                    <div class="flex flex-1 flex-col gap-3 items-start  justify-between w-2/5">
                                        <div className="flex text-center w-full gap-3">
                                            <img
                                                src={res?.uploads[0]?.file}
                                                class="w-10 h-10 object-cover rounded-md"
                                                alt=""
                                            />
                                            <span class="font-semibold text-sm">
                                                {res?.name}
                                            </span>
                                        </div>
                                        <div className="font-bold">
                                            ₱{" "}
                                            {parseFloat(
                                                res.sub_price
                                            ).toLocaleString("en-PH", {
                                                minimumFractionDigits: 2,
                                            })}
                                        </div>
                                    </div>

                                    <div class="flex-1 flex flex-col gap-3 justify-between">
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
                                                {store != "Store" && (
                                                    <option
                                                        value="shopee"
                                                        selected
                                                    >
                                                        Shopee Price
                                                    </option>
                                                )}
                                                {store == "Store" && (
                                                    <>
                                                        <option
                                                            value="srp"
                                                            selected
                                                        >
                                                            SRP Price
                                                        </option>
                                                        <option value="reseller">
                                                            Reseller Price
                                                        </option>
                                                        <option value="city_distributor">
                                                            City Distributor
                                                            Price
                                                        </option>
                                                        <option value="district_distributor">
                                                            District Distributor
                                                            Price
                                                        </option>
                                                        <option value="provincial_distributor">
                                                            Provincial
                                                            Distributor Price
                                                        </option>
                                                    </>
                                                )}
                                            </select>
                                        </span>
                                    </div>
                                    <div class="font-semibold text-xl flex-1  flex flex-col gap-3  text-left">
                                        <div className="flex-1">
                                            ₱
                                            {parseFloat(
                                                Number(res.sub_price) *
                                                    Number(res.pcs ?? "1") -
                                                    Number(res.discount ?? "0")
                                            ).toFixed(2)}
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                placeholder="Discount"
                                                type="number"
                                                value={res.discount || ""}
                                                onChange={(e) =>
                                                    updateDiscount(
                                                        res,
                                                        e.target.value
                                                    )
                                                }
                                                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1 pl-3 pr-1 text-base text-gray-900 outline-none focus:ring-pink-300 focus:border-pink-300 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div class="px-5 mt-5">
                        <div class="rounded-md shadow-lg">
                            <div className="px-4 mb-4">
                                {/* <label htmlFor="">Discount:</label> */}
                                <input
                                    placeholder="Overall Product Discount"
                                    type="number"
                                    value={overallDiscount}
                                    onChange={(e) =>
                                        setOverallDiscount(
                                            e.target.value == ""
                                                ? 0
                                                : e.target.value
                                        )
                                    }
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1 pl-3 pr-1 text-base text-gray-900 outline-none focus:ring-pink-300 focus:border-pink-300 sm:text-sm/6"
                                />
                            </div>
                            <div class=" px-4 flex justify-between ">
                                <span class="font-semibold text-sm">
                                    Subtotal
                                </span>
                                <span class="font-bold">
                                    ₱{subtotal.toFixed(2)}
                                </span>
                            </div>

                            <div class=" px-4 flex justify-between ">
                                <span class="font-semibold text-sm">
                                    Discount Per Item
                                </span>
                                <span class="font-bold">
                                    ₱{totalItemDiscount?.toFixed(2)}
                                </span>
                            </div>

                            <div class=" px-4 flex justify-between ">
                                <span class="font-semibold text-sm">
                                    Discount Per Order
                                </span>
                                <span class="font-bold">
                                    ₱
                                    {isNaN(parseFloat(overallDiscount))
                                        ? "0.00"
                                        : parseFloat(overallDiscount).toFixed(
                                              2
                                          )}
                                </span>
                            </div>

                            <div class=" px-4 flex justify-between ">
                                <span class="font-semibold text-sm">
                                    Total Discount
                                </span>
                                <span class="font-bold">
                                    ₱{totalDiscount?.toFixed(2)}
                                </span>
                            </div>
                            {/* <div class=" px-4 flex justify-between ">
                                <span class="font-semibold text-sm">
                                    Sales Tax
                                </span>
                                <span class="font-bold">₱2.25</span>
                            </div> */}
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

                    <div class="px-5 mt-5">
                        <PrintReceiptSection
                            data={carts}
                            subtotal={subtotal}
                            totalItemDiscount={totalItemDiscount}
                            totalDiscount={totalDiscount}
                            total_price={total_price}
                            setOverallDiscount={setOverallDiscount}
                            discount_per_order={
                                isNaN(parseFloat(overallDiscount))
                                    ? "0"
                                    : overallDiscount
                            }
                        />
                    </div>
                    {/* <div class="px-5 mt-5">
                        <CreditPurchaseSection />
                    </div> */}
                </div>
            </div>
        </div>
    );
}
