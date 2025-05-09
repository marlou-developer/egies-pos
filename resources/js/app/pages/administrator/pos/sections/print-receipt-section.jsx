import Button from "@/app/_components/button";
import Input from "@/app/_components/input";
import Modal from "@/app/_components/modal";
import { create_cart_thunk } from "@/app/redux/cart-thunk";
import { setCarts } from "@/app/redux/product-slice";
import store from "@/app/store/store";
import { useState } from "react";
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
    const [form, setForm] = useState({
        customer_amount: 0,
        change: 0,
    });
    const dispatch = useDispatch();
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

    async function submit_payment(params) {
        try {
            setLoading(true);
            await store.dispatch(
                create_cart_thunk({
                    customer_amount: form.customer_amount,
                    change: form.change,
                    cart_items: data,
                    total_price: total_price,
                    discount_per_order: discount_per_order,
                    total_item_discount: totalItemDiscount,
                    sub_total: subtotal,
                    total_discount: totalDiscount,
                })
            );
            await Swal.fire({
                icon: "success",
                title: "Your cart has been paid",
                showConfirmButton: false,
                timer: 1500,
            });
            dispatch(setCarts([]));
            setOverallDiscount(0);
            setLoading(false);
            setIsOpen(false);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Payment Unsuccessful",
                showConfirmButton: false,
                timer: 1500,
            });
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
                    <div class="py-4 rounded-md ">
                        <div class=" px-4 flex justify-between ">
                            <span class="font-semibold text-sm">Subtotal</span>
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
                                {isNaN(parseFloat(discount_per_order))
                                    ? "0.00"
                                    : parseFloat(discount_per_order).toFixed(2)}
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
                            <span class="font-semibold text-2xl">Total</span>
                            <span class="font-bold text-2xl">
                                ₱{total_price.toFixed(2)}
                            </span>
                        </div>
                        <div class="border-t-2 mt-3 py-2 px-4 flex items-center justify-between">
                            <span class="font-semibold text-2xl">Change</span>
                            <span class="font-bold text-2xl">
                                ₱{form.change.toFixed(2)}
                            </span>
                        </div>
                    </div>
                    <Input
                        onChange={(e) =>
                            setForm({
                                customer_amount: e.target.value,
                                change:
                                    parseFloat(
                                        e.target.value == ""
                                            ? 0
                                            : e.target.value
                                    ) - total_price,
                            })
                        }
                        label="Amount"
                    />
                    <Button
                        disabled={form.change < 0}
                        loading={loading}
                        onClick={submit_payment}
                        className="w-full bg-pink-500 hover:bg-pink-600"
                    >
                        SUBMIT
                    </Button>
                </div>
            </Modal>
        </>
    );
}
