import { add_payment_service, create_cart_service, delete_cart_service, get_cart_by_id_service, get_cart_service, update_cart_service } from "../pages/services/cart-service";
import { cartSlice } from "./cart-slice";

export function create_cart_thunk(data) {
    return async function (dispatch, getState) {
        const res = await create_cart_service(data)

    };
}


export function add_payment_thunk(data) {
    return async function (dispatch, getState) {
        const res = await add_payment_service(data)

    };
}
export function get_cart_thunk() {
    return async function (dispatch, getState) {
        const res = await get_cart_service()
        dispatch(cartSlice.actions.setCarts(res.data.result));
    };
}

export function get_cart_by_id_thunk(id) {
    return async function (dispatch, getState) {
        const res = await get_cart_by_id_service(id)
        dispatch(cartSlice.actions.setCart(res));
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