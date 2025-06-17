import { createSlice } from "@reduxjs/toolkit";

export const expenseSlice = createSlice({
    name: "expenses",
    initialState: {
        expenses: {
            data: [],
            total: 0,
            current_page: 1,
            last_page: 1,
        },
        expense: {},
    },
    reducers: {
        setExpenses: (state, action) => {
            state.expenses = action.payload;
        },
        setExpense: (state, action) => {
            state.expense = action.payload;
        },
    },
});

export const { setExpenses, setExpense } = expenseSlice.actions;

export default expenseSlice.reducer;
