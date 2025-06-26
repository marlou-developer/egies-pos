import Button from "@/app/_components/button";
import Input from "@/app/_components/input";
import Modal from "@/app/_components/modal";
import { create_cart_thunk } from "@/app/redux/cart-thunk";
import { get_category_thunk } from "@/app/redux/category-thunk";
import { search_customer_thunk } from "@/app/redux/customer-thunk";
import { setCarts } from "@/app/redux/product-slice";
import store from "@/app/store/store";
import {
    BanknotesIcon,
    CheckIcon,
    CreditCardIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import {
    render,
    Printer,
    Text,
    Row,
    Line,
    Br,
    Cut,
} from "react-thermal-printer";
import Swal from "sweetalert2";
import PrintReceiptSection from "./print-receipt-section";

export default function PaySection({
    total_price,
    totalItemDiscount,
    subtotal,
    totalDiscount,
    discount_per_order,
    data,
    shop,
}) {
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [customer, setCustomer] = useState(null);
    const [isSearchLoading, setIsSearchLoading] = useState(false);
    const [shouldPrint, setShouldPrint] = useState(false);
    const [form, setForm] = useState({
        customer_amount: null,
        change: 0,
        payment_type: null,
    });
    const [productId, setProductId] = useState(null);
    const dispatch = useDispatch();
    const [id, setId] = useState(0);
    const discounts = form?.customer?.discounts ?? [];

    const discountMap = discounts.reduce((acc, curr) => {
        acc[curr.product_id] = curr;
        return acc;
    }, {});

    const filtered = data.map((item) => {
        const customer_discount = discountMap[item.id];
        return customer_discount ? { ...item, ...customer_discount } : item;
    });

    const list_of_available_discount = filtered
        .map((res) => (res.customer_discount ? res : null)) // return null instead of undefined
        .filter((item) => item !== null); // remove nulls

    const customer_total_discount = list_of_available_discount.reduce(
        (sum, item) => sum + Number(item.customer_discount) * Number(item.pcs),
        0
    );
    const overall_total = total_price - customer_total_discount;

    useEffect(() => {
        if (form.is_credit) {
            setForm({
                ...form,
                customer_amount: overall_total,
                change: 0,
            });
        }
    }, [form.is_credit]);

    function reset_data(params) {
        setLoading(false);
        setIsOpen(false);
        setForm({
            customer_amount: null,
            change: 0,
            payment_type: null,
        });
        setCustomer(null);
    }
    useEffect(() => {
        if (!isOpen) {
            reset_data();
        }
    }, [isOpen]);

    const form_data = {
        customer_amount: form.customer_amount,
        change: form.change,
        payment_type: !form.is_credit ? form.payment_type : null,
        cart_items: filtered,
        total_price: overall_total,
        customer_total_discount: customer_total_discount ?? 0,
        discount_per_order: discount_per_order,
        total_item_discount: totalItemDiscount,
        sub_total: subtotal,
        total_discount: totalDiscount + (customer_total_discount ?? 0),
        is_credit: `${form?.is_credit}` ?? null,
        due_date: form?.due_date ?? null,
        customer_id: form?.customer?.id ?? null,
        shop: shop,
        order_id: form.order_id ?? null,
        customer_name: form.customer_name ?? null,
    };
    async function submit_payment(params) {
        try {
            setLoading(true);
            const results = await store.dispatch(create_cart_thunk(form_data));
            setProductId(results?.data?.cart_id ?? "");
            await store.dispatch(get_category_thunk());
            setId(results?.data?.id);
            Swal.fire({
                title: "Print Receipt?",
                text: "",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Print",
            }).then((result) => {
                if (result.isConfirmed) {
                    if (result.isConfirmed) {
                        setShouldPrint(true);
                        setLoading(false);
                    }
                    Swal.fire({
                        icon: "success",
                        title: "Your cart has been saved",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } else {
                    dispatch(setCarts([]));
                    reset_data();
                    setLoading(false);
                }
            });
        } catch (error) {
            await Swal.fire({
                icon: "error",
                title: "Payment Unsuccessful",
                showConfirmButton: false,
                timer: 1500,
            });
            setLoading(false);
        }
    }
    async function search_customer(e) {
        setIsSearchLoading(true);
        const search = await store.dispatch(
            search_customer_thunk(e.target.value)
        );
        setCustomer(search.data);
        setIsSearchLoading(false);
    }
    function isFunctionDisable() {
        if (shop == "Store") {
            if (form.is_customer && form.change >= 0 && form.payment_type) {
                if (form.customer && form.is_credit && form.change >= 0) {
                    if (form.due_date) {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    if (form.customer && form.change >= 0) {
                        return false;
                    } else {
                        return true;
                    }
                }
            } else {
                if (form.change >= 0 && form.payment_type) {
                    return false;
                } else {
                    if (form.is_credit && form.due_date) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        } else {
            if (form.customer_name && form.order_id) {
                return false;
            } else {
                return true;
            }
        }
    }

    console.log("list_of_available_discount", list_of_available_discount);
    return (
        <>
            <Button
                disabled={data.length == 0}
                onClick={() => setIsOpen(true)}
                className="w-full bg-pink-500 hover:bg-pink-600"
            >
                Add Product Sales
            </Button>
            {shouldPrint && (
                <PrintReceiptSection
                    id={id}
                    productId={productId}
                    reset1={() => dispatch(setCarts([]))}
                    reset2={() => reset_data()}
                    data={form_data}
                    onPrinted={() => setShouldPrint(false)}
                />
            )}

            <Modal
                onClose={() => setIsOpen(false)}
                isOpen={isOpen}
                title="Add Product Sales"
            >
                <div>
                    <div>
                        Are you sure to add this product(s) to sales?
                    </div>
                    <div className="flex items-center justify-end gap-4 mt-4">
                        <button onClick={() => setIsOpen(false)} className="text-sm hover:text-gray-700 text-gray-500">
                            Cancel
                        </button>
                        <button className="text-sm bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
                            Submit
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
