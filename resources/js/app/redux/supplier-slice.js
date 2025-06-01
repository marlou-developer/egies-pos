import { createSlice } from "@reduxjs/toolkit";

export const supplierSlice = createSlice({
    name: "suppliers",
    initialState: {
        suppliers: [],
        supplier: {},
    },
    reducers: {
        setSuppliers: (state, action) => {
            state.suppliers = action.payload;
        },
        setSupplier: (state, action) => {
            state.supplier = action.payload;
        },
    },
});
export const { setSuppliers, setSupplier } = supplierSlice.actions;

export default supplierSlice.reducer;
