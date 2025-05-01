import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
        category: {},
    },
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
    },
});
export const { setCategories, setCategory } = categorySlice.actions;

export default categorySlice.reducer;
