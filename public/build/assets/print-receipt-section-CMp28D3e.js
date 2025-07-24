import{r as d,j as e}from"./app-Cq0AuCnt.js";import{p as n}from"./peso-BbTyboS3.js";import{h as l}from"./moment-C5S46NFB.js";function j({id:o,onPrinted:a,data:s,reset1:c,reset2:m,productId:h}){const r=d.useRef();return d.useEffect(()=>{const t=document.createElement("iframe");t.style.position="fixed",t.style.right="0",t.style.bottom="0",t.style.width="0",t.style.height="0",t.style.border="0",document.body.appendChild(t);const i=t.contentWindow.document;i.open(),i.write(`
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
                        ${r.current.innerHTML}
                    </div>
                </body>
            </html>
        `),i.close(),t.onload=()=>{t.contentWindow.focus(),t.contentWindow.print(),setTimeout(()=>{document.body.removeChild(t),a(),c(),m()},1e3)}},[]),console.log("datadatadata",s),e.jsx("div",{style:{display:"none"},children:e.jsx("div",{ref:r,children:e.jsxs("div",{className:"w-full max-w-xs text-xs font-mono border-y border-dashed py-4",children:[e.jsxs("div",{className:"text-center",children:[e.jsx("h2",{className:"font-bold text-sm",children:"Egie's Beauty Boutique"}),e.jsx("p",{children:"Rizal Street"}),e.jsx("p",{children:"San Carlos City, Negros Occidental"}),e.jsx("p",{children:"09295878881"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsxs("p",{children:["Receipt No: ",l().format("Y"),"-000010",o]}),e.jsxs("p",{children:["Date: ",l().format("MM/DD/YYYY hh:mm A")]})]}),e.jsx("div",{className:"mt-4 border-t border-dashed pt-2",children:s==null?void 0:s.cart_items.map((t,i)=>e.jsxs("div",{className:"mb-1",children:[e.jsx("div",{children:t.name}),e.jsxs("div",{className:"flex justify-between",children:[e.jsxs("span",{children:[t.pcs," pcs"]}),e.jsx("span",{children:n(Number(t.sub_price))})]})]},i))}),e.jsxs("div",{className:"mt-4 border-t border-dashed pt-2",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:"Subtotal:"}),e.jsx("span",{children:n(Number(s.sub_total))})]}),e.jsxs("div",{className:"flex justify-between font-bold",children:[e.jsx("span",{children:"TOTAL:"}),e.jsx("span",{children:n(Number(s.total_price))})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:"Cash:"}),e.jsx("span",{children:n(Number(s.customer_amount))})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:"Change:"}),e.jsx("span",{children:n(Number(s.change))})]})]}),e.jsx("div",{className:"text-center mt-4",children:e.jsxs("div",{className:"border border-black mb-1 p-1",children:[e.jsx("div",{children:"INVOICE NUMBER"}),e.jsx("div",{className:"text-[10px] tracking-widest",children:h})]})}),e.jsx("div",{className:"text-center border border-black mb-1 p-2 font-bold",children:"THANK YOU!"}),e.jsx("div",{style:{height:"15mm"}})]})})})}export{j as default};
