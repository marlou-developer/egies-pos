import { create_expense_category_service, delete_expense_category_service, get_expense_category_service, update_expense_category_service } from "../pages/services/expense-category-service";
import { expenseCategorySlice } from "./expense-category-slice";


export function create_expense_category_thunk(data) {
    return async function (dispatch, getState) {
        const res = await create_expense_category_service(data)

    };
}

export function get_expense_category_thunk() {
    return async function (dispatch, getState) {
        const res = await get_expense_category_service()
        dispatch(expenseCategorySlice.actions.setExpenseCategories(res.data.result));
    };
}


export function delete_expense_category_thunk(id) {
    return async function (dispatch, getState) {
        const res = await delete_expense_category_service(id)
    };
}


export function update_expense_category_thunk(data) {
    return async function (dispatch, getState) {
        const res = await update_expense_category_service(data)
    };
}