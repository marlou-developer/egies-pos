import { createSlice } from "@reduxjs/toolkit";

export const customerSlice = createSlice({
    name: "customers",
    initialState: {
        customers: {
            data: [],
            total: 0,
            current_page: 1,
            last_page: 1,
        },
        customer: {},
    },
    reducers: {
        setCustomers: (state, action) => {
            state.customers = action.payload;
        },
        setCustomer: (state, action) => {
            state.customer = action.payload;
        },
    },
});

export const { setCustomers, setCustomer } = customerSlice.actions;

export default customerSlice.reducer;
