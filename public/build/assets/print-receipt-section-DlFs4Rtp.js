import{r as l,j as e}from"./app-CxBfzglp.js";import{p as n}from"./peso-BbTyboS3.js";function h({onPrinted:c,data:t,reset1:d,reset2:o,productId:a}){const r=l.useRef();return l.useEffect(()=>{const s=document.createElement("iframe");s.style.position="fixed",s.style.right="0",s.style.bottom="0",s.style.width="0",s.style.height="0",s.style.border="0",document.body.appendChild(s);const i=s.contentWindow.document;i.open(),i.write(`
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
                        ${r.current.innerHTML}
                    </div>
                </body>
            </html>
        `),i.close(),s.onload=()=>{s.contentWindow.focus(),s.contentWindow.print(),setTimeout(()=>{document.body.removeChild(s),c(),d(),o()},1e3)}},[]),console.log("datadatadata",t),e.jsx("div",{style:{display:"none"},children:e.jsx("div",{ref:r,children:e.jsx("div",{className:"flex flex-col items-center space-y-4",children:e.jsxs("div",{ref:r,className:"w-full max-w-xs text-xs font-mono border-y border-dashed py-4",children:[e.jsxs("div",{className:"text-center",children:[e.jsx("h2",{className:"font-bold text-sm",children:"Egie’s Beauty Boutique"}),e.jsx("p",{children:"Rizal Street"}),e.jsx("p",{children:"San Carlos City, Negros Occidental"}),e.jsx("p",{children:"09295878881"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx("p",{children:"Receipt No: 25-0000101"}),e.jsx("p",{children:"Date: 05/31/2025 6:39:34 PM"})]}),e.jsx("div",{className:"mt-4 border-t border-dashed pt-2",children:t==null?void 0:t.cart_items.map((s,i)=>e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:s.name}),e.jsxs("span",{children:[s.pcs,"@",n(Number(s.sub_price))]})]}))}),e.jsxs("div",{className:"mt-4 border-t border-dashed pt-2",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:"Cash:"}),e.jsx("span",{children:n(Number(t.customer_amount))})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:"Change:"}),e.jsx("span",{children:n(Number(t.change))})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:"Subtotal:"}),e.jsx("span",{children:n(Number(t.sub_total))})]}),e.jsxs("div",{className:"flex justify-between font-bold",children:[e.jsx("span",{children:"TOTAL:"}),e.jsx("span",{children:n(Number(t.total_price))})]})]}),e.jsx("div",{className:"text-center mt-4",children:e.jsxs("div",{className:"h-10 border border-black mb-1",children:["INVOICE NUMBER",e.jsx("p",{className:"text-[10px] tracking-widest",children:a})]})}),e.jsx("div",{className:"h-10 flex items-center justify-center text-center border border-black mb-1",children:"THANK YOU!"}),e.jsx("br",{}),e.jsx("br",{})]})})})})}export{h as default};
