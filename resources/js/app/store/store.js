import appSlice from "@/app/redux/app-slice";
import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "../redux/category-slice";
import productSlice from "../redux/product-slice";
import customerSlice from "../redux/customer-slice";
import cartSlice from "../redux/cart-slice";
import stockSlice from "../redux/stock-slice";
import userSlice from "../redux/user-slice";
import supplierSlice from "../redux/supplier-slice";
import expenseSlice from "../redux/expense-slice";

const store = configureStore({
    reducer: {
        app: appSlice,
        categories: categorySlice,
        products: productSlice,
        customers: customerSlice,
        suppliers: supplierSlice,
        expenses: expenseSlice,
        carts: cartSlice,
        stocks: stockSlice,
        users: userSlice,
    },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;

export default store;
