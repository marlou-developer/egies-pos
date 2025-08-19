import { createSlice } from "@reduxjs/toolkit";

export const expenseCategorySlice = createSlice({
    name: "expense_categories",
    initialState: {
        expense_categories: [],
        expense_category: {},
    },
    reducers: {
        setExpenseCategories: (state, action) => {
            state.expense_categories = action.payload;
        },
        setExpenseCategory: (state, action) => {
            state.expense_category = action.payload;
        },
    },
});
export const { setExpenseCategories, setExpenseCategory } = expenseCategorySlice.actions;

export default expenseCategorySlice.reducer;
