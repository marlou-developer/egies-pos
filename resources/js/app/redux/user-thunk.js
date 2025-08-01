import { create_user_service, delete_user_service, get_users_service, update_user_service } from "../pages/services/user-service";
import { userSlice } from "./user-slice";

export function create_user_thunk(data) {
    return async function (dispatch, getState) {
        const res = await create_user_service(data)

    };
}

export function get_users_thunk() {
    return async function (dispatch, getState) {
        const res = await get_users_service()
        dispatch(userSlice.actions.setUsers(res.data.result));
    };
}

export function update_user_thunk(data) {
    return async function (dispatch, getState) {
        const res = await update_user_service(data)
    };
}

export function delete_user_thunk(id) {
    return async function (dispatch, getState) {
        const res = await delete_user_service(id)
    };
}
