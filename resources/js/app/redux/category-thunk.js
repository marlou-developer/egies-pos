import { create_category_service, delete_category_service, get_category_service, update_category_service } from "../pages/services/category-service";
import { categorySlice } from "./category-slice";

export function create_category_thunk(data) {
    return async function (dispatch, getState) {
        const res = await create_category_service(data)

    };
}

export function get_category_thunk() {
    return async function (dispatch, getState) {
        const res = await get_category_service()
        dispatch(categorySlice.actions.setCategories(res.data.result));
    };
}


export function delete_category_thunk(id) {
    return async function (dispatch, getState) {
        const res = await delete_category_service(id)
    };
}


export function update_category_thunk(data) {
    return async function (dispatch, getState) {
        const res = await update_category_service(data)
    };
}