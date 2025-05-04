import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "products",
    initialState: {
        products: {
            data: [],
            total: 0,
            current_page: 1,
            last_page: 1,
        },
        carts:[],
        product: {},
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setProduct: (state, action) => {
            state.product = action.payload;
        },
        setCarts: (state, action) => {
            state.carts = action.payload;
        },
    },
});

export const { setProducts, setProduct,setCarts } = productSlice.actions;

export default productSlice.reducer;
