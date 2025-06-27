import { create_expense_service, delete_expense_service, get_expense_service, search_expense_service, update_expense_service } from "../pages/services/expense-service";
import { expenseSlice } from "./expense-slice";


export function create_expense_thunk(data) {
    return async function (dispatch, getState) {
        const res = await create_expense_service(data)

    };
}

export function search_expense_thunk(search) {
    return async function (dispatch, getState) {
        const res = await search_expense_service(search)
        return res;
    };
}
export function get_expense_thunk() {
    return async function (dispatch) {
        try {
            const res = await get_expense_service();
            console.log('resres', res.data)
            dispatch(expenseSlice.actions.setExpenses(res.data.result));
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    };
}



export function delete_expense_thunk(id) {
    return async function (dispatch, getState) {
        const res = await delete_expense_service(id)
    };
}


export function update_expense_thunk(data) {
    return async function (dispatch, getState) {
        const res = await update_expense_service(data)
    };
}