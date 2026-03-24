import{j as e}from"./app-CtQsyYHh.js";function h({label:o,name:t,value:p,onChange:n,type:r="text",disabled:d=!1,required:i=!1,iconLeft:s,iconRight:l,error:a,isNotDateBack:c=!1}){const x=new Date().toISOString().split("T")[0];return e.jsxs("div",{className:"w-full",children:[e.jsxs("div",{className:"relative",children:[s&&e.jsx("div",{className:"absolute left-2 top-1/2 -translate-y-1/2 text-gray-500",children:s}),e.jsx("input",{disabled:d,required:i,value:p,onChange:n,type:r,id:t,name:t,min:c&&r==="date"?x:void 0,className:`peer text-black placeholder-transparent focus:ring-pink-300 focus:border-pink-300 w-full py-2.5 px-5 border bg-white rounded-md focus:outline-none transition-all
            ${s?"pl-10":""}
            ${l?"pr-10":""}
            ${a?"border-red-500":""}
          `,placeholder:" "}),e.jsx("label",{htmlFor:t,className:` absolute left-2.5 px-2.5 transition-all bg-white text-sm -top-3
            peer-placeholder-shown:text-base
            peer-placeholder-shown:text-gray-500
            peer-placeholder-shown:top-2.5
            peer-focus:-top-3
            peer-focus:text-sm
            peer-focus:text-pink-400 
          `,children:o}),l&&e.jsx("div",{className:"absolute right-2 top-1/2 -translate-y-1/2 text-gray-500",children:l})]}),a&&e.jsx("p",{className:"text-sm text-red-500 mt-1 ml-1",children:a})]})}export{h as I};
