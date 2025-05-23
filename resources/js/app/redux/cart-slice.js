import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        carts: [],
        cart: {},
        over_dues:[]
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
    },
});
export const { setCarts, setCart,setOverDues } = cartSlice.actions;

export default cartSlice.reducer;
