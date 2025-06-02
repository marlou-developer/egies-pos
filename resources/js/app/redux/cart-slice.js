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
    },
});
export const {
    setCarts,
    setCart,
    setOverDues,
    setSales,
    setShopees,
    setSelectedProducts,
} = cartSlice.actions;

export default cartSlice.reducer;
