import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        carts: [],
        cart: {},
        over_dues:[],
        sales:[]
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
    },
});
export const { setCarts, setCart,setOverDues,setSales } = cartSlice.actions;

export default cartSlice.reducer;
