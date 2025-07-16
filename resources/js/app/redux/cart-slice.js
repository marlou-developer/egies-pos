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
        reports: [],
        report_items: {
            customers: [],
            suppliers: [],
            users: [],
            products: [],
            categories: []
        },
        loading: false,
        error: null,
    },
    reducers: {
        setCarts: (state, action) => {
            state.carts = action.payload;
            state.loading = false;
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
            state.loading = false;
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
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
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
    setReportItems,
    setLoading,
    setError
} = cartSlice.actions;

export default cartSlice.reducer;
