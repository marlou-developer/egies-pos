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
        product_discount:{},
         product_discounts:[]
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setProductDiscounts: (state, action) => {
            state.product_discounts = action.payload;
        },
        setProductDiscount: (state, action) => {
            state.product_discount = action.payload;
        },
        setProduct: (state, action) => {
            state.product = action.payload;
        },
        setCarts: (state, action) => {
            state.carts = action.payload;
        },
    },
});

export const { setProducts, setProduct,setCarts,setProductDiscount,setProductDiscounts } = productSlice.actions;

export default productSlice.reducer;
