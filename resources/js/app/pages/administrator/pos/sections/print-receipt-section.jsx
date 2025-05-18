import Button from "@/app/_components/button";
import Input from "@/app/_components/input";
import Modal from "@/app/_components/modal";
import { create_cart_thunk } from "@/app/redux/cart-thunk";
import { search_customer_thunk } from "@/app/redux/customer-thunk";
import { setCarts } from "@/app/redux/product-slice";
import store from "@/app/store/store";
import {
    BanknotesIcon,
    CheckIcon,
    CreditCardIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
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

export default function PrintReceiptSection({
    total_price,
    totalItemDiscount,
    subtotal,
    totalDiscount,
    discount_per_order,
    data,
    setOverallDiscount,
}) {
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [customer, setCustomer] = useState(null);
    const [isSearchLoading, setIsSearchLoading] = useState(false);
    const [form, setForm] = useState({
        customer_amount: null,
        change: 0,
        payment_type: null,
    });
    const dispatch = useDispatch();
    const discounts = form?.customer?.discount ?? [];

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
        (sum, item) => sum + Number(item.customer_discount),
        0
    );
    const overall_total = total_price - customer_total_discount;


    
    useEffect(()=>{
        if(form.is_credit){
            setForm({
                ...form,
                customer_amount:overall_total,
                change:0
            })
        }
    },[form.is_credit])
    
    const handlePrint = async () => {
        try {
            const data = await render(
                <Printer type="epson" width={42} characterSet="korea">
                    <Text size={{ width: 2, height: 2 }}>9,500원</Text>
                    <Text bold={true}>결제 완료</Text>
                    <Br />
                    <Line />
                    <Row left="결제방법" right="체크카드" />
                    <Row left="카드번호" right="123456**********" />
                    <Row left="할부기간" right="일시불" />
                    <Row left="결제금액" right="9,500" />
                    <Row left="부가세액" right="863" />
                    <Row left="공급가액" right="8,637" />
                    <Line />
                    <Row left="맛있는 옥수수수염차 X 2" right="11,000" />
                    <Text>옵션1(500)/옵션2/메모</Text>
                    <Row left="(-) 할인" right="- 500" />
                    <Br />
                    <Line />
                    <Row left="합계" right="9,500" />
                    <Row left="(-) 할인 2%" right="- 1,000" />
                    <Line />
                    <Row left="대표" right="김대표" />
                    <Row left="사업자등록번호" right="000-00-00000" />
                    <Row left="대표번호" right="0000-0000" />
                    <Row left="주소" right="어디시 어디구 어디동 몇동몇호" />
                    <Line />
                    <Br />
                    <Text align="center">Wifi: some-wifi / PW: 123123</Text>
                    <Cut />
                </Printer>
            );

            // Ask user to select the serial port (printer must be connected)
            const port = await window.navigator.serial.requestPort();

            // Open the port with the appropriate baud rate (check your printer's manual)
            await port.open({ baudRate: 9600 });

            // Write the data to the printer
            const writer = port.writable?.getWriter();
            if (writer != null) {
                await writer.write(data);
                writer.releaseLock();
            }
        } catch (err) {
            console.error("Print failed:", err);
            alert("Printing failed. Check your printer connection.");
        }
    };

    console.log('filtered',filtered)
    function reset_data(params) {
        setOverallDiscount(0);
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

    async function submit_payment(params) {
        try {
            setLoading(true);
            await store.dispatch(
                create_cart_thunk({
                    customer_amount: form.customer_amount,
                    change: form.change,
                    payment_type: form.payment_type,
                    cart_items: filtered,
                    total_price: overall_total,
                    customer_total_discount: customer_total_discount ?? 0,
                    discount_per_order: discount_per_order,
                    total_item_discount: totalItemDiscount,
                    sub_total: subtotal,
                    total_discount:
                        totalDiscount + (customer_total_discount ?? 0),
                    is_credit: `${form?.is_credit}` ?? null,
                    due_date: form?.due_date ?? null,
                    customer_id: form?.customer?.id ?? null,
                })
            );
            await Swal.fire({
                icon: "success",
                title: "Your cart has been paid",
                showConfirmButton: false,
                timer: 1500,
            });
            dispatch(setCarts([]));
            reset_data();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Payment Unsuccessful",
                showConfirmButton: false,
                timer: 1500,
            });
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
                return true;
            }
        }
    }
    return (
        <>
            <Button
                disabled={data.length == 0}
                onClick={() => setIsOpen(true)}
                className="w-full bg-pink-500 hover:bg-pink-600"
            >
                PAY
            </Button>

            <Modal
                onClose={() => setIsOpen(false)}
                isOpen={isOpen}
                title="PAYMENT METHOD"
            >
                <div className="flex flex-col gap-3">
                    {list_of_available_discount &&
                        list_of_available_discount?.length != 0 && (
                            <div className="p-4 bg-white border border-pink-500 rounded-md">
                                <div className="font-black">
                                    List of Item Discount
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    {list_of_available_discount?.map(
                                        (res, i) => {
                                            return (
                                                <div
                                                    className="flex items-center justify-between"
                                                    key={i}
                                                >
                                                    <div>{res.name}</div>
                                                    <div>
                                                        Discounted:₱{" "}
                                                        {Number(
                                                            res.customer_discount
                                                        ).toFixed(2)}
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        )}

                    <div className="flex flex-row gap-10 ">
                        <div class="flex-1 ">
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
                                    Customer Total Discount
                                </span>
                                <span class="font-bold">
                                    ₱{customer_total_discount?.toFixed(2)}
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
                                    {isNaN(parseFloat(discount_per_order))
                                        ? "0.00"
                                        : parseFloat(
                                              discount_per_order
                                          ).toFixed(2)}
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

                            <div class="border-t-2 py-2 px-4 flex items-center justify-between">
                                <span class="font-semibold text-2xl">
                                    Total
                                </span>
                                <span class="font-bold text-2xl">
                                    ₱{overall_total.toFixed(2)}
                                </span>
                            </div>
                            <div class="border-t-2 py-2 px-4 flex items-center justify-between">
                                <span class="font-semibold text-2xl">
                                    Change
                                </span>
                                <span class="font-bold text-2xl">
                                    ₱{form.change.toFixed(2)}
                                </span>
                            </div>
                        </div>
                        <div className="border-pink-600 border-r border-2"></div>
                        {/* sss */}
                        <div className="flex-1 flex flex-col gap-3">
                            <div className="flex gap-3">
                                <input
                                    id="is_customer"
                                    name="is_customer"
                                    type="checkbox"
                                    checked={form.is_customer}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            customer: null,
                                            [e.target.name]: e.target.checked,
                                        })
                                    }
                                    className="h-5 w-5 rounded border-pink-500 text-pink-600 focus:ring-pink-500 checked:bg-pink-600 checked:hover:bg-pink-600"
                                />
                                <span>Is Regular Customer?</span>
                            </div>

                            {form.is_customer && (
                                <div className="flex gap-3">
                                    <input
                                        id="is_credit"
                                        name="is_credit"
                                        type="checkbox"
                                        checked={form.is_credit}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                due_date: null,
                                                [e.target.name]:
                                                    e.target.checked,
                                            })
                                        }
                                        className="h-5 w-5 rounded border-pink-500 text-pink-600 focus:ring-pink-500 checked:bg-pink-600 checked:hover:bg-pink-600"
                                    />
                                    <span>Is Credit?</span>
                                </div>
                            )}

                            {form.is_customer && (
                                <Input
                                    onChange={(e) => search_customer(e)}
                                    name="customer"
                                    label="Search Customer"
                                />
                            )}
                            {!isSearchLoading && customer?.length == 0 && (
                                <div className="text-red-600">
                                    Customer not found!
                                </div>
                            )}
                            {isSearchLoading && customer?.length == 0 && (
                                <div className="text-gray-600">Loading...</div>
                            )}
                            {form?.is_customer && customer?.length != 0 && (
                                <table className="min-w-full divide-y divide-gray-300">
                                    <tbody className="divide-y divide-gray-200">
                                        {customer?.map((customer, i) => (
                                            <tr key={i}>
                                                <td className="capitalize pr-3 py-2 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                                                    {customer.name}
                                                </td>
                                                <td className="relative pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                                                    {form?.customer?.id ==
                                                        customer.id && (
                                                        <div className="flex items-end justify-end gap-6 w-full">
                                                            <button className="flex gap-1">
                                                                <CheckIcon className="h-4 w-4 text-green-500" />
                                                                <div className=" text-green-500">
                                                                    SELECTED
                                                                </div>{" "}
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    setForm({
                                                                        ...form,
                                                                        customer:
                                                                            null,
                                                                    })
                                                                }
                                                                className="text-pink-600 hover:text-pink-900"
                                                            >
                                                                REMOVE
                                                            </button>
                                                        </div>
                                                    )}

                                                    {form?.customer?.id !=
                                                        customer.id && (
                                                        <>
                                                            <button
                                                                onClick={() =>
                                                                    setForm({
                                                                        ...form,
                                                                        customer:
                                                                            customer,
                                                                    })
                                                                }
                                                                className="text-pink-600 hover:text-pink-900"
                                                            >
                                                                SELECT
                                                            </button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                            {form?.is_credit &&
                                form?.is_customer &&
                                customer?.length != 0 && (
                                    <Input
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                due_date: e.target.value,
                                            })
                                        }
                                        value={form.due_date}
                                        type="date"
                                        label="Due Date"
                                    />
                                )}

                            <Input
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        customer_amount: e.target.value,
                                        change:
                                            parseFloat(
                                                e.target.value == ""
                                                    ? 0
                                                    : e.target.value
                                            ) - overall_total,
                                    })
                                }
                                disabled={form.is_credit}
                                value={form?.customer_amount}
                                name="amount"
                                label="Amount"
                            />
                            <select
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        payment_type: e.target.value,
                                    })
                                }
                                className="rounded-md text-gray-500"
                                label="Mode of Payment"
                            >
                                <option disabled selected>
                                    Mode of Payment:
                                </option>
                                <option value="Cash">Cash</option>
                                <option value="E-Wallet">E-Wallet</option>
                                <option value="Bank Transfer">
                                    Bank Transfer
                                </option>
                                <option value="Credit/Debit Card">
                                    Credit/Debit Card
                                </option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-12">
                        {!form?.is_credit && (
                            <Button
                                disabled={isFunctionDisable()}
                                loading={loading}
                                onClick={submit_payment}
                                className="w-full bg-pink-500 hover:bg-pink-600"
                            >
                                <div className="flex gap-3">
                                    <BanknotesIcon className="h-6 w-6 text-white" />{" "}
                                    <div>PAY CASH</div>
                                </div>
                            </Button>
                        )}

                        {form?.is_credit && (
                            <Button
                                disabled={isFunctionDisable()}
                                loading={loading}
                                onClick={submit_payment}
                                className="w-full bg-blue-500 hover:bg-blue-600"
                            >
                                <div className="flex gap-3">
                                    <CreditCardIcon className="h-5 w-5" />
                                    <div>CREDIT</div>
                                </div>
                            </Button>
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
}
