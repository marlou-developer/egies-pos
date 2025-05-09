import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        carts: [],
        cart: {},
    },
    reducers: {
        setCarts: (state, action) => {
            state.carts = action.payload;
        },
        setCart: (state, action) => {
            state.cart = action.payload;
        },
    },
});
export const { setCarts, setCart } = cartSlice.actions;

export default cartSlice.reducer;
