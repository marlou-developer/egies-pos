import { create_stock_service } from "../pages/services/stock-service";
import { categorySlice } from "./category-slice";

export function create_stock_thunk(data) {
    return async function (dispatch, getState) {
        const res = await create_stock_service(data)

    };
}

