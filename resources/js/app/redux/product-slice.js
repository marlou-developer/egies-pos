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
        carts: [],
        product: {},
        product_discount: {},
        product_discounts: [],
        selectedProducts: [],
        selectAll: false,
        selectAllStock: false,
        selectedStocks: [],
        loading: false,
        error: null,
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
        setSelectedProducts: (state, action) => {
            state.selectedProducts = action.payload;
        },
        setSelectAll: (state, action) => {
            state.selectAll = action.payload;
        },
        setSelectedStocks: (state, action) => {
            state.selectedStocks = action.payload;
        },
        setSelectAllStock: (state, action) => {
            state.selectAllStock = action.payload;
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
    setProducts,
    setProduct,
    setCarts,
    setProductDiscount,
    setProductDiscounts,
    setSelectedProducts,
    setSelectAll,
    setSelectedStocks,
    setSelectAllStock,
    setLoading,
    setError,
} = productSlice.actions;

export default productSlice.reducer;
