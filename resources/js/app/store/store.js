import appSlice from "@/app/redux/app-slice";
import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "../redux/category-slice";

const store = configureStore({
    reducer: {
        app: appSlice,
        categories: categorySlice,
    },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;

export default store;
