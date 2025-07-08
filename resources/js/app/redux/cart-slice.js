import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        carts: [],
        cart: {},
        over_dues: [],
        sales: [],
        shopees: [],
        selectedProducts: [],
        reports:[],
        report_items:{
            customers:[],
            suppliers:[],
            users:[],
            products:[],
            categories:[]
        }
    },
    reducers: {
        setCarts: (state, action) => {
            state.carts = action.payload;
        },
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        setOverDues: (state, action) => {
            state.over_dues = action.payload;
        },
        setSales: (state, action) => {
            state.sales = action.payload;
        },
        setShopees: (state, action) => {
            state.shopees = action.payload;
        },
        setSelectedProducts: (state, action) => {
            state.selectedProducts = action.payload;
        },
        setReports: (state, action) => {
            state.reports = action.payload;
        },
         setReportItems: (state, action) => {
            state.report_items = action.payload;
        },
    },
});
export const {
    setCarts,
    setCart,
    setOverDues,
    setSales,
    setShopees,
    setSelectedProducts,
    setReportItems
} = cartSlice.actions;

export default cartSlice.reducer;
