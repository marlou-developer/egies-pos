import { create_stock_service, get_stock_by_products_id_service, get_update_stock_service, soft_delete_service, restore_service, delete_stock_service } from "../pages/services/stock-service";
import { categorySlice } from "./category-slice";
import { stockSlice } from "./stock-slice";

export function create_stock_thunk(data) {
    return async function (dispatch, getState) {
        const res = await create_stock_service(data)

    };
}

export function get_update_stock_thunk(data) {
    return async function (dispatch, getState) {
        const res = await get_update_stock_service(data)

    };
}

export function soft_delete_thunk(data) {
    return async function (dispatch, getState) {
        const res = await soft_delete_service(data)

    };
}

export function restore_thunk(data) {
    return async function (dispatch, getState) {
        const res = await restore_service(data)
        return res;
    };
}

export function get_stock_by_products_id_thunk(product_id) {
    return async function (dispatch) {
        try {
            const res = await get_stock_by_products_id_service(product_id);
            console.log('resres', res.data)
            dispatch(stockSlice.actions.setStocks(res.data));
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
}

export function delete_stock_thunk(data) {
    return async function (dispatch, getState) {
        try {
            const res = await delete_stock_service(data.id)
            return res;
        } catch (error) {
            console.error("Error deleting stock:", error);
            throw error;
        }
    };
}

