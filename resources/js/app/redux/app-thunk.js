import { get_dashboard_service } from "../pages/services/app-service";
import { get_cart_credit_service } from "../pages/services/cart-service";
import { get_user_login_service } from "../pages/services/user-service";
import { appSlice } from "./app-slice";
import { cartSlice } from "./cart-slice";

export function get_user_login_thunk() {
    return async function (dispatch, getState) {
        const res = await get_user_login_service(3)
        dispatch(appSlice.actions.setUser(res));
        return res
    }
}

export function get_dashboard_thunk(search) {
    return async function (dispatch, getState) {
        const res = await get_dashboard_service(search);
        dispatch(appSlice.actions.setDashboard(res.data));
    };
}

export function get_cart_credit_thunk() {
    return async function (dispatch, getState) {
        const res = await get_cart_credit_service();
        dispatch(cartSlice.actions.setCarts(res.data));
    };
}

export function get_users_thunk() {
    return async function (dispatch, getState) {
        // const res = await get_users_service()
        // dispatch(appSlice.actions.setUsers(res.data.status));
    };
}

export function create_user_thunk(data) {
    return async function (dispatch, getState) { };
}

export function get_user_by_id_thunk(id) {
    return async function (dispatch, getState) {
        return "";
    };
}

export function delete_user_thunk(id) {
    return async function (dispatch, getState) { };
}

export function update_user_thunk(data) {
    return async function (dispatch, getState) { };
}

export function update_users_thunk(data) {
    return async function (dispatch, getState) { };
}
