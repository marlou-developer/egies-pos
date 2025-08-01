import { add_payment_service, create_cart_service, delete_cart_item_service, delete_cart_service, get_cart_by_id_service, get_cart_service, get_over_due_service, get_report_items_service, get_report_service, get_shopee_service, update_cart_service, update_customer_service, update_status_service } from "../pages/services/cart-service";
import { cartSlice } from "./cart-slice";

export function create_cart_thunk(data) {
    return async function (dispatch, getState) {
        const res = await create_cart_service(data)
        return res
    };
}


export function get_report_thunk() {
    return async function (dispatch, getState) {
        const res = await get_report_service()
        dispatch(cartSlice.actions.setReports(res.data));
    };
}

export function get_report_items_thunk() {
    return async function (dispatch, getState) {
        const res = await get_report_items_service()
        dispatch(cartSlice.actions.setReportItems(res.data));
    };
}
export function get_over_due_thunk() {
    return async function (dispatch, getState) {
        const res = await get_over_due_service()
        dispatch(cartSlice.actions.setOverDues(res.data));
    };
}


export function update_status_thunk(data) {
    return async function (dispatch, getState) {
        const res = await update_status_service(data)

    };
}
export function add_payment_thunk(data) {
    return async function (dispatch, getState) {
        const res = await add_payment_service(data)

    };
}


export function get_shopee_thunk() {
    return async function (dispatch, getState) {
        try {
            dispatch(cartSlice.actions.setLoading(true));
            const res = await get_shopee_service();
            dispatch(cartSlice.actions.setShopees(res.data));
        } catch (error) {
            console.error("Error fetching shopee orders:", error);
            dispatch(cartSlice.actions.setError(error.message));
            dispatch(cartSlice.actions.setLoading(false));
        }
    };
}


export function get_cart_thunk() {
    return async function (dispatch, getState) {
        try {
            dispatch(cartSlice.actions.setLoading(true));
            const res = await get_cart_service();
            dispatch(cartSlice.actions.setCarts(res.data));
            dispatch(cartSlice.actions.setSales(res.data));
        } catch (error) {
            console.error("Error fetching carts:", error);
            dispatch(cartSlice.actions.setError(error.message));
            dispatch(cartSlice.actions.setLoading(false));
        }
    };
}

export function get_cart_by_id_thunk(id) {
    return async function (dispatch, getState) {
        const res = await get_cart_by_id_service(id)
        dispatch(cartSlice.actions.setCart(res.data));
    };
}


export function delete_cart_thunk(id) {
    return async function (dispatch, getState) {
        const res = await delete_cart_service(id)
    };
}


export function update_cart_thunk(data) {
    return async function (dispatch, getState) {
        const res = await update_cart_service(data)
    };
}

export function delete_cart_item_thunk(id) {
    return async function (dispatch, getState) {
        const res = await delete_cart_item_service(id)
    };
}

export function update_customer_thunk(data) {
    return async function (dispatch, getState) {
        const res = await update_customer_service(data)
    };
}
