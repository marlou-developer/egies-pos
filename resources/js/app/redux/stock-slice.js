import { createSlice } from "@reduxjs/toolkit";

export const stockSlice = createSlice({
    name: "stocks",
    initialState: {
        stocks: [],
        stock: {},
    },
    reducers: {
        setStocks: (state, action) => {
            state.stocks = action.payload;
        },
        setStock: (state, action) => {
            state.stock = action.payload;
        },
    },
});
export const { setStocks, setStock } = stockSlice.actions;

export default stockSlice.reducer;
