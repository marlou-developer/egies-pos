import { peso_value } from "@/app/lib/peso";
import moment from "moment";
import React, { useEffect, useRef } from "react";

export default function PrintReceiptSection({
    id,
    onPrinted,
    data,
    reset1,
    reset2,
    productId,
}) {
    const receiptRef = useRef();
    useEffect(() => {
        const printFrame = document.createElement("iframe");
        printFrame.style.position = "fixed";
        printFrame.style.right = "0";
        printFrame.style.bottom = "0";
        printFrame.style.width = "0";
        printFrame.style.height = "0";
        printFrame.style.border = "0";
        document.body.appendChild(printFrame);

        const frameDoc = printFrame.contentWindow.document;

        frameDoc.open();
        frameDoc.write(`
            <html>
                <head>
                    <title>Print Receipt</title>
                    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                    <style>
                        body {
                            font-family: monospace;
                            padding: 0px;
                        }
                    </style>
                </head>
                <body>
                    <div class="w-full max-w-xs mx-auto text-xs font-mono">
                        ${receiptRef.current.innerHTML}
                    </div>
                </body>
            </html>
        `);
        frameDoc.close();

        printFrame.onload = () => {
            printFrame.contentWindow.focus();
            printFrame.contentWindow.print();
            setTimeout(() => {
                document.body.removeChild(printFrame);
                onPrinted(); // Unmount after printing
                reset1();
                reset2();
            }, 1000);
        };
    }, []);

    console.log("datadatadata", data);
    return (
        <div style={{ display: "none" }}>
            <div ref={receiptRef}>
                <div className="flex flex-col items-center space-y-4 pr-5">
                    <div
                        ref={receiptRef}
                        className="w-full max-w-xs text-xs font-mono border-y border-dashed py-4"
                    >
                        <div className="text-center">
                            <h2 className="font-bold text-sm">
                                Egie’s Beauty Boutique
                            </h2>
                            <p>Rizal Street</p>
                            <p>San Carlos City, Negros Occidental</p>
                            <p>09295878881</p>
                        </div>

                        <div className="mt-4">
                            <p>
                                Receipt No: {moment().format("Y")}-000010{id}
                            </p>
                            <p>Date: {moment().format("LLL")}</p>
                        </div>

                        <div className="mt-4 border-t border-dashed pt-2">
                            {data?.cart_items.map((res, i) => {
                                return (
                                    <div className="flex justify-between">
                                        <span>{res.name}</span>
                                        <span>
                                            {res.pcs}@
                                            {peso_value(Number(res.sub_price))}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-4 border-t border-dashed pt-2">
                            <div className="flex justify-between">
                                <span>Cash:</span>
                                <span>
                                    {peso_value(Number(data.customer_amount))}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Change:</span>
                                <span>{peso_value(Number(data.change))}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>
                                    {peso_value(Number(data.sub_total))}
                                </span>
                            </div>
                            <div className="flex justify-between font-bold">
                                <span>TOTAL:</span>
                                <span>
                                    {peso_value(Number(data.total_price))}
                                </span>
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <div className="h-10 border border-black mb-1">
                                {/* [Barcode] */}
                                INVOICE NUMBER
                                <p className="text-[10px] tracking-widest">
                                    {productId}
                                </p>
                            </div>
                        </div>

                        <div className="h-10 flex items-center justify-center text-center border border-black mb-1">
                            THANK YOU!
                        </div>
                        <br />
                        <br />
                    </div>
                </div>
            </div>
        </div>
    );
}
