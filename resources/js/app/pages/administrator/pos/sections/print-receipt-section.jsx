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
                        @page {
                            size: 80mm auto;
                            margin: 0mm;
                        }
                        
                        body {
                            font-family: 'Courier New', monospace;
                            font-size: 12px;
                            line-height: 1.3;
                            margin: 0;
                            padding: 2mm;
                            width: 80mm;
                            max-width: 80mm;
                            color: #000;
                            background: #fff;
                        }
                        
                        .receipt-container {
                            width: 54mm;
                            max-width: 54mm;
                            margin: 0 auto;
                        }
                        
                        .w-full {
                            width: 100% !important;
                        }
                        
                        .max-w-xs {
                            max-width: 54mm !important;
                            width: 54mm !important;
                        }
                        
                        .text-xs {
                            font-size: 11px !important;
                        }
                        
                        .text-sm {
                            font-size: 12px !important;
                        }
                        
                        .font-bold {
                            font-weight: bold !important;
                        }
                        
                        .border-dashed {
                            border-style: dashed !important;
                        }
                        
                        .flex {
                            display: flex !important;
                        }
                        
                        .justify-between {
                            justify-content: space-between !important;
                        }
                        
                        .text-center {
                            text-align: center !important;
                        }
                    </style>
                </head>
                <body>
                    <div class="receipt-container">
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
                <div className="w-full max-w-xs text-xs font-mono border-y border-dashed py-4">
                    <div className="text-center">
                        <h2 className="font-bold text-sm">
                            Egie's Beauty Boutique
                        </h2>
                        <p>Rizal Street</p>
                        <p>San Carlos City, Negros Occidental</p>
                        <p>09295878881</p>
                    </div>

                    <div className="mt-4">
                        <p>
                            Receipt No: {moment().format("Y")}-000010{id}
                        </p>
                        <p>Date: {moment().format("MM/DD/YYYY hh:mm A")}</p>
                    </div>

                    <div className="mt-4 border-t border-dashed pt-2">
                        {data?.cart_items.map((res, i) => {
                            return (
                                <div key={i} className="mb-1">
                                    <div>{res.name}</div>
                                    <div className="flex justify-between">
                                        <span>{res.pcs} pcs</span>
                                        <span>{peso_value(Number(res.sub_price))}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-4 border-t border-dashed pt-2">
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
                    </div>

                    <div className="text-center mt-4">
                        <div className="border border-black mb-1 p-1">
                            <div>INVOICE NUMBER</div>
                            <div className="text-[10px] tracking-widest">
                                {productId}
                            </div>
                        </div>
                    </div>

                    <div className="text-center border border-black mb-1 p-2 font-bold">
                        THANK YOU!
                    </div>
                    <div style={{height: "15mm"}}></div>
                </div>
            </div>
        </div>
    );
}
